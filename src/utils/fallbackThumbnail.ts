const DEFAULT_FALLBACK_THUMBNAIL =
  "https://cdn.centaurinstitute.org/media/f6b27457-a272-4fe9-9b82-eca1cb42d677.jpg";

const eventFallbackThumbnails: Record<string, string> = {
  SS2025:
    "https://cdn.centaurinstitute.org/media/b6d09a50-48ee-42bd-9ffa-18329799053d.jpg",
  SS2024:
    "https://cdn.centaurinstitute.org/media/3186fea2-85d2-4674-90af-26fcd44d67ec.jpg",
  SS2023:
    "https://cdn.centaurinstitute.org/media/68c2c637-28b9-4d4f-b948-7dfea547b5ab.jpg",
  SS2022:
    "https://cdn.centaurinstitute.org/media/f6b27457-a272-4fe9-9b82-eca1cb42d677.jpg",
  WW2022:
    "https://cdn.centaurinstitute.org/media/f6b27457-a272-4fe9-9b82-eca1cb42d677.jpg",
  WW2023:
    "https://cdn.centaurinstitute.org/media/68c2c637-28b9-4d4f-b948-7dfea547b5ab.jpg",
  WW2024:
    "https://cdn.centaurinstitute.org/media/3186fea2-85d2-4674-90af-26fcd44d67ec.jpg",
};

const getFallbackThumbnail = (event?: string | null): string =>
  (event && eventFallbackThumbnails[event]) || DEFAULT_FALLBACK_THUMBNAIL;

export { getFallbackThumbnail, DEFAULT_FALLBACK_THUMBNAIL };
