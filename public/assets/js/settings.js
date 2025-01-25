/**
 * Define some variables
 **/

const VERSION = "1.0.3";
const SETTINGS = {
    'data': {
        'health': 25,
        'health_max': 25,
        'power': 5,
        'stamina': 0,
        'xp': 0,
        'xp_to': 50,
        'level': 1,
        'floor': 1,
        'room': 1,
        'item_potion': 0,
        'item_scroll': 0,
        'item_mineral': 0,
        'item_limit': 9,
        'score': 0,
        'level_up_health': 20,
        'level_up_power': 2,
        'level_up_stamina': 1,
        'spirit_health': 10,
        'spirit_power': 1,
        'spirit_stamina': 1,
    },
    'icons': {
        'sound_on': "<i class='fas fa-volume-up'></i>",
        'sound_off': "<i class='fas fa-volume-mute'></i>",
    },
    'sounds': {
        'sound_attack': "attack",
        'sound_scroll': "scroll",
        'sound_merchant': "merchant",
        'sound_chest': "chest",
        'sound_potion': "potion",
        'sound_room': "room",
        'sound_floor': "floor",
    },
    'images': {
        // ux
        'menu_closed': "assets/image/icon/book_closed.png",
        'menu_opened': "assets/image/icon/book_opened.png",
        // events
        'start': "event/first_floor.png",
        'no_event': "event/no_event.png",
        'chest': "event/chest.png",
        'chest_open': "event/chest_open.png",
        'merchant': "event/merchant.png",
        'earth_spirit': "event/spirit_earth.png",
        'light_spirit': "event/spirit_light.png",
        'fire_spirit': "event/spirit_fire.png",
        'water_spirit': "event/spirit_water.png",
        // icons
        'icon_power': "icon/sword.png",
        'icon_stamina': "icon/shield.png",
        'icon_potion': "icon/potion.png",
        'icon_scroll': "icon/scroll.png",
        'icon_mineral': "icon/mineral.png",
        // monsters
        'monster01': "monster/monster_01.png",
        'monster02': "monster/monster_02.png",
        'monster03': "monster/monster_03.png",
        'monster04': "monster/monster_04.png",
        'monster05': "monster/monster_05.png",
        'monster06': "monster/monster_06.png",
        'monster07': "monster/monster_07.png",
        'monster08': "monster/monster_08.png",
        'monster09': "monster/monster_09.png",
        'monster10': "monster/monster_10.png",
        'monster11': "monster/monster_11.png",
        'monster12': "monster/monster_12.png",
        'monster13': "monster/monster_13.png",
        'monster14': "monster/monster_14.png",
        'monster15': "monster/monster_15.png",
        'monster16': "monster/monster_16.png",
        'monster17': "monster/monster_17.png",
    }
};

let _game,
    _refresh_display,
    _refresh_interval;

/**
 * Create new game data or parse existing game dat
 **/

function loadData() {
    if (!getStorage("TOWER-save")) {
        _game = {
            'core': {
                'ongoing': false,
                'name': null,
                'sound': true,
                'version': VERSION,
                'language': navigator.language || navigator.userLanguage || "en",
            },
            'events': {
                'last_action': null,
                'new_action': null,
                'sub_action': null,
                'monster': null,
                'current_event': null
            },
            'stats': {
                'best_score': 0,
                'total_game': 0,
                'best_floor': 0,
                'total_room': 0,
                'max_level': 0,
                'potion_used': 0,
                'fight_victory': 0,
                'chest_open': 0,
                'chest_trap': 0,
                'chest_not_opened': 0,
                'spirit_meet': 0,
                'merchant_accepted': 0,
                'merchant_refused': 0,
            },
            'character': {
                'health': SETTINGS.data.health,
                'health_max': SETTINGS.data.health_max,
                'power': SETTINGS.data.power,
                'stamina': SETTINGS.data.stamina,
                'xp': SETTINGS.data.xp,
                'xp_to': SETTINGS.data.xp_to,
                'level': SETTINGS.data.level,
                'floor': SETTINGS.data.floor,
                'room': SETTINGS.data.room,
                'item_potion': SETTINGS.data.item_potion,
                'item_scroll': SETTINGS.data.item_scroll,
                'item_mineral': SETTINGS.data.item_mineral,
                'score': SETTINGS.data.score
            }
        }
    
        setStorage("TOWER-save", JSON.stringify(_game));
    }
    else {
        _game = JSON.parse(getStorage("TOWER-save"));
    }
}

/**
 * Load all text content according the language
 **/

function loadLanguage() {
    Object.keys(CONTENT.main).forEach(key => {
        if (get("#" + key)) {
            get("#" + key).innerHTML = CONTENT.main[key];
        }
    });

    // Able to switch language between French and English
    if (get("#switch_language")) {
        get("#switch_language").addEventListener("click", () => {
            _game.core.language = (_game.core.language == "fr") ? "en" : "fr";
            setStorage("TOWER-save", JSON.stringify(_game));
            location.reload();
        });
    };
}

/**
 * Reset the game but keeps some data such as scores etc.
 **/

function resetGame() {
    _game.core.ongoing = false;
    _game.stats.total_game++;
    _game.character.health = SETTINGS.data.health;
    _game.character.health_max = SETTINGS.data.health_max;
    _game.character.power = SETTINGS.data.power;
    _game.character.stamina = SETTINGS.data.stamina;
    _game.character.xp = SETTINGS.data.xp;
    _game.character.xp_to = SETTINGS.data.xp_to;
    _game.character.item_potion = SETTINGS.data.item_potion;
    _game.character.item_scroll = SETTINGS.data.item_scroll;
    _game.character.item_mineral = SETTINGS.data.item_mineral;
    _game.character.level = SETTINGS.data.level;
    _game.character.floor = SETTINGS.data.floor;
    _game.character.room = SETTINGS.data.room;

    setStorage("TOWER-save", JSON.stringify(_game))
}

/**
 * Restart manually the game
 **/

function restartGame() {
    get("#blank_popup").style.display = "block";
    get("#popup").style.display = "flex";
    get("#popup_text").innerHTML = CONTENT.main.popup_restart;

    get("#popup_cancel").addEventListener("click", () => {
        get("#blank_popup").style.display = "none";
        get("#popup").style.display = "none";
    });

    get("#popup_accept").addEventListener("click", () => {
        clearInterval(_refresh_display);
        _game.core.ongoing = false;
        resetGame();
        location.reload();
    });
}

/**
 * Delete all game data manually
 **/

function deleteSave() {
    get("#blank_popup").style.display = "block";
    get("#popup").style.display = "flex";
    get("#popup_text").innerHTML = CONTENT.main.popup_delete;

    get("#popup_cancel").addEventListener("click", () => {
        get("#blank_popup").style.display = "none";
        get("#popup").style.display = "none";
    });

    get("#popup_accept").addEventListener("click", () => {
        clearInterval(_refresh_display);
        deleteStorage("TOWER-save");
        location.reload();
    });
}
