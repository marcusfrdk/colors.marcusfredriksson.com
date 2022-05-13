const getGradientString = (
  bottomHex: string,
  middleHex: string,
  topHex: string,
  cssGradientDirection = "to bottom"
): string =>
  `linear-gradient(${cssGradientDirection}, ${bottomHex}, ${middleHex}, ${topHex})`;

export default getGradientString;
