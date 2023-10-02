<script lang="ts">
  import type { ImageAnnotation } from '@annotorious/openseadragon';
  import type { TextLayerOpts } from '../Types';

  /** props **/
  export let annotation: ImageAnnotation;
  export let opts: TextLayerOpts;
  export let scale: number;
  export let imageSize: [number, number];

  $: b = annotation.target.selector.geometry.bounds;

  $: x = b.minX;
  $: y = opts.position === 'topleft' ? b.minY : b.maxY;

  const getStyle = (x: number, y: number, scale: number) => {
    const offsetX = (opts.offsetX || 0) / scale;
    const offsetY = (opts.offsetY || 0) / scale;

    if (opts.position === 'topleft') {
      const bottom = imageSize[1] - y;
      return `left:${x + offsetX}px; bottom:${bottom}px; transform: scale(${1 / scale})`;
    } else {
      return `left:${x + offsetX}px; top:${y + offsetY}px; transform: scale(${1 / scale})`;
    }
  }
</script>

<div 
  class="annotation"
  style={getStyle(x, y, scale)}>
  <span>
    {opts.label(annotation)}
  </span>&nbsp;<!-- ensures spaces between words on copy and paste! -->
</div>