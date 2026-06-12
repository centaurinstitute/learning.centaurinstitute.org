const DEFAULT_FALLBACK_THUMBNAIL =
  "https://cdn.centaurinstitute.org/media/8db68051-0b75-4bde-8924-b0781620a646.png";

const eventFallbackThumbnails: Record<string, string> = {
  SS2025:
    "https://cdn.centaurinstitute.org/media/cf5b23d7-db16-4313-9445-4495e00ee659.png",
  SS2024:
    "https://cdn.centaurinstitute.org/media/71b6cbda-d87b-4078-8e77-fe65f663b5b4.png",
  SS2023:
    "https://cdn.centaurinstitute.org/media/cb4a3e75-18e4-4d7b-82cc-2bb40ab084da.png",
  SS2022:
    "https://cdn.centaurinstitute.org/media/ef586f8a-e8fd-47b5-bf6e-4efe1f040b16.png",
  WW2022:
    "https://cdn.centaurinstitute.org/media/31c688e9-5e8f-45ec-bf7f-2612bbbf1fc0.png",
  WW2023:
    "https://cdn.centaurinstitute.org/media/b317f08b-cda8-40fb-be5e-9fa44ba30a22.png",
  WW2024:
    "https://cdn.centaurinstitute.org/media/33414f45-f1b3-4da4-a919-c99dedc3ff41.png",
};

const getFallbackThumbnail = (event?: string | null): string =>
  (event && eventFallbackThumbnails[event]) || DEFAULT_FALLBACK_THUMBNAIL;

export { getFallbackThumbnail, DEFAULT_FALLBACK_THUMBNAIL };
