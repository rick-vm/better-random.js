import { random_engine_base } from '../random_engine_base.js';
export class xorshift128 extends random_engine_base {
    constructor(x = Math.random() * Math.pow(2, 32), y = Math.random() * Math.pow(2, 32), z = Math.random() * Math.pow(2, 32), w = Math.random() * Math.pow(2, 32)) {
        super(0, 4294967295);
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }
    next() {
        const t = this._x ^ this._x << 11;
        this._x = this._y, this._y = this._z, this._z = this._w;
        this._w = (this._w ^ this._w >>> 19) ^ (t ^ t >>> 8);
        return this._w >>> 0;
    }
    seed(x = Math.random() * Math.pow(2, 32), y = Math.random() * Math.pow(2, 32), z = Math.random() * Math.pow(2, 32), w = Math.random() * Math.pow(2, 32)) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }
}
//# sourceMappingURL=xorshift128.js.map