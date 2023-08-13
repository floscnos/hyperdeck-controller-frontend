import axios from "axios";
import {getBaseUrl} from "@/helpers/baseurl.helper";

export const api = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
})