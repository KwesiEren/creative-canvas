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

export function findBySlug<T extends { title: string }>(items: T[], slug: string): T | undefined {
  return items.find((item) => slugify(item.title) === slug);
}
