import * as THREE from 'three';
import {
  CELL,
  COINS,
  COLS,
  CoinDef,
  GATE_LINE_Z,
  HIDING_SPOTS,
  HIGH_CEILING,
  HidingSpotDef,
  LOW_CEILING,
  LORE_NOTES,
  LoreNoteDef,
  PEDESTAL_POS,
  PHOTOBOOTH_POS,
  ROWS,
  SHINJUKU_GRID,
  TERMINALS,
  TerminalDef,
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
    this.nearestTerminalLight.position.set(30, 1.6, 22);
    this.dynamicEventLight = new THREE.PointLight(0xeef8ff, 0, 22, 1.5);
    this.dynamicEventLight.position.set(22, 1.5, 42);
    this.root.add(this.nearestTerminalLight, this.dynamicEventLight);

    this.buildArchitecture();
    this.buildTactileAndFloorGuides();
    this.buildLightingFixtures();
    this.buildAlpsPedestal();
    this.buildEastTicketGates();
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

  // Domino fluorescent blowout moving from rabbit toward player!
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
      .filter((c) => c.dFrom < 18 || c.dTo < 14)
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

    // Polished wet-sheen Shinjuku terrazzo floor
    const floorMat = new THREE.MeshStandardMaterial({
      map: this.textures.floorTerrazzo,
      normalMap: this.textures.floorNormal,
      normalScale: new THREE.Vector2(0.75, 0.75),
      roughnessMap: this.textures.floorRoughness,
      roughness: 0.78,
      metalness: 0.22,
      envMapIntensity: 1.85,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(totalW, totalD), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(totalW * 0.5, 0, totalD * 0.5);
    floor.receiveShadow = true;
    this.root.add(floor);

    const ceilMat = new THREE.MeshStandardMaterial({
      map: this.textures.ceilingLouver,
      normalMap: this.textures.ceilingNormal,
      normalScale: new THREE.Vector2(0.65, 0.65),
      roughness: 0.84,
      metalness: 0.24,
      envMapIntensity: 0.9,
    });

    const wallMat = new THREE.MeshStandardMaterial({
      map: this.textures.wallTile,
      normalMap: this.textures.wallNormal,
      normalScale: new THREE.Vector2(0.88, 0.88),
      roughnessMap: this.textures.wallRoughness,
      roughness: 0.82,
      metalness: 0.12,
      envMapIntensity: 1.15,
    });

    const pillarMat = new THREE.MeshStandardMaterial({
      map: this.textures.pillarMetal,
      normalMap: this.textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.42, 0.42),
      roughness: 0.34,
      metalness: 0.68,
      envMapIntensity: 1.45,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x8fb4be,
      transparent: true,
      opacity: 0.28,
      roughness: 0.06,
      metalness: 0.12,
      reflectivity: 0.96,
      clearcoat: 1.0,
      envMapIntensity: 1.9,
    });

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x22272c,
      normalMap: this.textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.45, 0.45),
      roughness: 0.34,
      metalness: 0.82,
      envMapIntensity: 1.35,
    });

    const wallGeo = new THREE.BoxGeometry(CELL, HIGH_CEILING, CELL);
    const pillarGeo = new THREE.BoxGeometry(1.42, HIGH_CEILING, 1.42);
    const ceilGeo = new THREE.PlaneGeometry(CELL, CELL);
    const signageScreenGeo = new THREE.PlaneGeometry(0.96, 2.06);
    const nameplateGeo = new THREE.PlaneGeometry(1.24, 0.46);
    const nameplateMat = new THREE.MeshStandardMaterial({
      map: this.textures.signStationName,
      emissive: new THREE.Color(0xdce8dc),
      emissiveMap: this.textures.signStationName,
      emissiveIntensity: 0.36,
      roughness: 0.38,
    });

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = SHINJUKU_GRID[r][c];
        const x = (c + 0.5) * CELL;
        const z = (r + 0.5) * CELL;

        if (cell === 1) {
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

        // Bulkhead soffits where high Alps Square ceiling meets lower passages
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
            if (nc >= 0 && nc < COLS && nr >= 0 && nr < ROWS && SHINJUKU_GRID[nr][nc] !== 1 && !isHighCeiling(nc, nr)) {
              const bh = new THREE.Mesh(new THREE.BoxGeometry(CELL, diff, 0.18), wallMat);
              bh.position.set(bx, by, bz);
              bh.rotation.y = ry;
              this.root.add(bh);
            }
          }
        }

        if (cell === 2) {
          // Iconic Shinjuku 4-sided Digital Signage Structural Column!
          const p = new THREE.Mesh(pillarGeo, pillarMat);
          p.position.set(x, HIGH_CEILING * 0.5, z);
          p.castShadow = true;
          p.receiveShadow = true;
          this.root.add(p);

          const base = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.22, 1.5), frameMat);
          base.position.set(x, 0.11, z);
          this.root.add(base);

          const screenMat = new THREE.MeshStandardMaterial({
            map: this.textures.signageStages[0],
            emissive: new THREE.Color(0xffffff),
            emissiveMap: this.textures.signageStages[0],
            emissiveIntensity: 0.72,
            roughness: 0.18,
            metalness: 0.08,
          });
          this.signageMats.push(screenMat);

          // 4 illuminated digital LCD ad faces + JR Shinjuku station nameplates above!
          const faces: Array<[number, number, number]> = [
            [0, 0.725, 0],
            [0, -0.725, Math.PI],
            [0.725, 0, Math.PI / 2],
            [-0.725, 0, -Math.PI / 2],
          ];
          for (const [ox, oz, ry] of faces) {
            const bezel = new THREE.Mesh(new THREE.BoxGeometry(1.06, 2.16, 0.04), frameMat);
            bezel.position.set(x + ox * 0.99, 1.65, z + oz * 0.99);
            bezel.rotation.y = ry;
            this.root.add(bezel);

            const scr = new THREE.Mesh(signageScreenGeo, screenMat);
            scr.position.set(x + ox * 1.02, 1.65, z + oz * 1.02);
            scr.rotation.y = ry;
            this.root.add(scr);

            const np = new THREE.Mesh(nameplateGeo, nameplateMat);
            np.position.set(x + ox * 1.01, 3.25, z + oz * 1.01);
            np.rotation.y = ry;
            this.root.add(np);
          }

          // Glossy wet-floor color reflection pool radiating from the glowing digital signage pillar!
          const poolMat = this.addFloorGlowPool(x, z, 5.4, 5.4, 0x7a68c8, 0.32);
          this.signagePoolMats.push(poolMat);
        } else if (cell === 3) {
          // Glass partition for Shinjuku Station Night Office
          const knee = new THREE.Mesh(new THREE.BoxGeometry(0.26, 1.05, CELL), pillarMat);
          knee.position.set(x, 0.525, z);
          this.root.add(knee);
          const pane = new THREE.Mesh(new THREE.BoxGeometry(0.06, LOW_CEILING - 1.35, CELL - 0.14), glassMat);
          pane.position.set(x, 1.05 + (LOW_CEILING - 1.35) * 0.5, z);
          this.root.add(pane);
          const top = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.34, CELL), frameMat);
          top.position.set(x, LOW_CEILING - 0.17, z);
          this.root.add(top);
          for (const off of [-CELL * 0.5 + 0.06, 0, CELL * 0.5 - 0.06]) {
            const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.14, LOW_CEILING - 1.05, 0.1), frameMat);
            mullion.position.set(x, 1.05 + (LOW_CEILING - 1.05) * 0.5, z + off);
            this.root.add(mullion);
          }
        } else if (cell === 4) {
          // 14・15 山手線 / 7・8 中央線 Platform Stairwell Overlook behind Iron Security Grille!
          this.buildPlatformOverlookCell(x, z, c === 5, frameMat, wallMat);
        }
      }
    }

    // Alps Square exposed architectural structural beams & cable trays
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x262c32, roughness: 0.72, metalness: 0.45 });
    for (const bz of [10, 14, 18, 22, 26, 30, 34]) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(24, 0.32, 0.36), beamMat);
      beam.position.set(30, HIGH_CEILING - 0.16, bz);
      this.root.add(beam);
    }

    // Subterranean overhead utility pipes running along West, East & Metro Promenade corridors
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x3b434b, roughness: 0.36, metalness: 0.8 });
    const addPipe = (x1: number, z1: number, x2: number, z2: number, y: number, r = 0.085) => {
      const len = Math.hypot(x2 - x1, z2 - z1);
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 8), pipeMat);
      m.position.set((x1 + x2) * 0.5, y, (z1 + z2) * 0.5);
      if (Math.abs(x2 - x1) > Math.abs(z2 - z1)) m.rotation.z = Math.PI / 2;
      else m.rotation.x = Math.PI / 2;
      this.root.add(m);
    };
    addPipe(4.4, 4.5, 4.4, 47.5, 3.48, 0.085);
    addPipe(4.72, 4.5, 4.72, 47.5, 3.56, 0.055);
    addPipe(55.55, 4.5, 55.55, 47.5, 3.48, 0.085);
    addPipe(4.5, 47.55, 55.5, 47.55, 3.46, 0.095);
    addPipe(4.5, 47.25, 55.5, 47.25, 3.55, 0.06);
  }

  private buildPlatformOverlookCell(
    x: number,
    z: number,
    isYamanote: boolean,
    frameMat: THREE.MeshStandardMaterial,
    wallMat: THREE.MeshStandardMaterial
  ): void {
    const g = new THREE.Group();
    g.position.set(x, 0, z);

    // Concrete knee curb & security iron vertical bars around perimeter
    const curb = new THREE.Mesh(new THREE.BoxGeometry(3.75, 0.42, 3.75), wallMat);
    curb.position.y = 0.21;
    g.add(curb);

    // Dark recessed stairwell pit visual
    const pitMat = new THREE.MeshBasicMaterial({ color: 0x050709 });
    const pit = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 3.3), pitMat);
    pit.rotation.x = -Math.PI / 2;
    pit.position.y = 0.43;
    g.add(pit);

    // Descending stair treads hinting down into the abyssal Shinjuku platform
    const stepMat = new THREE.MeshStandardMaterial({ color: 0x454a50, roughness: 0.75 });
    const yellowEdge = new THREE.MeshBasicMaterial({ color: 0xd8a822 });
    for (let i = 0; i < 6; i++) {
      const tread = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.12, 0.42), stepMat);
      tread.position.set(0, 0.35 - i * 0.16, -1.1 + i * 0.44);
      g.add(tread);
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.78, 0.02, 0.05), yellowEdge);
      stripe.position.set(0, 0.415 - i * 0.16, -0.92 + i * 0.44);
      g.add(stripe);
    }

    // Heavy iron security grille bars around all 4 sides
    const barGeo = new THREE.CylinderGeometry(0.024, 0.024, LOW_CEILING - 0.42, 6);
    for (const side of [-1.78, 1.78]) {
      for (let off = -1.5; off <= 1.5; off += 0.38) {
        const b1 = new THREE.Mesh(barGeo, frameMat);
        b1.position.set(off, 0.42 + (LOW_CEILING - 0.42) * 0.5, side);
        g.add(b1);
        const b2 = new THREE.Mesh(barGeo, frameMat);
        b2.position.set(side, 0.42 + (LOW_CEILING - 0.42) * 0.5, off);
        g.add(b2);
      }
      const rail1 = new THREE.Mesh(new THREE.BoxGeometry(3.62, 0.08, 0.08), frameMat);
      rail1.position.set(0, 1.25, side);
      g.add(rail1);
      const rail2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 3.62), frameMat);
      rail2.position.set(side, 1.25, 0);
      g.add(rail2);
    }

    // Backlit JR Yamanote / Chuo Platform hanging sign inside stairwell
    const tex = isYamanote ? this.textures.signYamanote : this.textures.signChuo;
    const signMat = new THREE.MeshStandardMaterial({
      map: tex,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: tex,
      emissiveIntensity: 0.72,
      roughness: 0.3,
    });
    const signBox = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.68, 0.14), frameMat);
    signBox.position.set(0, 2.85, 0);
    const front = new THREE.Mesh(new THREE.PlaneGeometry(2.44, 0.62), signMat);
    front.position.set(0, 2.85, 0.075);
    const back = new THREE.Mesh(new THREE.PlaneGeometry(2.44, 0.62), signMat);
    back.position.set(0, 2.85, -0.075);
    back.rotation.y = Math.PI;
    g.add(signBox, front, back);

    // Eerie Yamanote green / Chuo orange platform glow spilling through the iron grille!
    this.addFloorGlowPool(x, z, 6.2, 6.2, isYamanote ? 0x52c43a : 0xe06824, 0.34);

    this.root.add(g);
  }

  private buildTactileAndFloorGuides(): void {
    const lineMat = new THREE.MeshStandardMaterial({
      map: this.textures.tactileLine,
      normalMap: this.textures.tactileLineNormal,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughness: 0.72,
    });
    const dotMat = new THREE.MeshStandardMaterial({
      map: this.textures.tactileDots,
      roughness: 0.72,
    });

    const addDots = (x: number, z: number, w: number, d: number) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), dotMat);
      m.rotation.x = -Math.PI / 2;
      m.position.set(x, 0.008, z);
      m.receiveShadow = true;
      this.root.add(m);
    };

    const addLine = (x1: number, z1: number, x2: number, z2: number) => {
      const horiz = Math.abs(x2 - x1) > Math.abs(z2 - z1);
      const len = Math.hypot(x2 - x1, z2 - z1);
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

    // Main Alps Square tactile axis leading straight to East Gate
    addLine(30, 45.5, 30, 24.4);
    addLine(30, 19.6, 30, 5.6);
    // Cross corridors
    addLine(6, 18, 27.6, 18);
    addLine(6, 30, 54, 30);
    addLine(6, 46, 54, 46);
    addLine(6, 6, 54, 6);
    addDots(30, 5.4, 2.5, 0.55);
    addDots(30, 24.1, 0.65, 0.65);
    addDots(30, 19.9, 0.65, 0.65);

    // Authentic Shinjuku floor color guidance stripes (Yamanote green, Marunouchi red, Odakyu blue)
    const addStripe = (x1: number, z1: number, x2: number, z2: number, color: number) => {
      const horiz = Math.abs(x2 - x1) > Math.abs(z2 - z1);
      const len = Math.hypot(x2 - x1, z2 - z1);
      const geo = horiz ? new THREE.PlaneGeometry(len, 0.16) : new THREE.PlaneGeometry(0.16, len);
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.48, metalness: 0.08 });
      const m = new THREE.Mesh(geo, mat);
      m.rotation.x = -Math.PI / 2;
      m.position.set((x1 + x2) * 0.5, 0.007, (z1 + z2) * 0.5);
      m.receiveShadow = true;
      this.root.add(m);
    };
    addStripe(29.1, 6, 29.1, 36, 0x5ca832); // Yamanote green guide
    addStripe(30.9, 6, 30.9, 36, 0xd85622); // Chuo orange guide
    addStripe(6, 45.2, 54, 45.2, 0xd82b34); // Marunouchi M08 red guide
    addStripe(6.9, 6, 6.9, 44, 0x2084c8); // West Exit Odakyu blue guide
  }

  private buildLightingFixtures(): void {
    // 6 strategic real PointLights (1 per Shinjuku zone) + 13 glowing HDR fluorescent bays with wet-floor bounce pools
    const fixtures: Array<{
      x: number;
      z: number;
      h: number;
      intensity: number;
      hasLight?: boolean;
      emergency?: boolean;
      haze?: boolean;
    }> = [
      { x: 30, z: 34, h: HIGH_CEILING, intensity: 8.5, haze: true },
      { x: 30, z: 22, h: HIGH_CEILING, intensity: 13.5, hasLight: true, haze: true }, // Alps Square Hero Light
      { x: 30, z: 9.5, h: HIGH_CEILING, intensity: 10.5, hasLight: true, haze: true }, // East Gate Approach Hero Light
      { x: 20, z: 18, h: HIGH_CEILING, intensity: 6.0 },
      { x: 40, z: 18, h: HIGH_CEILING, intensity: 6.0 },
      { x: 6, z: 6.5, h: LOW_CEILING, intensity: 7.0, haze: true }, // West Lockers North
      { x: 6, z: 18.5, h: LOW_CEILING, intensity: 9.5, hasLight: true, haze: true }, // West Passage Hero Light
      { x: 6, z: 34, h: LOW_CEILING, intensity: 6.8 }, // West South
      { x: 10, z: 46, h: LOW_CEILING, intensity: 6.0, emergency: true, haze: true }, // Metro West
      { x: 30, z: 46, h: LOW_CEILING, intensity: 10.2, hasLight: true, emergency: true, haze: true }, // Metro Promenade Hero Light
      { x: 50, z: 46, h: LOW_CEILING, intensity: 6.0 }, // Metro East
      { x: 50, z: 10.5, h: LOW_CEILING, intensity: 9.8, hasLight: true, haze: true }, // Night Station Office Hero Light
      { x: 52, z: 28, h: LOW_CEILING, intensity: 9.2, hasLight: true, haze: true }, // NewDays Hall Hero Light
    ];

    const housingMat = new THREE.MeshStandardMaterial({ color: 0x23282e, roughness: 0.5, metalness: 0.65 });

    fixtures.forEach((f, idx) => {
      const box = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.08, 0.32), housingMat);
      box.position.set(f.x, f.h - 0.05, f.z);
      this.root.add(box);

      const colHex = f.emergency ? 0xffc876 : 0xdbf6f0;
      const tubeMat = new THREE.MeshStandardMaterial({
        color: colHex,
        emissive: new THREE.Color(colHex),
        emissiveIntensity: 2.2,
        roughness: 0.15,
      });
      for (const tz of [-0.07, 0.07]) {
        const tube = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.04, 0.06), tubeMat);
        tube.position.set(f.x, f.h - 0.1, f.z + tz);
        this.root.add(tube);
      }

      let pt: THREE.PointLight | null = null;
      if (f.hasLight) {
        pt = new THREE.PointLight(f.emergency ? 0xffbd68 : 0xc6ece6, f.intensity, 23, 1.65);
        pt.position.set(f.x, f.h - 0.45, f.z);
        this.root.add(pt);
      }

      let glowMat: THREE.SpriteMaterial | null = null;
      if (f.haze) {
        glowMat = new THREE.SpriteMaterial({
          map: this.textures.lightShaftSoft,
          color: f.emergency ? 0xffcc88 : 0xbdebe4,
          transparent: true,
          opacity: 0.44,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const sp = new THREE.Sprite(glowMat);
        sp.position.set(f.x, f.h - 1.25, f.z);
        sp.scale.set(4.8, 3.2, 1);
        this.root.add(sp);
      }

      const floorPoolMat = this.addFloorGlowPool(
        f.x,
        f.z,
        6.2,
        5.0,
        f.emergency ? 0xffbd68 : 0xb8e8e2,
        0.26
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

    // Hero overhead shadow-casting spotlight across Alps Square & Pedestal
    this.concourseShadowSpot = new THREE.SpotLight(0xcfece6, 24, 28, Math.PI * 0.44, 0.72, 1.45);
    this.concourseShadowSpot.position.set(30, HIGH_CEILING - 0.2, 19.5);
    this.concourseShadowSpot.target.position.set(30, 0, 22);
    this.concourseShadowSpot.castShadow = true;
    this.concourseShadowSpot.shadow.mapSize.set(512, 512);
    this.concourseShadowSpot.shadow.camera.near = 0.8;
    this.concourseShadowSpot.shadow.camera.far = 24;
    this.concourseShadowSpot.shadow.bias = -0.0012;
    this.root.add(this.concourseShadowSpot, this.concourseShadowSpot.target);

    // Additional decorative unpowered/dim ceiling troffers for architectural continuity
    const dimTube = new THREE.MeshStandardMaterial({
      color: 0x8ea8a6,
      emissive: new THREE.Color(0x6e8c8c),
      emissiveIntensity: 0.65,
    });
    const extraCoords: Array<[number, number, number]> = [
      [22, 14, HIGH_CEILING], [38, 14, HIGH_CEILING],
      [22, 26, HIGH_CEILING], [38, 26, HIGH_CEILING],
      [22, 34, HIGH_CEILING], [38, 34, HIGH_CEILING],
      [6, 12.5, LOW_CEILING], [6, 26, LOW_CEILING],
      [20, 46, LOW_CEILING], [40, 46, LOW_CEILING],
      [54, 18, LOW_CEILING], [54, 38, LOW_CEILING],
    ];
    for (const [x, z, h] of extraCoords) {
      const box = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.07, 0.26), housingMat);
      box.position.set(x, h - 0.05, z);
      const t = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.04, 0.12), dimTube);
      t.position.set(x, h - 0.1, z);
      this.root.add(box, t);
    }
  }

  private buildAlpsPedestal(): void {
    const g = new THREE.Group();
    g.position.set(PEDESTAL_POS.x, 0, PEDESTAL_POS.z);

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

    // Shattered acrylic display case glass shards glinting on the floor!
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

    // Velvet stanchion posts (one knocked over toward East Gate)
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

    // Wet muddy purple footprints leading straight north toward East Gate!
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

  private buildEastTicketGates(): void {
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

    // 6 JR East Shinjuku automatic gate machines spanning x = 24.4 .. 35.6
    const xs = [24.4, 26.8, 28.8, 31.2, 33.2, 35.6];
    for (const gx of xs) {
      const unit = new THREE.Group();
      unit.position.set(gx, 0, gz);
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.94, 1.36), steel);
      body.position.y = 0.47;
      body.castShadow = true;
      body.receiveShadow = true;
      unit.add(body);

      const top = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.06, 1.38), darkTop);
      top.position.y = 0.96;
      unit.add(top);

      // Glowing blue Suica IC reader pad
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.26), suicaPad);
      pad.position.set(0, 0.99, 0.46);
      pad.rotation.x = 0.24;
      unit.add(pad);

      // JR East green accent stripe on chassis
      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(0.355, 0.08, 1.3),
        new THREE.MeshStandardMaterial({ color: 0x2a8846, roughness: 0.38 })
      );
      strip.position.y = 0.78;
      unit.add(strip);

      this.root.add(unit);
    }

    this.centerPaddleMat = new THREE.MeshStandardMaterial({
      color: 0xd03838,
      emissive: new THREE.Color(0x521212),
      emissiveIntensity: 0.65,
      roughness: 0.3,
    });

    const addLanePaddles = (x1: number, x2: number, center: boolean) => {
      const pw = (x2 - x1 - 0.34) * 0.48;
      const mat = center ? this.centerPaddleMat : redPaddle;
      const leftPivot = new THREE.Group();
      leftPivot.position.set(x1 + 0.17, 0.58, gz);
      const lp = new THREE.Mesh(new THREE.BoxGeometry(pw, 0.58, 0.05), mat);
      lp.position.x = pw * 0.5;
      leftPivot.add(lp);

      const rightPivot = new THREE.Group();
      rightPivot.position.set(x2 - 0.17, 0.58, gz);
      const rp = new THREE.Mesh(new THREE.BoxGeometry(pw, 0.58, 0.05), mat);
      rp.position.x = -pw * 0.5;
      rightPivot.add(rp);

      this.root.add(leftPivot, rightPivot);
      if (center) this.gatePaddles.push({ leftPivot, rightPivot });
    };
    addLanePaddles(24.4, 26.8, false);
    addLanePaddles(28.8, 31.2, true);
    addLanePaddles(33.2, 35.6, false);

    // Overhead East Gate Status Display
    const gd = createGateDisplay(false);
    this.gateDisplayMat = new THREE.MeshStandardMaterial({
      map: gd,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: gd,
      emissiveIntensity: 1.0,
      roughness: 0.8,
    });
    const housing = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 0.78, 0.18),
      new THREE.MeshStandardMaterial({ color: 0x161a1e, roughness: 0.5 })
    );
    housing.position.set(30, 2.65, gz);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(2.14, 0.66), this.gateDisplayMat);
    face.position.set(30, 2.65, gz + 0.095);
    this.root.add(housing, face);

    // Glowing green 非常口 EXIT sign
    const exitMat = new THREE.MeshStandardMaterial({
      map: this.textures.signEmergencyExit,
      emissive: new THREE.Color(0x64f0a8),
      emissiveMap: this.textures.signEmergencyExit,
      emissiveIntensity: 1.25,
      roughness: 0.28,
    });
    const exBox = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.44, 0.12), darkTop);
    exBox.position.set(30, 3.55, gz - 0.1);
    const exFace = new THREE.Mesh(new THREE.PlaneGeometry(1.12, 0.4), exitMat);
    exFace.position.set(30, 3.55, gz - 0.03);
    this.root.add(exBox, exFace);

    this.exitLight = new THREE.PointLight(0xe03b3b, 7.2, 14, 1.75);
    this.exitLight.position.set(30, 2.35, gz + 0.9);
    this.root.add(this.exitLight);

    // Heavy East Exit Rolling Steel Shutter (rises to Kabukicho rain-lit stairs!)
    const shutterMat = new THREE.MeshStandardMaterial({
      map: this.textures.shutterMetal,
      normalMap: this.textures.shutterNormal,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughness: 0.44,
      metalness: 0.74,
    });
    this.exitShutter = new THREE.Mesh(new THREE.BoxGeometry(12.2, LOW_CEILING, 0.22), shutterMat);
    this.exitShutter.position.set(30, LOW_CEILING * 0.5, 2.25);
    this.root.add(this.exitShutter);

    // Kabukicho surface exit stairs behind shutter
    const stairMat = new THREE.MeshStandardMaterial({ color: 0x7c838a, roughness: 0.65 });
    for (let i = 0; i < 8; i++) {
      const st = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.22, 0.34), stairMat);
      st.position.set(30, 0.11 + i * 0.22, 1.8 - i * 0.23);
      this.root.add(st);
    }
    const nightPortal = new THREE.Mesh(
      new THREE.PlaneGeometry(6.0, LOW_CEILING),
      new THREE.MeshBasicMaterial({ color: 0x9ec8dc })
    );
    nightPortal.position.set(30, LOW_CEILING * 0.5, 0.12);
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

    // West Passage Suica Coin Locker banks
    for (const lz of [9.5, 11.7, 13.9, 25.0, 27.2]) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.56, 2.1, 1.9), lockerMat);
      m.position.set(7.72, 1.05, lz);
      this.root.add(m);
    }

    // Glowing acure Vending Machines casting cold cyan-white glow onto the wet floor!
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
    for (const vz of [32.8, 34.4]) {
      const vm = new THREE.Mesh(new THREE.BoxGeometry(0.84, 1.98, 1.26), vendMats);
      vm.position.set(4.44, 0.99, vz);
      this.root.add(vm);
    }
    this.addFloorGlowPool(5.6, 33.6, 4.2, 4.8, 0x9ce8ff, 0.42);

    // Shinjuku Photo Booth (証明写真機) at West-South corridor — triggers camera flash scare!
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

    // Waiting Bench
    const benchMat = new THREE.MeshStandardMaterial({ color: 0x56544e, roughness: 0.68 });
    const bench = new THREE.Group();
    bench.position.set(3.15 * CELL, 0, 9.25 * CELL);
    const seat = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.08, 0.58), benchMat);
    seat.position.y = 0.48;
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.36, 0.06), benchMat);
    back.position.set(0, 0.74, -0.26);
    bench.add(seat, back);
    for (const lx of [-1.1, 0, 1.1]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 0.5), darkMetal);
      leg.position.set(lx, 0.24, 0);
      bench.add(leg);
    }
    this.root.add(bench);

    // Shinjuku Night Station Office Desk & Dual Glowing CCTV Monitors
    const desk = new THREE.Mesh(
      new THREE.BoxGeometry(1.24, 0.78, 2.7),
      new THREE.MeshStandardMaterial({ color: 0x454c54, roughness: 0.58 })
    );
    desk.position.set(45.0, 0.39, 12.8);
    this.root.add(desk);
    const monScreen = new THREE.MeshStandardMaterial({
      color: 0x70e0c4,
      emissive: new THREE.Color(0x28b48e),
      emissiveIntensity: 1.15,
      roughness: 0.2,
    });
    for (const mz of [12.0, 13.5]) {
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.32, 0.44), darkMetal);
      box.position.set(44.9, 0.94, mz);
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.24), monScreen);
      scr.position.set(45.1, 0.94, mz);
      scr.rotation.y = Math.PI / 2;
      this.root.add(box, scr);
    }

    // NewDays Shinjuku East Store Shuttered Facade (Cell 11..12, row 6 -> facing south at z = 28.04)
    const newDays = new THREE.Mesh(
      new THREE.PlaneGeometry(7.2, 2.95),
      new THREE.MeshStandardMaterial({
        map: this.textures.newDaysShutter,
        emissive: new THREE.Color(0x90d898),
        emissiveMap: this.textures.newDaysShutter,
        emissiveIntensity: 0.16,
        roughness: 0.46,
        metalness: 0.54,
      })
    );
    newDays.position.set(46.0, 1.48, 28.04);
    this.root.add(newDays);

    // JR Ticket Machine Bank along East-South wall (x = 44.04..47.9, z = 35.95)
    const ticketBank = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 2.45),
      new THREE.MeshStandardMaterial({
        map: this.textures.ticketMachineFront,
        emissive: new THREE.Color(0x88b498),
        emissiveMap: this.textures.ticketMachineFront,
        emissiveIntensity: 0.28,
        roughness: 0.4,
      })
    );
    ticketBank.position.set(46.0, 1.24, 36.04);
    this.root.add(ticketBank);

    // Last Train Warning Sign & Shinjuku B1F Guide Boards
    const warn = new THREE.Mesh(
      new THREE.PlaneGeometry(2.8, 1.35),
      new THREE.MeshStandardMaterial({
        map: this.textures.signWarning,
        emissive: new THREE.Color(0x3a2e18),
        emissiveIntensity: 0.45,
      })
    );
    warn.position.set(30, 3.05, 39.85);
    warn.rotation.y = Math.PI;
    this.root.add(warn);

    const mapMat = new THREE.MeshStandardMaterial({
      map: this.textures.stationMap,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: this.textures.stationMap,
      emissiveIntensity: 0.56,
      roughness: 0.35,
    });
    const m1 = new THREE.Mesh(new THREE.PlaneGeometry(1.85, 1.85), mapMat);
    m1.position.set(16.06, 1.72, 22);
    m1.rotation.y = Math.PI / 2;
    const m2 = new THREE.Mesh(new THREE.PlaneGeometry(1.85, 1.85), mapMat);
    m2.position.set(43.94, 1.72, 18);
    m2.rotation.y = -Math.PI / 2;
    this.root.add(m1, m2);

    // Iconic Suspended Backlit JR East & Tokyo Metro Directional Signs!
    const hangSign = (tex: THREE.CanvasTexture, x: number, z: number, y: number, ry: number, w = 3.25) => {
      const g = new THREE.Group();
      g.position.set(x, y, z);
      g.rotation.y = ry;
      const body = new THREE.Mesh(new THREE.BoxGeometry(w, 0.78, 0.14), darkMetal);
      const faceMat = new THREE.MeshStandardMaterial({
        map: tex,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: tex,
        emissiveIntensity: 0.72,
        roughness: 0.28,
      });
      const f1 = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.08, 0.72), faceMat);
      f1.position.z = 0.075;
      const f2 = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.08, 0.72), faceMat);
      f2.position.z = -0.075;
      f2.rotation.y = Math.PI;
      const rodGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.1, 6);
      const r1 = new THREE.Mesh(rodGeo, darkMetal);
      r1.position.set(-w * 0.38, 0.88, 0);
      const r2 = new THREE.Mesh(rodGeo, darkMetal);
      r2.position.set(w * 0.38, 0.88, 0);
      g.add(body, f1, f2, r1, r2);
      this.root.add(g);
    };

    hangSign(this.textures.signEastExit, 30, 14.8, 3.85, 0, 3.55);
    hangSign(this.textures.signEastExit, 30, 31.2, 3.85, 0, 3.55);
    hangSign(this.textures.signWestPassage, 16.4, 18.0, 3.2, Math.PI / 2, 3.1);
    hangSign(this.textures.signCentralEast, 43.6, 22.0, 3.2, Math.PI / 2, 3.1);
    hangSign(this.textures.signMetroPromenade, 30, 44.2, 3.15, Math.PI, 3.35);

    // Animated Suspended LED Departure Board (発車標) above Alps Square!
    const dep = createDepartureBoard();
    this.departureBoardTex = dep.texture;
    this.departureBoardCtx = dep.ctx;
    const depMat = new THREE.MeshStandardMaterial({
      map: this.departureBoardTex,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: this.departureBoardTex,
      emissiveIntensity: 1.1,
      roughness: 0.3,
    });
    const depGroup = new THREE.Group();
    depGroup.position.set(30, 4.15, 25.5);
    const depBox = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.06, 0.22), darkMetal);
    const depF1 = new THREE.Mesh(new THREE.PlaneGeometry(3.32, 0.98), depMat);
    depF1.position.z = 0.115;
    const depF2 = new THREE.Mesh(new THREE.PlaneGeometry(3.32, 0.98), depMat);
    depF2.position.z = -0.115;
    depF2.rotation.y = Math.PI;
    depGroup.add(depBox, depF1, depF2);
    this.root.add(depGroup);

    // Wall Posters along outer passages (progressively corrupt too!)
    const posters: Array<[number, number, number]> = [
      [12.0, 4.06, 0],
      [48.0, 4.06, 0],
      [18.0, 47.94, Math.PI],
      [42.0, 47.94, Math.PI],
      [4.06, 28.0, Math.PI / 2],
      [55.94, 22.0, -Math.PI / 2],
    ];
    const pGeo = new THREE.PlaneGeometry(1.18, 1.72);
    const fGeo = new THREE.BoxGeometry(1.26, 1.8, 0.04);
    for (const [px, pz, ry] of posters) {
      const pMat = new THREE.MeshStandardMaterial({
        map: this.textures.posterStages[0],
        emissive: new THREE.Color(0xffffff),
        emissiveMap: this.textures.posterStages[0],
        emissiveIntensity: 0.24,
        roughness: 0.45,
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

    // Stainless steel Tokyo recycling bins
    for (const [bx, bz] of [[25.2, 26], [34.8, 14], [4.7, 36.2], [51.2, 28.4]]) {
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

    // Yellow wet-floor A-frame signs
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
    addWetSign(25.8, 22.6, 0.42, false);
    addWetSign(7.1, 16.5, -0.7, true);

    // Mirror-like Wet Reflective Puddles with Dripping Water & Expanding Ripples!
    const puddleMat = new THREE.MeshPhysicalMaterial({
      color: 0x16242c,
      alphaMap: this.textures.puddleAlpha,
      roughness: 0.012,
      metalness: 0.22,
      reflectivity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.012,
      transparent: true,
      opacity: 0.46,
      envMapIntensity: 3.8,
      depthWrite: false,
    });
    const dropMat = new THREE.MeshBasicMaterial({ color: 0xcbeaf0, transparent: true, opacity: 0.75 });
    const dropGeo = new THREE.CylinderGeometry(0.005, 0.009, 0.11, 5);

    const puddleDefs: Array<[number, number, number, number, number]> = [
      [25.6, 20.8, 1.75, 1.25, HIGH_CEILING],
      [32.2, 11.6, 1.9, 1.35, HIGH_CEILING],
      [6.3, 16.2, 1.35, 1.0, LOW_CEILING],
      [30.2, 45.6, 2.2, 1.2, LOW_CEILING],
      [53.4, 29.8, 1.45, 1.1, LOW_CEILING],
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

    // Japanese Fire Hydrant Cabinets (消火栓) with red indicator lamps
    const hydMat = new THREE.MeshStandardMaterial({
      map: this.textures.fireHydrant,
      normalMap: this.textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.25, 0.25),
      roughness: 0.36,
      metalness: 0.55,
    });
    const hydSide = new THREE.MeshStandardMaterial({ color: 0x6e181b, roughness: 0.42, metalness: 0.62 });
    const hydLamp = new THREE.MeshBasicMaterial({ color: 0xff2824 });
    for (const [hx, hz, ry] of [[16.08, 13.8, Math.PI / 2], [43.92, 25.8, -Math.PI / 2], [20.6, 39.92, Math.PI]]) {
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

    // Drainage Floor Grates
    const grateMat = new THREE.MeshStandardMaterial({
      map: this.textures.floorGrate,
      normalMap: this.textures.floorGrateNormal,
      normalScale: new THREE.Vector2(1.1, 1.1),
      roughness: 0.46,
      metalness: 0.84,
    });
    for (const [gx, gz, gw, gd, rz] of [
      [30, 4.9, 2.8, 0.4, 0],
      [24.2, 20.8, 1.8, 0.38, Math.PI / 2],
      [4.55, 16.2, 1.8, 0.38, Math.PI / 2],
      [30, 47.3, 2.4, 0.38, 0],
    ]) {
      const gm = new THREE.Mesh(new THREE.PlaneGeometry(gw, gd), grateMat);
      gm.rotation.x = -Math.PI / 2;
      gm.rotation.z = rz;
      gm.position.set(gx, 0.01, gz);
      this.root.add(gm);
    }

    // Abandoned Clear Vinyl Umbrella & Dropped Commuter Briefcase
    const umb = new THREE.Group();
    umb.position.set(27.0, 0.34, 19.6);
    umb.rotation.set(1.12, -0.78, 0.32);
    const canopyMat = new THREE.MeshPhysicalMaterial({
      color: 0x627c8c,
      transparent: true,
      opacity: 0.22,
      roughness: 0.14,
      clearcoat: 0.65,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.22, 8, 1, true), canopyMat);
    canopy.position.y = 0.18;
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.82, 6), steel);
    shaft.position.y = -0.06;
    const handle = new THREE.Mesh(
      new THREE.TorusGeometry(0.056, 0.014, 6, 10, Math.PI),
      new THREE.MeshStandardMaterial({ color: 0xc8c8c0, roughness: 0.4 })
    );
    handle.position.set(0.056, -0.47, 0);
    handle.rotation.z = Math.PI;
    umb.add(canopy, shaft, handle);
    this.root.add(umb);

    const briefcase = new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.11, 0.33),
      new THREE.MeshStandardMaterial({ color: 0x241d17, roughness: 0.46, metalness: 0.14 })
    );
    briefcase.position.set(31.85, 0.055, 23.6);
    briefcase.rotation.y = 0.58;
    briefcase.castShadow = true;
    this.root.add(briefcase);

    // Hanging Broken Sparking Fluorescent Fixture in West Passage!
    const broken = new THREE.Group();
    broken.position.set(6, LOW_CEILING - 0.18, 17.6);
    broken.rotation.z = 0.24;
    broken.rotation.y = 0.14;
    broken.add(
      new THREE.Mesh(new THREE.BoxGeometry(1.44, 0.07, 0.22), darkTrim),
      new THREE.Mesh(
        new THREE.BoxGeometry(1.34, 0.04, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x667478, roughness: 0.25 })
      )
    );
    this.root.add(broken);

    // Station Clocks stopped at 00:47
    const clockMat = new THREE.MeshStandardMaterial({
      map: this.textures.clockFace,
      emissive: new THREE.Color(0x525a58),
      emissiveMap: this.textures.clockFace,
      emissiveIntensity: 0.52,
      roughness: 0.3,
    });
    const addClock = (x: number, y: number, z: number, ry: number) => {
      const cg = new THREE.Group();
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.08, 20), darkTrim);
      rim.rotation.x = Math.PI / 2;
      const face = new THREE.Mesh(new THREE.CircleGeometry(0.28, 20), clockMat);
      face.position.z = 0.045;
      cg.add(rim, face);
      cg.position.set(x, y, z);
      cg.rotation.y = ry;
      this.root.add(cg);
    };
    addClock(30, 3.65, 4.18, 0);
    addClock(25.2, 3.25, 25.4, Math.PI);

    // Tracking Security CCTV Cameras with blinking red REC LEDs
    const camPositions: Array<[number, number, number]> = [
      [16.35, 3.9, 15.8],
      [43.65, 3.9, 15.8],
      [24.4, 3.9, 6.2],
      [35.6, 3.9, 35.8],
    ];
    camPositions.forEach(([cx, cy, cz], idx) => {
      const mount = new THREE.Group();
      mount.position.set(cx, cy, cz);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.34, 8), darkTrim);
      stem.position.y = 0.17;
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

    // Blood/Charcoal Graffiti & Claw Drag Decals
    const g1 = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 1.3),
      new THREE.MeshStandardMaterial({ map: this.textures.graffitiDonotLook, transparent: true, roughness: 0.78, depthWrite: false })
    );
    g1.position.set(4.06, 1.55, 22);
    g1.rotation.y = Math.PI / 2;
    this.root.add(g1);

    const g2 = new THREE.Mesh(
      new THREE.PlaneGeometry(2.8, 1.35),
      new THREE.MeshStandardMaterial({ map: this.textures.graffitiSound, transparent: true, roughness: 0.78, depthWrite: false })
    );
    g2.position.set(40, 1.5, 44.05);
    this.root.add(g2);

    const clawMat = new THREE.MeshStandardMaterial({
      map: this.textures.clawDragDecal,
      transparent: true,
      roughness: 0.32,
      depthWrite: false,
    });
    const c1 = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.78), clawMat);
    c1.position.set(43.94, 1.62, 10.2);
    c1.rotation.y = -Math.PI / 2;
    const c2 = new THREE.Mesh(new THREE.PlaneGeometry(1.65, 0.84), clawMat);
    c2.position.set(4.06, 1.35, 11.4);
    c2.rotation.y = Math.PI / 2;
    this.root.add(c1, c2);
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
    const count = 320;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 4 + Math.random() * 52;
      pos[i * 3 + 1] = 0.25 + Math.random() * 4.4;
      pos[i * 3 + 2] = 4 + Math.random() * 44;
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
      opacity: 0.24,
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

  setSignageCorruptionStage(stage: number): void {
    const s = Math.max(0, Math.min(4, stage));
    if (s === this.currentSignageStage) return;
    this.currentSignageStage = s;
    const sigTex = this.textures.signageStages[s];
    for (const mat of this.signageMats) {
      mat.map = sigTex;
      mat.emissiveMap = sigTex;
      mat.emissiveIntensity = s >= 4 ? 1.15 : 0.78;
      mat.needsUpdate = true;
    }
    const poolColor = s >= 4 ? 0xe0262e : s >= 2 ? 0x8e34c8 : 0x7a68c8;
    for (const pm of this.signagePoolMats) {
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
    this.exitShutter.position.y = LOW_CEILING * 0.5;
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
    // Update animated Shinjuku LED Departure Board (~6 Hz)
    this.departureAccum += dt;
    if (this.departureAccum >= 0.16) {
      this.departureAccum = 0;
      updateDepartureBoard(this.departureBoardCtx, charges, elapsed, charges >= this.terminals.length);
      this.departureBoardTex.needsUpdate = true;
    }

    // Move pooled nearestTerminalLight to whichever charge machine is closest to the player!
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

    // Update fluorescent lights + domino blowout delays
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
      const decay = Math.max(0.48, 1 - charges * 0.08);
      let flick = 1.0;
      const wave = Math.sin(elapsed * 19 + fl.phase) * Math.sin(elapsed * 43 + fl.phase * 2.1);
      if (emField > 0.14) {
        flick = Math.sin(elapsed * 41 + fl.phase * 5) > 0.56 - emField * 0.44 ? 0.05 + Math.random() * 0.22 : 0.54 + Math.abs(wave) * 0.46;
      } else if (charges >= 2 && (i + charges) % 3 === 0 && wave > 0.76) {
        flick = 0.18;
      }

      if (charges >= 5 && i % 2 === 1) {
        const pulse = 0.45 + 0.55 * Math.sin(elapsed * 7.2 + fl.phase);
        if (fl.light) {
          fl.light.color.setHex(0xe83238);
          fl.light.intensity = fl.baseIntensity * 0.9 * pulse;
        }
        fl.tubeMat.emissive.setHex(0xe83238);
        fl.tubeMat.emissiveIntensity = 2.0 * pulse;
        if (fl.glowMat) {
          fl.glowMat.color.setHex(0xe84848);
          fl.glowMat.opacity = 0.36 * pulse;
        }
        if (fl.floorPoolMat) {
          fl.floorPoolMat.color.setHex(0xe83838);
          fl.floorPoolMat.opacity = 0.3 * pulse;
        }
      } else {
        const col = fl.emergency ? 0xffbd68 : 0xc6ece6;
        if (fl.light) {
          fl.light.color.setHex(col);
          fl.light.intensity = fl.baseIntensity * decay * flick;
        }
        fl.tubeMat.emissive.setHex(fl.emergency ? 0xffc876 : 0xdbf6f0);
        fl.tubeMat.emissiveIntensity = 2.1 * flick;
        if (fl.glowMat) {
          fl.glowMat.color.setHex(fl.emergency ? 0xffcc88 : 0xbdebe4);
          fl.glowMat.opacity = 0.4 * decay * flick;
        }
        if (fl.floorPoolMat) {
          fl.floorPoolMat.color.setHex(col);
          fl.floorPoolMat.opacity = 0.26 * decay * flick;
        }
      }
    }

    // Concourse shadow spot
    if (blackoutTimer > 0) {
      this.concourseShadowSpot.intensity = 0;
    } else {
      const em = Math.hypot(rabbitPos.x - 30, rabbitPos.z - 22) < 9.5 && Math.sin(elapsed * 41) > 0.65 ? 0.24 : 1;
      this.concourseShadowSpot.intensity = 24 * Math.max(0.5, 1 - charges * 0.08) * em;
    }

    // Pooled dynamicEventLight: Photo Booth Strobe > Phantom Yamanote Train > Unlocked Kabukicho Exit Stairs
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
      this.dynamicEventLight.position.set(22 + (t - 0.5) * 18, 1.4, 42);
      this.dynamicEventLight.intensity = env * strobe * 32;
    } else if (this.exitUnlocked) {
      this.dynamicEventLight.color.setHex(0x98d8f0);
      this.dynamicEventLight.position.set(30, 2.6, 1.3);
      this.dynamicEventLight.intensity = this.shutterOpenProgress * 18;
    } else {
      this.dynamicEventLight.intensity = 0;
    }

    // Payphone green floor glow pulsing when ringing
    for (const c of this.closets) {
      if (c.phoneGlowMat) {
        c.phoneGlowMat.opacity = this.payphoneRingActive
          ? 0.36 + Math.abs(Math.sin(elapsed * 18)) * 0.48
          : 0.32 + Math.sin(elapsed * 1.4) * 0.05;
      }
      c.doorAngle += (c.targetAngle - c.doorAngle) * Math.min(1, dt * 8);
      c.doorPivot.rotation.y = c.doorAngle;
    }

    // Broken West Passage lamp sparks
    this.brokenLampTimer -= dt;
    if (this.brokenLampTimer <= 0) {
      this.brokenLampTimer = 3.2 + Math.random() * 4.8;
      this.spawnSparks(6, LOW_CEILING - 0.26, 17.6, 8);
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

    // Puddle drips & ripples
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

    // CCTV cameras ominously tracking the player!
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
      this.exitShutter.position.y = LOW_CEILING * 0.5 + ease * (LOW_CEILING - 0.55);
      for (const gp of this.gatePaddles) {
        gp.leftPivot.rotation.y = ease * 1.42;
        gp.rightPivot.rotation.y = -ease * 1.42;
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
      if (y < 0.2) y = 4.4;
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
  }
}
