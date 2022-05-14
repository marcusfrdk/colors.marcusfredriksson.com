import isHex from "./isHex";

export type Hsl = { h: number; s: number; l: number };

const hexToHsl = (hex: string): Hsl => {
  if (!hex || !isHex(hex)) return { h: 0, s: 0, l: 0 };

  const channels = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([\d]{2})?$/i.exec(
    hex
  ) ?? ["0", "0", "0", "0"];

  let r = parseInt(channels[1], 16);
  let g = parseInt(channels[2], 16);
  let b = parseInt(channels[3], 16);
  let a = parseInt(channels[4]) / 100;

  if (isNaN(a)) {
    a = 1;
  }

  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h: any,
    s: any = (max + min) / 2;

  let l: any = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
};

export default hexToHsl;
