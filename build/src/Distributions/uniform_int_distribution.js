export function uniform_int_distribution(min, max, { inclusiveEnd = false, inclusiveStart = true } = { inclusiveEnd: false, inclusiveStart: true }) {
    min += inclusiveStart ? 0 : 1;
    const range = max - min + (inclusiveEnd ? 1 : 0);
    return function (rng) {
        return Math.floor(((rng.next() - rng.MIN) / (rng.RANGE + 1) * range) + min);
    };
}
//# sourceMappingURL=uniform_int_distribution.js.map