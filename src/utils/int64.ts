/**
 * Emulates a [half adder](https://en.wikipedia.org/wiki/Adder_(electronics)#Half_adder), mostly used internal.
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
 * Emulates a [full adder](https://en.wikipedia.org/wiki/Adder_(electronics)#Full_adder), mostly used internal.
 * 
 * @param x1 - The first bit
 * @param x2 - The second bit
 * @param carry - The carry, defaults to `0`
 * 
 * @since 1.0.0
 */
export function full_adder(x1: number, x2: number, carry = 0): [number, number] {
	const y2 = half_adder(x1 ^ x2, carry);
	return [y2[0], x1 & x2 | y2[1]];
}

/**
 * Simulates a [half adder](https://en.wikipedia.org/wiki/Adder_(electronics)#Half_adder), mostly used internal.
 * 
 * Boolean version.
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
 * Simulates a [full adder](https://en.wikipedia.org/wiki/Adder_(electronics)#Full_adder), mostly used internal.
 * 
 * Boolean version.
 * 
 * @param x1 - The first bit
 * @param x2 - The second bit
 * @param carry - The carry, defaults to `false`
 * 
 * @since 1.0.0
 */
export function full_adder_b(x1: boolean, x2: boolean, carry = false): [boolean, boolean] {
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

/**
 * Represents a 64 bit integer with a bit array of boolean's. Does this by simulating certain parts of the ALU like [half adders](https://en.wikipedia.org/wiki/Adder_(electronics)#Half_adder) and [full adders](https://en.wikipedia.org/wiki/Adder_(electronics)#Full_adder) and implements all logic operations.
 * 
 * @since 1.0.0
 */
export class int64_b {
	public b: bit64_b

	/**
	 * @param bits - The boolean bit array that represents this int64. To transform two 32 bit integers to a bit array use `num2ToBoolArr64`.
	 */
	constructor(
		bits: bit64_b = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
	) {
		this.b = bits;
	}

	/**
	 * xor's this with `x` and returns the result.
	 * 
	 * @param x - The int64 to xor with
	 * 
	 * @since 1.0.0
	 */
	public xor(x: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i] !== x.b[i];
		}

		return y;
	}

	/**
	 * or's this with `x` and returns the result.
	 * 
	 * @param x - The int64 to or with
	 * 
	 * @since 1.0.0
	 */
	public or(x: int64_b): int64_b {
		const y = new int64_b;
		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! || x.b[i]!;
		}

		return y;
	}

	/**
	 * and's this with `x` and returns the result.
	 * 
	 * @param x - The int64 to and with
	 * 
	 * @since 1.0.0
	 */
	public and(x: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! && x.b[i]!;
		}

		return y;
	}

	/**
	 * nand's this with `x` and returns the result.
	 * 
	 * @param x - The int64 to nand with
	 * 
	 * @since 1.0.0
	 */
	public nand(x: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = !(this.b[i]! && x.b[i]!);
		}

		return y;
	}

	/**
	 * nor's this with `x` and returns the result.
	 * 
	 * @param x - The int64 to nor with
	 * 
	 * @since 1.0.0
	 */
	public nor(x: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = !(this.b[i]! || x.b[i]!);
		}

		return y;
	}

	/**
	 * xnor's this with `x` and returns the result.
	 * 
	 * @param x - The int64 to xnor with
	 * 
	 * @since 1.0.0
	 */
	public xnor(x: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! === x.b[i]!;
		}

		return y;
	}

	/**
	 * mux's this and `x` with `sel` and returns the result.
	 * 
	 * @param x - The other int64 to mux
	 * @param sel - The selector
	 * 
	 * @since 1.0.0
	 */
	public mux(x: int64_b, sel: int64_b): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = (this.b[i]! && !sel.b[i]!) || (x.b[i]! && sel.b[i]!);
		}

		return y;
	}

	/**
	 * demux's this with `sel` and returns the results.
	 * 
	 * @param sel - The selector
	 * 
	 * @since 1.0.0
	 */
	public demux(sel: int64_b): [int64_b, int64_b] {
		const y1 = new int64_b;
		const y2 = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y1.b[i] = !sel.b[i]! && this.b[i]!;
			y2.b[i] = sel.b[i]! && this.b[i]!;
		}

		return [y1, y2];
	}

	/**
	 * not's this and returns the result.
	 * 
	 * @since 1.0.0
	 */
	public not(): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = !this.b[i]!;
		}

		return y;
	}

	/**
	 * Gets the 2's complement of this and returns the result.
	 * 
	 * @since 1.0.0
	 */
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

	/**
	 * Shifts this to the left and returns the result.
	 * 
	 * @param x - The amount to shift
	 * 
	 * @since 1.0.0
	 */
	public shift_left(x: num64): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i + x] ?? this.b[0];
		}

		return y;
	}

	/**
	 * Shifts this to the right and returns the result.
	 * 
	 * @param x - The amount to shift
	 * 
	 * @since 1.0.0
	 */
	public shift_right(x: num64): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i - x] ?? this.b[0];
		}

		return y;
	}

	/**
	 * Unsigned Shifts this to the right and returns the result.
	 * 
	 * @param x - The amount to shift
	 * 
	 * @since 1.0.0
	 */
	public u_shift_right(x: num64): int64_b {
		const y = new int64_b;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i - x] ?? false;
		}

		return y;
	}

	/**
	 * Adds an int64 to this and returns the result.
	 * 
	 * @param x - The number to add
	 * 
	 * @since 1.0.0
	 */
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

	/**
	 * Subtract an int64 from this and returns the result.
	 * 
	 * @param x - The number to subtract
	 * 
	 * @since 1.0.0
	 */
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




	/**
	 * Converts this to a 32 bit integer (cuts off 32 left-most bits)
	 * 
	 * @since 1.0.0
	 */
	public toNumber(): number {
		return Number('0b' + this.toString().slice(32, 64));
	}

	/**
	 * Converts this to a 64 bit BigInt
	 * 
	 * @since 1.0.0
	 */
	public toBigInt(): bigint {
		return BigInt('0b' + this.toString());
	}

	/**
	 * Converts this to a 64 bit string (binary)
	 * 
	 * @since 1.0.0
	 */
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

