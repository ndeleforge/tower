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

/**
 * Check item availbility
 **/

function checkItemAvailability() {
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
 * Display the content of the game page
 **/

function setGameDisplay(display, clean = true) {
    if (clean) get("#game").innerHTML = display
    else get("#game").innerHTML += display
} 
