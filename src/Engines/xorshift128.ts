import { random_engine_base } from '../random_engine_base.js';

export class xorshift128 extends random_engine_base {
  private _x: number;
  private _y: number;
  private _z: number;
  private _w: number;

  constructor(x: number = Math.random() * Math.pow(2, 32), y: number = Math.random() * Math.pow(2, 32), z: number = Math.random() * Math.pow(2, 32), w: number = Math.random() * Math.pow(2, 32)) {
    super(0, 4294967295);

    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }

  next(): number {
    const t = this._x ^ this._x << 11;
    this._x = this._y, this._y = this._z, this._z = this._w;
    this._w = (this._w ^ this._w >>> 19) ^ (t ^ t >>> 8);
    return this._w >>> 0;
  }

  seed(x: number = Math.random() * Math.pow(2, 32), y: number = Math.random() * Math.pow(2, 32), z: number = Math.random() * Math.pow(2, 32), w: number = Math.random() * Math.pow(2, 32)): void {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }
}