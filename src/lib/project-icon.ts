import type { ImageMetadata } from 'astro';

// Every project icon, imported at build time: an unknown name fails the build instead of a broken image.
const icons = import.meta.glob<{ default: ImageMetadata }>(
  ['/src/assets/projects/*.{svg,png}', '!/src/assets/**/*_old.*'],
  { eager: true },
);

export function projectIcon(file: string): ImageMetadata {
  const icon = icons[`/src/assets/projects/${file}`];
  if (!icon) {
    throw new Error(`Unknown project icon: ${file}`);
  }

  return icon.default;
}
