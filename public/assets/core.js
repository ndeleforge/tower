// =================================================
// ============ CORE VARIABLES

const VERSION = "1.0";
const FOOTER = `V. ${VERSION} | © 2022`;

let _game, 
    _refresh_display,
    _refresh_interval;

const SETTINGS = {
    'data' : {
        'health' : 25,
        'health_max' : 25,
        'power' : 5,
        'stamina' : 0,
        'xp' : 0,
        'xp_to' : 50,
        'level' : 1,
        'floor' : 1,
        'room' : 1,
        'item_potion' : 0,
        'item_scroll' : 0,
        'item_mineral' : 0,
        'item_limit' : 9,
        'score' : 0,
        'level_up_health' : 20,
        'level_up_power' : 2,
        'level_up_stamina' : 1,
        'spirit_health' : 10,
        'spirit_power' : 1,
        'spirit_stamina' : 1,
    },
    'icons' : {
        'sound_on' : "<i class='fas fa-volume-up'></i>",
        'sound_off' : "<i class='fas fa-volume-mute'></i>",
    },
    'sounds' : {
        'sound_attack' : "attack",
        'sound_scroll' : "scroll",
        'sound_merchant' : "merchant",
        'sound_chest' : "chest",
        'sound_potion' : "potion",
        'sound_room' : "room",
        'sound_floor' : "floor",
    },
    'images' : {
        // ux
        'menu_closed' : "assets/image/icon/book_closed.png",
        'menu_opened' : "assets/image/icon/book_opened.png",
        // events
        'start' : "event/first_floor.png",
        'no_event' : "event/no_event.png",
        'chest' : "event/chest.png",
        'chest_open' : "event/chest_open.png",
        'merchant' : "event/merchant.png",
        'earth_spirit' : "event/spirit_earth.png",
        'light_spirit' : "event/spirit_light.png",
        'fire_spirit' : "event/spirit_fire.png",
        'water_spirit' : "event/spirit_water.png",
        // icons
        'icon_power' : "icon/sword.png",
        'icon_stamina' : "icon/shield.png",
        'icon_potion' : "icon/potion.png",
        'icon_scroll' : "icon/scroll.png",
        'icon_mineral' : "icon/mineral.png",
        // monsters
        'monster01' : "monster/monster_01.png",
        'monster02' : "monster/monster_02.png",
        'monster03' : "monster/monster_03.png",
        'monster04' : "monster/monster_04.png",
        'monster05' : "monster/monster_05.png",
        'monster06' : "monster/monster_06.png",
        'monster07' : "monster/monster_07.png",
        'monster08' : "monster/monster_08.png",
        'monster09' : "monster/monster_09.png",
        'monster10' : "monster/monster_10.png",
        'monster11' : "monster/monster_11.png",
        'monster12' : "monster/monster_12.png",
        'monster13' : "monster/monster_13.png",
        'monster14' : "monster/monster_14.png",
        'monster15' : "monster/monster_15.png",
        'monster16' : "monster/monster_16.png",
        'monster17' : "monster/monster_17.png",
    }
};

