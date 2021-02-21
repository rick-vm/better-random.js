import { random_engine_base } from '../random_engine_base.js';
export declare class xorshift128 extends random_engine_base {
    private _x;
    private _y;
    private _z;
    private _w;
    constructor(x?: number, y?: number, z?: number, w?: number);
    next(): number;
    seed(x?: number, y?: number, z?: number, w?: number): void;
}
