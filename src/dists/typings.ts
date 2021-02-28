import { base_random_engine } from '../engines/base_random_engine.js';

/**
 * Options for distributions.
 * 
 * @since 1.0.0
 */
export interface DistOptions {
	/** 
	 * Wether min is inclusive 
	 * 
	 * @since 1.0.0
	 */
	inclusiveStart?: boolean,
	/** 
	 * Wether max is inclusive 
	 * 
	 * @since 1.0.0
	 */
	inclusiveEnd?: boolean
}

/**
 * Options for normal distributions.
 * 
 * @since 1.0.0
 */
export interface NormalOptions {
	/** 
	 * The standard deviation 
	 * 
	 * @since 1.0.0
	 */
	standardDeviation?: number
}

/**
 * The return value of all distribution functions.
 * 
 * @since 1.0.0
 */
export type DistributionFunction = (rng: base_random_engine) => number;