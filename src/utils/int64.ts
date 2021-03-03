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
	const y1 = half_adder_b(x1, x2);
	const y2 = half_adder_b(y1[0], carry);
	return [y2[0], y1[1] || y2[1]];
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
type bit64_b = bit64<boolean>;
type bit64_n = bit64<number>

type num32 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
type num64 = num32 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63;

export class int64_b {
	public b: bit64_b

	constructor(
		b: bit64_b = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
	) {
		this.b = b;
	}

	public xor({ b }: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i] !== b[i];
		}

		return y;
	}

	public or({ b }: int64_b): int64_b {
		const y = new int64_b;
		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! || b[i]!;
		}

		return y;
	}

	public and({ b }: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! && b[i]!;
		}

		return y;
	}

	public nand({ b }: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = !(this.b[i]! && b[i]!);
		}

		return y;
	}

	public nor({ b }: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = !(this.b[i]! || b[i]!);
		}

		return y;
	}

	public xnor({ b }: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! === b[i]!;
		}

		return y;
	}

	public mux(x: int64_b, sel: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = (this.b[i]! && !sel.b[i]!) || (x.b[i]! && sel.b[i]!);
		}

		return y;
	}

	public demux(sel: int64_b): [int64_b, int64_b] {
		const y1 = new int64_b;
		const y2 = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y1.b[i] = !sel.b[i]! && this.b[i]!;
			y2.b[i] = sel.b[i]! && this.b[i]!;
		}

		return [y1, y2];
	}

	public not(): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = !this.b[i]!;
		}

		return y;
	}

	public comp2(): int64_b {
		const y = new int64_b;

		let c = true;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = !this.b[i]! !== c;
			c = c && !this.b[i]!;
		}

		if (c) y.b = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

		return y;
	}

	public shift_left(x: num64): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i + x] ?? this.b[0];
		}

		return y;
	}

	public shift_right(x: num64): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i - x] ?? this.b[0];
		}

		return y;
	}

	public u_shift_right(x: num64): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i - x] ?? false;
		}

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

	public subtract(x: int64_b): int64_b {
		x = x.comp2();
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




	public toNumber(): number {
		return Number('0b' + this.toString().slice(32, 64));
	}

	public toBigInt(): bigint {
		return BigInt('0b' + this.toString());
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
export function numToBoolArr64(x: number): bit64_b {
	const arr = new Array<boolean>(32).fill((x & 0b10000000000000000000000000000000) !== 0);

	for (let i = 31; i !== -1; --i) {
		arr.push((x >> i & 0b1) === 1);
	}

	return <bit64_b>arr;
}

/**
 * Converts a 32 bit integer to a 32 bit boolean array
 * 
 * @param x - The 32 bit integer
 * 
 * @since 1.0.0
 */
export function numToBoolArr32(x: number): bit64_b {
	const arr: boolean[] = [];

	for (let i = 31; i !== -1; --i) {
		arr.push((x >> i & 0b1) === 1);
	}

	return <bit64_b>arr;
}

/**
 * Converts two 32 bit integers to a 64 bit boolean array
 * 
 * @param x1 - The hi (left-most) 32 bit integer
 * @param x2 - The lo (right-most) 32 bit integer
 * 
 * @since 1.0.0
 */
export function num2ToBoolArr64(x1: number, x2: number): bit64_b {
	const arr: boolean[] = [];

	for (let i = 31; i !== -1; --i) {
		arr.push((x1 >> i & 0b1) === 1);
	}
	for (let i = 31; i !== -1; --i) {
		arr.push((x2 >> i & 0b1) === 1);
	}

	return <bit64_b>arr;
}

export class int64 {
	public b: bit64_n;

	constructor(
		bits: bit64_n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	) {
		this.b = bits;
	}

	public xor(x: int64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! ^ x.b[i]!;
		}

		return y;
	}

	public or(x: int64): int64 {
		const y = new int64;
		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! | x.b[i]!;
		}

		return y;
	}

	public and(x: int64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! & x.b[i]!;
		}

		return y;
	}

	public nand(x: int64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = ~(this.b[i]! & x.b[i]!) & 0b1;
		}

		return y;
	}

	public nor(x: int64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = ~(this.b[i]! | x.b[i]!) & 0b1;
		}

		return y;
	}

	public xnor(x: int64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = ~(this.b[i]! ^ x.b[i]!) & 0b1;
		}

		return y;
	}

	public mux(x: int64, sel: int64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = (this.b[i]! & ~sel.b[i]!) | (x.b[i]! & sel.b[i]!);
		}

		return y;
	}

	public demux(sel: int64): [int64, int64] {
		const y1 = new int64;
		const y2 = new int64;

		for (let i = 63; i !== -1; --i) {
			y1.b[i] = ~sel.b[i]! & this.b[i]!;
			y2.b[i] = sel.b[i]! & this.b[i]!;
		}

		return [y1, y2];
	}

	public not(): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = ~this.b[i]! & 0b1;
		}

		return y;
	}

	public comp2(): int64 {
		const y = new int64;

		let c = 1;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = (~this.b[i]! ^ c) & 0b1;
			c = c & this.b[i]!;
		}

		if (c) y.b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		return y;
	}

	public shift_left(x: num64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i + x] ?? this.b[0];
		}

		return y;
	}

	public shift_right(x: num64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i - x] ?? this.b[0];
		}

		return y;
	}

	public u_shift_right(x: num64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i - x] ?? 0;
		}

		return y;
	}

	public add(x: int64): int64 {
		const y = new int64;

		let c = 0;

		for (let i = 63; i !== -1; --i) {
			const y1 = half_adder(this.b[i]!, x.b[i]!);
			const y2 = half_adder(y1[0], c);
			c = y1[1] || y2[1];
			y.b[i] = y.b[i] || y2[0];
		}

		return y;
	}

	public subtract(x: int64): int64 {
		x = x.comp2();
		const y = new int64;

		let c = 0;

		for (let i = 63; i !== -1; --i) {
			const y1 = half_adder(this.b[i]!, x.b[i]!);
			const y2 = half_adder(y1[0], c);
			c = y1[1]! | y2[1]!;
			y.b[i] = y.b[i]! | y2[0];
		}

		return y;
	}





	public toNumber(): number {
		return Number('0b' + this.toString().slice(32, 64));
	}

	public toBigInt(): bigint {
		return BigInt('0b' + this.toString());
	}

	public toString(): string {
		return this.b.join('');
	}
}

