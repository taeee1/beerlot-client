export const roundToDecimal = (
  value: number,
  decimalPlaces: number = 1
): number => {
  return parseFloat(parseFloat(`${value}`).toFixed(decimalPlaces))
}
