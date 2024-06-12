/* eslint-disable @typescript-eslint/no-explicit-any */
import store from 'store2'

export type CacheKey = 'initDataRaw'

const prefixKey = (key: CacheKey) => `Lotto-${key}`

export const storageGet = (key: CacheKey, alt?: any) => store.get(prefixKey(key), alt)

export const storageSet = (key: CacheKey, value: any) => store.set(prefixKey(key), value)

export const storageRemove = (key: CacheKey) => store.remove(prefixKey(key))

export const storageClear = store.clearAll