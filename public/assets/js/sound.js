/**
 * Play sound if it's enabled
 * @param {string} value sound ID
 **/

function playSound(value) {
    if (_game.core.sound == true) {
        get("#sound_" + value).play();
    }
}

/**
 * Turn on and turn off sound
 **/

function checkSound() {
    if (_game.core.sound) {
        _game.core.sound = false;
        get("#volume_button").innerHTML = SETTINGS.icons.sound_off;
        get("#volume_button").style.opacity = 0.5;
    }
    else {
        _game.core.sound = true;
        get("#volume_button").innerHTML = SETTINGS.icons.sound_on;
        get("#volume_button").style.opacity = 1;
    }
}

/**
 * Add all the sources sounds into the HTML
 **/

function addSound() {
    Object.keys(SETTINGS.sounds).forEach(sound => {
        const audio = document.createElement("audio");
        audio.id = sound;
        audio.preload = "auto";
        get("~body").appendChild(audio);

        const source = document.createElement("source");
        source.src = "assets/sound/" + SETTINGS.sounds[sound] + ".mp3";
        source.type = "audio/mpeg";
        get("#" + sound).appendChild(source);
    })
}