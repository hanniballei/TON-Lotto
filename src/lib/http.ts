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
        // req.headers['tma-authorization'] = `tma ${storageGet('initDataRaw')}`
        // TODO: replace when publish
        req.headers['tma-authorization'] = `tma ${'user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-3788475317572404878&chat_type=private&auth_date=1709144340&hash=371697738012ebd26a111ace4aff23ee265596cd64026c8c3677956a85ca1827'}`
    }

    return req
})

http.interceptors.response.use((res) => {
    return res.data
})