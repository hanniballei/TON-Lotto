export function getShareUrl(url: string, text?: string) {
    return `https://t.me/share/url?url=${encodeURI(url)}&text=${encodeURIComponent(text || '')}`
}

export function getStartParams(paramsStr: string | undefined, key: 'referral') {
    if (!paramsStr) return null

    const params = paramsStr.split('&');

    for (const item of params) {
        const [_key, _value] = item.split('_');

        if (_key === key) {
            return _value
        }
    }

    return null
}