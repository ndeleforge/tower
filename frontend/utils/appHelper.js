import { State, Data, getContent } from "./appState.js";

// Hero attribute

const heroAttribute = {
    level: "level",
    power: "power",
    stamina: "stamina",
    health_max: "health_max",
    health: "health",
    experience: "experience",
    experience_to: "experience_to"
};

export function getHeroAttribute(stat) {
    const key = heroAttribute[stat];
    return State.character[key];
}

export function setHeroAttribute(stat, value) {
    const key = heroAttribute[stat];
    State.character[key] = value;
}

export function updateHeroAttribute(stat, modifier, nb) {
    const key = heroAttribute[stat];
    if (!(key in State.character)) State.character[key] = 0;
    modifyState(State.character, key, modifier, nb);
}

// Game situation

const gameSituation = {
    floor: "floor",
    room: "room",
    score: "score"
}

export function getSituation(data) {
    const key = gameSituation[data];
    return State.situation[key];
}

export function setSituation(data, value) {
    const key = gameSituation[data];
    State.situation[key] = value;
}

export function updateSituation(data, modifier, nb) {
    const key = gameSituation[data];
    if (!(key in State.situation)) State.situation[key] = 0;
    modifyState(State.situation, key, modifier, nb);
}

// Inventory

const inventory = {
    potion: "item_potion",
    scroll: "item_scroll",
    mineral: "item_mineral",
};

const inventoryLimit = {
    potion: "limit_potion",
    scroll: "limit_scroll",
    mineral: "limit_mineral"
}

export function getInventory(item) {
    const key = inventory[item];
    return State.character[key];
}

export function getInventoryLimit(item) {
    const key = inventoryLimit[item];
    return State.character[key];
}

export function updateInventory(item, modifier, nb) {
    const key = inventory[item];
    if (!(key in State.character)) State.character[key] = 0;
    modifyState(State.character, key, modifier, nb);
}

// Game record

const gameRecord = {
    best_score: "best_score",
    total_game: "total_game",
    best_floor: "best_floor",
    total_room: "total_room",
    max_level: "max_level",
    potion_used: "potion_used",
    fight: "fight",
    chest_opened: "chest_opened",
    chest_not_opened: "chest_not_opened",
    chest_trap: "chest_trap",
    spirit_meet: "spirit_meet",
    merchant_accepted: "merchant_accepted",
    merchant_refused: "merchant_refused"
};

export function getGameRecord(stat) {
    const key = gameRecord[stat];
    return State.stats[key];
}

export function setGameRecord(stat, value) {
    const key = gameRecord[stat];
    State.stats[key] = value;
}

export function updateGameRecord(stat) {
    const key = gameRecord[stat];
    if (!(key in State.stats)) State.stats[key] = 0;
    State.stats[key]++;
}

// Event
// No mapper

export function getEvent(type) {
    return State.events[type];
}

export function setEvent(type, event) {
    if (State.events[type] !== event) {
        State.events[type] = event;
    }
}

// Core data
// No mapper

export function getCoreData(core_data) {
    return State.core[core_data];
}

export function setCoreData(core_data, value) {
    State.core[core_data] = value;
}

// Modifiers

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

export function getSpiritModifier(stat) {
    const key = spiritModifiers[stat];
    return Data.settings.modifier[key];
}

export function getLevelUpModifier(stat) {
    const key = levelUpModifiers[stat];
    return Data.settings.modifier[key];
}

// Generic functions

function modifyState(target, key, modifier, value) {
    if (!target.hasOwnProperty(key)) return;
    target[key] += modifier === "add" ? value : -value;
}

export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pluralize(key, count) {
    const singular = getContent("vocabulary", `${key}_singular`)
    const plural = getContent("vocabulary", `${key}_plural`)

    return count > 1 ? plural : singular
}
