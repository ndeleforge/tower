const VERSION = "1.0.1";

let _game, 
    _refresh_display,
    _refresh_interval;

const SETTINGS = {
    'data' : {
        'health' : 25,
        'health_max' : 25,
        'power' : 5,
        'stamina' : 0,
        'xp' : 0,
        'xp_to' : 50,
        'level' : 1,
        'floor' : 1,
        'room' : 1,
        'item_potion' : 0,
        'item_scroll' : 0,
        'item_mineral' : 0,
        'item_limit' : 9,
        'score' : 0,
        'level_up_health' : 20,
        'level_up_power' : 2,
        'level_up_stamina' : 1,
        'spirit_health' : 10,
        'spirit_power' : 1,
        'spirit_stamina' : 1,
    },
    'icons' : {
        'sound_on' : "<i class='fas fa-volume-up'></i>",
        'sound_off' : "<i class='fas fa-volume-mute'></i>",
    },
    'sounds' : {
        'sound_attack' : "attack",
        'sound_scroll' : "scroll",
        'sound_merchant' : "merchant",
        'sound_chest' : "chest",
        'sound_potion' : "potion",
        'sound_room' : "room",
        'sound_floor' : "floor",
    },
    'images' : {
        // ux
        'menu_closed' : "assets/image/icon/book_closed.png",
        'menu_opened' : "assets/image/icon/book_opened.png",
        // events
        'start' : "event/first_floor.png",
        'no_event' : "event/no_event.png",
        'chest' : "event/chest.png",
        'chest_open' : "event/chest_open.png",
        'merchant' : "event/merchant.png",
        'earth_spirit' : "event/spirit_earth.png",
        'light_spirit' : "event/spirit_light.png",
        'fire_spirit' : "event/spirit_fire.png",
        'water_spirit' : "event/spirit_water.png",
        // icons
        'icon_power' : "icon/sword.png",
        'icon_stamina' : "icon/shield.png",
        'icon_potion' : "icon/potion.png",
        'icon_scroll' : "icon/scroll.png",
        'icon_mineral' : "icon/mineral.png",
        // monsters
        'monster01' : "monster/monster_01.png",
        'monster02' : "monster/monster_02.png",
        'monster03' : "monster/monster_03.png",
        'monster04' : "monster/monster_04.png",
        'monster05' : "monster/monster_05.png",
        'monster06' : "monster/monster_06.png",
        'monster07' : "monster/monster_07.png",
        'monster08' : "monster/monster_08.png",
        'monster09' : "monster/monster_09.png",
        'monster10' : "monster/monster_10.png",
        'monster11' : "monster/monster_11.png",
        'monster12' : "monster/monster_12.png",
        'monster13' : "monster/monster_13.png",
        'monster14' : "monster/monster_14.png",
        'monster15' : "monster/monster_15.png",
        'monster16' : "monster/monster_16.png",
        'monster17' : "monster/monster_17.png",
    }
};