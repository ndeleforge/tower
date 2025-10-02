<template>
    <header v-if="!informationSection && !gameOver">
        <span v-if="titleScreen" class="tower">{{  Data.content?.main?.title }}</span>
        <span v-if="gameScreen" class="tower">
            {{  Data.content?.vocabulary?.floor }} {{ State.situation.floor }} -
            {{  Data.content?.vocabulary?.room }} {{ State.situation.room }}
        </span>

        <img
            v-if="gameScreen"
            class="menu_icon"
            :src="Interface.menu ? Data.settings.images.menu_opened : Data.settings.images.menu_closed"
            @click="Interface.menu = !Interface.menu"
            :style="{ zIndex: Interface.menu ? 4 : 1 }"
        />
    </header>
</template>

<script setup>
import { computed } from 'vue';
import { getEvent } from '../../../utils/appHelper.js';
import { State, Data, Interface } from '../../../utils/appState.js';

const titleScreen = computed(() => Interface.screen === 'title');
const gameScreen = computed(() => Interface.screen === 'game');
const informationSection = computed(() => Interface.section === 'information');
const gameOver = computed(() => getEvent("game_over") === true)
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