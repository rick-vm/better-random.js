import { MapOptions } from '../typings/engine.js';
import { Vector } from '../utils/vector.js';

/**
 * The base class for all random engines
 * 
 * @abstract
 * 
 * @since 2.0.0
 */
export abstract class BaseRandomEngine {
	private static readonly INV_CHARSET = '\u200B\u2060\u180E\u200D\u200C'.split('');
	/**
	 * Generates the next number in the PRNG sequence and formats the output to [0, 1)
	 * 
	 * @abstract
	 * 
	 * @returns The generated number
	 * 
	 * @since 2.0.0
	 */
	public abstract next(): number;

	public uniform_real(min: number, max: number): number {
		return this.next() * (max - min) + min;
	}

	public uniform_int(min: number, max: number, { exclusiveStart = false, inclusiveEnd = true }: MapOptions = { exclusiveStart: false, inclusiveEnd: false }): number {
		return Math.floor(this.uniform_real(
			min + (exclusiveStart as unknown as number), 
			max + (inclusiveEnd as unknown as number), 
		));
	}

	public normal_real(min: number, max: number, mean = 0, standardDeviation = 1, skew = 0): number {
		let res;
		do res = this.normal_num(mean, standardDeviation, skew); while (res < 0 || res > 1);

		return res * (max - min) + min;
	}

	public normal_int(min: number, max: number, mean = 0, standardDeviation = 1, skew = 0, { exclusiveStart = false, inclusiveEnd = false }: MapOptions = { exclusiveStart: false, inclusiveEnd: false }): number {
		return Math.floor(this.normal_real(
			min + (exclusiveStart as unknown as number), 
			max + (inclusiveEnd as unknown as number), 
			mean, 
			standardDeviation,
			skew,
		));
	}

	public chance(chance: number): boolean {
		return this.next() < chance;
	}

	public uniform_real_array(length: number, min: number, max: number): Vector<number> {
		const vec = new Vector<number>(length);

		for (let i = 0; i < vec.length; i++) {
			vec[i] = this.uniform_real(min, max);
		}

		return vec;
	}

	public uniform_int_array(length: number, min: number, max: number, { exclusiveStart = false, inclusiveEnd = false }: MapOptions = { exclusiveStart: false, inclusiveEnd: false }): Vector<number> {
		const vec = new Vector<number>(length);

		for (let i = 0; i < vec.length; i++) {
			vec[i] = this.uniform_int(min, max, { exclusiveStart, inclusiveEnd });
		}

		return vec;
	}

	public normal_real_array(length: number, min: number, max: number, mean = 0, standardDeviation = 1, skew = 0): Vector<number> {
		const vec = new Vector<number>(length);

		for (let i = 0; i < vec.length; i++) {
			vec[i] = this.normal_real(min, max, mean, standardDeviation, skew);
		}

		return vec;
	}

	public normal_int_array(length: number, min: number, max: number, mean = 0, standardDeviation = 1, skew = 0, { exclusiveStart = false, inclusiveEnd = false }: MapOptions = { exclusiveStart: false, inclusiveEnd: false }): Vector<number> {
		const vec = new Vector<number>(length);

		for (let i = 0; i < vec.length; i++) {
			vec[i] = this.normal_int(min, max, mean, standardDeviation, skew, { exclusiveStart, inclusiveEnd });
		}

		return vec;
	}

	public shuffle_array<T extends unknown[]>(array: T): T {
		for (let i = array.length - 1; i > 0; i--) {
			const j = this.uniform_int(0, i);
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	}

	public string(length: number, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
		let str = '';

		for (let i = 0; i < length; i++) {
			str += charset[this.uniform_int(0, charset.length - 1)];
		}

		return str;
	}

	public invisible_string(length: number): string {
		let str = '';

		for (let i = 0; i < length; i++) {
			str += this.element(BaseRandomEngine.INV_CHARSET);
		}

		return str;
	}

	public element<T>(array: T[]): T {
		return array[this.uniform_int(0, array.length)]!;
	}

	/**
	 * Generate a random normally distrubuted number with an approximate range of [0, 1]
	 */
	private normal_num(mean: number, standardDeviation: number, skew: number): number {
		let u1, u2;
		do u1 = this.next(); while (u1 === 0);
		do u2 = this.next(); while (u2 === 0);

		const R = Math.sqrt(-2 * Math.log(u1));
		const theta = 2 * Math.PI * u2;

		const u0 = R * Math.cos(theta);
		const v = R * Math.sin(theta);

		const d = skew / Math.sqrt(1 + skew ** 2);
		u1 = d * u0 + v * Math.sqrt(1 - d ** 2);
		const z = u0 >= 0 ? u1 : -u1;

		return (mean + standardDeviation * z) / 10 + 0.5;
	}
}