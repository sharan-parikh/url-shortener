
export interface Url {
    originalUrl: string;
    shortenedUrl: string;
}

export function shorten(originalUrl: string): string {
    // TODO
    return '';
}

export function validate(url: string): boolean {
    // TODO: use regex to figure out if the supplied url is valid
    return false;
}