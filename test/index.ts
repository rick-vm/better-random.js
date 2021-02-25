import OutputFile from './OutputFile.js';
import { xorshift128 } from '../src/Engines/xorshift128.js';
import { unique_string_generator } from '../src/Utils/string.js';

const of = new OutputFile('./output.txt');

const rng = new xorshift128();
const unique_string = unique_string_generator('0123456789', 1);

const arr: string[] = [];

for (let i = 0; i < 3; ++i) {
	arr.push(unique_string(rng));
}

of.analyze(arr, { duplicates: true, occurrences: true });