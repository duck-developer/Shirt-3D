import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { createLights } from "./components/lights";
import { createFloor } from "./components/floor";
import { setupResize } from "./utils/sizes";
import { createWalls } from "./components/walls";
import { createRoof } from "./components/roof";
import { createDoor } from "./components/door";
import { createBushe } from "./components/bushes";
import { createGraves } from "./components/graves";
/**
 * Base
 */

// SOM
const bgMusic = new Audio("./sounds/Hedwig's Theme [wtHra9tFISY].m4a");

bgMusic.loop = true;
bgMusic.volume = 0.3;

document.addEventListener(
  "click",
  () => {
    if (bgMusic.paused) {
      bgMusic.play().catch((err) => console.warn("Autoplay bloqueado:", err));
    }
  },
  { once: true }
);

/*==== Canvas ====*/
const canvas = document.querySelector("canvas.webgl");

/*==== Scene ====*/
const scene = new THREE.Scene();

/*==== FOG ====*/

const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;
/*==== Lights ====*/
createLights(scene);

/*==== Objects ====*/
//HOUSE
const house = new THREE.Group();

scene.add(house);

//WALLS
createWalls(house);

//ROOF
createRoof(house);

//FLOOR
createFloor(scene);

//DOOR
createDoor(house);

//BUSHES
createBushe(house, {
  scale: { x: 0.5, y: 0.5, z: 0.5 },
  position: { x: 0.8, y: 0.2, z: 2.5 },
});

createBushe(house, {
  scale: { x: 0.25, y: 0.25, z: 0.25 },
  position: { x: 1.4, y: 0.1, z: 2.1 },
});
createBushe(house, {
  scale: { x: 0.4, y: 0.4, z: 0.4 },
  position: { x: -0.8, y: 0.1, z: 2.2 },
});

createBushe(house, {
  scale: { x: 0.15, y: 0.15, z: 0.15 },
  position: { x: -1, y: 0.05, z: 2.6 },
});

//GRAVES
const graves = new THREE.Group();
scene.add(graves);

createGraves(graves);

//GHOSTS
const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
const ghost3 = new THREE.PointLight("#ffff00", 2, 3);

scene.add(ghost1);
scene.add(ghost2);
scene.add(ghost3);

/* Sizes */

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/*==== Camera ====*/
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 8;
scene.add(camera);

/*==== Controls ====*/

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/*==== Renderer ====*/
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");

/*==== SHADOW ====*/
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

/*==== sizes ====*/
setupResize(sizes, camera, renderer);

/*==== Animate ====*/

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //GHOST ANIMATE
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghostwAngle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghostwAngle) * 5;
  ghost2.position.z = Math.sin(ghostwAngle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = -elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 5) + Math.sign(elapsedTime * 2);

  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
