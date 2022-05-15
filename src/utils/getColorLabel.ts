import hexToHsl from "./hexToHsl";
import isHex from "./isHex";

const getColorLabel = (hex: string): ColorType => {
  if (!hex || !isHex(hex)) return "";
  const hsl = hexToHsl(hex);
  if (hsl.s > 80 && hsl.l > 40 && hsl.l < 60) return "strong";
  if (hsl.s > 80 && hsl.l > 80) return "pastelle";
  return "";
};

type ColorType = "strong" | "pastelle" | "";

console.log(getColorLabel("#ff1717")); // "strong"
console.log(getColorLabel("#b90000")); // ""
console.log(getColorLabel("#ffa2a2")); // "pastelle"

export default getColorLabel;
