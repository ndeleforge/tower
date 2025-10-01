<template>
    <div v-if="Interface.menu" class="menu">
        <h1>{{ Data.content.main.settings_title }}</h1>
        <div class="buttons">
            <button
                @click="State.core.sound = !State.core.sound"
                :class="{ 'inactive': !State.core.sound }"
            >
                {{ Data.content.main.toggle_sound }}
            </button>
            <button @click="openModale('reset')">
                {{ Data.content.main.reset_game }}
            </button>
            <button @click="openModale('delete')">
                {{ Data.content.main.delete_save }}
            </button>
        </div>

        <h1>{{  Data.content.main.stats_title }}</h1>
        <ul class="list">
            <li v-for="(key) in Object.keys(Data.content.stats)" :key="key">
                {{ Data.content.stats[key] }} {{ State.stats[key] }}
            </li>
        </ul>

        <p class="footer">{{  Data.content.main.footer }}</p>
    </div>
</template>

<script setup>
import { State, Data, Interface } from '../../../utils/appState.js'

function openModale(value) {
    Interface.modaleAction = value
    Interface.modale = true
}

</script>

<style scoped>
.menu {
    display: flex;
    z-index: 3;
    position: absolute;
    flex-direction: column;
    height: 98%;
    width: 36vw;
    margin-top: 0.8vw;
    border-radius: 20px;
    color: var(--text-menu);
    background-color: var(--background-menu);
}

h1 {
    margin: 2vh 0 2vh 2vh;
    border-bottom: 2px solid var(--text-menu);
    font-size: 2em;
}

h1:first-child {
    margin-top: 5vh;
}

.list {
    flex-grow: 1;
    line-height: 1.75em;
    list-style: square;
    font-size: 1.2em
}

.footer {
    text-align: center;
}

.buttons {
    display: flex;
    justify-content: space-evenly;
}

button {
    margin: 0 0.5vw;
    min-width: 10vw;
    border-radius: 30px;
    font-size: 1.5em;
    background-color: var(--button-color-2);
}

button.inactive {
    opacity: 0.5;
}

button:hover {
    background-color: var(--button-color-1);
}

@media (max-width:1024px) {
    .menu {
        top: 0;
        right: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        border-radius: 0;
        font-size: 1.1em;
    }
}
</style>
