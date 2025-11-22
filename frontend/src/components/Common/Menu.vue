<template>
    <div v-if="isMenuDisplayed" class="menu">
        <h1>{{ getContent('main', 'settings_title') }}</h1>
        <div class="buttons">
            <button
                @click="toggleSound"
                :class="{ 'inactive': !isSoundActive }"
            >
                {{ getContent('main', 'toggle_sound') }}
            </button>
            <button @click="openModale('reset')">
                {{ getContent('main', 'reset_game') }}
            </button>
            <button @click="openModale('delete')">
                {{ getContent('main', 'delete_save') }}
            </button>
        </div>

        <h1>{{ getContent('main', 'stats_title') }}</h1>
        <ul class="list">
            <li v-for="key in Object.keys(getContent('stats'))" :key="key">
                {{ getContent('stats', key) }} {{ getGameRecord(key) }}
            </li>
        </ul>

        <p class="footer">{{ getContent('main', 'footer') }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { getCoreData, getGameRecord, setCoreData } from '../../../utils/appHelper.js';
import { getContent, getInterface, setInterface } from '../../../utils/appState.js'

const isMenuDisplayed = computed(() => getInterface('menu'));
const isSoundActive = computed(() => getCoreData('sound') === true);

function openModale(value) {
    setInterface('modaleAction', value);
    setInterface('modale', true);
}

function toggleSound() {
    setCoreData('sound', !getCoreData('sound'));
}
</script>

<style scoped>
.menu {
    display: flex;
    z-index: 3;
    position: absolute;
    flex-direction: column;
    height: 100dvh;
    width: 36vw;
    color: var(--text-menu);
    background-color: var(--background-menu);
}

h1 {
    margin: 2vh 0 2vh 2vh;
    border-bottom: 2px solid var(--text-menu);
    font-size: 2em;
}

h1:first-child {
    margin-top: 3vh;
}

.list {
    flex-grow: 1;
    line-height: 1.75em;
    list-style: square;
    font-size: 1.2em
}

.footer {
    text-align: center;
}

.buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
}

button {
    min-width: 45%;
    border-radius: 30px;
    font-size: 1.5em;
    background-color: var(--button-color-2);
}

button.inactive {
    opacity: 0.5;
}

button:hover {
    background-color: var(--button-color-1);
}

@media (max-width:1024px) {
    .menu {
        top: 0;
        right: 0;
        margin: 0;
        width: 100dvw;
        height: 100dvh;
        border-radius: 0;
        font-size: 1.1em;
    }
}
</style>
