export function value<T extends V[] | Map<unknown, V> | Set<V>, V>(iterable: T): V | undefined {
  if (iterable instanceof Array) {
    return iterable[Math.floor(Math.random() * iterable.length)];
  } else if (iterable instanceof Map || iterable instanceof Set) {
    return [...iterable.values()][Math.floor(Math.random() * iterable.size)];
  }
  return;
}

export function index(iterable: Array<unknown>): number {
  return Math.floor(Math.random() * iterable.length);
}

export function key<K>(map: Map<K, unknown>): K | undefined {
  return [...map.keys()][Math.floor(Math.random() * map.size)];
}