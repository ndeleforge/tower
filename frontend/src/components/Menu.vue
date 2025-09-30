<template>
    <div id="blank_menu"></div>

    <div id="menu">
        <h1 id="settings_title" class="menu_title"></h1>
        <div class="button_list button_list_menu">
            <button class="menu_button" id="volume_button" @click="toggleSound"></button>
            <button class="menu_button" id="confirm_restart" @click="restartGame"></button>
            <button class="menu_button" id="confirm_delete" @click="deleteSave"></button>
        </div>

        <h1 id="stats_title" class="menu_title">{{  Data.content?.main?.stats_title }}</h1>
        <ul id="list_stats"></ul>

        <p id="menu_footer">{{  Data.content?.main?.menu_footer }}</p>
    </div>
</template>

<script setup>
import { Data } from '../../utils/appState.js'
</script>