import { Hsl } from "./hexToHsl";
import isHSL from "./isHSL";

// Most of this function is taken from https://stackoverflow.com/a/44134328
const hslToHex = (hsl: Hsl): string => {
  if (!isHSL(hsl)) throw new Error("Invalid HSL value");
  const l = (hsl.l /= 100);
  const a = (hsl.s * Math.min(l, 1 - l)) / 100;
  const getHex = (n: number) => {
    const k = (n + hsl.h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${getHex(0)}${getHex(8)}${getHex(4)}`;
};

export default hslToHex;
