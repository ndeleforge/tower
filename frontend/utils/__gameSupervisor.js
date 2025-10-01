import { get, setStorage, getVariableCSS } from './utils.js'
import { getGameStat, getHeroStat, getInventory, getInventoryLimit, getLevelUpModifier, getSituation, resetExperience, restoreHealth, setEvent, setGameStat, setSituation, updateHeroStat } from './helper.js'
import { SAVE } from '../main.js'
import { Data, State } from './gameState.js'
import { resetGame } from './saveManager.js'
import { changeDisplay, displayParagraph } from './interfaceManager.js'

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

