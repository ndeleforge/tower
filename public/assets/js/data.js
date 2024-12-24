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