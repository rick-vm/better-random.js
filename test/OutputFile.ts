import { PathLike, createWriteStream, WriteStream } from 'fs';

export interface OutputFileOptions {
  log?: boolean;
}

export interface AnalyzeOptions {
  occurrences?: boolean,
  duplicates?: boolean
}

export interface AnalyzeReturn<T> {
  occurrences?: Map<T, number>,
  duplicates?: Map<T, number>
}

export default class OutputFile {
  private _writeStream: WriteStream;
  private _outputCounter = 0;
  private readonly _log: boolean;

  constructor(path: PathLike, { log = true }: OutputFileOptions = { log: true }) {
    path = './test/' + path.toString().substring(2);
    this._writeStream = createWriteStream(path);

    this._log = log;

    console.log('\x1b[1m===============================================\n', '\x1b[0m');
    console.log(`\x1b[1mOutput: \x1b[36m${this._writeStream.path}\n`, '\x1b[0m');
    console.log('\x1b[1m===============================================\n', '\x1b[0m');
  }

  public output(...outputs: (string | number)[]): void {
    for (let output of outputs) {
      if (this._log) console.log(output);
      output = new Date() + '\n' + output;
      if (this._outputCounter > 0) output = '\n\n' + output;
      this._writeStream.write(output);
      this._outputCounter++;
    }
  }

  public clearOutput(...outputs: (string | number)[]): void {
    for (let output of outputs) {
      if (this._log) console.log(output);
      output = new Date() + '\n' + output;
      if (this._outputCounter > 0) output = '\n\n' + output;
      this._writeStream = createWriteStream(this._writeStream.path);
      this._writeStream.write(output);
      this._outputCounter++;
    }
  }

  public analyze<T>(
    data: T[],
    { occurrences: entryOccurrence = false, duplicates = false }: AnalyzeOptions = { occurrences: false, duplicates: false }
  ): AnalyzeReturn<T> {
    const returnVal: AnalyzeReturn<T> = {};

    if (entryOccurrence) {
      const map = new Map<T, number>();

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
      const longestKey = Math.max(...[...map.keys()].map(key => (key + '').length));

      this.output('----------------------------\nOccurrences\n----------------------------\n' + `${('Entry - '.padEnd(longestKey) + 'Indicator Bar').padEnd(longestKey + 103) + ' - Occurrences'}\n` + entries.map(entry => ((entry[0] + ' - ').padEnd(longestKey + 3) + '='.repeat(Math.ceil(entry[1] / (highest / 100)))).padEnd(longestKey + 103) + ' - ' + entry[1]).join('\n'));
    }

    if (duplicates) {
      const arr: T[] = [];
      const map = new Map<T, number>();

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
}