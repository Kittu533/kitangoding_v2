export const MAX_SERVER_ACTION_BODY_SIZE = 4 * 1024 * 1024;
export const MAX_SERVER_ACTION_BODY_SIZE_LABEL = "4mb";
export const MAX_IMAGE_FILE_SIZE = 10 * 1024 * 1024;

const TARGET_IMAGE_BYTES = 900 * 1024;
const MAX_IMAGE_DIMENSION = 1600;
const MIN_IMAGE_DIMENSION = 800;
const QUALITY_STEPS = [0.82, 0.72, 0.64, 0.56, 0.48] as const;

export function estimateDataUrlBytes(dataUrl: string) {
  if (!dataUrl) {
    return 0;
  }

  const [, base64 = ""] = dataUrl.split(",", 2);
  if (!base64) {
    return 0;
  }

  const sanitized = base64.replace(/\s/g, "");
  const padding = sanitized.endsWith("==") ? 2 : sanitized.endsWith("=") ? 1 : 0;

  return Math.max(0, Math.floor((sanitized.length * 3) / 4) - padding);
}

function readFileAsDataUrl(file: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Gagal membaca file gambar"));
    reader.readAsDataURL(file);
  });
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Gagal memproses gambar"));
    image.src = url;
  });
}

function getScaledDimensions(width: number, height: number, maxDimension: number) {
  const scale = Math.min(1, maxDimension / Math.max(width, height));

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

export async function optimizeImageForServerAction(file: File) {
  if (file.size > MAX_IMAGE_FILE_SIZE) {
    throw new Error("Ukuran file maksimal 10MB");
  }

  if (file.type === "image/svg+xml") {
    return readFileAsDataUrl(file);
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(objectUrl);
    let maxDimension = MAX_IMAGE_DIMENSION;
    let bestCandidate = "";

    while (maxDimension >= MIN_IMAGE_DIMENSION) {
      const { width, height } = getScaledDimensions(image.width, image.height, maxDimension);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Browser tidak mendukung kompresi gambar");
      }

      canvas.width = width;
      canvas.height = height;
      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      for (const quality of QUALITY_STEPS) {
        const candidate = canvas.toDataURL("image/webp", quality);
        bestCandidate = candidate;

        if (estimateDataUrlBytes(candidate) <= TARGET_IMAGE_BYTES) {
          return candidate;
        }
      }

      maxDimension = Math.floor(maxDimension * 0.8);
    }

    return bestCandidate || readFileAsDataUrl(file);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
