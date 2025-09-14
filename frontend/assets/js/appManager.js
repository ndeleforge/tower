import { get } from './utils.js'
import { Data, State } from './gameState.js'

/**
 * Load the app version from backend
 **/

export async function loadVersion() {
    const url = "/api/version"
    const response = await fetch(url);

    if (!response.ok) {
        console.error("Impossible to load app version");
        return;
    }

    const data = await response.json();
    Data.version = data.version;
}

/**
 * Load the settings from backend
 **/

export async function loadSettings() {
    const url = "/api/settings"
    const response = await fetch(url);

    if (!response.ok) {
        console.error("Impossible to load settings");
        return;
    }
    Data.settings = await response.json();
}

/**
 * Load the content from backend
 **/

export async function loadLanguage() {
    const lang = (State.game.core.language == "fr-FR") ? 'fr' : 'en';
    const url = `/api/locale/${lang}`
    const response = await fetch(url);

    if (!response.ok) {
        console.error("Impossible to load language");
        return;
    }
    Data.content = await response.json();
}

/**
 * Populate all text content according the language
 **/

export function populateLang() {
    Object.keys(Data.content.main).forEach(key => {
        if (get("#" + key)) {
            get("#" + key).innerHTML = Data.content.main[key];
        }
    });
}
