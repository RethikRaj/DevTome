import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: import.meta.env.PROD,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(sanity)

export function urlFor(source: any) {
  return builder.image(source)
}