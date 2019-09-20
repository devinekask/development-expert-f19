# WebGL

WebGL is a rasterization engine, enabling you to use the raw power of your GPU from javascript. It's mostly used to render pixels to an HTML canvas, and opens up the possibility to do 3D graphics rendering using web technologies.

During the labs this weeks we will start with 2D WebGL rendering using the native WebGL API. For the 3D work, we'll use [the ThreeJS library](https://threejs.org) which leverages the WebGL apis and makes them quite a bit easier to work with.

Check some of the experiments at https://experiments.withgoogle.com/experiments?tag=WebGL to get a grasp of the possibilities of the WebGL standard.

## The basics: 2D WebGL

Before diving into a 3D library, it's a good idea to get a grasp of how the low level API works. You'll run into terms like fragment shaders, vertex shaders, normals, matrices, ... when you start building threejs apps.

During the first lab, we'll take you through some of the chapters of https://webglfundamentals.org/ - handling 2D webgl and image processing using WebGL.

### WebGL Fundamentals

Go through the page at https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html. Don't just copy past the code from the samples, rather type these line by on. Try to convert the example code to ES6 as well! No need to use a transpiler or anything fancy, you may use inline javascript in your pages.

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

