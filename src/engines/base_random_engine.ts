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

	public uniform_int(min: number, max: number, { exclusiveStart = false, exclusiveEnd = true }: MapOptions = { exclusiveStart: false, exclusiveEnd: true }): number {
		return Math.floor(this.uniform_real(
			min - (exclusiveStart as unknown as number), 
			max + (exclusiveEnd as unknown as number), 
		));
	}

	public normal_real(min: number, max: number, standardDeviation = 1): number {
		let res = this.normal_num(standardDeviation);
		while (res > 0.5 || res < -0.5)
			res = this.normal_num(standardDeviation);

		return (res + 0.5) * (max - min) + min;
	}

	public normal_int(min: number, max: number, { exclusiveStart = false, exclusiveEnd = true }: MapOptions = { exclusiveStart: false, exclusiveEnd: true }): number {
		return Math.floor(this.normal_real(
			min - (exclusiveStart as unknown as number), 
			max + (exclusiveEnd as unknown as number), 
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

	public uniform_int_array(length: number, min: number, max: number, { exclusiveStart = false, exclusiveEnd = true }: MapOptions = { exclusiveStart: false, exclusiveEnd: true }): Vector<number> {
		const vec = new Vector<number>(length);

		for (let i = 0; i < vec.length; i++) {
			vec[i] = this.uniform_int(min, max, { exclusiveStart, exclusiveEnd });
		}

		return vec;
	}

	public normal_real_array(length: number, min: number, max: number): Vector<number> {
		const vec = new Vector<number>(length);

		for (let i = 0; i < vec.length; i++) {
			vec[i] = this.normal_real(min, max);
		}

		return vec;
	}

	public normal_int_array(length: number, min: number, max: number, { exclusiveStart = false, exclusiveEnd = true }: MapOptions = { exclusiveStart: false, exclusiveEnd: true }): Vector<number> {
		const vec = new Vector<number>(length);

		for (let i = 0; i < vec.length; i++) {
			vec[i] = this.normal_int(min, max, { exclusiveStart, exclusiveEnd });
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

	private normal_num(standardDeviation: number): number {
		return Math.sqrt(-standardDeviation * Math.log(this.next()))
			* Math.cos((standardDeviation * Math.PI) * this.next()) / 10;
	}
}