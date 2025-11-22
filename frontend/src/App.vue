<template >
    <Header v-if='appLoaded' />
    <TitleScreen v-if='titleScreen' />
    <GameScreen v-if='gameScreen && appLoaded' />
    <Menu v-if='appLoaded' />
    <Modale />
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'

import Header from './components/Common/Header.vue';
import TitleScreen from './components/TitleScreen.vue';
import GameScreen from './components/GameScreen.vue';
import Menu from './components/Common/Menu.vue';
import Modale from './components/Common/Modale.vue';

import { getCoreData } from '../utils/appHelper.js';
import { getContent, getInterface, setInterface } from '../utils/appState.js';
import { loadContent, loadSettings, loadVersion } from '../utils/backendManager.js';
import { loadSave } from '../utils/saveManager.js';
import { initSound } from '../utils/soundManager.js';

const appLoaded = ref(false);
const titleScreen = computed(() => getInterface('screen') === 'title');
const gameScreen = computed(() => getInterface('screen') === 'game');

// At the start
onMounted(async () => {
    try {
        await loadVersion();
        await loadSettings();
        await loadSave();
        await loadContent();
        await initSound();

        if (getCoreData('ongoing')) {
            setInterface('screen', 'game');
        }
        else {
            setInterface('screen', 'title');
        }

        appLoaded.value = true;
    }
    catch (error) {
        console.error("Error loading app:", error);
    }
})

// Change title page name
watch(
    () => getContent('main', 'title'),
    () => {
        document.title = getContent('main', 'title');
    }
)
</script>
