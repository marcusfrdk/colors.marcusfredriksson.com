import hexToHsl from "./hexToHsl";
import isHex from "./isHex";

const getHoverColorFromHex = (hex: string): string => {
  if (!isHex(hex)) return "#000000";
  const hsl = hexToHsl(hex);
  hsl.l = hsl.l > 10 ? hsl.l - 10 : 0;
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
};

export default getHoverColorFromHex;
