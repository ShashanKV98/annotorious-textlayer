![An example text layer overlay on a scanned document](https://raw.githubusercontent.com/annotorious/annotorious-v3-extensions/main/annotorious-osd-textlayer/screenshot.jpg "An example text layer overlay on a scanned document")

# Annotorious OpenSeadragon Textlayer Extension

A text layer extension for Annotorious OpenSeadragon v3. Includes support for the [ALTO/XML format](https://www.loc.gov/standards/alto/).

## Getting Started

Via npm

```sh
npm install --save @annotorious/openseadragon-textlayer
```

Note that this extension works __only with Annotorious OSD v3__.

```sh
npm install --save @annotorious/openseadragon
```

Code example:

```js
import { createOSDAnnotator } from '@annotorious/openseadragon';
import { mountExtension, transcriptionLabel } from '@annotorious/openseadragon-textlayer';

const viewer = OpenSeadragon({
  // ...init OpenSeadragon viewer
});

// init Annotorious 
const anno = createOSDAnnotator(viewer);

// init the text layer extension 
const textlayer = mountExtension(anno, {
  label: transcriptionLabel,
  mode: 'fixedPageSize',
  position: 'center',
  offsetY: 60
});

// load ALTO file
textlayer.loadOCR('alto-sample.xml');
```

## Using via Script Import

Make sure you have OpenSeadragon and the AnnotoriousOSD script and stylesheetin imported in your page.

```html
<html>
  <head>
    <!-- ... -->

    <!-- include script file -->
    <script src="https://cdn.jsdelivr.net/npm/@annotorious/openseadragon-textlayer@latest/dist/annotorious-openseadragon-textlayer.js"></script>

    <!-- include CSS styles -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@annotorious/openseadragon-textlayer@latest/dist/annotorious-openseadragon-textlayer.css">
  </head>
</html>
```

When using script import, Annotorious and the Text Layer extension expose their APIs through
global variables `AnnotoriousOSD` and `OSDTextLayer`.

```js
window.onload = function() {
  var viewer = OpenSeadragon({
    // ...init OpenSeadragon viewer
  });

  // init Annotorious
  var anno = AnnotoriousOSD.createOSDAnnotator(viewer);

  // init the text layer extension
  var textlayer = OSDTextLayer.mountExtension(anno, {
    label: OSDTextLayer.transcriptionLabel,
    mode: 'fixedPageSize',
    position: 'center',
    offsetY: 50
  });

  // load ALTO file
  textlayer.loadOCR('alto-sample.xml');
}
```

## API

#### Init Options

The text layer extension supports the following initialization options:

| Option         | Type     | Default           | Description                                                                                          |
|----------------|----------|-------------------|------------------------------------------------------------------------------------------------------|
| defaultVisible | boolean  | `true`            | Defines whether text layer is visible by default                                                     |   
| label          | Function | -                 | A function which takes an `ImageAnnotation` as argument and must return a string to display as label |
| mode           | string   | `fixedScreenSize` | Label display mode: `fixedScreenSize`, `fixedPageSize` or `fillBounds`                               |
| offsetX        | number   | 0                 | X offset from the default position, pixels, original base image resolution                           |
| offsetY        | number   | 0                 | Y offset from the default position, pixels, original base image resolution                           |
| position       | string   | `bottomleft`      | label position relative to the annotation bounding box: `topleft`, `bottomleft` or `center`          |

#### API

The `textlayer` object exposes the following API methods:

- __isLocked()__ returns `true` if OpenSeadragon is currently locked, so mouse drag will select text
- __isVisible()__ returns `true` if the text layer is currently visible
- __loadOCR(url: string)__ loads an ALTO/XML file from the given URL
- __setLocked(locked: boolean)__ changes lock status of the OpenSeadragon layer
- __setVisible(visible: boolean)__ changes the visibility of the text layer
- __unmount()__ unmounts the extension and destroys the text layer‚

## Customizing Styles

Most aspects of the appearance can be controlled via CSS. Selecting
`.a9s-osd-text-layer .annotation span` allows you to override the default
styles.

```css
.a9s-osd-textlayer .annotation span {
  color: #d80bde;
  font-size: 60px;
  text-shadow: 0 0 6px rgb(255 255 255 / 95%);
}
```

## License

[BSD 3-Clause](https://github.com/annotorious/annotorious-v3-extensions/blob/main/annotorious-osd-textlayer/LICENSE)

## Acknowledgements

This Annotorious extension exists thanks to the support of [Brumfield Labs](https://www.brumfieldlabs.com/),
creators of [FromThePage](https://fromthepage.com/).

<a href="https://fromthepage.com/">
<img src="https://raw.githubusercontent.com/annotorious/annotorious-v3-extensions/main/annotorious-osd-textlayer/fromthepage_logo.jpg" style="width: 150px" /></a><br/><br/>

Furthermore, thanks and acknowledgements go out to [Johannes Baiter](https://github.com/jbaiter) whose
[Mirador Textoverlay plugin](https://github.com/dbmdz/mirador-textoverlay) served as a guide
for this extension.

