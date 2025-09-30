<template>
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
            <div class="character_element">
                <img :src='Data.settings.images.icon_power' /> {{ State.game.character.power }}
            </div>
            <div class="character_element">
                <img :src='Data.settings.images.icon_stamina' /> {{ State.game.character.stamina }}
            </div>
            <div class="character_element">
                <img :src='Data.settings.images.icon_potion' /> {{ State.game.character.item_potion }}
            </div>
            <div class="character_element">
                <img :src='Data.settings.images.icon_scroll' /> {{ State.game.character.item_scroll }}
            </div>
            <div class="character_element">
                <img :src='Data.settings.images.icon_mineral' /> {{ State.game.character.item_mineral }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { Data, State } from '../../utils/appState';
</script>

<style scoped>
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

@media (max-width:1024px) {
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