import * as THREE from 'three';
import {
  CELL,
  COINS,
  COLS,
  CORE_OX,
  CORE_OZ,
  CoinDef,
  EYE_OF_SHINJUKU_POS,
  GATE_LINE_X,
  GATE_LINE_Z,
  HIDING_SPOTS,
  HIGH_CEILING,
  HidingSpotDef,
  LOW_CEILING,
  LORE_NOTES,
  LoreNoteDef,
  MIDORI_DESK_POS,
  MOVING_WALKWAY_SPAN,
  PEDESTAL_POS,
  PHOTOBOOTH_POS,
  PLATFORM_STAIRS,
  PLAZA_CEILING,
  PlatformStairDef,
  ROWS,
  SHINJUKU_GRID,
  SOUTH_BENCH_POS,
  SUBNADE_BENCH_POS,
  TERMINALS,
  TerminalDef,
  WAIT_BENCH_POS,
  WALL_456_SPAN,
  isHighCeiling,
  isSubnadeZone,
  isWestPlazaAtrium,
} from './shinjukuMap';
import {
  ShinjukuTextureSet,
  createDepartureBoard,
  createGateDisplay,
  createShinjukuTextures,
  createTerminalScreen,
  drawTerminalScreen,
  updateDepartureBoard,
} from './shinjukuTextures';
import { ShinjukuPropLibrary } from './shinjukuProps';

const DX = CORE_OX * CELL; // +20.0m West core offset
const DZ = CORE_OZ * CELL; // +8.0m North core offset

export interface TerminalInstance {
  def: TerminalDef;
  group: THREE.Group;
  screenTex: THREE.CanvasTexture;
  screenCtx: CanvasRenderingContext2D;
  padMat: THREE.MeshStandardMaterial;
  floorGlowMat: THREE.MeshBasicMaterial;
  charged: boolean;
  progress: number;
}

export interface HidingSpotInstance {
  def: HidingSpotDef;
  group: THREE.Group;
  doorPivot: THREE.Group;
  doorAngle: number;
  targetAngle: number;
  phoneGlowMat?: THREE.MeshBasicMaterial;
}

export interface NoteInstance {
  def: LoreNoteDef;
  mesh: THREE.Mesh;
  read: boolean;
}

export interface CoinInstance {
  def: CoinDef;
  mesh: THREE.Mesh;
  collected: boolean;
}

interface FlickerLight {
  tubeMat: THREE.MeshStandardMaterial;
  glowMat: THREE.SpriteMaterial | null;
  floorPoolMat: THREE.MeshBasicMaterial | null;
  baseIntensity: number;
  baseColor: number;
  tubeColor: number;
  x: number;
  z: number;
  y: number;
  phase: number;
  emergency?: boolean;
  killedTimer: number;
  blowoutDelay: number;
  currentIntensity: number;
  currentColor: number;
}

interface Puddle {
  x: number;
  z: number;
  rx: number;
  rz: number;
  rippleMat: THREE.MeshBasicMaterial;
  rippleMesh: THREE.Mesh;
  ripplePhase: number;
  dripMesh: THREE.Mesh;
  dripY: number;
  dripStartY: number;
  dripCooldown: number;
}

interface Spark {
  mesh: THREE.Mesh;
  vx: number;
  vy: number;
  vz: number;
  life: number;
}

interface CctvCamera {
  headPivot: THREE.Group;
  ledMat: THREE.MeshBasicMaterial;
  worldX: number;
  worldZ: number;
  phase: number;
}

export class ShinjukuStation {
  root = new THREE.Group();
  textures: ShinjukuTextureSet;
  private props: ShinjukuPropLibrary;
  terminals: TerminalInstance[] = [];
  closets: HidingSpotInstance[] = [];
  notes: NoteInstance[] = [];
  coinPickups: CoinInstance[] = [];
  private flickerLights: FlickerLight[] = [];
  private pointLightPool: THREE.PointLight[] = [];
  private wall456Mat!: THREE.MeshStandardMaterial;
  private wall456PoolMats: THREE.MeshBasicMaterial[] = [];
  private coveLineMat!: THREE.MeshStandardMaterial;
  private lightBoxTopMat!: THREE.MeshStandardMaterial;
  private lightBoxMidMat!: THREE.MeshStandardMaterial;
  private lightBoxBotMat!: THREE.MeshStandardMaterial;
  private signageMats: THREE.MeshStandardMaterial[] = [];
  private signagePoolMats: THREE.MeshBasicMaterial[] = [];
  private posterMats: THREE.MeshStandardMaterial[] = [];
  private cctvCameras: CctvCamera[] = [];
  private puddles: Puddle[] = [];
  private sparks: Spark[] = [];
  private sparkGeo = new THREE.BoxGeometry(0.01, 0.01, 0.11);
  private sparkMat = new THREE.MeshBasicMaterial({ color: 0xffdf99, transparent: true, opacity: 0.96 });
  private brokenLampTimer = 2.8;
  private gatePaddles: Array<{ leftPivot: THREE.Group; rightPivot: THREE.Group }> = [];
  private centerPaddleMat!: THREE.MeshStandardMaterial;
  private gateDisplayMat!: THREE.MeshStandardMaterial;
  private exitLight!: THREE.PointLight;
  private exitShutter!: THREE.Mesh;
  private concourseShadowSpot!: THREE.SpotLight;
  private nearestTerminalLight!: THREE.PointLight;
  private dynamicEventLight!: THREE.PointLight;
  private departureBoardTex!: THREE.CanvasTexture;
  private departureBoardCtx!: CanvasRenderingContext2D;
  private departureAccum = 0;
  private photoBoothFlashTimer = 0;
  private photoBoothShadowMesh!: THREE.Mesh;
  private phantomTrainTimer = 0;
  private wall456FlashTimer = 0;
  private payphoneRingActive = false;
  private smokeLedMats: THREE.MeshBasicMaterial[] = [];
  private eyePupilGroup: THREE.Group | null = null;
  private eyeIrisMat: THREE.MeshStandardMaterial | null = null;
  private movingBeltWestTex: THREE.CanvasTexture | null = null;
  private movingBeltEastTex: THREE.CanvasTexture | null = null;
  private dustPoints!: THREE.Points;
  private currentSignageStage = 0;
  private exitUnlocked = false;
  private shutterOpenProgress = 0;
  private floorPoolGeo = new THREE.PlaneGeometry(1, 1);

  constructor(scene: THREE.Scene) {
    this.textures = createShinjukuTextures();
    this.props = new ShinjukuPropLibrary(this.textures);
    this.nearestTerminalLight = new THREE.PointLight(0x4be0a8, 2.0, 9.5, 1.9);
    this.nearestTerminalLight.position.set(46 + DX, 1.6, 39 + DZ);
    this.dynamicEventLight = new THREE.PointLight(0xeef8ff, 0, 24, 1.5);
    this.dynamicEventLight.position.set(44 + DX, 1.5, 52 + DZ);
    this.root.add(this.nearestTerminalLight, this.dynamicEventLight);

    // 12-light dynamic nearest-fixture pool serving 48+ ceiling fixtures across the entire 180m x 116m megacomplex at 60 FPS!
    for (let i = 0; i < 12; i++) {
      const pl = new THREE.PointLight(0xc6dee4, 0, 24, 1.8);
      pl.position.set(0, -50, 0);
      this.root.add(pl);
      this.pointLightPool.push(pl);
    }

    // Calibrated anti-glare synchronized materials for Shinjuku Wall 456, Ceiling Cove Line LEDs, and J・ADビジョン 3-tier Light-Box Columns!
    this.wall456Mat = new THREE.MeshStandardMaterial({
      color: 0x485058,
      map: this.textures.wall456Stages[0],
      emissive: new THREE.Color(0xffffff),
      emissiveMap: this.textures.wall456Stages[0],
      emissiveIntensity: 0.62,
      roughness: 0.64,
      metalness: 0.04,
    });
    this.coveLineMat = new THREE.MeshStandardMaterial({
      color: 0x6cd8f4,
      emissive: new THREE.Color(0x2898e0),
      emissiveIntensity: 1.0,
      roughness: 0.24,
    });
    this.lightBoxTopMat = new THREE.MeshStandardMaterial({
      color: 0x62c4ec,
      emissive: new THREE.Color(0x2282cc),
      emissiveIntensity: 0.82,
      roughness: 0.3,
    });
    this.lightBoxMidMat = new THREE.MeshStandardMaterial({
      color: 0x3676d8,
      emissive: new THREE.Color(0x164cb8),
      emissiveIntensity: 0.88,
      roughness: 0.3,
    });
    this.lightBoxBotMat = new THREE.MeshStandardMaterial({
      color: 0x5cc0e8,
      emissive: new THREE.Color(0x1e7cc4),
      emissiveIntensity: 0.82,
      roughness: 0.3,
    });

    this.buildArchitecture();
    this.buildRealShinjukuWings();
    this.buildShinjukuWall456AndMidoriFacade();
    this.buildFourShinjukuTicketGates();
    this.buildTactileAndFloorGuides();
    this.buildLightingFixtures();
    this.buildAlpsPedestal();
    this.buildEastExitPortal();
    this.buildChargeTerminals();
    this.buildHidingSpots();
    this.buildShinjukuPropsAndSignage();
    this.buildRealismClutter();
    this.buildNotesAndCoins();
    this.buildDustMotes();
    scene.add(this.root);
  }

