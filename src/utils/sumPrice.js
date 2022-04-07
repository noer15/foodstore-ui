export function sumPrice(items) {
  return items.reduce((acc, item) => acc + item.price * item.qty, 0);
}
