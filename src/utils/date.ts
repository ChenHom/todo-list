import { equal } from "./comparison";

export function pickLocalDateString(date: string = '') {
    if (date) {
        return new Date(date).toLocaleDateString('zh-Tw', { hour12: false })
    }
    return new Date().toLocaleDateString('zh-Tw', { hour12: false })
}

export function pickLocal24HourTimeString() {
    return new Date().toLocaleTimeString('zh-Tw', { hour12: false })
}

export function isSameDays(d1: string, d2: string) {
    return equal(new Date(d1).getTime(), new Date(d2).getTime());
}