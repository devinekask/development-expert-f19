import { COLORS, randomBetween, normalize } from '../static/helpers.js';

export default class Sea {
  constructor() {
    const geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    // important: by merging vertices we ensure the continuity of the waves
    geom.mergeVertices();

    // get the vertices
    const l = geom.vertices.length;

    // create an array to store new data associated to each vertex
    this.waves = [];

    for (let i = 0; i < l; i++) {
      // get each vertex
      const v = geom.vertices[i];

      // store some data associated to it
      this.waves.push({
        y: v.y,
        x: v.x,
        z: v.z,
        // a random angle
        ang: randomBetween(0, Math.PI * 2),
        // a random distance
        amp: randomBetween(5, 15),
        // a random speed between 0.016 and 0.048 radians / frame
        speed: randomBetween(0.016, 0.032),
      });
    };
    const mat = new THREE.MeshPhongMaterial({
      color: COLORS.blue,
      transparent: true,
      opacity: .8,
      flatShading: true,
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
  }

  moveWaves() {
    // get the vertices
    const verts = this.mesh.geometry.vertices;
    const l = verts.length;

    for (let i = 0; i < l; i++) {
      const v = verts[i];

      // get the data associated to it
      const vprops = this.waves[i];

      // update the position of the vertex
      v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
      v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;

      // increment the angle for the next frame
      vprops.ang += vprops.speed;
    }

    // Tell the renderer that the geometry of the sea has changed.
    // In fact, in order to maintain the best level of performance, 
    // three.js caches the geometries and ignores any changes
    // unless we add this line
    this.mesh.geometry.verticesNeedUpdate = true;
  }
}
