export function sort<T>(c1: T, c2: T) {
    if (c1 < c2) {
        return -1
    } else if (c1 > c2) {
        return 1
    } else {
        return 0
    }
}

export function equal<T>(e1: T, e2: T): boolean {
    return e1 === e2
}