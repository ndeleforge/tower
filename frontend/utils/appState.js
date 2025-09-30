import { reactive } from 'vue'

export const Data = reactive({
    version: null,
    settings: {},
    content: {}
})

export const Interface = reactive({
    screen: 'title',
    subscreen: 'board',
    actions: 'normal',
    menu: 'closed'
})

export const State = reactive({
    game: {},
    board: {}
})