import { createWriteStream } from 'fs';

export default class OutputFile {

	constructor(path, { log = true } = { log: true }) {
		path = './test/' + path.toString().substring(2);
		this._writeStream = createWriteStream(path);

		this._log = log;

		console.log('\x1b[1m===============================================\n', '\x1b[0m');
		console.log(`\x1b[1mOutput: \x1b[36m${this._writeStream.path}\n`, '\x1b[0m');
		console.log('\x1b[1m===============================================\n', '\x1b[0m');
	}

	output(...outputs) {
		for (let output of outputs) {
			if (this._log) console.log(output);
			output = new Date() + '\n' + output;
			if (this._outputCounter > 0) output = '\n\n' + output;
			this._writeStream.write(output);
			this._outputCounter++;
		}
	}

	clearOutput(...outputs) {
		for (let output of outputs) {
			if (this._log) console.log(output);
			output = new Date() + '\n' + output;
			if (this._outputCounter > 0) output = '\n\n' + output;
			this._writeStream = createWriteStream(this._writeStream.path);
			this._writeStream.write(output);
			this._outputCounter++;
		}
	}

	analyze(
		data,
		{ occurrences: entryOccurrence = false, duplicates = false } = { occurrences: false, duplicates: false }
	) {
		const returnVal = {};

		if (entryOccurrence) {
			const map = new Map();

			for (const entry of data) {
				map.set(entry, (map.get(entry) || 0) + 1);
			}

			const entries = [...map].sort((a, b) => {
				if (a[0] > b[0]) return 1;
				if (a[0] < b[0]) return -1;
				return 0;
			});

			returnVal.occurrences = new Map(entries);

			const highest = Math.max(...map.values());
			const longestKey = Math.max(...[...map.keys()].map(key => String(key).length));

			this.output('----------------------------\nOccurrences\n----------------------------\n' + `${('Entry - '.padEnd(longestKey) + 'Indicator Bar').padEnd(longestKey + 103) + ' - Occurrences'}\n` + entries.map(entry => ((entry[0] + ' - ').padEnd(longestKey + 3) + '='.repeat(Math.round(entry[1] / (highest / 100)))).padEnd(longestKey + 103) + ' - ' + entry[1]).join('\n'));
		}

		if (duplicates) {
			const arr = [];
			const map = new Map();

			for (const entry of data) {
				if (arr.includes(entry)) {
					map.set(entry, (map.get(entry) || 0) + 1);
					continue;
				}
				arr.push(entry);
			}

			const entries = [...map].sort((a, b) => {
				if (a[1] < b[1]) return 1;
				if (a[1] > b[1]) return -1;
				return 0;
			});

			returnVal.duplicates = new Map(entries);

			this.output('----------------------------\nDuplicates\n----------------------------\n' + 'Entry - Duplicates' + entries.map(entry => entry[0] + ' - ' + entry[1]).join('\n'));
		}

		return returnVal;
	}

	int(...xs) {
		for (let x of xs) {
			x = (x >>> 0).toString(2).padStart(32, '0');
			if (this._log) console.log(x);
			x = new Date() + '\n' + x;
			if (this._outputCounter > 0) x = '\n\n' + x;
			this._writeStream = createWriteStream(this._writeStream.path);
			this._writeStream.write(x);
			this._outputCounter++;
		}
	}
}

import { engines, dists, utils } from '../build/index.js'

const { int64, int64_b, num2ToBitArr64, num2ToBoolArr64 } = utils;

const o = new OutputFile('./output.txt', { log: true });

const rng = new engines.xoroshiro128plus();

console.time();
for (let i = 0; i < 10000; ++i) {
	const int1 = new int64_b(num2ToBoolArr64(rng.next(), rng.next()));
	const int2 = new int64_b(num2ToBoolArr64(rng.next(), rng.next()));

	int1.toString();
	int2.toString();
	int1.add(int2);
	int1.subtract(int2);
}
console.timeEnd();