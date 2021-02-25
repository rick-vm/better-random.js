import OutputFile from './OutputFile.js';
import { xorshift128plus } from '../src/Engines/xorshift128plus.js';
import { fast_unique_string_generator } from '../src/Utils/string.js';

const of = new OutputFile('./output.txt', { log: false });

const rng = new xorshift128plus();
const unique_string = fast_unique_string_generator('0123456789', 2, { uniquePercentage: 1 });

const arr: string[] = [];

console.time();
for (let i = 0; i < 20000000; ++i) {
	unique_string(rng);
}
console.timeEnd();

// of.analyze(arr, { occurrences: true, duplicates: true });