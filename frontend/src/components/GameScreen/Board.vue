<template>
    <div class="container">
        <div v-show="isIntro">
            <img :src='Data.settings.images.start' />
            <p>{{  Data.content.events.intro_1 }}</p>
            <p>{{  Data.content.events.intro_2 }}</p>
            <p>{{  Data.content.events.intro_3 }}</p>
        </div>

        <div v-show="noEvent">
            <img :src='Data.settings.images.no_event' class="img_full" />
            <p>{{  Data.content.events.no_event }}</p>
        </div>

        <div v-show="spirit">
            <div v-if="waterSpirit">
                <img :src='Data.settings.images.water_spirit' />
                <p>{{  Data.content.events.spirit_water_1 }}.</p>
                <p>{{  Data.content.events.spirit_water_2 }} {{ getSpiritModifier("health") }}.</p>
            </div>
            <div v-show="fireSpirit">
                <img :src='Data.settings.images.fire_spirit' />
                <p>{{  Data.content.events.spirit_fire_1 }}.</p>
                <p>{{  Data.content.events.spirit_fire_2 }} {{ getSpiritModifier("power") }}.</p>
            </div>
            <div v-show="earthSpirit">
                <img :src='Data.settings.images.earth_spirit' />
                <p>{{  Data.content.events.spirit_earth_1 }}.</p>
                <p>{{  Data.content.events.spirit_earth_2 }} {{ getSpiritModifier("stamina") }}.</p>
            </div>
            <div v-show="lightSpirit">
                <img :src='Data.settings.images.light_spirit' />
                <p>{{  Data.content.events.spirit_light_1 }}.</p>
                <p>{{  Data.content.events.spirit_light_2 }} {{ getEvent("light_spirit_gain") }} {{ Data.content.events.spirit_light_3 }}.</p>
            </div>
        </div>

        <div v-show="chest">
            <div v-show="!chestOpened && !chestNotOpened">
                <img :src='Data.settings.images.chest' />
                <p>{{ Data.content.events.chest }}.</p>
            </div>
            <div v-show="chestOpened">
                <img :src='Data.settings.images.chest_open' />
                <p v-show="getEvent('chest_type') === 'potion'">{{ Data.content.events.chest_potion }}.</p>
                <p v-show="getEvent('chest_type') === 'scroll'">{{ Data.content.events.chest_scroll }}.</p>
                <p v-show="getEvent('chest_type') === 'mineral'">{{ Data.content.events.chest_mineral }}.</p>
                <p v-show="getEvent('limited_inventory')">{{ Data.content.events.chest_limit }} !</p>
                <p v-show="getEvent('chest_type') === 'trap'">
                    <span>{{ Data.content.events.chest_trap_1 }}.</span>
                    <span>{{ Data.content.events.chest_trap_2 }} {{ getEvent("chest_trap_damage") }} {{ Data.content.events.chest_trap_3 }}.</span>
                </p>
            </div>
            <div v-show="chestNotOpened">
                <img :src='Data.settings.images.chest' />
                <p>{{ Data.content.events.chest }}.</p>
                <p>{{ Data.content.events.chest_not_opened }}.</p>
            </div>
        </div>

        <div v-show="merchant">
            <img :src='Data.settings.images.merchant' />
            <p>{{ Data.content.events.merchant }}.</p>
            <p v-show="getEvent('current_subevent') === 'merchant_enough'">{{ Data.content.events.merchant_proposition }} ...</p>
            <p v-show="getEvent('current_subevent') === 'merchant_not_enough'">{{ Data.content.events.merchant_no_mineral }}.</p>
            <p v-show="getEvent('current_subevent') === 'merchant_refused'">{{ Data.content.events.merchant_refused }} !</p>
            <div v-show="getEvent('current_subevent') === 'merchant_accepted'">
                <p>{{ Data.content.events.merchant_accepted }}.</p>
                <p v-show="getEvent('merchant_offer') === 1">{{ Data.content.events.merchant_offer_1 }} !</p>
                <p v-show="getEvent('merchant_offer') === 2">{{ Data.content.events.merchant_offer_2 }} !</p>
                <p v-show="getEvent('merchant_offer') === 3">{{ Data.content.events.merchant_offer_3 }} !</p>
            </div>
        </div>

        <div v-show="fight">
            <img :src="getEvent('monster_data')[3]" :alt="getEvent('monster_data')[2]" />

            <div v-show="!fightAttack && !fightScroll">
                <p><strong>{{ getEvent('monster_data')[2] }}</strong> {{ Data.content.events.fight_start }} !</p>
                <p>
                    {{ Data.content.vocabulary.health }} : {{ getEvent('monster_data')[0] }} | 
                    {{ Data.content.vocabulary.power }} : {{ getEvent('monster_data')[1] }}
                </p>
            </div>

            <div v-show='fightAttack'>
                <p>
                    <strong>{{ getEvent('monster_data')[2] }}</strong> {{ Data.content.events.fight_win_1 }}
                    {{ getEvent("fight_nb_hit") }} {{ Data.content.vocabulary.hit_singular }} !
                </p>
                <p>
                    {{ Data.content.events.fight_win_2 }} <strong>{{ getEvent("fight_damage") }}</strong> 
                    {{ Data.content.vocabulary.point_singular }} {{ Data.content.events.fight_win_3 }}.
                </p>
                <p v-show='getHeroStat("health") > 0'>
                    {{ Data.content.events.fight_win_5 }} <strong>{{ getEvent('fight_xp_gain') }}</strong> 
                    {{ Data.content.vocabulary.point_singular }} {{ Data.content.events.fight_win_4 }}.
                </p>
            </div>

            <div v-show='fightScroll'>
                <p>{{ Data.content.events.fight_magic }}.</p>
                <p>
                    {{ Data.content.events.fight_win_5 }} <strong>{{ getEvent('fight_xp_gain') }}</strong> 
                    {{ Data.content.vocabulary.point_singular }} {{ Data.content.events.fight_win_4 }}.
                </p>
            </div>
        </div>

        <div v-show="potionUsed">
            <hr>
            <p>{{ Data.content.events.healing }}</p>
        </div>

        <div v-show="levelUp">
            <hr>
            <p>{{ Data.content.events.level_up_1 }}.</p>
            <p>{{ Data.content.events.level_up_2 }}.</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { getEvent, getHeroStat, getSituation, getSpiritModifier } from '../../../utils/appHelper.js';
