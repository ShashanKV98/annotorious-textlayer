import type { ImageAnnotation } from '@annotorious/openseadragon';

export interface TextLayerOpts {

  label(annotation: ImageAnnotation): string | undefined;

  mode?: 'fillBounds' | 'fixedPageSize' | 'fixedScreenSize';

  position?: 'topleft' | 'bottomleft' | 'center';

  offsetX?: number;

  offsetY?: number;

}

export type OCRFormat = 'ALTO';