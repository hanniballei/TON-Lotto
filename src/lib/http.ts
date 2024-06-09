import axios from "axios"

const RequestUrl = {
    dev: 'http://localhost:5008',
    prod: 'TODO:'
}

export const http = axios.create({
    baseURL: RequestUrl[import.meta.env.DEV ? 'dev' : 'prod'],
    headers: { 'Content-Type': 'application/json' },
})