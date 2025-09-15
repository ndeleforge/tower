import { get, setStorage, getVariableCSS } from './utils.js'
import { getGameStat, getHeroStat, getInventory, getInventoryLimit, getLevelUpModifier, getSituation, resetExperience, restoreHealth, setEvent, setGameStat, setSituation, updateHeroStat } from './helper.js'
import { SAVE } from '../main.js'
import { Data, State } from './gameState.js'
import { resetGame } from './saveManager.js'
import { changeDisplay, displayParagraph } from './interfaceManager.js'

/**
 * Set an interval of 100ms for the supervisor main function
 **/

export function setRefresh() {
    State.refresh_display = setInterval(superviseGame, 100);
}

/**
 * Always check death, level up, items, score and then display all informations before to save game
 **/

function superviseGame() {
    checkGameOver();
    checkLevelUp()
    setHeader()
    checkItemAvailability()
    calculateScore()

    if (get("#game").innerHTML != "") setEvent("current_event", get("#game").innerHTML);
    setStorage(SAVE, JSON.stringify(State.game))
}

/**
 * Check Game Over condition
 * Display the score and allow to restart the game
 **/

function checkGameOver() {
    if (getHeroStat("health") < 1) {
        clearInterval(State.refresh_display);

        changeDisplay("out-game");
        get("#information").style.backgroundColor = getVariableCSS("background-gameover");

        const paragraph_1 = displayParagraph(Data.content.events.gameover_1 + State.game.character.floor);
        const paragraph_2 = displayParagraph(Data.content.events.gameover_2 + State.game.character.score, "important");

        get('#information').innerHTML = paragraph_1 + paragraph_2;
        get('#information').innerHTML += "<button class=\"button button_action\" id=\"restart\">" + Data.content.events.gameover_button + "</button>";

        get('#restart').addEventListener("click", () => { location.reload(); });
        resetGame();
    }
}

/**
 * Check Level up condition
 * Increase stats and heal the character
 **/

function checkLevelUp() {
    if (getHeroStat("experience") >= getHeroStat("experience_to")) {
        updateHeroStat("level", "add", 1);
        updateHeroStat("power", "add", getLevelUpModifier("power"));
        updateHeroStat("stamina", "add", getLevelUpModifier("stamina"));
        updateHeroStat("health_max", "add", getLevelUpModifier("health"));

        restoreHealth();
        resetExperience();

        const paragraph_1 = '<hr>' + displayParagraph(Data.content.events.level_up_1, "good_information");
        const paragraph_2 = displayParagraph(Data.content.events.level_up_2, "good_information");
        get("#game").innerHTML += paragraph_1 + paragraph_2;
    }
}

/**
 * Set the header with all informations of the hero
 **/

function setHeader() {
    // Return the count or the count in the red color if maxed
    function renderCount(item) {
        const count = getInventory(item)
        if (count >= getInventoryLimit(item)) {
            return `<span style="color:red">${count}</span>`
        }
        return count
    }

    // Title
    get('#tower').innerHTML = `${Data.content.vocabulary.floor} ${getSituation("floor")} - ${Data.content.vocabulary.room} ${getSituation("room")}`;

    // Progress bars for health
    get("#health_data").innerHTML = `${getHeroStat("health")} / ${getHeroStat("health_max")}`;
    get("#health").style.width = ((getHeroStat("health") * 100) / getHeroStat("health_max")) + "%";

    // Progress bars for experience
    get("#level").innerHTML = `${Data.content.vocabulary.level} ${getHeroStat("level")}`;
    get("#xp").style.width = ((getHeroStat("experience") * 100) / getHeroStat("experience_to")) + "%";

    // Stats
    get("#power").innerHTML = `<img src="assets/image/${Data.settings.images.icon_power}" alt=""> ${getHeroStat("power")}`;
    get("#stamina").innerHTML = `<img src="assets/image/${Data.settings.images.icon_stamina}" alt=""> ${getHeroStat("stamina")}`;

    // Items
    get("#potion").innerHTML = `<img src="assets/image/${Data.settings.images.icon_potion}" alt="">${renderCount("potion")}`;
    get("#scroll").innerHTML = `<img src="assets/image/${Data.settings.images.icon_scroll}" alt=""> ${renderCount("scroll")}`;
    get("#mineral").innerHTML = `<img src="assets/image/${Data.settings.images.icon_mineral}" alt=""> ${renderCount("mineral")}`;
}

/**
 * Check item availbility
 * Potion usable if health != health max and item > 1
 * Scroll usable if item > 1
 **/

function checkItemAvailability() {
    if (getInventory("potion") > 0 && getHeroStat("health") != getHeroStat("health_max")) {
        get("#use_potion").classList.remove("disabled")
    }
    else {
        get("#use_potion").classList.add("disabled");
    }

    if (getInventory("scroll") > 0) {
        get("#use_scroll").classList.remove("disabled")
    }
    else {
        get("#use_scroll").classList.add("disabled");
    }
}

/**
 * Calculate score at each room
 **/

function calculateScore() {
    // Main score
    const score = (((getHeroStat("power") + getHeroStat("stamina") + getHeroStat("healt_max")) * getHeroStat("level")) * getSituation("floor")) - 30;
    setSituation("score", score);

    // If the score is superior to the one old
    if (getSituation("score") > getGameStat("best_score")) {
        setGameStat("best_score", getSituation("score"))
    }

    // If the floor is higher to the old one
    if (getSituation("floor") > getGameStat('best_floor')) {
        setGameStat("best_floor", getSituation("floor"))
    }

    // If the max level is higher to the old one
    if (getHeroStat("level") > getGameStat("max_level")) {
        setGameStat("max_level", getHeroStat("level"));
    }
}
