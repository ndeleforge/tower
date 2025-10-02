<template>
    <div class="information column" v-if="gameOver">
        <p>{{ Data.content.events.gameover_1 }} {{ getSituation("floor") }}.</p>
        <p>{{ Data.content.events.gameover_2 }} {{ getGameStat("best_score") }}</p>
        <button class="button_gameover" @click="resetGame">{{ Data.content.events.gameover_button }}</button>
    </div>

    <div class="information" v-else-if="informationSection">
        <p v-if="getSituation('room') > 10" class="very_important">
            {{ Data.content.vocabulary.floor }} {{ getSituation('floor') }}
        </p>
        <p v-else>
            <span class="very_important">{{ Data.content.vocabulary.floor }} {{ getSituation('floor') }}</span>
            <span class="important">{{ Data.content.vocabulary.room }} {{ getSituation('room') }}</span>
        </p>
    </div>

    <div class="game column" v-else>
        <Character />
        <Board />
        <Actions />
    </div>

</template>

<script setup>
import Character from './GameScreen/Character.vue';
import Actions from './GameScreen/Actions.vue';
import Board from './GameScreen/Board.vue';
import { computed } from 'vue';
import { getEvent, getGameStat, getSituation } from '../../utils/appHelper.js';
import { Data, Interface } from '../../utils/appState.js';
import { resetGame } from '../../utils/saveManager.js';

const informationSection = computed(() => Interface.section === 'information');
const gameOver = computed(() => getEvent("game_over") === true);
</script>

<style scoped>
.information {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    text-align: center;
    user-select: none !important;
}

.important {
    font-size: 3em;
}

.very_important {
    font-size: 3.5em;
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
    flex-grow: 1;
    align-items: unset;
    font-size: 1.3em;
}

.column {
    flex-direction: column;
}

.button_gameover {
    width: 60vw;
    height: 8vh;
    margin: 1vh;
    border-radius: 30px;
    font-size: 1.2em;
}

.button_gameover:hover {
    font-size: 1.2em;
    color: var(--button-color-1);
}

@media (max-width:1024px) {
    .game {
        padding: 0;
    }
}
</style>
