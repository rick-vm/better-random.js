import { random_number_generator_base } from "../types.js";
import uniform_real_distribution from "./uniform_real_distribution.js";

/**
 * Creates a distribution for random number generators
 * 
 * @param {number} min The minimum value returned
 * @param {number} max The maximum value returned
 * @param {number} standard_deviation Standard deviation, if you don't know what it is go google it you cunt
 */
export default function (min: number, max: number, standard_deviation: number = 2) {

  const dist = uniform_real_distribution(0, 1);

  /**
   * @param rng
   */
  return function distribution(rng: random_number_generator_base): number {
    // Generating random numbers
    let u = dist(rng);
    let v = dist(rng);
    while (u === 0) u = dist(rng); while (v === 0) v = dist(rng); // Converting from [0, 1) to (0, 1)
    let res: number = Math.sqrt(-standard_deviation * Math.log(u)) * Math.cos((standard_deviation * Math.PI) * v); // Converting to a normal distribution

    // Making a distribution of 0, 1 with a mean of 0.5
    res = res / 10 + 0.5;
    if (res > 1 || res < 0) return distribution(rng);

    // Stretching the distribution to min and max
    res *= max - min;
    res += min;
    return res;
  }
}