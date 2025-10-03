<template >
    <Header v-if='appLoaded' />
    <TitleScreen v-if='titleScreen' />
    <GameScreen v-if='gameScreen && appLoaded' />
    <Menu v-if='appLoaded' />
    <Modale />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

import Header from './components/Common/Header.vue';
import TitleScreen from './components/TitleScreen.vue';
import GameScreen from './components/GameScreen.vue';
import Menu from './components/Common/Menu.vue';
import Modale from './components/Common/Modale.vue';

import { Interface } from '../utils/appState.js';
import { loadContent, loadSettings, loadVersion } from '../utils/backendManager.js';
import { loadSave } from '../utils/saveManager.js';
import { initSound } from '../utils/soundManager.js';
import { getCoreData } from '../utils/appHelper.js';

const appLoaded = ref(false);
const titleScreen = computed(() => Interface.screen === 'title');
const gameScreen = computed(() => Interface.screen === 'game');

onMounted(async () => {
    try {
        await loadVersion();
        await loadSettings();
        await loadSave();
        await loadContent();
        await initSound();
        Interface.screen = (getCoreData('ongoing')) ? 'game' : 'title';
        appLoaded.value = true;
    }
    catch (error) {
        console.error("Error loading app:", error);
    }
})
</script>
