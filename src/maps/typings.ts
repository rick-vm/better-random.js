import { base_random_engine } from '../Engines/base_random_engine.js';

export interface MapOptions {
	/** Wether min is inclusive */
	inclusiveStart ? : boolean,
	/** Wether max is inclusive */
	inclusiveEnd ? : boolean
}

export interface NormalOptions {
	/** The standard deviation */
	standardDeviation ? : number
}