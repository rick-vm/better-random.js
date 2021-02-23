import { random_engine_base } from './random_engine_base.js';

export class default_random_engine extends random_engine_base {
  constructor() {
    super(0, 4294967295);
  }

  next(): number {
    return Math.random() * 4294967296;
  }
}