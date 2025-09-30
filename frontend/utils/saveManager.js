import { setSituation, setCoreData, updateGameStat } from "./helper.js"
import { Data, State } from "./appState.js";
import { watch } from "vue";

export const SAVE = "TowerData";

/**
 * Automatic save on each change of the State object
 **/

watch(
    State.game,
    (newState) => {
        setStorage(SAVE, JSON.stringify(newState))
    },
    { deep: true, immediate: false }
)

/**
 * Parse existing game data or create new data
 **/

export async function loadSave() {
    const saved = getStorage(SAVE)

    if (!saved) {
        Object.assign(State.game, {
            core: { ...Data.settings.core },
            events: { ...Data.settings.events },
            stats: { ...Data.settings.stats },
            situation: { ...Data.settings.situation },
            character: { ...Data.settings.character }
        })

        setCoreData("language", navigator.language || 'en-US');
    }
    else {
        Object.assign(State.game, JSON.parse(saved))
    }

    console.log("Loaded game data:", saved ? JSON.parse(saved) : State.game);
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

export function deleteGame() {
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

export function getStorage(key) {
    return key != null ? localStorage.getItem(key) : null
}

export function setStorage(key, value) {
    if (key != null && value != null) {
        localStorage.setItem(key, value)
    }
}

export function deleteStorage(key) {
    if (key != null) {
        localStorage.removeItem(key)
    }
}
