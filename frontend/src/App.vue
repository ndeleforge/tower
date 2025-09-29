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

onMounted(async () => {})

</script>
