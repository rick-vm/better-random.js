import OutputFile from './OutputFile.js';
import { xorshift128 } from '../src/Engines/xorshift128.js';
import { uniform_int_distribution } from '../src/Distributions/uniform_int_distribution.js';
const of = new OutputFile('./output.txt');
const rng = new xorshift128();
const dist = uniform_int_distribution(0, 100);
const map = new Map();
for (let i = 0; i < 10000000; ++i) {
    const val = dist(rng);
    map.set(val, (map.get(val) || 0) + 1);
}
console.log(map);
//# sourceMappingURL=index.js.map