import type { 
  ImageAnnotation, 
  ImageAnnotatorState, 
  OpenSeadragonAnnotator
} from '@annotorious/openseadragon';
import { parseALTO } from '@annotorious/formats';
import type { OCRFormat, TextLayerOpts } from './Types';
import OpenSeadragonTextLayer from './TextLayer.svelte';
import { getImageDimensions, scaleAnnotations } from './ImageDimensions';

import './textLayerExtension.css';

export const mountExtension = (
  anno: OpenSeadragonAnnotator<ImageAnnotation>, 
  opts: TextLayerOpts
) => {
  const { viewer, state } = anno;

  let _visible = opts.initialVisibility === undefined ? true : opts.initialVisibility;

  let _locked = false;

  const textLayer = new OpenSeadragonTextLayer({
    target: viewer.element.querySelector('.openseadragon-canvas'),
    props: { state: state as ImageAnnotatorState, viewer, opts, visible: _visible }
  });

  const isVisible = () => _visible;

  const isLocked = () => _locked;

  const loadOCR = (url: string, format: OCRFormat = 'ALTO') => fetch(url)
    .then(res => res.text())
    .then(xml => {
      const { annotations, metadata } = parseALTO(xml);

      getImageDimensions(viewer).then(dimensions => {
        const scaled = scaleAnnotations(annotations, metadata, dimensions);
        anno.setAnnotations(scaled);
      });
    });

  const setLocked = (locked: boolean) => {
    _locked = locked;
    viewer.setMouseNavEnabled(!locked);
    textLayer.$$set({ captureEvents: locked });
  }

  const setVisible = (visible: boolean) => {
    _visible = visible;
    textLayer.$$set({ visible });
  }

  const unmount = () => textLayer.$destroy();

  return {
    isLocked,
    isVisible,
    loadOCR,
    setLocked,
    setVisible,
    unmount
  }

}