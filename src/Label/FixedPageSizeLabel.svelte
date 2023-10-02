<script lang="ts">
  import type { ImageAnnotation } from '@annotorious/openseadragon';
  import type { TextLayerOpts } from '../Types';

  /** props **/
  export let annotation: ImageAnnotation;
  export let opts: TextLayerOpts;

  $: b = annotation.target.selector.geometry.bounds;

  const getStyle = () => {
    const offsetX = (opts.offsetX || 0);
    const offsetY = (opts.offsetY || 0);

    if (opts.position === 'topleft') {
      return `left:${b.minX + offsetX}px; top:${b.minY + offsetY}px;`;
    } else {
      return `left:${b.minX + offsetX}px; top:${b.maxY + offsetY}px;`;
    }
  }
</script>

<div 
  class="annotation"
  style={getStyle()}>
  <span>
    {opts.label(annotation)}
  </span>&nbsp;<!-- ensures spaces between words on copy and paste! -->
</div>