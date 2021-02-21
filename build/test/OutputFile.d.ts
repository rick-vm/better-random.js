/// <reference types="node" />
import { PathLike } from 'fs';
export interface OutputFileOptions {
    log?: boolean;
}
export default class OutputFile {
    private _writeStream;
    private _outputCounter;
    private readonly _log;
    constructor(path: PathLike, { log }?: OutputFileOptions);
    output(output: string | number): void;
    clearOutput(output: string | number): void;
}
