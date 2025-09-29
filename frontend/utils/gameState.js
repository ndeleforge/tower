import { reactive } from 'vue'

export const State = reactive({
    game: null,
    refresh_display: null,
    refresh_interval: null
})

export const Data = reactive({
    version: null,
    settings: null,
    content: null
})