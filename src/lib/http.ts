import axios from "axios"
import { storageGet } from "./storage"

const RequestUrl = {
    dev: 'http://localhost:5008',
    // TODO: change when publish
    prod: 'http://165.154.200.140:3000'
}

export const http = axios.create({
    baseURL: RequestUrl[import.meta.env.DEV ? 'dev' : 'prod'],
    headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((req) => {

    if (storageGet('initDataRaw')) {
        req.headers['tma-authorization'] = `tma ${storageGet('initDataRaw')}`
    }

    return req
})