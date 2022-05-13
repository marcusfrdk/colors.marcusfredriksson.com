import hexToHsl from "./hexToHsl";
import hslToHex from "./hslToHex";

const getColorsFromColorWheel = (
  hex: string,
  deviations: number[]
): string[] => {
  const hsl = hexToHsl(hex);
  const colors = deviations.map((dev) => {
    const color = { ...hsl };
    if (dev !== 0) {
      color.l = color.l > 10 ? color.l - 10 : color.l;
      color.s = color.s < 10 ? color.s + 20 : color.s;
    }
    color.h = (color.h + dev) % 360;
    return hslToHex(color);
  });

  return colors;
};

export default getColorsFromColorWheel;
