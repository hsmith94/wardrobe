export function makeUrl(BASE_URL: string, ...parts: string[]): string {
    return BASE_URL + parts.map(encodeURIComponent).join('/');
}
