import { PathLike, createWriteStream, WriteStream } from 'fs';

export interface OutputFileOptions {
  log?: boolean;
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

  public output(output: string | number): void {
    if (this._log) console.log(output);
    output = new Date() + '\n' + output;
    if (this._outputCounter > 0) output = '\n\n' + output;
    this._writeStream.write(output);
    this._outputCounter++;
  }

  public clearOutput(output: string | number): void {
    if (this._log) console.log(output);
    output = new Date() + '\n' + output;
    if (this._outputCounter > 0) output = '\n\n' + output;
    this._writeStream = createWriteStream(this._writeStream.path);
    this._writeStream.write(output);
    this._outputCounter++;
  }
}