/**
 * Emulates a [half adder](https://en.wikipedia.org/wiki/Adder_(electronics)#Half_adder), mostly used internal.
 * 
 * When used, please only work with numbers either 0, or 1.
 * 
 * @param x1 - The first bit
 * @param x2 - The second bit
 * 
 * @since 1.0.0
 */
export function half_adder(x1: number, x2: number): [number, number] {
	return [x1 ^ x2, x1 & x2];
}

/**
 * Emulates a [ripple-carry adder](https://en.wikipedia.org/wiki/Adder_(electronics)#Ripple-carry_adder), mostly used internal.
 * 
 * When used, please only work with numbers either 0, or 1.
 * 
 * @param x1 - The first bit
 * @param x2 - The second bit
 * @param carry - The ripple carry of the previous full_adder, defaults to `0`
 * 
 * @since 1.0.0
 */
export function ripple_carry_adder(x1: number, x2: number, carry = 0): [number, number] {
	const y2 = half_adder(x1 ^ x2, carry);
	return [y2[0], x1 & x2 | y2[1]];
}

/**
 * Emulates a [half adder](https://en.wikipedia.org/wiki/Adder_(electronics)#Half_adder), mostly used internal.
 * 
 * Boolean version.
 * 
 * When used, please only work with numbers either 0, or 1.
 * 
 * @param x1 - The first bit
 * @param x2 - The second bit
 * 
 * @since 1.0.0
 */
export function half_adder_b(x1: boolean, x2: boolean): [boolean, boolean] {
	return [x1 !== x2, x1 && x2];
}

/**
 * Emulates a [ripple-carry adder](https://en.wikipedia.org/wiki/Adder_(electronics)#Ripple-carry_adder), mostly used internal.
 * 
 * Boolean version.
 * 
 * When used, please only work with numbers either 0, or 1.
 * 
 * @param x1 - The first bit
 * @param x2 - The second bit
 * @param carry - The ripple carry of the previous full_adder, defaults to `false`
 * 
 * @since 1.0.0
 */
export function ripple_carry_adder_b(x1: boolean, x2: boolean, carry = false): [boolean, boolean] {
	const y2 = half_adder_b(x1 !== x2, carry);
	return [y2[0], x1 && x2 || y2[1]];
}

type bit64<T> = [
	T, T, T, T, T, T, T, T,
	T, T, T, T, T, T, T, T,
	T, T, T, T, T, T, T, T,
	T, T, T, T, T, T, T, T,
	T, T, T, T, T, T, T, T,
	T, T, T, T, T, T, T, T,
	T, T, T, T, T, T, T, T,
	T, T, T, T, T, T, T, T
];

type i64 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63;

export class int64_b {
	constructor(
		public b: bit64<boolean> = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
	) { }

	public xor({ b }: int64_b): int64_b {
		const y = new int64_b;

		for (let i: i64 = 63; i !== -1; --i) {
			y.b[i] = this.b[i] !== b[i];
		}

		return y;
	}

	public or({ b }: int64_b): int64_b {
		const y = new int64_b;
		for (let i: i64 = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! || b[i]!;
		}

		return y;
	}

	public and({ b }: int64_b): int64_b {
		const y = new int64_b;

		for (let i: i64 = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! && b[i]!;
		}

		return y;
	}

	public nand({ b }: int64_b): int64_b {
		const y = new int64_b;

		for (let i: i64 = 63; i !== -1; --i) {
			y.b[i] = !(this.b[i]! && b[i]!);
		}

		return y;
	}
	
	public nor({ b }: int64_b): int64_b {
		const y = new int64_b;

		for (let i: i64 = 63; i !== -1; --i) {
			y.b[i] = !(this.b[i]! || b[i]!);
		}

		return y;
	}

	public xnor({ b }: int64_b): int64_b {
		const y = new int64_b;

		for (let i: i64 = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! === b[i]!;
		}

		return y;
	}

	public not(): int64_b {
		const y = new int64_b;

		for (let i: i64 = 63; i !== -1; --i) {
			y.b[i] = !this.b[i]!;
		}

		return y;
	}

	public comp2(): int64_b {
		const y = new int64_b;

		let c = true;

		for (let i: i64 = 63; i !== -1; --i) {
			y.b[i] = !this.b[i]! || c;
			c = c && !this.b[i]!;
		}

		if (c) y.b = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

		return y;
	}

	public add(x: int64_b): int64_b {
		const y = new int64_b;

		let c = false;
		for (let i: i64 = 63; i !== -1; --i) {
			const y1 = half_adder_b(this.b[i]!, x.b[i]!);
			const y2 = half_adder_b(y1[0], c);
			c = y1[1] || y2[1];
			y.b[i] = y.b[i] || y2[0];
		}

		return y;
	}

	public subtract(x: int64_b): int64_b {
		x = x.comp2();
		const y = new int64_b;

		let c = false;
		for (let i: i64 = 63; i !== -1; --i) {
			const y1 = half_adder_b(this.b[i]!, x.b[i]!);
			const y2 = half_adder_b(y1[0], c);
			c = y1[1] || y2[1];
			y.b[i] = y.b[i] || y2[0];
		}

		return y;
	}




	public toString(): string {
		return this.b.map(b => ~~b).join('');
	}
}

/**
 * Converts a 32 bit integer to a 64 bit boolean array
 * 
 * @param x - The 32 bit integer
 * 
 * @since 1.0.0
 */
export function numToBoolArr(x: number): bit64<boolean> {
	return arr: boolean[] = [];

	for (let i: i64 = 63; i !== -1; --i) {
		arr.push((x >> i & 0b1) === 1);
	}

	return <bit64<boolean>>arr;
}