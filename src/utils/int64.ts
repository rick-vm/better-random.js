/**
 * Emulates a [half adder](https://en.wikipedia.org/wiki/Adder_(electronics)), mostly used internal.
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
 * Emulates a [half adder](https://en.wikipedia.org/wiki/Adder_(electronics)), mostly used internal.
 * 
 * When used, please only work with numbers either 0, or 1.
 * 
 * @param x1 - The first bit
 * @param x2 - The second bit
 * @param carry - The ripple carry of the previous full_adder, defaults to `0`
 * 
 * @since 1.0.0
 */
export function full_adder(x1: number, x2: number, carry = 0): [number, number] {
	const y2 = half_adder(x1 ^ x2, carry);
	return [y2[0], x1 & x2 | y2[1]];
}

/**
 * Represents a 64 bit integer by a hi and a lo 32 bit integer.
 * 
 * THIS IS A WORK IN PROGRESS.
 * 
 * It is nowhere near finished as it's complicated for me.
 * 
 * @since 1.0.0
 */
export class int64 {
	/**
	 * The high (left-most) 32 bits.
	 * 
	 * @since 1.0.0
	 */
	public hi = 0;
	/**
	 * The low (right-most) 32 bits.
	 * 
	 * @since 1.0.0
	 */
	public lo = 0;

	/**
	 * @param hi The high (left-most) 32 bits
	 * @param lo The low (right-most) 32 bits
	 */
	constructor(hi = 0, lo = 0) {
		this.hi = hi;
		this.lo = lo;
	}

	get [Symbol.toStringTag](): string {
		return (this.hi >>> 0).toString(2).padStart(32, '0') + (this.lo >>> 0).toString(2).padStart(32, '0');
	}

	public toString(radix = 2): string {
		return (this.hi >>> 0).toString(radix).padStart(32, '0') + (this.lo >>> 0).toString(radix).padStart(32, '0');
	}

	public increment(): this {
		let c = 0b1;

		for (let i = 0; i < 32 && c; ++i) {
			const o = this.lo >> i & 0b1;
			this.lo = this.lo ^ (c << i);
			c = o & c;
		}
		for (let i = 0; c && i < 32; ++i) {
			const o = this.hi >> i & 0b1;
			this.hi = this.hi ^ (c << i);
			c = o & c;
		}

		return this;
	}

	public xor(int: int64): this {
		this.lo ^= int.lo;
		this.hi ^= int.hi;
		return this;
	}

	public xor_hi(x: number): this {
		this.hi ^= x;
		return this;
	}

	public xor_lo(x: number): this {
		this.lo ^= x;
		return this;
	}

	public xor_hl(lo: number, hi: number): this {
		this.lo |= lo;
		this.hi |= hi;
		return this;
	}

	public or(int: int64): this {
		this.lo |= int.lo;
		this.hi |= int.hi;
		return this;
	}

	public or_hi(x: number): this {
		this.hi |= x;
		return this;
	}

	public or_lo(x: number): this {
		this.lo |= x;
		return this;
	}

	public or_hl(lo: number, hi: number): this {
		this.lo |= lo;
		this.hi |= hi;
		return this;
	}

	public add(int: int64): int64 {
		const y = new int64;
		let carry = 0;
		for (let i = 0; i < 32; ++i) {
			const y1 = half_adder(this.lo >> i & 0b1, int.lo >> i & 0b1);
			const y2 = half_adder(y1[0], carry);
			carry = y1[1] | y2[1];
			y.or_lo(y2[0] << i);
		}
		for (let i = 0; i < 32; ++i) {
			const y1 = half_adder(this.hi >> i & 0b1, int.hi >> i & 0b1);
			const y2 = half_adder(y1[0], carry);
			carry = y1[1] | y2[1];
			y.or_hi(y2[0] << i);
		}
		return y;
	}
}