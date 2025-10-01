<template>
    <div class="container">
        <div v-if="isIntro">
            <img :src='Data.settings.images.start' />
            <p>{{  Data.content.events.intro_1 }}</p>
            <p>{{  Data.content.events.intro_2 }}</p>
            <p>{{  Data.content.events.intro_3 }}</p>
        </div>

        <div v-if="noEvent" class="container">
            <img :src='Data.settings.images.no_event' />
            <p>{{  Data.content.events.no_event }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { getEvent, getSituation } from '../../../utils/appHelper.js';
import { Data } from '../../../utils/appState.js';

const isIntro = computed(() => getSituation("floor") === 1 && getSituation("room") === 1);
const noEvent= computed(() => getEvent("last_action") === 'no_event');
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 1vh 0.5vw;
    text-align: center;
}

.container img {
    width: 100%;
}
</style>