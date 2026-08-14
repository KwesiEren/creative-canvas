/** Slug helpers shared by all detail routes. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function findByTitleSlug<T extends { title: string }>(
  items: T[],
  slug: string,
): T | undefined {
  return items.find((item) => slugify(item.title) === slug);
}

export function findByIdSlug<T extends { id: string }>(
  items: T[],
  slug: string,
): T | undefined {
  return items.find((item) => item.id === slug || slugify(item.id) === slug);
}

export function findByCustomSlug<T>(
  items: T[],
  slug: string,
  getSlugValue: (item: T) => string,
): T | undefined {
  return items.find((item) => slugify(getSlugValue(item)) === slug);
}

export function buildCanonical(path: string): string {
  const base = "https://adf-secretariat.org";
  return base + (path.startsWith("/") ? path : `/${path}`);
}