import { Data } from '../../../utils/appState.js';

const isIntro = computed(() => getSituation("floor") === 1 && getSituation("room") === 1);
const noEvent = computed(() => getEvent("current_event") === 'no_event');
const spirit = computed(() => getEvent("current_event") === "spirit");
const waterSpirit = computed(() => getEvent("current_subevent") === 'water_spirit');
const fireSpirit = computed(() => getEvent("current_subevent") === 'fire_spirit');
const earthSpirit = computed(() => getEvent("current_subevent") === 'earth_spirit');
const lightSpirit = computed(() => getEvent("current_subevent") === 'light_spirit');
const chest = computed(() => getEvent("current_event") === 'chest');
const chestOpened = computed(() => getEvent("current_subevent") === 'chest_opened');
const chestNotOpened = computed(() => getEvent("current_subevent") === 'chest_not_opened');
const merchant = computed(() => getEvent("current_event") === 'merchant');
const fight = computed(() => getEvent("current_event") === 'fight');
const fightAttack = computed(() => getEvent("current_subevent") === 'fight_attack');
const fightScroll = computed(() => getEvent("current_subevent") === 'fight_scroll');
const potionUsed = computed(() => getEvent("potion_used") === true);
const levelUp = computed(() => getEvent("level_up") === true);
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 1vh 0.5vw;
    text-align: center;
}

span {
    display: block;
}

.img_full {
    width: 100%;
}
</style>