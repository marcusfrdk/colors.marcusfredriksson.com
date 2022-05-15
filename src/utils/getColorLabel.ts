import hexToHsl from "./hexToHsl";
import isHex from "./isHex";

const getColorLabel = (hex: string): ColorType => {
  // This is definetely not the best way to do this, but it's kinda cool.
  if (!hex || !isHex(hex)) return "";
  const hsl = hexToHsl(hex);
  if (hsl.s > 80 && hsl.l >= 45 && hsl.l <= 65) return "strong";
  if (hsl.l > 80) return "pastelle";
  return "";
};

type ColorType = "strong" | "pastelle" | "";

export default getColorLabel;
