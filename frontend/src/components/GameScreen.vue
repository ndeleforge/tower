<template>
    <div class="container information" v-show="Interface.subscreen === 'information'"></div>

    <div class="container board" v-show="Interface.subscreen === 'board'">
        <Character />

        <div class="game"></div>

        <Actions />
    </div>
</template>

<script setup>
import { Interface } from '../../utils/appState';
import Character from './Character.vue';
import Actions from './Actions.vue';
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

.board {
    align-items: unset;
    font-size: 1.3em;
}

.game {
    flex-grow: 1;
    padding: 1vh 0.5vw;
    text-align: center;
}

@media (max-width:1024px) {
    .information .bigger {
        font-size: 1.5em;
    }

    .board {
        padding: 0;
    }

    .game {
        padding: 1vh 5vw;
    }
}
</style>
