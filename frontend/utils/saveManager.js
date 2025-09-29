import { setSituation, updateCoreData, updateGameStat } from "./helper.js"
import { Data, State } from "./gameState.js";

export const SAVE = "TowerData";

/**
 * Parse existing game data or create new data
 **/

export async function loadData() {
    if (getStorage(SAVE)) {
        State.game = JSON.parse(getStorage(SAVE));
    }
    else {
        State.game = {
            core: { ...Data.settings.core },
            events: { ...Data.settings.events },
            stats: { ...Data.settings.stats },
            situation: { ...Data.settings.situation },
            character: { ...Data.settings.character }
        };

        setStorage(SAVE, JSON.stringify(State.game));
    }
}

/**
 * Reset the game but keeps some data such as scores etc.
 **/

export async function resetGame() {
    updateCoreData("ongoing", false);
    updateGameStat("total_game");
    setSituation("floor", 1);
    setSituation("room", 1);

    const keysToReset = [
        "health", "health_max", "level",
        "power", "stamina", "experience", "experience_to", 
        "item_potion", "item_scroll", "item_mineral",
    ];

    const charDefaults = Data.settings.character;
    keysToReset.forEach(key => {
        State.game.character[key] = charDefaults[key];
    });

    setStorage(SAVE, JSON.stringify(State.game));
}
/**
 * Restart manually the game
 **/

export function restartGame() {
    get("#blank_popup").style.display = "block";
    get("#popup").style.display = "flex";
    get("#popup_text").innerHTML = Data.content.main.popup_restart;

    get("#popup_cancel").addEventListener("click", () => {
        get("#blank_popup").style.display = "none";
        get("#popup").style.display = "none";
    });

    get("#popup_accept").addEventListener("click", () => {
        clearInterval(State.refresh_display);
        updateCoreData("ongoing", false);
        resetGame();
        location.reload();
    });
}

/**
 * Delete all game data manually
 **/

export function deleteSave() {
    get("#blank_popup").style.display = "block";
    get("#popup").style.display = "flex";
    get("#popup_text").innerHTML = Data.content.main.popup_delete;

    get("#popup_cancel").addEventListener("click", () => {
        get("#blank_popup").style.display = "none";
        get("#popup").style.display = "none";
    });

    get("#popup_accept").addEventListener("click", () => {
        clearInterval(State.refresh_display);
        deleteStorage(SAVE);
        location.reload();
    });
}

/**
 *  Get a local storage
 * @param {string} name name of the local storage
 * @return value of the local storage
 **/

export function getStorage(name) {
    if (name && localStorage.getItem(name)) {
        return localStorage.getItem(name);
    }
}

/**
 *  Set a local storage
 * @param {string} name name of the local storage
 * @param {string} value value of the local storage
 **/

export function setStorage(name, value) {
    if (name && value) {
        localStorage.setItem(name, value);
    }
}

/**
 *  Remove a local storage
 * @param {string} name name of the local storage
 **/

export function deleteStorage(name) {
    if (name && localStorage.getItem(name)) {
        localStorage.removeItem(name);
    }
}
