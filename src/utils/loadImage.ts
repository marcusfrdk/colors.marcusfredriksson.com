export default async function loadImage(
  file: File
): Promise<{ imageData: ImageData; src: string }> {
  return await new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.height = img.height;
      canvas.width = img.width;
      const ctx = canvas.getContext("2d");
      canvas.remove(); // clear canvas from memory
      if (!ctx) return reject("No context found");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      if (imageData) return resolve({ imageData, src: img.src });
      return reject("Failed to parse ImageData");
    };
  });
}
