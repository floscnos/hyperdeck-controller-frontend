import {defineStore} from "pinia";
import {api} from "@/api";
import {getBaseUrl} from "@/helpers/baseurl.helper";

export const playStateEnum = {
    PLAYING: 'play',
    STOPPED: 'stopped',
}

function parseHyperdeckStatus(data) {
    const playState = data.playState;
    const looped = data.loop;
    const singleClip = data.singleClip;
    const timecode = data.timecode;
    const clipId = data.clipId;
    return [ playState, looped, singleClip, timecode, clipId ]
}

export const useHyperdeckStore = defineStore('hyperdeck', {
    state: () => ({
        playState: playStateEnum.STOPPED,
        looped: false,
        singleClip: false,
        timecode: '00:00:00;00',
        clipId: null,
    }),
    actions: {
        init() {
            api.get('/status').then(response => {
                [this.playState, this.looped, this.singleClip, this.timecode, this.clipId ] = parseHyperdeckStatus(response.data);
            })

            const ws = new WebSocket(getBaseUrl(true))
            ws.onmessage = (event) => {
               [ this.playState, this.looped, this.singleClip, this.timecode, this.clipId ] = parseHyperdeckStatus(JSON.parse(event.data));
            }
        }
    }
})