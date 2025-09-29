/*
import { get, loadHTML } from './js/utils.js';
import { getCoreData } from './js/helper.js';
import { loadLanguage, loadSettings, loadVersion, populateLang } from './js/appManager.js';
import { titleScreen, startGame } from './js/gameManager.js'
import { loadData } from './js/saveManager.js';

export const SAVE = "TowerData";

async function loadApp() {


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
*/

import { createApp } from 'vue'
import App from './App.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './style.css'

const app = createApp(App)
app.use(Toast)
app.mount('#app')
