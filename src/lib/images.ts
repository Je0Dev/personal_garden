const imageModules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/*.{jpg,png,gif}', { eager: true });

const pathMap: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(imageModules)) {
  const filename = path.split('/').pop()!;
  pathMap[filename] = mod.default;
  pathMap[`/personal_garden/images/${filename}`] = mod.default;
  pathMap[`${import.meta.env.BASE_URL}images/${filename}`] = mod.default;
}

export function resolveImage(path: string | undefined): ImageMetadata | undefined {
  if (!path) return undefined;
  const filename = path.split('/').pop();
  if (filename && pathMap[filename]) return pathMap[filename];
  if (pathMap[path]) return pathMap[path];
  return undefined;
}
