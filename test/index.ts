import OutputFile from './OutputFile.js';
import { xorshift128plus } from '../src/Engines/xorshift128plus.js';
import { unique_string_generator } from '../src/Utils/string.js';

const of = new OutputFile('./output.txt');

const rng = new xorshift128plus();
const unique_string = unique_string_generator('0123456789', 2, { uniquePercentage: 1 });

const arr: string[] = [];

console.time();
for (let i = 0; i < 1000; ++i) {
	arr.push(unique_string(rng));
}
console.timeEnd();
console.log(arr);
of.analyze(arr, { occurrences: true, duplicates: true });