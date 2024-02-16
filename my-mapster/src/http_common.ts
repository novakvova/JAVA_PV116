import axios from "axios";
import {APP_ENV} from "./env";

console.log("URL", APP_ENV.BASE_URL);

const http_common = axios.create({
    baseURL: APP_ENV.BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export default  http_common;