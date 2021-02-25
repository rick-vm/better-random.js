import { random_engine } from './random_engine.js';

export class default_random_engine extends random_engine {
	constructor() {
		super(4294967295);
	}

	next(): number {
		return Math.random() * 4294967296;
	}
}