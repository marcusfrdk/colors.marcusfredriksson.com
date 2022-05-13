const regex =
  /^hsl[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)?[)]$/g;

export const isHSLString = (string: string): boolean =>
  Boolean(string.match(regex));

const isHSL = (value: any) =>
  typeof value === "object" &&
  value !== null &&
  "h" in value &&
  "s" in value &&
  "l" in value;

export default isHSL;
