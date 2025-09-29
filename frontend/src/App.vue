<template>
    <Header />
    <TitleScreen />
    <GameScreen />
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
import { loadLanguage, loadSettings, loadVersion } from '../utils/appManager';  
import { loadData } from '../utils/saveManager';

onMounted(async () => {
    try {
        await loadVersion();
        await loadSettings();
        loadData();
        await loadLanguage();
        //populateLang();
        //getCoreData("ongoing") == false ? titleScreen() : startGame("load");
    }
    catch (error) {
        console.error("Error loading app:", error);
    }

})

</script>
