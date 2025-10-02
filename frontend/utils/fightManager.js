import { getHeroStat, getInventory, getSituation, setEvent, updateGameStat, updateHeroStat, updateInventory, randomBetween, getEvent } from './appHelper.js'
import { Data } from './appState.js'
import { playSound } from './soundManager.js'

// Initialize the fight
export function startFight() {
    setEvent("current_event", "fight");
    setEvent("monster_data", chooseMonster());
}

// Choose the monster according the height in the tower
function chooseMonster() {
    const monster_health = randomBetween(
        getSituation("floor") * 3,
        getSituation("floor") * 5
    );
    let monster_strenght = parseInt(randomBetween(
        monster_health / 4,
        monster_health / 3)
    );
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

// Fight monster by physical attack : 100% of experience, taking damage
export function attack() {
    setEvent("current_subevent", "fight_attack");
    updateGameStat("fight");
    playSound("attack");

    // Damage taken
    const nb_hit = Math.ceil(getEvent("monster_data")[0] / getHeroStat("power"));
    const damage = (nb_hit <= 1) ? 0 : parseInt(Math.max(0, (getEvent("monster_data")[1] - getHeroStat("stamina"))) * (nb_hit - 1));
    updateHeroStat("health", "minus", damage);
    setEvent("fight_nb_hit", nb_hit);
    setEvent("fight_damage", damage);

    // Experience
    const experience = randomBetween(
        parseInt(getHeroStat("experience_to") / 10),
        parseInt(getHeroStat("experience_to") / 8)
    );
    updateHeroStat("experience", "add", experience);
    setEvent("fight_xp_gain", experience);
}

// Fight monster by magic : no damage but less experience
export function useScroll() {
    if (getInventory("scroll") > 0) {
        setEvent("current_subevent", "fight_scroll");
        updateGameStat("fight");
        updateInventory("scroll", "minus", 1);

        playSound("scroll");

        const experience = parseInt(getHeroStat("experience_to") / 10);
        updateHeroStat("experience", "add", experience);
        setEvent("fight_xp_gain", experience);
    }
}
