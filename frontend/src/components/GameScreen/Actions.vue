<template>
        <div id="actions">
            <div class="actions_line" v-if="chestEventOnGoing">
                <button class="button_action" @click="openChest">{{ Data.content.main.open_chest }}</button>
                <button class="button_action" @click="doNotOpenChest">{{ Data.content.main.close_chest }}</button>
            </div>

            <div class="actions_line" v-else-if="merchantEventOnGoing">
                <button class="button_action" @click="acceptMerchant">{{ Data.content.main.accept_offer }}</button>
                <button class="button_action" @click="refuseMerchant">{{ Data.content.main.refuse_offer }}</button>
            </div>

            <div class="actions_line" v-else-if="State.events.current_event === 'fight'">
                <button class="button_action" @click="attack">{{ Data.content.main.attack }}</button>
                <button 
                    class="button_action"
                    @click="useScroll"
                    :class="{ disabled: !canUseScroll}"
                >
                    {{ Data.content.main.use_scroll }}
                </button>
            </div>

            <div class="actions_line" v-else>
                <button class="button_action" @click="playTurn">{{ Data.content.main.move }}</button>
                <button 
                    class="button_action" 
                    @click="usePotion"
                    :class="{ disabled: !canUsePotion }"
                >
                    {{ Data.content.main.use_potion }}
            </button>
            </div>
        </div>
</template>

<script setup>
import { computed } from 'vue';
import { getHeroStat, getInventory } from '../../../utils/appHelper.js';
import { State, Data } from '../../../utils/appState.js';
import { playTurn, usePotion } from '../../../utils/eventsManager.js';
import { doNotOpenChest, openChest } from '../../../utils/chestManager.js';
import { acceptMerchant, refuseMerchant } from '../../../utils/merchantManager.js';

const chestEventOnGoing = computed(() => 
    State.events.current_event === 'chest' &&
    !['chest_opened', 'chest_not_opened'].includes(State.events.current_subevent)
);

const merchantEventOnGoing = computed(() => 
    State.events.current_event === 'merchant' &&
    !['merchant_accepted', 'merchant_refused', 'merchant_not_enough'].includes(State.events.current_subevent)
);

const canUsePotion = computed(() => {
    return getInventory("potion") > 0 && getHeroStat("health") < getHeroStat("health_max")
})

const canUseScroll = computed(() => {
    return getInventory("scroll") > 0
})
</script>

<style scoped>
.actions_line {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.button_action {
    width: 15vw;
    height: 8vh;
    margin: 1vh;
    border-radius: 30px;
    font-size: 1em;
}

.button_action:hover {
    font-size: 1.2em;
    color: var(--button-color-1);
}

@media (max-width:1024px) {
    .button_action {
        width: 45vw;
        font-size: 1em;
    }

    .button_action:hover {
        font-size: 1em;
    }
}
</style>