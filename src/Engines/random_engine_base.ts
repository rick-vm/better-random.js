export abstract class random_engine_base {
  public readonly MIN: number;
  public readonly MAX: number;
  public readonly RANGE: number;

  constructor(min: number, max: number) {
    this.MIN = min;
    this.MAX = max;
    this.RANGE = max - min;
  }

  public abstract next(): number;
}