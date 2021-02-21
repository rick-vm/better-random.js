import { random_engine_base } from '../random_engine_base.js';
export declare class xoroshiro128plus extends random_engine_base {
    private _x;
    private _y;
    private _z;
    private _w;
    constructor(a?: number, b?: number, c?: number, d?: number);
    next(): number;
    seed(x?: number, y?: number, z?: number, w?: number): void;
}
