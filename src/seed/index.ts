import type { Payload } from 'payload'

import { home } from './home'
import { features } from './features'
import { pricing } from './pricing'
import { about } from './about'
import { contact } from './contact'
import { heroImage } from './media'

export const seed = async (payload: Payload): Promise<void> => {
  let createdHeroImage

  // Create media item without file upload during seeding
  createdHeroImage = await payload.create({
    collection: 'media',
    data: heroImage,
  })

  await payload.create({
    collection: 'pages',
    data: { ...home, hero: { ...home.hero, media: createdHeroImage.id } },
  })

  await payload.create({
    collection: 'pages',
    data: features,
  })

  await payload.create({
    collection: 'pages',
    data: pricing,
  })

  await payload.create({
    collection: 'pages',
    data: about,
  })

  await payload.create({
    collection: 'pages',
    data: contact,
  })
}

