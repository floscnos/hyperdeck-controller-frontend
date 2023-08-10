import {defineStore} from "pinia";

export const useMessagesStore = defineStore('messages', {
    state: () => ({
        socket: null,
        lastState: null,
    }),
    actions: {
        init() {
            this.socket = new WebSocket('ws://hyperdeck.meerradio.nl:80/ws');
        }
    }
});