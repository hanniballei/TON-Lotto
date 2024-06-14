import { http } from '@/lib/http'

export const api = {
    rank: () => http.get('/rank'),

    taskStatus: () => http.get('/task/check'),

    checkPremium: () => http.post('/task/premium'),

    checkJoinChannel: () => http.post('/task/join_our_channel'),

    checkTwitterFollow: () => http.post('/task/follow_our_x'),

    checkDailyClaim: () => http.post('/task/daily_checkin'),

    checkDailyInvite: () => http.post('/task/daily_invite'),

    // TODO:
    checkDailyLotto: () => http.post('/task/daily_lotto')
}