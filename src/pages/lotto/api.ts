import { http } from "@/lib/http";

export const api = {
    checkUnReveal: () => http.get('/lotto/check'),

    getTicket: () => http.get('/lotto/start'),

    submitTicket: () => http.post('/lotto/end')
}