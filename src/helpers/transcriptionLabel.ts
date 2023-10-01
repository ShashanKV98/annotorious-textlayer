import type { ImageAnnotation } from '@annotorious/openseadragon';

export const transcriptionLabel = (annotation: ImageAnnotation) =>
  annotation.bodies.find(b => b.purpose === 'transcribing')?.value;