import { random_engine_base } from '../random_engine_base.js';
import { DistOptions } from './typings.js';
export declare function uniform_real_distribution(min: number, max: number, { inclusiveEnd, inclusiveStart }?: DistOptions): (rng: random_engine_base) => number;
