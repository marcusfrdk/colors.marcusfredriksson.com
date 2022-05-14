const getImageDimensions = (
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number
): number[] => {
  const aspectRatio = Math.max(width, height) / Math.min(width, height);

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
