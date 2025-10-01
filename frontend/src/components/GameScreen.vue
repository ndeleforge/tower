<template>
    <div class="information" v-show="Interface.section === 'information'">
        <p v-if="getSituation('room') > 10" class="important">
            {{ Data.content.vocabulary.floor }} {{ getSituation('floor') }}
        </p>
        <p v-else class="important">
            <span>{{ Data.content.vocabulary.floor }} {{ getSituation('floor') }}</span>
            <span>{{ Data.content.vocabulary.room }} {{ getSituation('room') }}</span>
        </p>
    </div>

    <div class="game" v-show="Interface.section === 'board'">
        <Character />
        <Board />
        <Actions />
    </div>
</template>

<script setup>
import { Data, Interface } from '../../utils/appState.js';
import Character from './GameScreen/Character.vue';
import Actions from './GameScreen/Actions.vue';
import Board from './GameScreen/Board.vue';
import { getSituation } from '../../utils/appHelper.js';
</script>

<style scoped>
.information {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    user-select: none !important;
}

.information .important {
    font-size: 2em;
    font-weight: bold;
}

.information span {
    padding: 2vh;
    font-size: 2em;
    text-align: center;
    display: block;
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
