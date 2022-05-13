import getColorsFromColorWheel from "./getColorsFromColorWheel";

const getSquareColors = (hex: string): string[] => {
  const deviations = [0, 90, 180, 270];
  return getColorsFromColorWheel(hex, deviations);
};

export default getSquareColors;
