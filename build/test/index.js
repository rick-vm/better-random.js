import OutputFile from './OutputFile.js';
import { xorshift128 } from '../src/Engines/xorshift128.js';
import { normal_int_distribution } from '../src/Distributions/normal_int_distribution.js';
const of = new OutputFile('./output.txt');
const rng = new xorshift128();
const dist = normal_int_distribution(0, 20, { inclusiveEnd: true, standard_deviation: 3 });
const arr = [];
for (let i = 0; i < 1000000; ++i) {
    arr.push(dist(rng));
}
of.analyze(arr);
//# sourceMappingURL=index.js.map