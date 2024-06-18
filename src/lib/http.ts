import axios, { AxiosError } from "axios"
import { storageGet } from "./storage"
import { toast } from "@/components/ui/use-toast"

const RequestUrl = {
    dev: 'http://localhost:5008',
    prod: 'https://api-lotto.smaug.cc'
}

// const mockUserDataRaw = 'user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-3788475317572404878&chat_type=private&auth_date=1709144340&hash=371697738012ebd26a111ace4aff23ee265596cd64026c8c3677956a85ca1827'

export const http = axios.create({
    baseURL: RequestUrl[import.meta.env.DEV ? 'dev' : 'prod'],
    headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((req) => {

    if (storageGet('init_data_raw')) {
        req.headers['tma-authorization'] = `tma ${storageGet('init_data_raw')}`
    }

    return req
})

http.interceptors.response.use((res) => {
    return res.data
}, (err: AxiosError<{ code: number, msg: string }>) => {
    toast({ variant: 'destructive', description: err?.response?.data?.msg || err.message })
})
