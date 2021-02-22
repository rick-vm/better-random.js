import { random_engine_base } from '../random_engine_base.js';
import { DistOptions } from './typings.js';

export function uniform_real_distribution(min: number, max: number, { inclusiveEnd = false, inclusiveStart = true }: DistOptions = { inclusiveEnd: false, inclusiveStart: true}): (rng: random_engine_base) => number {
  const range = max - min - (inclusiveEnd ? 1 : 0);
  const start = inclusiveStart ? 0 : 1;
  return function (rng: random_engine_base): number {
    return ((rng.next() - rng.MIN + start) / (rng.RANGE + 1 + start) * range) + min;
  };
}