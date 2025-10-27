import * as THREE from "three";
import { DIMENSIONS } from "../constants/Dimesions";

export function createWalls(house) {
  const textureLoader = new THREE.TextureLoader();

  const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
  const bricksAmbientOcclusionTexture = textureLoader.load(
    "/textures/bricks/ambientOcclusion.jpg"
  );
  const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
  const bricksRoughnessTexture = textureLoader.load(
    "/textures/bricks/roughness.jpg"
  );

  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(
      DIMENSIONS.walls.width,
      DIMENSIONS.walls.height,
      DIMENSIONS.walls.depth
    ),
    new THREE.MeshStandardMaterial({
      map: bricksColorTexture,
      aoMap: bricksAmbientOcclusionTexture,
      normalMap: bricksNormalTexture,
      roughnessMap: bricksRoughnessTexture,
    })
  );
  walls.castShadow = true;
  walls.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
  );

  walls.position.y = DIMENSIONS.walls.height / 2;

  house.add(walls);
}
