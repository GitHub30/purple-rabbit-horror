import * as THREE from 'three';
import {
  CELL,
  COINS,
  COLS,
  CoinDef,
  GATE_LINE_X,
  GATE_LINE_Z,
  HIDING_SPOTS,
  HIGH_CEILING,
  HidingSpotDef,
  LOW_CEILING,
  LORE_NOTES,
  LoreNoteDef,
  PEDESTAL_POS,
  PHOTOBOOTH_POS,
  PLATFORM_STAIRS,
  PlatformStairDef,
  ROWS,
  SHINJUKU_GRID,
  TERMINALS,
  TerminalDef,
  WALL_456_SPAN,
  isHighCeiling,
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
  light: THREE.PointLight | null;
  tubeMat: THREE.MeshStandardMaterial;
  glowMat: THREE.SpriteMaterial | null;
  floorPoolMat: THREE.MeshBasicMaterial | null;
  baseIntensity: number;
  x: number;
  z: number;
  y: number;
  phase: number;
  emergency?: boolean;
  killedTimer: number;
  blowoutDelay: number;
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
  terminals: TerminalInstance[] = [];
  closets: HidingSpotInstance[] = [];
  notes: NoteInstance[] = [];
  coinPickups: CoinInstance[] = [];
  private flickerLights: FlickerLight[] = [];
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
  private payphoneRingActive = false;
  private dustPoints!: THREE.Points;
  private currentSignageStage = 0;
  private exitUnlocked = false;
  private shutterOpenProgress = 0;
  private floorPoolGeo = new THREE.PlaneGeometry(1, 1);

  constructor(scene: THREE.Scene) {
    this.textures = createShinjukuTextures();
    this.nearestTerminalLight = new THREE.PointLight(0x4be0d6, 3.6, 11, 1.8);
    this.nearestTerminalLight.position.set(30, 1.6, 20);
    this.dynamicEventLight = new THREE.PointLight(0xeef8ff, 0, 22, 1.5);
    this.dynamicEventLight.position.set(28, 1.5, 32);
    this.root.add(this.nearestTerminalLight, this.dynamicEventLight);

    // Shared synchronized materials for Shinjuku Wall 456, Ceiling Cove Line LEDs, and J・ADビジョン 3-tier Light-Box Columns!
    this.wall456Mat = new THREE.MeshStandardMaterial({
      map: this.textures.wall456Stages[0],
      emissive: new THREE.Color(0xffffff),
      emissiveMap: this.textures.wall456Stages[0],
      emissiveIntensity: 0.98,
      roughness: 0.18,
      metalness: 0.05,
    });
    this.coveLineMat = new THREE.MeshStandardMaterial({
      color: 0x80e8ff,
      emissive: new THREE.Color(0x38b8ff),
      emissiveIntensity: 2.2,
      roughness: 0.15,
    });
    this.lightBoxTopMat = new THREE.MeshStandardMaterial({
      color: 0x74d8ff,
      emissive: new THREE.Color(0x2ca8f8),
      emissiveIntensity: 1.45,
      roughness: 0.22,
    });
    this.lightBoxMidMat = new THREE.MeshStandardMaterial({
      color: 0x3a84f0,
      emissive: new THREE.Color(0x1858d8),
      emissiveIntensity: 1.55,
      roughness: 0.22,
    });
    this.lightBoxBotMat = new THREE.MeshStandardMaterial({
      color: 0x6cd4ff,
      emissive: new THREE.Color(0x289ef0),
      emissiveIntensity: 1.45,
      roughness: 0.22,
    });

    this.buildArchitecture();
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
      opacity,
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
      .filter((c) => c.dFrom < 22 || c.dTo < 16)
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

  private buildArchitecture(): void {
    const totalW = COLS * CELL;
    const totalD = ROWS * CELL;

    // Two-tone 600mm warm grey honed granite patchwork floor (matching jeki_wall456.jpg & shunkosha_jad.jpg!)
    const floorMat = new THREE.MeshStandardMaterial({
      map: this.textures.floorTerrazzo,
      normalMap: this.textures.floorNormal,
      normalScale: new THREE.Vector2(0.55, 0.55),
      roughnessMap: this.textures.floorRoughness,
      roughness: 0.62,
      metalness: 0.14,
      envMapIntensity: 1.65,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(totalW, totalD), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(totalW * 0.5, 0, totalD * 0.5);
    floor.receiveShadow = true;
    this.root.add(floor);

    // Off-white matte linear strip spandrel ceiling (白いスパンドレル／ルーバー天井 matching jeki_wall456.jpg & shinjuku_tr_709B41DD.jpeg!)
    const ceilMat = new THREE.MeshStandardMaterial({
      map: this.textures.ceilingLouver,
      normalMap: this.textures.ceilingNormal,
      normalScale: new THREE.Vector2(0.5, 0.5),
      roughness: 0.48,
      metalness: 0.12,
      envMapIntensity: 1.25,
    });

    const wallMat = new THREE.MeshStandardMaterial({
      map: this.textures.wallTile,
      normalMap: this.textures.wallNormal,
      normalScale: new THREE.Vector2(0.65, 0.65),
      roughnessMap: this.textures.wallRoughness,
      roughness: 0.56,
      metalness: 0.08,
      envMapIntensity: 1.15,
    });

    const pillarMat = new THREE.MeshStandardMaterial({
      map: this.textures.pillarMetal,
      normalMap: this.textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.32, 0.32),
      roughness: 0.28,
      metalness: 0.36,
      envMapIntensity: 1.45,
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
    const ceilGeo = new THREE.PlaneGeometry(CELL, CELL);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = SHINJUKU_GRID[r][c];
        const x = (c + 0.5) * CELL;
        const z = (r + 0.5) * CELL;

        if (cell === 1) {
          // r=5, c=9..11 (x=36..48m, z=20..24m) is the glass-fronted 『みどりの窓口 Ticket Office』 bay
          if (r === 5 && c >= 9 && c <= 11) continue;
          const w = new THREE.Mesh(wallGeo, wallMat);
          w.position.set(x, HIGH_CEILING * 0.5, z);
          w.receiveShadow = true;
          this.root.add(w);
          continue;
        }

        const ch = isHighCeiling(c, r) ? HIGH_CEILING : LOW_CEILING;
        const ceil = new THREE.Mesh(ceilGeo, ceilMat);
        ceil.rotation.x = Math.PI / 2;
        ceil.position.set(x, ch, z);
        this.root.add(ceil);

        // Bulkhead soffits where 東西自由通路 ceiling meets lower gate/platform ceiling
        if (isHighCeiling(c, r)) {
          const diff = HIGH_CEILING - LOW_CEILING;
          const by = LOW_CEILING + diff * 0.5;
          const dirs: Array<[number, number, number, number, number]> = [
            [-1, 0, x - CELL * 0.5, z, Math.PI / 2],
            [1, 0, x + CELL * 0.5, z, Math.PI / 2],
            [0, -1, x, z - CELL * 0.5, 0],
            [0, 1, x, z + CELL * 0.5, 0],
          ];
          for (const [dc, dr, bx, bz, ry] of dirs) {
            const nc = c + dc;
            const nr = r + dr;
            if (
              nc >= 0 &&
              nc < COLS &&
              nr >= 0 &&
              nr < ROWS &&
              SHINJUKU_GRID[nr][nc] !== 1 &&
              !isHighCeiling(nc, nr)
            ) {
              const bh = new THREE.Mesh(new THREE.BoxGeometry(CELL, diff, 0.18), wallMat);
              bh.position.set(bx, by, bz);
              bh.rotation.y = ry;
              this.root.add(bh);
            }
          }
        }

        if (cell === 2) {
          // Authentic 『J・ADビジョン新宿駅』 Light-Box Digital Signage Column (しばた工芸躯体)!
          this.buildJAdVisionLightColumn(x, z, pillarMat, frameMat, wallMat);
        } else if (cell === 4) {
          // Authentic JR Shinjuku Platform 7-16 Ascending Staircase with Black Number Pillars & Split Line-Color Header!
          const stairDef = PLATFORM_STAIRS.find((p) => p.col === c) || PLATFORM_STAIRS[0];
          this.buildAuthenticPlatformStairCell(x, z, r === 7, stairDef, frameMat, wallMat);
        }
      }
    }

    // Continuous Ceiling Soffit Drop & Line LED above the J・ADビジョン colonnade row (z = 12.2m, x = 8m..62m)
    // Compare directly with jeki_slides.pdf Page 2 & 3, shibata_pillar.jpg, bizpa_jad.jpg!
    const colonnadeBeam = new THREE.Mesh(new THREE.BoxGeometry(54.0, 0.42, 1.85), wallMat);
    colonnadeBeam.position.set(35.0, HIGH_CEILING - 0.21, 3.5 * CELL);
    this.root.add(colonnadeBeam);

    const colonnadeLineLed = new THREE.Mesh(new THREE.BoxGeometry(53.8, 0.045, 0.08), this.coveLineMat);
    colonnadeLineLed.position.set(35.0, HIGH_CEILING - 0.41, 3.5 * CELL - 0.92);
    this.root.add(colonnadeLineLed);

    // Glass/metal smoke-baffle drop beams (防煙垂れ壁) across 東西自由通路 (matching jeki_slides.pdf Page 3 & 7!)
    const smokeGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xd8e4ea,
      transparent: true,
      opacity: 0.34,
      roughness: 0.08,
      metalness: 0.1,
      clearcoat: 1.0,
    });
    for (const bx of [24.0, 40.0, 56.0]) {
      const topRail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 15.6), frameMat);
      topRail.position.set(bx, HIGH_CEILING - 0.04, 2.5 * CELL);
      const baffle = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.48, 15.6), smokeGlassMat);
      baffle.position.set(bx, HIGH_CEILING - 0.28, 2.5 * CELL);
      this.root.add(topRail, baffle);
    }
  }

  // Exact 3D reproduction of the 『J・ADビジョン新宿駅』 column seen in shibata_pillar.jpg, shunkosha_jad.jpg, bizpa_jad.jpg!
  private buildJAdVisionLightColumn(
    x: number,
    z: number,
    pillarMat: THREE.MeshStandardMaterial,
    frameMat: THREE.MeshStandardMaterial,
    wallMat: THREE.MeshStandardMaterial
  ): void {
    const colW = 1.92; // East-West width
    const colD = 1.54; // North-South depth
    const casingH = 2.95;

    // Upper structural column core from casing top to ceiling
    const upperCore = new THREE.Mesh(
      new THREE.BoxGeometry(colW - 0.16, HIGH_CEILING - casingH, colD - 0.16),
      wallMat
    );
    upperCore.position.set(x, casingH + (HIGH_CEILING - casingH) * 0.5, z);
    this.root.add(upperCore);

    // Dark recessed reveal shadow gap at top of signage casing (shibata_pillar.jpg)
    const reveal = new THREE.Mesh(new THREE.BoxGeometry(colW - 0.04, 0.08, colD - 0.04), frameMat);
    reveal.position.set(x, casingH + 0.04, z);
    this.root.add(reveal);

    // Main satin silver-white aluminum column body
    const body = new THREE.Mesh(new THREE.BoxGeometry(colW, casingH - 0.16, colD), pillarMat);
    body.position.set(x, 0.16 + (casingH - 0.16) * 0.5, z);
    body.castShadow = true;
    body.receiveShadow = true;
    this.root.add(body);

    // Brushed stainless-steel base kickplate (巾木)
    const base = new THREE.Mesh(new THREE.BoxGeometry(colW + 0.03, 0.16, colD + 0.03), frameMat);
    base.position.set(x, 0.08, z);
    this.root.add(base);

    const screenMat = new THREE.MeshStandardMaterial({
      map: this.textures.signageStages[0],
      emissive: new THREE.Color(0xffffff),
      emissiveMap: this.textures.signageStages[0],
      emissiveIntensity: 0.85,
      roughness: 0.16,
      metalness: 0.06,
    });
    this.signageMats.push(screenMat);

    // North & South wide faces (W=1.92m): 70-inch center vertical LCD screen (0.88m x 1.58m)
    // flanked on LEFT and RIGHT by 3-tier glowing frosted LED light-boxes + middle speaker grille (shibata_pillar.jpg!)
    const nsScreenGeo = new THREE.PlaneGeometry(0.88, 1.58);
    const nsBezelGeo = new THREE.BoxGeometry(0.94, 1.64, 0.03);
    const lbPanelGeo = new THREE.PlaneGeometry(0.34, 0.72);
    const lbMidGeo = new THREE.PlaneGeometry(0.34, 0.62);
    const speakerGeo = new THREE.BoxGeometry(0.11, 0.24, 0.035);

    for (const [oz, ry] of [
      [-colD * 0.5, Math.PI],
      [colD * 0.5, 0],
    ] as Array<[number, number]>) {
      const faceGroup = new THREE.Group();
      faceGroup.position.set(x, 0, z + oz);
      faceGroup.rotation.y = ry;

      // Center 70-inch J・ADビジョン LCD screen
      const bezel = new THREE.Mesh(nsBezelGeo, frameMat);
      bezel.position.set(0, 1.56, 0.015);
      const scr = new THREE.Mesh(nsScreenGeo, screenMat);
      scr.position.set(0, 1.56, 0.033);
      faceGroup.add(bezel, scr);

      // Left & Right 3-tier frosted LED light-boxes (柱面LEDライトボックス)
      for (const sx of [-0.68, 0.68]) {
        const topLB = new THREE.Mesh(lbPanelGeo, this.lightBoxTopMat);
        topLB.position.set(sx, 2.38, 0.018);
        const midLB = new THREE.Mesh(lbMidGeo, this.lightBoxMidMat);
        midLB.position.set(sx, 1.62, 0.018);
        const botLB = new THREE.Mesh(lbPanelGeo, this.lightBoxBotMat);
        botLB.position.set(sx, 0.86, 0.018);
        // Embedded black rectangular speaker/sensor slot in middle light-box (exact detail from shibata_pillar.jpg!)
        const spk = new THREE.Mesh(speakerGeo, frameMat);
        spk.position.set(sx, 1.62, 0.022);
        faceGroup.add(topLB, midLB, botLB, spk);
      }
      this.root.add(faceGroup);
    }

    // East & West side faces (D=1.54m): 70-inch center vertical LCD screen + narrower side light-box strips
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
      sideGroup.add(bezel, scr);

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

    // Satin granite floor reflection pool around the glowing light-box column!
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

    // 1. NORTH WALL: 45.6m 『新宿ウォール456』(Shinjuku Wall 456) (x = 20.0m .. 65.6m, z = 4.06m)
    // Compare directly with panasonic_wall456.jpg, jeki_wall456.jpg, jeki_slides.pdf Page 2, 3, 6!
    const wallW = WALL_456_SPAN.xEnd - WALL_456_SPAN.xStart; // 45.6m!
    const wallCX = (WALL_456_SPAN.xStart + WALL_456_SPAN.xEnd) * 0.5;
    const wallZ = WALL_456_SPAN.z;

    // Black stainless-steel plinth below LED wall + fascia surround
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(wallW + 0.6, 0.38, 0.16), darkMetal);
    plinth.position.set(wallCX, 0.19, wallZ + 0.04);
    this.root.add(plinth);

    const backing = new THREE.Mesh(new THREE.BoxGeometry(wallW + 0.5, 2.15, 0.12), darkMetal);
    backing.position.set(wallCX, 1.38, wallZ + 0.02);
    this.root.add(backing);

    // The 45.6m x 1.72m Seamless COB LED Video Wall!
    const ledWall = new THREE.Mesh(new THREE.PlaneGeometry(wallW, WALL_456_SPAN.height), this.wall456Mat);
    ledWall.position.set(wallCX, 1.24, wallZ + 0.09);
    this.root.add(ledWall);

    // Projecting Architectural Soffit Canopy above Shinjuku Wall 456 (panasonic_wall456.jpg & jeki_wall456.jpg)
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(wallW + 1.2, 0.24, 0.58), whiteSoffitMat);
    canopy.position.set(wallCX, 2.48, wallZ + 0.26);
    this.root.add(canopy);

    // Continuous Horizontal Indirect Cove Line LED (天井ラインLED) along the front lip of the canopy!
    const lineLed = new THREE.Mesh(new THREE.BoxGeometry(wallW + 1.0, 0.055, 0.08), this.coveLineMat);
    lineLed.position.set(wallCX, 2.49, wallZ + 0.54);
    this.root.add(lineLed);

    // 10 Embedded Black Rectangular Speaker Grilles above the LED wall (matching panasonic_wall456.jpg & jeki_wall456.jpg!)
    const spkGeo = new THREE.BoxGeometry(0.36, 0.2, 0.08);
    for (let i = 0; i < 10; i++) {
      const sx = WALL_456_SPAN.xStart + 2.2 + i * 4.55;
      const spk = new THREE.Mesh(spkGeo, darkMetal);
      spk.position.set(sx, 2.24, wallZ + 0.08);
      this.root.add(spk);
    }

    // Stainless-steel service door to the right (east) of Shinjuku Wall 456 (matching right edge of jeki_wall456.jpg!)
    const serviceDoor = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 2.15, 0.06),
      new THREE.MeshStandardMaterial({ color: 0xa8aeb4, roughness: 0.35, metalness: 0.65 })
    );
    serviceDoor.position.set(WALL_456_SPAN.xEnd + 0.85, 1.08, wallZ + 0.04);
    this.root.add(serviceDoor);

    // Soft colored floor reflection pools along the 45.6m Shinjuku Wall 456!
    for (let px = 24.0; px <= 62.0; px += 7.6) {
      const pm = this.addFloorGlowPool(px, wallZ + 2.6, 8.8, 5.2, 0x38b8f4, 0.34);
      this.wall456PoolMats.push(pm);
    }

    // 2. SOUTH SIDE OF 東西自由通路: 『きっぷうりば』(c=6..8, x=24..36m) & 『みどりの窓口 Ticket Office』(c=9..12, x=36..52m)
    // Compare directly with shinjuku_tr_709B41DD.jpeg, shunkosha_jad.jpg, bizpa_jad.jpg!
    const southZ = 5.0 * CELL; // z = 20.0m (facing North into 東西自由通路)

    // 2A. 『きっぷうりば』(x = 24.2m .. 35.8m, z = 20.0m):
    // Recessed ticket vending bank + tilted backlit overhead Fare Map (運賃表)!
    const ticketWall = new THREE.Mesh(
      new THREE.PlaneGeometry(11.2, 2.35),
      new THREE.MeshStandardMaterial({
        map: this.textures.ticketMachineFront,
        emissive: new THREE.Color(0xc8e8f0),
        emissiveMap: this.textures.ticketMachineFront,
        emissiveIntensity: 0.48,
        roughness: 0.36,
      })
    );
    ticketWall.position.set(30.0, 1.18, southZ - 0.05);
    ticketWall.rotation.y = Math.PI;
    this.root.add(ticketWall);

    // Tilted backlit overhead Fare & Route Table (運賃表) above きっぷうりば (matching shunkosha_jad.jpg & shinjuku_tr_709B41DD.jpeg!)
    const fareBoard = new THREE.Mesh(
      new THREE.PlaneGeometry(11.0, 0.82),
      new THREE.MeshStandardMaterial({
        map: this.textures.fareTableHeader,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: this.textures.fareTableHeader,
        emissiveIntensity: 0.92,
        roughness: 0.25,
      })
    );
    fareBoard.position.set(30.0, 2.64, southZ - 0.18);
    fareBoard.rotation.y = Math.PI;
    fareBoard.rotation.x = 0.22; // Tilted downward toward commuters just like the real photo!
    this.root.add(fareBoard);
    this.addFloorGlowPool(30.0, southZ - 1.6, 10.5, 3.6, 0xd8f0f8, 0.28);

    // 2B. 『みどりの窓口 Ticket Office』(c=9..11, x = 36.0m .. 48.0m, z = 20.0m .. 24.0m):
    // Exact match to shinjuku_tr_709B41DD.jpeg & bizpa_jad.jpg!
    const midoriEspressoMat = new THREE.MeshStandardMaterial({
      color: 0x261f1d,
      roughness: 0.46,
      metalness: 0.16,
    });
    const jrGreenUpperMat = new THREE.MeshStandardMaterial({
      color: 0x0e6634,
      roughness: 0.42,
      metalness: 0.12,
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xb8d4dc,
      transparent: true,
      opacity: 0.32,
      roughness: 0.06,
      metalness: 0.1,
      reflectivity: 0.95,
      clearcoat: 1.0,
    });

    // Glowing White Backlit Header Signband: "みどりの窓口 Ticket Office" (x = 36.05m .. 47.95m, y = 2.66m)
    const midoriSignMat = new THREE.MeshStandardMaterial({
      map: this.textures.midoriHeader,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: this.textures.midoriHeader,
      emissiveIntensity: 0.95,
      roughness: 0.2,
    });
    const midoriHeaderBox = new THREE.Mesh(new THREE.BoxGeometry(11.96, 0.56, 0.18), darkMetal);
    midoriHeaderBox.position.set(42.0, 2.66, southZ - 0.04);
    const midoriHeaderFace = new THREE.Mesh(new THREE.PlaneGeometry(11.86, 0.5), midoriSignMat);
    midoriHeaderFace.position.set(42.0, 2.66, southZ - 0.135);
    midoriHeaderFace.rotation.y = Math.PI;
    this.root.add(midoriHeaderBox, midoriHeaderFace);

    // JR Forest Green Upper Fascia Wall above みどりの窓口 + Horizontal Silver Air Grille (matching bizpa_jad.jpg & jeki_slides.pdf Page 2!)
    const greenUpperWall = new THREE.Mesh(
      new THREE.BoxGeometry(11.96, HIGH_CEILING - 2.94, 0.22),
      jrGreenUpperMat
    );
    greenUpperWall.position.set(42.0, 2.94 + (HIGH_CEILING - 2.94) * 0.5, southZ - 0.02);
    this.root.add(greenUpperWall);

    const airGrilleMat = new THREE.MeshStandardMaterial({
      color: 0x9aa2a8,
      normalMap: this.textures.brushedMetalNormal,
      roughness: 0.32,
      metalness: 0.78,
    });
    for (const gx of [39.1, 44.9]) {
      const grille = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.4, 0.04), airGrilleMat);
      grille.position.set(gx, 3.46, southZ - 0.14);
      this.root.add(grille);
    }

    // Dark Espresso-Brown Cladding Panels on Left (x=36..38.8) & Right (x=45.2..48.0) of sliding glass entrance (shinjuku_tr_709B41DD.jpeg)
    const leftWallPanel = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.38, 0.22), midoriEspressoMat);
    leftWallPanel.position.set(37.4, 1.19, southZ + 0.05);
    const rightWallPanel = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.38, 0.22), midoriEspressoMat);
    rightWallPanel.position.set(46.6, 1.19, southZ + 0.05);
    this.root.add(leftWallPanel, rightWallPanel);

    // Center Sliding Glass Automatic Doors & Glass Partition (x = 38.8m .. 45.2m)
    const glassPane = new THREE.Mesh(new THREE.BoxGeometry(6.4, 2.34, 0.06), glassMat);
    glassPane.position.set(42.0, 1.17, southZ + 0.12);
    this.root.add(glassPane);
    for (const mx of [38.84, 40.42, 42.0, 43.58, 45.16]) {
      const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.36, 0.11), airGrilleMat);
      mullion.position.set(mx, 1.18, southZ + 0.12);
      this.root.add(mullion);
    }

    // Illuminated interior of みどりの窓口 (visible through the glass sliding doors at all times!)
    const interiorBackWall = new THREE.Mesh(
      new THREE.BoxGeometry(11.96, 3.8, 0.2),
      new THREE.MeshStandardMaterial({
        color: 0xf2efe6,
        emissive: new THREE.Color(0xd8d2c2),
        emissiveIntensity: 0.55,
        roughness: 0.42,
      })
    );
    interiorBackWall.position.set(42.0, 1.9, southZ + 3.9);
    const interiorEastWall = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.8, 4.0), midoriEspressoMat);
    interiorEastWall.position.set(47.9, 1.9, southZ + 2.0);
    const interiorCounter = new THREE.Mesh(
      new THREE.BoxGeometry(8.6, 1.05, 0.8),
      new THREE.MeshStandardMaterial({
        color: 0xd6cab8,
        emissive: new THREE.Color(0x8c8270),
        emissiveIntensity: 0.42,
        roughness: 0.38,
      })
    );
    interiorCounter.position.set(42.0, 0.525, southZ + 2.55);
    const interiorGreenBanner = new THREE.Mesh(
      new THREE.PlaneGeometry(7.6, 0.85),
      new THREE.MeshStandardMaterial({
        color: 0x0e7c42,
        emissive: new THREE.Color(0x128848),
        emissiveIntensity: 0.9,
      })
    );
    interiorGreenBanner.position.set(42.0, 2.0, southZ + 3.78);
    interiorGreenBanner.rotation.y = Math.PI;
    this.root.add(interiorBackWall, interiorEastWall, interiorCounter, interiorGreenBanner);

    // Freestanding Vertical Digital Sign Stand at left entrance of みどりの窓口 (exact detail from shinjuku_tr_709B41DD.jpeg!)
    const standGroup = new THREE.Group();
    standGroup.position.set(36.45, 0, southZ - 0.42);
    const standBase = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.14, 0.56), darkMetal);
    standBase.position.y = 0.07;
    const standBody = new THREE.Mesh(new THREE.BoxGeometry(0.54, 1.62, 0.12), darkMetal);
    standBody.position.y = 0.95;
    const standScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.46, 1.38),
      new THREE.MeshStandardMaterial({
        color: 0x38d878,
        emissive: new THREE.Color(0x148c46),
        emissiveIntensity: 1.1,
      })
    );
    standScreen.position.set(0, 0.98, -0.065);
    standScreen.rotation.y = Math.PI;
    standGroup.add(standBase, standBody, standScreen);
    this.root.add(standGroup);

    // Warm interior counter glow inside みどりの窓口
    this.addFloorGlowPool(42.0, southZ - 0.9, 11.4, 3.4, 0xf4f6f0, 0.32);
  }

  // Exact 3D reproduction of the 4 Real B1F Ticket Gates of JR Shinjuku Station:
  // 1. 西改札 (West Gate, c=3..5, r=5) — matching shinjuku_tr_D9CE0257.jpeg!
  // 2. 東改札 (East Gate, c=15..17, r=5) — matching full_jr1.jpg & shinjuku_tr_22AF0325.jpeg!
  // 3. 中央西改札 (Central West Gate, c=2, r=11..12)
  // 4. 中央東改札 (Central East Gate, c=18, r=11..12)
  private buildFourShinjukuTicketGates(): void {
    const steel = new THREE.MeshStandardMaterial({
      color: 0xc4ccd4,
      normalMap: this.textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.35, 0.35),
      roughness: 0.22,
      metalness: 0.85,
      envMapIntensity: 1.6,
    });
    const darkTop = new THREE.MeshStandardMaterial({ color: 0x161a20, roughness: 0.28, metalness: 0.45 });
    // Iconic JR East EG-20/EG-50 lime-green front/rear end-caps (matching shinjuku_tr_22AF0325.jpeg & shinjuku_tr_D9CE0257.jpeg!)
    const jrGateGreen = new THREE.MeshStandardMaterial({
      color: 0x42a83c,
      roughness: 0.28,
      metalness: 0.18,
    });
    const suicaPad = new THREE.MeshStandardMaterial({
      color: 0x42d4f4,
      emissive: new THREE.Color(0x1da4d8),
      emissiveIntensity: 1.4,
      roughness: 0.18,
    });
    const glossyWhitePillarMat = new THREE.MeshStandardMaterial({
      color: 0xf0f2ee,
      roughness: 0.16,
      metalness: 0.08,
      envMapIntensity: 1.4,
    });
    const blackThresholdMat = new THREE.MeshStandardMaterial({
      color: 0x222528,
      roughness: 0.42,
      metalness: 0.18,
    });

    const addTurnstileUnit = (x: number, z: number, rotY = 0) => {
      const u = new THREE.Group();
      u.position.set(x, 0, z);
      u.rotation.y = rotY;

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.92, 1.46), steel);
      body.position.y = 0.46;
      body.castShadow = true;
      u.add(body);

      // Lime-green front & rear rounded end-caps (shinjuku_tr_22AF0325.jpeg!)
      for (const ez of [-0.71, 0.71]) {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.84, 0.14), jrGateGreen);
        cap.position.set(0, 0.45, ez);
        u.add(cap);
      }

      const top = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 1.5), darkTop);
      top.position.y = 0.94;
      u.add(top);

      // Tilted glowing blue Suica IC reader pads at both ends
      for (const pz of [-0.52, 0.52]) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.03, 0.22), suicaPad);
        pad.position.set(0, 0.975, pz);
        pad.rotation.x = pz > 0 ? 0.22 : -0.22;
        u.add(pad);
      }
      this.root.add(u);
    };

    const buildNorthSouthGatePortal = (
      centerX: number,
      gateZ: number,
      headerTex: THREE.CanvasTexture,
      pillarTex: THREE.CanvasTexture
    ) => {
      // Charcoal-black granite threshold slab across the 12m gate opening (shinjuku_tr_D9CE0257.jpeg!)
      const thresh = new THREE.Mesh(new THREE.PlaneGeometry(12.0, 2.8), blackThresholdMat);
      thresh.rotation.x = -Math.PI / 2;
      thresh.position.set(centerX, 0.006, gateZ);
      this.root.add(thresh);

      // Full-width JR Forest Green Portal Header Fascia (North & South faces)
      const headerMat = new THREE.MeshStandardMaterial({
        map: headerTex,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: headerTex,
        emissiveIntensity: 0.72,
        roughness: 0.28,
      });
      const headerBox = new THREE.Mesh(new THREE.BoxGeometry(12.0, 0.76, 0.34), darkTop);
      headerBox.position.set(centerX, 3.26, gateZ);
      const faceN = new THREE.Mesh(new THREE.PlaneGeometry(11.88, 0.7), headerMat);
      faceN.position.set(centerX, 3.26, gateZ - 0.175);
      faceN.rotation.y = Math.PI;
      const faceS = new THREE.Mesh(new THREE.PlaneGeometry(11.88, 0.7), headerMat);
      faceS.position.set(centerX, 3.26, gateZ + 0.175);
      this.root.add(headerBox, faceN, faceS);

      // Glossy White Central Structural Pillar with Square Green Gate Plaque (shinjuku_tr_D9CE0257.jpeg!)
      const pX = centerX - 1.1;
      const whitePillar = new THREE.Mesh(new THREE.BoxGeometry(1.18, 2.9, 1.18), glossyWhitePillarMat);
      whitePillar.position.set(pX, 1.45, gateZ);
      this.root.add(whitePillar);

      const plaqueMat = new THREE.MeshStandardMaterial({
        map: pillarTex,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: pillarTex,
        emissiveIntensity: 0.65,
        roughness: 0.25,
      });
      const plaqueN = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.92), plaqueMat);
      plaqueN.position.set(pX, 1.72, gateZ - 0.596);
      plaqueN.rotation.y = Math.PI;
      const plaqueS = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.92), plaqueMat);
      plaqueS.position.set(pX, 1.72, gateZ + 0.596);
      this.root.add(plaqueN, plaqueS);

      // Automatic ticket gate turnstiles flanking the white pillar (leaving wide walkable open aisles!)
      for (const ox of [-5.2, -4.1, -2.1, 0.2, 2.8, 4.0, 5.2]) {
        addTurnstileUnit(centerX + ox, gateZ, 0);
      }

      this.addFloorGlowPool(centerX, gateZ, 11.5, 4.2, 0x4ad87a, 0.24);
    };

    // 1. 西改札 (West Gate: c=3..5 -> centerX = 18.0m, gateZ = 20.4m)
    buildNorthSouthGatePortal(18.0, 5.1 * CELL, this.textures.gateHeaderWest, this.textures.gatePillarWest);
    // 2. 東改札 (East Gate: c=15..17 -> centerX = 66.0m, gateZ = 20.4m)
    buildNorthSouthGatePortal(66.0, 5.1 * CELL, this.textures.gateHeaderEast, this.textures.gatePillarEast);

    // 3. 中央西改札 (Central West Gate: c=2, r=11..12 -> x = 10.0m, z = 44m..52m, centerZ = 48.0m)
    const buildEastWestGatePortal = (gateX: number, centerZ: number, headerTex: THREE.CanvasTexture, flip: boolean) => {
      const thresh = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 7.8), blackThresholdMat);
      thresh.rotation.x = -Math.PI / 2;
      thresh.position.set(gateX, 0.006, centerZ);
      this.root.add(thresh);

      const headerMat = new THREE.MeshStandardMaterial({
        map: headerTex,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: headerTex,
        emissiveIntensity: 0.72,
        roughness: 0.28,
      });
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.72, 7.8), darkTop);
      box.position.set(gateX, 3.18, centerZ);
      const face = new THREE.Mesh(new THREE.PlaneGeometry(7.68, 0.66), headerMat);
      face.position.set(gateX + (flip ? -0.165 : 0.165), 3.18, centerZ);
      face.rotation.y = flip ? -Math.PI / 2 : Math.PI / 2;
      this.root.add(box, face);

      for (const oz of [-3.4, -2.3, 2.3, 3.4]) {
        addTurnstileUnit(gateX, centerZ + oz, Math.PI / 2);
      }
    };

    buildEastWestGatePortal(2.5 * CELL, 12.0 * CELL, this.textures.gateHeaderCentralWest, false);
    buildEastWestGatePortal(18.5 * CELL, 12.0 * CELL, this.textures.gateHeaderCentralEast, true);
  }

  // Exact 3D reproduction of Platforms 7-16 Ascending Staircases with Matte Black Number Pillars & Split Line-Color Headers!
  // Compare directly with shinjuku_tr_CB5E0175.jpeg, shinjuku_tr_FD427215.jpeg, shinjuku_tr_22AF0325.jpeg!
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
    // North bay faces North (toward 西改札/東改札); South bay faces South (toward 中央通路)
    g.rotation.y = isNorthBay ? Math.PI : 0;

    const blackPillarMat = new THREE.MeshStandardMaterial({
      color: 0x1a1e22,
      roughness: 0.42,
      metalness: 0.25,
    });
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xc2cad2,
      roughness: 0.24,
      metalness: 0.86,
    });

    // Left & Right Matte Charcoal-Black Entrance Pillars with Giant White Platform Numbers ("16", "15", "14", "13", etc.)!
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
        map: tex,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: tex,
        emissiveIntensity: 0.42,
        roughness: 0.32,
      });
      const plaque = new THREE.Mesh(new THREE.PlaneGeometry(0.68, 1.92), plaqueMat);
      plaque.position.set(px, 1.72, 1.876);
      g.add(plaque);
    }

    // Side stairwell enclosure walls
    for (const sx of [-1.72, 1.72]) {
      const sw = new THREE.Mesh(new THREE.BoxGeometry(0.24, LOW_CEILING, 3.6), wallMat);
      sw.position.set(sx, LOW_CEILING * 0.5, -0.05);
      g.add(sw);
    }

    // Split Line-Color Backlit Staircase Header Sign across top of staircase opening (shinjuku_tr_CB5E0175.jpeg & FD427215.jpeg!)
    const headerTex = this.textures.platformStairHeaders.get(def.id)!;
    const headerMat = new THREE.MeshStandardMaterial({
      map: headerTex,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: headerTex,
      emissiveIntensity: 0.92,
      roughness: 0.25,
    });
    const headerBox = new THREE.Mesh(new THREE.BoxGeometry(3.56, 0.64, 0.18), frameMat);
    headerBox.position.set(0, 2.86, 1.82);
    const headerFace = new THREE.Mesh(new THREE.PlaneGeometry(3.48, 0.58), headerMat);
    headerFace.position.set(0, 2.86, 1.916);
    g.add(headerBox, headerFace);

    // Ascending 3D Staircase Steps rising from B1F (y=0) up toward the 1F Platform (y=2.45m)!
    const stepMat = new THREE.MeshStandardMaterial({ color: 0x484e54, roughness: 0.68 });
    const riserBlueMat = new THREE.MeshStandardMaterial({ color: 0x1c4e82, roughness: 0.45 });
    const yellowEdge = new THREE.MeshBasicMaterial({ color: 0xebb814 });

    for (let i = 0; i < 10; i++) {
      const sy = 0.12 + i * 0.23;
      const sz = 1.45 - i * 0.31;
      const tread = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.12, 0.32), stepMat);
      tread.position.set(0, sy, sz);
      const riser = new THREE.Mesh(new THREE.PlaneGeometry(2.26, 0.18), riserBlueMat);
      riser.position.set(0, sy - 0.08, sz + 0.162);
      const nosing = new THREE.Mesh(new THREE.BoxGeometry(2.28, 0.025, 0.045), yellowEdge);
      nosing.position.set(0, sy + 0.062, sz + 0.14);
      g.add(tread, riser, nosing);
    }

    // Center & Side Stainless-Steel Handrails ascending the stairs (shinjuku_tr_FD427215.jpeg!)
    for (const rx of [-1.08, 0, 1.08]) {
      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 3.6, 8), steelMat);
      rail.position.set(rx, 1.75, 0.05);
      rail.rotation.x = 0.64;
      g.add(rail);
    }

    // Locked iron security grille at bottom/top of stairs
    const barGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.5, 6);
    for (let bx = -1.0; bx <= 1.0; bx += 0.25) {
      const bar = new THREE.Mesh(barGeo, frameMat);
      bar.position.set(bx, 1.25, 1.65);
      g.add(bar);
    }

    // Line-colored floor reflection pool at the foot of the platform stairs!
    this.addFloorGlowPool(x, z + (isNorthBay ? -2.2 : 2.2), 5.6, 4.6, def.glowColor, 0.28);

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
    // Dark stone border strip flanking the yellow tactile blocks (exact detail from shunkosha_jad.jpg & shibata_pillar.jpg!)
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

    const addLine = (x1: number, z1: number, x2: number, z2: number) => {
      const horiz = Math.abs(x2 - x1) > Math.abs(z2 - z1);
      const len = Math.hypot(x2 - x1, z2 - z1);

      // Subtle dark stone border strip under the yellow tactile line (shunkosha_jad.jpg!)
      const bGeo = horiz ? new THREE.PlaneGeometry(len, 0.62) : new THREE.PlaneGeometry(0.62, len);
      const bm = new THREE.Mesh(bGeo, borderMat);
      bm.rotation.x = -Math.PI / 2;
      bm.position.set((x1 + x2) * 0.5, 0.006, (z1 + z2) * 0.5);
      this.root.add(bm);

      const segs = Math.max(1, Math.round(len / 0.56));
      for (let i = 0; i < segs; i++) {
        const t = (i + 0.5) / segs;
        const m = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.52), lineMat);
        m.rotation.x = -Math.PI / 2;
        if (horiz) m.rotation.z = Math.PI / 2;
        m.position.set(x1 + (x2 - x1) * t, 0.008, z1 + (z2 - z1) * t);
        m.receiveShadow = true;
        this.root.add(m);
      }
    };

    // 1. Main East-West Free Passage (東西自由通路) Yellow Tactile Artery (z = 10.6m, x = 6.0m .. 74.0m)
    // Runs right past the J・ADビジョン columns with T-junction branches to 西改札, きっぷうりば, みどりの窓口, 東改札!
    addLine(6.0, 10.6, 74.0, 10.6);
    // Branches South to 西改札 (x=18.0), きっぷうりば (x=30.0), みどりの窓口 (x=43.0), 東改札 (x=66.0)
    addLine(18.0, 10.6, 18.0, 48.0);
    addLine(30.0, 10.6, 30.0, 19.2);
    addLine(43.0, 10.6, 43.0, 19.2);
    addLine(66.0, 10.6, 66.0, 48.0);
    // Branch North-East to East Exit (東口・歌舞伎町地上出口)
    addLine(66.0, 9.0, 74.8, 9.0);
    addDots(18.0, 10.6);
    addDots(30.0, 10.6);
    addDots(43.0, 10.6);
    addDots(66.0, 10.6);
    addDots(74.4, 9.0, 0.65, 2.4);

    // 2. Inside-Gate North Concourse (z = 25.8m) & South Central Passage (中央通路, z = 46.8m)
    addLine(14.0, 25.8, 68.0, 25.8);
    addLine(6.0, 46.8, 78.0, 46.8);
    // Outer West & Outer East Passages
    addLine(6.0, 10.6, 6.0, 46.8);
    addLine(78.0, 18.0, 78.0, 46.8);
  }

  private buildLightingFixtures(): void {
    // 7 strategic pooled real PointLights across the 84m x 60m Shinjuku B1F station +
    // rows of authentic Circular Recessed LED Downlights in 東西自由通路 & Square Recessed LED Panels inside gates!
    const fixtures: Array<{
      x: number;
      z: number;
      h: number;
      intensity: number;
      hasLight?: boolean;
      emergency?: boolean;
      haze?: boolean;
      circular?: boolean;
    }> = [
      // 東西自由通路 (East-West Free Passage: Circular Recessed LED Downlights matching jeki_wall456.jpg & shunkosha_jad.jpg!)
      { x: 16, z: 10, h: HIGH_CEILING, intensity: 11.5, hasLight: true, haze: true, circular: true }, // West Gate Concourse Hero
      { x: 30, z: 9.5, h: HIGH_CEILING, intensity: 13.5, hasLight: true, haze: true, circular: true }, // Wall 456 West-Center Hero
      { x: 44, z: 9.5, h: HIGH_CEILING, intensity: 14.5, hasLight: true, haze: true, circular: true }, // Wall 456 / Midori-no-Madoguchi Hero
      { x: 58, z: 9.5, h: HIGH_CEILING, intensity: 13.5, hasLight: true, haze: true, circular: true }, // Alps Square / Pedestal Hero
      { x: 70, z: 9.5, h: HIGH_CEILING, intensity: 11.5, hasLight: true, haze: true, circular: true }, // East Gate / East Exit Hero
      // Inside-Gate Concourse & Central Passage (Square Recessed LED Panels matching shinjuku_tr_22AF0325.jpeg & B6F2D77D.jpeg!)
      { x: 24, z: 34, h: LOW_CEILING, intensity: 10.5, hasLight: true, haze: true }, // Platforms 13-16 Concourse Hero
      { x: 56, z: 34, h: LOW_CEILING, intensity: 10.5, hasLight: true, haze: true }, // Platforms 7-12 Concourse Hero
      { x: 18, z: 48, h: LOW_CEILING, intensity: 8.5, haze: true }, // Central West Gate
      { x: 42, z: 48, h: LOW_CEILING, intensity: 9.5, emergency: true, haze: true }, // Central Passage Center
      { x: 66, z: 48, h: LOW_CEILING, intensity: 8.5, haze: true }, // Central East Gate
      { x: 6, z: 28, h: LOW_CEILING, intensity: 7.5 }, // West Underground Passage
      { x: 78, z: 28, h: LOW_CEILING, intensity: 7.5 }, // East Lumine Passage
    ];

    const housingMat = new THREE.MeshStandardMaterial({ color: 0xb8bec4, roughness: 0.4, metalness: 0.55 });
    const discGeo = new THREE.CircleGeometry(0.24, 16);
    const rimGeo = new THREE.RingGeometry(0.24, 0.29, 16);
    const sqPanelGeo = new THREE.PlaneGeometry(0.88, 0.88);
    const sqRimGeo = new THREE.BoxGeometry(0.98, 0.05, 0.98);

    fixtures.forEach((f, idx) => {
      const colHex = f.emergency ? 0xffd088 : 0xf4faf8;
      const tubeMat = new THREE.MeshStandardMaterial({
        color: colHex,
        emissive: new THREE.Color(colHex),
        emissiveIntensity: 2.4,
        roughness: 0.15,
      });

      if (f.circular) {
        // Row of 3 recessed circular LED downlights across the width of 東西自由通路 (matching jeki_wall456.jpg!)
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
        // Recessed square LED panel light inside gates (matching shinjuku_tr_22AF0325.jpeg & B6F2D77D.jpeg!)
        const frame = new THREE.Mesh(sqRimGeo, housingMat);
        frame.position.set(f.x, f.h - 0.025, f.z);
        const panel = new THREE.Mesh(sqPanelGeo, tubeMat);
        panel.rotation.x = Math.PI / 2;
        panel.position.set(f.x, f.h - 0.052, f.z);
        this.root.add(frame, panel);
      }

      let pt: THREE.PointLight | null = null;
      if (f.hasLight) {
        pt = new THREE.PointLight(f.emergency ? 0xffbd68 : 0xdceef2, f.intensity, 26, 1.55);
        pt.position.set(f.x, f.h - 0.45, f.z);
        this.root.add(pt);
      }

      let glowMat: THREE.SpriteMaterial | null = null;
      if (f.haze) {
        glowMat = new THREE.SpriteMaterial({
          map: this.textures.lightShaftSoft,
          color: f.emergency ? 0xffcc88 : 0xc8eaf2,
          transparent: true,
          opacity: 0.36,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const sp = new THREE.Sprite(glowMat);
        sp.position.set(f.x, f.h - 1.2, f.z);
        sp.scale.set(4.8, 3.0, 1);
        this.root.add(sp);
      }

      const floorPoolMat = this.addFloorGlowPool(
        f.x,
        f.z,
        6.5,
        5.5,
        f.emergency ? 0xffbd68 : 0xc6e4ec,
        0.24
      );

      this.flickerLights.push({
        light: pt,
        tubeMat,
        glowMat,
        floorPoolMat,
        baseIntensity: f.intensity,
        x: f.x,
        z: f.z,
        y: f.h,
        phase: idx * 1.93 + 0.4,
        emergency: f.emergency,
        killedTimer: 0,
        blowoutDelay: 0,
      });
    });

    // Additional rows of recessed circular LED downlights along 東西自由通路 for authentic photo density (jeki_slides.pdf Page 3!)
    const extraDownlightMat = new THREE.MeshStandardMaterial({
      color: 0xf4faf8,
      emissive: new THREE.Color(0xe6f4f2),
      emissiveIntensity: 1.9,
    });
    for (let dx = 10; dx <= 72; dx += 6.2) {
      for (const dz of [5.8, 9.2, 12.8, 16.8]) {
        const disc = new THREE.Mesh(discGeo, extraDownlightMat);
        disc.rotation.x = Math.PI / 2;
        disc.position.set(dx, HIGH_CEILING - 0.018, dz);
        this.root.add(disc);
      }
    }

    // Hero overhead shadow-casting spotlight in 東西自由通路 / アルプス広場
    this.concourseShadowSpot = new THREE.SpotLight(0xdff2f6, 26, 32, Math.PI * 0.46, 0.72, 1.4);
    this.concourseShadowSpot.position.set(PEDESTAL_POS.x - 2.0, HIGH_CEILING - 0.18, PEDESTAL_POS.z);
    this.concourseShadowSpot.target.position.set(PEDESTAL_POS.x + 2.5, 0, PEDESTAL_POS.z);
    this.concourseShadowSpot.castShadow = true;
    this.concourseShadowSpot.shadow.mapSize.set(512, 512);
    this.concourseShadowSpot.shadow.camera.near = 0.8;
    this.concourseShadowSpot.shadow.camera.far = 26;
    this.concourseShadowSpot.shadow.bias = -0.0012;
    this.root.add(this.concourseShadowSpot, this.concourseShadowSpot.target);
  }

  private buildAlpsPedestal(): void {
    const g = new THREE.Group();
    g.position.set(PEDESTAL_POS.x, 0, PEDESTAL_POS.z);
    // Face West (-X) toward the approaching player in 東西自由通路!
    g.rotation.y = -Math.PI / 2;

    const marble = new THREE.MeshStandardMaterial({
      color: 0x1e2328,
      roughness: 0.22,
      metalness: 0.32,
      envMapIntensity: 1.45,
    });
    const brass = new THREE.MeshStandardMaterial({ color: 0xba9c52, roughness: 0.24, metalness: 0.86 });

    const step1 = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.24, 2.05), marble);
    step1.position.y = 0.12;
    step1.castShadow = true;
    step1.receiveShadow = true;
    g.add(step1);

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.56, 1.65), marble);
    body.position.y = 0.52;
    body.castShadow = true;
    body.receiveShadow = true;
    g.add(body);

    const trim = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.04, 1.7), brass);
    trim.position.y = 0.8;
    g.add(trim);

    const plaque = new THREE.Mesh(
      new THREE.PlaneGeometry(1.18, 0.54),
      new THREE.MeshStandardMaterial({ map: this.textures.pedestalPlaque, roughness: 0.38 })
    );
    plaque.position.set(0, 0.5, 0.835);
    g.add(plaque);

    const shardMat = new THREE.MeshPhysicalMaterial({
      color: 0xbce6ee,
      transparent: true,
      opacity: 0.55,
      roughness: 0.05,
      metalness: 0.2,
      reflectivity: 1.0,
      side: THREE.DoubleSide,
    });
    const shards: Array<[number, number, number, number]> = [
      [0.65, -1.25, 0.34, 0.4], [-0.85, -1.1, 0.26, 1.1], [0.22, -1.55, 0.22, 2.2],
      [-0.4, -1.45, 0.3, 0.8], [1.15, -0.7, 0.24, 1.7],
    ];
    for (const [sx, sz, sc, rot] of shards) {
      const m = new THREE.Mesh(new THREE.CircleGeometry(sc, 3), shardMat);
      m.rotation.x = -Math.PI / 2;
      m.rotation.z = rot;
      m.position.set(sx, 0.015, sz);
      g.add(m);
    }

    const posts: Array<[number, number, boolean]> = [
      [-1.4, 1.4, false],
      [1.4, 1.4, false],
      [-1.4, -1.4, false],
      [1.4, -1.4, true],
    ];
    for (const [px, pz, fallen] of posts) {
      const p = new THREE.Group();
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.04, 12), brass);
      base.position.y = 0.02;
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.88, 8), brass);
      pole.position.y = 0.46;
      pole.castShadow = true;
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.046, 10, 10), brass);
      cap.position.y = 0.92;
      p.add(base, pole, cap);
      p.position.set(px, 0, pz);
      if (fallen) {
        p.rotation.z = -Math.PI / 2 + 0.06;
        p.rotation.y = 0.6;
        p.position.set(px + 0.32, 0.05, pz - 0.25);
      }
      g.add(p);
    }

    // Wet muddy purple footprints leading East toward the East Exit & East Gate!
    const fpMat = new THREE.MeshStandardMaterial({
      color: 0x5c2e8a,
      emissive: new THREE.Color(0x220c3b),
      emissiveIntensity: 0.55,
      transparent: true,
      opacity: 0.72,
      roughness: 0.18,
    });
    for (let i = 0; i < 8; i++) {
      const fp = new THREE.Mesh(new THREE.CircleGeometry(0.17, 12), fpMat);
      fp.rotation.x = -Math.PI / 2;
      fp.scale.set(0.85, 1.38, 1);
      fp.position.set((i % 2 === 0 ? -0.24 : 0.24) + i * 0.03, 0.013, -1.4 - i * 0.92);
      g.add(fp);
    }

    this.root.add(g);
  }

  // Final Escape Exit Gate & Rolling Steel Shutter at the East end of 東西自由通路 (東口・歌舞伎町／アルタ方面 地上出口)
  private buildEastExitPortal(): void {
    const gx = GATE_LINE_X;
    const gz = GATE_LINE_Z;
    const steel = new THREE.MeshStandardMaterial({
      color: 0xb2bac2,
      normalMap: this.textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.45, 0.45),
      roughness: 0.24,
      metalness: 0.86,
      envMapIntensity: 1.65,
    });
    const darkTop = new THREE.MeshStandardMaterial({ color: 0x1b2026, roughness: 0.36, metalness: 0.42 });
    const jrGateGreen = new THREE.MeshStandardMaterial({ color: 0x42a83c, roughness: 0.28, metalness: 0.18 });
    const redPaddle = new THREE.MeshStandardMaterial({
      color: 0xd03838,
      emissive: new THREE.Color(0x521212),
      emissiveIntensity: 0.65,
      roughness: 0.3,
    });
    const suicaPad = new THREE.MeshStandardMaterial({
      color: 0x3ec8e8,
      emissive: new THREE.Color(0x1ea0cc),
      emissiveIntensity: 1.45,
      roughness: 0.18,
    });

    // 6 automatic emergency exit gate machines spanning z = 5.4m .. 12.6m at x = GATE_LINE_X
    const zs = [5.4, 7.0, 7.9, 10.1, 11.0, 12.6];
    for (const uz of zs) {
      const unit = new THREE.Group();
      unit.position.set(gx, 0, uz);
      unit.rotation.y = -Math.PI / 2;

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.94, 1.38), steel);
      body.position.y = 0.47;
      body.castShadow = true;
      unit.add(body);

      for (const ez of [-0.67, 0.67]) {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.33, 0.84, 0.14), jrGateGreen);
        cap.position.set(0, 0.45, ez);
        unit.add(cap);
      }

      const top = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 1.4), darkTop);
      top.position.y = 0.96;
      unit.add(top);

      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 0.24), suicaPad);
      pad.position.set(0, 0.99, 0.46);
      pad.rotation.x = 0.24;
      unit.add(pad);

      this.root.add(unit);
    }

    this.centerPaddleMat = new THREE.MeshStandardMaterial({
      color: 0xd03838,
      emissive: new THREE.Color(0x521212),
      emissiveIntensity: 0.65,
      roughness: 0.3,
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
    addLanePaddles(5.4, 7.0, false);
    addLanePaddles(7.9, 10.1, true);
    addLanePaddles(11.0, 12.6, false);

    // Overhead East Exit Status Display (facing West toward the approaching player!)
    const gd = createGateDisplay(false);
    this.gateDisplayMat = new THREE.MeshStandardMaterial({
      map: gd,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: gd,
      emissiveIntensity: 1.0,
      roughness: 0.8,
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
      emissive: new THREE.Color(0x64f0a8),
      emissiveMap: this.textures.signEmergencyExit,
      emissiveIntensity: 1.25,
      roughness: 0.28,
    });
    const exBox = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.44, 1.18), darkTop);
    exBox.position.set(gx + 0.1, 3.55, gz);
    const exFace = new THREE.Mesh(new THREE.PlaneGeometry(1.12, 0.4), exitMat);
    exFace.position.set(gx + 0.03, 3.55, gz);
    exFace.rotation.y = -Math.PI / 2;
    this.root.add(exBox, exFace);

    this.exitLight = new THREE.PointLight(0xe03b3b, 7.8, 16, 1.7);
    this.exitLight.position.set(gx - 0.9, 2.35, gz);
    this.root.add(this.exitLight);

    // Heavy East Exit Rolling Steel Shutter (rises to Kabukicho rain-lit surface stairs!)
    const shutterMat = new THREE.MeshStandardMaterial({
      map: this.textures.shutterMetal,
      normalMap: this.textures.shutterNormal,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughness: 0.44,
      metalness: 0.74,
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
      new THREE.MeshBasicMaterial({ color: 0x9ec8dc })
    );
    nightPortal.position.set(COLS * CELL - 0.15, HIGH_CEILING * 0.5, gz);
    nightPortal.rotation.y = -Math.PI / 2;
    this.root.add(nightPortal);
  }

  private buildChargeTerminals(): void {
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x212a30,
      roughness: 0.36,
      metalness: 0.62,
      envMapIntensity: 1.25,
    });
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x7c848c,
      roughness: 0.28,
      metalness: 0.82,
    });

    for (const def of TERMINALS) {
      const g = new THREE.Group();
      g.position.set(def.x, 0, def.z);
      g.rotation.y = def.rotY;

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.88, 1.9, 0.62), bodyMat);
      body.position.y = 0.95;
      body.castShadow = true;
      body.receiveShadow = true;
      g.add(body);

      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.14, 0.72), trimMat);
      cap.position.set(0, 1.92, 0.04);
      g.add(cap);

      const { texture, ctx } = createTerminalScreen(def.zone);
      const scrMat = new THREE.MeshStandardMaterial({
        map: texture,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: texture,
        emissiveIntensity: 1.2,
        roughness: 0.75,
      });
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.64, 0.6), scrMat);
      scr.position.set(0, 1.36, 0.316);
      g.add(scr);

      const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.1, 0.32), trimMat);
      shelf.position.set(0, 0.92, 0.36);
      g.add(shelf);

      const padMat = new THREE.MeshStandardMaterial({
        color: 0x4ae0d6,
        emissive: new THREE.Color(0x26c4ba),
        emissiveIntensity: 1.6,
        roughness: 0.35,
      });
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.03, 0.22), padMat);
      pad.position.set(0, 0.985, 0.38);
      g.add(pad);

      const fx = def.x + Math.sin(def.rotY) * 1.1;
      const fz = def.z + Math.cos(def.rotY) * 1.1;
      const floorGlowMat = this.addFloorGlowPool(fx, fz, 3.8, 3.8, 0x4be0d6, 0.42);

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
    const lockerMat = new THREE.MeshStandardMaterial({
      color: 0x2e3b46,
      roughness: 0.44,
      metalness: 0.68,
      envMapIntensity: 1.15,
    });
    const innerMat = new THREE.MeshStandardMaterial({ color: 0x0b0e11, roughness: 0.92 });
    const slatMat = new THREE.MeshStandardMaterial({ color: 0x1a2026, roughness: 0.42, metalness: 0.72 });
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xd6b044,
      emissive: new THREE.Color(0x523e12),
      emissiveIntensity: 0.65,
      roughness: 0.36,
    });
    const boothGreen = new THREE.MeshStandardMaterial({ color: 0x165e3a, roughness: 0.36, metalness: 0.52 });
    const boothGlass = new THREE.MeshPhysicalMaterial({
      color: 0xaad8c8,
      transparent: true,
      opacity: 0.32,
      roughness: 0.14,
      clearcoat: 1.0,
    });

    for (const def of HIDING_SPOTS) {
      const g = new THREE.Group();
      g.position.set(def.x, 0, def.z);
      g.rotation.y = def.rotY;

      if (def.kind === 'phonebooth') {
        const back = new THREE.Mesh(new THREE.BoxGeometry(1.06, 2.38, 0.06), boothGreen);
        back.position.set(0, 1.19, -0.48);
        const leftG = new THREE.Mesh(new THREE.BoxGeometry(0.05, 2.32, 0.96), boothGlass);
        leftG.position.set(-0.5, 1.16, 0);
        const rightG = new THREE.Mesh(new THREE.BoxGeometry(0.05, 2.32, 0.96), boothGlass);
        rightG.position.set(0.5, 1.16, 0);
        const roof = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.24, 1.06), boothGreen);
        roof.position.set(0, 2.38, 0);

        const signMat = new THREE.MeshStandardMaterial({
          map: this.textures.signPayphone,
          emissive: new THREE.Color(0x88f6b4),
          emissiveMap: this.textures.signPayphone,
          emissiveIntensity: 1.35,
        });
        const signFace = new THREE.Mesh(new THREE.PlaneGeometry(0.94, 0.22), signMat);
        signFace.position.set(0, 2.38, 0.54);

        const phoneBox = new THREE.Mesh(
          new THREE.BoxGeometry(0.28, 0.36, 0.2),
          new THREE.MeshStandardMaterial({ color: 0x1a8448, roughness: 0.32, metalness: 0.22 })
        );
        phoneBox.position.set(-0.18, 1.32, -0.34);

        const doorPivot = new THREE.Group();
        doorPivot.position.set(-0.48, 0, 0.48);
        const dBottom = new THREE.Mesh(new THREE.BoxGeometry(0.96, 1.16, 0.04), boothGreen);
        dBottom.position.set(0.48, 0.58, 0);
        const dTop = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.44, 0.04), boothGreen);
        dTop.position.set(0.48, 2.08, 0);
        const dGlass = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.72, 0.03), boothGlass);
        dGlass.position.set(0.48, 1.52, 0);
        const dHandle = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.22, 0.07), handleMat);
        dHandle.position.set(0.84, 1.1, 0.04);
        doorPivot.add(dBottom, dTop, dGlass, dHandle);

        const phoneGlowMat = this.addFloorGlowPool(def.x + 0.85, def.z, 3.6, 3.6, 0x4ae090, 0.36);
        g.add(back, leftG, rightG, roof, signFace, phoneBox, doorPivot);
        this.root.add(g);
        this.closets.push({ def, group: g, doorPivot, doorAngle: 0, targetAngle: 0, phoneGlowMat });
      } else {
        const back = new THREE.Mesh(new THREE.BoxGeometry(0.98, 2.26, 0.06), innerMat);
        back.position.set(0, 1.13, -0.45);
        const left = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.26, 0.94), lockerMat);
        left.position.set(-0.47, 1.13, 0);
        const right = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.26, 0.94), lockerMat);
        right.position.set(0.47, 1.13, 0);
        const top = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.06, 0.96), lockerMat);
        top.position.set(0, 2.25, 0);

        const doorPivot = new THREE.Group();
        doorPivot.position.set(-0.45, 0, 0.45);
        const lower = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.34, 0.04), lockerMat);
        lower.position.set(0.45, 0.67, 0);
        const upper = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.48, 0.04), lockerMat);
        upper.position.set(0.45, 2.01, 0);
        doorPivot.add(lower, upper);

        for (const sy of [1.44, 1.56, 1.68]) {
          const slat = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.022, 0.045), slatMat);
          slat.position.set(0.45, sy, 0);
          slat.rotation.x = 0.2;
          doorPivot.add(slat);
        }
        const handle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 0.07), handleMat);
        handle.position.set(0.79, 1.08, 0.04);
        const badge = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.05), handleMat);
        badge.position.set(0.45, 1.85, 0.02);
        doorPivot.add(handle, badge);

        g.add(back, left, right, top, doorPivot);
        this.root.add(g);
        this.closets.push({ def, group: g, doorPivot, doorAngle: 0, targetAngle: 0 });
      }
    }
  }

  private buildShinjukuPropsAndSignage(): void {
    const lockerMat = new THREE.MeshStandardMaterial({
      map: this.textures.lockerMetal,
      roughness: 0.4,
      metalness: 0.65,
      envMapIntensity: 1.2,
    });
    const darkMetal = new THREE.MeshStandardMaterial({ color: 0x20262c, roughness: 0.46, metalness: 0.72 });

    // 1. Inside-Gate Yellow 『精算機 Fare Adjustment Machine』 Bank next to 13・14番線 stairs (c=6..8, r=6, z=24.06m)
    // Compare directly with shinjuku_tr_CB5E0175.jpeg!
    const fareAdjustWall = new THREE.Mesh(
      new THREE.PlaneGeometry(5.6, 2.25),
      new THREE.MeshStandardMaterial({
        map: this.textures.fareAdjustFront,
        emissive: new THREE.Color(0xfff0b8),
        emissiveMap: this.textures.fareAdjustFront,
        emissiveIntensity: 0.42,
        roughness: 0.35,
      })
    );
    fareAdjustWall.position.set(27.8, 1.14, 6.0 * CELL + 0.05);
    this.root.add(fareAdjustWall);

    const fareAdjustHeader = new THREE.Mesh(
      new THREE.PlaneGeometry(3.4, 0.56),
      new THREE.MeshStandardMaterial({
        map: this.textures.fareAdjustSign,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: this.textures.fareAdjustSign,
        emissiveIntensity: 0.85,
        roughness: 0.25,
      })
    );
    fareAdjustHeader.position.set(27.8, 2.65, 6.0 * CELL + 0.08);
    this.root.add(fareAdjustHeader);
    this.addFloorGlowPool(27.8, 6.0 * CELL + 1.5, 6.2, 3.2, 0xf2d448, 0.28);

    // 2. Suica Coin Locker banks along West Underground Passage & Central Passage
    for (const lz of [19.0, 21.2, 23.4, 34.5, 36.7]) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.56, 2.1, 1.9), lockerMat);
      m.position.set(7.72, 1.05, lz);
      this.root.add(m);
    }

    // 3. Glowing acure Vending Machines casting cold cyan-white glow onto the granite floor!
    const vendFront = new THREE.MeshStandardMaterial({
      map: this.textures.vendingFront,
      emissive: new THREE.Color(0xdcf4ff),
      emissiveMap: this.textures.vendingFront,
      emissiveIntensity: 1.05,
      roughness: 0.26,
      metalness: 0.24,
    });
    const vendSide = new THREE.MeshStandardMaterial({ color: 0xb6bec4, roughness: 0.42, metalness: 0.4 });
    const vendMats = [vendFront, vendSide, vendSide, vendSide, vendSide, vendSide];
    for (const vz of [39.5, 41.1]) {
      const vm = new THREE.Mesh(new THREE.BoxGeometry(0.84, 1.98, 1.26), vendMats);
      vm.position.set(4.44, 0.99, vz);
      this.root.add(vm);
    }
    this.addFloorGlowPool(5.6, 40.3, 4.2, 4.8, 0x9ce8ff, 0.38);

    // 4. Shinjuku Photo Booth (証明写真機) in Central Passage alcove — triggers camera flash scare!
    const pbGroup = new THREE.Group();
    pbGroup.position.set(PHOTOBOOTH_POS.x, 0, PHOTOBOOTH_POS.z);
    const pbShell = new THREE.Mesh(
      new THREE.BoxGeometry(1.55, 2.25, 1.25),
      new THREE.MeshStandardMaterial({ color: 0x1e2c38, roughness: 0.42, metalness: 0.5 })
    );
    pbShell.position.y = 1.125;
    pbGroup.add(pbShell);

    const pbHeader = new THREE.Mesh(
      new THREE.PlaneGeometry(1.42, 0.48),
      new THREE.MeshStandardMaterial({
        map: this.textures.signPhotoBooth,
        emissive: new THREE.Color(0x9ef0ff),
        emissiveMap: this.textures.signPhotoBooth,
        emissiveIntensity: 1.35,
      })
    );
    pbHeader.position.set(0, 1.96, -0.635);
    pbHeader.rotation.y = Math.PI;
    pbGroup.add(pbHeader);

    const curtainMat = new THREE.MeshStandardMaterial({ color: 0x141a24, roughness: 0.92, side: THREE.DoubleSide });
    const curtain = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 1.62), curtainMat);
    curtain.position.set(0.22, 0.86, -0.64);
    curtain.rotation.y = Math.PI;
    pbGroup.add(curtain);

    this.photoBoothShadowMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.34, 1.55, 10),
      new THREE.MeshBasicMaterial({ color: 0x050208 })
    );
    this.photoBoothShadowMesh.position.set(-0.22, 0.85, -0.52);
    this.photoBoothShadowMesh.visible = false;
    pbGroup.add(this.photoBoothShadowMesh);

    this.addFloorGlowPool(PHOTOBOOTH_POS.x, PHOTOBOOTH_POS.z - 1.1, 3.2, 3.2, 0x76e0ff, 0.34);
    this.root.add(pbGroup);

    // 5. Waiting Bench inside gates between 13・14 and 11・12 stairs
    const benchMat = new THREE.MeshStandardMaterial({ color: 0x56544e, roughness: 0.68 });
    const bench = new THREE.Group();
    bench.position.set(8.6 * CELL, 0, 8.5 * CELL);
    const seat = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.08, 0.58), benchMat);
    seat.position.y = 0.48;
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.36, 0.06), benchMat);
    back.position.set(0, 0.74, -0.26);
    bench.add(seat, back);
    for (const lx of [-1.0, 0, 1.0]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 0.5), darkMetal);
      leg.position.set(lx, 0.24, 0);
      bench.add(leg);
    }
    this.root.add(bench);

    // 6. Midori-no-Madoguchi Interior Counter Desk & Monitors (visible through glass storefront!)
    const desk = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.82, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x68523e, roughness: 0.48 })
    );
    desk.position.set(11.2 * CELL, 0.41, 6.2 * CELL);
    this.root.add(desk);
    const monScreen = new THREE.MeshStandardMaterial({
      color: 0x70e0c4,
      emissive: new THREE.Color(0x28b48e),
      emissiveIntensity: 1.15,
      roughness: 0.2,
    });
    for (const mx of [10.9 * CELL, 11.5 * CELL]) {
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.32, 0.38), darkMetal);
      box.position.set(mx, 0.96, 6.2 * CELL);
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.24), monScreen);
      scr.position.set(mx, 0.96, 6.2 * CELL - 0.2);
      scr.rotation.y = Math.PI;
      this.root.add(box, scr);
    }

    // 7. NewDays 新宿（東口改札外）Shuttered Storefront on East Passage (c=19, z=22..28m)
    // Matches JRE Media official convenience store location!
    const newDays = new THREE.Mesh(
      new THREE.PlaneGeometry(6.8, 2.85),
      new THREE.MeshStandardMaterial({
        map: this.textures.newDaysShutter,
        emissive: new THREE.Color(0x90d898),
        emissiveMap: this.textures.newDaysShutter,
        emissiveIntensity: 0.22,
        roughness: 0.46,
        metalness: 0.54,
      })
    );
    newDays.position.set(19.0 * CELL + 0.04, 1.44, 6.5 * CELL);
    newDays.rotation.y = Math.PI / 2;
    this.root.add(newDays);

    // 8. Official JR Shinjuku Station B1F Guide Boards (構内案内図) mounted at key junctions!
    const mapMat = new THREE.MeshStandardMaterial({
      map: this.textures.stationMap,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: this.textures.stationMap,
      emissiveIntensity: 0.62,
      roughness: 0.3,
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
    addWallMap(14.5 * CELL, 1.72, 1.0 * CELL + 0.06, 0); // 東西自由通路 東側
    addWallMap(11.0 * CELL, 1.72, 13.0 * CELL - 0.06, Math.PI); // 中央通路 中央

    // 9. Iconic Suspended Backlit JR East Directional Signs (matching shunkosha_jad.jpg & bizpa_jad.jpg & jeki_slides.pdf Page 3!)
    const hangSign = (tex: THREE.CanvasTexture, x: number, z: number, y: number, ry: number, w = 3.35, h = 0.74) => {
      const g = new THREE.Group();
      g.position.set(x, y, z);
      g.rotation.y = ry;
      const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.14), darkMetal);
      const faceMat = new THREE.MeshStandardMaterial({
        map: tex,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: tex,
        emissiveIntensity: 0.78,
        roughness: 0.25,
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

    // Suspended signs along 東西自由通路 (facing East/West commuters just like jeki_slides.pdf Page 2 & 3!)
    hangSign(this.textures.signEastExit, 48.0, 9.2, 3.55, Math.PI / 2, 3.65, 0.78);
    hangSign(this.textures.signWestPassage, 26.0, 9.2, 3.55, Math.PI / 2, 3.65, 0.78);
    hangSign(this.textures.signMidoriTicket, 39.0, 12.6, 3.25, Math.PI / 2, 2.35, 0.58);
    hangSign(this.textures.signMidoriTicket, 49.0, 12.6, 3.25, Math.PI / 2, 2.35, 0.58);
    hangSign(this.textures.signCentralEast, 64.0, 14.5, 3.45, 0, 3.35, 0.72);
    hangSign(this.textures.signMetroPromenade, 42.0, 48.0, 3.05, Math.PI / 2, 3.5, 0.72);

    // 10. Wide 4-Column JR East Shinjuku LED Departure Board (発車標 matching shinjuku_tr_9B178FCD.jpeg!)
    const dep = createDepartureBoard();
    this.departureBoardTex = dep.texture;
    this.departureBoardCtx = dep.ctx;
    const depMat = new THREE.MeshStandardMaterial({
      map: this.departureBoardTex,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: this.departureBoardTex,
      emissiveIntensity: 1.05,
      roughness: 0.28,
    });
    const depGroup = new THREE.Group();
    depGroup.position.set(57.5, 3.42, 11.5);
    depGroup.rotation.y = -Math.PI / 2;
    const depBox = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.98, 0.2), darkMetal);
    const depF1 = new THREE.Mesh(new THREE.PlaneGeometry(4.32, 0.9), depMat);
    depF1.position.z = 0.105;
    const depF2 = new THREE.Mesh(new THREE.PlaneGeometry(4.32, 0.9), depMat);
    depF2.position.z = -0.105;
    depF2.rotation.y = Math.PI;
    depGroup.add(depBox, depF1, depF2);
    this.root.add(depGroup);

    // 11. Green-Frame Suspended JR Station Analog Clock stopped at 00:47 (matching jeki_slides.pdf Page 3 & shinjuku_tr_9B178FCD.jpeg!)
    const clockMat = new THREE.MeshStandardMaterial({
      map: this.textures.clockFace,
      emissive: new THREE.Color(0xb8e070),
      emissiveMap: this.textures.clockFace,
      emissiveIntensity: 0.75,
      roughness: 0.28,
    });
    const addJRClock = (x: number, y: number, z: number, ry: number) => {
      const cg = new THREE.Group();
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.56, 0.14),
        new THREE.MeshStandardMaterial({ color: 0x145e32, roughness: 0.4 })
      );
      const f1 = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.5), clockMat);
      f1.position.z = 0.075;
      const f2 = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.5), clockMat);
      f2.position.z = -0.075;
      f2.rotation.y = Math.PI;
      cg.add(box, f1, f2);
      cg.position.set(x, y, z);
      cg.rotation.y = ry;
      this.root.add(cg);
    };
    addJRClock(44.5, 3.62, 12.2, Math.PI / 2); // Exact suspended clock position from jeki_slides.pdf Page 3!
    addJRClock(66.0, 3.15, 22.8, 0);

    // 12. Framed Station Posters
    const posters: Array<[number, number, number]> = [
      [14.0, 4.06, 0],
      [68.0, 4.06, 0],
      [24.0, 51.94, Math.PI],
      [56.0, 51.94, Math.PI],
      [4.06, 26.0, Math.PI / 2],
      [79.94, 34.0, -Math.PI / 2],
    ];
    const pGeo = new THREE.PlaneGeometry(1.18, 1.72);
    const fGeo = new THREE.BoxGeometry(1.26, 1.8, 0.04);
    for (const [px, pz, ry] of posters) {
      const pMat = new THREE.MeshStandardMaterial({
        map: this.textures.posterStages[0],
        emissive: new THREE.Color(0xffffff),
        emissiveMap: this.textures.posterStages[0],
        emissiveIntensity: 0.28,
        roughness: 0.42,
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
    const steel = new THREE.MeshStandardMaterial({
      color: 0x8a929a,
      normalMap: this.textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.45, 0.45),
      roughness: 0.26,
      metalness: 0.88,
      envMapIntensity: 1.65,
    });
    const darkTrim = new THREE.MeshStandardMaterial({ color: 0x1b2024, roughness: 0.5, metalness: 0.36 });

    for (const [bx, bz] of [[24.8, 18.8], [54.2, 18.8], [4.7, 42.2], [75.2, 28.4]]) {
      const bin = new THREE.Group();
      bin.position.set(bx, 0, bz);
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.84, 0.36), steel);
      b.position.y = 0.42;
      b.castShadow = true;
      const top = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.14, 0.38), darkTrim);
      top.position.y = 0.91;
      const hole = new THREE.Mesh(new THREE.CircleGeometry(0.08, 12), darkTrim);
      hole.position.set(0, 0.72, 0.185);
      bin.add(b, top, hole);
      this.root.add(bin);
    }

    const wfMat = new THREE.MeshStandardMaterial({ map: this.textures.wetFloorSign, roughness: 0.48 });
    const addWetSign = (x: number, z: number, ry: number, tipped: boolean) => {
      const g = new THREE.Group();
      const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.62, 0.03), wfMat);
      s1.position.set(0, 0.31, 0.11);
      s1.rotation.x = -0.22;
      const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.62, 0.03), wfMat);
      s2.position.set(0, 0.31, -0.11);
      s2.rotation.x = 0.22;
      g.add(s1, s2);
      g.position.set(x, 0, z);
      g.rotation.y = ry;
      if (tipped) {
        g.rotation.z = Math.PI / 2 - 0.12;
        g.position.y = 0.18;
      }
      this.root.add(g);
    };
    addWetSign(54.8, 11.8, 0.42, false);
    addWetSign(7.1, 26.5, -0.7, true);

    // Mirror-like Wet Reflective Puddles ( reflecting Shinjuku Wall 456 & J・ADビジョン!)
    const puddleMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e2c36,
      alphaMap: this.textures.puddleAlpha,
      roughness: 0.012,
      metalness: 0.22,
      reflectivity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.012,
      transparent: true,
      opacity: 0.42,
      envMapIntensity: 3.6,
      depthWrite: false,
    });
    const dropMat = new THREE.MeshBasicMaterial({ color: 0xcbeaf0, transparent: true, opacity: 0.75 });
    const dropGeo = new THREE.CylinderGeometry(0.005, 0.009, 0.11, 5);

    const puddleDefs: Array<[number, number, number, number, number]> = [
      [48.5, 8.6, 1.9, 1.35, HIGH_CEILING],
      [62.2, 10.2, 1.85, 1.3, HIGH_CEILING],
      [22.4, 9.4, 1.7, 1.2, HIGH_CEILING],
      [34.2, 34.6, 2.0, 1.2, LOW_CEILING],
      [52.4, 48.2, 1.6, 1.15, LOW_CEILING],
    ];
    puddleDefs.forEach(([px, pz, rx, rz, ceilH], idx) => {
      const pm = new THREE.Mesh(new THREE.PlaneGeometry(rx * 2.2, rz * 2.2), puddleMat);
      pm.rotation.x = -Math.PI / 2;
      pm.rotation.z = idx * 1.17;
      pm.position.set(px, 0.012, pz);
      this.root.add(pm);

      const rMat = new THREE.MeshBasicMaterial({
        map: this.textures.rippleRing,
        color: 0xc8eaf0,
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

    // Fire Hydrant Cabinets (消火栓)
    const hydMat = new THREE.MeshStandardMaterial({
      map: this.textures.fireHydrant,
      normalMap: this.textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.25, 0.25),
      roughness: 0.36,
      metalness: 0.55,
    });
    const hydSide = new THREE.MeshStandardMaterial({ color: 0x6e181b, roughness: 0.42, metalness: 0.62 });
    const hydLamp = new THREE.MeshBasicMaterial({ color: 0xff2824 });
    for (const [hx, hz, ry] of [[8.08, 28.0, Math.PI / 2], [71.92, 32.0, -Math.PI / 2], [38.0, 51.92, Math.PI]]) {
      const hg = new THREE.Group();
      hg.position.set(hx, 1.16, hz);
      hg.rotation.y = ry;
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.68, 1.44, 0.14), hydSide);
      const front = new THREE.Mesh(new THREE.PlaneGeometry(0.66, 1.42), hydMat);
      front.position.z = 0.072;
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.044, 10, 10), hydLamp);
      lamp.position.set(-0.12, 0.48, 0.088);
      hg.add(box, front, lamp);
      this.root.add(hg);
    }

    // Floor inspection hatches & drainage grates (matching shinjuku_tr_709B41DD.jpeg!)
    const grateMat = new THREE.MeshStandardMaterial({
      map: this.textures.floorGrate,
      normalMap: this.textures.floorGrateNormal,
      normalScale: new THREE.Vector2(1.1, 1.1),
      roughness: 0.46,
      metalness: 0.84,
    });
    for (const [gx, gz, gw, gd, rz] of [
      [74.2, 9.0, 2.8, 0.4, Math.PI / 2],
      [39.2, 12.2, 0.75, 0.75, 0],
      [4.55, 26.2, 1.8, 0.38, Math.PI / 2],
      [42.0, 51.3, 2.4, 0.38, 0],
    ]) {
      const gm = new THREE.Mesh(new THREE.PlaneGeometry(gw, gd), grateMat);
      gm.rotation.x = -Math.PI / 2;
      gm.rotation.z = rz;
      gm.position.set(gx, 0.01, gz);
      this.root.add(gm);
    }

    // Tracking Security CCTV Dome/Box Cameras (matching shinjuku_tr_CB5E0175.jpeg & bizpa_jad.jpg!)
    const camPositions: Array<[number, number, number]> = [
      [36.0, HIGH_CEILING - 0.32, 12.2],
      [54.0, HIGH_CEILING - 0.32, 12.2],
      [26.0, LOW_CEILING - 0.3, 25.5],
      [58.0, LOW_CEILING - 0.3, 45.5],
    ];
    camPositions.forEach(([cx, cy, cz], idx) => {
      const mount = new THREE.Group();
      mount.position.set(cx, cy, cz);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.32, 8), darkTrim);
      stem.position.y = 0.16;
      mount.add(stem);

      const head = new THREE.Group();
      const camBody = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, 0.28), steel);
      const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.08, 12), darkTrim);
      lens.rotation.x = Math.PI / 2;
      lens.position.z = 0.16;
      const ledMat = new THREE.MeshBasicMaterial({ color: 0xff2222 });
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.017, 6, 6), ledMat);
      led.position.set(0.045, 0.035, 0.145);
      head.add(camBody, lens, led);
      mount.add(head);
      this.root.add(mount);
      this.cctvCameras.push({ headPivot: head, ledMat, worldX: cx, worldZ: cz, phase: idx * 1.4 });
    });

    // Subtle horror warning graffiti & claw drag decals in back corridors
    const g1 = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 1.3),
      new THREE.MeshStandardMaterial({
        map: this.textures.graffitiDonotLook,
        transparent: true,
        roughness: 0.78,
        depthWrite: false,
      })
    );
    g1.position.set(4.06, 1.55, 32);
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
    g2.position.set(42, 1.5, 51.94);
    g2.rotation.y = Math.PI;
    this.root.add(g2);
  }

  private buildNotesAndCoins(): void {
    const noteGeo = new THREE.PlaneGeometry(0.28, 0.36);
    for (const def of LORE_NOTES) {
      const m = new THREE.Mesh(
        noteGeo,
        new THREE.MeshStandardMaterial({
          color: 0xf4eee0,
          emissive: new THREE.Color(0x463d2c),
          emissiveIntensity: 0.65,
          roughness: 0.85,
          side: THREE.DoubleSide,
        })
      );
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

    const coinGeo = new THREE.CylinderGeometry(0.088, 0.088, 0.02, 16);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xeaeef2,
      emissive: new THREE.Color(0x525864),
      emissiveIntensity: 0.72,
      roughness: 0.14,
      metalness: 0.96,
    });
    for (const def of COINS) {
      const m = new THREE.Mesh(coinGeo, coinMat);
      m.position.set(def.x, def.y, def.z);
      this.root.add(m);
      this.coinPickups.push({ def, mesh: m, collected: false });
    }
  }

  private buildDustMotes(): void {
    const count = 360;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 4 + Math.random() * 76;
      pos[i * 3 + 1] = 0.25 + Math.random() * 3.9;
      pos[i * 3 + 2] = 4 + Math.random() * 50;
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

  // Synchronized 5-Stage Corruption across 『新宿ウォール456』, Ceiling Cove Line LEDs, and all 9 『J・ADビジョン』 Light-Box Columns!
  setSignageCorruptionStage(stage: number): void {
    const s = Math.max(0, Math.min(4, stage));
    if (s === this.currentSignageStage) return;
    this.currentSignageStage = s;

    // 1. Update 45.6m Shinjuku Wall 456
    const w456Tex = this.textures.wall456Stages[s];
    this.wall456Mat.map = w456Tex;
    this.wall456Mat.emissiveMap = w456Tex;
    this.wall456Mat.emissiveIntensity = s >= 4 ? 1.18 : 0.96;
    this.wall456Mat.needsUpdate = true;

    // 2. Update J・ADビジョン 70-inch LCD screens
    const sigTex = this.textures.signageStages[s];
    for (const mat of this.signageMats) {
      mat.map = sigTex;
      mat.emissiveMap = sigTex;
      mat.emissiveIntensity = s >= 4 ? 1.15 : 0.85;
      mat.needsUpdate = true;
    }

    // 3. Synchronize J・ADビジョン 3-tier LED Light-Boxes & Ceiling Cove Line LEDs!
    if (s === 0) {
      this.coveLineMat.color.setHex(0x80e8ff);
      this.coveLineMat.emissive.setHex(0x38b8ff);
      this.lightBoxTopMat.color.setHex(0x74d8ff);
      this.lightBoxTopMat.emissive.setHex(0x2ca8f8);
      this.lightBoxMidMat.color.setHex(0x3a84f0);
      this.lightBoxMidMat.emissive.setHex(0x1858d8);
      this.lightBoxBotMat.color.setHex(0x6cd4ff);
      this.lightBoxBotMat.emissive.setHex(0x289ef0);
    } else if (s === 1) {
      this.coveLineMat.color.setHex(0x98b4ff);
      this.coveLineMat.emissive.setHex(0x4c68e8);
      this.lightBoxTopMat.color.setHex(0x6a9cf8);
      this.lightBoxTopMat.emissive.setHex(0x3258d8);
      this.lightBoxMidMat.color.setHex(0x4838b8);
      this.lightBoxMidMat.emissive.setHex(0x281c88);
      this.lightBoxBotMat.color.setHex(0x6a9cf8);
      this.lightBoxBotMat.emissive.setHex(0x3258d8);
    } else if (s === 2) {
      this.coveLineMat.color.setHex(0xc468f0);
      this.coveLineMat.emissive.setHex(0x8c28c8);
      this.lightBoxTopMat.color.setHex(0xb458e8);
      this.lightBoxTopMat.emissive.setHex(0x761eb2);
      this.lightBoxMidMat.color.setHex(0x6a1898);
      this.lightBoxMidMat.emissive.setHex(0x480c6e);
      this.lightBoxBotMat.color.setHex(0xb458e8);
      this.lightBoxBotMat.emissive.setHex(0x761eb2);
    } else {
      this.coveLineMat.color.setHex(0xff3840);
      this.coveLineMat.emissive.setHex(0xd8141c);
      this.lightBoxTopMat.color.setHex(0xf02832);
      this.lightBoxTopMat.emissive.setHex(0xc40e18);
      this.lightBoxMidMat.color.setHex(0x9e0a12);
      this.lightBoxMidMat.emissive.setHex(0x78060c);
      this.lightBoxBotMat.color.setHex(0xf02832);
      this.lightBoxBotMat.emissive.setHex(0xc40e18);
    }

    const poolColor = s >= 3 ? 0xe0262e : s === 2 ? 0x8e34c8 : 0x3898f0;
    for (const pm of this.signagePoolMats) {
      pm.color.setHex(poolColor);
      pm.opacity = s >= 4 ? 0.52 : 0.34;
    }
    for (const pm of this.wall456PoolMats) {
      pm.color.setHex(poolColor);
      pm.opacity = s >= 4 ? 0.52 : 0.34;
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
    this.exitLight.intensity = ready ? 10.5 : 8.2;
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
    this.payphoneRingActive = false;
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
        this.nearestTerminalLight.intensity = 2.4;
      } else if (bestT.progress > 0) {
        this.nearestTerminalLight.color.setHex(0xf2cc52);
        this.nearestTerminalLight.intensity = 5.4;
      } else {
        this.nearestTerminalLight.color.setHex(0x4be0d6);
        this.nearestTerminalLight.intensity = 4.2;
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
        const dying = fl.killedTimer < 1.2 && Math.sin(elapsed * 52 + fl.phase) > 0.85 ? 0.45 : 0.01;
        if (fl.light) fl.light.intensity = dying;
        fl.tubeMat.emissiveIntensity = dying * 1.6;
        if (fl.glowMat) fl.glowMat.opacity = dying * 0.12;
        if (fl.floorPoolMat) fl.floorPoolMat.opacity = dying * 0.08;
        continue;
      }
      if (blackoutTimer > 0) {
        if (fl.light) fl.light.intensity = 0.03;
        fl.tubeMat.emissiveIntensity = 0.05;
        if (fl.glowMat) fl.glowMat.opacity = 0.01;
        if (fl.floorPoolMat) fl.floorPoolMat.opacity = 0.01;
        continue;
      }

      const dRabbit = Math.hypot(rabbitPos.x - fl.x, rabbitPos.z - fl.z);
      const emField = Math.max(0, 1 - dRabbit / 11.5);
      const decay = Math.max(0.54, 1 - charges * 0.07);
      let flick = 1.0;
      const wave = Math.sin(elapsed * 19 + fl.phase) * Math.sin(elapsed * 43 + fl.phase * 2.1);
      if (emField > 0.14) {
        flick =
          Math.sin(elapsed * 41 + fl.phase * 5) > 0.56 - emField * 0.44
            ? 0.08 + Math.random() * 0.22
            : 0.58 + Math.abs(wave) * 0.42;
      } else if (charges >= 2 && (i + charges) % 3 === 0 && wave > 0.76) {
        flick = 0.22;
      }

      if (charges >= 5 && i % 2 === 1) {
        const pulse = 0.48 + 0.52 * Math.sin(elapsed * 7.2 + fl.phase);
        if (fl.light) {
          fl.light.color.setHex(0xe83238);
          fl.light.intensity = fl.baseIntensity * 0.9 * pulse;
        }
        fl.tubeMat.emissive.setHex(0xe83238);
        fl.tubeMat.emissiveIntensity = 2.0 * pulse;
        if (fl.glowMat) {
          fl.glowMat.color.setHex(0xe84848);
          fl.glowMat.opacity = 0.34 * pulse;
        }
        if (fl.floorPoolMat) {
          fl.floorPoolMat.color.setHex(0xe83838);
          fl.floorPoolMat.opacity = 0.28 * pulse;
        }
      } else {
        const col = fl.emergency ? 0xffbd68 : 0xdceef2;
        if (fl.light) {
          fl.light.color.setHex(col);
          fl.light.intensity = fl.baseIntensity * decay * flick;
        }
        fl.tubeMat.emissive.setHex(fl.emergency ? 0xffd088 : 0xf4faf8);
        fl.tubeMat.emissiveIntensity = 2.2 * flick;
        if (fl.glowMat) {
          fl.glowMat.color.setHex(fl.emergency ? 0xffcc88 : 0xc8eaf2);
          fl.glowMat.opacity = 0.35 * decay * flick;
        }
        if (fl.floorPoolMat) {
          fl.floorPoolMat.color.setHex(col);
          fl.floorPoolMat.opacity = 0.24 * decay * flick;
        }
      }
    }

    if (blackoutTimer > 0) {
      this.concourseShadowSpot.intensity = 0;
    } else {
      const em =
        Math.hypot(rabbitPos.x - PEDESTAL_POS.x, rabbitPos.z - PEDESTAL_POS.z) < 9.5 &&
        Math.sin(elapsed * 41) > 0.65
          ? 0.28
          : 1;
      this.concourseShadowSpot.intensity = 26 * Math.max(0.55, 1 - charges * 0.07) * em;
    }

    if (this.photoBoothFlashTimer > 0) {
      this.photoBoothFlashTimer = Math.max(0, this.photoBoothFlashTimer - dt);
      this.dynamicEventLight.position.set(PHOTOBOOTH_POS.x - 0.15, 1.35, PHOTOBOOTH_POS.z - 0.9);
      this.dynamicEventLight.color.setHex(0xeef8ff);
      this.dynamicEventLight.intensity = (this.photoBoothFlashTimer / 0.42) * 32;
      if (this.photoBoothFlashTimer <= 0.04) this.photoBoothShadowMesh.visible = false;
    } else if (this.phantomTrainTimer > 0) {
      this.phantomTrainTimer = Math.max(0, this.phantomTrainTimer - dt);
      const t = 1 - this.phantomTrainTimer / 5.2;
      const env = Math.sin(t * Math.PI);
      const strobe = 0.55 + 0.45 * Math.sin(elapsed * 28);
      this.dynamicEventLight.color.setHex(0xd8f4ff);
      this.dynamicEventLight.position.set(28.0, 1.8, 22 + t * 24);
      this.dynamicEventLight.intensity = env * strobe * 32;
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
      this.spawnSparks(6, LOW_CEILING - 0.26, 26.0, 8);
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
