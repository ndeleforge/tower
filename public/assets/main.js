// =================================================
// ============ GAME START

/**
 * Initialize the application
 **/

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

// =================================================
// ============ GAME CORE

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

/**
 * Always check death, level up, items, score and then display all informations before to save game
 **/

function superviseGame() {
    checkGameOver();
    checkLevelUp()
    displayHeader()
    checkIemAvailability()
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

// =================================================
// ============ FIGHT EVENT

/**
 * Initialize the fight event : allow attack, magic or escaping
 **/

function fight() {
    _game.events.last_action = "fight";
    _game.events.monster = chooseMonster();
    changeDisplay("fight");

    let paragraph_1 = displayImage(_game.events.monster[3], _game.events.monster[2]);
    let paragraph_2 = displayParagraph(`<strong>${_game.events.monster[2]}</strong> ${CONTENT.events.fight_start} !`);
    let paragraph_3 = displayParagraph([
        `${CONTENT.vocabulary.health} : <strong>${_game.events.monster[0]}</strong> /`,
        `${CONTENT.vocabulary.power} : <strong>${_game.events.monster[1]}</strong>`
    ]);

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}

/**
 * Choose the monster according the height in the tower
 **/

function chooseMonster() {
    const monster_health = rand(_game.character.floor * 2, _game.character.floor * 5);
    let monster_strenght = parseInt(rand(monster_health / 4, monster_health / 3));
    if (monster_strenght <= 0) monster_strenght = 1;  // Can't be null or negative

    const monsters = [
        { health_threshold: 900, name: CONTENT.monsters.lich, image: SETTINGS.images.monster17 },
        { health_threshold: 700, name: CONTENT.monsters.light_sword, image: SETTINGS.images.monster16 },
        { health_threshold: 500, name: CONTENT.monsters.golem, image: SETTINGS.images.monster15 },
        { health_threshold: 400, name: CONTENT.monsters.dead_warrior, image: SETTINGS.images.monster14 },
        { health_threshold: 350, name: CONTENT.monsters.daemon, image: SETTINGS.images.monster13 },
        { health_threshold: 300, name: CONTENT.monsters.minotaur, image: SETTINGS.images.monster12 },
        { health_threshold: 250, name: CONTENT.monsters.cerberus, image: SETTINGS.images.monster11 },
        { health_threshold: 220, name: CONTENT.monsters.troll, image: SETTINGS.images.monster10 },
        { health_threshold: 190, name: CONTENT.monsters.eye_ghost, image: SETTINGS.images.monster09 },
        { health_threshold: 160, name: CONTENT.monsters.werewolf, image: SETTINGS.images.monster08 },
        { health_threshold: 130, name: CONTENT.monsters.monster, image: SETTINGS.images.monster07 },
        { health_threshold: 100, name: CONTENT.monsters.lizard, image: SETTINGS.images.monster06 },
        { health_threshold: 80, name: CONTENT.monsters.gargoyle, image: SETTINGS.images.monster05 },
        { health_threshold: 60, name: CONTENT.monsters.gobelin, image: SETTINGS.images.monster04 },
        { health_threshold: 40, name: CONTENT.monsters.snake, image: SETTINGS.images.monster03 },
        { health_threshold: 20, name: CONTENT.monsters.bat, image: SETTINGS.images.monster02 },
        { health_threshold: 0, name: CONTENT.monsters.slim, image: SETTINGS.images.monster01 }
    ];

    for (const monster of monsters) {
        if (monster_health > monster.health_threshold) {
            return [monster_health, monster_strenght, monster.name, monster.image];
        }
    }
}

/**
 * Fight monster by physical attack : 100% of experience, taking damage
 **/

function attack() {
    _game.events.sub_action = "fightOver";
    _game.stats.fight_victory++;
    playSound("attack");
    changeDisplay("normal");

    // Damage taken
    const nbHit = Math.ceil(_game.events.monster[0] / _game.character.power);
    let damage = parseInt(((nbHit - 1) - _game.character.stamina) * _game.events.monster[1])
    if (nbHit == 1 || damage < 0) damage = 0; // Can't be negative
    _game.character.health = _game.character.health - damage;

    // Experience
    const xp = rand(parseInt(_game.character.xp_to / 10), parseInt(_game.character.xp_to / 8));
    _game.character.xp = _game.character.xp + xp;

    // Display
    let paragraph_1 = displayImage(_game.events.monster[3], _game.events.monster[2]);
    let paragraph_2 = displayParagraph([
        `<strong>${_game.events.monster[2]} </strong> ${CONTENT.events.fight_win_1} <strong>`,
        `${nbHit} </strong> ${plural(nbHit, CONTENT.vocabulary.hit_singular, CONTENT.vocabulary.hit_plural)}`
    ])
    let paragraph_3 = displayParagraph([
        `${CONTENT.events.fight_win_2} <strong>${damage}</strong>`,
        `${plural(damage, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural)} ${CONTENT.events.fight_win_3}`
    ], "bad_information");

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;

    // Display XP gain only if still alive
    if (_game.character.health > 0)
        get("#game").innerHTML += displayParagraph([
            `${CONTENT.events.fight_win_5} <strong>${xp}</strong>`,
            `${plural(xp, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural)} ${CONTENT.events.fight_win_4}`
        ], "good_information");
}

/**
 * Fight monster by magic : no damage but less experience
 **/

function useScroll() {
    if (_game.character.item_scroll > 0) {
        _game.events.sub_action = "fightOver";
        _game.character.item_scroll--;
        _game.stats.fight_victory++;
        playSound("scroll");
        changeDisplay("normal");

        // Experience
        const xp = parseInt(_game.character.xp_to / 10);
        _game.character.xp = _game.character.xp + xp;

        // Display
        let paragraph_1 = displayImage(_game.events.monster[3], _game.events.monster[2]);
        let paragraph_2 = displayParagraph(CONTENT.events.fight_magic);
        let paragraph_3 = displayParagraph([
            `${CONTENT.events.fight_win_5} <strong>${xp}</strong>`,
            `${plural(xp, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural)} ${CONTENT.events.fight_win_4} `
        ], "good_information");

        get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
    }
}


// =================================================
// ============ CHEST EVENT

/**
 * Initialize the chest event : allow open / avoid
 **/

function chest() {
    _game.events.last_action = "chest";
    changeDisplay("chest");

    paragraph_1 = displayImage(SETTINGS.images.chest);
    paragraph_2 = `<p>${CONTENT.events.chest}.</p>`;

    get("#game").innerHTML = paragraph_1 + paragraph_2;
}

/**
 * Open the chest : randomly choose between trap, potion, magic or scroll
 **/

function openChest() {
    _game.events.sub_action = "chestOver";
    _game.stats.chest_open++;
    playSound("chest");
    changeDisplay("normal");

    const loot = rand(0, 1);
    let limited = false;
    let paragraph_1, paragraph_2, paragraph_3;

    // Potion (11,12,13,14,15)
    if (loot > 10) {
        SETTINGS.data.item_limit > _game.character.item_potion ? _game.character.item_potion++ : limited = true;

        paragraph_1 = displayImage(SETTINGS.images.chest_open);
        paragraph_2 = displayParagraph(CONTENT.events.chest_potion);
        if (limited) paragraph_3 = displayParagraph(CONTENT.events.chest_limit, "bad_information");
    }

    // Spell (6,7,8,9,10)
    else if (loot > 5) {
        SETTINGS.data.item_limit > _game.character.item_scroll ? _game.character.item_scroll++ : limited = true;

        paragraph_1 = displayImage(SETTINGS.images.chest_open);
        paragraph_2 = displayParagraph(CONTENT.events.chest_scroll);
        if (limited) paragraph_3 = displayParagraph(CONTENT.events.chest_limit, "bad_information");
    }

    // Mineral (2,3,4,5)
    else if (loot > 1) {
        SETTINGS.data.item_limit > _game.character.item_mineral ? _game.character.item_mineral++ : limited = true;

        paragraph_1 = displayImage(SETTINGS.images.chest_open);
        paragraph_2 = displayParagraph(CONTENT.events.chest_mineral);
        if (limited) paragraph_3 = displayParagraph(CONTENT.events.chest_limit, "bad_information");
    }

    // Trap (0,1)
    else {
        _game.stats.chest_trap++;
        const damage = rand(1, _game.character.health / 5);
        _game.character.health = _game.character.health - damage;

        paragraph_1 = displayImage(SETTINGS.images.chest_open);
        paragraph_2 = displayParagraph(CONTENT.events.chest_trap_1);
        paragraph_3 = displayParagraph([
            CONTENT.events.chest_trap_2,
            `<strong> ${damage} </strong>`,
            plural(damage, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural),
            CONTENT.events.chest_trap_3
        ], "bad_information");
    }

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}

/**
 * Avoid the chest and do not open it
 **/

function closeChest() {
    _game.events.sub_action = "chestOver";
    _game.stats.chest_not_opened++;
    changeDisplay("normal");

    let paragraph_1 = displayImage(SETTINGS.images.chest);
    let paragraph_2 = displayParagraph(CONTENT.events.chest);
    let paragraph_3 = displayParagraph(CONTENT.events.chest_not_opened);

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}


// =================================================
// ============ MERCHANT EVENT

/**
 * Meeting with the merchant : exchange of minerals
 **/

function merchant() {
    _game.events.last_action = "merchant";

    let paragraph_1 = displayImage(SETTINGS.images.merchant);
    let paragraph_2 = displayParagraph(CONTENT.events.merchant);
    let paragraph_3;

    // If enough mineral
    if (_game.character.item_mineral > 1) {
        changeDisplay("merchant");
        paragraph_3 = displayParagraph(CONTENT.events.merchant_proposition);
    }

    // If not
    else {
        _game.events.sub_action = "merchantOver";
        paragraph_3 = displayParagraph(CONTENT.events.merchant_no_mineral);
    }

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3
}

/**
 * Accept the offer of the merchant
 **/

function acceptMerchant() {
    _game.events.sub_action = "merchantOver";
    _game.stats.merchant_accepted++;
    _game.character.item_mineral = _game.character.item_mineral - 2;
    playSound("merchant");
    changeDisplay("normal");

    const deal = rand(1, 3);
    let paragraph_1, paragraph_2, paragraph_3;

    // Offer 1 : power + 3
    if (deal == 3) {
        _game.character.power = _game.character.power + 3;

        paragraph_1 = displayImage(SETTINGS.images.merchant);
        paragraph_2 = displayParagraph(CONTENT.events.merchant_accepted);
        paragraph_3 = displayParagraph(CONTENT.events.merchant_offer_1, "good_information");
    }

    // Offer 2 : health + 10 and stamina + 2
    else if (deal == 2) {
        _game.character.health_max = _game.character.health_max + 10;
        _game.character.stamina = _game.character.stamina + 2;

        paragraph_1 = displayImage(SETTINGS.images.merchant);
        paragraph_2 = displayParagraph(CONTENT.events.merchant_accepted);
        paragraph_3 = displayParagraph(CONTENT.events.merchant_offer_2, "good_information");
    }

    // Offer 3 : nothing
    else {
        paragraph_1 = displayImage(SETTINGS.images.merchant);
        paragraph_2 = displayParagraph(CONTENT.events.merchant_accepted);
        paragraph_3 = displayParagraph(CONTENT.events.merchant_offer_3, "bad_information");
    }

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}

/**
 * Refuse the offer of the merchant
 **/

function refuseMerchant() {
    _game.events.sub_action = "merchantOver";
    _game.stats.merchant_refused++;
    changeDisplay("normal");

    paragraph_1 = displayImage(SETTINGS.images.merchant);
    paragraph_2 = displayParagraph(CONTENT.events.merchant_accepted);
    paragraph_3 = displayParagraph(CONTENT.events.merchant_refused, "bad_information");

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}

// =================================================
// ============ OTHERS EVENTS

/**
 * Use a potion and regain all health
 **/

function usePotion() {
    if (_game.character.item_potion > 0 && _game.character.health < _game.character.health_max) {
        _game.character.item_potion--;
        _game.character.health = _game.character.health_max;
        _game.stats.potion_used++;
        playSound("potion");

        get("#game").innerHTML += '<hr>' + displayParagraph(CONTENT.events.healing, "good_information");
    }
}

/**
 * When there is no event
 **/

function noEvent() {
    _game.events.last_action = "no_event";

    get("#game").innerHTML = displayImage();
    get("#container_img").style.background = "url('assets/image/" + SETTINGS.images.no_event + "') no-repeat center";
    get("#container_img").style.backgroundSize = "cover";
    get("#game").innerHTML += displayParagraph(CONTENT.events.no_event);
}

/**
 * Meeting with a spirit : randomly choose between fire, water, earth and light
 **/

function spirit() {
    _game.events.last_action = "spirit";
    _game.stats.spirit_meet++;

    const meeting = rand(1, 4)
    let paragraph_1, paragraph_2, paragraph_3;

    // Earth spirit : add stamina
    if (meeting == 4) {
        _game.character.stamina = _game.character.stamina + SETTINGS.data.spirit_stamina;

        paragraph_1 = displayImage(SETTINGS.images.earth_spirit);
        paragraph_2 = displayParagraph(CONTENT.events.spirit_earth_1);
        paragraph_3 = displayParagraph([
            CONTENT.events.spirit_earth_2,
            `<strong>${SETTINGS.data.spirit_stamina}</strong>`,
            plural(SETTINGS.data.spirit_stamina, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural)
        ], "good_information");
    }

    // 5-6 : Light spirit : add experience
    else if (meeting == 3) {
        const xp = rand(parseInt(_game.character.xp_to / 10), parseInt(_game.character.xp_to / 5));
        _game.character.xp = _game.character.xp + xp;

        paragraph_1 = displayImage(SETTINGS.images.light_spirit);
        paragraph_2 = displayParagraph(CONTENT.events.spirit_light_1);
        paragraph_3 = displayParagraph([
            CONTENT.events.spirit_light_2,
            `<strong>${xp}</strong>`,
            plural(xp, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural),
            CONTENT.events.spirit_light_3
        ], "good_information");
    }

    // 3-4 : Fire spirit : add power
    else if (meeting == 2) {
        _game.character.power = _game.character.power + SETTINGS.data.spirit_power;

        paragraph_1 = displayImage(SETTINGS.images.fire_spirit);
        paragraph_2 = displayParagraph(CONTENT.events.spirit_fire_1);
        paragraph_3 = displayParagraph([
            CONTENT.events.spirit_fire_2,
            `<strong>${SETTINGS.data.spirit_power}</strong>`,
            plural(SETTINGS.data.spirit_power, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural)
        ], "good_information");
    }

    // 1-2 : Water spirit : add health
    else {
        _game.character.health_max = _game.character.health_max + SETTINGS.data.spirit_health;

        paragraph_1 = displayImage(SETTINGS.images.water_spirit);
        paragraph_2 = displayParagraph(CONTENT.events.spirit_water_1);
        paragraph_3 = displayParagraph([
            CONTENT.events.spirit_water_2,
            `<strong>${SETTINGS.data.spirit_health}</strong>`,
            plural(SETTINGS.data.spirit_health, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural)
        ], "good_information");
    }

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}

// =================================================
// ============ GAME DISPLAY

/**
 * Display header of the game
 **/

function displayHeader() {
    // Floor and roomù
    get('#tower').innerHTML = CONTENT.vocabulary.floor + ' ' + _game.character.floor + " - " + CONTENT.vocabulary.room + ' ' + _game.character.room;

    // Progress bars for health
    get("#health_data").innerHTML = _game.character.health + ' / ' + _game.character.health_max;
    get("#health").style.width = ((_game.character.health * 100) / _game.character.health_max) + "%";

    // Progress bars for experience
    get("#level").innerHTML = CONTENT.vocabulary.level + ' ' + _game.character.level;
    get("#xp").style.width = ((_game.character.xp * 100) / _game.character.xp_to) + "%";

    // Stats
    get("#power").innerHTML = '<img src="assets/image/' + SETTINGS.images.icon_power + '" alt="">  ' + _game.character.power;
    get("#stamina").innerHTML = '<img src="assets/image/' + SETTINGS.images.icon_stamina + '" alt="">  ' + _game.character.stamina;

    // Items
    get("#potion").innerHTML = '<img src="assets/image/' + SETTINGS.images.icon_potion + '" alt=""> ' + _game.character.item_potion;
    get("#scroll").innerHTML = '<img src="assets/image/' + SETTINGS.images.icon_scroll + '" alt=""> ' + _game.character.item_scroll;
    get("#mineral").innerHTML = '<img src="assets/image/' + SETTINGS.images.icon_mineral + '" alt="">  ' + _game.character.item_mineral;
}

/**
 * Check item availbility
 **/

function checkIemAvailability() {
    // Potion -> heal button
    if (_game.character.item_potion > 0 && _game.character.health != _game.character.health_max) {
        get("#use_potion").classList.remove("disabled")
    }
    else {
        get("#use_potion").classList.add("disabled");
    }

    // Scroll -> magic button
    if (_game.character.item_scroll > 0) {
        get("#use_scroll").classList.remove("disabled")
    }
    else {
        get("#use_scroll").classList.add("disabled");
    }
}

/**
 * Modify the screen or the list of accessible buttons
 * @param {string} keyword keyword to hide or show buttons / screen
 **/

function changeDisplay(keyword) {
    if (keyword != "out-game" && keyword != "into-game") {
        get("#classic_mode").style.display = "none";
        get("#chest_mode").style.display = "none";
        get("#merchant_mode").style.display = "none";
        get("#fight_mode").style.display = "none";
    }

    switch (keyword) {
        case "normal":
            get("#classic_mode").style.display = "flex";
            break;
        case "chest":
            get("#chest_mode").style.display = "flex";
            break;
        case "merchant":
            get("#merchant_mode").style.display = "flex";
            break;
        case "fight":
            get("#fight_mode").style.display = "flex";
            break;
        case "out-game":
            get('~header').style.display = "none";
            get('#board').style.display = "none";
            get('#information').style.display = "flex";
            break;
        case "into-game":
            get('~header').style.display = "flex";
            get('#board').style.display = "flex";
            get('#information').style.display = "none";
            break;
    }
}

// =================================================
// ============ GAME AMBIANCE

/**
 * Play sound if it's enabled
 * @param {string} value sound ID
 **/

function playSound(value) {
    if (_game.core.sound == true) {
        get("#sound_" + value).play();
    }
}

/**
 * Turn on and turn off sound
 **/

function checkSound() {
    if (_game.core.sound) {
        _game.core.sound = false;
        get("#volume_button").innerHTML = SETTINGS.icons.sound_off;
        get("#volume_button").style.opacity = 0.5;
    }
    else {
        _game.core.sound = true;
        get("#volume_button").innerHTML = SETTINGS.icons.sound_on;
        get("#volume_button").style.opacity = 1;
    }
}

// =================================================
// ============ GAME MANAGING

/**
 * Check if there is a new version
 **/

function checkVersion() {
    if (_game.core.version != VERSION) {
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

// =================================================
// ============ PAGE BUILD

/**
 * Display an image for the game event
 * @param {string} value path to the image
 **/
function displayImage(value, alt = false) {
    return alt ? `<div id="container_img"><img src="assets/image/${value}" alt="${alt}"></div>` : `<div id="container_img"><img src="assets/image/${value}" alt=""></div>`;
}

/**
 * Display a text for the game event
 * @param {string|array} value text to display, can be an array
 * @param {string} classname class to attribute to the text
 **/
function displayParagraph(value, classname = false) {
    if (Array.isArray(value)) value = value.join(' ');
    return classname ? `<p class="${classname}">${value}.</p>` : `<p>${value}.</p>`;
}

/**
 * Add all the sources sounds into the HTML
 **/

function addSound() {
    Object.keys(SETTINGS.sounds).forEach(sound => {
        const audio = document.createElement("audio");
        audio.id = sound;
        audio.preload = "auto";
        get("~body").appendChild(audio);

        const source = document.createElement("source");
        source.src = "assets/sound/" + SETTINGS.sounds[sound] + ".mp3";
        source.type = "audio/mpeg";
        get("#" + sound).appendChild(source);
    })
}

/**
 * Create all the buttons and linked actions
 **/

function createButtons() {
    // Menu
    get("#open_menu").style.display = "block";
    get("#open_menu").style.visibility = "visible";
    get("#open_menu_img").src = SETTINGS.images.menu_closed;

    // Actions
    get("#attack").addEventListener("click", attack);
    get("#use_scroll").addEventListener("click", useScroll);
    get("#use_potion").addEventListener("click", usePotion);
    get("#open_chest").addEventListener("click", openChest);
    get("#close_chest").addEventListener("click", closeChest);
    get("#accept_offer").addEventListener("click", acceptMerchant);
    get("#refuse_offer").addEventListener("click", refuseMerchant);
    get("#move").addEventListener("click", playTurn);
}

/**
* Create the menu
**/

function createMenu() {
    get("#open_menu").addEventListener("click", openMenu);
    get("#volume_button").addEventListener("click", checkSound);
    get('#confirm_restart').addEventListener("click", restartGame);
    get('#confirm_delete').addEventListener("click", deleteSave);
}

/**
* Display ON/OFF at the start / load of the game
**/

function displaySoundButton() {
    if (!_game.core.sound) {
        get("#volume_button").innerHTML = SETTINGS.icons.sound_off;
        get("#volume_button").style.opacity = 0.5;
    }
    else {
        get("#volume_button").innerHTML = SETTINGS.icons.sound_on;
    }
}

/**
 * Open and close the menu
 **/

function openMenu() {
    if (get("#menu").style.display == "" || get("#menu").style.display == "none") {
        get("#blank_menu").style.display = "block";
        get("#menu").style.display = "flex";
        get("#open_menu").style.zIndex = "50";
        get("#open_menu_img").src = SETTINGS.images.menu_opened;

        // Display records
        Object.values(CONTENT.stats).forEach((title, index) => {
            if (index == 0) {
                get('#list_stats').innerHTML = "<li>" + title + Object.values(_game.stats)[index] + "</li>";
            }
            else {
                get('#list_stats').innerHTML += "<li>" + title + Object.values(_game.stats)[index] + "</li>";
            }
        });
    }
    else {
        get("#blank_menu").style.display = "none";
        get("#menu").style.display = "none";
        get("#open_menu").style.zIndex = "5";
        get("#open_menu_img").src = SETTINGS.images.menu_closed;
    }
}