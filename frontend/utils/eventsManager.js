import { getHeroStat, getInventory, getSpiritModifier, restoreHealth, setEvent, updateGameStat, updateHeroStat, updateInventory, getSituation, setSituation, updateSituation, randomBetween, getEvent } from './appHelper.js'
import { Interface } from './appState.js'
import { playSound } from './soundManager.js'
import { chestFound } from './chestManager.js'
import { meetMerchant } from './merchantManager.js';

// "Move" action
export function playTurn() { 
    setEvent("current_subevent", null);
    setEvent("potion_used", false)

    updateSituation("room", "add", 1);
    Interface.section = 'information';

    // At the 10th room
    if (getSituation("room") > 10) {
        setSituation("room", 1);
        updateSituation("floor", "add", 1);
        playSound("floor");
    }

    // All rooms expect the 10th
    else {
        updateGameStat("total_room");
        playSound("room");
    }

    // Timeout to show the game again
    setTimeout(() => {
        Interface.section = 'board';
    }, 1500);

    // Starting the floor 5, there is one chance on two to meet the merchant at each floor
    if (getSituation("floor") > 5 && getSituation("room") == 5) {
        const merchantMeeting = randomBetween(1, 2);
        if (merchantMeeting == 2) {
            meetMerchant();
        }
    }
    else {
        choiceAction();
    }
}

// Choose one action randomly
function choiceAction() {
    const events = [
        { name: "no_event", func: noEvent },
        { name: "spirit", func: meetSpirit },
        { name: "chest", func: chestFound }
        // { name: "fight", func: fight }
    ];

    const availableEvents = events.filter(e => e.name !== getEvent("current_event"));

    const index = randomBetween(0, availableEvents.length - 1);
    const event = availableEvents[index];
    event.func();
}

// No event
function noEvent() {
    setEvent("current_event", "no_event");
}

// Meeting with one spirit : increase one random stat
function meetSpirit() {
    setEvent("current_event", "spirit_meeting");
    updateGameStat("spirit_meeting");

    const meeting = randomBetween(1, 4);

    // Earth spirit : add stamina
    if (meeting == 4) {
        setEvent("current_subevent", "earth_spirit");
        updateHeroStat("stamina", "add", getSpiritModifier("stamina"));
    }

    // Light spirit : add experience
    else if (meeting == 3) {
        const experience = randomBetween(
            parseInt(getHeroStat("experience_to") / 10), 
            parseInt(getHeroStat("experience_to")  / 5)
        );
        setEvent("light_spirit_gain", experience);
        setEvent("current_subevent", "light_spirit");
        updateHeroStat("experience", "add", experience);
    }

    // Fire spirit : add power
    else if (meeting == 2) {
        setEvent("current_subevent", "fire_spirit");
        updateHeroStat("power", "add", getSpiritModifier("power"));
    }

    // Water spirit : add health
    else {
        setEvent("current_subevent", "water_spirit");
        updateHeroStat("health_max", "add", getSpiritModifier("health"));
    }
}

// Use one potion to restore health
export function usePotion() {
    if (getInventory("potion") > 0 && getHeroStat("health") < getHeroStat("health_max")) {
        updateInventory("potion", "minus", 1);
        restoreHealth();
        updateGameStat("potion_used");
        setEvent("potion_used", true)
        playSound("potion");
    }
}
