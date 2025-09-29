import { Data, State } from './gameState.js'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

/**
 * Load the app version from backend
 **/

export async function loadVersion() {
    const url = "/api/version"
    const response = await fetch(`${backendUrl}${url}`);

    if (!response.ok) {
        console.error("Impossible to load app version");
        return;
    }

    Data.version = await response.json();
}

/**
 * Load the settings from backend
 **/

export async function loadSettings() {
    const url = "/api/settings"
    const response = await fetch(`${backendUrl}${url}`);

    if (!response.ok) {
        console.error("Impossible to load settings");
        return;
    }
    Data.settings = await response.json();
}

/**
 * Load the content from backend
 **/

export async function loadContent() {
    const lang = (State.game.core.language == "fr-FR") ? 'fr' : 'en';
    const url = `/api/locale/${lang}`
    const response = await fetch(`${backendUrl}${url}`);

    if (!response.ok) {
        console.error("Impossible to load content");
        return;
    }
    Data.content = await response.json();
}

/**
 * Populate all text content according the language


export function populateLang() {
    Object.keys(Data.content.main).forEach(key => {
        if (get("#" + key)) {
            get("#" + key).innerHTML = Data.content.main[key];
        }
    });
}
 **/