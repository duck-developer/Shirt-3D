import * as THREE from "three";

import { GUI } from "lil-gui";

export function createLights(scene) {
  const gui = new GUI();
  const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
  gui.add(ambientLight, "intensity").min(0).max(3).step(0.001);
  scene.add(ambientLight);

  const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
  moonLight.position.set(4, 5, -2);

  gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
  gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
  gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
  gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);

  moonLight.castShadow = true;
  scene.add(moonLight);

  //   const material = new THREE.MeshStandardMaterial();
  //   material.roughness = 0.4;
  //   gui.add(material, "metalness").min(0).max(1).step(0.001);
  //   gui.add(material, "roughness").min(0).max(1).step(0.001);
}
