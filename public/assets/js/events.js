/**
 * When there is no event
 **/

function noEvent() {
    _game.events.last_action = "no_event";

    get("#game").innerHTML = displayImage();
    get("#container_img").style.background = "url('assets/image/" + SETTINGS.images.no_event + "') no-repeat center";
    get("#container_img").style.backgroundSize = "cover";
    get("#game").innerHTML += displayParagraph(CONTENT.events.no_event);
}

/**
 * Meeting with a spirit : randomly choose between fire, water, earth and light
 **/

function spirit() {
    _game.events.last_action = "spirit";
    _game.stats.spirit_meet++;

    const meeting = rand(1, 4)
    let paragraph_1, paragraph_2, paragraph_3;

    // Earth spirit : add stamina
    if (meeting == 4) {
        _game.character.stamina = _game.character.stamina + SETTINGS.data.spirit_stamina;

        paragraph_1 = displayImage(SETTINGS.images.earth_spirit);
        paragraph_2 = displayParagraph(CONTENT.events.spirit_earth_1);
        paragraph_3 = displayParagraph([
            CONTENT.events.spirit_earth_2,
            `<strong>${SETTINGS.data.spirit_stamina}</strong>`,
            plural(SETTINGS.data.spirit_stamina, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural)
        ], "good_information");
    }

    // 5-6 : Light spirit : add experience
    else if (meeting == 3) {
        const xp = rand(parseInt(_game.character.xp_to / 10), parseInt(_game.character.xp_to / 5));
        _game.character.xp = _game.character.xp + xp;

        paragraph_1 = displayImage(SETTINGS.images.light_spirit);
        paragraph_2 = displayParagraph(CONTENT.events.spirit_light_1);
        paragraph_3 = displayParagraph([
            CONTENT.events.spirit_light_2,
            `<strong>${xp}</strong>`,
            plural(xp, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural),
            CONTENT.events.spirit_light_3
        ], "good_information");
    }

    // 3-4 : Fire spirit : add power
    else if (meeting == 2) {
        _game.character.power = _game.character.power + SETTINGS.data.spirit_power;

        paragraph_1 = displayImage(SETTINGS.images.fire_spirit);
        paragraph_2 = displayParagraph(CONTENT.events.spirit_fire_1);
        paragraph_3 = displayParagraph([
            CONTENT.events.spirit_fire_2,
            `<strong>${SETTINGS.data.spirit_power}</strong>`,
            plural(SETTINGS.data.spirit_power, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural)
        ], "good_information");
    }

    // 1-2 : Water spirit : add health
    else {
        _game.character.health_max = _game.character.health_max + SETTINGS.data.spirit_health;

        paragraph_1 = displayImage(SETTINGS.images.water_spirit);
        paragraph_2 = displayParagraph(CONTENT.events.spirit_water_1);
        paragraph_3 = displayParagraph([
            CONTENT.events.spirit_water_2,
            `<strong>${SETTINGS.data.spirit_health}</strong>`,
            plural(SETTINGS.data.spirit_health, CONTENT.vocabulary.point_singular, CONTENT.vocabulary.point_plural)
        ], "good_information");
    }

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}

/**
 * Use a potion and regain all health
 **/

function usePotion() {
    if (_game.character.item_potion > 0 && _game.character.health < _game.character.health_max) {
        _game.character.item_potion--;
        _game.character.health = _game.character.health_max;
        _game.stats.potion_used++;
        playSound("potion");

        get("#game").innerHTML += '<hr>' + displayParagraph(CONTENT.events.healing, "good_information");
    }
}
