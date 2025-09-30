<template>
    <div class="container information" v-show="Interface.subscreen === 'information'"></div>

    <div class="container board" v-show="Interface.subscreen === 'board'">
        <div class="character">
            <div class="character_line">
                <div class="progress">
                    <span class="progress_data">{{ State.game.character.health }} / {{ State.game.character.health_max
                        }}</span>
                    <span class="progress_bar health"
                        :style="{ width: (State.game.character.health / State.game.character.health_max * 100) + '%' }">
                    </span>
                </div>
                <div class="progress">
                    <span class="progress_data">{{ Data.content.vocabulary.level }} {{ State.game.character.level
                        }}</span>
                    <span class="progress_bar xp"
                        :style="{ width: (State.game.character.experience / State.game.character.experience_to * 100) + '%' }">
                    </span>
                </div>
            </div>

            <div class="character_line">
                <div class="character_element">{{ State.game.character.power }}</div>
                <div class="character_element">{{ State.game.character.stamina }}</div>
                <div class="character_element">{{ State.game.character.item_potion }}</div>
                <div class="character_element"></div>
                <div class="character_element">{{ State.game.character.item_scroll }}</div>
                <div class="character_element">{{ State.game.character.item_mineral }}</div>
            </div>
        </div>

        <div class="game"></div>

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

    </div>
</template>

<script setup>
import { Interface, Data, State } from '../../utils/appState';

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
.information {
    padding: 2vh;
    font-size: 2em;
    user-select: none !important;
}

.information .important {
    font-size: 2em;
    font-weight: bold;
}

@media (max-width:1024px) {
    .information .bigger {
        font-size: 1.5em;
    }
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

.character {
    margin: 1vh 1vw 4vh 1vw;
    border-radius: 15px;
    color: var(--text-character);
    background: var(--background-character);
}

.character_line {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0.8vh 0;
}

.character_element {
    display: flex;
    align-items: center;
    margin: 0.5vh 0.5vw;
    padding: 0 1vh;
}

.character_element img {
    width: 32px;
    padding-right: 0.5vw;
}

.progress {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 15vw;
    height: 25px;
    margin: 1vh;
    border-radius: 4px;
    color: var(--progress-text);
    background: var(--progress-background);
}

.progress_data {
    z-index: 1;
    position: absolute;
    font-size: 0.8em;
    font-weight: bold;
}

.progress_bar {
    display: block;
    position: absolute;
    left: 0;
    border-radius: 4px;
    font-size: 0.95em;
    transition: normal 1s ease-in-out;
}

.health {
    background-color: var(--progress-health);
}

.xp {
    background-color: var(--progress-xp);
}

.actions_line {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

@media (max-width:1024px) {
    .board {
        padding: 0;
    }

    .game {
        padding: 1vh 5vw;
    }

    .character {
        margin: 1vh;
        padding: 0.8vh 0;
        font-size: 0.9em;
    }

    .character_line {
        padding: 0.5vh 0;
    }

    .character_element img {
        width: 25px;
    }

    .progress {
        width: 40vw;
    }

    .progress_bar {
        height: 25px;
    }
}
</style>