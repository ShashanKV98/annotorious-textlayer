<script lang="ts">
  import type { ImageAnnotation } from '@annotorious/openseadragon';
  import type { TextLayerOpts } from '../Types';

  let ref: HTMLSpanElement;

  /** props **/
  export let annotation: ImageAnnotation;
  export let opts: TextLayerOpts;

  $: b = annotation.target.selector.geometry.bounds;

  $: size =  ref ? [ref.offsetWidth, ref.offsetHeight] : [0, 0];

  const getStyle = (size: number[]) => {
    const offsetX = (opts.offsetX || 0);
    const offsetY = (opts.offsetY || 0);

    if (opts.position === 'center') {
      const w = b.maxX - b.minX;
      const cx = b.minX + w / 2 - size[0] / 2;

      const h = b.maxY - b.minY;
      const cy = b.minY + h / 2 - size[1] / 2;

      return `left:${cx + offsetX}px; top:${cy + offsetY}px;`;
    } else if (opts.position === 'topleft') {
      return `left:${b.minX + offsetX}px; top:${b.minY + offsetY}px;`;
    } else {
      return `left:${b.minX + offsetX}px; top:${b.maxY + offsetY}px;`;
    }
  }

  $: label = opts.label(annotation);
</script>

{#if label}
  <div 
    class="annotation"
    style={getStyle(size)}>
    <span bind:this={ref}>
      {label}
    </span>&nbsp;<!-- ensures spaces between words on copy and paste! -->
  </div>
{/if}