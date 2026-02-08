<template>
    <div class="container">
        <div v-show="isIntro">
            <img :src="getSettings('images', 'start')" />
            <p>{{ getContent('events', 'intro_1') }}</p>
            <p>{{ getContent('events', 'intro_2') }}</p>
            <p>{{ getContent('events', 'intro_3') }}</p>
        </div>

        <div v-show="noEvent">
            <img :src="getSettings('images', 'no_event')" class="img_full" />
            <p>{{ getContent('events', 'no_event') }}</p>
        </div>

        <div v-show="spirit">
            <div v-if="waterSpirit">
                <img :src="getSettings('images', 'water_spirit')" />
                <p>{{ getContent('events', 'spirit_water_1') }}.</p>
                <p class="gain">{{ getContent('events', 'spirit_water_2') }} {{ getSpiritModifier("health") }}.</p>
            </div>
            <div v-show="fireSpirit">
                <img :src="getSettings('images', 'fire_spirit')" />
                <p>{{ getContent('events', 'spirit_fire_1') }}.</p>
                <p class="gain">{{ getContent('events', 'spirit_fire_2') }} {{ getSpiritModifier("power") }}.</p>
            </div>
            <div v-show="earthSpirit">
                <img :src="getSettings('images', 'earth_spirit')" />
                <p>{{ getContent('events', 'spirit_earth_1') }}.</p>
                <p class="gain">{{ getContent('events', 'spirit_earth_2') }} {{ getSpiritModifier("stamina") }}.</p>
            </div>
            <div v-show="lightSpirit">
                <img :src="getSettings('images', 'light_spirit')" />
                <p>{{ getContent('events', 'spirit_light_1') }}.</p>
                <p class="gain">{{ getContent('events', 'spirit_light_2') }} {{ getEvent("light_spirit_gain") }} {{ pluralize("point", getEvent("light_spirit_gain")) }} {{ getContent('events', 'spirit_light_3') }}.</p>
            </div>
        </div>

        <div v-show="chest">
            <div v-show="!chestOpened && !chestNotOpened">
                <img :src="getSettings('images', 'chest')" />
                <p>{{ getContent('events', 'chest') }}.</p>
            </div>
            <div v-show="chestOpened">
                <img :src="getSettings('images', 'chest_open')" />
                <p v-show="getEvent('chest_type') === 'potion'">{{ getContent('events', 'chest_potion') }}.</p>
                <p v-show="getEvent('chest_type') === 'scroll'">{{ getContent('events', 'chest_scroll') }}.</p>
                <p v-show="getEvent('chest_type') === 'mineral'">{{ getContent('events', 'chest_mineral') }}.</p>
                <p v-show="getEvent('limited_inventory')">{{ getContent('events', 'chest_limit') }} !</p>
                <p v-show="getEvent('chest_type') === 'trap'">
                    <span>{{ getContent('events', 'chest_trap_1') }}.</span>
                    <span>{{ getContent('events', 'chest_trap_2') }} {{ getEvent("chest_trap_damage") }} {{ getContent('events', 'chest_trap_3') }}.</span>
                </p>
            </div>
            <div v-show="chestNotOpened">
                <img :src="getSettings('images', 'chest')" />
                <p>{{ getContent('events', 'chest') }}.</p>
                <p>{{ getContent('events', 'chest_not_opened') }}.</p>
            </div>
        </div>

        <div v-show="merchant">
            <img :src="getSettings('images', 'merchant')" />
            <p>{{ getContent('events', 'merchant') }}.</p>
            <p v-show="getEvent('current_subevent') === 'merchant_enough'">{{ getContent('events', 'merchant_proposition') }} ...</p>
            <p v-show="getEvent('current_subevent') === 'merchant_not_enough'">{{ getContent('events', 'merchant_no_mineral') }}.</p>
            <p v-show="getEvent('current_subevent') === 'merchant_refused'">{{ getContent('events', 'merchant_refused') }} !</p>
            <div v-show="getEvent('current_subevent') === 'merchant_accepted'">
                <p>{{ getContent('events', 'merchant_accepted') }}.</p>
                <p v-show="getEvent('merchant_offer') === 1">{{ getContent('events', 'merchant_offer_1') }} !</p>
                <p v-show="getEvent('merchant_offer') === 2">{{ getContent('events', 'merchant_offer_2') }} !</p>
                <p v-show="getEvent('merchant_offer') === 3">{{ getContent('events', 'merchant_offer_3') }} !</p>
            </div>
        </div>

        <div v-show="fight">
            <img :src="getEvent('monster_data')[3]" :alt="getEvent('monster_data')[2]" />

            <div v-show="!fightAttack && !fightScroll">
                <p><strong>{{ getEvent('monster_data')[2] }}</strong> {{ getContent('events', 'fight_start') }} !</p>
                <p>
                    {{ getContent('vocabulary', 'health') }} : {{ getEvent('monster_data')[0] }} | 
                    {{ getContent('vocabulary', 'power') }} : {{ getEvent('monster_data')[1] }}
                </p>
            </div>

            <div v-show='fightAttack'>
                <p>
                    <strong>{{ getEvent('monster_data')[2] }}</strong> {{ getContent('events', 'fight_win_1') }}
                    {{ getEvent("fight_nb_hit") }} {{ pluralize("hit", getEvent("fight_nb_hit")) }} !
                </p>
                <p class="damage">
                    {{ getContent('events', 'fight_win_2') }} <strong>{{ getEvent("fight_damage") }}</strong> 
                    {{ pluralize("point", getEvent("fight_damage")) }} {{ getContent('events', 'fight_win_3') }}.
                </p>
                <p class="xp_gain" v-show='getHeroAttribute("health") > 0'>
                    {{ getContent('events', 'fight_win_5') }} <strong>{{ getEvent('fight_xp_gain') }}</strong> 
                    {{ pluralize("point", getEvent("fight_nb_hit")) }} {{ getContent('events', 'fight_win_4') }}.
                </p>
            </div>

            <div v-show='fightScroll'>
                <p>{{ getContent('events', 'fight_magic') }}.</p>
                <p>
                    {{ getContent('events', 'fight_win_5') }} <strong>{{ getEvent('fight_xp_gain') }}</strong> 
                    {{ pluralize("point", getEvent("fight_nb_hit")) }} {{ getContent('events', 'fight_win_4') }}.
                </p>
            </div>
        </div>

        <div v-show="potionUsed">
            <hr>
            <p class="healing">{{ getContent('events', 'healing') }}</p>
        </div>

        <div v-show="levelUp">
            <hr>
            <p>{{ getContent('events', 'level_up_1') }}.</p>
            <p class="level_up">{{ getContent('events', 'level_up_2') }}.</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { getEvent, getHeroAttribute, getSituation, getSpiritModifier, pluralize } from '../../../utils/appHelper.js';
import { getContent, getSettings } from '../../../utils/appState.js';

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

.damage {
    color: red;
}

.healing,
.gain,
.level_up {
    color: green;
}

.img_full {
    width: 100%;
}
</style>