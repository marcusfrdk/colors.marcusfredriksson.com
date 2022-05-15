/**
 * Takes in dimension parameters and returns an array of number
 * that represent the dimensions of the image in pixels.
 *
 * @param width number
 * @param height number
 * @returns [width, height] with values in pixels
 */
const getImageDimensions = (width: number, height: number): number[] => {
  const aspectRatio = Math.max(width, height) / Math.min(width, height);
  const maxHeight = window.innerHeight / 2;
  const maxWidth =
    window.innerWidth -
    parseFloat(getComputedStyle(document.documentElement).fontSize) * 2;

  console.log("Max", maxWidth, maxHeight);

  // Excuse this mess (this is only temporary)
  if (width > height) {
    height = maxHeight;
    width = height * aspectRatio;

    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }
  } else {
    height = maxHeight;
    width = height / aspectRatio;

    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }
  }

  return [width, height];
};

export default getImageDimensions;
