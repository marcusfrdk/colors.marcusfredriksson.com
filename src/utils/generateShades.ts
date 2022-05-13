import hexToHsl from "./hexToHsl";
import hslToHex from "./hslToHex";

const MAX = 100;
const MIN = 5; // If numberOfShades is above 20, the second lowest color will be equal or lower than the lowest color

const getClosestIndex = (array: number[], value: number): number => {
  let closestIndex = 0;

  for (let i = 1; i < array.length; i++) {
    if (Math.abs(array[i] - value) < Math.abs(array[closestIndex] - value)) {
      closestIndex = i;
    }
  }

  return closestIndex;
};

const generateShades = (hex: string, numberOfShades = 11): string[] => {
  const hsl = hexToHsl(hex);
  const diff = MAX / numberOfShades;
  const splits = Array(numberOfShades)
    .fill([])
    .map((_, i) => {
      if (i === 0) return MIN;
      return i * diff;
    });

  const colors = splits.map((value) => {
    const color = { ...hsl };
    color.l = value;
    return hslToHex(color);
  });

  const closestIndex = getClosestIndex(splits, hsl.l);
  colors[closestIndex] = hex;
  return colors;
};

export default generateShades;
