import { get } from './utils.js'
import { getCoreData, updateCoreData } from './helper.js'
import { Data } from './gameState.js'

/**
 * Play sound if it's enabled
 * @param {string} value sound ID
 **/

export function playSound(value) {
    if (getCoreData("sound") == true) {
        get("#sound_" + value).play();
    }
}

/**
 * Turn on and turn off sound
 **/

export function toggleSound() {
    if (getCoreData("sound") == true) {
        updateCoreData("sound", false);
        get("#volume_button").style.opacity = 0.5;
    }
    else {
        updateCoreData("sound", true);
        get("#volume_button").style.opacity = 1;
    }
}

/**
* Display ON/OFF at the start / load of the game
**/

export function displaySoundButton() {
    if (!getCoreData("sound")) {
        get("#volume_button").style.opacity = 0.5;
    }
}

/**
 * Add all the sources sounds into the HTML
 **/

export function addSoundToHTML() {
    Object.entries(Data.settings.sounds).forEach(([sound, filename]) => {
        if (!get(`#${sound}`)) {
            const audio = document.createElement("audio");
            audio.id = sound;
            audio.preload = "auto";
            audio.src = `assets/sound/${filename}.mp3`;
            audio.type = "audio/mpeg";

            get("~body").appendChild(audio);
        }
    });
}
