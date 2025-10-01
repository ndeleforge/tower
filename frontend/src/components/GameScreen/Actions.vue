<template>
        <div id="actions">
            <div class="actions_line" v-show="Interface.actions === 'normal'">
                <button class="button_action" @click="playTurn">Move</button>
                <button class="button_action" @click="usePotion">Use Potion</button>
            </div>

            <div class="actions_line" v-show="Interface.actions === 'chest'">
                <button class="button_action" @click="openChest">Open Chest</button>
                <button class="button_action" @click="closeChest">Close Chest</button>
            </div>

            <div class="actions_line" v-show="Interface.actions === 'merchant'">
                <button class="button_action" @click="acceptMerchant">Accept</button>
                <button class="button_action" @click="refuseMerchant">Refuse</button>
            </div>

            <div class="actions_line" v-show="Interface.actions === 'fight'">
                <button class="button_action" @click="attack">Attack</button>
                <button class="button_action" @click="useScroll">Use Scroll</button>
            </div>
        </div>
</template>

<script setup>
import { Interface } from '../../../utils/appState.js';

function playTurn() { console.log("Move") }
function usePotion() { console.log("Potion") }
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