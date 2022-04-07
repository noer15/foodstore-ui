export function formatPrice(number) {
  if (isNaN(parseInt(number))) {
    return 0;
  }
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "IDR",
  }).format(number);
}
