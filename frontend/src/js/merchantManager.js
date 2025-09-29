import { get, rand } from './utils.js'
import { updateHeroStat, getInventory, setEvent, updateInventory } from './helper.js'
import { Data } from './gameState.js'
import { changeDisplay, displayImage, displayParagraph } from './interfaceManager.js'
import { playSound } from './soundManager.js'

/**
 * Meeting with the merchant : exchange of minerals
 **/

export function merchant() {
    setEvent("last_action", "merchant");

    const paragraph_1 = displayImage(Data.settings.images.merchant);
    const paragraph_2 = displayParagraph(Data.content.events.merchant);
    let paragraph_3;

    // If enough mineral
    if (getInventory("mineral") > 1) {
        changeDisplay("merchant");
        paragraph_3 = displayParagraph(Data.content.events.merchant_proposition);
    }

    // If not
    else {
        setSubAction("merchant");
        paragraph_3 = displayParagraph(Data.content.events.merchant_no_mineral);
    }

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3
}

/**
 * Accept the offer of the merchant
 **/

export function acceptMerchant() {
    setEvent("sub_action", "merchant_over");
    updateInventory("mineral", "minus", 2)
    updateGameStat("merchant_accepted");

    playSound("merchant");
    changeDisplay("normal");

    const deal = rand(1, 3);
    let paragraph_1, paragraph_2, paragraph_3;

    // Offer 1 : power + 3
    if (deal == 3) {
        updateHeroStat("power", "add", 3);

        paragraph_1 = displayImage(Data.settings.images.merchant);
        paragraph_2 = displayParagraph(Data.content.events.merchant_accepted);
        paragraph_3 = displayParagraph(Data.content.events.merchant_offer_1, "good_information");
    }

    // Offer 2 : health + 10 and stamina + 2
    else if (deal == 2) {
        updateHeroStat("health_max", "add", 10);
        updateHeroStat("stamina", "add", 2);

        paragraph_1 = displayImage(Data.settings.images.merchant);
        paragraph_2 = displayParagraph(Data.content.events.merchant_accepted);
        paragraph_3 = displayParagraph(Data.content.events.merchant_offer_2, "good_information");
    }

    // Offer 3 : nothing
    else {
        paragraph_1 = displayImage(Data.settings.images.merchant);
        paragraph_2 = displayParagraph(Data.content.events.merchant_accepted);
        paragraph_3 = displayParagraph(Data.content.events.merchant_offer_3, "bad_information");
    }

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}

/**
 * Refuse the offer of the merchant
 **/

export function refuseMerchant() {
    setEvent("sub_action", "merchant_over");
    updateGameStat("merchant_refused");
    changeDisplay("normal");

    const paragraph_1 = displayImage(Data.settings.images.merchant);
    const paragraph_2 = displayParagraph(Data.content.events.merchant_accepted);
    const paragraph_3 = displayParagraph(Data.content.events.merchant_refused, "bad_information");

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}