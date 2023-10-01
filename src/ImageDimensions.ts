import type OpenSeadragon from 'openseadragon';

export interface ImageDimensions {

  height: number;

  width: number;

}

export const getImageDimensions = (
  viewer: OpenSeadragon.Viewer
): Promise<ImageDimensions> => new Promise(resolve => {
  if (viewer.world.getItemAt(0)?.source) {
    // Image already loaded - resolve immediately
    const { x, y } = viewer.world.getItemAt(0).source.dimensions;
    resolve({ width: x, height: y });
  } else {
    // Attach onOpen handler and resolve then
    const getDimensions = () => {
      const { x, y } = viewer.world.getItemAt(0).source.dimensions;

      viewer.removeHandler('open', getDimensions);

      resolve({ width: x, height: y });
    }

    viewer.addHandler('open', getDimensions);
  }
});