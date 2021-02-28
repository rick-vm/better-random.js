/**
 * Options for maps.
 * 
 * @since 1.0.0
 */
export interface MapOptions {
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
 * Options for normal maps.
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