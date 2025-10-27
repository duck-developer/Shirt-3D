import * as THREE from "three";
import { DIMENSIONS } from "../constants/Dimesions";

export function createRoof(house) {
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(
      DIMENSIONS.roof.radius,
      DIMENSIONS.roof.height,
      DIMENSIONS.roof.segments
    ),
    new THREE.MeshStandardMaterial({ color: "#b35f45" })
  );

  roof.position.y = DIMENSIONS.roof.radius / 2 + DIMENSIONS.walls.height / 2;
  roof.rotation.y = Math.PI / 4;
  house.add(roof);
}
