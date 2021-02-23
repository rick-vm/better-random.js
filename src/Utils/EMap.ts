export class EMap<K, V> extends Map<K, V> {
  private _array?: V[];
  private _keyArray?: K[];
  
  constructor(entries?: readonly [K, V][]) {
    super(entries);
  }
}