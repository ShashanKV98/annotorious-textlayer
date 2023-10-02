import type { OpenSeadragonAnnotator, ImageAnnotation, ImageAnnotatorState } from '@annotorious/openseadragon';
import { parseALTO } from '@annotorious/formats';
import OpenSeadragonTextLayer from './TextLayer.svelte';
import type { OCRFormat, TextLayerOpts } from './Types';
import { getImageDimensions, scaleAnnotations } from './ImageDimensions';

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