import { get } from './utils.js'
import { Data, State } from './gameState.js'
import { deleteSave, restartGame } from './saveManager.js'
import { displaySoundButton, toggleSound } from './soundManager.js'
import { playTurn } from './gameManager.js'
import { attack, useScroll } from './fightManager.js'
import { usePotion } from './eventsManager.js'
import { openChest, closeChest } from './chestManager.js'
import { acceptMerchant, refuseMerchant } from './merchantManager.js'

/**
 * Display an image for the game event
 * @param {string} value path to the image
 **/

export function displayImage(value, alt = false) {
    return alt ? `<div id="container_img"><img src="assets/image/${value}" alt="${alt}"></div>` : `<div id="container_img"><img src="assets/image/${value}" alt=""></div>`;
}

/**
 * Display a text for the game event
 * @param {string|array} value text to display, can be an array
 * @param {string} classname class to attribute to the text
 **/

export function displayParagraph(value, classname = false) {
    if (Array.isArray(value)) value = value.join(' ');
    return classname ? `<p class="${classname}">${value}</p>` : `<p>${value}</p>`;
}

/**
 * Create the interface (all buttons + menu)
 **/

export function createInterface() {
    createButtons();
    createMenu();
    displaySoundButton();
}

/**
 * Create all the buttons and linked actions
 **/

function createButtons() {
    get("#open_menu").style.display = "block";
    get("#open_menu").style.visibility = "visible";
    get("#open_menu_img").src = Data.settings.images.menu_closed;

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
    get("#volume_button").addEventListener("click", toggleSound);
    get('#confirm_restart').addEventListener("click", restartGame);
    get('#confirm_delete').addEventListener("click", deleteSave);
}

/**
 * Open and close the menu
 **/

function openMenu() {
    if (get("#menu").style.display == "" || get("#menu").style.display == "none") {
        get("#blank_menu").style.display = "block";
        get("#menu").style.display = "flex";
        get("#open_menu").style.zIndex = "4";
        get("#open_menu_img").src = Data.settings.images.menu_opened;

        // Display records
        Object.values(Data.content.stats).forEach((title, index) => {
            if (index == 0) {
                get('#list_stats').innerHTML = "<li>" + title + Object.values(State.game.stats)[index] + "</li>";
            }
            else {
                get('#list_stats').innerHTML += "<li>" + title + Object.values(State.game.stats)[index] + "</li>";
            }
        });
    }
    else {
        get("#blank_menu").style.display = "none";
        get("#menu").style.display = "none";
        get("#open_menu").style.zIndex = "5";
        get("#open_menu_img").src = Data.settings.images.menu_closed;
    }
}

/**
 * Modify the screen or the list of accessible buttons
 * @param {string} keyword keyword to hide or show buttons / screen
 **/

export function changeDisplay(keyword) {
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
 * Display the content of the game page
 **/

export function setGameDisplay(display, clean = true) {
    if (clean) get("#game").innerHTML = display
    else get("#game").innerHTML += display
} 
