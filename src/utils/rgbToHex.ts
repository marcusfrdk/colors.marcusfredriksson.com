const hexBase = (n: number) => {
  const hex = n.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

export function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  return `#${hexBase(r)}${hexBase(g)}${hexBase(b)}`.toLowerCase();
}
