import { random_engine_base } from '../random_engine_base.js';

export class default_random_engine extends random_engine_base {
  constructor() {
    super(0, 0); // [0, 0] even though the range is [0, 1) to avoid distributions from mapping the output to [0, 0.5)
  }

  next(): number {
    return Math.random();
  }
}