// [a, a, b, c]
// -> {a: 2, b: 1, c: 1}
export default function counter<T extends string | number | symbol>(items: T[]) {
  return items.reduce((acc, item) => {
    if (!acc[item]) {
      acc[item] = 1;
    } else {
      acc[item] += 1;
    }
    return acc;
  }, {} as Record<T, number>);
}
