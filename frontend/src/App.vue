<template>
    <Header />
    <TitleScreen v-if="Interface.screen === 'title'" />
    <GameScreen v-if="Interface.screen === 'game'" />
    <Menu />
    <Modale />
</template>

<script setup>
import { onMounted } from 'vue'

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


onMounted(async () => {
    try {
        await loadVersion();
        await loadSettings();
        await loadSave();
        await loadContent();
        await initSound();
        
        Interface.screen = (getCoreData('ongoing')) ? 'game' : 'title';
    }
    catch (error) {
        console.error("Error loading app:", error);
    }
})

</script>
