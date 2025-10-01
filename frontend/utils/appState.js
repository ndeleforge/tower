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
    menu: false,
    modale: false,
    modaleAction: null
})

export const State = reactive({})
export const Sounds = reactive({})