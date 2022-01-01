import { BaseRandomEngine } from './index.js';

export class RandomEngine extends BaseRandomEngine {
	public next(): number {
		return Math.random();
	}
}