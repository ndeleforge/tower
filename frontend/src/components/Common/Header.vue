<template>
    <header>
        <span class="tower">{{  Data.content?.main?.title }}</span>
        <button v-if="Interface.screen === 'game'" class="button open_menu">
            <img :src="Data.settings.images.menu_closed" />
        </button>
    </header>
</template>

<script setup>
import { Data, Interface } from '../../../utils/appState.js';
</script>

<style scoped>
header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2vh;
    text-transform: uppercase;
    font-size: 2.5em;
    color: var(--text-header);
    background-color: var(--background-header);
}

.tower {
    flex-grow: 1;
    text-align: center;
}

.open_menu {
    padding: 1vh;
    transition: none;
    background-color: transparent;
}

@media (max-width:1024px) {
    header {
        border-radius: 0;
        font-size: 1.5em;
        letter-spacing: 2px;
    }

    .open_menu {
        width: 10vw;
    }

    .open_menu img {
        width: 100%;
    }
}
</style>