  private addFloorGlowPool(
    x: number,
    z: number,
    sx: number,
    sz: number,
    color: number,
    opacity: number
  ): THREE.MeshBasicMaterial {
    const mat = new THREE.MeshBasicMaterial({
      map: this.textures.lightShaftSoft,
      color,
      transparent: true,
      opacity: opacity * 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const m = new THREE.Mesh(this.floorPoolGeo, mat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, 0.011, z);
    m.scale.set(sx, sz, 1);
    this.root.add(m);
    return mat;
  }

  isPointOnPuddle(x: number, z: number): boolean {
    for (const p of this.puddles) {
      const dx = (x - p.x) / p.rx;
      const dz = (z - p.z) / p.rz;
      if (dx * dx + dz * dz < 0.85) return true;
    }
    return false;
  }

  // Returns authentic belt drift velocity (m/s along X) if player stands on West Shinjuku Moving Walkway!
  getMovingWalkwayDrift(x: number, z: number): number {
    if (x < MOVING_WALKWAY_SPAN.xStart + 0.5 || x > MOVING_WALKWAY_SPAN.xEnd - 0.5) return 0;
    const dz = z - MOVING_WALKWAY_SPAN.zCenter;
    if (Math.abs(dz) > MOVING_WALKWAY_SPAN.halfWidth - 0.1 || Math.abs(dz) < 0.1) return 0;
    return dz < 0 ? -0.85 : 0.85; // North lane goes West toward 都庁, South lane goes East toward 新宿駅
  }

  triggerDominoBlowout(
    fromX: number,
    fromZ: number,
    toX: number,
    toZ: number,
    duration = 11.0
  ): boolean {
    const candidates = this.flickerLights
      .filter((fl) => fl.killedTimer <= 0.5 && fl.blowoutDelay <= 0)
      .map((fl) => ({
        fl,
        dFrom: Math.hypot(fl.x - fromX, fl.z - fromZ),
        dTo: Math.hypot(fl.x - toX, fl.z - toZ),
      }))
      .filter((c) => c.dFrom < 24 || c.dTo < 18)
      .sort((a, b) => a.dFrom - b.dFrom)
      .slice(0, 3);

    if (candidates.length === 0) return false;
    candidates.forEach((c, idx) => {
      if (idx === 0) {
        c.fl.killedTimer = duration;
        this.spawnSparks(c.fl.x, c.fl.y - 0.14, c.fl.z, 22);
      } else {
        c.fl.blowoutDelay = idx * 0.24;
      }
    });
    return true;
  }

  triggerPhotoBoothFlash(): void {
    this.photoBoothFlashTimer = 0.42;
    this.photoBoothShadowMesh.visible = true;
  }

  triggerPhantomTrain(): void {
    this.phantomTrainTimer = 5.2;
  }

  triggerWall456SubliminalFlash(): void {
    this.wall456FlashTimer = 0.34;
    const redTex = this.textures.wall456Stages[4];
    this.wall456Mat.map = redTex;
    this.wall456Mat.emissiveMap = redTex;
    this.wall456Mat.emissiveIntensity = 0.84;
    this.wall456Mat.needsUpdate = true;
  }

  setPayphoneRinging(ringing: boolean): void {
    this.payphoneRingActive = ringing;
  }

  spawnSparks(x: number, y: number, z: number, count = 12): void {
    for (let i = 0; i < count && this.sparks.length < 56; i++) {
      const m = new THREE.Mesh(this.sparkGeo, this.sparkMat);
      m.position.set(x + (Math.random() - 0.5) * 0.45, y, z + (Math.random() - 0.5) * 0.25);
      const a = Math.random() * Math.PI * 2;
      const spd = 0.9 + Math.random() * 2.6;
      this.root.add(m);
      this.sparks.push({
        mesh: m,
        vx: Math.cos(a) * spd,
        vy: -0.35 - Math.random() * 1.4,
        vz: Math.sin(a) * spd,
        life: 0.48 + Math.random() * 0.58,
      });
    }
  }

  private getCellCeilingHeight(col: number, row: number): number {
    if (isWestPlazaAtrium(col, row)) return PLAZA_CEILING;
    if (isHighCeiling(col, row)) return HIGH_CEILING;
    return LOW_CEILING;
  }

  private buildArchitecture(): void {
    const totalW = COLS * CELL;
    const totalD = ROWS * CELL;

    // Two-tone 600mm honed granite patchwork floor across all 180m x 116m (calibrated satin sheen!)
    const floorMat = new THREE.MeshStandardMaterial({
      map: this.textures.floorTerrazzo,
      normalMap: this.textures.floorNormal,
      normalScale: new THREE.Vector2(0.65, 0.65),
      roughnessMap: this.textures.floorRoughness,
      roughness: 0.74,
      metalness: 0.08,
      envMapIntensity: 0.78,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(totalW, totalD), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(totalW * 0.5, 0, totalD * 0.5);
    floor.receiveShadow = true;
    this.root.add(floor);

    // Off-white matte linear strip spandrel ceiling
    const ceilMat = new THREE.MeshStandardMaterial({
      map: this.textures.ceilingLouver,
      normalMap: this.textures.ceilingNormal,
      normalScale: new THREE.Vector2(0.55, 0.55),
      roughness: 0.68,
      metalness: 0.08,
      envMapIntensity: 0.58,
    });

    // 50th Anniversary Shinjuku Subnade "Urban Jungle" warm oak wood-slat & botanical ceiling!
    const subnadeCeilMat = new THREE.MeshStandardMaterial({
      map: this.textures.subnadeWoodCeiling,
      roughness: 0.66,
      metalness: 0.06,
      envMapIntensity: 0.45,
    });

    const wallMat = new THREE.MeshStandardMaterial({
      map: this.textures.wallTile,
      normalMap: this.textures.wallNormal,
      normalScale: new THREE.Vector2(0.72, 0.72),
      roughnessMap: this.textures.wallRoughness,
      roughness: 0.66,
      metalness: 0.06,
      envMapIntensity: 0.68,
    });

    // Authentic Tokyo Metro ceramic subway tile material for メトロプロムナード!
    const metroWallMat = new THREE.MeshStandardMaterial({
      map: this.textures.metroTileWall,
      normalMap: this.textures.metroTileNormal,
      normalScale: new THREE.Vector2(0.68, 0.68),
      roughness: 0.42,
      metalness: 0.06,
      envMapIntensity: 0.82,
    });

    // Ribbed architectural concrete cylindrical column material for 西口地下広場!
    const westPillarMat = new THREE.MeshStandardMaterial({
      map: this.textures.westPillarConcrete,
      normalMap: this.textures.westPillarNormal,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughness: 0.72,
      metalness: 0.08,
      envMapIntensity: 0.55,
    });

    const pillarMat = new THREE.MeshStandardMaterial({
      map: this.textures.pillarMetal,
      normalMap: this.textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.36, 0.36),
      roughness: 0.36,
      metalness: 0.34,
      envMapIntensity: 0.92,
    });

    const subnadeVisionMat = new THREE.MeshStandardMaterial({
      color: 0x485450,
      map: this.textures.subnadeVisionScreen,
      emissive: new THREE.Color(0xdcf6e4),
      emissiveMap: this.textures.subnadeVisionScreen,
      emissiveIntensity: 0.58,
      roughness: 0.62,
    });

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x22262b,
      normalMap: this.textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.4, 0.4),
      roughness: 0.32,
      metalness: 0.78,
      envMapIntensity: 1.35,
    });

    const wallGeo = new THREE.BoxGeometry(CELL, HIGH_CEILING, CELL);
    const tallWallGeo = new THREE.BoxGeometry(CELL, PLAZA_CEILING, CELL);
    const ceilGeo = new THREE.PlaneGeometry(CELL, CELL);
    const cylColGeo = new THREE.CylinderGeometry(0.76, 0.76, 1.0, 20);
    const cylRingGeo = new THREE.CylinderGeometry(0.81, 0.81, 0.16, 20);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = SHINJUKU_GRID[r][c];
        const x = (c + 0.5) * CELL;
        const z = (r + 0.5) * CELL;

        if (cell === 1) {
          // r=12, c=18..20 is the glass-fronted 『みどりの窓口 Ticket Office』 bay
          if (r === 10 + CORE_OZ && c >= 13 + CORE_OX && c <= 15 + CORE_OX) continue;
          const touchesWestPlaza = c >= 5 && c <= 11 && r >= 6 && r <= 14;
          const isMetroWall = r >= 2 && r <= 6 && c >= 11 && c <= 35;
          const useH = touchesWestPlaza ? PLAZA_CEILING : HIGH_CEILING;
          const w = new THREE.Mesh(
            touchesWestPlaza ? tallWallGeo : wallGeo,
            isMetroWall ? metroWallMat : wallMat
          );
          w.position.set(x, useH * 0.5, z);
          w.receiveShadow = true;
          this.root.add(w);
          continue;
        }

        if (cell === 6) {
          const ceil = new THREE.Mesh(ceilGeo, isSubnadeZone(c, r) ? subnadeCeilMat : ceilMat);
          ceil.rotation.x = Math.PI / 2;
          ceil.position.set(x, LOW_CEILING, z);
          this.root.add(ceil);
          continue;
        }

        const ch = this.getCellCeilingHeight(c, r);
        const ceil = new THREE.Mesh(ceilGeo, isSubnadeZone(c, r) ? subnadeCeilMat : ceilMat);
        ceil.rotation.x = Math.PI / 2;
        ceil.position.set(x, ch, z);
        this.root.add(ceil);

        // Bulkhead soffits where higher ceilings meet lower concourses
        const dirs: Array<[number, number, number, number, number]> = [
          [-1, 0, x - CELL * 0.5, z, Math.PI / 2],
          [1, 0, x + CELL * 0.5, z, Math.PI / 2],
          [0, -1, x, z - CELL * 0.5, 0],
          [0, 1, x, z + CELL * 0.5, 0],
        ];
        for (const [dc, dr, bx, bz, ry] of dirs) {
          const nc = c + dc;
          const nr = r + dr;
          if (nc >= 0 && nc < COLS && nr >= 0 && nr < ROWS && SHINJUKU_GRID[nr][nc] !== 1) {
            const nch = this.getCellCeilingHeight(nc, nr);
            if (ch > nch + 0.1) {
              const diff = ch - nch;
              const bh = new THREE.Mesh(new THREE.BoxGeometry(CELL, diff, 0.2), wallMat);
              bh.position.set(bx, nch + diff * 0.5, bz);
              bh.rotation.y = ry;
              this.root.add(bh);
            }
          }
        }

        if (cell === 2) {
          // Authentic 『J・ADビジョン新宿駅』 Light-Box Digital Signage Column!
          this.buildJAdVisionLightColumn(x, z, pillarMat, frameMat, wallMat);
        } else if (cell === 4) {
          // Authentic JR Shinjuku Platform 1-16 Ascending Staircase + Parallel Glass Escalator!
          const stairDef = PLATFORM_STAIRS.find((p) => p.col === c) || PLATFORM_STAIRS[0];
          const isNorthBay = stairDef.col >= 25 + CORE_OX ? r === stairDef.southRow : r === stairDef.northRow;
          this.buildAuthenticPlatformStairCell(x, z, isNorthBay, stairDef, frameMat, wallMat);
        } else if (cell === 5) {
          // Iconic Cylindrical Structural Columns across 西口広場 / メトロプロムナード / 東口 / サブナード / 南口!
          const isWestCol = c >= 6 && c <= 10;
          const colMesh = new THREE.Mesh(cylColGeo, isWestCol ? westPillarMat : pillarMat);
          colMesh.scale.set(1, ch, 1);
          colMesh.position.set(x, ch * 0.5, z);
          colMesh.castShadow = true;
          colMesh.receiveShadow = true;
          const baseRing = new THREE.Mesh(cylRingGeo, frameMat);
          baseRing.position.set(x, 0.08, z);
          const capRing = new THREE.Mesh(cylRingGeo, frameMat);
          capRing.position.set(x, ch - 0.08, z);
          this.root.add(colMesh, baseRing, capRing);
          if (isWestPlazaAtrium(c, r)) {
            const capital = new THREE.Mesh(
              new THREE.CylinderGeometry(1.16, 0.8, 0.42, 20),
              wallMat
            );
            capital.position.set(x, ch - 0.24, z);
            this.root.add(capital);
          }
          // Mount glowing 『SUBNADE VISION』 digital panels on Shinjuku Subnade arcade columns (C41)!
          if (c === 41 && r >= 7 && r <= 20) {
            for (const [ox, ry] of [
              [0.78, Math.PI / 2],
              [-0.78, -Math.PI / 2],
            ] as Array<[number, number]>) {
              const svBezel = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.48, 0.74), frameMat);
              svBezel.position.set(x + ox * 0.98, 1.62, z);
              const svFace = new THREE.Mesh(new THREE.PlaneGeometry(0.68, 1.4), subnadeVisionMat);
              svFace.position.set(x + ox * 1.03, 1.62, z);
              svFace.rotation.y = ry;
              this.root.add(svBezel, svFace);
            }
          }
        }
      }
    }

    // Continuous Ceiling Soffit Drop & Line LED above the J・ADビジョン colonnade row (R10)
    const colonnadeBeam = new THREE.Mesh(new THREE.BoxGeometry(62.0, 0.42, 1.85), wallMat);
    colonnadeBeam.position.set(59.0 + DX, HIGH_CEILING - 0.21, (8.5 + CORE_OZ) * CELL);
    this.root.add(colonnadeBeam);

    const colonnadeLineLed = new THREE.Mesh(new THREE.BoxGeometry(61.8, 0.045, 0.08), this.coveLineMat);
    colonnadeLineLed.position.set(59.0 + DX, HIGH_CEILING - 0.41, (8.5 + CORE_OZ) * CELL - 0.92);
    this.root.add(colonnadeLineLed);

    // Glass/metal smoke-baffle drop beams (防煙垂れ壁) across the 100m 東西自由通路!
    const smokeGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xd8e4ea,
      transparent: true,
      opacity: 0.34,
      roughness: 0.08,
      metalness: 0.1,
      clearcoat: 1.0,
    });
    for (const bx of [36.0, 56.0, 76.0, 96.0, 114.0]) {
      const topRail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 15.6), frameMat);
      topRail.position.set(bx + DX, HIGH_CEILING - 0.04, (8.0 + CORE_OZ) * CELL);
      const baffle = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.48, 15.6), smokeGlassMat);
      baffle.position.set(bx + DX, HIGH_CEILING - 0.28, (8.0 + CORE_OZ) * CELL);
      this.root.add(topRail, baffle);
    }

    // Precision architectural ceiling HVAC linear diffuser slots & blinking smoke detectors across ALL 10 wings!
    const hvacMat = new THREE.MeshStandardMaterial({ color: 0x181c20, roughness: 0.72, metalness: 0.35 });
    const smokeBodyMat = new THREE.MeshStandardMaterial({ color: 0xd8d6ce, roughness: 0.48 });
    for (const hz of [26.4 + DZ, 37.6 + DZ]) {
      const diffuser = new THREE.Mesh(new THREE.BoxGeometry(92.0, 0.03, 0.14), hvacMat);
      diffuser.position.set(74.0 + DX, HIGH_CEILING - 0.015, hz);
      this.root.add(diffuser);
    }
    const metroDiffuser = new THREE.Mesh(new THREE.BoxGeometry(108.0, 0.03, 0.14), hvacMat);
    metroDiffuser.position.set(72.0 + DX, LOW_CEILING - 0.015, 11.8 + DZ);
    const southDiffuser = new THREE.Mesh(new THREE.BoxGeometry(94.0, 0.03, 0.14), hvacMat);
    southDiffuser.position.set(104.0, HIGH_CEILING - 0.015, 104.0);
    this.root.add(metroDiffuser, southDiffuser);

    const smokeGeo = new THREE.CylinderGeometry(0.065, 0.08, 0.045, 10);
    const ledGeo = new THREE.SphereGeometry(0.012, 6, 6);
    const smokeCoords: Array<[number, number, number]> = [
      [34 + DX, HIGH_CEILING, 28.4 + DZ],
      [54 + DX, HIGH_CEILING, 28.4 + DZ],
      [74 + DX, HIGH_CEILING, 28.4 + DZ],
      [96 + DX, HIGH_CEILING, 28.4 + DZ],
      [116 + DX, HIGH_CEILING, 28.4 + DZ],
      [44 + DX, LOW_CEILING, 10.6 + DZ],
      [88 + DX, LOW_CEILING, 10.6 + DZ],
      [14 + DX, LOW_CEILING, 58.0 + DZ],
      [44 + DX, LOW_CEILING, 46.0 + DZ],
      [78 + DX, LOW_CEILING, 46.0 + DZ],
      [108 + DX, LOW_CEILING, 68.0 + DZ],
      [94 + DX, LOW_CEILING, 82.0 + DZ],
      // New megacomplex wings: Eye/Moving Walkway, Subnade, Keio Mall, JR South/Busta!
      [14.0, HIGH_CEILING, 36.0],
      [168.0, LOW_CEILING, 42.0],
      [168.0, LOW_CEILING, 74.0],
      [32.0, LOW_CEILING, 102.0],
      [88.0, HIGH_CEILING, 102.0],
    ];
    for (const [sx, sy, sz] of smokeCoords) {
      const body = new THREE.Mesh(smokeGeo, smokeBodyMat);
      body.position.set(sx, sy - 0.025, sz);
      const ledMat = new THREE.MeshBasicMaterial({ color: 0xd82026 });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(sx + 0.04, sy - 0.048, sz);
      this.root.add(body, led);
      this.smokeLedMats.push(ledMat);
    }
  }

  // Authentic Real-World Shinjuku Underground Megacomplex Surrounding Wings:
  // 1. 新宿西口地下広場 ロータリー吹き抜け天井 (West Plaza Circular Rotary Atrium)
  // 2. 新宿の目 (10m×3.4m Eye of Shinjuku) + 西新宿・都庁方面 動く歩道 + 都営大江戸線 新宿西口駅 (E01)
  // 3. 東京メトロ 丸ノ内線 新宿駅 (M08) 西改札・東改札 ＆ メトロプロムナード
  // 4. 小田急線 西口地下改札 (OH01) ＆ 京王線 京王西口 (KO01)
  // 5. 京王モール (KEIO MALL) 地下街 ＆ 都営新宿線(S01)・京王新線・都営大江戸線(E27) 連絡改札
  // 6. 新宿サブナード (SHINJUKU SUBNADE) 50周年「アーバンジャングル」地下街 ＆ サンデッキ広場
  // 7. JR南口・甲州街道・バスタ新宿／新南改札大コンコース (QR対応EG21) + 5・6番線 N'EX 連絡地下道
  // 8. ルミネエスト新宿 B1F ファサード
  private buildRealShinjukuWings(): void {
    const darkMetal = new THREE.MeshStandardMaterial({ color: 0x1b2026, roughness: 0.38, metalness: 0.74 });
    const concreteRibMat = new THREE.MeshStandardMaterial({ color: 0x62666b, roughness: 0.78, metalness: 0.08 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x9cb4c2,
      transparent: true,
      opacity: 0.16,
      roughness: 0.32,
      metalness: 0.06,
      clearcoat: 0.12,
    });
    const shutterMat = new THREE.MeshStandardMaterial({
      map: this.textures.shutterMetal,
      normalMap: this.textures.shutterNormal,
      normalScale: new THREE.Vector2(0.8, 0.8),
      roughness: 0.5,
      metalness: 0.68,
    });
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x4c545c, roughness: 0.42, metalness: 0.78 });

    const makeBacklitMat = (tex: THREE.CanvasTexture, emissiveIntensity = 0.62) =>
      new THREE.MeshStandardMaterial({
        color: 0x485058,
        map: tex,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: tex,
        emissiveIntensity,
        roughness: 0.74,
        metalness: 0.04,
      });

    // 1. WEST UNDERGROUND PLAZA ROTARY ATRIUM (新宿西口地下広場ロータリー吹き抜け)
    const rotaryCX = (3.5 + CORE_OX) * CELL;
    const rotaryCZ = (8.5 + CORE_OZ) * CELL;
    const rotaryGroup = new THREE.Group();
    rotaryGroup.position.set(rotaryCX, PLAZA_CEILING - 0.06, rotaryCZ);
    const nightOculus = new THREE.Mesh(
      new THREE.CircleGeometry(6.8, 32),
      new THREE.MeshBasicMaterial({ color: 0x0a1320 })
    );
    nightOculus.rotation.x = Math.PI / 2;
    nightOculus.position.y = 0.02;
    rotaryGroup.add(nightOculus);

    const outerConcreteRing = new THREE.Mesh(new THREE.TorusGeometry(6.9, 0.42, 10, 36), concreteRibMat);
    outerConcreteRing.rotation.x = Math.PI / 2;
    rotaryGroup.add(outerConcreteRing);

    const innerRimLed = new THREE.Mesh(
      new THREE.TorusGeometry(6.45, 0.06, 8, 36),
      new THREE.MeshBasicMaterial({ color: 0x5c96b8 })
    );
    innerRimLed.rotation.x = Math.PI / 2;
    innerRimLed.position.y = -0.18;
    rotaryGroup.add(innerRimLed);

    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.36, 6.8), concreteRibMat);
      rib.position.set(Math.sin(a) * 3.4, -0.12, Math.cos(a) * 3.4);
      rib.rotation.y = a;
      rotaryGroup.add(rib);
    }
    this.root.add(rotaryGroup);
    this.addFloorGlowPool(rotaryCX, rotaryCZ, 12.0, 12.0, 0x3b6e94, 0.24);

    // 2A. ICONIC 1969 『新宿の目』(Eye of Shinjuku — 10.0m × 3.4m) + 2B. 『西新宿・都庁方面 動く歩道』!
    const eyeObj = this.props.buildEyeOfShinjuku3D(
      EYE_OF_SHINJUKU_POS.x,
      EYE_OF_SHINJUKU_POS.y,
      EYE_OF_SHINJUKU_POS.z
    );
    this.eyePupilGroup = eyeObj.pupilGroup;
    this.eyeIrisMat = eyeObj.irisMat;
    this.root.add(eyeObj.group);
    this.addFloorGlowPool(EYE_OF_SHINJUKU_POS.x, EYE_OF_SHINJUKU_POS.z + 2.8, 11.5, 5.4, 0xd8b278, 0.28);

    const mwObj = this.props.buildMovingWalkway3D(
      MOVING_WALKWAY_SPAN.xStart,
      MOVING_WALKWAY_SPAN.xEnd,
      MOVING_WALKWAY_SPAN.zCenter,
      MOVING_WALKWAY_SPAN.halfWidth
    );
    this.movingBeltWestTex = mwObj.beltTexWest;
    this.movingBeltEastTex = mwObj.beltTexEast;
    this.root.add(mwObj.group);

    // 2C. TOEI OEDO LINE SHINJUKU-NISHIGUCHI STATION (都営大江戸線 新宿西口駅 E01: C3..5, R1 -> z=8.0m)
    const oedoHeaderMat = makeBacklitMat(this.textures.oedoWestHeader, 0.64);
    const oedoG = new THREE.Group();
    oedoG.position.set(4.5 * CELL, 0, 2.0 * CELL);
    const oedoBox = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.74, 0.26), darkMetal);
    oedoBox.position.set(0, 3.16, 0);
    const oedoFace = new THREE.Mesh(new THREE.PlaneGeometry(11.6, 0.66), oedoHeaderMat);
    oedoFace.position.set(0, 3.16, 0.135);
    const oedoGlass = new THREE.Mesh(new THREE.BoxGeometry(11.6, 2.75, 0.06), glassMat);
    oedoGlass.position.set(0, 1.38, -0.1);
    const oedoShutter = new THREE.Mesh(new THREE.PlaneGeometry(11.6, 2.75), shutterMat);
    oedoShutter.position.set(0, 1.38, -2.6);
    for (let tx = -4.2; tx <= 4.2; tx += 2.1) {
      oedoG.add(this.props.buildEG20Turnstile(tx, -1.25, 0, 0xb6007a, false, false));
    }
    oedoG.add(oedoBox, oedoFace, oedoGlass, oedoShutter);
    this.root.add(oedoG);
    this.addFloorGlowPool(4.5 * CELL, 2.5 * CELL, 10.0, 4.0, 0xb6167a, 0.22);

    // 3. TOKYO METRO MARUNOUCHI LINE (M08) WEST & EAST GATES (R3, C14..17 & C26..29) + METRO PROMENADE!
    const maruHeaderMat = makeBacklitMat(this.textures.marunouchiHeader, 0.64);
    const buildMetroGateBay = (cx: number, zFront: number) => {
      const g = new THREE.Group();
      g.position.set(cx, 0, zFront);
      const headerBox = new THREE.Mesh(new THREE.BoxGeometry(15.8, 0.72, 0.26), darkMetal);
      headerBox.position.set(0, 3.16, 0);
      const headerFace = new THREE.Mesh(new THREE.PlaneGeometry(15.6, 0.64), maruHeaderMat);
      headerFace.position.set(0, 3.16, 0.135);
      const glass = new THREE.Mesh(new THREE.BoxGeometry(15.6, 2.75, 0.06), glassMat);
      glass.position.set(0, 1.38, -0.1);
      const shutter = new THREE.Mesh(new THREE.PlaneGeometry(15.6, 2.75), shutterMat);
      shutter.position.set(0, 1.38, -2.6);
      for (let tx = -6.0; tx <= 6.0; tx += 2.0) {
        g.add(this.props.buildEG20Turnstile(tx, -1.25, 0, 0xc81220, false, false));
      }
      g.add(headerBox, headerFace, glass, shutter);
      this.root.add(g);
      this.addFloorGlowPool(cx, zFront + 1.6, 12.0, 4.0, 0xc8222e, 0.22);
    };
    buildMetroGateBay((11.0 + CORE_OX) * CELL, (2.0 + CORE_OZ) * CELL);
    buildMetroGateBay((23.0 + CORE_OX) * CELL, (2.0 + CORE_OZ) * CELL);

    // Metro Promenade illuminated Super Premium Wall panels along R6 North face
    const metroPromoMat = makeBacklitMat(this.textures.metroSuperPremium, 0.56);
    for (const mx of [12.0 + CORE_OX, 19.5 + CORE_OX, 28.0 + CORE_OX]) {
      const frame = new THREE.Mesh(new THREE.BoxGeometry(11.4, 2.05, 0.12), darkMetal);
      frame.position.set(mx * CELL, 1.48, (4.0 + CORE_OZ) * CELL - 0.05);
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(11.1, 1.88), metroPromoMat);
      panel.position.set(mx * CELL, 1.48, (4.0 + CORE_OZ) * CELL - 0.12);
      panel.rotation.y = Math.PI;
      this.root.add(frame, panel);
    }

    // 4A. ODAKYU LINE WEST UNDERGROUND GATE (小田急線 西口地下改札口 OH01: C6, R15..18)
    const odakyuMat = makeBacklitMat(this.textures.odakyuHeader, 0.64);
    const odakyuG = new THREE.Group();
    odakyuG.position.set((2.0 + CORE_OX) * CELL, 0, (15.0 + CORE_OZ) * CELL);
    odakyuG.rotation.y = Math.PI / 2;
    const odBox = new THREE.Mesh(new THREE.BoxGeometry(15.8, 0.76, 0.26), darkMetal);
    odBox.position.set(0, 3.15, 0);
    const odFace = new THREE.Mesh(new THREE.PlaneGeometry(15.6, 0.68), odakyuMat);
    odFace.position.set(0, 3.15, 0.135);
    const odGlass = new THREE.Mesh(new THREE.BoxGeometry(15.6, 2.75, 0.06), glassMat);
    odGlass.position.set(0, 1.38, -0.1);
    const odShutter = new THREE.Mesh(new THREE.PlaneGeometry(15.6, 2.75), shutterMat);
    odShutter.position.set(0, 1.38, -2.8);
    for (let tx = -6.0; tx <= 6.0; tx += 2.0) {
      odakyuG.add(this.props.buildEG20Turnstile(tx, -1.35, 0, 0x0072c6, false, false));
    }
    odakyuG.add(odBox, odFace, odGlass, odShutter);
    this.root.add(odakyuG);
    this.addFloorGlowPool((2.6 + CORE_OX) * CELL, (15.0 + CORE_OZ) * CELL, 4.6, 13.0, 0x1674c4, 0.24);

    // 4B. KEIO LINE KEIO WEST GATE (京王線 京王西口 KO01: C7..9, R22)
    const keioMat = makeBacklitMat(this.textures.keioHeader, 0.64);
    const keioG = new THREE.Group();
    keioG.position.set((3.5 + CORE_OX) * CELL, 0, (20.0 + CORE_OZ) * CELL);
    keioG.rotation.y = Math.PI;
    const keBox = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.76, 0.26), darkMetal);
    keBox.position.set(0, 3.15, 0);
    const keFace = new THREE.Mesh(new THREE.PlaneGeometry(11.6, 0.68), keioMat);
    keFace.position.set(0, 3.15, 0.135);
    const keGlass = new THREE.Mesh(new THREE.BoxGeometry(11.6, 2.75, 0.06), glassMat);
    keGlass.position.set(0, 1.38, -0.1);
    const keShutter = new THREE.Mesh(new THREE.PlaneGeometry(11.6, 2.75), shutterMat);
    keShutter.position.set(0, 1.38, -2.8);
    for (let tx = -4.2; tx <= 4.2; tx += 2.1) {
      keioG.add(this.props.buildEG20Turnstile(tx, -1.35, 0, 0xcf006c, false, false));
    }
    keioG.add(keBox, keFace, keGlass, keShutter);
    this.root.add(keioG);
    this.addFloorGlowPool((3.5 + CORE_OX) * CELL, (19.3 + CORE_OZ) * CELL, 10.5, 4.2, 0xb82274, 0.22);

    // 5. 『京王モール KEIO MALL』 UNDERGROUND ARCADE + 『都営新宿線(S01)・京王新線・都営大江戸線(E27)』 GATE!
    const toeiMat = makeBacklitMat(this.textures.toeiShinjukuOedoHeader, 0.64);
    const toeiG = new THREE.Group();
    toeiG.position.set(2.0 * CELL, 0, 25.5 * CELL);
    toeiG.rotation.y = Math.PI / 2;
    const toBox = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.76, 0.26), darkMetal);
    toBox.position.set(0, 3.16, 0);
    const toFace = new THREE.Mesh(new THREE.PlaneGeometry(11.6, 0.68), toeiMat);
    toFace.position.set(0, 3.16, 0.135);
    const toGlass = new THREE.Mesh(new THREE.BoxGeometry(11.6, 2.75, 0.06), glassMat);
    toGlass.position.set(0, 1.38, -0.1);
    const toShutter = new THREE.Mesh(new THREE.PlaneGeometry(11.6, 2.75), shutterMat);
    toShutter.position.set(0, 1.38, -2.6);
    for (let i = 0; i < 5; i++) {
      const tx = -4.2 + i * 2.1;
      toeiG.add(this.props.buildEG20Turnstile(tx, -1.3, 0, i < 3 ? 0x6cbb5a : 0xb6007a, false, false));
    }
    toeiG.add(toBox, toFace, toGlass, toShutter);
    this.root.add(toeiG);
    this.addFloorGlowPool(2.6 * CELL, 25.5 * CELL, 4.8, 11.0, 0x6cbb5a, 0.22);

    // Overhead 『京王モール KEIO MALL』 Illuminated Portal Archway & Shuttered Arcade Shops!
    const keioMallHdrMat = makeBacklitMat(this.textures.keioMallHeader, 0.6);
    const kmArch = new THREE.Group();
    kmArch.position.set(13.5 * CELL, 3.16, 25.8 * CELL);
    kmArch.rotation.y = Math.PI / 2;
    const kmBox = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.72, 0.22), darkMetal);
    const kmF1 = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 0.64), keioMallHdrMat);
    kmF1.position.z = 0.115;
    const kmF2 = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 0.64), keioMallHdrMat);
    kmF2.position.z = -0.115;
    kmF2.rotation.y = Math.PI;
    kmArch.add(kmBox, kmF1, kmF2);
    this.root.add(kmArch);

    // Shuttered real Keio Mall shops lining North (R23 south face) & South (R27 north face)!
    this.root.add(this.props.buildUndergroundShopArcade3D(8.5 * CELL, 24.0 * CELL, 0, 7.6, false));
    this.root.add(this.props.buildUndergroundShopArcade3D(11.8 * CELL, 24.0 * CELL, 0, 5.2, false));
    this.root.add(this.props.buildUndergroundShopArcade3D(5.5 * CELL, 27.0 * CELL, Math.PI, 7.6, false));
    this.root.add(this.props.buildUndergroundShopArcade3D(9.5 * CELL, 27.0 * CELL, Math.PI, 7.6, false));

    // 6. 『新宿サブナード SHINJUKU SUBNADE』 50th Anniversary "Urban Jungle" Underground Shopping Mall!
    const subnadeHdrMat = makeBacklitMat(this.textures.subnadeHeader, 0.64);
    const subNorthG = new THREE.Group();
    subNorthG.position.set(41.5 * CELL, 0, 2.0 * CELL);
    const snBox = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.76, 0.26), darkMetal);
    snBox.position.set(0, 3.16, 0);
    const snFace = new THREE.Mesh(new THREE.PlaneGeometry(11.6, 0.68), subnadeHdrMat);
    snFace.position.set(0, 3.16, 0.135);
    const snGlass = new THREE.Mesh(new THREE.BoxGeometry(11.6, 2.75, 0.06), glassMat);
    snGlass.position.set(0, 1.38, -0.1);
    const snShutter = new THREE.Mesh(new THREE.PlaneGeometry(11.6, 2.75), shutterMat);
    snShutter.position.set(0, 1.38, -2.5);
    subNorthG.add(snBox, snFace, snGlass, snShutter);
    this.root.add(subNorthG);

    // Subnade Entry Portal Archway off Metro Promenade East (`C39.2, R4..5`)
    const subEntryArch = new THREE.Group();
    subEntryArch.position.set(39.4 * CELL, 3.16, 5.0 * CELL);
    subEntryArch.rotation.y = -Math.PI / 2;
    const seBox = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.72, 0.22), darkMetal);
    const seF1 = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 0.64), subnadeHdrMat);
    seF1.position.z = 0.115;
    const seF2 = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 0.64), subnadeHdrMat);
    seF2.position.z = -0.115;
    seF2.rotation.y = Math.PI;
    subEntryArch.add(seBox, seF1, seF2);
    this.root.add(subEntryArch);

    // Sundeck Plaza (`サンデッキ広場`) illuminated faux-skylight oculus above C41.5, R3.8!
    const sundeckLightPanel = new THREE.Mesh(
      new THREE.CircleGeometry(3.4, 24),
      new THREE.MeshBasicMaterial({ color: 0x32463a })
    );
    sundeckLightPanel.rotation.x = Math.PI / 2;
    sundeckLightPanel.position.set(41.5 * CELL, HIGH_CEILING - 0.04, 3.8 * CELL);
    const sundeckRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.48, 0.12, 8, 28),
      new THREE.MeshStandardMaterial({ color: 0xc2a252, roughness: 0.42, metalness: 0.48 })
    );
    sundeckRing.rotation.x = Math.PI / 2;
    sundeckRing.position.set(41.5 * CELL, HIGH_CEILING - 0.08, 3.8 * CELL);
    this.root.add(sundeckLightPanel, sundeckRing);
    this.addFloorGlowPool(41.5 * CELL, 3.8 * CELL, 8.0, 8.0, 0x62a878, 0.22);

    // Shuttered Shinjuku Subnade boutiques lining East wall (C44 west face) & West wall (C39 east face)!
    for (const sz of [7.5, 14.5, 19.5]) {
      this.root.add(this.props.buildUndergroundShopArcade3D(44.0 * CELL, sz * CELL, -Math.PI / 2, 7.6, true));
    }
    this.root.add(this.props.buildUndergroundShopArcade3D(40.0 * CELL, 13.0 * CELL, Math.PI / 2, 7.4, true));
    this.root.add(this.props.buildUndergroundShopArcade3D(40.0 * CELL, 18.8 * CELL, Math.PI / 2, 7.4, true));

    // Subnade Urban Jungle oak-wood & botanical planter lounge bench!
    this.root.add(this.props.buildSubnadeLoungeBench3D(SUBNADE_BENCH_POS.x, SUBNADE_BENCH_POS.z, -Math.PI / 2));

    // 7. 『JR新宿駅 新南改札・甲州街道改札 / バスタ新宿 4F直結 ・ NEWoMan』 CONCOURSE (R27, C18..25)!
    const shinnanMat = makeBacklitMat(this.textures.shinnanBustaHeader, 0.66);
    const shinnanG = new THREE.Group();
    shinnanG.position.set(22.0 * CELL, 0, 27.0 * CELL);
    shinnanG.rotation.y = Math.PI;
    const shBox = new THREE.Mesh(new THREE.BoxGeometry(31.8, 0.82, 0.28), darkMetal);
    shBox.position.set(0, 3.22, 0);
    const shFace = new THREE.Mesh(new THREE.PlaneGeometry(31.4, 0.72), shinnanMat);
    shFace.position.set(0, 3.22, 0.145);
    const shGlass = new THREE.Mesh(new THREE.BoxGeometry(31.4, 2.75, 0.06), glassMat);
    shGlass.position.set(0, 1.38, -0.1);
    const shShutter = new THREE.Mesh(new THREE.PlaneGeometry(31.4, 2.75), shutterMat);
    shShutter.position.set(0, 1.38, -2.8);
    for (let tx = -12.0; tx <= 12.0; tx += 3.0) {
      shinnanG.add(this.props.buildEG20Turnstile(tx, -1.35, 0, 0x3ea038, true, false));
    }
    shinnanG.add(shBox, shFace, shGlass, shShutter);
    this.root.add(shinnanG);
    this.addFloorGlowPool(22.0 * CELL, 26.2 * CELL, 24.0, 4.4, 0x2a88c8, 0.22);

    // 8. LUMINE EST SHINJUKU B1F ARCADE FACADE (R12 North face)
    const lumineMat = makeBacklitMat(this.textures.lumineHeader, 0.56);
    const lumHeader = new THREE.Mesh(new THREE.PlaneGeometry(24.0, 0.96), lumineMat);
    lumHeader.position.set((26.2 + CORE_OX) * CELL, 3.22, (10.0 + CORE_OZ) * CELL - 0.07);
    lumHeader.rotation.y = Math.PI;
    const lumShutter = new THREE.Mesh(new THREE.PlaneGeometry(23.8, 2.65), shutterMat);
    lumShutter.position.set((26.2 + CORE_OX) * CELL, 1.32, (10.0 + CORE_OZ) * CELL - 0.05);
    lumShutter.rotation.y = Math.PI;
    this.root.add(lumHeader, lumShutter);

    // 9. 5・6番線 NARITA EXPRESS (N'EX) UNDERGROUND TUNNEL (C28, R21..23)
    const nexHeaderMat = makeBacklitMat(this.textures.nexTunnelHeader, 0.66);
    const nexBox = new THREE.Mesh(new THREE.BoxGeometry(3.96, 0.72, 0.24), darkMetal);
    nexBox.position.set((23.5 + CORE_OX) * CELL, 3.16, (19.0 + CORE_OZ) * CELL);
    const nexFace = new THREE.Mesh(new THREE.PlaneGeometry(3.88, 0.64), nexHeaderMat);
    nexFace.position.set((23.5 + CORE_OX) * CELL, 3.16, (19.0 + CORE_OZ) * CELL - 0.125);
    nexFace.rotation.y = Math.PI;
    this.root.add(nexBox, nexFace);
    for (const px of [(23.5 + CORE_OX) * CELL - 1.35, (23.5 + CORE_OX) * CELL + 1.35]) {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 11.4, 8), pipeMat);
      pipe.rotation.x = Math.PI / 2;
      pipe.position.set(px, LOW_CEILING - 0.22, (20.5 + CORE_OZ) * CELL);
      this.root.add(pipe);
    }
    const nexShutter = new THREE.Mesh(new THREE.PlaneGeometry(11.4, 3.2), shutterMat);
    nexShutter.position.set((23.5 + CORE_OX) * CELL, 1.6, (22.0 + CORE_OZ) * CELL - 0.06);
    nexShutter.rotation.y = Math.PI;
    this.root.add(nexShutter);

    // 10. JR EAST BARRIER-FREE ELEVATORS (`エレベーター Elevator`) across 3 key megacomplex concourses!
    this.root.add(this.props.buildJRElevator3D(30.0 * CELL, 27.0 * CELL, Math.PI));       // JR南口・バスタ新宿エレベーター
    this.root.add(this.props.buildJRElevator3D(11.0 * CELL, 6.5 * CELL, -Math.PI / 2));   // 西口地下広場エレベーター
    this.root.add(this.props.buildJRElevator3D(34.5 * CELL, 12.0 * CELL, Math.PI));       // 東口・ルミネエスト連絡エレベーター
  }

  // Exact 3D reproduction of 『J・ADビジョン新宿駅』 with Pass-2 corner aluminum trim, top/bottom vent louvers & speaker mesh!
  private buildJAdVisionLightColumn(
    x: number,
    z: number,
    pillarMat: THREE.MeshStandardMaterial,
    frameMat: THREE.MeshStandardMaterial,
    wallMat: THREE.MeshStandardMaterial
  ): void {
    const colW = 1.92;
    const colD = 1.54;
    const casingH = 2.95;

    const upperCore = new THREE.Mesh(
      new THREE.BoxGeometry(colW - 0.16, HIGH_CEILING - casingH, colD - 0.16),
      wallMat
    );
    upperCore.position.set(x, casingH + (HIGH_CEILING - casingH) * 0.5, z);
    this.root.add(upperCore);

    const reveal = new THREE.Mesh(new THREE.BoxGeometry(colW - 0.04, 0.08, colD - 0.04), frameMat);
    reveal.position.set(x, casingH + 0.04, z);
    this.root.add(reveal);

    const body = new THREE.Mesh(new THREE.BoxGeometry(colW, casingH - 0.16, colD), pillarMat);
    body.position.set(x, 0.16 + (casingH - 0.16) * 0.5, z);
    body.castShadow = true;
    body.receiveShadow = true;
    this.root.add(body);

    // Brushed-chrome vertical corner extrusions + black recessed top/bottom cooling ventilation louvers!
    const cornerGeo = new THREE.BoxGeometry(0.045, casingH - 0.16, 0.045);
    for (const cx of [-colW * 0.5, colW * 0.5]) {
      for (const cz of [-colD * 0.5, colD * 0.5]) {
        const cg = new THREE.Mesh(cornerGeo, this.props.steelMat);
        cg.position.set(x + cx, 0.16 + (casingH - 0.16) * 0.5, z + cz);
        this.root.add(cg);
      }
    }

    // Brushed stainless-steel base kickplate (巾木) + rubber scuff bumper
    const base = new THREE.Mesh(new THREE.BoxGeometry(colW + 0.03, 0.16, colD + 0.03), frameMat);
    base.position.set(x, 0.08, z);
    const rubberTrim = new THREE.Mesh(new THREE.BoxGeometry(colW + 0.05, 0.035, colD + 0.05), this.props.matteBlackMat);
    rubberTrim.position.set(x, 0.02, z);
    this.root.add(base, rubberTrim);

    const screenMat = new THREE.MeshStandardMaterial({
      map: this.textures.signageStages[0],
      emissive: new THREE.Color(0xffffff),
      emissiveMap: this.textures.signageStages[0],
      emissiveIntensity: 0.54,
      roughness: 0.24,
      metalness: 0.04,
    });
    this.signageMats.push(screenMat);

    const nsScreenGeo = new THREE.PlaneGeometry(0.88, 1.58);
    const nsBezelGeo = new THREE.BoxGeometry(0.94, 1.64, 0.03);
    const ventGeo = new THREE.BoxGeometry(0.84, 0.045, 0.024);
    const lbPanelGeo = new THREE.PlaneGeometry(0.34, 0.72);
    const lbMidGeo = new THREE.PlaneGeometry(0.34, 0.62);
    const speakerGeo = new THREE.BoxGeometry(0.11, 0.24, 0.035);
    const spkMeshGeo = new THREE.BoxGeometry(0.08, 0.19, 0.038);

    for (const [oz, ry] of [
      [-colD * 0.5, Math.PI],
      [colD * 0.5, 0],
    ] as Array<[number, number]>) {
      const faceGroup = new THREE.Group();
      faceGroup.position.set(x, 0, z + oz);
      faceGroup.rotation.y = ry;

      const bezel = new THREE.Mesh(nsBezelGeo, frameMat);
      bezel.position.set(0, 1.56, 0.015);
      const scr = new THREE.Mesh(nsScreenGeo, screenMat);
      scr.position.set(0, 1.56, 0.033);
      // Top & bottom recessed heat-exhaust cooling louvers above/below the 70-inch FHD LCD!
      const ventTop = new THREE.Mesh(ventGeo, this.props.matteBlackMat);
      ventTop.position.set(0, 2.58, 0.014);
      const ventBot = new THREE.Mesh(ventGeo, this.props.matteBlackMat);
      ventBot.position.set(0, 0.54, 0.014);
      faceGroup.add(bezel, scr, ventTop, ventBot);

      for (const sx of [-0.68, 0.68]) {
        const topLB = new THREE.Mesh(lbPanelGeo, this.lightBoxTopMat);
        topLB.position.set(sx, 2.38, 0.018);
        const midLB = new THREE.Mesh(lbMidGeo, this.lightBoxMidMat);
        midLB.position.set(sx, 1.62, 0.018);
        const botLB = new THREE.Mesh(lbPanelGeo, this.lightBoxBotMat);
        botLB.position.set(sx, 0.86, 0.018);
        const spk = new THREE.Mesh(speakerGeo, frameMat);
        spk.position.set(sx, 1.62, 0.022);
        const spkMesh = new THREE.Mesh(spkMeshGeo, this.props.steelMat);
        spkMesh.position.set(sx, 1.62, 0.024);
        faceGroup.add(topLB, midLB, botLB, spk, spkMesh);
      }
      this.root.add(faceGroup);
    }

    const ewLightGeo = new THREE.PlaneGeometry(0.18, 0.72);
    const ewMidGeo = new THREE.PlaneGeometry(0.18, 0.62);
    for (const [ox, ry] of [
      [colW * 0.5, Math.PI / 2],
      [-colW * 0.5, -Math.PI / 2],
    ] as Array<[number, number]>) {
      const sideGroup = new THREE.Group();
      sideGroup.position.set(x + ox, 0, z);
      sideGroup.rotation.y = ry;

      const bezel = new THREE.Mesh(nsBezelGeo, frameMat);
      bezel.position.set(0, 1.56, 0.015);
      const scr = new THREE.Mesh(nsScreenGeo, screenMat);
      scr.position.set(0, 1.56, 0.033);
      const ventTop = new THREE.Mesh(ventGeo, this.props.matteBlackMat);
      ventTop.position.set(0, 2.58, 0.014);
      const ventBot = new THREE.Mesh(ventGeo, this.props.matteBlackMat);
      ventBot.position.set(0, 0.54, 0.014);
      sideGroup.add(bezel, scr, ventTop, ventBot);

      for (const sx of [-0.59, 0.59]) {
        const topLB = new THREE.Mesh(ewLightGeo, this.lightBoxTopMat);
        topLB.position.set(sx, 2.38, 0.018);
        const midLB = new THREE.Mesh(ewMidGeo, this.lightBoxMidMat);
        midLB.position.set(sx, 1.62, 0.018);
        const botLB = new THREE.Mesh(ewLightGeo, this.lightBoxBotMat);
        botLB.position.set(sx, 0.86, 0.018);
        sideGroup.add(topLB, midLB, botLB);
      }
      this.root.add(sideGroup);
    }

    const poolMat = this.addFloorGlowPool(x, z, 5.8, 5.8, 0x3894f0, 0.34);
    this.signagePoolMats.push(poolMat);
  }

  // Exact 3D reproduction of 『新宿ウォール456』(North Wall) + 『きっぷうりば』 + 『みどりの窓口 Ticket Office』(South Wall)!
  private buildShinjukuWall456AndMidoriFacade(): void {
    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x1c2026,
      roughness: 0.38,
      metalness: 0.76,
    });
    const whiteSoffitMat = new THREE.MeshStandardMaterial({
      color: 0xdcdad3,
      roughness: 0.42,
      metalness: 0.14,
    });

    // 1. NORTH WALL: 45.6m 『新宿ウォール456』
    const wallW = WALL_456_SPAN.xEnd - WALL_456_SPAN.xStart; // 45.6m!
    const wallCX = (WALL_456_SPAN.xStart + WALL_456_SPAN.xEnd) * 0.5;
    const wallZ = WALL_456_SPAN.z;

    const plinth = new THREE.Mesh(new THREE.BoxGeometry(wallW + 0.6, 0.38, 0.16), darkMetal);
    plinth.position.set(wallCX, 0.19, wallZ + 0.04);
    this.root.add(plinth);

    const backing = new THREE.Mesh(new THREE.BoxGeometry(wallW + 0.5, 2.15, 0.12), darkMetal);
    backing.position.set(wallCX, 1.38, wallZ + 0.02);
    this.root.add(backing);

    const ledWall = new THREE.Mesh(new THREE.PlaneGeometry(wallW, WALL_456_SPAN.height), this.wall456Mat);
    ledWall.position.set(wallCX, 1.24, wallZ + 0.09);
    this.root.add(ledWall);

    const canopy = new THREE.Mesh(new THREE.BoxGeometry(wallW + 1.2, 0.24, 0.58), whiteSoffitMat);
    canopy.position.set(wallCX, 2.48, wallZ + 0.26);
    this.root.add(canopy);

    const lineLed = new THREE.Mesh(new THREE.BoxGeometry(wallW + 1.0, 0.055, 0.08), this.coveLineMat);
    lineLed.position.set(wallCX, 2.49, wallZ + 0.54);
    this.root.add(lineLed);

    const spkGeo = new THREE.BoxGeometry(0.36, 0.2, 0.08);
    for (let i = 0; i < 10; i++) {
      const sx = WALL_456_SPAN.xStart + 2.2 + i * 4.55;
      const spk = new THREE.Mesh(spkGeo, darkMetal);
      spk.position.set(sx, 2.24, wallZ + 0.08);
      this.root.add(spk);
    }

    const serviceDoor = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 2.15, 0.06),
      new THREE.MeshStandardMaterial({ color: 0xa8aeb4, roughness: 0.35, metalness: 0.65 })
    );
    serviceDoor.position.set(WALL_456_SPAN.xEnd + 0.85, 1.08, wallZ + 0.04);
    this.root.add(serviceDoor);

    for (let px = WALL_456_SPAN.xStart + 4.0; px <= WALL_456_SPAN.xEnd - 3.0; px += 7.6) {
      const pm = this.addFloorGlowPool(px, wallZ + 2.6, 8.8, 5.2, 0x38b8f4, 0.34);
      this.wall456PoolMats.push(pm);
    }

    // 2. SOUTH SIDE OF 東西自由通路: 『きっぷうりば』 & 『みどりの窓口』
    const southZ = (10.0 + CORE_OZ) * CELL;
    const ticketCX = 46.0 + DX;
    const midoriCX = 58.0 + DX;

    this.root.add(this.props.buildTicketMachineBank(ticketCX, southZ));

    const fareBoard = new THREE.Mesh(
      new THREE.PlaneGeometry(11.0, 0.82),
      new THREE.MeshStandardMaterial({
        color: 0x4c545a,
        map: this.textures.fareTableHeader,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: this.textures.fareTableHeader,
        emissiveIntensity: 0.58,
        roughness: 0.74,
      })
    );
    fareBoard.position.set(ticketCX, 2.74, southZ - 0.18);
    fareBoard.rotation.y = Math.PI;
    fareBoard.rotation.x = 0.22;
    this.root.add(fareBoard);
    this.addFloorGlowPool(ticketCX, southZ - 1.6, 10.5, 3.6, 0xc4e2ec, 0.22);

    const midoriEspressoMat = new THREE.MeshStandardMaterial({
      color: 0x261f1d,
      roughness: 0.46,
      metalness: 0.16,
    });
    const jrGreenUpperMat = new THREE.MeshStandardMaterial({
      color: 0x0e6634,
      roughness: 0.48,
      metalness: 0.12,
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xb8d4dc,
      transparent: true,
      opacity: 0.22,
      roughness: 0.22,
      metalness: 0.06,
      clearcoat: 0.28,
    });

    const midoriSignMat = new THREE.MeshStandardMaterial({
      color: 0x485058,
      map: this.textures.midoriHeader,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: this.textures.midoriHeader,
      emissiveIntensity: 0.62,
      roughness: 0.74,
    });
    const midoriHeaderBox = new THREE.Mesh(new THREE.BoxGeometry(11.96, 0.56, 0.18), darkMetal);
    midoriHeaderBox.position.set(midoriCX, 2.66, southZ - 0.04);
    const midoriHeaderFace = new THREE.Mesh(new THREE.PlaneGeometry(11.86, 0.5), midoriSignMat);
    midoriHeaderFace.position.set(midoriCX, 2.66, southZ - 0.135);
    midoriHeaderFace.rotation.y = Math.PI;
    this.root.add(midoriHeaderBox, midoriHeaderFace);

    const greenUpperWall = new THREE.Mesh(
      new THREE.BoxGeometry(11.96, HIGH_CEILING - 2.94, 0.22),
      jrGreenUpperMat
    );
    greenUpperWall.position.set(midoriCX, 2.94 + (HIGH_CEILING - 2.94) * 0.5, southZ - 0.02);
    this.root.add(greenUpperWall);

    const airGrilleMat = new THREE.MeshStandardMaterial({
      color: 0x9aa2a8,
      normalMap: this.textures.brushedMetalNormal,
      roughness: 0.38,
      metalness: 0.72,
    });
    for (const gx of [midoriCX - 2.9, midoriCX + 2.9]) {
      const grille = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.4, 0.04), airGrilleMat);
      grille.position.set(gx, 3.46, southZ - 0.14);
      this.root.add(grille);
    }

    const leftWallPanel = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.38, 0.22), midoriEspressoMat);
    leftWallPanel.position.set(midoriCX - 4.6, 1.19, southZ + 0.05);
    const rightWallPanel = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.38, 0.22), midoriEspressoMat);
    rightWallPanel.position.set(midoriCX + 4.6, 1.19, southZ + 0.05);
    this.root.add(leftWallPanel, rightWallPanel);

    const glassPane = new THREE.Mesh(new THREE.BoxGeometry(6.4, 2.34, 0.06), glassMat);
    glassPane.position.set(midoriCX, 1.17, southZ + 0.12);
    this.root.add(glassPane);
    for (const ox of [-3.16, -1.58, 0, 1.58, 3.16]) {
      const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.36, 0.11), airGrilleMat);
      mullion.position.set(midoriCX + ox, 1.18, southZ + 0.12);
      this.root.add(mullion);
    }

    const interiorBackWall = new THREE.Mesh(
      new THREE.BoxGeometry(11.96, 3.8, 0.2),
      new THREE.MeshStandardMaterial({
        color: 0xd8d5cc,
        emissive: new THREE.Color(0x9a9688),
        emissiveIntensity: 0.28,
        roughness: 0.48,
      })
    );
    interiorBackWall.position.set(midoriCX, 1.9, southZ + 3.9);
    const interiorEastWall = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.8, 4.0), midoriEspressoMat);
    interiorEastWall.position.set(midoriCX + 5.9, 1.9, southZ + 2.0);
    const interiorCounter = new THREE.Mesh(
      new THREE.BoxGeometry(8.6, 1.05, 0.8),
      new THREE.MeshStandardMaterial({
        color: 0xc2b6a4,
        emissive: new THREE.Color(0x665e50),
        emissiveIntensity: 0.24,
        roughness: 0.44,
      })
    );
    interiorCounter.position.set(midoriCX, 0.525, southZ + 2.55);
    const interiorGreenBanner = new THREE.Mesh(
      new THREE.PlaneGeometry(7.6, 0.85),
      new THREE.MeshStandardMaterial({
        color: 0x0e7c42,
        emissive: new THREE.Color(0x0f6a38),
        emissiveIntensity: 0.52,
      })
    );
    interiorGreenBanner.position.set(midoriCX, 2.0, southZ + 3.78);
    interiorGreenBanner.rotation.y = Math.PI;
    this.root.add(interiorBackWall, interiorEastWall, interiorCounter, interiorGreenBanner);

    // Populated MARS Counter Workstations, Acrylic Partitions, Window Numbers & Queue Stanchions inside みどりの窓口!
    this.root.add(this.props.buildMidoriInterior3D(midoriCX, southZ + 2.55));

    // Authentic JR East Multilingual Digital Guidance Kiosk standing beside みどりの窓口!
    this.root.add(this.props.buildDigitalKioskStand3D(midoriCX - 5.55, southZ - 0.5, Math.PI));

    this.addFloorGlowPool(midoriCX, southZ - 0.9, 11.4, 3.4, 0xd8dfd4, 0.22);
  }

  // Exact 3D reproduction of the 4 Real B1F Ticket Gates of JR Shinjuku Station
  private buildFourShinjukuTicketGates(): void {
    const darkTop = new THREE.MeshStandardMaterial({ color: 0x161a20, roughness: 0.34, metalness: 0.45 });
    const glossyWhitePillarMat = new THREE.MeshStandardMaterial({
      color: 0xd8dad6,
      roughness: 0.34,
      metalness: 0.06,
      envMapIntensity: 0.78,
    });
    const blackThresholdMat = new THREE.MeshStandardMaterial({
      color: 0x1e2124,
      roughness: 0.48,
      metalness: 0.14,
    });

    const addTurnstileUnit = (x: number, z: number, rotY = 0) => {
      this.root.add(this.props.buildEG20Turnstile(x, z, rotY, 0x3ea038, true, true));
    };

    const buildNorthSouthGatePortal = (
      centerX: number,
      gateZ: number,
      headerTex: THREE.CanvasTexture,
      pillarTex: THREE.CanvasTexture
    ) => {
      const thresh = new THREE.Mesh(new THREE.PlaneGeometry(12.0, 2.8), blackThresholdMat);
      thresh.rotation.x = -Math.PI / 2;
      thresh.position.set(centerX, 0.006, gateZ);
      this.root.add(thresh);

      const headerMat = new THREE.MeshStandardMaterial({
        color: 0x485058,
        map: headerTex,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: headerTex,
        emissiveIntensity: 0.62,
        roughness: 0.74,
      });
      const headerBox = new THREE.Mesh(new THREE.BoxGeometry(12.0, 0.76, 0.34), darkTop);
      headerBox.position.set(centerX, 3.26, gateZ);
      const faceN = new THREE.Mesh(new THREE.PlaneGeometry(11.88, 0.7), headerMat);
      faceN.position.set(centerX, 3.26, gateZ - 0.175);
      faceN.rotation.y = Math.PI;
      const faceS = new THREE.Mesh(new THREE.PlaneGeometry(11.88, 0.7), headerMat);
      faceS.position.set(centerX, 3.26, gateZ + 0.175);
      this.root.add(headerBox, faceN, faceS);

      const pX = centerX - 1.1;
      const whitePillar = new THREE.Mesh(new THREE.BoxGeometry(1.18, 2.9, 1.18), glossyWhitePillarMat);
      whitePillar.position.set(pX, 1.45, gateZ);
      this.root.add(whitePillar);

      const plaqueMat = new THREE.MeshStandardMaterial({
        color: 0x485058,
        map: pillarTex,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: pillarTex,
        emissiveIntensity: 0.6,
        roughness: 0.74,
      });
      const plaqueN = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.92), plaqueMat);
      plaqueN.position.set(pX, 1.72, gateZ - 0.596);
      plaqueN.rotation.y = Math.PI;
      const plaqueS = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.92), plaqueMat);
      plaqueS.position.set(pX, 1.72, gateZ + 0.596);
      this.root.add(plaqueN, plaqueS);

      for (const ox of [-5.2, -4.1, -2.1, 0.2, 2.8, 4.0, 5.2]) {
        addTurnstileUnit(centerX + ox, gateZ, 0);
      }

      this.addFloorGlowPool(centerX, gateZ, 11.5, 4.2, 0x3cc068, 0.2);
    };

    // 1. 西改札 (West Gate) & 2. 東改札 (East Gate)
    buildNorthSouthGatePortal(34.0 + DX, (10.1 + CORE_OZ) * CELL, this.textures.gateHeaderWest, this.textures.gatePillarWest);
    buildNorthSouthGatePortal(82.0 + DX, (10.1 + CORE_OZ) * CELL, this.textures.gateHeaderEast, this.textures.gatePillarEast);

    // 3. 中央西改札 & 4. 中央東改札
    const buildEastWestGatePortal = (gateX: number, centerZ: number, headerTex: THREE.CanvasTexture) => {
      const thresh = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 11.8), blackThresholdMat);
      thresh.rotation.x = -Math.PI / 2;
      thresh.position.set(gateX, 0.006, centerZ);
      this.root.add(thresh);

      const headerMat = new THREE.MeshStandardMaterial({
        color: 0x485058,
        map: headerTex,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: headerTex,
        emissiveIntensity: 0.62,
        roughness: 0.74,
      });
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.74, 11.8), darkTop);
      box.position.set(gateX, 3.18, centerZ);
      const faceW = new THREE.Mesh(new THREE.PlaneGeometry(11.6, 0.68), headerMat);
      faceW.position.set(gateX - 0.175, 3.18, centerZ);
      faceW.rotation.y = -Math.PI / 2;
      const faceE = new THREE.Mesh(new THREE.PlaneGeometry(11.6, 0.68), headerMat);
      faceE.position.set(gateX + 0.175, 3.18, centerZ);
      faceE.rotation.y = Math.PI / 2;
      this.root.add(box, faceW, faceE);

      for (const oz of [-5.2, -4.1, -3.0, 3.0, 4.1, 5.2]) {
        addTurnstileUnit(gateX, centerZ + oz, Math.PI / 2);
      }
      this.addFloorGlowPool(gateX, centerZ, 4.2, 11.4, 0x3cc068, 0.18);
    };

    buildEastWestGatePortal((6.5 + CORE_OX) * CELL, (17.5 + CORE_OZ) * CELL, this.textures.gateHeaderCentralWest);
    buildEastWestGatePortal((30.5 + CORE_OX) * CELL, (17.5 + CORE_OZ) * CELL, this.textures.gateHeaderCentralEast);
  }

  // Ultra-Precise Pass-2 JR Shinjuku Platform 1-16 Ascending Staircase + Authentic Japanese Safety Escalator!
  // Features: 3-edge yellow resin demarcation cleats, grooved stainless comb landing plate (`コムプレート`),
  // curved rubber handrail inlet boots (`入り込み口`) with brush guards, red emergency stop button & green/red deck arrows!
  private buildAuthenticPlatformStairCell(
    x: number,
    z: number,
    isNorthBay: boolean,
    def: PlatformStairDef,
    frameMat: THREE.MeshStandardMaterial,
    wallMat: THREE.MeshStandardMaterial
  ): void {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = isNorthBay ? Math.PI : 0;

    const blackPillarMat = new THREE.MeshStandardMaterial({
      color: 0x1a1e22,
      roughness: 0.44,
      metalness: 0.24,
    });
    const steelMat = this.props.steelMat;
    const escGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xc8dce6,
      transparent: true,
      opacity: 0.3,
      roughness: 0.12,
      clearcoat: 0.5,
    });

    const leftTex = this.textures.platformNumPlaques.get(def.numLeft)!;
    const rightTex = this.textures.platformNumPlaques.get(def.numRight)!;

    for (const [px, tex] of [
      [-1.52, leftTex],
      [1.52, rightTex],
    ] as Array<[number, THREE.CanvasTexture]>) {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.74, LOW_CEILING, 0.82), blackPillarMat);
      pillar.position.set(px, LOW_CEILING * 0.5, 1.46);
      pillar.castShadow = true;
      g.add(pillar);

      const plaqueMat = new THREE.MeshStandardMaterial({
        color: 0x626870,
        map: tex,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: tex,
        emissiveIntensity: 0.42,
        roughness: 0.7,
      });
      const plaque = new THREE.Mesh(new THREE.PlaneGeometry(0.68, 1.92), plaqueMat);
      plaque.position.set(px, 1.72, 1.876);
      g.add(plaque);
    }

    for (const sx of [-1.72, 1.72]) {
      const sw = new THREE.Mesh(new THREE.BoxGeometry(0.24, LOW_CEILING, 3.68), wallMat);
      sw.position.set(sx, LOW_CEILING * 0.5, -0.05);
      g.add(sw);
    }
    const solidBackWall = new THREE.Mesh(new THREE.BoxGeometry(3.68, LOW_CEILING, 0.24), wallMat);
    solidBackWall.position.set(0, LOW_CEILING * 0.5, -1.78);
    solidBackWall.receiveShadow = true;
    const darkBack = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, LOW_CEILING),
      new THREE.MeshBasicMaterial({ color: 0x05070a })
    );
    darkBack.position.set(0, LOW_CEILING * 0.5, -1.64);
    g.add(solidBackWall, darkBack);

    const headerTex = this.textures.platformStairHeaders.get(def.id)!;
    const headerMat = new THREE.MeshStandardMaterial({
      color: 0x485058,
      map: headerTex,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: headerTex,
      emissiveIntensity: 0.64,
      roughness: 0.72,
    });
    const headerBox = new THREE.Mesh(new THREE.BoxGeometry(3.56, 0.64, 0.18), frameMat);
    headerBox.position.set(0, 2.86, 1.82);
    const headerFace = new THREE.Mesh(new THREE.PlaneGeometry(3.48, 0.58), headerMat);
    headerFace.position.set(0, 2.86, 1.916);
    g.add(headerBox, headerFace);

    const stepMat = new THREE.MeshStandardMaterial({ color: 0x42484e, roughness: 0.72 });
    const escStepMat = new THREE.MeshStandardMaterial({ color: 0x2c3238, roughness: 0.42, metalness: 0.72 });
    const riserBlueMat = new THREE.MeshStandardMaterial({ color: 0x1a4878, roughness: 0.48 });
    const yellowEdge = new THREE.MeshStandardMaterial({ color: 0xdca812, roughness: 0.48 });
    const redStopMat = new THREE.MeshBasicMaterial({ color: 0xe82428 });
    const greenEntryMat = new THREE.MeshBasicMaterial({ color: 0x32e084 });

    // Lower grooved stainless comb landing plate (`コムプレート`) + yellow safety comb bar at escalator foot!
    const combLanding = new THREE.Mesh(new THREE.BoxGeometry(1.04, 0.032, 0.48), steelMat);
    combLanding.position.set(0.6, 0.016, 1.66);
    const combYellow = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.038, 0.08), yellowEdge);
    combYellow.position.set(0.6, 0.02, 1.46);
    g.add(combLanding, combYellow);

    for (let i = 0; i < 10; i++) {
      const sy = 0.12 + i * 0.23;
      const sz = 1.45 - i * 0.31;
      // Staircase half (left)
      const tread = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.12, 0.32), stepMat);
      tread.position.set(-0.54, sy, sz);
      const riser = new THREE.Mesh(new THREE.PlaneGeometry(1.16, 0.18), riserBlueMat);
      riser.position.set(-0.54, sy - 0.08, sz + 0.162);
      const nosing = new THREE.Mesh(new THREE.BoxGeometry(1.17, 0.025, 0.045), yellowEdge);
      nosing.position.set(-0.54, sy + 0.062, sz + 0.14);
      g.add(tread, riser, nosing);

      // Parallel Escalator ribbed metallic step half (right) with 3-EDGE YELLOW RESIN DEMARCATION LINES!
      const escStep = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.1, 0.3), escStepMat);
      escStep.position.set(0.6, sy, sz);
      const escFrontLine = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.02, 0.03), yellowEdge);
      escFrontLine.position.set(0.6, sy + 0.056, sz + 0.14);
      const escSideL = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.02, 0.28), yellowEdge);
      escSideL.position.set(0.16, sy + 0.056, sz);
      const escSideR = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.02, 0.28), yellowEdge);
      escSideR.position.set(1.04, sy + 0.056, sz);
      g.add(escStep, escFrontLine, escSideL, escSideR);
    }

    // Parallel Escalator Glass Balustrades + Black Moving Rubber Handrails + Curved Inlet Boots + Emergency Stop!
    for (const bx of [0.1, 1.1]) {
      const deck = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.34, 3.65), steelMat);
      deck.position.set(bx, 1.25, 0.05);
      deck.rotation.x = 0.64;
      const glassPanel = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.62, 3.55), escGlassMat);
      glassPanel.position.set(bx, 1.65, 0.05);
      glassPanel.rotation.x = 0.64;
      const belt = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.05, 3.62), blackPillarMat);
      belt.position.set(bx, 1.98, 0.05);
      belt.rotation.x = 0.64;
      // Lower curved newel post + black rubber handrail return wrap + yellow inlet safety brush boot!
      const newel = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.72, 0.32), steelMat);
      newel.position.set(bx, 0.38, 1.66);
      const returnWrap = new THREE.Mesh(
        new THREE.TorusGeometry(0.18, 0.032, 7, 12, Math.PI),
        blackPillarMat
      );
      returnWrap.rotation.y = Math.PI / 2;
      returnWrap.position.set(bx, 0.66, 1.78);
      const inletGuard = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.08, 0.09), yellowEdge);
      inletGuard.position.set(bx, 0.48, 1.81);
      // Glowing green ↑ directional entry indicator on newel nose
      const dirLed = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.018), greenEntryMat);
      dirLed.position.set(bx, 0.68, 1.828);
      g.add(deck, glassPanel, belt, newel, returnWrap, inletGuard, dirLed);
    }
    // Red emergency stop push-button (`非常停止ボタン`) in chrome collar on right escalator newel!
    const stopBezel = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.08, 0.03), this.props.chromeMat);
    stopBezel.position.set(1.1, 0.56, 1.825);
    const stopBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.025, 10), redStopMat);
    stopBtn.rotation.x = Math.PI / 2;
    stopBtn.position.set(1.1, 0.56, 1.842);
    g.add(stopBezel, stopBtn);

    // Staircase left stainless handrail
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 3.6, 8), steelMat);
    rail.position.set(-1.12, 1.75, 0.05);
    rail.rotation.x = 0.64;
    g.add(rail);

    // Locked midnight iron security grille across bottom of stairs/escalator
    const barGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.5, 6);
    for (let bx = -1.0; bx <= 1.0; bx += 0.25) {
      const bar = new THREE.Mesh(barGeo, frameMat);
      bar.position.set(bx, 1.25, 1.65);
      g.add(bar);
    }

    this.addFloorGlowPool(x, z + (isNorthBay ? -2.2 : 2.2), 5.2, 4.2, def.glowColor, 0.2);
    this.root.add(g);
  }

  private buildTactileAndFloorGuides(): void {
    const lineMat = new THREE.MeshStandardMaterial({
      map: this.textures.tactileLine,
      normalMap: this.textures.tactileLineNormal,
      normalScale: new THREE.Vector2(0.75, 0.75),
      roughness: 0.62,
    });
    const dotMat = new THREE.MeshStandardMaterial({
      map: this.textures.tactileDots,
      roughness: 0.62,
    });
    const borderMat = new THREE.MeshStandardMaterial({
      color: 0x52504c,
      roughness: 0.56,
    });

    const addDots = (x: number, z: number, w = 0.64, d = 0.64) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), dotMat);
      m.rotation.x = -Math.PI / 2;
      m.position.set(x, 0.009, z);
      m.receiveShadow = true;
      this.root.add(m);
    };

    // Collect all yellow tactile paving segments across ALL 180m x 116m and render via a single InstancedMesh!
    const tileTransforms: Array<{ x: number; z: number; horiz: boolean }> = [];
    const addLine = (x1: number, z1: number, x2: number, z2: number) => {
      const horiz = Math.abs(x2 - x1) > Math.abs(z2 - z1);
      const len = Math.hypot(x2 - x1, z2 - z1);

      const bGeo = horiz ? new THREE.PlaneGeometry(len, 0.62) : new THREE.PlaneGeometry(0.62, len);
      const bm = new THREE.Mesh(bGeo, borderMat);
      bm.rotation.x = -Math.PI / 2;
      bm.position.set((x1 + x2) * 0.5, 0.006, (z1 + z2) * 0.5);
      this.root.add(bm);

      const segs = Math.max(1, Math.round(len / 0.56));
      for (let i = 0; i < segs; i++) {
        const t = (i + 0.5) / segs;
        tileTransforms.push({ x: x1 + (x2 - x1) * t, z: z1 + (z2 - z1) * t, horiz });
      }
    };

    // 1. 東西自由通路 + 新宿の目・動く歩道 Main Artery (z = 38.8m -> 30.8+DZ)
    addLine(6.0, 30.8 + DZ, 130.0 + DX, 30.8 + DZ);
    // Branches South to 西改札, きっぷうりば, みどりの窓口, 東改札
    addLine(34.0 + DX, 30.8 + DZ, 34.0 + DX, 70.0 + DZ);
    addLine(46.0 + DX, 30.8 + DZ, 46.0 + DX, 39.2 + DZ);
    addLine(58.0 + DX, 30.8 + DZ, 58.0 + DX, 39.2 + DZ);
    addLine(82.0 + DX, 30.8 + DZ, 82.0 + DX, 70.0 + DZ);
    // North Connectors to 東京メトロ メトロプロムナード
    addLine(30.0 + DX, 12.6 + DZ, 30.0 + DX, 30.8 + DZ);
    addLine(98.0 + DX, 12.6 + DZ, 98.0 + DX, 30.8 + DZ);
    // 2. 北大動脈: 大江戸線E01 <-> 東京メトロ メトロプロムナード <-> 新宿サブナード (158m!)
    addLine(14.0, 12.6 + DZ, 168.0, 12.6 + DZ);
    // 3. 新宿西口地下広場 & 小田急・京王コンコース Artery
    addLine(14.0 + DX, 12.6 + DZ, 14.0 + DX, 78.0 + DZ);
    // 4. Inside-Gate North Concourse & Full Central Passage 1〜16番線
    addLine(30.0 + DX, 45.8 + DZ, 86.0 + DX, 45.8 + DZ);
    addLine(14.0 + DX, 70.0 + DZ, 128.0 + DX, 70.0 + DZ);
    // 5. 東口地下広場・ルミネエスト連絡通路 -> JR東南口
    addLine(126.0 + DX, 12.6 + DZ, 126.0 + DX, 102.0);
    // 6. 5・6番線 N'EX Underground Tunnel Tactile Line
    addLine(94.0 + DX, 70.0 + DZ, 94.0 + DX, 85.0 + DZ);
    // 7. 西新宿地下連絡道 (Moving Walkway <-> Keio Mall)
    addLine(11.5, 44.0, 11.5, 102.0);
    // 8. 南大動脈: 都営新宿線S01/大江戸線E27 <-> 京王モール <-> JR南口・バスタ新宿・新南改札 (142m!)
    addLine(10.0, 102.0, 150.0, 102.0);
    // South Connector from JR Central Passage to South Concourse (C21 -> x=86m)
    addLine(86.0, 70.0 + DZ, 86.0, 102.0);
    // 9. 新宿サブナード Arcade Artery (x=168m, R3..R21) + South-East Connector!
    addLine(168.0, 12.0, 168.0, 86.0);
    addLine(146.0, 62.0, 168.0, 62.0);

    for (const [dx, dz] of [
      [14.0 + DX, 30.8 + DZ], [30.0 + DX, 30.8 + DZ], [34.0 + DX, 30.8 + DZ], [46.0 + DX, 30.8 + DZ],
      [58.0 + DX, 30.8 + DZ], [82.0 + DX, 30.8 + DZ], [98.0 + DX, 30.8 + DZ], [126.0 + DX, 30.8 + DZ],
      [30.0 + DX, 12.6 + DZ], [98.0 + DX, 12.6 + DZ], [34.0 + DX, 70.0 + DZ], [82.0 + DX, 70.0 + DZ],
      [94.0 + DX, 70.0 + DZ], [126.0 + DX, 70.0 + DZ], [11.5, 102.0], [86.0, 102.0], [146.0, 102.0],
      [168.0, 12.6 + DZ], [168.0, 62.0],
    ]) {
      addDots(dx, dz);
    }
    addDots(GATE_LINE_X - 1.1, GATE_LINE_Z, 0.65, 2.6);

    const tileGeo = new THREE.PlaneGeometry(0.42, 0.52);
    const inst = new THREE.InstancedMesh(tileGeo, lineMat, tileTransforms.length);
    inst.receiveShadow = true;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < tileTransforms.length; i++) {
      const tt = tileTransforms[i];
      dummy.position.set(tt.x, 0.008, tt.z);
      dummy.rotation.set(-Math.PI / 2, 0, tt.horiz ? Math.PI / 2 : 0);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
    this.root.add(inst);
  }

  private buildLightingFixtures(): void {
    // Authentic 00:47 after-last-train lighting across ALL 10 real-world Shinjuku Megacomplex wings!
    // Served smoothly by our 12-light dynamic PointLight pool (zero shader bloat, photoreal PBR everywhere!)
    const fixtures: Array<{
      x: number;
      z: number;
      h: number;
      intensity: number;
      color?: number;
      emergency?: boolean;
      haze?: boolean;
      circular?: boolean;
    }> = [
      // 1. 東西自由通路 (East-West Free Passage: 100m span, Circular Recessed LED Downlights)
      { x: 30 + DX, z: 30 + DZ, h: HIGH_CEILING, intensity: 4.8, haze: true, circular: true },
      { x: 46 + DX, z: 29.5 + DZ, h: HIGH_CEILING, intensity: 5.4, haze: true, circular: true },
      { x: 62 + DX, z: 29.5 + DZ, h: HIGH_CEILING, intensity: 5.8, haze: true, circular: true },
      { x: 78 + DX, z: 29.5 + DZ, h: HIGH_CEILING, intensity: 5.4, haze: true, circular: true },
      { x: 96 + DX, z: 29.5 + DZ, h: HIGH_CEILING, intensity: 5.4, haze: true, circular: true },
      { x: 114 + DX, z: 29.5 + DZ, h: HIGH_CEILING, intensity: 4.8, haze: true, circular: true },
      { x: 126 + DX, z: 30 + DZ, h: HIGH_CEILING, intensity: 4.6, haze: true, circular: true },

      // 2. 東京メトロ メトロプロムナード & 丸ノ内線 (M08)
      { x: 24 + DX, z: 11.5 + DZ, h: LOW_CEILING, intensity: 4.2, color: 0xc2d8e4 },
      { x: 44 + DX, z: 11.0 + DZ, h: LOW_CEILING, intensity: 4.6, color: 0xd8bfc4, haze: true },
      { x: 66 + DX, z: 11.5 + DZ, h: LOW_CEILING, intensity: 4.4, color: 0xc4d8e2 },
      { x: 92 + DX, z: 11.0 + DZ, h: LOW_CEILING, intensity: 4.6, color: 0xd8bfc4, haze: true },
      { x: 114 + DX, z: 11.5 + DZ, h: LOW_CEILING, intensity: 4.2, color: 0xc2d8e4 },

      // 3. 新宿西口地下広場 ロータリー吹き抜け & 小田急(OH01) / 京王(KO01)
      { x: 14 + DX, z: 22 + DZ, h: PLAZA_CEILING, intensity: 5.2, color: 0x9ec0d8, circular: true },
      { x: 14 + DX, z: 34 + DZ, h: PLAZA_CEILING, intensity: 6.2, color: 0x98bdd8, haze: true, circular: true },
      { x: 14 + DX, z: 46 + DZ, h: PLAZA_CEILING, intensity: 5.0, color: 0x9ec0d8, circular: true },
      { x: 14 + DX, z: 60 + DZ, h: LOW_CEILING, intensity: 4.8, color: 0x9ec6e8, haze: true },
      { x: 14 + DX, z: 74 + DZ, h: LOW_CEILING, intensity: 4.6, color: 0xd4b6cc, haze: true },

      // 4. NEW WING A: 新宿の目 (Eye of Shinjuku) + 動く歩道 + 都営大江戸線 新宿西口駅(E01) + 西新宿連絡!
      { x: 14.0, z: 36.5, h: HIGH_CEILING, intensity: 5.4, color: 0xe6cda6, haze: true, circular: true }, // Eye of Shinjuku warm glow
      { x: 14.0, z: 43.0, h: HIGH_CEILING, intensity: 4.6, color: 0xb8d4e6, circular: true },            // Moving Walkway
      { x: 18.0, z: 13.5, h: LOW_CEILING, intensity: 4.6, color: 0xd8a8cc, haze: true },               // Oedo E01 Magenta
      { x: 11.5, z: 66.0, h: LOW_CEILING, intensity: 3.8, emergency: true },                           // West Shinjuku dark connector

      // 5. NEW WING B: 京王モール (KEIO MALL) & 都営新宿線(S01)・大江戸線(E27)!
      { x: 14.0, z: 102.0, h: LOW_CEILING, intensity: 4.8, color: 0xbce2bc, haze: true },              // Toei Shinjuku S01 leaf-green tint
      { x: 34.0, z: 102.0, h: LOW_CEILING, intensity: 4.6, color: 0xe2d0c2, haze: true },              // Keio Mall Arcade
      { x: 52.0, z: 102.0, h: LOW_CEILING, intensity: 4.4, color: 0xd8dce4 },                          // Keio Mall East Portal

      // 6. NEW WING C: 新宿サブナード (SHINJUKU SUBNADE "Urban Jungle" + サンデッキ広場)!
      { x: 166.0, z: 15.0, h: HIGH_CEILING, intensity: 5.2, color: 0xc2e2cc, haze: true, circular: true }, // Sundeck Plaza
      { x: 168.0, z: 36.0, h: LOW_CEILING, intensity: 4.6, color: 0xd8cdb8, haze: true },                  // Subnade North Arcade
      { x: 168.0, z: 58.0, h: LOW_CEILING, intensity: 4.6, color: 0xd8cdb8, haze: true },                  // Subnade Center Lounge
      { x: 168.0, z: 80.0, h: LOW_CEILING, intensity: 4.4, color: 0xd8cdb8 },                              // Subnade South (3-chome)

      // 7. NEW WING D: JR南口・甲州街道・バスタ新宿／新南改札大コンコース & 東南口!
      { x: 70.0, z: 103.0, h: HIGH_CEILING, intensity: 4.8, color: 0xc4dce8, circular: true },
      { x: 90.0, z: 103.0, h: HIGH_CEILING, intensity: 5.4, color: 0xb6d6ec, haze: true, circular: true }, // Shinnan / Busta Gate
      { x: 114.0, z: 103.0, h: HIGH_CEILING, intensity: 4.8, color: 0xc6dce4, circular: true },
      { x: 138.0, z: 103.0, h: HIGH_CEILING, intensity: 4.6, color: 0xd8d2c6, circular: true },            // Southeast / Lumine 2
      { x: 86.0, z: 90.0, h: LOW_CEILING, intensity: 4.2, color: 0xc2d4dc },                               // South Connector

      // 8. JR改札内 北コンコース & 7〜16番線 階段エリア
      { x: 34 + DX, z: 46 + DZ, h: LOW_CEILING, intensity: 4.4 },
      { x: 48 + DX, z: 54 + DZ, h: LOW_CEILING, intensity: 4.8, haze: true },
      { x: 64 + DX, z: 54 + DZ, h: LOW_CEILING, intensity: 4.4 },
      { x: 82 + DX, z: 46 + DZ, h: LOW_CEILING, intensity: 4.4 },

      // 9. JR改札内 1〜4番線 (埼京線・湘南新宿ライン) & 5・6番線 N'EX 連絡地下道!
      { x: 102 + DX, z: 54 + DZ, h: LOW_CEILING, intensity: 4.6, color: 0xb6dcd8, haze: true },
      { x: 114 + DX, z: 54 + DZ, h: LOW_CEILING, intensity: 4.4, color: 0xb6dcd8 },
      { x: 94 + DX, z: 82 + DZ, h: LOW_CEILING, intensity: 4.2, emergency: true, haze: true },
      { x: 108 + DX, z: 81 + DZ, h: LOW_CEILING, intensity: 4.0 },

      // 10. 中央通路 (全1〜16番線) & 東口地下広場・ルミネエスト
      { x: 34 + DX, z: 70 + DZ, h: LOW_CEILING, intensity: 4.6, haze: true },
      { x: 54 + DX, z: 70 + DZ, h: LOW_CEILING, intensity: 4.4, emergency: true, haze: true },
      { x: 74 + DX, z: 70 + DZ, h: LOW_CEILING, intensity: 4.4 },
      { x: 96 + DX, z: 70 + DZ, h: LOW_CEILING, intensity: 4.6, haze: true },
      { x: 114 + DX, z: 70 + DZ, h: LOW_CEILING, intensity: 4.6, haze: true },
      { x: 128 + DX, z: 52 + DZ, h: LOW_CEILING, intensity: 4.2, color: 0xd8d2c4 },
      { x: 128 + DX, z: 72 + DZ, h: LOW_CEILING, intensity: 4.2, color: 0xd8d2c4 },
    ];

    const housingMat = new THREE.MeshStandardMaterial({ color: 0x8e949a, roughness: 0.48, metalness: 0.55 });
    const discGeo = new THREE.CircleGeometry(0.22, 14);
    const rimGeo = new THREE.RingGeometry(0.22, 0.27, 14);
    const sqPanelGeo = new THREE.PlaneGeometry(0.84, 0.84);
    const sqRimGeo = new THREE.BoxGeometry(0.94, 0.05, 0.94);

    fixtures.forEach((f, idx) => {
      const colHex = f.emergency ? 0xeeb664 : f.color ?? 0xc6dee4;
      const tubeHex = f.emergency ? 0xf2c276 : 0xd8eae8;
      const tubeMat = new THREE.MeshStandardMaterial({
        color: tubeHex,
        emissive: new THREE.Color(tubeHex),
        emissiveIntensity: 1.0,
        roughness: 0.28,
      });

      if (f.circular) {
        for (const dz of [-3.4, 0, 3.8]) {
          const rim = new THREE.Mesh(rimGeo, housingMat);
          rim.rotation.x = Math.PI / 2;
          rim.position.set(f.x, f.h - 0.015, f.z + dz);
          const disc = new THREE.Mesh(discGeo, tubeMat);
          disc.rotation.x = Math.PI / 2;
          disc.position.set(f.x, f.h - 0.018, f.z + dz);
          this.root.add(rim, disc);
        }
      } else {
        const frame = new THREE.Mesh(sqRimGeo, housingMat);
        frame.position.set(f.x, f.h - 0.025, f.z);
        const panel = new THREE.Mesh(sqPanelGeo, tubeMat);
        panel.rotation.x = Math.PI / 2;
        panel.position.set(f.x, f.h - 0.052, f.z);
        this.root.add(frame, panel);
      }

      let glowMat: THREE.SpriteMaterial | null = null;
      if (f.haze) {
        glowMat = new THREE.SpriteMaterial({
          map: this.textures.lightShaftSoft,
          color: colHex,
          transparent: true,
          opacity: 0.055,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const sp = new THREE.Sprite(glowMat);
        sp.position.set(f.x, f.h - 0.16, f.z);
        sp.scale.set(1.25, 0.48, 1);
        this.root.add(sp);
      }

      const floorPoolMat = this.addFloorGlowPool(f.x, f.z, 5.4, 4.6, colHex, 0.16);

      this.flickerLights.push({
        tubeMat,
        glowMat,
        floorPoolMat,
        baseIntensity: f.intensity,
        baseColor: colHex,
        tubeColor: tubeHex,
        x: f.x,
        z: f.z,
        y: f.h,
        phase: idx * 1.93 + 0.4,
        emergency: f.emergency,
        killedTimer: 0,
        blowoutDelay: 0,
        currentIntensity: f.intensity,
        currentColor: colHex,
      });
    });

    // Instanced recessed alternating ON/OFF circular downlights along 東西自由通路 & 新宿の目/動く歩道!
    const dimDownlightMat = new THREE.MeshStandardMaterial({
      color: 0xdce8e6,
      emissive: new THREE.Color(0xbcd6d4),
      emissiveIntensity: 0.82,
    });
    const offDownlightMat = new THREE.MeshStandardMaterial({
      color: 0x3c4248,
      roughness: 0.55,
      metalness: 0.42,
    });
    const litPos: Array<[number, number]> = [];
    const offPos: Array<[number, number]> = [];
    let lampIdx = 0;
    for (let dx = 28 + DX; dx <= 128 + DX; dx += 6.2) {
      for (const dz of [25.8 + DZ, 29.2 + DZ, 32.8 + DZ, 36.8 + DZ]) {
        if ((lampIdx++ % 3) !== 1) litPos.push([dx, dz]);
        else offPos.push([dx, dz]);
      }
    }
    const buildDownlightInst = (positions: Array<[number, number]>, mat: THREE.Material) => {
      const rimInst = new THREE.InstancedMesh(rimGeo, housingMat, positions.length);
      const discInst = new THREE.InstancedMesh(discGeo, mat, positions.length);
      const d = new THREE.Object3D();
      positions.forEach(([px, pz], i) => {
        d.rotation.set(Math.PI / 2, 0, 0);
        d.position.set(px, HIGH_CEILING - 0.015, pz);
        d.updateMatrix();
        rimInst.setMatrixAt(i, d.matrix);
        d.position.set(px, HIGH_CEILING - 0.018, pz);
        d.updateMatrix();
        discInst.setMatrixAt(i, d.matrix);
      });
      rimInst.instanceMatrix.needsUpdate = true;
      discInst.instanceMatrix.needsUpdate = true;
      this.root.add(rimInst, discInst);
    };
    buildDownlightInst(litPos, dimDownlightMat);
    buildDownlightInst(offPos, offDownlightMat);

    // Moody overhead shadow-casting spotlight in 東西自由通路 / アルプス広場
    this.concourseShadowSpot = new THREE.SpotLight(0xcbe2e8, 11.5, 30, Math.PI * 0.44, 0.78, 1.55);
    this.concourseShadowSpot.position.set(PEDESTAL_POS.x - 2.0, HIGH_CEILING - 0.18, PEDESTAL_POS.z);
    this.concourseShadowSpot.target.position.set(PEDESTAL_POS.x + 2.5, 0, PEDESTAL_POS.z);
    this.concourseShadowSpot.castShadow = true;
    this.concourseShadowSpot.shadow.mapSize.set(512, 512);
    this.concourseShadowSpot.shadow.camera.near = 0.8;
    this.concourseShadowSpot.shadow.camera.far = 28;
    this.concourseShadowSpot.shadow.bias = -0.0012;
    this.root.add(this.concourseShadowSpot, this.concourseShadowSpot.target);
  }

  private buildAlpsPedestal(): void {
    this.root.add(this.props.buildAlpsPedestal3D(PEDESTAL_POS));
  }

  // Final Escape Exit Gate & Rolling Steel Shutter at the East end of 東西自由通路 (東口・歌舞伎町／アルタ方面 地上出口)
  private buildEastExitPortal(): void {
    const gx = GATE_LINE_X;
    const gz = GATE_LINE_Z;
    const darkTop = new THREE.MeshStandardMaterial({ color: 0x1b2026, roughness: 0.38, metalness: 0.42 });
    const redPaddle = new THREE.MeshStandardMaterial({
      color: 0xd03838,
      emissive: new THREE.Color(0x521212),
      emissiveIntensity: 0.55,
      roughness: 0.34,
    });

    // 6 ultra-precise EG20 automatic emergency exit gate machines centered around gz = 30.0m (R6..R8 -> z = 24..36m)
    const offsets = [-3.6, -2.0, -1.1, 1.1, 2.0, 3.6];
    for (const dz of offsets) {
      this.root.add(this.props.buildEG20Turnstile(gx, gz + dz, -Math.PI / 2, 0x3ea038, true, false));
    }

    this.centerPaddleMat = new THREE.MeshStandardMaterial({
      color: 0xd03838,
      emissive: new THREE.Color(0x521212),
      emissiveIntensity: 0.55,
      roughness: 0.34,
    });

    const addLanePaddles = (z1: number, z2: number, center: boolean) => {
      const pw = (z2 - z1 - 0.34) * 0.48;
      const mat = center ? this.centerPaddleMat : redPaddle;
      const leftPivot = new THREE.Group();
      leftPivot.position.set(gx, 0.58, z1 + 0.17);
      const lp = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.58, pw), mat);
      lp.position.z = pw * 0.5;
      leftPivot.add(lp);

      const rightPivot = new THREE.Group();
      rightPivot.position.set(gx, 0.58, z2 - 0.17);
      const rp = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.58, pw), mat);
      rp.position.z = -pw * 0.5;
      rightPivot.add(rp);

      this.root.add(leftPivot, rightPivot);
      if (center) this.gatePaddles.push({ leftPivot, rightPivot });
    };
    addLanePaddles(gz - 3.6, gz - 2.0, false);
    addLanePaddles(gz - 1.1, gz + 1.1, true);
    addLanePaddles(gz + 2.0, gz + 3.6, false);

    // Overhead East Exit Status Display (anti-glare backlit!)
    const gd = createGateDisplay(false);
    this.gateDisplayMat = new THREE.MeshStandardMaterial({
      color: 0x485058,
      map: gd,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: gd,
      emissiveIntensity: 0.72,
      roughness: 0.72,
    });
    const housing = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.82, 2.45),
      new THREE.MeshStandardMaterial({ color: 0x161a1e, roughness: 0.5 })
    );
    housing.position.set(gx, 2.68, gz);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(2.32, 0.72), this.gateDisplayMat);
    face.position.set(gx - 0.095, 2.68, gz);
    face.rotation.y = -Math.PI / 2;
    this.root.add(housing, face);

    // Glowing green 非常口 EXIT sign
    const exitMat = new THREE.MeshStandardMaterial({
      map: this.textures.signEmergencyExit,
      emissive: new THREE.Color(0x52dc92),
      emissiveMap: this.textures.signEmergencyExit,
      emissiveIntensity: 0.78,
      roughness: 0.32,
    });
    const exBox = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.44, 1.18), darkTop);
    exBox.position.set(gx + 0.1, 3.55, gz);
    const exFace = new THREE.Mesh(new THREE.PlaneGeometry(1.12, 0.4), exitMat);
    exFace.position.set(gx + 0.03, 3.55, gz);
    exFace.rotation.y = -Math.PI / 2;
    this.root.add(exBox, exFace);

    this.exitLight = new THREE.PointLight(0xe03b3b, 5.2, 14, 1.85);
    this.exitLight.position.set(gx - 0.9, 2.35, gz);
    this.root.add(this.exitLight);

    // Heavy East Exit Rolling Steel Shutter (rises to Kabukicho rain-lit surface stairs!)
    const shutterMat = new THREE.MeshStandardMaterial({
      map: this.textures.shutterMetal,
      normalMap: this.textures.shutterNormal,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughness: 0.46,
      metalness: 0.72,
    });
    this.exitShutter = new THREE.Mesh(new THREE.BoxGeometry(0.22, HIGH_CEILING, 12.2), shutterMat);
    this.exitShutter.position.set(gx + 1.85, HIGH_CEILING * 0.5, gz);
    this.root.add(this.exitShutter);

    // Kabukicho / Shinjuku East Exit surface stairs behind shutter
    const stairMat = new THREE.MeshStandardMaterial({ color: 0x7c838a, roughness: 0.65 });
    for (let i = 0; i < 8; i++) {
      const st = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.22, 6.2), stairMat);
      st.position.set(gx + 2.3 + i * 0.28, 0.11 + i * 0.22, gz);
      this.root.add(st);
    }
    const nightPortal = new THREE.Mesh(
      new THREE.PlaneGeometry(6.6, HIGH_CEILING),
      new THREE.MeshBasicMaterial({ color: 0x6ea0b8 })
    );
    // Positioned cleanly on the East wall of C38 (isolated from Shinjuku Subnade by solid wall C39!)
    nightPortal.position.set(39.0 * CELL - 0.08, HIGH_CEILING * 0.5, gz);
    nightPortal.rotation.y = -Math.PI / 2;
    this.root.add(nightPortal);
  }

  // Ultra-Precise Multi-Part 3D JR East 『自動券売機（きっぷ・チャージ）』 with Pass-2 Keypad, Coin Funnel & Status Lamp!
  private buildChargeTerminals(): void {
    const silverShellMat = new THREE.MeshStandardMaterial({
      color: 0xd0d6da,
      normalMap: this.textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.35, 0.35),
      roughness: 0.34,
      metalness: 0.58,
      envMapIntensity: 0.88,
    });
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1c2126,
      roughness: 0.38,
      metalness: 0.72,
    });
    const buttonWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xe8ecee,
      roughness: 0.4,
      metalness: 0.15,
    });
    const headerMat = new THREE.MeshStandardMaterial({
      color: 0x4a5258,
      map: this.textures.chargeMachineHeader,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: this.textures.chargeMachineHeader,
      emissiveIntensity: 0.66,
      roughness: 0.78,
      metalness: 0.04,
    });
    const lowerDeckMat = new THREE.MeshStandardMaterial({
      color: 0xbcc4ca,
      map: this.textures.chargeMachineLowerDeck,
      normalMap: this.textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.28, 0.28),
      roughness: 0.44,
      metalness: 0.42,
    });
    const greenGuideLed = new THREE.MeshBasicMaterial({ color: 0x38e492 });

    for (const def of TERMINALS) {
      const g = new THREE.Group();
      g.position.set(def.x, 0, def.z);
      g.rotation.y = def.rotY;

      const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.12, 0.62), darkMetalMat);
      plinth.position.set(0, 0.06, 0);
      g.add(plinth);

      const mainBody = new THREE.Mesh(new THREE.BoxGeometry(0.86, 1.78, 0.6), silverShellMat);
      mainBody.position.set(0, 1.01, -0.01);
      mainBody.castShadow = true;
      mainBody.receiveShadow = true;
      g.add(mainBody);
      for (const rx of [-0.425, 0.425]) {
        const trimRib = new THREE.Mesh(new THREE.BoxGeometry(0.025, 1.78, 0.04), this.props.chromeMat);
        trimRib.position.set(rx, 1.01, 0.292);
        g.add(trimRib);
      }

      const headerHousing = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.44, 0.66), darkMetalMat);
      headerHousing.position.set(0, 1.72, 0.02);
      const headerFace = new THREE.Mesh(new THREE.PlaneGeometry(0.84, 0.4), headerMat);
      headerFace.position.set(0, 1.72, 0.355);
      // Top glowing green availability status beacon
      const statusBeacon = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.038, 0.04), greenGuideLed);
      statusBeacon.position.set(0, 1.96, 0.26);
      g.add(headerHousing, headerFace, statusBeacon);

      const monitorBezel = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.46, 0.04), darkMetalMat);
      monitorBezel.position.set(0.06, 1.24, 0.295);
      monitorBezel.rotation.x = -0.14;
      g.add(monitorBezel);

      const { texture, ctx } = createTerminalScreen(def.zone);
      const scrMat = new THREE.MeshStandardMaterial({
        color: 0x424a52,
        map: texture,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: texture,
        emissiveIntensity: 0.7,
        roughness: 0.72,
        metalness: 0.05,
      });
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.41), scrMat);
      scr.position.set(0.06, 1.24, 0.318);
      scr.rotation.x = -0.14;
      g.add(scr);

      for (let b = 0; b < 4; b++) {
        const btn = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.055, 0.03), buttonWhiteMat);
        btn.position.set(-0.33, 1.38 - b * 0.088, 0.302);
        g.add(btn);
      }

      const deckShelf = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.12, 0.24), silverShellMat);
      deckShelf.position.set(0, 0.94, 0.36);
      deckShelf.rotation.x = 0.2;
      g.add(deckShelf);

      const holderBezel = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.18), darkMetalMat);
      holderBezel.position.set(-0.24, 1.005, 0.37);
      holderBezel.rotation.x = 0.2;
      const padMat = new THREE.MeshStandardMaterial({
        color: 0x3a6474,
        map: this.textures.suicaTouchPad,
        emissive: new THREE.Color(0x28c4b8),
        emissiveMap: this.textures.suicaTouchPad,
        emissiveIntensity: 0.85,
        roughness: 0.44,
      });
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.02, 0.14), padMat);
      pad.position.set(-0.24, 1.022, 0.375);
      pad.rotation.x = 0.2;
      const holderLip = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.02, 0.015), this.props.clearGlassMat);
      holderLip.position.set(-0.24, 1.01, 0.445);
      g.add(holderBezel, pad, holderLip);

      // 3x4 Embossed metallic numeric keypad on console deck
      const kpBase = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.02, 0.12), darkMetalMat);
      kpBase.position.set(-0.02, 1.005, 0.37);
      kpBase.rotation.x = 0.2;
      g.add(kpBase);
      for (let kr = 0; kr < 4; kr++) {
        for (let kc = 0; kc < 3; kc++) {
          const kb = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.01, 0.018), this.props.chromeMat);
          kb.position.set(-0.05 + kc * 0.03, 1.018 - kr * 0.004, 0.335 + kr * 0.022);
          kb.rotation.x = 0.2;
          g.add(kb);
        }
      }

      const coinCup = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.14), darkMetalMat);
      coinCup.position.set(0.14, 1.005, 0.37);
      coinCup.rotation.x = 0.2;
      const coinFunnel = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.018, 0.024, 10), this.props.chromeMat);
      coinFunnel.position.set(0.14, 1.025, 0.35);
      const billBezel = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.04, 0.14), darkMetalMat);
      billBezel.position.set(0.3, 1.005, 0.37);
      billBezel.rotation.x = 0.2;
      const billLed = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.012, 0.012), greenGuideLed);
      billLed.position.set(0.3, 1.032, 0.335);
      const braillePlate = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.012), this.props.chromeMat);
      braillePlate.position.set(-0.24, 0.86, 0.305);
      g.add(coinCup, coinFunnel, billBezel, billLed, braillePlate);

      const lowerFace = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.78), lowerDeckMat);
      lowerFace.position.set(0, 0.51, 0.296);
      const ticketPocket = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.14, 0.06), darkMetalMat);
      ticketPocket.position.set(0, 0.38, 0.278);
      const pocketLip = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.022, 0.04), this.props.chromeMat);
      pocketLip.position.set(0, 0.31, 0.302);
      g.add(lowerFace, ticketPocket, pocketLip);

      const fx = def.x + Math.sin(def.rotY) * 1.0;
      const fz = def.z + Math.cos(def.rotY) * 1.0;
      const floorGlowMat = this.addFloorGlowPool(fx, fz, 3.2, 3.2, 0x3ad6a8, 0.28);

      this.root.add(g);
      this.terminals.push({
        def,
        group: g,
        screenTex: texture,
        screenCtx: ctx,
        padMat,
        floorGlowMat,
        charged: false,
        progress: 0,
      });
    }
  }

  private buildHidingSpots(): void {
    for (const def of HIDING_SPOTS) {
      if (def.kind === 'phonebooth') {
        const { group, doorPivot } = this.props.buildPhoneBooth3D(def);
        const gx = def.x + Math.sin(def.rotY) * 0.85;
        const gz = def.z + Math.cos(def.rotY) * 0.85;
        const phoneGlowMat = this.addFloorGlowPool(gx, gz, 3.6, 3.6, 0x4ae090, 0.36);
        this.root.add(group);
        this.closets.push({ def, group, doorPivot, doorAngle: 0, targetAngle: 0, phoneGlowMat });
      } else {
        const { group, doorPivot } = this.props.buildMaintenanceLocker3D(def);
        this.root.add(group);
        this.closets.push({ def, group, doorPivot, doorAngle: 0, targetAngle: 0 });
      }
    }
  }

  private buildShinjukuPropsAndSignage(): void {
    const darkMetal = this.props.darkSteelMat;

    // 1. Sculpted 3D Golden-Yellow 『のりこし精算機』 Bank next to 13・14番線 stairs
    this.root.add(this.props.buildFareAdjustmentBank(43.0 + DX, (11.0 + CORE_OZ) * CELL));

    const fareAdjustHeader = new THREE.Mesh(
      new THREE.PlaneGeometry(3.4, 0.56),
      new THREE.MeshStandardMaterial({
        color: 0x485058,
        map: this.textures.fareAdjustSign,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: this.textures.fareAdjustSign,
        emissiveIntensity: 0.6,
        roughness: 0.72,
      })
    );
    fareAdjustHeader.position.set(43.0 + DX, 2.68, (11.0 + CORE_OZ) * CELL + 0.08);
    this.root.add(fareAdjustHeader);
    this.addFloorGlowPool(43.0 + DX, (11.0 + CORE_OZ) * CELL + 1.5, 5.2, 3.2, 0xe8c438, 0.2);

    // 2. Ultra-Precise 3D Multi-Door 『Suica コインロッカー』 Banks across ALL wings!
    for (const [lx, lz, ry] of [
      [23.72 + DX, 43.0 + DZ, 0],
      [23.72 + DX, 45.2 + DZ, 0],
      [23.72 + DX, 47.4 + DZ, 0],
      [23.72 + DX, 56.5 + DZ, 0],
      [23.72 + DX, 58.7 + DZ, 0],
      [135.72 + DX, 48.0 + DZ, 0],
      [135.72 + DX, 50.2 + DZ, 0],
      [135.72 + DX, 60.0 + DZ, 0],
      [62.0 + DX, 15.72 + DZ, Math.PI / 2],
      [64.2 + DX, 15.72 + DZ, Math.PI / 2],
      // New megacomplex locker banks: Subnade, South/Busta Concourse, Oedo E01!
      [175.72, 23.0, 0],
      [175.72, 25.2, 0],
      [126.0, 96.28, -Math.PI / 2],
      [128.2, 96.28, -Math.PI / 2],
      [8.28, 13.0, Math.PI],
    ]) {
      this.root.add(this.props.buildSuicaCoinLockerBank3D(lx, lz, ry));
    }

    // 3. Ultra-Precise 3D JR East 『acure』 Smart Vending Pairs (Labeled 3D Bottles/Cans + See-Through Bin!)
    const addAcurePair = (x: number, z: number, rotY: number) => {
      this.root.add(this.props.buildAcureVendingPair(x, z, rotY));
      this.addFloorGlowPool(x + Math.cos(rotY) * 1.1, z - Math.sin(rotY) * 1.1, 3.8, 3.8, 0x8cd2eb, 0.22);
    };
    addAcurePair(4.44 + DX, 38.5 + DZ, 0);            // 西口地下広場
    addAcurePair(34.0 + DX, 15.54 + DZ, Math.PI / 2); // メトロプロムナード
    addAcurePair(119.54 + DX, 54.0 + DZ, Math.PI);    // JR改札内 1〜4番線横
    addAcurePair(135.54 + DX, 65.5 + DZ, Math.PI);    // 東口地下広場・ルミネエスト連絡
    addAcurePair(138.0, 96.44, -Math.PI / 2);         // JR南口・東南口コンコース
    addAcurePair(160.44, 29.0, 0);                    // 新宿サブナード

    // 4. Ultra-Precise DNP 『Ki-Re-i』 証明写真機
    const { group: pbGroup, shadowMesh } = this.props.buildKiReiPhotoBooth3D(PHOTOBOOTH_POS);
    this.photoBoothShadowMesh = shadowMesh;
    this.addFloorGlowPool(PHOTOBOOTH_POS.x, PHOTOBOOTH_POS.z - 1.1, 3.2, 3.2, 0x6ac8e8, 0.24);
    this.root.add(pbGroup);

    // 5. Authentic JR East Kotobuki Perforated Stainless Station Benches!
    this.root.add(this.props.buildKotobukiBench3D(WAIT_BENCH_POS.x, WAIT_BENCH_POS.z, 0));
    this.root.add(this.props.buildKotobukiBench3D(SOUTH_BENCH_POS.x, SOUTH_BENCH_POS.z, Math.PI));

    // 6. Midori-no-Madoguchi Interior Staff Desk behind glass
    const desk = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.82, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x68523e, roughness: 0.48 })
    );
    desk.position.set(MIDORI_DESK_POS.x, 0.41, MIDORI_DESK_POS.z);
    this.root.add(desk);
    const monScreen = new THREE.MeshStandardMaterial({
      color: 0x58c4aa,
      emissive: new THREE.Color(0x229274),
      emissiveIntensity: 0.64,
      roughness: 0.34,
    });
    for (const dxOff of [-1.2, 1.2]) {
      const mx = MIDORI_DESK_POS.x + dxOff;
      const stand = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.16), darkMetal);
      stand.position.set(mx, 0.88, MIDORI_DESK_POS.z);
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.32, 0.08), darkMetal);
      box.position.set(mx, 1.04, MIDORI_DESK_POS.z);
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.26), monScreen);
      scr.position.set(mx, 1.04, MIDORI_DESK_POS.z - 0.045);
      scr.rotation.y = Math.PI;
      const kb = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.025, 0.14), this.props.matteBlackMat);
      kb.position.set(mx, 0.835, MIDORI_DESK_POS.z - 0.24);
      this.root.add(stand, box, scr, kb);
    }

    // 7. Real 3D Recessed 『NewDays 新宿』 Storefront
    this.root.add(this.props.buildNewDaysStorefront3D((31.0 + CORE_OX) * CELL + 0.04, (12.5 + CORE_OZ) * CELL, Math.PI / 2));

    // 8. Authentic JR East Wall-Mounted 『AED』 Emergency Defibrillator Cabinets across 5 key junctions!
    this.root.add(this.props.buildAEDCabinet3D(27.6 * CELL, 8.0 * CELL, 0));               // 東西自由通路・アルプス広場北壁
    this.root.add(this.props.buildAEDCabinet3D(6.0 * CELL, 12.0 * CELL - 0.02, Math.PI));  // 西口広場・新宿の目連絡口
    this.root.add(this.props.buildAEDCabinet3D(23.8 * CELL, 13.0 * CELL, 0));              // JR改札内 9・10番線前
    this.root.add(this.props.buildAEDCabinet3D(40.0 * CELL, 10.6 * CELL, Math.PI / 2));    // 新宿サブナード中央
    this.root.add(this.props.buildAEDCabinet3D(27.0 * CELL, 24.0 * CELL, 0));              // JR南口・バスタ新宿大コンコース

    // 9. Freestanding JR East Multilingual Digital Touch Guidance Kiosks (`新宿駅 構内案内`)!
    this.root.add(this.props.buildDigitalKioskStand3D(28.0 * CELL, 11.4 * CELL, Math.PI)); // アルプス広場
    this.root.add(this.props.buildDigitalKioskStand3D(19.0 * CELL, 24.4 * CELL, 0));       // JR南口・新南改札前
    this.root.add(this.props.buildDigitalKioskStand3D(43.2 * CELL, 3.8 * CELL, -Math.PI / 2)); // サブナード・サンデッキ広場

    // 10. Official JR Shinjuku Station B1F Megacomplex Guide Boards (構内案内図)
    const mapMat = new THREE.MeshStandardMaterial({
      color: 0x485058,
      map: this.textures.stationMap,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: this.textures.stationMap,
      emissiveIntensity: 0.56,
      roughness: 0.72,
    });
    const addWallMap = (x: number, y: number, z: number, ry: number) => {
      const frame = new THREE.Mesh(new THREE.BoxGeometry(2.48, 1.88, 0.06), darkMetal);
      frame.position.set(x, y, z);
      frame.rotation.y = ry;
      const face = new THREE.Mesh(new THREE.PlaneGeometry(2.38, 1.78), mapMat);
      face.position.set(x + Math.sin(ry) * 0.036, y, z + Math.cos(ry) * 0.036);
      face.rotation.y = ry;
      this.root.add(frame, face);
    };
    addWallMap((21.7 + CORE_OX) * CELL, 1.72, (6.0 + CORE_OZ) * CELL + 0.06, 0);
    addWallMap((16.5 + CORE_OX) * CELL, 1.72, (19.0 + CORE_OZ) * CELL - 0.06, Math.PI);
    addWallMap((1.0 + CORE_OX) * CELL + 0.06, 1.72, (11.2 + CORE_OZ) * CELL, Math.PI / 2);
    addWallMap(24.5 * CELL, 1.72, 24.0 * CELL + 0.06, 0);
    addWallMap(40.0 * CELL + 0.06, 1.72, 7.6 * CELL, Math.PI / 2);

    // 11. Iconic Suspended Backlit Directional Signs across ALL 10 megacomplex wings!
    const hangSign = (tex: THREE.CanvasTexture, x: number, z: number, y: number, ry: number, w = 3.4, h = 0.74) => {
      const g = new THREE.Group();
      g.position.set(x, y, z);
      g.rotation.y = ry;
      const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.14), darkMetal);
      const faceMat = new THREE.MeshStandardMaterial({
        color: 0x485058,
        map: tex,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: tex,
        emissiveIntensity: 0.56,
        roughness: 0.74,
      });
      const f1 = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.08, h - 0.06), faceMat);
      f1.position.z = 0.075;
      const f2 = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.08, h - 0.06), faceMat);
      f2.position.z = -0.075;
      f2.rotation.y = Math.PI;
      const rodGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.9, 6);
      const r1 = new THREE.Mesh(rodGeo, darkMetal);
      r1.position.set(-w * 0.38, h * 0.5 + 0.35, 0);
      const r2 = new THREE.Mesh(rodGeo, darkMetal);
      r2.position.set(w * 0.38, h * 0.5 + 0.35, 0);
      g.add(body, f1, f2, r1, r2);
      this.root.add(g);
    };

    hangSign(this.textures.signEastExit, 88.0 + DX, 29.5 + DZ, 3.65, Math.PI / 2, 3.7, 0.78);
    hangSign(this.textures.signWestPassage, 44.0 + DX, 29.5 + DZ, 3.65, Math.PI / 2, 3.7, 0.78);
    hangSign(this.textures.signMidoriTicket, 54.0 + DX, 33.2 + DZ, 3.35, Math.PI / 2, 2.35, 0.58);
    hangSign(this.textures.signMidoriTicket, 70.0 + DX, 33.2 + DZ, 3.35, Math.PI / 2, 2.35, 0.58);
    hangSign(this.textures.signCentralEast, 114.0 + DX, 34.5 + DZ, 3.55, 0, 3.4, 0.72);
    hangSign(this.textures.signNorthMetro, 30.0 + DX, 22.0 + DZ, 3.12, 0, 3.35, 0.72);
    hangSign(this.textures.signNorthMetro, 98.0 + DX, 22.0 + DZ, 3.12, 0, 3.35, 0.72);
    hangSign(this.textures.signWestRotary, 18.0 + DX, 30.8 + DZ, 4.15, Math.PI / 2, 3.7, 0.78);
    hangSign(this.textures.signMetroPromenade, 64.0 + DX, 70.0 + DZ, 3.08, Math.PI / 2, 3.6, 0.74);
    hangSign(this.textures.signSaikyoShonan, 90.0 + DX, 70.0 + DZ, 3.08, Math.PI / 2, 3.6, 0.74);
    // New megacomplex wayfinding signs!
    hangSign(this.textures.signEyeWalkway, 23.0, 38.5, 3.62, Math.PI / 2, 3.8, 0.78);
    hangSign(this.textures.signSubnadeWay, 146.0, 20.0, 3.12, Math.PI / 2, 3.6, 0.74);
    hangSign(this.textures.signSubnadeWay, 155.0, 62.0, 3.12, Math.PI / 2, 3.4, 0.72);
    hangSign(this.textures.signKeioSouthWay, 86.0, 96.0, 3.12, 0, 3.9, 0.76);
    hangSign(this.textures.signKeioSouthWay, 62.0, 102.5, 3.58, Math.PI / 2, 3.8, 0.76);

    // 12. Wide 4-Column JR East Shinjuku LED Departure Board (発車標)
    const dep = createDepartureBoard();
    this.departureBoardTex = dep.texture;
    this.departureBoardCtx = dep.ctx;
    const depMat = new THREE.MeshStandardMaterial({
      color: 0x424a52,
      map: this.departureBoardTex,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: this.departureBoardTex,
      emissiveIntensity: 0.76,
      roughness: 0.7,
    });
    const depGroup = new THREE.Group();
    depGroup.position.set(100.0 + DX, 3.48, 31.0 + DZ);
    depGroup.rotation.y = -Math.PI / 2;
    const depBox = new THREE.Mesh(new THREE.BoxGeometry(4.48, 1.02, 0.24), darkMetal);
    const depHood = new THREE.Mesh(new THREE.BoxGeometry(4.54, 0.05, 0.34), this.props.steelMat);
    depHood.position.y = 0.52;
    const depF1 = new THREE.Mesh(new THREE.PlaneGeometry(4.32, 0.9), depMat);
    depF1.position.z = 0.125;
    const depF2 = new THREE.Mesh(new THREE.PlaneGeometry(4.32, 0.9), depMat);
    depF2.position.z = -0.125;
    depF2.rotation.y = Math.PI;
    for (const rx of [-1.75, 1.75]) {
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.88, 8), darkMetal);
      rod.position.set(rx, 0.92, 0);
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.025, 10), darkMetal);
      plate.position.set(rx, 0.86, 0);
      depGroup.add(rod, plate);
    }
    depGroup.add(depBox, depHood, depF1, depF2);
    this.root.add(depGroup);

    // 13. Ultra-Precise Green-Frame Suspended JR Station Analog Clocks with Real 3D Hands at 00:47!
    this.root.add(this.props.buildJRStationClock3D(64.5 + DX, 3.68, 32.8 + DZ, Math.PI / 2, HIGH_CEILING));
    this.root.add(this.props.buildJRStationClock3D(82.0 + DX, 3.15, 44.2 + DZ, 0, LOW_CEILING));
    this.root.add(this.props.buildJRStationClock3D(106.0 + DX, 3.12, 68.0 + DZ, Math.PI / 2, LOW_CEILING));
    this.root.add(this.props.buildJRStationClock3D(86.0, 3.68, 102.0, 0, HIGH_CEILING));
    this.root.add(this.props.buildJRStationClock3D(168.0, 3.12, 46.0, 0, LOW_CEILING));

    // 14. Framed Station Posters across all wings
    const posters: Array<[number, number, number]> = [
      [33.5 + DX, 24.06 + DZ, 0],
      [105.6 + DX, 24.06 + DZ, 0],
      [48.0 + DX, 75.94 + DZ, Math.PI],
      [84.0 + DX, 75.94 + DZ, Math.PI],
      [4.06 + DX, 26.0 + DZ, Math.PI / 2],
      [135.94 + DX, 54.0 + DZ, -Math.PI / 2],
      [70.0 + DX, 4.06 + DZ, 0],
      [114.0, 96.06, 0],
      [8.06, 62.0, Math.PI / 2],
    ];
    const pGeo = new THREE.PlaneGeometry(1.18, 1.72);
    const fGeo = new THREE.BoxGeometry(1.26, 1.8, 0.04);
    for (const [px, pz, ry] of posters) {
      const pMat = new THREE.MeshStandardMaterial({
        map: this.textures.posterStages[0],
        emissive: new THREE.Color(0xffffff),
        emissiveMap: this.textures.posterStages[0],
        emissiveIntensity: 0.24,
        roughness: 0.56,
      });
      this.posterMats.push(pMat);
      const pg = new THREE.Group();
      pg.position.set(px, 1.76, pz);
      pg.rotation.y = ry;
      const frame = new THREE.Mesh(fGeo, darkMetal);
      frame.position.z = -0.025;
      pg.add(frame, new THREE.Mesh(pGeo, pMat));
      this.root.add(pg);
    }
  }

  private buildRealismClutter(): void {
    // 1. Authentic JR East 3-Compartment Stainless + Clear-Window Recycling Trash Stations
    for (const [bx, bz, bry] of [
      [39.2 + DX, 39.72 + DZ, Math.PI],
      [74.2 + DX, 39.72 + DZ, Math.PI],
      [23.72 + DX, 62.5 + DZ, -Math.PI / 2],
      [56.0 + DX, 15.72 + DZ, Math.PI],
      [119.72 + DX, 60.5 + DZ, -Math.PI / 2],
      [124.28 + DX, 44.5 + DZ, Math.PI / 2],
      [160.28, 35.0, Math.PI / 2], // サブナード
      [74.0, 96.28, 0],            // JR南口コンコース
      [40.0, 107.72, Math.PI],     // 京王モール
    ]) {
      this.root.add(this.props.buildStationTrashBin(bx, bz, bry));
    }

    // 2. Molded Yellow Folding 『足元注意』 Wet-Floor Signs
    this.root.add(this.props.buildWetFloorSign3D(96.5 + DX, 31.8 + DZ, 0.42, false));
    this.root.add(this.props.buildWetFloorSign3D(18.5 + DX, 36.2 + DZ, -0.7, true));
    this.root.add(this.props.buildWetFloorSign3D(93.8 + DX, 79.2 + DZ, 0.25, false));
    this.root.add(this.props.buildWetFloorSign3D(168.4, 34.0, -0.35, false));
    this.root.add(this.props.buildWetFloorSign3D(88.5, 101.0, 0.5, true));

    // 3. Midnight Shinjuku 『終電終了・立入禁止』 Folding Safety Barricades with Amber Beacons!
    this.root.add(this.props.buildSafetyBarricade3D(6.5 + DX, 5.2 + DZ, 0.16));
    this.root.add(this.props.buildSafetyBarricade3D(128.0 + DX, 5.4 + DZ, -0.24));
    this.root.add(this.props.buildSafetyBarricade3D(166.0, 9.2, 0.08));
    this.root.add(this.props.buildSafetyBarricade3D(88.0, 106.5, -0.06));

    // 4. Wall-mounted Japanese Station Fire Alarm Call Boxes (火災報知機)
    const alarmMat = new THREE.MeshStandardMaterial({
      map: this.textures.fireAlarmBox,
      emissive: new THREE.Color(0x6e1014),
      emissiveMap: this.textures.fireAlarmBox,
      emissiveIntensity: 0.42,
      roughness: 0.36,
    });
    const alarmLampMat = new THREE.MeshBasicMaterial({ color: 0xff2824 });
    const alarmRedMat = new THREE.MeshStandardMaterial({ color: 0xaa181c, roughness: 0.36, metalness: 0.4 });
    for (const [ax, az, ary] of [
      [35.2 + DX, 24.08 + DZ, 0],
      [82.8 + DX, 24.08 + DZ, 0],
      [37.4 + DX, 44.08 + DZ, 0],
      [74.0 + DX, 75.92 + DZ, Math.PI],
      [56.0 + DX, 8.08 + DZ, 0],
      [92.08 + DX, 81.2 + DZ, Math.PI / 2],
      [160.08, 46.0, Math.PI / 2],
      [66.0, 96.08, 0],
    ]) {
      const ag = new THREE.Group();
      ag.position.set(ax, 1.38, az);
      ag.rotation.y = ary;
      const abox = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.46, 0.06), alarmMat);
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.036, 0.02, 10), this.props.chromeMat);
      collar.rotation.x = Math.PI / 2;
      collar.position.set(0, 0.135, 0.032);
      const alamp = new THREE.Mesh(new THREE.SphereGeometry(0.025, 10, 8), alarmLampMat);
      alamp.position.set(0, 0.135, 0.044);
      const pushRing = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.062, 0.028, 14), alarmRedMat);
      pushRing.rotation.x = Math.PI / 2;
      pushRing.position.set(0, -0.05, 0.034);
      const pushGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.044, 0.01, 12), this.props.clearGlassMat);
      pushGlass.rotation.x = Math.PI / 2;
      pushGlass.position.set(0, -0.05, 0.05);
      ag.add(abox, collar, alamp, pushRing, pushGlass);
      this.root.add(ag);
    }

    // 5. Ultra-Detailed Abandoned Commuter Clear Vinyl Umbrellas
    this.root.add(this.props.buildVinylUmbrella3D(91.5 + DX, 29.2 + DZ, 0.85));
    this.root.add(this.props.buildVinylUmbrella3D(14.8 + DX, 33.4 + DZ, -0.65));
    this.root.add(this.props.buildVinylUmbrella3D(167.2, 54.0, 1.1));

    // 6. Detailed Forgotten Black Leather Commuter Briefcases!
    this.root.add(this.props.buildBriefcase3D(WAIT_BENCH_POS.x + 1.55, WAIT_BENCH_POS.z + 0.12, -0.38));
    this.root.add(this.props.buildBriefcase3D(SOUTH_BENCH_POS.x - 1.55, SOUTH_BENCH_POS.z - 0.15, 0.45));

    // 7. Scattered Dropped JR Green Paper Tickets & Folded Midnight Newspapers
    const ticketMat = new THREE.MeshStandardMaterial({ color: 0x6ac48a, roughness: 0.72, side: THREE.DoubleSide });
    const paperMat = new THREE.MeshStandardMaterial({
      map: this.textures.loreNotePaper,
      color: 0xd0ccc0,
      roughness: 0.88,
      side: THREE.DoubleSide,
    });
    for (const [tx, tz, tr] of [
      [34.8 + DX, 37.6 + DZ, 0.5], [35.4 + DX, 38.2 + DZ, -0.9], [66.2 + DX, 30.6 + DZ, 1.2],
      [86.2 + DX, 30.2 + DZ, -0.4], [94.2 + DX, 78.4 + DZ, 0.7], [46.0 + DX, 12.2 + DZ, -0.5],
      [14.2 + DX, 62.4 + DZ, 0.9], [16.5, 36.2, 0.4], [88.2, 102.8, -0.6], [166.8, 40.4, 0.8],
    ]) {
      const tk = new THREE.Mesh(new THREE.PlaneGeometry(0.085, 0.055), ticketMat);
      tk.rotation.x = -Math.PI / 2;
      tk.rotation.z = tr;
      tk.position.set(tx, 0.014, tz);
      this.root.add(tk);
    }
    for (const [nx, nz, nr] of [
      [42.5 + DX, 36.4 + DZ, 0.3], [92.8 + DX, 32.2 + DZ, -0.6], [54.8 + DX, 56.2 + DZ, 1.1],
      [15.5 + DX, 34.8 + DZ, -0.4], [108.0 + DX, 68.5 + DZ, 0.7], [34.5, 101.2, 0.5], [168.8, 66.2, -0.3],
    ]) {
      const np = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.24), paperMat);
      np.rotation.x = -Math.PI / 2;
      np.rotation.z = nr;
      np.position.set(nx, 0.013, nz);
      this.root.add(np);
    }

    // 8. Claw drag marks on dark lower corridor walls!
    const clawMat = new THREE.MeshStandardMaterial({
      map: this.textures.clawDragDecal,
      transparent: true,
      roughness: 0.55,
      depthWrite: false,
    });
    for (const [cx, cz, cry] of [
      [23.92 + DX, 48.8 + DZ, -Math.PI / 2],
      [92.08 + DX, 80.2 + DZ, Math.PI / 2],
      [84.5 + DX, 44.08 + DZ, 0],
      [70.0 + DX, 15.92 + DZ, Math.PI],
      [15.92, 68.0, -Math.PI / 2],
      [160.08, 72.0, Math.PI / 2],
    ]) {
      const cm = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.9), clawMat);
      cm.position.set(cx, 1.32, cz);
      cm.rotation.y = cry;
      this.root.add(cm);
    }

    // 9. Wet Reflective Puddles across all 10 megacomplex wings
    const puddleMat = new THREE.MeshPhysicalMaterial({
      color: 0x141d24,
      alphaMap: this.textures.puddleAlpha,
      roughness: 0.03,
      metalness: 0.18,
      reflectivity: 0.85,
      clearcoat: 0.9,
      clearcoatRoughness: 0.03,
      transparent: true,
      opacity: 0.38,
      envMapIntensity: 1.65,
      depthWrite: false,
    });
    const dropMat = new THREE.MeshBasicMaterial({ color: 0xb0d4dc, transparent: true, opacity: 0.65 });
    const dropGeo = new THREE.CylinderGeometry(0.005, 0.009, 0.11, 5);

    const puddleDefs: Array<[number, number, number, number, number]> = [
      [14.2 + DX, 34.0 + DZ, 2.8, 2.2, PLAZA_CEILING],
      [62.5 + DX, 28.6 + DZ, 1.9, 1.35, HIGH_CEILING],
      [92.2 + DX, 30.2 + DZ, 1.85, 1.3, HIGH_CEILING],
      [48.0 + DX, 12.2 + DZ, 1.8, 1.15, LOW_CEILING],
      [50.2 + DX, 54.6 + DZ, 2.0, 1.2, LOW_CEILING],
      [94.0 + DX, 82.4 + DZ, 1.7, 1.2, LOW_CEILING],
      [112.0 + DX, 68.4 + DZ, 1.8, 1.2, LOW_CEILING],
      [14.0, 36.2, 2.0, 1.35, HIGH_CEILING],     // 新宿の目前
      [168.0, 38.0, 1.9, 1.3, LOW_CEILING],      // サブナード
      [88.0, 102.5, 2.2, 1.4, HIGH_CEILING],     // JR南口・バスタ新宿前
    ];
    puddleDefs.forEach(([px, pz, rx, rz, ceilH], idx) => {
      const pm = new THREE.Mesh(new THREE.PlaneGeometry(rx * 2.2, rz * 2.2), puddleMat);
      pm.rotation.x = -Math.PI / 2;
      pm.rotation.z = idx * 1.17;
      pm.position.set(px, 0.012, pz);
      this.root.add(pm);

      const rMat = new THREE.MeshBasicMaterial({
        map: this.textures.rippleRing,
        color: 0xaad2dc,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const rMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), rMat);
      rMesh.rotation.x = -Math.PI / 2;
      rMesh.position.set(px, 0.015, pz);
      this.root.add(rMesh);

      const dMesh = new THREE.Mesh(dropGeo, dropMat);
      dMesh.position.set(px, ceilH - 0.2, pz);
      dMesh.visible = false;
      this.root.add(dMesh);

      this.puddles.push({
        x: px,
        z: pz,
        rx,
        rz,
        rippleMat: rMat,
        rippleMesh: rMesh,
        ripplePhase: 1,
        dripMesh: dMesh,
        dripY: ceilH - 0.2,
        dripStartY: ceilH - 0.15,
        dripCooldown: 0.7 + idx * 1.1,
      });
    });

    // 10. Ultra-Precise Japanese 『屋内消火栓 総合盤』 Fire Hydrant Cabinets
    for (const [hx, hz, ry] of [
      [28.08 + DX, 52.0 + DZ, Math.PI / 2],
      [119.92 + DX, 56.0 + DZ, -Math.PI / 2],
      [56.0 + DX, 75.92 + DZ, Math.PI],
      [4.08 + DX, 32.0 + DZ, Math.PI / 2],
      [78.0 + DX, 15.92 + DZ, Math.PI],
      [160.08, 60.0, Math.PI / 2],
      [60.0, 96.08, 0],
    ]) {
      this.root.add(this.props.buildFireHydrantCabinet3D(hx, hz, ry));
    }

    // 11. Floor inspection hatches & drainage grates
    const grateMat = new THREE.MeshStandardMaterial({
      map: this.textures.floorGrate,
      normalMap: this.textures.floorGrateNormal,
      normalScale: new THREE.Vector2(1.1, 1.1),
      roughness: 0.48,
      metalness: 0.8,
    });
    for (const [gx, gz, gw, gd, rz] of [
      [GATE_LINE_X - 1.2, GATE_LINE_Z, 2.8, 0.4, Math.PI / 2],
      [55.2 + DX, 32.2 + DZ, 0.75, 0.75, 0],
      [14.0 + DX, 34.0 + DZ, 1.6, 1.6, 0],
      [94.0 + DX, 79.0 + DZ, 1.8, 0.38, 0],
      [68.0 + DX, 75.3 + DZ, 2.4, 0.38, 0],
      [54.0 + DX, 14.8 + DZ, 1.8, 0.38, 0],
      [168.0, 18.0, 1.4, 1.4, 0],
      [90.0, 105.0, 2.4, 0.4, 0],
    ]) {
      const gm = new THREE.Mesh(new THREE.PlaneGeometry(gw, gd), grateMat);
      gm.rotation.x = -Math.PI / 2;
      gm.rotation.z = rz;
      gm.position.set(gx, 0.01, gz);
      this.root.add(gm);
    }

    // 12. Ultra-Precise Tracking Security CCTV Cameras across ALL 10 wings!
    const camPositions: Array<[number, number, number]> = [
      [50.0 + DX, HIGH_CEILING - 0.32, 32.2 + DZ],
      [82.0 + DX, HIGH_CEILING - 0.32, 32.2 + DZ],
      [16.0 + DX, PLAZA_CEILING - 0.5, 34.0 + DZ],
      [52.0 + DX, LOW_CEILING - 0.3, 12.0 + DZ],
      [44.0 + DX, LOW_CEILING - 0.3, 45.5 + DZ],
      [104.0 + DX, LOW_CEILING - 0.3, 68.5 + DZ],
      [14.0, HIGH_CEILING - 0.32, 37.5],
      [168.0, LOW_CEILING - 0.3, 44.0],
      [90.0, HIGH_CEILING - 0.32, 102.0],
      [34.0, LOW_CEILING - 0.3, 101.0],
    ];
    camPositions.forEach(([cx, cy, cz], idx) => {
      const { mount, headPivot, ledMat } = this.props.buildSecurityCamera3D(cx, cy, cz);
      this.root.add(mount);
      this.cctvCameras.push({ headPivot, ledMat, worldX: cx, worldZ: cz, phase: idx * 1.4 });
    });

    // 13. Subtle horror warning graffiti in back corridors
    const g1 = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 1.3),
      new THREE.MeshStandardMaterial({
        map: this.textures.graffitiDonotLook,
        transparent: true,
        roughness: 0.78,
        depthWrite: false,
      })
    );
    g1.position.set(8.08, 1.55, 66.0);
    g1.rotation.y = Math.PI / 2;
    this.root.add(g1);

    const g2 = new THREE.Mesh(
      new THREE.PlaneGeometry(2.8, 1.35),
      new THREE.MeshStandardMaterial({
        map: this.textures.graffitiSound,
        transparent: true,
        roughness: 0.78,
        depthWrite: false,
      })
    );
    g2.position.set(95.92 + DX, 1.5, 81.2 + DZ);
    g2.rotation.y = -Math.PI / 2;
    this.root.add(g2);
  }

  private buildNotesAndCoins(): void {
    const noteGeo = new THREE.PlaneGeometry(0.28, 0.36);
    const noteMat = new THREE.MeshStandardMaterial({
      color: 0xeae4d6,
      map: this.textures.loreNotePaper,
      emissive: new THREE.Color(0x463d2c),
      emissiveMap: this.textures.loreNotePaper,
      emissiveIntensity: 0.55,
      roughness: 0.85,
      side: THREE.DoubleSide,
    });
    for (const def of LORE_NOTES) {
      const m = new THREE.Mesh(noteGeo, noteMat);
      m.position.set(def.x, def.y, def.z);
      if (def.vertical) {
        m.rotation.y = def.rotY;
      } else {
        m.rotation.x = -Math.PI / 2;
        m.rotation.z = def.rotY;
      }
      this.root.add(m);
      this.notes.push({ def, mesh: m, read: false });
    }

    const coinGeo = new THREE.CylinderGeometry(0.088, 0.088, 0.022, 20);
    const coinEdgeMat = new THREE.MeshStandardMaterial({
      color: 0xd0d6dc,
      roughness: 0.22,
      metalness: 0.94,
    });
    const coinFaceMat = new THREE.MeshStandardMaterial({
      color: 0xe6ecf0,
      map: this.textures.coin100Yen,
      emissive: new THREE.Color(0x525a64),
      emissiveMap: this.textures.coin100Yen,
      emissiveIntensity: 0.62,
      roughness: 0.16,
      metalness: 0.92,
    });
    const coinMats = [coinEdgeMat, coinFaceMat, coinFaceMat];
    for (const def of COINS) {
      const m = new THREE.Mesh(coinGeo, coinMats);
      m.position.set(def.x, def.y, def.z);
      this.root.add(m);
      this.coinPickups.push({ def, mesh: m, collected: false });
    }
  }

  private buildDustMotes(): void {
    const count = 720;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 4 + Math.random() * (COLS * CELL - 8);
      pos[i * 3 + 1] = 0.25 + Math.random() * 4.4;
      pos[i * 3 + 2] = 4 + Math.random() * (ROWS * CELL - 8);
    }
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(32, 32, 1, 32, 32, 28);
    g.addColorStop(0, 'rgba(225,240,238,0.65)');
    g.addColorStop(0.45, 'rgba(195,220,218,0.22)');
    g.addColorStop(1, 'rgba(195,220,218,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xbcd4d0,
      map: new THREE.CanvasTexture(c),
      size: 0.055,
      transparent: true,
      opacity: 0.22,
      alphaTest: 0.01,
      depthWrite: false,
    });
    this.dustPoints = new THREE.Points(geo, mat);
    this.root.add(this.dustPoints);
  }

  updateTerminalVisual(t: TerminalInstance): void {
    drawTerminalScreen(t.screenCtx, t.def.zone, t.charged, t.progress);
    t.screenTex.needsUpdate = true;
    if (t.charged) {
      t.padMat.color.setHex(0x3ad884);
      t.padMat.emissive.setHex(0x1f9e5a);
      t.floorGlowMat.color.setHex(0x3ad884);
      t.floorGlowMat.opacity = 0.28;
    } else if (t.progress > 0) {
      t.padMat.color.setHex(0xf2cc52);
      t.padMat.emissive.setHex(0xc89a24);
      t.floorGlowMat.color.setHex(0xf2cc52);
      t.floorGlowMat.opacity = 0.56;
    } else {
      t.padMat.color.setHex(0x4be0d6);
      t.padMat.emissive.setHex(0x26c4ba);
      t.floorGlowMat.color.setHex(0x4be0d6);
      t.floorGlowMat.opacity = 0.42;
    }
  }

  // Synchronized 5-Stage Corruption across 『新宿ウォール456』, Ceiling Cove Line LEDs, 『新宿の目』, and all 『J・ADビジョン』 Light-Box Columns!
  setSignageCorruptionStage(stage: number): void {
    const s = Math.max(0, Math.min(4, stage));
    if (s === this.currentSignageStage) return;
    this.currentSignageStage = s;

    // 1. Update 45.6m Shinjuku Wall 456 (anti-glare calibrated so silk & kanji stay crisp!)
    const w456Tex = this.textures.wall456Stages[s];
    this.wall456Mat.map = w456Tex;
    this.wall456Mat.emissiveMap = w456Tex;
    this.wall456Mat.emissiveIntensity = s >= 4 ? 0.82 : 0.56;
    this.wall456Mat.needsUpdate = true;

    // 2. Update J・ADビジョン 70-inch LCD screens
    const sigTex = this.textures.signageStages[s];
    for (const mat of this.signageMats) {
      mat.map = sigTex;
      mat.emissiveMap = sigTex;
      mat.emissiveIntensity = s >= 4 ? 0.78 : 0.54;
      mat.needsUpdate = true;
    }

    // 2b. Subtle unsettling bloodshot/crimson shift in 『新宿の目』 acrylic iris at high corruption
    if (this.eyeIrisMat) {
      if (s >= 3) {
        this.eyeIrisMat.emissive.setHex(0xdd6858);
        this.eyeIrisMat.emissiveIntensity = 0.85;
      } else if (s === 2) {
        this.eyeIrisMat.emissive.setHex(0xe8a878);
        this.eyeIrisMat.emissiveIntensity = 0.72;
      } else {
        this.eyeIrisMat.emissive.setHex(0xfff0d0);
        this.eyeIrisMat.emissiveIntensity = 0.65;
      }
    }

    // 3. Synchronize J・ADビジョン 3-tier LED Light-Boxes & Ceiling Cove Line LEDs!
    if (s === 0) {
      this.coveLineMat.color.setHex(0x6cd8f4);
      this.coveLineMat.emissive.setHex(0x2898e0);
      this.lightBoxTopMat.color.setHex(0x62c4ec);
      this.lightBoxTopMat.emissive.setHex(0x2282cc);
      this.lightBoxMidMat.color.setHex(0x3676d8);
      this.lightBoxMidMat.emissive.setHex(0x164cb8);
      this.lightBoxBotMat.color.setHex(0x5cc0e8);
      this.lightBoxBotMat.emissive.setHex(0x1e7cc4);
    } else if (s === 1) {
      this.coveLineMat.color.setHex(0x88a4ee);
      this.coveLineMat.emissive.setHex(0x3c58d2);
      this.lightBoxTopMat.color.setHex(0x5a8ce8);
      this.lightBoxTopMat.emissive.setHex(0x284cc4);
      this.lightBoxMidMat.color.setHex(0x4030a8);
      this.lightBoxMidMat.emissive.setHex(0x221678);
      this.lightBoxBotMat.color.setHex(0x5a8ce8);
      this.lightBoxBotMat.emissive.setHex(0x284cc4);
    } else if (s === 2) {
      this.coveLineMat.color.setHex(0xb65ae0);
      this.coveLineMat.emissive.setHex(0x7c20b6);
      this.lightBoxTopMat.color.setHex(0xa248d8);
      this.lightBoxTopMat.emissive.setHex(0x6818a0);
      this.lightBoxMidMat.color.setHex(0x5c1488);
      this.lightBoxMidMat.emissive.setHex(0x3e0a60);
      this.lightBoxBotMat.color.setHex(0xa248d8);
      this.lightBoxBotMat.emissive.setHex(0x6818a0);
    } else {
      this.coveLineMat.color.setHex(0xee3038);
      this.coveLineMat.emissive.setHex(0xc2121a);
      this.lightBoxTopMat.color.setHex(0xdc222a);
      this.lightBoxTopMat.emissive.setHex(0xae0c16);
      this.lightBoxMidMat.color.setHex(0x8e0a12);
      this.lightBoxMidMat.emissive.setHex(0x68060c);
      this.lightBoxBotMat.color.setHex(0xdc222a);
      this.lightBoxBotMat.emissive.setHex(0xae0c16);
    }

    const poolColor = s >= 3 ? 0xc8222a : s === 2 ? 0x7c2ab4 : 0x2a7cd4;
    for (const pm of this.signagePoolMats) {
      pm.color.setHex(poolColor);
      pm.opacity = s >= 4 ? 0.24 : 0.14;
    }
    for (const pm of this.wall456PoolMats) {
      pm.color.setHex(poolColor);
      pm.opacity = s >= 4 ? 0.24 : 0.14;
    }

    const pStage = s === 0 ? 0 : s <= 2 ? 1 : 2;
    const pTex = this.textures.posterStages[pStage];
    for (const mat of this.posterMats) {
      mat.map = pTex;
      mat.emissiveMap = pTex;
      mat.needsUpdate = true;
    }
  }

  setExitReady(ready: boolean): void {
    const tex = createGateDisplay(ready);
    this.gateDisplayMat.map = tex;
    this.gateDisplayMat.emissiveMap = tex;
    this.gateDisplayMat.needsUpdate = true;
    this.exitLight.color.setHex(ready ? 0x36dc86 : 0xe03b3b);
    this.exitLight.intensity = ready ? 6.8 : 5.2;
    this.centerPaddleMat.color.setHex(ready ? 0x30c874 : 0xd03838);
    this.centerPaddleMat.emissive.setHex(ready ? 0x146c3a : 0x521212);
  }

  unlockExitShutter(): void {
    this.exitUnlocked = true;
  }

  resetVisuals(): void {
    this.exitUnlocked = false;
    this.shutterOpenProgress = 0;
    this.exitShutter.position.y = HIGH_CEILING * 0.5;
    this.dynamicEventLight.intensity = 0;
    this.photoBoothFlashTimer = 0;
    this.photoBoothShadowMesh.visible = false;
    this.phantomTrainTimer = 0;
    this.wall456FlashTimer = 0;
    this.payphoneRingActive = false;
    if (this.eyePupilGroup) {
      this.eyePupilGroup.position.x = 0;
      this.eyePupilGroup.rotation.z = 0;
    }
    if (this.eyeIrisMat) {
      this.eyeIrisMat.emissive.setHex(0xfff0d0);
      this.eyeIrisMat.emissiveIntensity = 0.65;
    }
    for (const gp of this.gatePaddles) {
      gp.leftPivot.rotation.y = 0;
      gp.rightPivot.rotation.y = 0;
    }
    this.setExitReady(false);
    this.setSignageCorruptionStage(0);
    for (const fl of this.flickerLights) {
      fl.killedTimer = 0;
      fl.blowoutDelay = 0;
    }
    for (const t of this.terminals) {
      t.charged = false;
      t.progress = 0;
      this.updateTerminalVisual(t);
    }
    for (const c of this.closets) {
      c.doorAngle = 0;
      c.targetAngle = 0;
      c.doorPivot.rotation.y = 0;
    }
    for (const n of this.notes) n.read = false;
    for (const c of this.coinPickups) {
      c.collected = false;
      c.mesh.visible = true;
    }
  }

  update(
    dt: number,
    elapsed: number,
    charges: number,
    rabbitPos: { x: number; z: number },
    blackoutTimer: number,
    playerPos?: { x: number; z: number }
  ): void {
    this.departureAccum += dt;
    if (this.departureAccum >= 0.16) {
      this.departureAccum = 0;
      updateDepartureBoard(this.departureBoardCtx, charges, elapsed, charges >= this.terminals.length);
      this.departureBoardTex.needsUpdate = true;
    }

    // Authentic West Shinjuku Moving Walkways (North belt glides West, South belt glides East)
    if (this.movingBeltWestTex) {
      this.movingBeltWestTex.offset.x = (this.movingBeltWestTex.offset.x + dt * 0.42) % 1;
    }
    if (this.movingBeltEastTex) {
      this.movingBeltEastTex.offset.x = (this.movingBeltEastTex.offset.x - dt * 0.42 + 1) % 1;
    }

    // Yoshiko Miyashita's 1969 『新宿の目』(Eye of Shinjuku): slow hypnotic iris rotation + eerie pupil tracking!
    if (this.eyePupilGroup) {
      this.eyePupilGroup.rotation.z = elapsed * 0.18;
      let targetX = Math.sin(elapsed * 0.35) * 0.24;
      let targetY = 0;
      if (playerPos) {
        const dxEye = playerPos.x - EYE_OF_SHINJUKU_POS.x;
        const dzEye = playerPos.z - EYE_OF_SHINJUKU_POS.z;
        const distEye = Math.hypot(dxEye, dzEye);
        if (distEye < 16.0 && dzEye > -1.0) {
          targetX = Math.max(-0.56, Math.min(0.56, dxEye * 0.095));
          targetY = Math.max(-0.14, Math.min(0.14, (1.62 - EYE_OF_SHINJUKU_POS.y) * 0.25));
        }
      }
      this.eyePupilGroup.position.x += (targetX - this.eyePupilGroup.position.x) * Math.min(1, dt * 3.2);
      this.eyePupilGroup.position.y += (targetY - this.eyePupilGroup.position.y) * Math.min(1, dt * 3.2);
    }

    // Restore Shinjuku Wall 456 after subliminal crimson shock flash
    if (this.wall456FlashTimer > 0) {
      this.wall456FlashTimer -= dt;
      if (this.wall456FlashTimer <= 0) {
        const w456Tex = this.textures.wall456Stages[this.currentSignageStage];
        this.wall456Mat.map = w456Tex;
        this.wall456Mat.emissiveMap = w456Tex;
        this.wall456Mat.emissiveIntensity = this.currentSignageStage >= 4 ? 0.82 : 0.56;
        this.wall456Mat.needsUpdate = true;
      }
    }

    // Subtle rhythmic red blink on ceiling smoke detectors
    for (let i = 0; i < this.smokeLedMats.length; i++) {
      const pulse = Math.sin(elapsed * 1.8 + i * 1.7) > 0.92 ? 0xff262c : 0x2a080a;
      this.smokeLedMats[i].color.setHex(pulse);
    }

    if (playerPos && this.terminals.length > 0) {
      let bestT = this.terminals[0];
      let bestD = Infinity;
      for (const t of this.terminals) {
        const d = Math.hypot(t.def.x - playerPos.x, t.def.z - playerPos.z);
        if (d < bestD) {
          bestD = d;
          bestT = t;
        }
      }
      const lx = bestT.def.x + Math.sin(bestT.def.rotY) * 1.15;
      const lz = bestT.def.z + Math.cos(bestT.def.rotY) * 1.15;
      this.nearestTerminalLight.position.set(lx, 1.55, lz);
      if (bestT.charged) {
        this.nearestTerminalLight.color.setHex(0x3ad884);
        this.nearestTerminalLight.intensity = 1.6;
      } else if (bestT.progress > 0) {
        this.nearestTerminalLight.color.setHex(0xf2cc52);
        this.nearestTerminalLight.intensity = 3.2;
      } else {
        this.nearestTerminalLight.color.setHex(0x4be0a8);
        this.nearestTerminalLight.intensity = 2.4;
      }
    }

    for (let i = 0; i < this.flickerLights.length; i++) {
      const fl = this.flickerLights[i];
      if (fl.blowoutDelay > 0) {
        fl.blowoutDelay -= dt;
        if (fl.blowoutDelay <= 0) {
          fl.killedTimer = 10.5;
          this.spawnSparks(fl.x, fl.y - 0.14, fl.z, 20);
        }
      }
      if (fl.killedTimer > 0) {
        fl.killedTimer = Math.max(0, fl.killedTimer - dt);
        const dying = fl.killedTimer < 1.2 && Math.sin(elapsed * 52 + fl.phase) > 0.85 ? 0.35 : 0.01;
        fl.currentIntensity = dying;
        fl.currentColor = fl.baseColor;
        fl.tubeMat.emissiveIntensity = dying * 0.9;
        if (fl.glowMat) fl.glowMat.opacity = dying * 0.04;
        if (fl.floorPoolMat) fl.floorPoolMat.opacity = dying * 0.04;
        continue;
      }
      if (blackoutTimer > 0) {
        fl.currentIntensity = 0.02;
        fl.currentColor = fl.baseColor;
        fl.tubeMat.emissiveIntensity = 0.04;
        if (fl.glowMat) fl.glowMat.opacity = 0.005;
        if (fl.floorPoolMat) fl.floorPoolMat.opacity = 0.005;
        continue;
      }

      // Expanded 14.5m terrifying EM shadow aura around the Purple Rabbit!
      const dRabbit = Math.hypot(rabbitPos.x - fl.x, rabbitPos.z - fl.z);
      const emField = Math.max(0, 1 - dRabbit / 14.5);
      const decay = Math.max(0.46, 1 - charges * 0.09);
      let flick = 1.0;
      const wave = Math.sin(elapsed * 19 + fl.phase) * Math.sin(elapsed * 43 + fl.phase * 2.1);
      if (emField > 0.12) {
        flick =
          Math.sin(elapsed * 43 + fl.phase * 5) > 0.44 - emField * 0.55
            ? 0.02 + Math.random() * 0.14
            : 0.42 + Math.abs(wave) * 0.46;
      } else if (charges >= 1 && (i + charges) % 3 === 0 && wave > 0.72) {
        flick = 0.16;
      }

      if (charges >= 5 && i % 2 === 1) {
        const pulse = 0.44 + 0.56 * Math.sin(elapsed * 7.2 + fl.phase);
        fl.currentColor = 0xd82830;
        fl.currentIntensity = fl.baseIntensity * 0.95 * pulse;
        fl.tubeMat.emissive.setHex(0xd82830);
        fl.tubeMat.emissiveIntensity = 1.15 * pulse;
        if (fl.glowMat) {
          fl.glowMat.color.setHex(0xd83a3a);
          fl.glowMat.opacity = 0.075 * pulse;
        }
        if (fl.floorPoolMat) {
          fl.floorPoolMat.color.setHex(0xd82e2e);
          fl.floorPoolMat.opacity = 0.11 * pulse;
        }
      } else {
        fl.currentColor = fl.baseColor;
        fl.currentIntensity = fl.baseIntensity * decay * flick;
        fl.tubeMat.emissive.setHex(fl.tubeColor);
        fl.tubeMat.emissiveIntensity = 1.0 * flick;
        if (fl.glowMat) {
          fl.glowMat.color.setHex(fl.baseColor);
          fl.glowMat.opacity = 0.055 * decay * flick;
        }
        if (fl.floorPoolMat) {
          fl.floorPoolMat.color.setHex(fl.baseColor);
          fl.floorPoolMat.opacity = 0.075 * decay * flick;
        }
      }
    }

    // Bind our 12 pooled dynamic PointLights smoothly to the 12 fixtures nearest the player/camera!
    const focusX = playerPos ? playerPos.x : PEDESTAL_POS.x - 14.0;
    const focusZ = playerPos ? playerPos.z : PEDESTAL_POS.z;
    const ranked = this.flickerLights
      .map((fl) => ({ fl, d: Math.hypot(fl.x - focusX, fl.z - focusZ) }))
      .sort((a, b) => a.d - b.d);

    for (let i = 0; i < this.pointLightPool.length; i++) {
      const pl = this.pointLightPool[i];
      const entry = ranked[i];
      if (!entry || entry.d > 48) {
        pl.intensity = 0;
        continue;
      }
      const fade = Math.min(1, Math.max(0, (48 - entry.d) / 14));
      pl.position.set(entry.fl.x, entry.fl.y - 0.55, entry.fl.z);
      pl.color.setHex(entry.fl.currentColor);
      pl.intensity = entry.fl.currentIntensity * fade;
    }

    if (blackoutTimer > 0) {
      this.concourseShadowSpot.intensity = 0;
    } else {
      const em =
        Math.hypot(rabbitPos.x - PEDESTAL_POS.x, rabbitPos.z - PEDESTAL_POS.z) < 11.5 &&
        Math.sin(elapsed * 41) > 0.58
          ? 0.16
          : 1;
      this.concourseShadowSpot.intensity = 11.5 * Math.max(0.48, 1 - charges * 0.09) * em;
    }

    if (this.photoBoothFlashTimer > 0) {
      this.photoBoothFlashTimer = Math.max(0, this.photoBoothFlashTimer - dt);
      this.dynamicEventLight.position.set(PHOTOBOOTH_POS.x - 0.15, 1.35, PHOTOBOOTH_POS.z - 0.9);
      this.dynamicEventLight.color.setHex(0xeef8ff);
      this.dynamicEventLight.intensity = (this.photoBoothFlashTimer / 0.42) * 24;
      if (this.photoBoothFlashTimer <= 0.04) this.photoBoothShadowMesh.visible = false;
    } else if (this.phantomTrainTimer > 0) {
      this.phantomTrainTimer = Math.max(0, this.phantomTrainTimer - dt);
      const t = 1 - this.phantomTrainTimer / 5.2;
      const env = Math.sin(t * Math.PI);
      const strobe = 0.55 + 0.45 * Math.sin(elapsed * 28);
      this.dynamicEventLight.color.setHex(0xd8f4ff);
      this.dynamicEventLight.position.set(44.0 + DX, 1.8, 42 + DZ + t * 24);
      this.dynamicEventLight.intensity = env * strobe * 22;
    } else if (this.exitUnlocked) {
      this.dynamicEventLight.color.setHex(0x98d8f0);
      this.dynamicEventLight.position.set(GATE_LINE_X + 2.5, 2.6, GATE_LINE_Z);
      this.dynamicEventLight.intensity = this.shutterOpenProgress * 18;
    } else {
      this.dynamicEventLight.intensity = 0;
    }

    for (const c of this.closets) {
      if (c.phoneGlowMat) {
        c.phoneGlowMat.opacity = this.payphoneRingActive
          ? 0.36 + Math.abs(Math.sin(elapsed * 18)) * 0.48
          : 0.32 + Math.sin(elapsed * 1.4) * 0.05;
      }
      c.doorAngle += (c.targetAngle - c.doorAngle) * Math.min(1, dt * 8);
      c.doorPivot.rotation.y = c.doorAngle;
    }

    this.brokenLampTimer -= dt;
    if (this.brokenLampTimer <= 0) {
      this.brokenLampTimer = 3.2 + Math.random() * 4.8;
      this.spawnSparks(94.0 + DX, LOW_CEILING - 0.26, 81.0 + DZ, 8);
    }

    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const sp = this.sparks[i];
      sp.life -= dt;
      if (sp.life <= 0) {
        this.root.remove(sp.mesh);
        this.sparks.splice(i, 1);
        continue;
      }
      sp.vy -= 9.5 * dt;
      sp.mesh.position.x += sp.vx * dt;
      sp.mesh.position.y += sp.vy * dt;
      sp.mesh.position.z += sp.vz * dt;
      if (sp.mesh.position.y < 0.02) {
        sp.mesh.position.y = 0.02;
        sp.vy = Math.abs(sp.vy) * 0.35;
        sp.vx *= 0.6;
        sp.vz *= 0.6;
      }
      sp.mesh.rotation.x += dt * 14;
      sp.mesh.rotation.z += dt * 11;
    }

    for (const p of this.puddles) {
      if (p.dripCooldown > 0) {
        p.dripCooldown -= dt;
        if (p.dripCooldown <= 0) {
          p.dripY = p.dripStartY;
          p.dripMesh.position.y = p.dripY;
          p.dripMesh.visible = true;
        }
      } else {
        p.dripY -= dt * 7.8;
        p.dripMesh.position.y = p.dripY;
        if (p.dripY <= 0.04) {
          p.dripMesh.visible = false;
          p.dripCooldown = 2.4 + Math.random() * 4.0;
          p.ripplePhase = 0;
        }
      }
      if (p.ripplePhase < 1) {
        p.ripplePhase = Math.min(1, p.ripplePhase + dt * 0.85);
        const s = 0.2 + p.ripplePhase * 1.5;
        p.rippleMesh.scale.set(s, s, 1);
        p.rippleMat.opacity = (1 - p.ripplePhase) * 0.6;
      } else {
        p.rippleMat.opacity = 0;
      }
    }

    if (playerPos) {
      for (const cam of this.cctvCameras) {
        let diff = Math.atan2(playerPos.x - cam.worldX, playerPos.z - cam.worldZ) - cam.headPivot.rotation.y;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        cam.headPivot.rotation.y += diff * Math.min(1, dt * 1.45);
        cam.headPivot.rotation.x = 0.35;
        cam.ledMat.color.setHex(Math.sin(elapsed * 3.5 + cam.phase) > 0 ? 0xff2222 : 0x340808);
      }
    }

    if (charges >= this.terminals.length && !this.exitUnlocked) {
      const pulse = 0.6 + 0.4 * Math.sin(elapsed * 7.5);
      this.exitLight.intensity = 8.2 + pulse * 5.8;
    }

    if (this.exitUnlocked && this.shutterOpenProgress < 1) {
      this.shutterOpenProgress = Math.min(1, this.shutterOpenProgress + dt * 0.55);
      const ease = 1 - Math.pow(1 - this.shutterOpenProgress, 2);
      this.exitShutter.position.y = HIGH_CEILING * 0.5 + ease * (HIGH_CEILING - 0.55);
      for (const gp of this.gatePaddles) {
        gp.leftPivot.rotation.y = -ease * 1.42;
        gp.rightPivot.rotation.y = ease * 1.42;
      }
    }

    for (const c of this.coinPickups) {
      if (!c.collected) {
        c.mesh.rotation.y = elapsed * 1.6;
        c.mesh.position.y = c.def.y + Math.sin(elapsed * 3) * 0.015;
      }
    }

    const posAttr = this.dustPoints.geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < posAttr.count; i++) {
      let y = posAttr.getY(i) - dt * 0.04;
      if (y < 0.2) y = 4.1;
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
  }
}
