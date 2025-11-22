import { getHeroAttribute, getInventory, getSituation, setEvent, updateGameRecord, updateHeroAttribute, updateInventory, randomBetween, getEvent } from './appHelper.js'
import { getContent, getSettings } from './appState.js'
import { playSound } from './soundManager.js'

const MONSTERS = [
    { threshold: 900, key: 'lich', image: 'monster17' },
    { threshold: 700, key: 'light_sword', image: 'monster16' },
    { threshold: 500, key: 'golem', image: 'monster15' },
    { threshold: 400, key: 'dead_warrior', image: 'monster14' },
    { threshold: 350, key: 'daemon', image: 'monster13' },
    { threshold: 300, key: 'minotaur', image: 'monster12' },
    { threshold: 250, key: 'cerberus', image: 'monster11' },
    { threshold: 220, key: 'troll', image: 'monster10' },
    { threshold: 190, key: 'eye_ghost', image: 'monster09' },
    { threshold: 160, key: 'werewolf', image: 'monster08' },
    { threshold: 130, key: 'monster', image: 'monster07' },
    { threshold: 100, key: 'lizard', image: 'monster06' },
    { threshold: 80,  key: 'gargoyle', image: 'monster05' },
    { threshold: 60,  key: 'gobelin', image: 'monster04' },
    { threshold: 40,  key: 'snake', image: 'monster03' },
    { threshold: 20,  key: 'bat', image: 'monster02' },
    { threshold: 0,   key: 'slim', image: 'monster01' },
]

// Initialize the fight
export function startFight() {
    setEvent("current_event", "fight");
    setEvent("monster_data", chooseMonster());
}

// Choose the monster according the height in the tower
export function chooseMonster() {
    const floor = getSituation("floor")

    const monster_health = randomBetween(floor * 3, floor * 5)
    let monster_strength = parseInt(randomBetween(monster_health / 4, monster_health / 3))
    if (monster_strength <= 0) monster_strength = 1

    const monster = MONSTERS.find(m => monster_health > m.threshold)

    return [
        monster_health,
        monster_strength,
        getContent('monsters', monster.key),
        getSettings('images', monster.image)
    ]
}

// Fight monster by physical attack : 100% of experience, taking damage
export function attack() {
    setEvent("current_subevent", "fight_attack");
    updateGameRecord("fight");
    playSound("attack");

    // Damage taken
    const nb_hit = Math.ceil(getEvent("monster_data")[0] / getHeroAttribute("power"));
    const monsterPower = getEvent("monster_data")[1];
    const heroStamina = getHeroAttribute("stamina");
    const effectivePower = Math.max(0, monsterPower - heroStamina);
    const extraHits = Math.max(0, nb_hit - 1);
    const damage = extraHits > 0 ? parseInt(effectivePower * extraHits) : 0;    updateHeroAttribute("health", "minus", damage);
    setEvent("fight_nb_hit", nb_hit);
    setEvent("fight_damage", damage);

    // Experience
    const experience = randomBetween(
        parseInt(getHeroAttribute("experience_to") / 10),
        parseInt(getHeroAttribute("experience_to") / 8)
    );
    updateHeroAttribute("experience", "add", experience);
    setEvent("fight_xp_gain", experience);
}

// Fight monster by magic : no damage but less experience
export function useScroll() {
    if (getInventory("scroll") > 0) {
        updateInventory("scroll", "minus", 1);
        const experience = parseInt(getHeroAttribute("experience_to") / 10);
        updateHeroAttribute("experience", "add", experience);
        setEvent("current_subevent", "fight_scroll");
        setEvent("fight_xp_gain", experience);
        updateGameRecord("fight");
        playSound("scroll");
    }
}
