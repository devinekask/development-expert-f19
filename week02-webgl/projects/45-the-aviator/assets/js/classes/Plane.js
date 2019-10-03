import { COLORS } from '../static/helpers.js';

export default class Plane {
  constructor() {
    this.mesh = new THREE.Object3D();

    // Create the cabin
    // BoxGeometry(width, height, depth, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
    const geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
    const matCockpit = new THREE.MeshPhongMaterial({ color: COLORS.red, flatShading: true });
    const cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.position.set(0, 0, 0);
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);
    /**
     *  TRIANGLE
     * */
    // const triangle = new THREE.Triangle(
    //   new THREE.Vector3(-30, -25, 0), 
    //   new THREE.Vector3(30, -25, 0), 
    //   new THREE.Vector3(30, 25, 0)
    // );
    // const normal = triangle.normal();
    // const geom = new THREE.Geometry();
    // geom.vertices.push(triangle.a);
    // geom.vertices.push(triangle.b);
    // geom.vertices.push(triangle.c);
    // geom.faces.push(new THREE.Face3(0, 1, 2, normal));
    // const triangleMesh = new THREE.Mesh(geom, new THREE.MeshNormalMaterial());
    // triangleMesh.position.set(0, 0, 25);
    // this.mesh.add(triangleMesh);
    /**
     * Triangle
     */
    // var geometry = new THREE.Geometry();
    // geometry.vertices = [
    //   new THREE.Vector3(-30, -25, 25), 
    //   new THREE.Vector3(30, -25, 25), 
    //   new THREE.Vector3(30, 25, 25)
    // ];
    // geometry.faces = [new THREE.Face3(0, 1, 2)];
    // const material = new THREE.MeshBasicMaterial({ 
    //   color: COLORS.red, 
    //   side: THREE.DoubleSide,
    //   transparent: true,
    //   opacity: .6,
    //   flatShading: true,
    // });
    // const triangleMesh = new THREE.Mesh(geometry, material);
    // triangleMesh.castShadow = true;
    // triangleMesh.receiveShadow = true;
    // triangleMesh.position.set(0, 0, 0);
    // this.mesh.add(triangleMesh);

    // Create the engine
    const geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
    const matEngine = new THREE.MeshPhongMaterial({ color: COLORS.white, flatShading: true });
    const engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);

    // Create the tail
    const geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    const matTailPlane = new THREE.MeshPhongMaterial({ color: COLORS.red, flatShading: true });
    const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-37.5, 25, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);

    // Create the wing
    const geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
    const matSideWing = new THREE.MeshPhongMaterial({ color: COLORS.red, flatShading: true });
    const sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.position.set(0, -5, 0);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);

    // propeller
    const geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    const matPropeller = new THREE.MeshPhongMaterial({ color: COLORS.brown, flatShading: true });
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    // blades
    const geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
    const matBlade = new THREE.MeshPhongMaterial({ color: COLORS.brownDark, flatShading: true });
    const blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(50, 0, 0);
    this.mesh.add(this.propeller);

    // Devine logo SVG
    const loader = new THREE.SVGLoader();
    loader.load(
      'assets/img/devine.svg',
      paths => {
        var group = new THREE.Group();
        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          const material = new THREE.MeshBasicMaterial({
            color: path.color,
            side: THREE.DoubleSide,
            depthWrite: false
          });
          const shapes = path.toShapes(true);
          for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j];
            const geometry = new THREE.ShapeBufferGeometry(shape);
            const mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);
          }
        }
        group.scale.set(.9, .9, .9);
        group.rotation.x = Math.PI;
        group.position.set(-3, 21, 25);
        this.mesh.add(group);
      },
      xhr => console.log((xhr.loaded / xhr.total * 100) + '% loaded'), // called when loading is in progresses
      error => console.log(`An error happened: ${error}`) // called when loading has errors
    );
  }
};