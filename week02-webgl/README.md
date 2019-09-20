# WebGL

WebGL is a rasterization engine, enabling you to use the raw power of your GPU from javascript. It's mostly used to render pixels to an HTML canvas, and opens up the possibility to do 3D graphics rendering using web technologies.

During the labs this weeks we will start with 2D WebGL rendering using the native WebGL API. For the 3D work, we'll use [the ThreeJS library](https://threejs.org) which leverages the WebGL apis and makes them quite a bit easier to work with.

Check some of the experiments at https://experiments.withgoogle.com/experiments?tag=WebGL to get a grasp of the possibilities of the WebGL standard.

## The basics: 2D WebGL

Before diving into a 3D library, it's a good idea to get a grasp of how the low level API works. You'll run into terms like fragment shaders, vertex shaders, normals, matrices, ... when you start building threejs apps.

During the first lab, we'll take you through some of the chapters of https://webglfundamentals.org/ - handling 2D webgl and image processing using WebGL.

### WebGL Fundamentals

Go through the page at https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html. Don't just copy past the code from the samples, rather type these line by line. Try to convert the example code to ES6 as well! No need to use a transpiler or anything fancy, you may use inline javascript in your pages while learning the API.

The coding part of that first page starts at "First we need an HTML canvas element" - the code blocks before that are pseudo-code, illustrating a couple of core concepts concerning shaders.

```html
<canvas id="c"></canvas>
```

Make sure to include `<script src="https://webglfundamentals.org/webgl/resources/webgl-utils.js"></script>` as well. This js file contains the `webglUtils.resizeCanvasToDisplaySize` function used in the tutorial.

Also, add some basic css to stretch the canvas to the full window size:

```html
<style>
  body {
    margin: 0;
  }
  canvas {
    width: 100vw;
    height: 100vh;
    display: block;
  }
</style>
```

You can find some step-by-step snapshots of the tutorial in this repo's projects subfolder.

### WebGL 2D Translation

After finishing the fundamentals chapter, we'll continue our journy by following the https://webglfundamentals.org/webgl/lessons/webgl-2d-translation.html page. This chapter shows you how to update vertex positions to move things on the canvas.

#### Part one: move a rectangle

In the first part, we'll move a rectangle across the screen when slider values change.

Instead of using the webglLessonsUI library to create sliders (as shown in the example code on the page), we'll be using [dat.gui](https://github.com/dataarts/dat.gui) to create a quick UI for modifying variables.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.6/dat.gui.min.js"></script>
```

Be sure to [check some examples of dat.gui online](https://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage)

dat.gui works by modifying properties on an object. Instead of working with a translation array (as in tutorial), you'll be defining a global properties object:

```javascript
// const translation = [0, 0];
const properties = {
  x: 0,
  y: 0
};
```

And use this properties object where you call the `setRectangle` method:

```javascript
// setRectangle(gl, translation[0], translation[1], width, height);
setRectangle(gl, properties.x, properties.y, width, height);
```

Add the gui panel at the end of your init function, and make sure `drawScene` gets called when the values change:

```javascript
const gui = new dat.GUI();
gui.add(properties, 'x', 0, 500).onChange(drawScene);
gui.add(properties, 'y', 0, 500).onChange(drawScene);
```

You should be able to move the rectangle using the dat.gui sliders:

![slider controller rectangle](images/webgl-2d-translation.gif)