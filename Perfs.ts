
export const execTime = <T>(f: () => T): [T, number] => {
  const t0 = performance.now();
  const result = f();
  const t1 = performance.now();
  return [result, t1 - t0];
}