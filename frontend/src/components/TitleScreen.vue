<template>
    <div class="container screen">
        <img class="logo" src="/image/event/tower.png" alt="Logo">

        <h1 class="title">{{ Data.content?.main?.title_text }}</h1>

        <form @submit.prevent="startGame">
            <input class="input" type="text" v-model="characterName"
                :placeholder="Data.content?.main?.title_character_placeholder">
            <button class="play" type="submit" @click="startGame">{{ Data.content?.main?.play }}</button>
        </form>

        <p class="tip">{{ tip }}</p>
        <p class="footer">{{ Data.content?.main?.title_footer }}</p>
    </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { Data, State } from '../../utils/appState.js'
import { Interface } from '../../utils/appState.js'
import { setCoreData, setEvent } from '../../utils/appHelper.js'
import { playSound } from '../../utils/soundManager.js'

const characterName = ref('')
const tip = ref('')

// Add something to put the input in red if the pattern is not respected

// Name must be between 2 and 25 characters, can include letters, spaces, hyphens, and apostrophes
function isValidName(name) {
    const regex = /^[A-Za-z' -]{2,25}(?:[ -][A-Za-z' -]{2,25})?$/
    return regex.test(name)
}

// Start the game if the name is valid
function startGame() {
    if (!isValidName(characterName.value)) {
        return
    }

    setCoreData("name", characterName.value.trim())
    setCoreData("ongoing", true)
    setEvent("last_action", null)
    setEvent("new_action", null)
    Interface.screen = 'game'
    playSound('room')
    
}

// Fill the input with the name from the save if it exists
watch(
    () => State.game?.core?.name,
    (name) => {
        if (name) {
            characterName.value = name
        }
    },
    { immediate: true }
)

// Pick a random tip when the content is loaded
watch(
    () => Data.content,
    (content) => {
        if (content?.tips?.length) {
            const random = Math.floor(Math.random() * content.tips.length)
            tip.value = content.tips[random]
        }
    },
    { immediate: true }
)
</script>

<style scoped>
.screen {
    display: flex;
    align-items: unset !important;
    text-align: center;
    font-size: 1.2em;
}

.logo {
    width: 30%;
    height: 25vh;
    margin: auto;
}

.title {
    padding: 1vh 0;
    border-top: 1px solid var(--start-title-border);
    border-bottom: 1px solid var(--start-title-border);
    font-size: 1.3em;
}

.input {
    width: 30vw;
    margin: 4vh 0;
    padding: 0;
    border: 0;
    border-bottom: 2px solid var(--start-input-border);
    text-align: center;
    font-size: 1.5em;
    color: var(--start-input-text);
    background-color: var(--start-input-background);
}

.play {
    width: 15vw;
    border-radius: 40px;
    text-transform: uppercase;
    font-size: 1.5em;
}

.tip {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    padding: 0 2vw;
    text-align: justify;
}

.footer {
    margin: 0;
    padding: 2vh;
    font-size: 0.8em;
    color: var(--text-header);
    background-color: var(--background-header);
}

@media (max-width:1024px) {
    .logo {
        height: 20vh;
    }

    .input {
        width: 80vw;
    }

    .play {
        min-width: 50vw;
        font-size: 1.2em;
    }

    .play {
        min-width: 50vw;
        font-size: 1.2em;
    }

    .tip {
        padding: 3vh;
    }

    .footer {
        border-radius: 0;
    }
}
</style>