const FRENCH = {
    'main' : {
        'title' : "La Tour",
        'tower' : "La Tour",
        'title_text' : "Bienvenue aventurier",
        'title_character_placeholder' : "Quel est ton nom ",
        'play' : "Entrer",
        'title_footer' : `${FOOTER} | <a id=\"switch_language\"></a>`,
        'menu_footer' : FOOTER,
        'move' : "Avancer",
        'use_potion' : "Utiliser une potion",
        'attack' : "Attaque",
        'use_scroll' : "Sortilège",
        'open_chest' : "Ouvrir le coffre",
        'close_chest' : "Ne pas l'ouvrir",
        'accept_offer' : "Accepter l'offre",
        'refuse_offer' : "Refuser l'offre",
        'settings_title' : "Paramètres de jeu",
        'stats_title' : "Statistiques",
        'popup_title' : "Information importante",
        'popup_accept' : "Confirmer",
        'popup_cancel' : "Annuler",
        'popup_restart' : "Voulez-vous recommencer la partie en cours ?<br />Votre progression actuelle sera perdue mais vos statistiques seront gardées.",
        'popup_delete' : "Voulez-vous effacer toutes les données de jeu ? L'application sera réinitialisée, vous perdrez votre progression et vos statistiques.",
        'switch_language' : "<i class=\"fas fa-sync\"></i> EN",
        'updated' : "L'application a été mise à jour et une réinitialisation est requise. Vous allez perdre votre progression et vos statistiques."
    },
    'stats' : {
        'best_score' : "Meilleur score : ",
        'total_game' : "Nombre de partie : ",
        'best_floor' : "Étage atteint le plus haut : ",
        'total_room' : "Nombre de salle parcourue : ",
        'max_level' : "Niveau d'expérience le plus haut : ",
        'potion_used' : "Nombre de potion utilisé : ",
        'fight_victory' : "Monstre vaincu : ",
        'chest_open': "Coffre ouvert : ",
        'chest_trap' : "Coffre piégé : ",
        'chest_not_opened' : "Coffre non ouvert : ",
        'spirit_meet' : "Esprit rencontré : ",
        'merchant_accepted' : "Propostion du marchant accepté : ",
        'merchant_refused' : "Proposition du marchant refusé : ",
    },
    'vocabulary': {
        'health' : "Santé",
        'score' : "Score",
        'power' : "Puissance",
        'stamina' : "Endurance",
        'floor' : "Étage",
        'room' : "Salle",
        'level' : "Niveau",
        'point_singular' : "point",
        'point_plural' : "points",
        'hit_singular' : "coup",
        'hit_plural' : "coups",
    },
    'events' : {
        // Level up
        'level_up_1' : "Votre niveau augmente",
        'level_up_2' : "Votre santé est regénérée, votre puissance et votre endurance augmentent",
        // Simple events
        'healing' : "Vous avez utilisé une potion, votre santé est regénérée",
        'no_event' : "Vous traversez tranquillement de longs couloirs",
        'start_game_1' : "Une vieille pancarte. La plupart des mots sont effacés par le temps.",
        'start_game_2' : "\"Celui qui ... le sommet pourra ... l'un de ses ... ! ... le danger, restez en ... et grimpez le ... haut ...\"",
        'start_game_3' : "Vous continuez votre chemin d'un pas déterminé..",
        // Spirits
        'spirit_earth_1' : "Un <strong>esprit de la terre</strong> partage son énergie",
        'spirit_earth_2' : "Votre endurance augmente de ",
        'spirit_light_1' : "Un <strong>esprit de lumière</strong> partage son énergie",
        'spirit_light_2' : "Vous gagnez ",
        'spirit_light_3' : " d'expérience",
        'spirit_fire_1' : "Un <strong>esprit de feu</strong> partage son énergie",
        'spirit_fire_2' : "Votre puissance augmente de ",
        'spirit_water_1' : "Un <strong>esprit d'eau</strong> partage son énergie",
        'spirit_water_2' : "Votre santé augmente de ",
        // Merchant
        'merchant' : "Un individu se dresse devant vous. Il propose un marché",
        'merchant_no_mineral' : "Mais vous n'avez pas assez de <strong>pierre précieuse</strong>",
        'merchant_proposition' : "Deux <strong>pierre précieuse</strong> contre",
        'merchant_offer_1' : "Votre statistique de puissance augmente beaucoup",
        'merchant_offer_2' : "Votre santé et votre endurance augmente",
        'merchant_offer_3' : "Mais rien ne se passe",
        'merchant_accepted' : "L'individu se met à rire avant de vous lancer un sort",
        'merchant_refused' : "Mais vous refusez l'offre",
        // Chest
        'chest' : "Vous avez trouvé un <strong>coffre</strong>",
        'chest_not_opened' : "Mais vous décidez de ne pas l'ouvrir",
        'chest_trap_1' : "Mais c'est un <strong>piège</strong>, un poison se répand",
        'chest_trap_2' : "Vous perdez ",
        'chest_trap_3' : " de santé",
        'chest_scroll' : "Vous trouvez un <strong>parchemin magique</strong>",
        'chest_potion' : "Vous trouvez une <strong>potion de soin</strong>",
        'chest_mineral' : "Vous trouvez une <strong>pierre précieuse</strong>",
        'chest_limit' : "Mais vous n'avez plus assez de place",
        // Fight
        'fight_start' : "apparaît",
        'fight_win_1' : " vaincu en ",
        'fight_win_2' : "Vous avez perdu ",
        'fight_win_3' : " de santé",
        'fight_win_4' : " d'expérience",
        'fight_win_5' : "Vous avez gagné ",
        'fight_magic' : "Vous avez vaincu le monstre grâce à un sort magique",
        // Game over
        'gameover_1' : "Vous avez été vaincu.<br />Vous êtes arrivé à l'étage ",
        'gameover_2' : "Score : ",
        'gameover_button' : "Recommencer"
    },
    'monsters' : {
        'lich' : "Liche des ténèbres",
        'light_sword' : "Épée de lumière",
        'golem' : "Golem de pierre",
        'dead_warrior' : "Guerrier mort-vivant",
        'daemon' : "Daémon",
        'minotaur' : "Minotaure",
        'cerberus' : "Cerbère",
        'troll' : "Troll",
        'eye_ghost' : "Oeil maléfique",
        'werewolf' : "Loup-garou",
        'monster' : "Monstre marin",
        'lizard' : "Homme-lézard",
        'gargoyle' : "Gargouille",
        'gobelin' : "Gobelin",
        'snake' : "Serpent",
        'bat' : "Chauve souris",
        'slim' : "Blob"
    },
    'tips' : [
        "Lorsque la santé de votre personnage tombe à 0, la partie est terminée. Cependant, un gain de niveau ou une potion restaure la totalité des points de santé.",
        "La statistique de bouclier permet de réduire les dégâts lors d'une attaque dans un combat. Elle est uniquement augmentée par l'esprit de la terre.",
        "Les combats se déroulent automatiquement alors veillez à bien choisir votre action de combat entre attaque et sortilège.",
        "Chaque monstre nécessite un nombre de coups pour être vaincu qui est calculé de la manière suivante : santé du monstre / force du héros.",
        "Les dégâts d'un monstre sont calculés selon la formule suivante : (nombre de coups pour être vaincu * force du monstre) - le bouclier du héros.",
        "Vaincre un monstre avec un sort rapporte peu de points d'expérience mais peut éviter une morte certaine ou de très gros dégâts.",
        "La Tour est peuplée de divers esprits, la plupart d'entre eux vous aideront grandement lors de votre quête.",
        "Lorsque vous ouvrez un coffre, vous avez une chance de tomber sur un monstre qui vous infligera des dégâts qui ignorent votre statistique de bouclier.",
        "La Tour est divisé par étages. Chaque étage est lui-même composé de 10 salles. A chaque étage, les monstres deviennent plus puissants.",
        "Pour les plus curieux, le score de fin de partie est calculé selon la formule suivante : ((bouclier + force + santé maximale) * niveau) * étage.",
        "Chaque objet que vous pouvez récupérer est limité à une certaine quantité. Il faut faire attention à ne pas trop les utiliser et à ne pas trop les accumuler.",
        "Un étrange marchand habite dans la Tour, il est possible qu'il vous propose une transaction contre des pierres précieuses"
    ]
};

