export function getBaseUrl(isWebsocket = false) {
    let url = ''
    if (import.meta.env.VITE_STAGE === 'development') {
        if (isWebsocket) {
            url = import.meta.env.VITE_WEBSOCKET_URL;
        } else {
            url = import.meta.env.VITE_API_URL;
        }
    } else {
        if (isWebsocket) {
            url = 'wss://' + window.location.host;
        } else {
            url = window.location.origin + '/api';
        }
    }

    return url;
}