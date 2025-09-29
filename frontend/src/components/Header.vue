<template>
    <header>
        <span id="tower">{{  Data.content?.main?.title }}</span>
        <button class="button" id="open_menu"><img id="open_menu_img"></button>
    </header>
</template>

<script setup>
import { Data } from '../../utils/gameState.js'
</script>

<style scoped>
</style>