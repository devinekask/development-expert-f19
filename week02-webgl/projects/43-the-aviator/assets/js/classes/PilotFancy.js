import { COLORS, normalize } from '../static/helpers.js';

export default class Pilot {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = `pilot`;

    // angleHairs is a property used to animate the hair later 
    this.angleHairs = 0;

    // Body of the pilot
    const bodyGeom = new THREE.BoxGeometry(15, 15, 15);
    const bodyMat = new THREE.MeshPhongMaterial({ color: COLORS.brown, flatShading: true });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.position.set(2, -12, 0);
    this.mesh.add(body);

    // Face of the pilot
    const faceGeom = new THREE.BoxGeometry(10, 10, 10);
    const faceMat = new THREE.MeshLambertMaterial({ color: COLORS.pink });
    const face = new THREE.Mesh(faceGeom, faceMat);
    this.mesh.add(face);

    // Hair element
    const hairGeom = new THREE.BoxGeometry(4, 4, 4);
    const hairMat = new THREE.MeshLambertMaterial({ color: COLORS.brown });
    const hair = new THREE.Mesh(hairGeom, hairMat);
    // Align the shape of the hair to its bottom boundary, that will make it easier to scale.
    hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 2, 0));

    // create a container for the hair
    const hairs = new THREE.Object3D();

    // create a container for the hairs at the top 
    // of the head (the ones that will be animated)
    this.hairsTop = new THREE.Object3D();

    // create the hairs at the top of the head 
    // and position them on a 3 x 4 grid
    for (let i = 0; i < 12; i++) {
      const h = hair.clone();
      const col = i % 3;
      const row = Math.floor(i / 3);
      const startPosZ = -4;
      const startPosX = -4;
      h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
      this.hairsTop.add(h);
    }
    hairs.add(this.hairsTop);

    // create the hairs at the side of the face
    const hairSideGeom = new THREE.BoxGeometry(12, 4, 2);
    hairSideGeom.applyMatrix(new THREE.Matrix4().makeTranslation(-6, 0, 0));
    const hairSideR = new THREE.Mesh(hairSideGeom, hairMat);
    const hairSideL = hairSideR.clone();
    hairSideR.position.set(8, -2, 6);
    hairSideL.position.set(8, -2, -6);
    hairs.add(hairSideR);
    hairs.add(hairSideL);

    // create the hairs at the back of the head
    const hairBackGeom = new THREE.BoxGeometry(2, 8, 10);
    const hairBack = new THREE.Mesh(hairBackGeom, hairMat);
    hairBack.position.set(-1, -4, 0)
    hairs.add(hairBack);
    hairs.position.set(-5, 5, 0);

    this.mesh.add(hairs);

    const glassGeom = new THREE.BoxGeometry(5, 5, 5);
    const glassMat = new THREE.MeshLambertMaterial({ color: COLORS.brown });
    const glassR = new THREE.Mesh(glassGeom, glassMat);
    glassR.position.set(6, 0, 3);
    const glassL = glassR.clone();
    glassL.position.z = -glassR.position.z

    const glassAGeom = new THREE.BoxGeometry(11, 1, 11);
    const glassA = new THREE.Mesh(glassAGeom, glassMat);
    this.mesh.add(glassR);
    this.mesh.add(glassL);
    this.mesh.add(glassA);

    const earGeom = new THREE.BoxGeometry(2, 3, 2);
    const earL = new THREE.Mesh(earGeom, faceMat);
    earL.position.set(0, 0, -6);
    const earR = earL.clone();
    earR.position.set(0, 0, 6);
    this.mesh.add(earL);
    this.mesh.add(earR);
  }

  // move the hair
  updateHairs() {
    // get the hair
    const hairs = this.hairsTop.children;

    // update them according to the angle angleHairs
    const l = hairs.length;
    for (let i = 0; i < l; i++) {
      const h = hairs[i];
      // each hair element will scale on cyclical basis between 75% and 100% of its original size
      h.scale.y = normalize(Math.cos(this.angleHairs + i / 3), -1, 1, .25, .75); //.75 + Math.cos(this.angleHairs + i / 3) * .25;
    }
    // increment the angle for the next frame
    this.angleHairs += 0.16;
  }

}