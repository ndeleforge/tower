<template>
    <div class="container screen">
        <img class="logo" src="/image/event/tower.png" alt="Logo">

        <h1 class="title">{{ Data.content?.main?.title_text }}</h1>

        <form @submit.prevent="startGame">
            <input class="input" type="text" v-model="characterName"
                pattern="^[A-Za-z' -]{2,25}(?:[ -][A-Za-z' -]{2,25})?$" required
                :placeholder="Data.content?.main?.title_character_placeholder">
            <button id="play" type="submit">{{ Data.content?.main?.play }}</button>
        </form>

        <p class="tip">{{ tip }}</p>
        <p class="footer">{{ Data.content?.main?.title_footer }}</p>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Data, State } from '../../utils/gameState.js'

const characterName = ref('')
const tip = ref('')

onMounted(() => {
    setTimeout(() => chooseTip(), 300); // to improve with async loading
})

// Add something to put the input in red if the pattern is not respected

// Add something to display the name if saved

function chooseTip() {
    if (Data.content?.tips?.length) {
        const tipsArray = Data.content.tips
        const randomIndex = Math.floor(Math.random() * tipsArray.length)
        tip.value = tipsArray[randomIndex]
    }
}

function startGame() {
    if (characterName.value.trim().length >= 2) {
        State.character.name = characterName.value.trim()
        State.currentScreen = 'game'
        State.gameMode = 'new'
    }
}
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

    .tip {
        padding: 3vh;
    }

    .footer {
        border-radius: 0;
    }
}
</style>