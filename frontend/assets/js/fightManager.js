import { get, plural, rand } from './utils.js'
import { getHeroStat, getInventory, getSituation, setEvent, updateGameStat, updateHeroStat, updateInventory } from './helper.js'
import { Data, State } from './gameState.js'
import { changeDisplay, displayImage, displayParagraph } from './interfaceManager.js'
import { playSound } from './soundManager.js'

/**
 * Initialize the fight event : allow attack, magic or escaping
 **/

export function fight() {
    setEvent("last_action", "fight");
    State.game.events.monster = chooseMonster();
    changeDisplay("fight");

    const paragraph_1 = displayImage(State.game.events.monster[3], State.game.events.monster[2]);
    const paragraph_2 = displayParagraph(`<strong>${State.game.events.monster[2]}</strong> ${Data.content.events.fight_start} !`);
    const paragraph_3 = displayParagraph([
        `${Data.content.vocabulary.health} : <strong>${State.game.events.monster[0]}</strong> /`,
        `${Data.content.vocabulary.power} : <strong>${State.game.events.monster[1]}</strong>`
    ]);

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}

/**
 * Choose the monster according the height in the tower
 **/

function chooseMonster() {
    const monster_health = rand(getSituation("floor") * 2, getSituation("floor") * 5);
    let monster_strenght = parseInt(rand(monster_health / 4, monster_health / 3));
    if (monster_strenght <= 0) monster_strenght = 1;

    const monsters = [
        { health_threshold: 900, name: Data.content.monsters.lich, image: Data.settings.images.monster17 },
        { health_threshold: 700, name: Data.content.monsters.light_sword, image: Data.settings.images.monster16 },
        { health_threshold: 500, name: Data.content.monsters.golem, image: Data.settings.images.monster15 },
        { health_threshold: 400, name: Data.content.monsters.dead_warrior, image: Data.settings.images.monster14 },
        { health_threshold: 350, name: Data.content.monsters.daemon, image: Data.settings.images.monster13 },
        { health_threshold: 300, name: Data.content.monsters.minotaur, image: Data.settings.images.monster12 },
        { health_threshold: 250, name: Data.content.monsters.cerberus, image: Data.settings.images.monster11 },
        { health_threshold: 220, name: Data.content.monsters.troll, image: Data.settings.images.monster10 },
        { health_threshold: 190, name: Data.content.monsters.eye_ghost, image: Data.settings.images.monster09 },
        { health_threshold: 160, name: Data.content.monsters.werewolf, image: Data.settings.images.monster08 },
        { health_threshold: 130, name: Data.content.monsters.monster, image: Data.settings.images.monster07 },
        { health_threshold: 100, name: Data.content.monsters.lizard, image: Data.settings.images.monster06 },
        { health_threshold: 80, name: Data.content.monsters.gargoyle, image: Data.settings.images.monster05 },
        { health_threshold: 60, name: Data.content.monsters.gobelin, image: Data.settings.images.monster04 },
        { health_threshold: 40, name: Data.content.monsters.snake, image: Data.settings.images.monster03 },
        { health_threshold: 20, name: Data.content.monsters.bat, image: Data.settings.images.monster02 },
        { health_threshold: 0, name: Data.content.monsters.slim, image: Data.settings.images.monster01 }
    ];

    for (const monster of monsters) {
        if (monster_health > monster.health_threshold) {
            return [monster_health, monster_strenght, monster.name, monster.image];
        }
    }
}

/**
 * Fight monster by physical attack : 100% of experience, taking damage
 **/

export function attack() {
    setEvent("sub_action", "fight_over");
    updateGameStat("fight");
    
    playSound("attack");
    changeDisplay("normal");

    // Damage taken
    const nb_hit = Math.ceil(State.game.events.monster[0] / getHeroStat("power"));
    const damage = (nb_hit <= 1) ? 0 : parseInt(Math.max(0, (State.game.events.monster[1] - getHeroStat("stamina"))) * (nb_hit - 1));
    updateHeroStat("health", "minus", damage);

    // Experience
    const experience = rand(parseInt(getHeroStat("experience_to") / 10), parseInt(getHeroStat("experience_to") / 8));
    updateHeroStat("experience", "add", experience);

    // Display
    const paragraph_1 = displayImage(State.game.events.monster[3], State.game.events.monster[2]);
    const paragraph_2 = displayParagraph([
        `<strong>${State.game.events.monster[2]} </strong> ${Data.content.events.fight_win_1} <strong>`,
        `${nb_hit} </strong> ${plural(nb_hit, Data.content.vocabulary.hit_singular, Data.content.vocabulary.hit_plural)}`
    ])
    const paragraph_3 = displayParagraph([
        `${Data.content.events.fight_win_2} <strong>${damage}</strong>`,
        `${plural(damage, Data.content.vocabulary.point_singular, Data.content.vocabulary.point_plural)} ${Data.content.events.fight_win_3}`
    ], "bad_information");

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;

    // Display XP gain only if still alive
    if (getHeroStat("health") > 0)
        get("#game").innerHTML += displayParagraph([
            `${Data.content.events.fight_win_5} <strong>${experience}</strong>`,
            `${plural(experience, Data.content.vocabulary.point_singular, Data.content.vocabulary.point_plural)} ${Data.content.events.fight_win_4}`
        ], "good_information");
}

/**
 * Fight monster by magic : no damage but less experience
 **/

export function useScroll() {
    if (getInventory("scroll") > 0) {
        setEvent("sub_action", "fight_over");
        updateGameStat("fight");
        updateInventory("scroll", "minus", 1);

        playSound("scroll");
        changeDisplay("normal");

        const experience = parseInt(getHeroStat("experience_to") / 10);
        updateHeroStat("experience", "add", experience);

        const paragraph_1 = displayImage(State.game.events.monster[3], State.game.events.monster[2]);
        const paragraph_2 = displayParagraph(Data.content.events.fight_magic);
        const paragraph_3 = displayParagraph([
            `${Data.content.events.fight_win_5} <strong>${experience}</strong>`,
            `${plural(xp, Data.content.vocabulary.point_singular, Data.content.vocabulary.point_plural)} ${Data.content.events.fight_win_4} `
        ], "good_information");

        get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
    }
}
