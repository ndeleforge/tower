import { Data, Interface } from './appState.js'
import { chest } from './chestManager.js'
import { playSound } from './soundManager.js'
import { getHeroStat, getInventory, getSpiritModifier, restoreHealth, setEvent, updateGameStat, updateHeroStat, updateInventory, getSituation, setSituation, updateSituation, randomBetween } from './appHelper.js'

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
        //const merchantMeeting = rand(1, 2);
        //(merchantMeeting == 2) ? merchant() : choiceAction();
    }
    else {
        choiceAction();
    }
}

// Choose one action randomly
function choiceAction() {
    const events = {
        1: { name: "no_event", func: noEvent }, 
        2: { name: "spirit", func: spirit },
        3: { name: "chest", func: chest }
        //3: { name: "fight", func: fight }
    };

    const index = 3;
    const event = events[index];

    setEvent("new_event", event.name);

    //if (getEvent("new_event") !== getEvent("last_event")) {
        event.func();
    //} else {
    //    choiceAction();
    //y}
}

// No event
function noEvent() {
    setEvent("current_event", "no_event");
}

// Meeting with one spirit : increase one random stat
function spirit() {
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
