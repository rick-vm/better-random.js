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
 * When used, please only work with numbers either 0, or 1.
 * 
 * @param x1 - The first bit
 * @param x2 - The second bit
 * @param carry - The ripple carry of the previous full_adder, defaults to `0`
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

export class int64_b {
	constructor(
		public b: bit64<boolean> = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
	) { }

	public xor({ b }: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			this.b[i] = this.b[i] !== b[i];
		}

		return y;
	}

	public or({ b }: int64_b): int64_b {
		const y = new int64_b;
		for (let i = 63; i !== -1; --i) {
			this.b[i] = this.b[i]! || b[i]!;
		}

		return y;
	}

	public and({ b }: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			this.b[i] = this.b[i]! && b[i]!;
		}

		return y;
	}

	public nand({ b }: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			this.b[i] = !(this.b[i]! && b[i]!);
		}

		return y;
	}

	public not(): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			this.b[i] = !this.b[i]!;
		}

		return y;
	}

	public comp2(): int64_b {
		const y = new int64_b;

		let c = true;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = !this.b[i]! || c;
			console.log(c, !this.b[i]);
			c = c && !this.b[i]!;
		}

		if (c) y.b = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

		return y;
	}

	public add(x: int64_b): int64_b {
		const y = new int64_b;

		let c = false;
		for (let i = 63; i !== -1; --i) {
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
 * @param num - The 32 bit integer
 * 
 * @since 1.0.0
 */
export function numToBoolArr(num: number): bit64<boolean> {
	const arr = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

	for (let i = 31; i !== -1; --i) {
		arr.push((num >> i & 0b1) === 1);
	}

	return <bit64<boolean>>arr;
}
