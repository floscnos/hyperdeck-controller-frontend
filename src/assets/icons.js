import { library } from '@fortawesome/fontawesome-svg-core'
import {fa1, faInfinity, faPlay, faRotateLeft, faStop} from "@fortawesome/free-solid-svg-icons";

export function iconInit() {
    library.add([
        faPlay,
        faStop,
        faInfinity,
        fa1,
        faRotateLeft
    ])
}
