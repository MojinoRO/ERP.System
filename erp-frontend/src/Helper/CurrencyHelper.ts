const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatCurrency = (value: number): string => {
  if (Number.isNaN(value)) return "";
  return `$ ${formatter.format(value)}`;
};

export const parseCurrency = (value: string): number => {
  const limpio = value.replace(/[^0-9.]/g, "");
  const numero = Number(limpio);
  return Number.isNaN(numero) ? 0 : numero;
};
