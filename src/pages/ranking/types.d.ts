export interface RankInfo {
    current_user: {
        chips: number
        invite_number: number
        ranking: number
    }
    ranking_info: {
        points: number
        rank: number
        username: string
    }[]
}

export interface TaskStatus {
    daily_checkin: boolean
    daily_invite: boolean
    daily_lotto: boolean
    follow_our_x: boolean
    join_our_channel: boolean
    premium: boolean
}