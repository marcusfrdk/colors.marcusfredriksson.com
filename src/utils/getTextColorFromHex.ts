import isHex from "./isHex";

const white = "#ffffff";
const black = "#1c1c1c";

// Function logic taken from https://stackoverflow.com/a/41491220

const getTextColorFromHex = (hex: string): string => {
  if (!isHex(hex)) return white;
  const color = hex.charAt(0) === "#" ? hex.substring(1, 7) : hex;
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 150 ? black : white;
};

export default getTextColorFromHex;
