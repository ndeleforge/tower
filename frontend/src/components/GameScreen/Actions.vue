<template>
        <div id="actions">
            <div class="actions_line" v-show="Interface.actions === 'normal'">
                <button class="button_action" @click="playTurn">{{ Data.content.main.move }}</button>
                <button 
                    class="button_action" 
                    @click="usePotion"
                    :class="{ disabled: !canUsePotion }"
                >
                {{ Data.content.main.use_potion }}
            </button>
            </div>

            <div class="actions_line" v-show="Interface.actions === 'chest'">
                <button class="button_action" @click="openChest">{{ Data.content.main.open_chest }}</button>
                <button class="button_action" @click="closeChest">{{ Data.content.main.close_chest }}</button>
            </div>

            <div class="actions_line" v-show="Interface.actions === 'merchant'">
                <button class="button_action" @click="acceptMerchant">{{ Data.content.main.accept_offer }}</button>
                <button class="button_action" @click="refuseMerchant">{{ Data.content.main.refuse_offer }}</button>
            </div>

            <div class="actions_line" v-show="Interface.actions === 'fight'">
                <button class="button_action" @click="attack">{{ Data.content.main.attack }}</button>
                <button class="button_action" @click="useScroll">{{ Data.content.main.use_scroll }}</button>
            </div>
        </div>
</template>

<script setup>
import { getHeroStat, getInventory } from '../../../utils/appHelper.js';
import { Data, Interface } from '../../../utils/appState.js';
import { computed } from 'vue';
import { playTurn } from '../../../utils/eventsManager.js';

const canUsePotion = computed(() => {
    return getInventory("potion") > 0 && getHeroStat("health") < getHeroStat("health_max")
})

const canUseScroll = computed(() => {
    return getInventory("scroll") > 0
})

function usePotion() { 
    if (canUsePotion) {

    }
}

function openChest() { console.log("Open Chest") }
function closeChest() { console.log("Close Chest") }
function acceptMerchant() { console.log("Accept Merchant") }
function refuseMerchant() { console.log("Refuse Merchant") }
function attack() { console.log("Attack") }
function useScroll() { console.log("Use Scroll") }
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