import { COLORS, randomBetween, randomBetweenInt } from '../static/helpers.js';

class Cloud {
  constructor() {
    // Create an empty container that will hold the different parts of the cloud
    this.mesh = new THREE.Object3D();

    // create a cube geometry;
    // this shape will be duplicated to create the cloud
    const geom = new THREE.BoxGeometry(20, 20, 20);

    // create a material; a simple white material will do the trick
    const mat = new THREE.MeshPhongMaterial({
      color: COLORS.white,
    });

    // duplicate the geometry a random number of times
    const nBlocs = randomBetweenInt(3, 5);
    for (let i = 0; i < nBlocs; i++) {
      // create the mesh by cloning the geometry
      const m = new THREE.Mesh(geom, mat);

      // set the position and the rotation of each cube randomly
      m.position.x = i * 15;
      m.position.y = randomBetween(0, 10);
      m.position.z = randomBetween(0, 10);
      m.rotation.z = randomBetween(0, Math.PI * 2);
      m.rotation.y = randomBetween(0, Math.PI * 2);

      // set the size of the cube randomly
      const s = randomBetween(.1, 1);
      m.scale.set(s, s, s);

      // allow each cube to cast and to receive shadows
      m.castShadow = true;
      m.receiveShadow = true;

      // add the cube to the container we first created
      this.mesh.add(m);
    }
  }
}

export default class Sky {
  constructor() {
    // Create an empty container
    this.mesh = new THREE.Object3D();

    // choose a number of clouds to be scattered in the sky
    this.nClouds = 25;

    // To distribute the clouds consistently,
    // we need to place them according to a uniform angle
    const stepAngle = Math.PI * 2 / this.nClouds;

    // create the clouds
    for (var i = 0; i < this.nClouds; i++) {
      const c = new Cloud();

      // set the rotation and the position of each cloud;
      // this is the final angle of the cloud
      const a = stepAngle * i; 
      // this is the distance between the center of 
      // the axis and the cloud itself
      const h = randomBetween(750, 950); 

      // Trigonometry!!! I hope you remember what you've learned in Math :)
      // in case you don't: 
      // we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
      c.mesh.position.y = Math.sin(a) * h;
      c.mesh.position.x = Math.cos(a) * h;

      // rotate the cloud according to its position
      c.mesh.rotation.z = a + Math.PI / 2;

      // for a better result, we position the clouds 
      // at random depths inside of the scene
      c.mesh.position.z = randomBetween(-400, -800);

      // we also set a random scale for each cloud
      const s = randomBetween(1, 3);
      c.mesh.scale.set(s, s, s);

      // do not forget to add the mesh of each cloud in the scene
      this.mesh.add(c.mesh);
    }
  }
}
