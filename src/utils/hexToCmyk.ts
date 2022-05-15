import hexToRgba from "./hexToRgba";
import isHex from "./isHex";

export type CMYK = {
  c: number;
  m: number;
  y: number;
  k: number;
};

const hexToCmyk = (hex: string): CMYK => {
  if (!isHex(hex)) return { c: 0, m: 0, y: 0, k: 0 };
  const { r, g, b } = hexToRgba(hex);

  const rp = r / 255;
  const gp = g / 255;
  const bp = b / 255;

  const decimals = 10 ** 2; // 10 ** decimal places

  const k = 1 - Math.max(rp, gp, bp);
  const c = Math.round(((1 - rp - k) / (1 - k)) * decimals) / decimals || 0;
  const m = Math.round(((1 - gp - k) / (1 - k)) * decimals) / decimals || 0;
  const y = Math.round(((1 - bp - k) / (1 - k)) * decimals) / decimals || 0;

  return { c, m, y, k: Math.round(k * 100) };
};

export default hexToCmyk;
