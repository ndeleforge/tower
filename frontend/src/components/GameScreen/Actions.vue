<template>
        <div id="actions">
            <div class="actions_line" v-if="chestEventOnGoing">
                <button class="button_action" @click="openChest">{{ getContent('main', 'open_chest') }}</button>
                <button class="button_action" @click="doNotOpenChest">{{ getContent('main', 'close_chest') }}</button>
            </div>

            <div class="actions_line" v-else-if="merchantEventOnGoing">
                <button class="button_action" @click="acceptMerchant">{{ getContent('main', 'accept_offer') }}</button>
                <button class="button_action" @click="refuseMerchant">{{ getContent('main', 'refuse_offer') }}</button>
            </div>

            <div class="actions_line" v-else-if="fightEventOnGoing">
                <button class="button_action" @click="attack">{{ getContent('main', 'attack') }}</button>
                <button 
                    class="button_action"
                    @click="useScroll"
                    :class="{ disabled: !canUseScroll}"
                >
                    {{ getContent('main', 'use_scroll') }}
                </button>
            </div>

            <div class="actions_line" v-else>
                <button class="button_action" @click="playTurn">{{ getContent('main', 'move') }}</button>
                <button 
                    class="button_action" 
                    @click="usePotion"
                    :class="{ disabled: !canUsePotion }"
                >
                    {{ getContent('main', 'use_potion') }}
            </button>
            </div>
        </div>
</template>

<script setup>
import { computed } from 'vue';
import { getEvent, getHeroAttribute, getInventory } from '../../../utils/appHelper.js';
import { getContent } from '../../../utils/appState.js';
import { playTurn, usePotion } from '../../../utils/eventManager.js';
import { doNotOpenChest, openChest } from '../../../utils/chestManager.js';
import { acceptMerchant, refuseMerchant } from '../../../utils/merchantManager.js';
import { attack, useScroll } from '../../../utils/fightManager.js';

const chestEventOnGoing = computed(() => 
    getEvent('current_event') === 'chest' &&
    !['chest_opened', 'chest_not_opened'].includes(getEvent('current_subevent'))
);

const merchantEventOnGoing = computed(() => 
    getEvent('current_event') === 'merchant' &&
    !['merchant_accepted', 'merchant_refused', 'merchant_not_enough'].includes(getEvent('current_subevent'))
);

const fightEventOnGoing = computed(() => 
    getEvent('current_event') === 'fight' &&
    !['fight_attack', 'fight_scroll'].includes(getEvent('current_subevent'))
);

const canUsePotion = computed(() => {
    return getInventory("potion") > 0 && getHeroAttribute("health") < getHeroAttribute("health_max")
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
    gap: 8px;
    margin-bottom: 1vh;
}

.button_action {
    width: 45%;
    border-radius: 30px;
    font-size: 1em;
}

.button_action:hover {
    font-size: 1.1em;
    color: var(--button-color-1);
}

@media (max-width:1024px) {
    .button_action {
        font-size: 0.9em;
    }

    .button_action:hover {
        font-size: 1em;
    }
}
</style>