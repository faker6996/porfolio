import { CapsuleGeometry, DoubleSide, Group, Mesh, ShaderMaterial, SphereGeometry } from "three";
import { resources } from "../../../utils/resources";
import hairVertexShader from "../../shaders/avatar-hair/vertex.glsl";
import hairFragmentShader from "../../shaders/avatar-hair/fragment.glsl";

import type { Object3D, Texture } from "three";

type AvatarUniforms = {
  uProgress: { value: number };
  uAmbientStrength: { value: number };
};

type PieceOptions = {
  geometry: SphereGeometry | CapsuleGeometry;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  material: ShaderMaterial;
};

let hairGroup: Group | null = null;
const materials: ShaderMaterial[] = [];

const createMaterial = (texture: Texture, uniforms: AvatarUniforms) => {
  const material = new ShaderMaterial({
    vertexShader: hairVertexShader,
    fragmentShader: hairFragmentShader,
    transparent: true,
    depthWrite: true,
    side: DoubleSide,
    uniforms: {
      uMatcap: { value: texture },
      ...uniforms,
    },
  });

  materials.push(material);
  return material;
};

const createPiece = ({ geometry, position, rotation = [0, 0, 0], scale = [1, 1, 1], material }: PieceOptions) => {
  const piece = new Mesh(geometry, material);
  piece.position.set(...position);
  piece.rotation.set(...rotation);
  piece.scale.set(...scale);
  piece.renderOrder = 26;
  piece.frustumCulled = false;
  piece.castShadow = false;
  piece.receiveShadow = false;
  return piece;
};

const init = (avatarRoot: Object3D, uniforms: AvatarUniforms) => {
  if (hairGroup) return;

  const headBone = avatarRoot.getObjectByName("headBone");
  if (!headBone) return;

  const darkMaterial = createMaterial(resources.items["matcap-black"], uniforms);
  const partMaterial = createMaterial(resources.items["matcap-skin"], uniforms);

  hairGroup = new Group();
  hairGroup.name = "bach-sidepart-7-3";

  const pieces = [
    // The 70% side: a longer, raised sweep travelling across the forehead.
    createPiece({
      geometry: new SphereGeometry(0.46, 28, 18),
      position: [-0.16, 0.78, 0.2],
      rotation: [-0.08, -0.18, 0.14],
      scale: [1.12, 0.34, 0.72],
      material: darkMaterial,
    }),
    createPiece({
      geometry: new SphereGeometry(0.31, 24, 16),
      position: [-0.4, 0.67, 0.43],
      rotation: [-0.12, -0.22, 0.24],
      scale: [0.88, 0.34, 0.52],
      material: darkMaterial,
    }),
    // A narrow scalp line makes the 7/3 part legible from the hero camera.
    createPiece({
      geometry: new CapsuleGeometry(0.012, 0.2, 6, 12),
      position: [0.17, 0.86, 0.58],
      rotation: [0, 0, 0.22],
      scale: [1, 1, 1],
      material: partMaterial,
    }),
  ];

  hairGroup.add(...pieces);
  headBone.add(hairGroup);
};

const destroy = () => {
  if (!hairGroup) return;

  hairGroup.parent?.remove(hairGroup);
  hairGroup.traverse((child) => {
    if (child instanceof Mesh) {
      child.geometry.dispose();
    }
  });
  materials.forEach((material) => material.dispose());
  materials.length = 0;
  hairGroup = null;
};

export const avatarHair = { init, destroy };