/**
 * Represents a 64 bit integer with a bit array of number's. Does this by simulating certain parts of the ALU like [half adders](https://en.wikipedia.org/wiki/Adder_(electronics)#Half_adder) and [full adders](https://en.wikipedia.org/wiki/Adder_(electronics)#Full_adder) and implements all logic operations.
 * 
 * @since 1.0.0
 */
export class int64 {
	public b: bit64_n;

	/**
	 * @param bits - The number bit-array that represents this int64. To transform two 32 bit integers to a bit array use `num2ToBitArr64`.
	 */
	constructor(
		bits: bit64_n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	) {
		this.b = bits;
	}

	/**
	 * xor's this with `x` and returns the result.
	 * 
	 * @param x - The int64 to xor with
	 * 
	 * @since 1.0.0
	 */
	public xor(x: int64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! ^ x.b[i]!;
		}

		return y;
	}

	/**
	 * or's this with `x` and returns the result.
	 * 
	 * @param x - The int64 to or with
	 * 
	 * @since 1.0.0
	 */
	public or(x: int64): int64 {
		const y = new int64;
		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! | x.b[i]!;
		}

		return y;
	}

	/**
	 * and's this with `x` and returns the result.
	 * 
	 * @param x - The int64 to and with
	 * 
	 * @since 1.0.0
	 */
	public and(x: int64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i]! & x.b[i]!;
		}

		return y;
	}

	/**
	 * nand's this with `x` and returns the result.
	 * 
	 * @param x - The int64 to nand with
	 * 
	 * @since 1.0.0
	 */
	public nand(x: int64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = ~(this.b[i]! & x.b[i]!) & 0b1;
		}

		return y;
	}

	/**
	 * nor's this with `x` and returns the result.
	 * 
	 * @param x - The int64 to nor with
	 * 
	 * @since 1.0.0
	 */
	public nor(x: int64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = ~(this.b[i]! | x.b[i]!) & 0b1;
		}

		return y;
	}

	/**
	 * xnor's this with `x` and returns the result.
	 * 
	 * @param x - The int64 to xnor with
	 * 
	 * @since 1.0.0
	 */
	public xnor(x: int64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = ~(this.b[i]! ^ x.b[i]!) & 0b1;
		}

		return y;
	}

	/**
	 * mux's this and `x` with `sel` and returns the result.
	 * 
	 * @param x - The other int64 to mux
	 * @param sel - The selector
	 * 
	 * @since 1.0.0
	 */
	public mux(x: int64, sel: int64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = (this.b[i]! & ~sel.b[i]!) | (x.b[i]! & sel.b[i]!);
		}

		return y;
	}

	/**
	 * demux's this with `sel` and returns the results.
	 * 
	 * @param sel - The selector
	 * 
	 * @since 1.0.0
	 */
	public demux(sel: int64): [int64, int64] {
		const y1 = new int64;
		const y2 = new int64;

		for (let i = 63; i !== -1; --i) {
			y1.b[i] = ~sel.b[i]! & this.b[i]!;
			y2.b[i] = sel.b[i]! & this.b[i]!;
		}

		return [y1, y2];
	}

	/**
	 * not's this and returns the result.
	 * 
	 * @since 1.0.0
	 */
	public not(): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = ~this.b[i]! & 0b1;
		}

		return y;
	}

	/**
	 * Gets the 2's complement of this and returns the result.
	 * 
	 * @since 1.0.0
	 */
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

	/**
	 * Shifts this to the left and returns the result.
	 * 
	 * @param x - The amount to shift
	 * 
	 * @since 1.0.0
	 */
	public shift_left(x: num64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i + x] ?? this.b[0];
		}

		return y;
	}

	/**
	 * Shifts this to the right and returns the result.
	 * 
	 * @param x - The amount to shift
	 * 
	 * @since 1.0.0
	 */
	public shift_right(x: num64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i - x] ?? this.b[0];
		}

		return y;
	}

	/**
	 * Unsigned Shifts this to the right and returns the result.
	 * 
	 * @param x - The amount to shift
	 * 
	 * @since 1.0.0
	 */
	public u_shift_right(x: num64): int64 {
		const y = new int64;

		for (let i = 63; i !== -1; --i) {
			y.b[i] = this.b[i - x] ?? 0;
		}

		return y;
	}

	/**
	 * Adds an int64 to this and returns the result.
	 * 
	 * @param x - The number to add
	 * 
	 * @since 1.0.0
	 */
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

	/**
	 * Subtract an int64 from this and returns the result.
	 * 
	 * @param x - The number to subtract
	 * 
	 * @since 1.0.0
	 */
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




	/**
	 * Converts this to a 32 bit integer (cuts off 32 left-most bits)
	 * 
	 * @since 1.0.0
	 */
	public toNumber(): number {
		return Number('0b' + this.toString().slice(32, 64));
	}

	/**
	 * Converts this to a 64 bit BigInt
	 * 
	 * @since 1.0.0
	 */
	public toBigInt(): bigint {
		return BigInt('0b' + this.toString());
	}

	/**
	 * Converts this to a 64 bit string (binary)
	 * 
	 * @since 1.0.0
	 */
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

/**
 * Simulates a 64 bit ripple-carry adder
 * 
 * @param x1 - The first int64
 * @param x - The second int64
 * 
 * @internal
 * 
 * @since 1.0.0
 */
export function ripple_carry_adder(x1: int64, x: int64): int64 {
	const y = new int64;

	let c = 0;

	for (let i = 63; i !== -1; --i) {
		const res = full_adder(x.b[i]!, x1.b[i]!, c);
		y.b[i] = res[0];
		c = res[1];
	}

	return y;
}

/**
 * Simulates a 64 bit carry-save adder
 * 
 * @param x1 - The first int64
 * @param x2 - The second int64
 * @param x3 - The third int64
 * 
 * @internal
 * 
 * @since 1.0.0
 */
export function carry_save_adder(x1: int64, x2: int64, x3: int64): int64 {
	const s = new int64;
	const c = new int64;

	for (let i = 63; i !== -1; --i) {
		const res = full_adder(x3.b[i]!, x2.b[i]!, x1.b[i]!);
		s.b[i] = res[0];
		c.b[i] = res[1];
	}
	return ripple_carry_adder(c.shift_left(1), s);
}