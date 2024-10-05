export function isSameStringArray(a: string[], b: string[]) {
  return a.length === b.length && a.every((_, i) => a[i] === b[i]);
}
