import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { Image } from 'sanity';

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ 
  projectId : projectId || '',
  dataset : dataset || '',
 })

export const urlFor = (source: Image) => {
  return builder?.image(source).auto('format').fit('max').url();
}
