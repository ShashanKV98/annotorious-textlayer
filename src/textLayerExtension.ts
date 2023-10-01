import type { OpenSeadragonAnnotator, ImageAnnotation, ImageAnnotatorState } from '@annotorious/openseadragon';
import { parseALTO, type PageMetadata } from '@annotorious/formats';
import OpenSeadragonTextLayer from './TextLayer.svelte';
import type { TextLayerOpts } from './TextLayerOpts';
import { getImageDimensions, type ImageDimensions } from './ImageDimensions';
import type { OCRFormat } from '.';

import './textLayerExtension.css';

export const mountExtension = (
  anno: OpenSeadragonAnnotator<ImageAnnotation>, 
  opts: TextLayerOpts
) => {

  const { viewer, state } = anno;

  let _visible = true;

  const textLayer = new OpenSeadragonTextLayer({
    target: viewer.element.querySelector('.openseadragon-canvas'),
    props: { state: state as ImageAnnotatorState, viewer, opts }
  });

  const scaleAnnotations = (a: ImageAnnotation[], page: PageMetadata, dim: ImageDimensions) => {
    const pageWidth = page.width;
    const pageHeight = page.height;

    const imgWidth = dim.width;
    const imgHeight = dim.height;

    if (pageWidth && pageHeight) {
      if (pageWidth === imgWidth && pageHeight === imgHeight) {
        // No need to scale
        return a;
      } else {
        console.log('[TextLayerExtension] Page and image are different size - scaling annotations');

        // TODO
        return a;
      }
    } else {
      console.warn('[TextLayerExtension] Cannot scale annotations without page dimensions');
      return a;
    }
  }

  const unmount = () => textLayer.$destroy();

  const setVisible = (visible: boolean) => {
    _visible = visible;
    textLayer.$$set({ visible });
  }

  const isVisible = () => _visible;

  const loadOCR = (url: string, format: OCRFormat = 'ALTO') => fetch(url)
    .then(res => res.text())
    .then(xml => {
      const { annotations, metadata } = parseALTO(xml);

      getImageDimensions(viewer).then(dimensions => {
        const scaled = scaleAnnotations(annotations, metadata, dimensions);
        anno.setAnnotations(scaled);
      });
    });

  return {
    isVisible,
    loadOCR,
    setVisible,
    unmount
  }

}