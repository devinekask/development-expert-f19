import Sea from './classes/SeaFancy.js';
import Sky from './classes/Sky.js';
import Plane from './classes/PlaneFancy.js';
import { normalize } from './static/helpers.js';

{

  let scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
    renderer, container;

  const handleWindowResize = () => {
    // update height and width of the renderer and the camera
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  }

  const createScene = () => {
    // Get the width and the height of the screen,
    // use them to set up the aspect ratio of the camera 
    // and the size of the renderer.
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    // Create the scene
    scene = new THREE.Scene();

    // Add a fog effect to the scene; same color as the
    // background color used in the style sheet
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    // Create the camera
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    // Set the position of the camera
    camera.position.x = 0;
    camera.position.z = 200;
    camera.position.y = 100;

    // Create the renderer
    renderer = new THREE.WebGLRenderer({
      // Allow transparency to show the gradient background
      // we defined in the CSS
      alpha: true,

      // Activate the anti-aliasing; this is less performant,
      // but, as our project is low-poly based, it should be fine :)
      antialias: true
    });

    // Define the size of the renderer; in this case,
    // it will fill the entire screen
    renderer.setSize(WIDTH, HEIGHT);

    // Enable shadow rendering
    renderer.shadowMap.enabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;

    // Add the DOM element of the renderer to the 
    // container we created in the HTML
    container = document.querySelector(`.world`);
    container.appendChild(renderer.domElement);

    // Listen to the screen: if the user resizes it
    // we have to update the camera and the renderer size
    window.addEventListener(`resize`, handleWindowResize, false);
  }


  let hemisphereLight, shadowLight, ambientLight;
  const createLights = () => {
    // A hemisphere light is a gradient colored light; 
    // the first parameter is the sky color, the second parameter 
    // is the ground color, 
    // the third parameter is the intensity of the light
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9)

    // A directional light shines from a specific direction. 
    // It acts like the sun, that means that all the rays produced are parallel. 
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);

    // Set the direction of the light  
    shadowLight.position.set(150, 350, 350);

    // Allow shadow casting 
    shadowLight.castShadow = true;

    // define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    // define the resolution of the shadow; the higher the better, 
    // but also the more expensive and less performant
    shadowLight.shadow.mapSize.width = 2048*2;
    shadowLight.shadow.mapSize.height = 2048*2;

    // an ambient light modifies the global color of a 
    // scene and makes the shadows softer
    ambientLight = new THREE.AmbientLight(0xdc8874, .4);

    // to activate the lights, just add them to the scene
    scene.add(hemisphereLight);
    scene.add(shadowLight);
    scene.add(ambientLight);
  }


  // Instantiate the sea and add it to the scene:
  let sea;
  const createSea = () => {
    sea = new Sea();
    // push it a little bit at the bottom of the scene
    sea.mesh.position.y = -600;
    // add the mesh of the sea to the scene
    scene.add(sea.mesh);
  }

  // Now we instantiate the sky and push its center a bit
  // towards the bottom of the screen
  let sky;
  const createSky = () => {
    sky = new Sky();
    sky.mesh.position.y = -600;
    scene.add(sky.mesh);
  }

  let airplane;
  const createPlane = () => {
    airplane = new Plane();
    airplane.mesh.scale.set(.45, .45, .45);
    // airplane.mesh.position.y = 100;
    scene.add(airplane.mesh);
  }

  const updatePlane = () => {
    // let's move the airplane between -100 and 100 on the horizontal axis, 
    // and between 25 and 175 on the vertical axis,
    // depending on the mouse position which ranges between -1 and 1 on both axes;
    // to achieve that we use a normalize function (see below)
    const targetY = normalize(mousePos.y, -.75, .75, 25, 175);
    const targetX = normalize(mousePos.x, -.75, .75, -100, 100);

    // Move the plane at each frame by adding a fraction of the remaining distance
    airplane.mesh.position.y += (targetY - airplane.mesh.position.y) * 0.1;

    // Rotate the plane proportionally to the remaining distance
    airplane.mesh.rotation.z = (targetY - airplane.mesh.position.y) * 0.0128;
    airplane.mesh.rotation.x = (airplane.mesh.position.y - targetY) * 0.0064;

    // Animate propeller
    airplane.propeller.rotation.x += 0.3;

    // // update the airplane's position
    // airplane.mesh.position.y = targetY;
    // airplane.mesh.position.x = targetX;
    // airplane.propeller.rotation.x += 0.3;

    // Animate pilot's hair
    airplane.pilot.updateHairs();
  }

  const updateCameraFov = () => {
    camera.fov = normalize(mousePos.x, -1, 1, 40, 80);
    camera.updateProjectionMatrix();
  }

  const loop = () => {
    // Rotate the sea and the sky
    // sea.mesh.rotation.z += .005;
    // Animate sea
    sea.mesh.rotation.z += .005;
    sea.moveWaves();

    sky.mesh.rotation.z += .01;

    // update the plane on each frame
    updatePlane();

    // Camera zoom
    updateCameraFov();

    // render the scene
    renderer.render(scene, camera);

    // call the loop function again
    requestAnimationFrame(loop);
  }

  const mousePos = { x: 0, y: 0 };
  const handleMouseMove = e => {
    // here we are converting the mouse position value received 
    // to a normalized value varying between -1 and 1;
    // this is the formula for the horizontal axis:
    mousePos.x = normalize(e.clientX, 0, WIDTH, -1, 1);
    // for the vertical axis, we need to inverse the formula 
    // because the 2D y-axis goes the opposite direction of the 3D y-axis
    mousePos.y = normalize(e.clientY, 0, HEIGHT, 1, -1); /*1 - (e.clientY / HEIGHT) * 2*/
  }
  
  const init = () => {
    // set up the scene, the camera and the renderer
    createScene();

    // add the lights
    createLights();

    // add the objects
    createPlane();
    createSea();
    createSky();

    // Axis Helper
    // const axesHelper = new THREE.AxesHelper(WIDTH/5);
    // scene.add(axesHelper);

    // Mouse follower
    document.addEventListener(`mousemove`, handleMouseMove, false);

    // start a loop that will update the objects' positions 
    // and render the scene on each frame
    // renderer.render(scene, camera);
    loop();
  }
  init();
}