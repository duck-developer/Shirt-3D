import * as THREE from "three";
import { DIMENSIONS } from "../constants/Dimesions";

export function createBushe(
  house,
  { position = { x: 0, y: 0, z: 0 }, scale = { x: 1, y: 1, z: 1 } } = {}
) {
  const bush = new THREE.Mesh(
    new THREE.SphereGeometry(
      DIMENSIONS.bush.radius,
      DIMENSIONS.bush.widthSegments,
      DIMENSIONS.bush.heightSegments
    ),
    new THREE.MeshStandardMaterial({ color: "#89c854" })
  );

  bush.position.set(position.x, position.y, position.z);
  bush.scale.set(scale.x, scale.y, scale.z);
  bush.castShadow = true;
  house.add(bush);
}
