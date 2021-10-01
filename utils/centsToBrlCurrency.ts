export function centsToBrlCurrency(value?: number) {
  return value
    ? (value / 100).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })
    : undefined;
}
