<template>
    <div id="information" class="container"></div>

    <div id="board" class="container">
        <div id="character">
            <div class="character_line">
                <div class="progress" id="health_bar">
                    <span class="progress_data" id="health_data"></span>
                    <span class="progress_bar" id="health">ㅤ</span>
                </div>
                <div class="progress" id="xp_bar">
                    <span class="progress_data" id="level"></span>
                    <span class="progress_bar" id="xp">ㅤ</span>
                </div>
            </div>

            <div class="character_line">
                <div class="character_element" id="power"></div>
                <div class="character_element" id="stamina"></div>
                <div class="character_element"></div>
                <div class="character_element" id="potion"></div>
                <div class="character_element" id="scroll"></div>
                <div class="character_element" id="mineral"></div>
            </div>
        </div>

        <div id="game"></div>

        <div id="actions">
            <div class="actions_line" id="classic_mode">
                <button class="button_action" id="move"></button>
                <button class="button_action" id="use_potion"></button>
            </div>
            <div class="actions_line" id="chest_mode">
                <button class="button_action" id="open_chest"></button>
                <button class="button_action" id="close_chest"></button>
            </div>
            <div class="actions_line" id="merchant_mode">
                <button class="button_action" id="accept_offer"></button>
                <button class="button_action" id="refuse_offer"></button>
            </div>
            <div class="actions_line" id="fight_mode">
                <button class="button_action" id="attack"></button>
                <button class="button_action" id="use_scroll"></button>
            </div>
        </div>
    </div>
</template>