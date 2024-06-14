export function getShareUrl(url: string, text?: string) {
    return `https://t.me/share/url?url=${encodeURI(url)}&text=${encodeURIComponent(text || '')}`
}