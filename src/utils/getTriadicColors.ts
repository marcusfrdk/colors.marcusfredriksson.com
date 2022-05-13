import getColorsFromColorWheel from "./getColorsFromColorWheel";

const getTradicColors = (hex: string): string[] => {
  const deviations = [0, 120, 240];
  return getColorsFromColorWheel(hex, deviations);
};

export default getTradicColors;
