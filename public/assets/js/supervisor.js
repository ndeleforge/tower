/**
 * Always check death, level up, items, score and then display all informations before to save game
 **/

function superviseGame() {
    checkGameOver();
    checkLevelUp()
    displayHeader()
    checkItemAvailability()
    calculateScore()

    // Save content and save all data 
    if (get("#game").innerHTML != "") {
        _game.events.current_event = get("#game").innerHTML;
    }
    setStorage("TOWER-save", JSON.stringify(_game))
}

/**
 * Check Game Over condition
 * Display the score and allow to restart the game
 **/

function checkGameOver() {
    if (_game.character.health < 1) {
        clearInterval(_refresh_display);

        changeDisplay("out-game");
        get("#information").style.backgroundColor = getVariableCSS("background-gameover");

        let paragraph_1 = displayParagraph(CONTENT.events.gameover_1 + _game.character.floor);
        let paragraph_2 = displayParagraph(CONTENT.events.gameover_2 + _game.character.score, "important");

        get('#information').innerHTML = paragraph_1 + paragraph_2;
        get('#information').innerHTML += "<button class=\"button button_action\" id=\"restart\">" + CONTENT.events.gameover_button + "</button>";

        get('#restart').addEventListener("click", () => { location.reload(); });
        resetGame();
    }
}

/**
 * Check Level up condition
 * Increase stats and heal the character
 **/

function checkLevelUp() {
    if (_game.character.xp >= _game.character.xp_to) {
        // Level up
        _game.character.level++;
        _game.character.power = _game.character.power + SETTINGS.data.level_up_power;
        _game.character.stamina = _game.character.stamina + SETTINGS.data.level_up_stamina;
        _game.character.health_max = _game.character.health_max + SETTINGS.data.level_up_health;

        // Heal and reset of the experience
        _game.character.health = _game.character.health_max;
        _game.character.xp = 0;
        _game.character.xp_to = parseInt(_game.character.xp_to * 1.25);

        // Display
        let paragraph_1 = '<hr>' + displayParagraph(CONTENT.events.level_up_1, "good_information");
        let paragraph_2 = displayParagraph(CONTENT.events.level_up_2, "good_information");
        get("#game").innerHTML += paragraph_1 + paragraph_2;
    }
}

/**
 * Check if there is a new version
 * Reload only for major version
 **/

function checkVersion() {
    const currentVersion = _game.core.version.split('.').map(Number);
    const newVersion = VERSION.split('.').map(Number);

    if (newVersion[0] > currentVersion[0]) {
        get("#blank_popup").style.display = "block";
        get("#popup").style.display = "flex";
        get("#popup_text").innerHTML = CONTENT.main.updated;

        get("#popup_cancel").style.display = "none"; // Only accept button must be visible
        get("#popup_accept").style.width = "100%";
        get("#popup_accept").style.borderRadius = "0 0 10px 10px";

        get("#popup_accept").addEventListener("click", () => {
            clearInterval(_refresh_display);
            deleteStorage("TOWER-save");
            location.reload();
        });
    }

    setStorage("TOWER-save", JSON.stringify(_game));
}

/**
 * Calculate score at each room
 **/

function calculateScore() {
    // Main score
    _game.character.score = (((_game.character.power + _game.character.stamina + _game.character.health_max) * _game.character.level) * _game.character.floor) - 30;

    // If the score is superior to the one old
    if (_game.character.score > _game.stats.best_score) _game.stats.best_score = _game.character.score;

    // If the floor is higher to the old one
    if (_game.character.floor > _game.stats.best_floor) _game.stats.best_floor = _game.character.floor;

    // If the max level is higher to the old one
    if (_game.character.level > _game.stats.max_level) _game.stats.max_level = _game.character.level;
}