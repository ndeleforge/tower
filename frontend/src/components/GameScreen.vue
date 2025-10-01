<template>
    <div class="information" v-show="Interface.subscreen === 'information'"></div>

    <div class="game" v-show="Interface.subscreen === 'board'">
        <Character />
        <Board />
        <Actions />
    </div>
</template>

<script setup>
import { Interface } from '../../utils/appState.js';
import Character from './GameScreen/Character.vue';
import Actions from './GameScreen/Actions.vue';
import Board from './GameScreen/Board.vue';
</script>

<style scoped>
.information {
    padding: 2vh;
    font-size: 2em;
    user-select: none !important;
}

.information .important {
    font-size: 2em;
    font-weight: bold;
}

.game {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: unset;
    font-size: 1.3em;
}

@media (max-width:1024px) {
    .information .bigger {
        font-size: 1.5em;
    }

    .game {
        padding: 0;
    }
}
</style>
