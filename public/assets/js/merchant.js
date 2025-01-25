/**
 * Meeting with the merchant : exchange of minerals
 **/

function merchant() {
    _game.events.last_action = "merchant";

    let paragraph_1 = displayImage(SETTINGS.images.merchant);
    let paragraph_2 = displayParagraph(CONTENT.events.merchant);
    let paragraph_3;

    // If enough mineral
    if (_game.character.item_mineral > 1) {
        changeDisplay("merchant");
        paragraph_3 = displayParagraph(CONTENT.events.merchant_proposition);
    }

    // If not
    else {
        _game.events.sub_action = "merchantOver";
        paragraph_3 = displayParagraph(CONTENT.events.merchant_no_mineral);
    }

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3
}

/**
 * Accept the offer of the merchant
 **/

function acceptMerchant() {
    _game.events.sub_action = "merchantOver";
    _game.stats.merchant_accepted++;
    _game.character.item_mineral = _game.character.item_mineral - 2;
    playSound("merchant");
    changeDisplay("normal");

    const deal = rand(1, 3);
    let paragraph_1, paragraph_2, paragraph_3;

    // Offer 1 : power + 3
    if (deal == 3) {
        _game.character.power = _game.character.power + 3;

        paragraph_1 = displayImage(SETTINGS.images.merchant);
        paragraph_2 = displayParagraph(CONTENT.events.merchant_accepted);
        paragraph_3 = displayParagraph(CONTENT.events.merchant_offer_1, "good_information");
    }

    // Offer 2 : health + 10 and stamina + 2
    else if (deal == 2) {
        _game.character.health_max = _game.character.health_max + 10;
        _game.character.stamina = _game.character.stamina + 2;

        paragraph_1 = displayImage(SETTINGS.images.merchant);
        paragraph_2 = displayParagraph(CONTENT.events.merchant_accepted);
        paragraph_3 = displayParagraph(CONTENT.events.merchant_offer_2, "good_information");
    }

    // Offer 3 : nothing
    else {
        paragraph_1 = displayImage(SETTINGS.images.merchant);
        paragraph_2 = displayParagraph(CONTENT.events.merchant_accepted);
        paragraph_3 = displayParagraph(CONTENT.events.merchant_offer_3, "bad_information");
    }

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}

/**
 * Refuse the offer of the merchant
 **/

function refuseMerchant() {
    _game.events.sub_action = "merchantOver";
    _game.stats.merchant_refused++;
    changeDisplay("normal");

    paragraph_1 = displayImage(SETTINGS.images.merchant);
    paragraph_2 = displayParagraph(CONTENT.events.merchant_accepted);
    paragraph_3 = displayParagraph(CONTENT.events.merchant_refused, "bad_information");

    get("#game").innerHTML = paragraph_1 + paragraph_2 + paragraph_3;
}
