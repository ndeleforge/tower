<template>
    <div v-if="isModaleDisplayed" class="overlay">
        <div class="modale">
            <div class="content">
                <h1>{{ getContent('main', 'modale_title') }}</h1>
                <p v-if="resetAction" class="text">{{ getContent('main', 'modale_reset') }}</p>
                <p v-else-if="deleteAction" class="text">{{ getContent('main', 'modale_delete') }}</p>
            </div>
            <div class="button_list">
                <button class="accept" @click='accept()'>{{ getContent('main', 'modale_accept') }}</button>
                <button @click="setInterface('modale', false)">{{ getContent('main', 'modale_cancel') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { getContent, getInterface, setInterface } from '../../../utils/appState.js';
import { deleteSave, resetGame } from '../../../utils/saveManager.js';

const isModaleDisplayed = computed(() => getInterface('modale'));
const resetAction = computed(() => getInterface('modaleAction') === 'reset')
const deleteAction = computed(() => getInterface('modaleAction') === 'delete')

function accept() {
    if (resetAction) {
        resetGame()
    }
    
    if (deleteAction) {
        deleteSave()
    }
}
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(6px);
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
}

.modale {
    display: flex;
    z-index: 6;
    position: absolute;
    top: 38%;
    right: 38%;
    flex-direction: column;
    width: 25vw;
    margin-left: 20vh;
    border-radius: 20px;
    color: var(--text-menu);
    background-color: var(--background-menu);
}

.content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0 2vh;
}

.text {
    margin: 0;
    padding-bottom: 2vh;
    text-align: justify;
    font-size: 1.2em;
}

button {
    width: 50%;
    padding: 1vh;
    border: 0;
    border-radius: 0;
    border-radius: 0 0 10px 0;
    font-size: 1.2em;
    color: var(--button-color-3);
    background-color: var(--button-color-1);
}

button:hover {
    opacity: 0.7;
}

.accept {
    border-radius: 0 0 0 10px;
    color: var(--button-color-1) !important;
    background-color: var(--button-color-2) !important;
}

@media (max-width:1024px) {
    .modale {
        top: 35vh;
        right: 2vw;
        width: 96vw;
        height: 25vh;
    }
}
</style>