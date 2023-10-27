function gcd(a: number, b: number): number{
    if (a <= 0 || b <= 0) return -1 // only natural a and b

    while (a % b != 0) {
        a %= b;
        [a, b] = [b, a]
    }

    return b
}

console.log(gcd(28, 42)) // 14