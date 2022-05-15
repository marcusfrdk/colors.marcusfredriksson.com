import isHex from "./isHex";

export type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

const hexToRgba = (hex: string): RGBA => {
  if (!isHex(hex)) return { r: 0, g: 0, b: 0, a: 0 };
  const channels = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([\d]{2})?$/i.exec(
    hex
  ) ?? ["0", "0", "0", "0"];

  const r = parseInt(channels[1], 16);
  const g = parseInt(channels[2], 16);
  const b = parseInt(channels[3], 16);
  const a = parseInt(channels[4] ?? 100) / 100;

  return { r, g, b, a };
};

export default hexToRgba;
