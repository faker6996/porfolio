import {
  BufferGeometry,
  CapsuleGeometry,
  CatmullRomCurve3,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  Mesh,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
} from "three";
import type { Object3D, Texture } from "three";
import { resources } from "../../../utils/resources";
import hairVertexShader from "../../shaders/avatar-hair/vertex.glsl";
import hairFragmentShader from "../../shaders/avatar-hair/fragment.glsl";

type AvatarUniforms = {
  uProgress: { value: number };
  uAmbientStrength: { value: number };
};

type PieceOptions = {
  geometry: BufferGeometry;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  material: ShaderMaterial;
};

let hairGroup: Group | null = null;
const materials: ShaderMaterial[] = [];
const geometries: BufferGeometry[] = [];

/**
 * Creates a dedicated shader material for hair with matcap & progress animations.
 */
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

/**
 * Creates a smooth 3D tapered hair strand geometry along a 3D Catmull-Rom spline.
 * Features natural tapering from root -> peak volume -> fine sleek tip.
 */
const createTaperedStrandGeometry = (
  points: [number, number, number][],
  rRoot: number,
  rPeak: number,
  rTip: number,
  tubularSegments = 24,
  radialSegments = 12
): BufferGeometry => {
  const curvePoints = points.map((p) => new Vector3(p[0], p[1], p[2]));
  const curve = new CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const frames = curve.computeFrenetFrames(tubularSegments, false);

  const getRadius = (t: number): number => {
    // 0 -> 0.35: Root to peak; 0.35 -> 1.0: Peak to tip
    if (t < 0.35) {
      const k = t / 0.35;
      const smoothK = k * k * (3 - 2 * k);
      return rRoot + (rPeak - rRoot) * smoothK;
    } else {
      const k = (t - 0.35) / 0.65;
      const smoothK = k * k * (3 - 2 * k);
      return rPeak + (rTip - rPeak) * smoothK;
    }
  };

  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments;
    const pt = curve.getPointAt(t);
    const r = getRadius(t);
    const N = frames.normals[i] ?? new Vector3(0, 1, 0);
    const B = frames.binormals[i] ?? new Vector3(0, 0, 1);

    for (let j = 0; j <= radialSegments; j++) {
      const v = j / radialSegments;
      const theta = v * Math.PI * 2;
      const cos = Math.cos(theta);
      const sin = Math.sin(theta);

      const normalX = cos * N.x + sin * B.x;
      const normalY = cos * N.y + sin * B.y;
      const normalZ = cos * N.z + sin * B.z;

      positions.push(pt.x + r * normalX, pt.y + r * normalY, pt.z + r * normalZ);
      normals.push(normalX, normalY, normalZ);
      uvs.push(t, v);
    }
  }

  for (let i = 0; i < tubularSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * (radialSegments + 1) + j;
      const b = (i + 1) * (radialSegments + 1) + j;
      const c = (i + 1) * (radialSegments + 1) + (j + 1);
      const d = i * (radialSegments + 1) + (j + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  // Start cap (root)
  const startIdx = positions.length / 3;
  const startPt = curve.getPointAt(0);
  const startTan = curve.getTangentAt(0).clone().negate();
  positions.push(startPt.x, startPt.y, startPt.z);
  normals.push(startTan.x, startTan.y, startTan.z);
  uvs.push(0, 0.5);
  for (let j = 0; j < radialSegments; j++) {
    indices.push(startIdx, j + 1, j);
  }

  // End cap (tip)
  const endIdx = positions.length / 3;
  const endPt = curve.getPointAt(1);
  const endTan = curve.getTangentAt(1);
  positions.push(endPt.x, endPt.y, endPt.z);
  normals.push(endTan.x, endTan.y, endTan.z);
  uvs.push(1, 0.5);
  const lastRow = tubularSegments * (radialSegments + 1);
  for (let j = 0; j < radialSegments; j++) {
    indices.push(endIdx, lastRow + j, lastRow + j + 1);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  geometries.push(geometry);
  return geometry;
};

const createPiece = ({
  geometry,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  material,
}: PieceOptions) => {
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

const trackGeometry = (geom: BufferGeometry): BufferGeometry => {
  geometries.push(geom);
  return geom;
};

const init = (avatarRoot: Object3D, uniforms: AvatarUniforms) => {
  if (hairGroup) return;

  const headBone = avatarRoot.getObjectByName("headBone");
  if (!headBone) return;

  const darkMaterial = createMaterial(resources.items["matcap-black"], uniforms);
  const scalpPartMaterial = createMaterial(resources.items["matcap-skin"], uniforms);

  hairGroup = new Group();
  hairGroup.name = "bach-korean-sidepart-7-3";

  const pieces: Mesh[] = [
    // -------------------------------------------------------------
    // 1. BASE CROWN & CRANIUM VOLUME (Phom đầu & gáy ôm sát tự nhiên)
    // -------------------------------------------------------------
    createPiece({
      geometry: trackGeometry(new SphereGeometry(0.48, 28, 20)),
      position: [-0.01, 0.74, -0.04],
      rotation: [-0.1, 0, 0],
      scale: [1.02, 0.38, 0.88],
      material: darkMaterial,
    }),
    createPiece({
      geometry: trackGeometry(new SphereGeometry(0.45, 26, 18)),
      position: [-0.01, 0.62, -0.22],
      rotation: [0.22, 0, 0],
      scale: [0.96, 0.44, 0.72],
      material: darkMaterial,
    }),
    // Left & Right temporal back fullness
    createPiece({
      geometry: trackGeometry(new SphereGeometry(0.32, 22, 16)),
      position: [-0.34, 0.65, 0.05],
      rotation: [-0.05, -0.2, 0.15],
      scale: [0.65, 0.42, 0.75],
      material: darkMaterial,
    }),
    createPiece({
      geometry: trackGeometry(new SphereGeometry(0.32, 22, 16)),
      position: [0.34, 0.65, 0.05],
      rotation: [-0.05, 0.2, -0.15],
      scale: [0.65, 0.42, 0.75],
      material: darkMaterial,
    }),

    // -------------------------------------------------------------
    // 2. MAJOR 70% BANGS (Mái chính rẽ ngôi 7/3 với lọn Comma uốn chữ C)
    // -------------------------------------------------------------
    // Iconic Comma Lock (Lọn mái chữ C uốn cong rủ nhẹ ngang trán)
    createPiece({
      geometry: createTaperedStrandGeometry(
        [
          [0.11, 0.83, 0.45],
          [-0.07, 0.86, 0.53],
          [-0.25, 0.73, 0.55],
          [-0.29, 0.58, 0.56],
          [-0.21, 0.51, 0.53],
        ],
        0.046,
        0.078,
        0.014
      ),
      material: darkMaterial,
    }),
    // Comma Accent Fringe (Lọn phụ đệm độ cong chữ C sâu hơn)
    createPiece({
      geometry: createTaperedStrandGeometry(
        [
          [0.08, 0.81, 0.47],
          [-0.09, 0.82, 0.54],
          [-0.22, 0.68, 0.57],
          [-0.21, 0.54, 0.55],
          [-0.14, 0.49, 0.51],
        ],
        0.032,
        0.056,
        0.012
      ),
      material: darkMaterial,
    }),
    // Upper Volume Arch (Lọn mái tầng trên tạo độ phồng chân tóc bồng bềnh)
    createPiece({
      geometry: createTaperedStrandGeometry(
        [
          [0.09, 0.88, 0.38],
          [-0.18, 0.87, 0.47],
          [-0.38, 0.75, 0.45],
          [-0.46, 0.61, 0.37],
        ],
        0.048,
        0.082,
        0.02
      ),
      material: darkMaterial,
    }),
    // Major Side Temple Flow (Lọn vuốt sang thái dương trái)
    createPiece({
      geometry: createTaperedStrandGeometry(
        [
          [-0.18, 0.85, 0.3],
          [-0.38, 0.77, 0.36],
          [-0.49, 0.64, 0.28],
          [-0.51, 0.48, 0.2],
        ],
        0.045,
        0.072,
        0.018
      ),
      material: darkMaterial,
    }),

    // -------------------------------------------------------------
    // 3. MINOR 30% BANGS (Mái phụ bên phải ôm gọn góc trán & thái dương)
    // -------------------------------------------------------------
    // Right Curtain Sweep (Lọn mái phụ vuốt cong ôm trán phải)
    createPiece({
      geometry: createTaperedStrandGeometry(
        [
          [0.17, 0.83, 0.44],
          [0.29, 0.81, 0.5],
          [0.42, 0.69, 0.44],
          [0.48, 0.55, 0.32],
        ],
        0.042,
        0.07,
        0.016
      ),
      material: darkMaterial,
    }),
    // Right Accent Forehead Strand
    createPiece({
      geometry: createTaperedStrandGeometry(
        [
          [0.18, 0.79, 0.46],
          [0.31, 0.73, 0.5],
          [0.39, 0.61, 0.45],
        ],
        0.03,
        0.052,
        0.012
      ),
      material: darkMaterial,
    }),
    // Right Temple Flow (Lọn vuốt ôm thái dương phải)
    createPiece({
      geometry: createTaperedStrandGeometry(
        [
          [0.2, 0.84, 0.32],
          [0.41, 0.76, 0.34],
          [0.5, 0.62, 0.26],
          [0.51, 0.48, 0.18],
        ],
        0.042,
        0.068,
        0.018
      ),
      material: darkMaterial,
    }),

    // -------------------------------------------------------------
    // 4. SIDEBURNS (Tóc mai 2 bên thon gọn nam tính)
    // -------------------------------------------------------------
    // Left Sideburn
    createPiece({
      geometry: createTaperedStrandGeometry(
        [
          [-0.49, 0.52, 0.18],
          [-0.51, 0.38, 0.14],
          [-0.49, 0.24, 0.1],
        ],
        0.032,
        0.044,
        0.008
      ),
      material: darkMaterial,
    }),
    // Right Sideburn
    createPiece({
      geometry: createTaperedStrandGeometry(
        [
          [0.49, 0.52, 0.18],
          [0.51, 0.38, 0.14],
          [0.49, 0.24, 0.1],
        ],
        0.032,
        0.044,
        0.008
      ),
      material: darkMaterial,
    }),

    // -------------------------------------------------------------
    // 5. TOP CROWN TEXTURE RIDGES (Gợn layer đỉnh đầu sống động)
    // -------------------------------------------------------------
    createPiece({
      geometry: createTaperedStrandGeometry(
        [
          [0.08, 0.89, 0.22],
          [-0.06, 0.9, 0.05],
          [-0.14, 0.84, -0.16],
          [-0.12, 0.71, -0.32],
        ],
        0.04,
        0.065,
        0.018
      ),
      material: darkMaterial,
    }),
    createPiece({
      geometry: createTaperedStrandGeometry(
        [
          [0.16, 0.88, 0.2],
          [0.18, 0.89, 0.02],
          [0.15, 0.82, -0.18],
          [0.1, 0.7, -0.32],
        ],
        0.038,
        0.06,
        0.016
      ),
      material: darkMaterial,
    }),

    // -------------------------------------------------------------
    // 6. SCALP PARTING LINE (Đường rãnh chia ngôi 7/3 sắc sảo)
    // -------------------------------------------------------------
    createPiece({
      geometry: trackGeometry(new CapsuleGeometry(0.008, 0.22, 6, 10)),
      position: [0.14, 0.86, 0.44],
      rotation: [0.35, 0.08, 0.12],
      scale: [1, 1, 1],
      material: scalpPartMaterial,
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

  geometries.forEach((geom) => geom.dispose());
  geometries.length = 0;

  materials.forEach((material) => material.dispose());
  materials.length = 0;

  hairGroup = null;
};

export const avatarHair = { init, destroy };

