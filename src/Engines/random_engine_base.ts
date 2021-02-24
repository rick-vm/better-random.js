export abstract class random_engine_base {
	public readonly MAX: number;
	public readonly RANGE: number;

	constructor(max: number) {
		this.MAX = max;
		this.RANGE = max + 1;
	}

	public abstract next(): number;
}