<template>
    <Header />
    <TitleScreen v-if="currentScreen === 'title'" />
    <GameScreen v-else-if="currentScreen === 'game'" />
    <Menu />
    <Popup />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Header from './components/Header.vue';
import TitleScreen from './components/TitleScreen.vue';
import GameScreen from './components/GameScreen.vue';
import Menu from './components/Menu.vue';
import Popup from './components/Popup.vue';
import { loadContent, loadSettings, loadVersion } from '../utils/appManager';
import { loadData } from '../utils/saveManager';
import { Data, State } from '../utils/gameState.js';

const currentScreen = ref('title')
const gameMode = ref('new')

onMounted(async () => {
    try {
        await loadVersion();
        await loadSettings();
        loadData();
        await loadContent();
        console.log(Data.content)
    }
    catch (error) {
        console.error("Error loading app:", error);
    }

})

</script>
