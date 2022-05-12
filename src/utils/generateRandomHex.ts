const generateRandomHex = (): string =>
  "#" + Math.random().toString(16).slice(2).substring(0, 6);

export default generateRandomHex;
