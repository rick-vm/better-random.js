export class Vector<T> extends Array<T> {
  constructor(size = 0) {
    super(size);
  }
  
  public random(): T {
    return this[Math.floor(Math.random() * this.length)];
  }
  
  public randomIndex(): number {
    return Math.floor(Math.random() * this.length);
  }
}