import { State, Data } from "./appState.js";

const heroStatsMap = {
    level: "level",
    power: "power",
    stamina: "stamina",
    health_max: "health_max",
    health: "health",
    experience: "experience",
    experience_to: "experience_to"
};

const gameSituationMap = {
    floor: "floor",
    room: "room",
    score: "score"
}

const inventoryMap = {
    potion: "item_potion",
    scroll: "item_scroll",
    mineral: "item_mineral",
};

const inventoryLimitMap = {
    potion: "limit_potion",
    scroll: "limit_scroll",
    mineral: "limit_mineral"
}

const gameStatsMap = {
    best_score: "best_score",
    total_game: "total_game",
    best_floor: "best_floor",
    total_room: "total_room",
    max_level: "max_level",
    potion_used: "potion_used",
    fight: "fight",
    chest_opened: "chest_opened",
    chest_not_open: "chest_not_opened",
    chest_trap: "chest_trap",
    spirit_meet: "spirit_meet",
    merchant_accepted: "merchant_accepted",
    merchant_refused: "merchant_refused"
};

const validEvents = {
    last_action: ["no_event", "spirit", "chest", "merchant", "fight"],
    sub_action: ["chest_over", "merchant_over", "fight_over"],
    new_action: [],
    current_event: []
};

const spiritModifiers = {
    power: "spirit_power",
    health: "spirit_health",
    stamina: "spirit_stamina"
};

const levelUpModifiers = {
    power: "level_up_power",
    health: "level_up_health",
    stamina: "level_up_stamina"
};

// Generic function to modify a state property
function modifyState(target, key, modifier, value) {
    if (!target.hasOwnProperty(key)) return;
    target[key] += modifier === "add" ? value : -value;
}

// Hero stats
export function getHeroStat(stat) {
    const key = heroStatsMap[stat];
    return State.game.character[key];
}

export function setHeroStat(stat, value) {
    const key = heroStatsMap[stat];
    State.game.character[key] = value;
}

export function updateHeroStat(stat, modifier, nb) {
    const key = heroStatsMap[stat];
    if (!(key in State.game.character)) State.game.character[key] = 0;
    modifyState(State.game.character, key, modifier, nb);
}

// Game situation
export function getSituation(data) {
    const key = gameSituationMap[data];
    return State.game.situation[key];
}

export function setSituation(data, value) {
    const key = gameSituationMap[data];
    State.game.situation[key] = value;
}

export function updateSituation(data, modifier, nb) {
    const key = gameSituationMap[data];
    if (!(key in State.game.situation)) State.game.situation[key] = 0;
    modifyState(State.game.situation, key, modifier, nb);
}

// Inventory
export function getInventory(item) {
    const key = inventoryMap[item];
    return State.game.character[key];
}

export function getInventoryLimit(item) {
    const key = inventoryLimitMap[item];
    return State.game.character[key];
}

export function updateInventory(item, modifier, nb) {
    const key = inventoryMap[item];
    if (!(key in State.game.character)) State.game.character[key] = 0;
    modifyState(State.game.character, key, modifier, nb);
}

// Game stats
export function getGameStat(stat) {
    const key = gameStatsMap[stat];
    return State.game.stats[key];
}

export function setGameStat(stat, value) {
    const key = gameStatsMap[stat];
    State.game.stats[key] = value;
}

export function updateGameStat(stat) {
    const key = gameStatsMap[stat];
    if (!(key in State.game.stats)) State.game.stats[key] = 0;
    State.game.stats[key]++;
}

// Events
export function getEvent(type) {
    return State.game.events[type];
}

export function setEvent(type, event) {
    if (!State.game.events) State.game.events = {};
    if (!(type in validEvents)) return;

    const allowed = validEvents[type];
    if (allowed.length > 0) {
        State.game.events[type] = allowed.includes(event) ? event : null;
    } else {
        State.game.events[type] = event;
    }
}

// Core data
export function getCoreData(core_data) {
    return State.game.core[core_data];
}

export function setCoreData(core_data, value) {
    State.game.core[core_data] = value;
}

// Other functions
export function restoreHealth() {
    setHeroStat("health", getHeroStat("health_max"));
}

export function resetExperience() {
    setHeroStat("experience", 0);
    setHeroStat("experience_to", parseInt(getHeroStat("experience_to") * 1.2));
}

// Modifiers
export function getSpiritModifier(stat) {
    const key = spiritModifiers[stat];
    return Data.settings.modifier[key];
}

export function getLevelUpModifier(stat) {
    const key = levelUpModifiers[stat];
    return Data.settings.modifie[key];
}