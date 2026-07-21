export const CalcularRetencion = (
  baseRetefuente: number,
  porcentaje: number,
): number => {
  return baseRetefuente * (porcentaje / 100);
};
