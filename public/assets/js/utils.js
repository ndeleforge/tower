/**
 *  Easy, pratical and quick element selector
 * @param {string} element
 * @return HTMLelement (querySelector)
 **/

function get(element) {
    // ID element
    if (element.search("#") == 0 && element.split("#")[1] != null) {
        if (document.querySelector(element) != null) {
            return document.querySelector(element);
        }
    }
    
    // Class element
    if (element.search(".") == 0 && element.split(".")[1] != null) {
        if (document.querySelectorAll(element).length != 0) {
            return document.querySelectorAll(element);
        }
    }

    // Tag element
    if (element.search("~") == 0 && element.split("~")[1] != null) {
        if (document.querySelectorAll(element.split("~")[1])[0] != null) { 
            return document.querySelectorAll(element.split("~")[1])[0];
        }
    }
}

/**
 *  Return a random number between min and max
 * @param {int} min    minimal number
 * @param {int} max   maximal number
 * @return integer
 **/

function rand(min, max) {
    if (min < max) {
        return (Math.floor(Math.random() * max) + min);
    }
}

/**
 *  Return singular or plural according the quantity given
 * @param {int} quantity        quantity of an item or anything
 * @param {string} singular   value of the singular
 * @param {string} plural       value of the plural
 * @return singular or plural
 **/

function plural(quantity, singular, plural) {
    if (quantity > -1) {
        if (quantity < 2) {
            return singular;
        }
        else {
            return plural;
        }
    }
}

/**
 *  Get a local storage
 * @param {string} name name of the local storage
 * @return value of the local storage
 **/

function getStorage(name) {
    if (name && localStorage.getItem(name)) {
        return localStorage.getItem(name);
    }
}

/**
 *  Set a local storage
 * @param {string} name name of the local storage
 * @param {string} value value of the local storage
 **/

function setStorage(name, value) {
    if (name && value) {
        localStorage.setItem(name, value);
    }
}

/**
 *  Remove a local storage
 * @param {string} name name of the local storage
 **/

function deleteStorage(name) {
    if (name && localStorage.getItem(name)) {
        localStorage.removeItem(name);
    }
}

/**
 *  Return the value of the CSS variable given
 * @param {string} name name of the CSS variable
 * @return value of the CSS variable
 **/

function getVariableCSS(name) {
    const variableCSS = getComputedStyle(document.documentElement).getPropertyValue("--" + name);

    if (variableCSS !== "") {
        return variableCSS;
    }
}