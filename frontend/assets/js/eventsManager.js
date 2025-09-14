import { get, plural, rand } from './utils.js'
import { getHeroStat, getInventory, getSpiritModifier, restoreHealth, setEvent, updateGameStat, updateHeroStat, updateInventory } from './helper.js'
import { Data } from './gameState.js'
import { displayImage, displayParagraph } from './interfaceManager.js'
import { playSound } from './soundManager.js'

/**
 * When there is no event
 **/

export function noEvent() {
    setEvent("last_action", "no_event");

    get("#game").innerHTML = displayImage();
    get("#container_img").style.background = "url('assets/image/" + Data.settings.images.no_event + "') no-repeat center";
    get("#container_img").style.backgroundSize = "cover";
    get("#game").innerHTML += displayParagraph(Data.content.events.no_event);
}

/**
 * Meeting with a spirit : randomly choose between fire, water, earth and light
 **/

export function spirit() {
    setEvent("last_action", "spirit");
    updateGameStat("spirit_meet");

    const meeting = rand(1, 4)
    let paragraph_1, paragraph_2, paragraph_3;

    // Earth spirit : add stamina
    if (meeting == 4) {
        updateHeroStat("stamina", "add", getSpiritModifier("stamina"));

        paragraph_1 = displayImage(Data.settings.images.earth_spirit);
        paragraph_2 = displayParagraph(Data.content.events.spirit_earth_1);
        paragraph_3 = displayParagraph([
            Data.content.events.spirit_earth_2,
            `<strong>${getSpiritModifier("stamina")}</strong>`,
            plural(getSpiritModifier("stamina"), Data.content.vocabulary.point_singular, Data.content.vocabulary.point_plural)
        ], "good_information");
    }

    // 5-6 : Light spirit : add experience
    else if (meeting == 3) {
        const experience = rand(parseInt(getHeroStat("experience_to") / 10), parseInt(getHeroStat("experience_to")  / 5));
        updateHeroStat("experience", "add", experience)

        paragraph_1 = displayImage(Data.settings.images.light_spirit);
        paragraph_2 = displayParagraph(Data.content.events.spirit_light_1);
        paragraph_3 = displayParagraph([
            Data.content.events.spirit_light_2,
            `<strong>${experience}</strong>`,
            plural(experience, Data.content.vocabulary.point_singular, Data.content.vocabulary.point_plural),
            Data.content.events.spirit_light_3
        ], "good_information");
    }

    // 3-4 : Fire spirit : add power
    else if (meeting == 2) {
        updateHeroStat("power", "add", getSpiritModifier("power"));

        paragraph_1 = displayImage(Data.settings.images.fire_spirit);
        paragraph_2 = displayParagraph(Data.content.events.spirit_fire_1);
        paragraph_3 = displayParagraph([
            Data.content.events.spirit_fire_2,
            `<strong>${getSpiritModifier("power")}</strong>`,
            plural(getSpiritModifier("power"), Data.content.vocabulary.point_singular, Data.content.vocabulary.point_plural)
        ], "good_information");
    }

    // 1-2 : Water spirit : add health
    else {
        updateHeroStat("health_max", "add", getSpiritModifier("health"));

        paragraph_1 = displayImage(Data.settings.images.water_spirit);
        paragraph_2 = displayParagraph(Data.content.events.spirit_water_1);
        paragraph_3 = displayParagraph([
            Data.content.events.spirit_water_2,
            `<strong>${getSpiritModifier("health")}</strong>`,
            plural(getSpiritModifier("health"), Data.content.vocabulary.point_singular, Data.content.vocabulary.point_plural)
        ], "good_information");
    }

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}

/**
 * Use a potion and regain all health
 **/

export function usePotion() {
    if (getInventory("potion") > 0 && getHeroStat("health") < getHeroStat("health_max")) {
        updateInventory("potion", "minus", 1);
        restoreHealth();
        updateGameStat("potion_used");
        playSound("potion");

        get("#game").innerHTML += '<hr>' + displayParagraph(Data.content.events.healing, "good_information");
    }
}
