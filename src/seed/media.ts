import type { RequiredDataFromCollectionSlug } from 'payload'

export const heroImage: RequiredDataFromCollectionSlug<
  "media"
> = {
  alt: "Docmet Hero Image",
  filename: "docmet-hero.jpg",
  mimeType: "image/jpeg",
  filesize: 1024, // Dummy size
  width: 100,
  height: 100,
};

