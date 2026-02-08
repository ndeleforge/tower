import { updateHeroAttribute, getInventory, setEvent, updateInventory, updateGameRecord, randomBetween, setHeroAttribute } from './appHelper.js'
import { playSound } from './soundManager.js'

// Meeting with the merchant : exchange of minerals
export function meetMerchant() {
    setEvent("current_event", "merchant");

    // If enough mineral
    if (getInventory("mineral") > 1) {
        setEvent("current_subevent", "merchant_enough")
    }

    // If not enough
    else {
        setEvent("current_subevent", "merchant_not_enough")
    }
}

// Accept the offer of the merchant
export function acceptMerchant() {
    setEvent("current_subevent", "merchant_accepted");
    updateInventory("mineral", "minus", 2)
    updateGameRecord("merchant_accepted");
    playSound("merchant");

    const deal = randomBetween(1, 3);

    // Offer 1 : power + 3
    if (deal == 1) {
        setEvent("merchant_offer", 1);
        updateHeroAttribute("power", "add", 3);
    }

    // Offer 2 : health + 10 and stamina + 2
    else if (deal == 2) {
        setEvent("merchant_offer", 2);
        updateHeroAttribute("health_max", "add", 10);
        updateHeroAttribute("stamina", "add", 2);
    }

    // Offer 3 : nothing
    else if (deal == 3) {
        setEvent("merchant_offer", 3);
        setHeroAttribute('health', 1);
    }
}

// Refuse the offer of the merchant
export function refuseMerchant() {
    setEvent("current_subevent", "merchant_refused");
    updateGameRecord("merchant_refused");
}
