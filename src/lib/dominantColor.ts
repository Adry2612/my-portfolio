const NEUTRAL = { r: 21, g: 24, b: 23 };
const NEUTRAL_WEIGHT = 0.3;
const SAMPLE_SIZE = 24;
const cache = new Map<string, string>();

function mixWithNeutral(channel: number, neutral: number) {
  return Math.round(channel * (1 - NEUTRAL_WEIGHT) + neutral * NEUTRAL_WEIGHT);
}

export function extractDominantColor(image: HTMLImageElement): string | null {
  const source = image.currentSrc || image.src;

  if (!source) return null;

  const cachedColor = cache.get(source);
  if (cachedColor) return cachedColor;

  try {
    const canvas = document.createElement('canvas');
    canvas.width = SAMPLE_SIZE;
    canvas.height = SAMPLE_SIZE;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return null;

    context.drawImage(image, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
    const { data } = context.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

    const buckets = new Map<
      string,
      { count: number; r: number; g: number; b: number }
    >();

    for (let index = 0; index < data.length; index += 4) {
      if (data[index + 3] < 128) continue;

      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const key = `${r >> 4}-${g >> 4}-${b >> 4}`;
      const bucket = buckets.get(key);

      if (bucket) {
        bucket.count += 1;
        bucket.r += r;
        bucket.g += g;
        bucket.b += b;
      } else {
        buckets.set(key, { count: 1, r, g, b });
      }
    }

    let dominant: { count: number; r: number; g: number; b: number } | null =
      null;

    for (const bucket of buckets.values()) {
      if (!dominant || bucket.count > dominant.count) {
        dominant = bucket;
      }
    }

    if (!dominant) return null;

    const color = `rgb(${mixWithNeutral(
      Math.round(dominant.r / dominant.count),
      NEUTRAL.r,
    )}, ${mixWithNeutral(
      Math.round(dominant.g / dominant.count),
      NEUTRAL.g,
    )}, ${mixWithNeutral(
      Math.round(dominant.b / dominant.count),
      NEUTRAL.b,
    )})`;

    cache.set(source, color);
    return color;
  } catch {
    return null;
  }
}
