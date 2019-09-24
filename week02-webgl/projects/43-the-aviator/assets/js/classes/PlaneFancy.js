import { COLORS } from '../static/helpers.js';
import Pilot from '../classes/PilotFancy.js';

export default class Plane {
  constructor() {
    this.mesh = new THREE.Object3D();

    /** 
     * Cabin with modified vertices
     **/
    const geomCockpit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
    const matCockpit = new THREE.MeshPhongMaterial({ color: COLORS.red, flatShading: true });
    // we can access a specific vertex of a shape through 
    // the vertices array, and then move its x, y and z property:
    geomCockpit.vertices[4].y -= 10;
    geomCockpit.vertices[4].z += 20;
    geomCockpit.vertices[5].y -= 10;
    geomCockpit.vertices[5].z -= 20;
    geomCockpit.vertices[6].y += 30;
    geomCockpit.vertices[6].z += 20;
    geomCockpit.vertices[7].y += 30;
    geomCockpit.vertices[7].z -= 20;
    const cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);


    // Create the engine

    // Engine
    var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
    var matEngine = new THREE.MeshPhongMaterial({ color: COLORS.white, flatShading: true });
    var engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 50;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);

    // Tail Plane
    var geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    var matTailPlane = new THREE.MeshPhongMaterial({ color: COLORS.red, flatShading: true });
    var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-40, 20, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);

    // Wings
    var geomSideWing = new THREE.BoxGeometry(30, 5, 120, 1, 1, 1);
    var matSideWing = new THREE.MeshPhongMaterial({ color: COLORS.red, flatShading: true });
    var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.position.set(0, 15, 0);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);

    var geomWindshield = new THREE.BoxGeometry(3, 15, 20, 1, 1, 1);
    var matWindshield = new THREE.MeshPhongMaterial({ color: COLORS.white, transparent: true, opacity: .3, flatShading: true });;
    var windshield = new THREE.Mesh(geomWindshield, matWindshield);
    windshield.position.set(5, 27, 0);

    windshield.castShadow = true;
    windshield.receiveShadow = true;

    this.mesh.add(windshield);

    var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    geomPropeller.vertices[4].y -= 5;
    geomPropeller.vertices[4].z += 5;
    geomPropeller.vertices[5].y -= 5;
    geomPropeller.vertices[5].z -= 5;
    geomPropeller.vertices[6].y += 5;
    geomPropeller.vertices[6].z += 5;
    geomPropeller.vertices[7].y += 5;
    geomPropeller.vertices[7].z -= 5;
    var matPropeller = new THREE.MeshPhongMaterial({ color: COLORS.brown, flatShading: true });
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);

    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    var geomBlade = new THREE.BoxGeometry(1, 80, 10, 1, 1, 1);
    var matBlade = new THREE.MeshPhongMaterial({ color: COLORS.brownDark, flatShading: true });
    var blade1 = new THREE.Mesh(geomBlade, matBlade);
    blade1.position.set(8, 0, 0);

    blade1.castShadow = true;
    blade1.receiveShadow = true;

    var blade2 = blade1.clone();
    blade2.rotation.x = Math.PI / 2;

    blade2.castShadow = true;
    blade2.receiveShadow = true;

    this.propeller.add(blade1);
    this.propeller.add(blade2);
    this.propeller.position.set(60, 0, 0);
    this.mesh.add(this.propeller);

    var wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
    var wheelProtecMat = new THREE.MeshPhongMaterial({ color: COLORS.red, flatShading: true });
    var wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat);
    wheelProtecR.position.set(25, -20, 25);
    this.mesh.add(wheelProtecR);

    var wheelTireGeom = new THREE.BoxGeometry(24, 24, 4);
    var wheelTireMat = new THREE.MeshPhongMaterial({ color: COLORS.brownDark, flatShading: true });
    var wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat);
    wheelTireR.position.set(25, -28, 25);

    var wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6);
    var wheelAxisMat = new THREE.MeshPhongMaterial({ color: COLORS.brown, flatShading: true });
    var wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat);
    wheelTireR.add(wheelAxis);

    this.mesh.add(wheelTireR);

    var wheelProtecL = wheelProtecR.clone();
    wheelProtecL.position.z = -wheelProtecR.position.z;
    this.mesh.add(wheelProtecL);

    var wheelTireL = wheelTireR.clone();
    wheelTireL.position.z = -wheelTireR.position.z;
    this.mesh.add(wheelTireL);

    var wheelTireB = wheelTireR.clone();
    wheelTireB.scale.set(.5, .5, .5);
    wheelTireB.position.set(-35, -5, 0);
    this.mesh.add(wheelTireB);

    var suspensionGeom = new THREE.BoxGeometry(4, 20, 4);
    suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0))
    var suspensionMat = new THREE.MeshPhongMaterial({ color: COLORS.red, flatShading: true });
    var suspension = new THREE.Mesh(suspensionGeom, suspensionMat);
    suspension.position.set(-35, -5, 0);
    suspension.rotation.z = -.3;
    this.mesh.add(suspension);

    // Pilot
    this.pilot = new Pilot();
    this.pilot.mesh.position.set(-10, 27, 0);
    this.mesh.add(this.pilot.mesh);

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

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
        group.scale.set(1.1, 1.1, 1.1);
        group.rotation.x = Math.PI;
        group.position.set(34, 16, 26);
        this.mesh.add(group);
      },
      xhr => console.log((xhr.loaded / xhr.total * 100) + '% loaded'), // called when loading is in progresses
      error => console.log(`An error happened: ${error}`) // called when loading has errors
    );
  }
};