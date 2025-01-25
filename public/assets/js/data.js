/**
 * Return the number of one item of the inventory
 **/

function getInventory(item) {
    switch (item) {
        case "potion":
            return _game.character.item_potion;
        case "scroll":
            return _game.character.item_scroll;
        case "mineral":
            return _game.character.item_mineral;
    }
}

/**
 * Modify the number of one item of the inventory
 **/

function modifyInventory(item, modifier, nb) {
    switch (item) {
        case "potion":
            _game.character.item_potion = (modifier === "add" ) ? _game.character.item_potion + nb : _game.character.item_potion - nb;
            break;
        case "scroll":
            _game.character.item_scroll = (modifier === "add" ) ? _game.character.item_scroll + nb : _game.character.item_scroll - nb;
            break;
        case "mineral":
            _game.character.item_mineral = (modifier === "add" ) ? _game.character.item_mineral + nb : _game.character.item_mineral - nb;
            break;
    }
}

/**
 * Restore full health's player
 **/

function restoreHealth() {
    _game.character.health = _game.character.health_max;
}

/**
 * Modify one stats of the player
 **/

function modifyHeroStat(stat, modifier, nb) {
    switch (stat)  {
        case "power":
            _game.character.power = (modifier === "add") ? _game.character.power + nb : _game.character.power - nb;
            break;
        case "stamina":
            _game.character.stamina = (modifier === "add") ? _game.character.stamina + nb : _game.character.stamina - nb;
            break;
        case "health_max":
            _game.character.health_max = (modifier === "add") ? _game.character.health_max + nb : _game.character.health_max - nb;
            break;
        case "health": 
            _game.character.health = (modifier === "add") ? _game.character.health + nb : _game.character.health - nb;
            break;
        case "experience":
            _game.character.xp = (modifier === "add") ? _game.character.xp + nb : _game.character.xp - nb;
            break;
        case "experience_to":
            _game.character.xp_to = (modifier === "add") ? _game.character.xp_to + nb : _game.character.xp_to - nb;
            break;
    }
}

/**
 * Return the modifier of one spirit
 **/

function getSpiritModifier(spirit) {
    switch (spirit) {
        case "power":
            return SETTINGS.data.spirit_power;
        case "health":
            return SETTINGS.data.spirit_health;
        case "stamina":
            return SETTINGS.data.spirit_stamina;
    }
}

/**
 * Increase the selected game stat
 **/

function increaseGameStat(stat) {
    switch (stat) {
        case "potion_used":
            _game.stat.potion_used++;
            break;
        case "chest_open":
            _game.stats.chest_open++;
            break;
        case "merchant_accepted":
            _game.stats.merchant_accepted++;
            break;
        case "merchant_refused":
            _game.stats.merchant_refused++;
            break;
    }
}
