import {defineStore} from "pinia";

export const useGlobalsStore = defineStore('globals', {
    state: () => ({
        loading: true
    })
})