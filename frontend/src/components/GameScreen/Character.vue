<template>
    <div class="character">
        <div class="character_line">
            <div class="progress">
                <span class="progress_data">{{ getHeroAttribute("health") }} / {{ getHeroAttribute("health_max") }}</span>
                <span class="progress_bar health"
                    :style="{ width: (getHeroAttribute('health') / getHeroAttribute('health_max') * 100) + '%' }">
                </span>
            </div>
            <div class="progress">
                <span class="progress_data">{{ Data.content.vocabulary.level }} {{ getHeroAttribute("level") }}</span>
                <span class="progress_bar xp"
                    :style="{ width: (getHeroAttribute('experience') / getHeroAttribute('experience_to') * 100) + '%' }">
                </span>
            </div>
        </div>

        <div class="character_line">
            <div class="character_element">
                <img :src='Data.settings.images.icon_power' /> {{ getHeroAttribute("power") }}
            </div>
            <div class="character_element">
                <img :src='Data.settings.images.icon_stamina' /> {{ getHeroAttribute("stamina") }}
            </div>
            <div class="character_element">
                <img :src='Data.settings.images.icon_potion' />
                <span :class="{ 'limited': potionLimited }">
                    {{ getInventory("potion") }}
                </span>
            </div>
            <div class="character_element">
                <img :src='Data.settings.images.icon_scroll' />
                <span :class="{ 'limited': scrollLimited }">
                    {{ getInventory("scroll") }}
                </span>
            </div>
            <div class="character_element">
                <img :src='Data.settings.images.icon_mineral' />
                <span :class="{ 'limited': mineralLimited }">
                    {{ getInventory("mineral") }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { getHeroAttribute, getInventory, getInventoryLimit, getLevelUpModifier, setEvent, updateHeroAttribute } from '../../../utils/appHelper.js';
import { Data } from '../../../utils/appState.js';
import { resetExperience, restoreHealth } from '../../../utils/eventManager.js';

const potionLimited = useInventoryLimited('potion')
const scrollLimited = useInventoryLimited('scroll')
const mineralLimited = useInventoryLimited('mineral')

function useInventoryLimited(type) {
    return computed(() => getInventory(type) === getInventoryLimit(type))
}

// Check Game over conditon
watch(
    () => getHeroAttribute("health"),
    (health) => {
        if (health < 1 ) {
            setEvent("game_over", true);
        }
    }
)

// Check Level up condition
watch(
    () => getHeroAttribute("experience"),
    (experience) => {
        const experienceTo = getHeroAttribute("experience_to");

        if (experience >= experienceTo) {
            updateHeroAttribute("level", "add", 1);
            updateHeroAttribute("power", "add", getLevelUpModifier("power"));
            updateHeroAttribute("stamina", "add", getLevelUpModifier("stamina"));
            updateHeroAttribute("health_max", "add", getLevelUpModifier("health"));

            restoreHealth();
            resetExperience();
            setEvent("level_up", true);
        }
    }
);
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
    flex-wrap: nowrap;
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
    width: 12vw;
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
    height: 25px;
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

.limited {
    color: red;
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
}
</style>