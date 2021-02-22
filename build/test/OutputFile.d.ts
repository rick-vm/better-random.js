/// <reference types="node" />
import { PathLike } from 'fs';
export interface OutputFileOptions {
    log?: boolean;
}
export interface AnalyzeOptions {
    entryOccurrence?: boolean;
}
export interface AnalyzeReturn<T> {
    entryOccurrence?: Map<T, number>;
}
export default class OutputFile {
    private _writeStream;
    private _outputCounter;
    private readonly _log;
    constructor(path: PathLike, { log }?: OutputFileOptions);
    output(output: string | number): void;
    clearOutput(output: string | number): void;
    analyze<T>(arr: T[], { entryOccurrence }?: AnalyzeOptions): AnalyzeReturn<T>;
}
