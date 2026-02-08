import { watch, watchEffect, computed } from "vue";
import {
    setSituation, setCoreData, updateGameRecord, setEvent,
    getGameRecord, getSituation, getHeroAttribute, setGameRecord
} from "./appHelper.js"
import { Data, State } from "./appState.js";

export const SAVE = "TowerData";

// Compute current score
export const currentScore = computed(() => {
    const { power, stamina, health_max, level } = State.character
    const { floor } = State.situation

    return ((power + stamina + health_max) * level * floor) - 30
})

// Compute best score
export const bestScore = computed(() => {
    return Math.max(getGameRecord('best_score'), currentScore.value)
})

// Compute best floor
export const bestFloor = computed(() => {
    return Math.max(getGameRecord('best_floor'), getSituation('floor'))
})

// compute max level
export const maxLevel = computed(() => {
    return Math.max(getGameRecord('max_level'), getHeroAttribute('level'))
})

// Automatically save best scores
watchEffect(() => {
    if (!State.stats) return;

    if (getGameRecord('best_score') < currentScore.value) {
        setGameRecord('best_score', bestScore.value)
    }

    if (getGameRecord('best_floor') < getSituation('floor')) {
        setGameRecord('best_floor', bestFloor.value)
    }

    if (getGameRecord('max_level') < getHeroAttribute('level')) {
        setGameRecord('max_level', maxLevel.value)
    }
})

// Automatically save any changes on the State object
watch(
    State,
    (newState) => {
        setStorage(SAVE, JSON.stringify(newState))
    },
    { deep: true, immediate: false }
)

// Parse existing data or create a new save
export async function loadSave() {
    const saved = getStorage(SAVE)

    if (!saved) {
        Object.assign(State, {
            core: { ...Data.settings.core },
            events: { ...Data.settings.events },
            stats: { ...Data.settings.stats },
            situation: { ...Data.settings.situation },
            character: { ...Data.settings.character }
        })

        setCoreData("language", navigator.language || 'en-US');
    }
    else {
        Object.assign(State, JSON.parse(saved))
    }
}

// Refresh the save by deleting some data but not all (for new start)
function refreshSave() {
    setCoreData("ongoing", false);
    setEvent("game_over", false);
    setEvent("current_event", null);
    updateGameRecord("total_game");
    setSituation("floor", 1);
    setSituation("room", 1);

    const keysToReset = [
        "health", "health_max", "level",
        "power", "stamina", "experience", "experience_to",
        "item_potion", "item_scroll", "item_mineral",
    ];

    const charDefaults = Data.settings.character;
    keysToReset.forEach(key => {
        State.character[key] = charDefaults[key];
    });

    setStorage(SAVE, JSON.stringify(State));
}

// Reset the game by manual action
export function resetGame() {
    refreshSave();
    location.reload();
}

// Delete save and reload the app
export function deleteSave() {
    deleteStorage(SAVE);
    location.reload();
}

// Utility functions
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
