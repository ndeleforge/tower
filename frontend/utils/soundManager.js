import { getCoreData } from './appHelper.js'
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
}

// Play a sound by its name
export function playSound(name) {
    if (Sounds[name] && getCoreData('sound')) {
        Sounds[name].currentTime = 0
        Sounds[name].play()
    }
}
