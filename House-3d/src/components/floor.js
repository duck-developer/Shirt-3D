import * as THREE from "three";
import { DIMENSIONS } from "../constants/Dimesions";

//FLOOR

export function createFloor(scene) {
  const textureLoader = new THREE.TextureLoader();

  const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
  const grassAmbientOcclusionTexture = textureLoader.load(
    "/textures/grass/ambientOcclusion.jpg"
  );
  const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
  const grassRoughnessTexture = textureLoader.load(
    "/textures/grass/roughness.jpg"
  );

  grassColorTexture.repeat.set(8, 8);
  grassAmbientOcclusionTexture.repeat.set(8, 8);
  grassNormalTexture.repeat.set(8, 8);
  grassRoughnessTexture.repeat.set(8, 8);

  grassColorTexture.wrapS = THREE.RepeatWrapping;
  grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
  grassNormalTexture.wrapS = THREE.RepeatWrapping;
  grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

  grassColorTexture.wrapT = THREE.RepeatWrapping;
  grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
  grassNormalTexture.wrapT = THREE.RepeatWrapping;
  grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(DIMENSIONS.floor.width, DIMENSIONS.floor.depth),
    new THREE.MeshStandardMaterial({
      map: grassColorTexture,
      aoMap: grassAmbientOcclusionTexture,
      normalMap: grassNormalTexture,
      roughness: grassRoughnessTexture,
    })
  );

  plane.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(plane.geometry.attributes.uv.array, 2)
  );

  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = 0;
  plane.receiveShadow = true;
  scene.add(plane);
}
