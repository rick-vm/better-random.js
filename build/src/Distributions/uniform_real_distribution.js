export function uniform_real_distribution(min, max, { inclusiveEnd = false, inclusiveStart = true } = { inclusiveEnd: false, inclusiveStart: true }) {
    const range = max - min - (inclusiveEnd ? 1 : 0);
    const start = inclusiveStart ? 0 : 1;
    return function (rng) {
        return ((rng.next() - rng.MIN + start) / (rng.RANGE + 1 + start) * range) + min;
    };
}
//# sourceMappingURL=uniform_real_distribution.js.map