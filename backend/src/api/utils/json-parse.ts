export function jsonParse<T>(json: string | null): T | undefined {
    if (json === null) {
        return undefined;
    }
    return JSON.parse(json);
}
