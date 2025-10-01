import { get } from './utils.js'
import { getCoreData, setCoreData } from './appHelper.js'
import { Data, Sounds } from './appState.js'

// Add sound objects to the Sounds state
export async function initSound() {
    Object.entries(Data.settings?.sounds || {}).forEach(([sound, filename]) => {
        if (!Sounds[sound]) {
            const audio = new Audio(`sound/${filename}.mp3`)
            audio.preload = 'auto'
            Sounds[sound] = audio
        }
    })
    console.log("Sounds initialized:", Object.keys(Sounds));
}

// Play a sound by its name
export function playSound(name) {
    if (Sounds[name]) {
        Sounds[name].currentTime = 0
        Sounds[name].play()
        console.log(`Playing sound: ${name}`);
    }
}

////////////////////////////////////////////////////

/**
 * Turn on and turn off sound
 **/

export function toggleSound() {
    if (getCoreData("sound") == true) {
        setCoreData("sound", false);
        get("#volume_button").style.opacity = 0.5;
    }
    else {
        setCoreData("sound", true);
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
