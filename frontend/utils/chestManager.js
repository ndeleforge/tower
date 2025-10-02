import { getInventory, getInventoryLimit, randomBetween, setEvent, updateGameStat, updateHeroStat, updateInventory } from './appHelper.js'
import { State } from './appState.js'
import { playSound } from './soundManager.js'

// Init the chest event
export function chestFound() {
    setEvent("current_event", "chest");
}

// Open the chest
export function openChest() {
    setEvent("current_subevent", "chest_opened");
    updateGameStat("chest_opened");
    playSound("chest");

    const loot = randomBetween(0, 15);
    setEvent("limited_inventory", false);

    // Potion (11,12,13,14,15)
    if (loot > 10) {
        setEvent("chest_type", "potion");
        if (getInventory("potion") >= getInventoryLimit("potion")) {
            setEvent("limited_inventory", true);
        }
        else {
            updateInventory("potion", "add", 1)
        }
    }

    // Scroll (6,7,8,9,10)
    else if (loot > 5) {
        setEvent("chest_type", "scroll");
        if (getInventory("scroll") >= getInventoryLimit("scroll")) {
            setEvent("limited_inventory", true);
        }
        else {
            updateInventory("scroll", "add", 1)
        }
    }

    // Mineral (2,3,4,5)
    else if (loot > 1) {
        setEvent("chest_type", "mineral");
        if (getInventory("mineral") >= getInventoryLimit("mineral")) {
            setEvent("limited_inventory", true);
        }
        else {
            updateInventory("mineral", "add", 1)
        }
    }

    // Trap (0,1)
    else {
        setEvent("chest_type", "trap");
        updateGameStat("chest_trap");

        const damage = randomBetween(
            1, 
            State.character.health / 5
        );
        setEvent("chest_trap_damage", damage);
        updateHeroStat("health", "minus", damage);
    }
}

// Do not open the chest
export function doNotOpenChest() {
    setEvent("current_subevent", "chest_not_opened");
    updateGameStat("chest_not_opened");
}
