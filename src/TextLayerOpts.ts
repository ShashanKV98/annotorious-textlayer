import type { ImageAnnotation } from '@annotorious/openseadragon';

export interface TextLayerOpts {

  label(annotation: ImageAnnotation): string | undefined;

  mode?: 'fillBounds' | 'fixedSize';

  position?: 'topleft' | 'bottomleft';

  offsetX?: number;

  offsetY?: number;

}