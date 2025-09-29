/**
 *  Easy, pratical and quick element selector
 * @param {string} element
 * @return HTMLelement (querySelector)
 **/

export function get(element) {
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

export function rand(min, max) {
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

export function plural(quantity, singular, plural) {
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
 *  Return the value of the CSS variable given
 * @param {string} name name of the CSS variable
 * @return value of the CSS variable
 **/

export function getVariableCSS(name) {
    const variableCSS = getComputedStyle(document.documentElement).getPropertyValue("--" + name);

    if (variableCSS !== "") {
        return variableCSS;
    }
}

/**
 *  Load one template to a specified container
 **/

export async function loadHTML(url, container) {
    const res = await fetch(url);
    const html = await res.text();
    container.insertAdjacentHTML('beforeend', html);
}
