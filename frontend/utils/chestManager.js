import { get, rand, plural } from './utils.js'
import { getInventory, getInventoryLimit, setEvent, updateGameStat, updateHeroStat, updateInventory } from './helper.js'
import { Data, State } from './gameState.js'
import { changeDisplay, displayImage, displayParagraph } from './interfaceManager.js'
import { playSound } from './soundManager.js'

/**
 * Initialize the chest event : allow open / avoid
 **/

export function chest() {
    setEvent("last_action", "chest");
    changeDisplay("chest");

    const paragraph_1 = displayImage(Data.settings.images.chest);
    const paragraph_2 = `<p>${Data.content.events.chest}.</p>`;

    get("#game").innerHTML = paragraph_1 + paragraph_2;
}

/**
 * Open the chest : randomly choose between trap, potion, magic or scroll
 **/

export function openChest() {
    setEvent("sub_action", "chest_over");
    updateGameStat("chest_opened");

    playSound("chest");
    changeDisplay("normal");

    const loot = rand(0, 15);
    let limited = false;
    let paragraph_1, paragraph_2, paragraph_3 = "";

    // Potion (11,12,13,14,15)
    if (loot > 10) {
        if (getInventory("potion") >= getInventoryLimit("potion")) {
            limited = true
        }
        else {
            updateInventory("potion", "add", 1)
        }

        paragraph_1 = displayImage(Data.settings.images.chest_open);
        paragraph_2 = displayParagraph(Data.content.events.chest_potion);
        if (limited) paragraph_3 = displayParagraph(Data.content.events.chest_limit, "bad_information");
    }

    // Spell (6,7,8,9,10)
    else if (loot > 5) {
        if (getInventory("scroll") >= getInventoryLimit("scroll")) {
            limited = true
        }
        else {
            updateInventory("scroll", "add", 1)
        }

        paragraph_1 = displayImage(Data.settings.images.chest_open);
        paragraph_2 = displayParagraph(Data.content.events.chest_scroll);
        if (limited) paragraph_3 = displayParagraph(Data.content.events.chest_limit, "bad_information");
    }

    // Mineral (2,3,4,5)
    else if (loot > 1) {
        if (getInventory("mineral") >= getInventoryLimit("mineral")) {
            limited = true
        }
        else {
            updateInventory("mineral", "add", 1)
        }

        paragraph_1 = displayImage(Data.settings.images.chest_open);
        paragraph_2 = displayParagraph(Data.content.events.chest_mineral);
        if (limited) paragraph_3 = displayParagraph(Data.content.events.chest_limit, "bad_information");
    }

    // Trap (0,1)
    else {
        updateGameStat("chest_trap");

        const damage = rand(1, State.game.character.health / 5);
        updateHeroStat("health", "minus", damage);

        paragraph_1 = displayImage(Data.settings.images.chest_open);
        paragraph_2 = displayParagraph(Data.content.events.chest_trap_1);
        paragraph_3 = displayParagraph([
            Data.content.events.chest_trap_2,
            `<strong> ${damage} </strong>`,
            plural(damage, Data.content.vocabulary.point_singular, Data.content.vocabulary.point_plural),
            Data.content.events.chest_trap_3
        ], "bad_information");
    }

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}

/**
 * Avoid the chest and do not open it
 **/

export function closeChest() {
    setEvent("sub_action", "chest_over");
    updateGameStat("chest_not_opened");

    changeDisplay("normal");

    const paragraph_1 = displayImage(Data.settings.images.chest);
    const paragraph_2 = displayParagraph(Data.content.events.chest);
    const paragraph_3 = displayParagraph(Data.content.events.chest_not_opened);

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}
