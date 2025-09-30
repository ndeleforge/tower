<template>
    <Header />
    <TitleScreen v-if="Interface.screen === 'title'" />
    <GameScreen v-else-if="Interface.screen === 'game'" />
    <Menu />
    <Popup />
</template>

<script setup>
import { onMounted } from 'vue'

import Header from './components/Header.vue';
import TitleScreen from './components/TitleScreen.vue';
import GameScreen from './components/GameScreen.vue';
import Menu from './components/Menu.vue';
import Popup from './components/Popup.vue';

import { Interface } from '../utils/appState.js';
import { loadContent, loadSettings, loadVersion } from '../utils/backendManager.js';
import { loadSave } from '../utils/saveManager';


onMounted(async () => {
    try {
        await loadVersion();
        await loadSettings();
        await loadSave();
        await loadContent();
    }
    catch (error) {
        console.error("Error loading app:", error);
    }
})

</script>
