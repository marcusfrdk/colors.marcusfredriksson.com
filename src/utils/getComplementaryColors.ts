import getColorsFromColorWheel from "./getColorsFromColorWheel";

const getComplementaryColors = (hex: string): string[] => {
  const deviations = [0, 180];
  return getColorsFromColorWheel(hex, deviations);
};

export default getComplementaryColors;
