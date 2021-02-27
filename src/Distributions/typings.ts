import { base_random_engine } from '../engines/base_random_engine.js';

export interface DistOptions {
	/** Wether min is inclusive */
	inclusiveStart?: boolean,
	/** Wether max is inclusive */
	inclusiveEnd?: boolean
}

export interface NormalOptions {
	/** The standard deviation */
	standardDeviation?: number
}

/**
 * @param rng - A random engine
 * 
 * @returns {number}
 * 
 * @since 1.0.0
 */
export type DistributionFunction = (rng: base_random_engine) => number;