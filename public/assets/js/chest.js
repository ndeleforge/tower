/**
 * Initialize the chest event : allow open / avoid
 **/

function chest() {
    _game.events.last_action = "chest";
    changeDisplay("chest");

    paragraph_1 = displayImage(SETTINGS.images.chest);
    paragraph_2 = `<p>${CONTENT.events.chest}.</p>`;

    get("#game").innerHTML = paragraph_1 + paragraph_2;
}

/**
 * Open the chest : randomly choose between trap, potion, magic or scroll
 **/

function openChest() {
    _game.events.sub_action = "chestOver";
    _game.stats.chest_open++;
    playSound("chest");
    changeDisplay("normal");

    const loot = rand(0, 15);
    let limited = false;
    let paragraph_1, paragraph_2, paragraph_3 = "";

    // Potion (11,12,13,14,15)
    if (loot > 10) {
        SETTINGS.data.item_limit > _game.character.item_potion ? _game.character.item_potion++ : limited = true;

        paragraph_1 = displayImage(SETTINGS.images.chest_open);
        paragraph_2 = displayParagraph(CONTENT.events.chest_potion);
        if (limited) paragraph_3 = displayParagraph(CONTENT.events.chest_limit, "bad_information");
    }

    // Spell (6,7,8,9,10)
    else if (loot > 5) {
        SETTINGS.data.item_limit > _game.character.item_scroll ? _game.character.item_scroll++ : limited = true;

        paragraph_1 = displayImage(SETTINGS.images.chest_open);
        paragraph_2 = displayParagraph(CONTENT.events.chest_scroll);
        if (limited) paragraph_3 = displayParagraph(CONTENT.events.chest_limit, "bad_information");
    }

    // Mineral (2,3,4,5)
    else if (loot > 1) {
        SETTINGS.data.item_limit > _game.character.item_mineral ? _game.character.item_mineral++ : limited = true;

        paragraph_1 = displayImage(SETTINGS.images.chest_open);
        paragraph_2 = displayParagraph(CONTENT.events.chest_mineral);
        if (limited) paragraph_3 = displayParagraph(CONTENT.events.chest_limit, "bad_information");
    }

    // Trap (0,1)
    else {
        _game.stats.chest_trap++;
        const damage = rand(1, _game.character.health / 5);
        _game.character.health = _game.character.health - damage;

        paragraph_1 = displayImage(SETTINGS.images.chest_open);
        paragraph_2 = displayParagraph(CONTENT.events.chest_trap_1);
        paragraph_3 = displayParagraph([
            CONTENT.events.chest_trap_2,
            `<strong> ${damage} </strong>`,
            plural(damage, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural),
            CONTENT.events.chest_trap_3
        ], "bad_information");
    }

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}

/**
 * Avoid the chest and do not open it
 **/

function closeChest() {
    _game.events.sub_action = "chestOver";
    _game.stats.chest_not_opened++;
    changeDisplay("normal");

    let paragraph_1 = displayImage(SETTINGS.images.chest);
    let paragraph_2 = displayParagraph(CONTENT.events.chest);
    let paragraph_3 = displayParagraph(CONTENT.events.chest_not_opened);

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}