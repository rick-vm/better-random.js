export function uniform_real_distribution(min, max, { inclusiveEnd = false } = { inclusiveEnd: false }) {
    const range = max - min + (inclusiveEnd ? 1 : 0);
    return function (rng) {
        return ((rng.next() - rng.MIN) / (rng.RANGE + 1) * range) + min;
    };
}
//# sourceMappingURL=uniform_real_distribution.js.map