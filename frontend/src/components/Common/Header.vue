<template>
    <header v-if="!informationSection && !gameOver">
        <span v-if="titleScreen" class="tower">{{  getContent('main', 'title') }}</span>
        <span v-if="gameScreen" class="tower">
            {{ getContent('vocabulary', 'floor') }} {{ getSituation('floor') }} -
            {{ getContent('vocabulary', 'room') }} {{ getSituation('room') }}
        </span>

        <img
            v-if="gameScreen"
            class="menu_icon"
            :src="menuIcon"
            @click="toggleMenu"
            :style="{ zIndex: menuIndex }"
        />
    </header>
</template>

<script setup>
import { computed } from 'vue';
import { getEvent, getSituation } from '../../../utils/appHelper.js';
import { getInterface, getContent, getSettings, setInterface } from '../../../utils/appState.js';

const titleScreen = computed(() => getInterface('screen') === 'title');
const gameScreen = computed(() => getInterface('screen') === 'game');
const informationSection = computed(() => getInterface('section') === 'information');
const menuIcon = computed(() => (getInterface('menu') ? getSettings('images', 'menu_opened') : getSettings('images', 'menu_closed')));
const menuIndex = computed(() =>(getInterface('menu') ? 4 : 1));
const gameOver = computed(() => getEvent("game_over") === true)

function toggleMenu() {
    setInterface('menu', !getInterface('menu'));
}
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