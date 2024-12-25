/**
 * Initialize the fight event : allow attack, magic or escaping
 **/

function fight() {
    _game.events.last_action = "fight";
    _game.events.monster = chooseMonster();
    changeDisplay("fight");

    let paragraph_1 = displayImage(_game.events.monster[3], _game.events.monster[2]);
    let paragraph_2 = displayParagraph(`<strong>${_game.events.monster[2]}</strong> ${CONTENT.events.fight_start} !`);
    let paragraph_3 = displayParagraph([
        `${CONTENT.vocabulary.health} : <strong>${_game.events.monster[0]}</strong> /`,
        `${CONTENT.vocabulary.power} : <strong>${_game.events.monster[1]}</strong>`
    ]);

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}

/**
 * Choose the monster according the height in the tower
 **/

function chooseMonster() {
    const monster_health = rand(_game.character.floor * 2, _game.character.floor * 5);
    let monster_strenght = parseInt(rand(monster_health / 4, monster_health / 3));
    if (monster_strenght <= 0) monster_strenght = 1;  // Can't be null or negative

    const monsters = [
        { health_threshold: 900, name: CONTENT.monsters.lich, image: SETTINGS.images.monster17 },
        { health_threshold: 700, name: CONTENT.monsters.light_sword, image: SETTINGS.images.monster16 },
        { health_threshold: 500, name: CONTENT.monsters.golem, image: SETTINGS.images.monster15 },
        { health_threshold: 400, name: CONTENT.monsters.dead_warrior, image: SETTINGS.images.monster14 },
        { health_threshold: 350, name: CONTENT.monsters.daemon, image: SETTINGS.images.monster13 },
        { health_threshold: 300, name: CONTENT.monsters.minotaur, image: SETTINGS.images.monster12 },
        { health_threshold: 250, name: CONTENT.monsters.cerberus, image: SETTINGS.images.monster11 },
        { health_threshold: 220, name: CONTENT.monsters.troll, image: SETTINGS.images.monster10 },
        { health_threshold: 190, name: CONTENT.monsters.eye_ghost, image: SETTINGS.images.monster09 },
        { health_threshold: 160, name: CONTENT.monsters.werewolf, image: SETTINGS.images.monster08 },
        { health_threshold: 130, name: CONTENT.monsters.monster, image: SETTINGS.images.monster07 },
        { health_threshold: 100, name: CONTENT.monsters.lizard, image: SETTINGS.images.monster06 },
        { health_threshold: 80, name: CONTENT.monsters.gargoyle, image: SETTINGS.images.monster05 },
        { health_threshold: 60, name: CONTENT.monsters.gobelin, image: SETTINGS.images.monster04 },
        { health_threshold: 40, name: CONTENT.monsters.snake, image: SETTINGS.images.monster03 },
        { health_threshold: 20, name: CONTENT.monsters.bat, image: SETTINGS.images.monster02 },
        { health_threshold: 0, name: CONTENT.monsters.slim, image: SETTINGS.images.monster01 }
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

function attack() {
    _game.events.sub_action = "fightOver";
    _game.stats.fight_victory++;
    playSound("attack");
    changeDisplay("normal");

    // Damage taken
    const nbHit = Math.ceil(_game.events.monster[0] / _game.character.power);
    const damage = (nbHit <= 1) ? 0 : parseInt(Math.max(0, (_game.events.monster[1] - _game.character.stamina)) * (nbHit - 1));
    _game.character.health = _game.character.health - damage;

    // Experience
    const xp = rand(parseInt(_game.character.xp_to / 10), parseInt(_game.character.xp_to / 8));
    _game.character.xp = _game.character.xp + xp;

    // Display
    let paragraph_1 = displayImage(_game.events.monster[3], _game.events.monster[2]);
    let paragraph_2 = displayParagraph([
        `<strong>${_game.events.monster[2]} </strong> ${CONTENT.events.fight_win_1} <strong>`,
        `${nbHit} </strong> ${plural(nbHit, CONTENT.vocabulary.hit_singular, CONTENT.vocabulary.hit_plural)}`
    ])
    let paragraph_3 = displayParagraph([
        `${CONTENT.events.fight_win_2} <strong>${damage}</strong>`,
        `${plural(damage, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural)} ${CONTENT.events.fight_win_3}`
    ], "bad_information");

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;

    // Display XP gain only if still alive
    if (_game.character.health > 0)
        get("#game").innerHTML += displayParagraph([
            `${CONTENT.events.fight_win_5} <strong>${xp}</strong>`,
            `${plural(xp, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural)} ${CONTENT.events.fight_win_4}`
        ], "good_information");
}



/**
 * Fight monster by magic : no damage but less experience
 **/

function useScroll() {
    if (_game.character.item_scroll > 0) {
        _game.events.sub_action = "fightOver";
        _game.character.item_scroll--;
        _game.stats.fight_victory++;
        playSound("scroll");
        changeDisplay("normal");

        // Experience
        const xp = parseInt(_game.character.xp_to / 10);
        _game.character.xp = _game.character.xp + xp;

        // Display
        let paragraph_1 = displayImage(_game.events.monster[3], _game.events.monster[2]);
        let paragraph_2 = displayParagraph(CONTENT.events.fight_magic);
        let paragraph_3 = displayParagraph([
            `${CONTENT.events.fight_win_5} <strong>${xp}</strong>`,
            `${plural(xp, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural)} ${CONTENT.events.fight_win_4} `
        ], "good_information");

        get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
    }
}