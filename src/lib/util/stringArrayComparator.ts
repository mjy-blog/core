export function stringArrayComparator(a: string[], b: string[]): number {
  for (let i = 0; ; i++) {
    if (a.length === i && b.length === i) {
      return 0;
    }
    if (a.length === i) {
      return -1;
    }
    if (b.length === i) {
      return 1;
    }

    const result = a[i].localeCompare(b[i]);
    if (result) {
      return result;
    }
  }
}