/**
 * Converts a 32 bit integer to a 64 bit boolean array
 * 
 * @param x - The 32 bit integer
 * 
 * @since 1.0.0
 */
export function numToBitArr64(x: number): bit64_n {
	const arr = new Array<number>(32).fill(x & 0b10000000000000000000000000000000);

	for (let i = 31; i !== -1; --i) {
		arr.push(x >> i & 0b1);
	}

	return <bit64_n>arr;
}

/**
 * Converts a 32 bit integer to a 32 bit boolean array
 * 
 * @param x - The 32 bit integer
 * 
 * @since 1.0.0
 */
export function numToBitArr32(x: number): bit64_n {
	const arr: number[] = [];

	for (let i = 31; i !== -1; --i) {
		arr.push(x >> i & 0b1);
	}

	return <bit64_n>arr;
}

/**
 * Converts two 32 bit integers to a 64 bit boolean array
 * 
 * @param x1 - The hi (left-most) 32 bit integer
 * @param x2 - The lo (right-most) 32 bit integer
 * 
 * @since 1.0.0
 */
export function num2ToBitArr64(x1: number, x2: number): bit64_n {
	const arr: number[] = [];

	for (let i = 31; i !== -1; --i) {
		arr.push(x1 >> i & 0b1);
	}
	for (let i = 31; i !== -1; --i) {
		arr.push(x2 >> i & 0b1);
	}

	return <bit64_n>arr;
}