const ENGLISH = {
    'main' : {
        'title' : "The Tower",
        'tower' : "The Tower",
        'title_text' : "Welcome adventurer",
        'title_character_placeholder' : "What's your name ",
        'play' : "Enter",
        'title_footer' : `${FOOTER} | <a id=\"switch_language\"></a>`,
        'menu_footer' : FOOTER,
        'move' : "Move",
        'use_potion' : "Use a potion",
        'attack' : "Attack",
        'use_scroll' : "Spell",
        'open_chest' : "Open the chest",
        'close_chest' : "Do not open",
        'accept_offer' : "Accept offer",
        'refuse_offer' : "Refuse offer",
        'settings_title' : "Game settings",
        'stats_title' : "Statistiques",
        'popup_title' : "Important information",
        'popup_accept' : "Confirm",
        'popup_cancel' : "Cancel",
        'popup_restart' : "Do you want to restart the current game? Your current progress will be lost but your stats will be saved.",
        'popup_delete' : "Do you want to erase all game data? The application will be reset and you'll lose your data and your stats.",
        'switch_language' : "<i class=\"fas fa-sync\"></i> FR",
        'updated' : "The application has been updated and needs to be reset. You're gonna lose your progression and your stats."
    },
    'stats' : {
        'best_score' : "Best score : ",
        'total_game' : "Number of game : ",
        'best_floor' : "Highest floor : ",
        'total_room' : "Number of rooms : ",
        'max_level' : "Highest exp. level : ",
        'potion_used' : "Potion used : ",
        'fight_victory' : "Monsters defeated  : ",
        'chest_open' : "Chest opened : ",
        'chest_trap' : "Trapped chest : ",
        'chest_not_opened' : "Chest not opened : ",
        'spirit_meet' : "Spirit meet : ",
        'merchant_accepted' : "Merchant deals accepted : ",
        'merchant_refused' : "Merchant deals refused : ",
    },
    'vocabulary' : {
        'health' : "Health",
        'score' : "Score",
        'power' : "Power",
        'stamina' : "Stamina",
        'floor' : "Floor",
        'room' : "Room",
        'level' : "Level",
        'point_singular' : "point",
        'point_plural' : "points",
        'hit_singular' : "hit",
        'hit_plural' : "hits",
    },
    'events' : {
        // Level up
        'level_up_1' : "Level up",
        'level_up_2' : "Your health is regenerated, your power and your stamina increase",
        // Simple events
        'healing' : "You use a potion, your health is regenerated",
        'no_event' : "You walk quietly through long corridors",
        'start_game_1' : "An old sign. Most of the words are erased by time.",
        'start_game_2' : "\"Whoever ... the top may ... one of its ...! ... danger, stay in ... and climb the ... top ...\"",
        'start_game_3' : "You continue your journey with a determined step.",
        // Spirits
        'spirit_earth_1' : "A <strong>earth spirit</strong> shares its energy",
        'spirit_earth_2' : "Your stamina increases by ",
        'spirit_light_1' : "A <strong>light spirit</strong> shares its energy",
        'spirit_light_2' : "You win ",
        'spirit_light_3' : " of experience",
        'spirit_fire_1' : "A <strong>fire spirit</strong> shares its energy",
        'spirit_fire_2' : "Your power increases by ",
        'spirit_water_1' : "A <strong>water spirit</strong> shares its energy",
        'spirit_water_2' : "Your health increases by ",
        // Merchant
        'merchant' : "A person stands in front of you. He proposes you a deal ",
        'merchant_no_mineral' : "But you don't have enough <strong>gemstone</strong> ",
        'merchant_proposition' : "Two <strong>gemstones</strong> for",
        'merchant_offer_1' : "Your strength increases a lot",
        'merchant_offer_2' : "Your health and your stamina increase",
        'merchant_offer_3' : "But nothing happened",
        'merchant_accepted' : "The person laughs before casting a spell on you",
        'merchant_refused' : "But you refuse the deal",
        // Chest
        'chest' : "You have found a <strong>chest</strong>",
        'chest_not_opened' : "But you decide not to open it",
        'chest_trap_1' : "But it's a <strong>trap</strong>, a poison is spreading",
        'chest_trap_2' : "You lost ",
        'chest_trap_3' : " of health",
        'chest_scroll' : "You find a <strong>magic scroll</strong>",
        'chest_potion' : "You find a <strong>healing potion</strong>",
        'chest_mineral' : "You find a <strong>gemstone</strong>",
        'chest_limit' : "But you don't have enough room",
        // Fight
        'fight_start' : "appears",
        'fight_win_1' : " defeated with ",
        'fight_win_2' : "You have lost ",
        'fight_win_3' : " of health",
        'fight_win_4' : " of experience",
        'fight_win_5' : "You have won ",
        'fight_magic' : "You have defeated the monster with a magic spell",
        // Game over
        'gameover_1' : "You have lost.<br />You have been at the floor  ",
        'gameover_2' : "Score : ",
        'gameover_button' : "Restart",
    },
    'monsters' : {
        'lich' : "Darkness lich",
        'light_sword' : "Sword of light",
        'golem' : "Stone Golem",
        'dead_warrior' : "Undead warrior",
        'daemon' : "Daemon",
        'minotaur' : "Minotaur",
        'cerberus' : "Cerberus",
        'troll' : "Troll",
        'eye_ghost' : "Evil eye",
        'werewolf' : "Werewolf",
        'monster' : "Sea monster",
        'lizard' : "Lizard man",
        'gargoyle' : "Gargoyle",
        'gobelin' : "Gobelin",
        'snake' : "Snake",
        'bat' : "Bat",
        'slim' : "Blob"
    },
    'tips' : [
        "When the hero's health drops to 0, the game is over. However, leveling up or a potion restores all health points.",
        "The shield stat is used to reduce damage when attacked in combat. It can only be increased by the spirit of the earth.",
        "The fights take place automatically so be sure to choose your fight action.",
        "Each monster requires a number of hits to be defeated which is calculated as follows: monster health / hero strength.",
        "The damage of a monster is calculated according to the following formula: (number of hits to be defeated * strength of the monster) - hero's shield.",
        "Defeating a monster with a spell doesn't grant much experience points but can prevent certain death or very large damage.",
        "The Tower is populated by various spirits. Most of them will help you greatly on your quest.",
        "When you open a chest, you have a chance to stumble upon a monster that will deal damage to you that ignores your shield stat.",
        "The Tower is divided by floors. Each floor itself is made up of 10 rooms. On each floor, the monsters become more powerful.",
        "For the more curious, the end-of-game score is calculated according to the following formula: ((shield + strength + maximum health) * level) * floor.",
        "At the start of the game, each item you can collect is limited to a certain quantity. Later, you can keep more.",
        "A mysterious merchant lives in the Tower, it is possible that he offers you a transaction for gemstones" 
    ]
};

// =================================================
// ============ CORE INITIALISATION

// Create data game or parse it if existing
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