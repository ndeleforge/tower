import { get, rand, getVariableCSS } from './utils.js'
import { getCoreData, getEvent, setEvent, getSituation, setSituation, updateCoreData, updateGameStat, updateSituation } from './helper.js'
import { Data, State } from './gameState.js'
import { setRefresh } from './gameSupervisor.js'
import { changeDisplay, displayImage, displayParagraph, createInterface } from './interfaceManager.js'
import { addSoundToHTML, playSound } from './soundManager.js'
import { chest } from './chestManager.js'
import { fight } from './fightManager.js'
import { noEvent, spirit } from './eventsManager.js'

/**
 * Display the screen title : show tip and allow new game
 **/

export function titleScreen() {
    get("#title_screen").style.display = "flex";
    get('#title_tip').innerHTML = Data.content.tips[rand(0, Data.content.tips.length)];

    if (getCoreData("name") != null && getCoreData("name") != "") {
        get("#title_character").value = getCoreData("name");
    }
    else {
        get("#title_character").value = "";
        get('#title_character').placeholder = Data.content.main.title_character_placeholder;
        get('#title_character').focus();
    }

    get("#play").addEventListener("click", () => {
        if (get("#title_character").checkValidity()) {
            startGame("new");
        }
        else {
            get("#title_character").style.borderColor = getVariableCSS("error-color");
        }
    });
}

/**
 *  Display the game screen,  create menu and buttons
 * @param {string} mode "new" to start a new game or "load" to load an existing game
 **/

export function startGame(mode) {
    else if (mode == "load") 
    get('#title_screen').style.display = "none";
    get('#board').style.display = "flex";

    changeDisplay("normal");
    createInterface();
    addSoundToHTML();
    setRefresh();

    if (mode == "new") {
        updateCoreData("name", get("#title_character").value);
        setEvent("last_action", null);
        setEvent("new_action", null);
        updateCoreData("ongoing", true);
        playSound("room");

        const imgTower = displayImage(Data.settings.images.start);
        const paragraph_1 = displayParagraph(Data.content.events.start_game_1);
        const paragraph_2 = displayParagraph(Data.content.events.start_game_2);
        const paragraph_3 = displayParagraph(Data.content.events.start_game_3);
        get("#game").innerHTML = imgTower + paragraph_1 + paragraph_2 + paragraph_3;
    }

    else if (mode == "load") {
        // Restore fight screen
        if (getEvent("last_action") == "fight" && getEvent("sub_action") != "fight_over") {
            changeDisplay("fight");
        }

        // Restore chest screen
        if (getEvent("last_action") == "chest" && getEvent("sub_action") != "chest_over") {
            changeDisplay("chest");
        }

        // Restore merchant screen
        if (getEvent("last_action") == "merchant" && getEvent("sub_action") != "merchant_over") {
            changeDisplay("merchant");
        }

        get('#game').innerHTML = getEvent("current_event");;
    }
}

/**
 * Main game function which manage floor and room, then call the choiceAction function
 **/

export function playTurn() {
    setEvent("sub_action", null);
    updateSituation("room", "add", 1);
    changeDisplay("out-game");

    // At the 10th room
    if (getSituation("room") > 10) {
        State.refresh_interval = 2000;
        setSituation("room", 1);
        updateSituation("floor", "add", 1);
        playSound("floor");

        get("#information").innerHTML = displayParagraph([Data.content.vocabulary.floor, parseInt(getSituation("floor"))], "important");
    }

    // All rooms expect the 10th
    else {
        State.refresh_interval = 1000;
        updateGameStat("total_room");
        playSound("room");

        const paragraph_1 = displayParagraph([Data.content.vocabulary.floor, parseInt(getSituation("floor"))], "important");
        const paragraph_2 = displayParagraph([Data.content.vocabulary.room, getSituation('room')]);
        get("#information").innerHTML = paragraph_1 + paragraph_2;
    }

    // Timeout to show the game again
    setTimeout(() => {
        changeDisplay("into-game");
    }, State.refresh_interval);

    // Starting the floor 5, there is one chance on two to meet the merchant at each floor
    if (getSituation("floor") > 5 && getSituation("room") == 5) {
        const merchantMeeting = rand(1, 2);
        (merchantMeeting == 2) ? merchant() : choiceAction();
    }
    else {
        choiceAction();
    }
}

/**
 * Randomly choose between no event, fight, chest or meeting a spirit
 **/

function choiceAction() {
    const events = {
        1: { name: "no_event", func: noEvent },
        2: { name: "chest", func: chest },
        3: { name: "fight", func: fight },
        4: { name: "spirit", func: spirit }
    };

    const eventNum = rand(1, 4);
    const event = events[eventNum];

    setEvent("new_action", event.name);

    if (getEvent("new_action") !== getEvent("last_action")) {
        event.func();
    } else {
        choiceAction();
    }
}

