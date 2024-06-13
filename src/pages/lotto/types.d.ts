export type LottoType = 'pepe' | 'doge' | 'pogai' | 'bonk'

export interface Lotto {
    icon: LottoType
    tier: number
    reward: number
}

export interface LottoTicket {
    chips: number
    is_remain: boolean
    lottoInfo: {
        lotto: Lotto[]
        pepe_num: number
        rewards: number
    }
}