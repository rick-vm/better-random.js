export declare abstract class random_engine_base {
    readonly MIN: number;
    readonly MAX: number;
    readonly RANGE: number;
    constructor(min: number, max: number);
    abstract next(): number;
}
