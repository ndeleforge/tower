<template>
    <header>
        <span class="tower">{{  Data.content?.main?.title }}</span>
        <img
            v-if="Interface.screen === 'game'"
            class="menu_icon"
            :src="Interface.menu === 'open' ? Data.settings.images.menu_opened : Data.settings.images.menu_closed"
            @click="Interface.menu = Interface.menu === 'open' ? 'closed' : 'open'"
            :style="{ zIndex: Interface.menu === 'open' ? 4 : 1 }"
        />
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

.menu_icon {
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

    .menu_icon {
        width: 8vw;
    }

    img {
        width: 100%;
    }
}
</style>