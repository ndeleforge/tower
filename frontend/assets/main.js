import { get, loadHTML } from './js/utils.js';
import { getCoreData } from './js/helper.js';
import { loadLanguage, loadSettings, loadVersion, populateLang } from './js/appManager.js';
import { titleScreen, startGame } from './js/gameManager.js'
import { loadData } from './js/saveManager.js';

export const SAVE = "TowerData";

async function loadApp() {
    const app = get('#app');
    
    await loadHTML('templates/header.html', app);
    await loadHTML('templates/titlescreen.html', app);
    await loadHTML('templates/gamescreen.html', app);
    await loadHTML('templates/menu.html', app);
    await loadHTML('templates/popup.html', app);

    await loadVersion();
    await loadSettings();
    await loadData();
    await loadLanguage();
    populateLang();
}

async function main() {
    await loadApp();
    getCoreData("ongoing") == false ? titleScreen() : startGame("load");
}

main()