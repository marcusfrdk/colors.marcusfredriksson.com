import getColorsFromColorWheel from "./getColorsFromColorWheel";

const getAnalogousColors = (hex: string, deviation = 25): string[] => {
  const deviations = [-2, -1, 0, 1, 2].map((i) => i * deviation);
  return getColorsFromColorWheel(hex, deviations);
};

export default getAnalogousColors;
