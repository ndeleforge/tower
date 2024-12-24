/**
 * Initialize the application
 **/

loadData();
const CONTENT = (_game.core.language.includes("fr")) ? FRENCH : ENGLISH;
loadLanguage();
checkVersion();
_game.core.ongoing == false ? titleScreen() : startGame("load");

/**
 * Display the screen title : show tip and allow new game
 **/

function titleScreen() {
    // Display the start screen
    get('#title_screen').style.display = "flex";
    get('#title_tip').innerHTML = CONTENT.tips[rand(0, CONTENT.tips.length)];

    // Check if the name is registred
    if (_game.core.name != null && _game.core.name != "") {
        get("#title_character").value = _game.core.name
    }
    else {
        get("#title_character").value = "";
        get('#title_character').placeholder = CONTENT.main.title_character_placeholder;
        get('#title_character').focus();
    }

    // Check of the regex and start of the game
    get("#play").addEventListener("click", () => {
        if (get("#title_character").checkValidity()) {
            startGame("new");
        }
        else {
            get("#title_character").style.borderColor = getVariableCSS("error-color");
        }
    });
}

/**
 *  Display the game screen,  create menu and buttons
 * @param {string} mode "new" to start a new game or "load" to load an existing game
 **/

function startGame(mode) {
    // Modify the display
    get('#title_screen').style.display = "none";
    get('#board').style.display = "flex";
    changeDisplay("normal");

    // Build page and config
    addSound();
    createMenu();
    displaySoundButton();
    createButtons();

    // Refresh game display every 100ms
    _refresh_display = setInterval(superviseGame, 100);

    // If it's a new game
    if (mode == "new") {
        _game.core.name = get("#title_character").value;
        _game.events.last_action = null;
        _game.events.new_action = null;
        _game.core.ongoing = true;
        playSound("room");

        let imgTower = displayImage(SETTINGS.images.start);
        let paragraph_1 = displayParagraph(CONTENT.events.start_game_1);
        let paragraph_2 = displayParagraph(CONTENT.events.start_game_2);
        let paragraph_3 = displayParagraph(CONTENT.events.start_game_3);
        get("#game").innerHTML = imgTower + paragraph_1 + paragraph_2 + paragraph_3;
    }

    // If it's not a new game
    else if (mode == "load") {
        // Restore fight screen
        if (_game.events.last_action == "fight" && _game.events.sub_action != "fightOver") {
            changeDisplay("fight");
        }

        // Restore chest screen
        if (_game.events.last_action == "chest" && _game.events.sub_action != "chestOver") {
            changeDisplay("chest");
        }

        // Restore merchant screen
        if (_game.events.last_action == "merchant" && _game.events.sub_action != "merchantOver") {
            changeDisplay("merchant");
        }

        get('#game').innerHTML = _game.events.current_event;
    }
}

/**
 * Main game function which manage floor and room, then call the choiceAction function
 **/

function playTurn() {
    _game.events.sub_action = null;
    _game.character.room++;
    changeDisplay("out-game");

    // At the 10th room
    if (_game.character.room > 10) {
        _refresh_interval = 2000;
        _game.character.room = 1;
        _game.character.floor++;
        playSound("floor");

        get("#information").innerHTML = displayParagraph([CONTENT.vocabulary.floor, parseInt(_game.character.floor)], "important");
    }

    // All rooms expect the 10th
    else {
        _refresh_interval = 1000;
        _game.stats.total_room++;
        playSound("room");

        let paragraph_1 = displayParagraph([CONTENT.vocabulary.floor, parseInt(_game.character.floor)], "important");
        let paragraph_2 = displayParagraph([CONTENT.vocabulary.room, _game.character.room]);
        get("#information").innerHTML = paragraph_1 + paragraph_2;
    }

    // Timeout to show the game again
    setTimeout(function () {
        changeDisplay("into-game");
    }, _refresh_interval);

    // Starting the floor 5, there is one chance on two to meet the merchant at each floor
    if (_game.character.floor > 5 && _game.character.room == 5) {
        const merchantMeeting = rand(1, 2);
        (merchantMeeting == 2) ? merchant() : choiceAction();
    }
    else {
        choiceAction();
    }
}

/**
 * Randomly choose between no event, fight, chest or meeting a spirit
 **/

function choiceAction() {
    const event = rand(1, 4);

    // Spirit event
    if (event == 4) {
        _game.events.new_action = "spirit";
        (_game.events.new_action != _game.events.last_action) ? spirit() : choiceAction();
    }

    // Fight event
    else if (event == 3) {
        _game.events.new_action = "fight";
        (_game.events.new_action != _game.events.last_action) ? fight() : choiceAction();
    }

    // Chest event
    else if (event == 2) {
        _game.events.new_action = "chest";
        (_game.events.new_action != _game.events.last_action) ? chest() : choiceAction();
    }

    // No event
    else {
        _game.events.new_action = "no_event";
        (_game.events.new_action != _game.events.last_action) ? noEvent() : choiceAction();
    }
}
