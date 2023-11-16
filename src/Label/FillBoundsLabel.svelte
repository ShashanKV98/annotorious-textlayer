<script type="ts">
  import type { ImageAnnotation } from '@annotorious/openseadragon';
  import type { TextLayerOpts } from '../Types';

  let ref: HTMLSpanElement;

  /** props **/
  export let annotation: ImageAnnotation;
  export let opts: TextLayerOpts;

  $: b = annotation.target.selector.geometry.bounds;

  $: left = b.minX;
  $: top = b.minY;
  $: width = b.maxX - b.minX;
  $: height = b.maxY - b.minY;

  $: scaleX = ref ? width / ref.offsetWidth : 1;
  $: scaleY = ref ? height / ref.offsetHeight : 1;

  $: label = opts.label(annotation);
</script>

{#if label}
  <div 
    class="annotation"
    style={`left:${left}px; top:${top}px; width: ${width}px; height: ${height}px; transform: scale(${scaleX}, ${scaleY})`}>
    <span bind:this={ref}>
      {label}
    </span>&nbsp;<!-- ensures spaces between words on copy and paste! -->
  </div>
{/if}