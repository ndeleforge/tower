// Create data game
if (!getStorage("TOWER-save")) {
    _game = {
        'core' : {
            'ongoing' : false, 
            'name' : null, 
            'sound' : true,
            'version' : VERSION,
            'language' : navigator.language || navigator.userLanguage || "en",
        },
        'events' : {
            'last_action' : null,  
            'new_action' : null, 
            'sub_action' : null, 
            'monster' : null,
            'current_event' : null
        },
        'stats' : {
            'best_score' : 0,
            'total_game' : 0,
            'best_floor' : 0,
            'total_room' : 0,
            'max_level' : 0,
            'potion_used' : 0,
            'fight_victory' : 0,
            'chest_open': 0,
            'chest_trap' : 0,
            'chest_not_opened' : 0,
            'spirit_meet' : 0,
            'merchant_accepted' : 0,
            'merchant_refused' : 0,
        },
        'character' : {
            'health' : SETTINGS.data.health,
            'health_max' : SETTINGS.data.health_max,
            'power' : SETTINGS.data.power,
            'stamina' : SETTINGS.data.stamina,
            'xp' : SETTINGS.data.xp,
            'xp_to' : SETTINGS.data.xp_to,
            'level' : SETTINGS.data.level,
            'floor' : SETTINGS.data.floor,
            'room' : SETTINGS.data.room,
            'item_potion' : SETTINGS.data.item_potion,
            'item_scroll' : SETTINGS.data.item_scroll,
            'item_mineral' : SETTINGS.data.item_mineral,
            'score' : SETTINGS.data.score
        }
    }

    setStorage("TOWER-save", JSON.stringify(_game));
} 

// Or parse existing data
else {
    _game = JSON.parse(getStorage("TOWER-save"));
}

// Setup content according language
const CONTENT = (_game.core.language.includes("fr")) ? FRENCH : ENGLISH;
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