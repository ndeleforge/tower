import { reactive } from 'vue'

// ------------------------------
// Current state
// ------------------------------

export const State = reactive({})

// ------------------------------
// Sounds
// ------------------------------

export const Sounds = reactive({})

// ------------------------------
// Data
// ------------------------------

export const Data = reactive({
    version: null,
    settings: {},
    content: {}
})

export function getVersion() {
    return Data.version
}

export function getSettings(category, key = null) {
    if (!category) return Data.settings
    if (!(category in Data.settings)) return null

    return key ? Data.settings[category][key] : Data.settings[category]
}

export function getContent(category, key = null) {
    if (!category) return Data.content
    if (!(category in Data.content)) return null

    const section = Data.content[category]

    if (Array.isArray(section)) {
        return typeof key === 'number' ? section[key] ?? null : section
    }

    return key ? section?.[key] ?? null : section
}

// ------------------------------
// Interface
// ------------------------------

export const Interface = reactive({
    screen: null,
    section: 'board',
    menu: false,
    modale: false,
    modaleAction: null
})

export function getInterface(key) {
    if (key in Interface) {
        return Interface[key];
    } else {
        console.warn(`Interface key "${key}" does not exist.`);
        return undefined;
    }
}

export function setInterface(key, value) {
    if (key in Interface) {
        Interface[key] = value;
    } else {
        console.warn(`Interface key "${key}" does not exist.`);
    }
}
