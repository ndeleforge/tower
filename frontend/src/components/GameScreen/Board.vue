<template>
    <div class="board">
        <div v-if="isIntro">
            <img :src='Data.settings.images.start' />
            <p>{{  Data.content.events.intro_1 }}</p>
            <p>{{  Data.content.events.intro_2 }}</p>
            <p>{{  Data.content.events.intro_3 }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { getSituation } from '../../../utils/appHelper.js';
import { Data } from '../../../utils/appState.js';

const isIntro = computed(() => getSituation("floor") === 1 && getSituation("room") === 1);
</script>

<style scoped>
.board {
    display: flex;
    flex-grow: 1;
    padding: 1vh 0.5vw;
    text-align: center;
}

@media (max-width:1024px) {
    .board {
        padding: 1vh 5vw;
    }
}
</style>