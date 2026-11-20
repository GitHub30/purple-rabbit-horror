import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CollisionSystem, findGridPath } from '../station/CollisionSystem';
import {
  HidingSpotDef,
  PATROL_WAYPOINTS,
  PEEK_PILLARS,
  PEDESTAL_POS,
  RABBIT_INTRO_POS,
} from '../station/shinjukuMap';
import { HorrorAudio } from '../audio/HorrorAudio';

export type RabbitState =
  | 'INTRO_SIT'
  | 'PATROL'
  | 'PEEK_CORNER'
  | 'INVESTIGATE'
  | 'ALERT_HOP'
  | 'STARE_FREEZE'
  | 'CHASE'
  | 'LEAP_LUNGE'
  | 'CLOSET_INSPECT'
  | 'SEARCH_CLOSET'
  | 'EERIE_DANCE'
  | 'JUMPSCARE';

export interface PlayerContext {
  x: number;
  z: number;
  yaw: number;
  flashlightOn: boolean;
  crouching: boolean;
  sprinting: boolean;
  hiddenCloset: HidingSpotDef | null;
  holdingBreath: boolean;
}

export interface RabbitUpdateResult {
  caughtPlayer: boolean;
  ripClosetId: string | null;
  distance: number;
  panValue: number;
  fearLevel: number;
  isChasing: boolean;
  isInspectingCloset: boolean;
  justSpotted: boolean;
  justStareFroze: boolean;
  justKilledLight: boolean;
  justPeeked: boolean;
  justInspectingCloset: boolean;
  justScratchedCloset: boolean;
  wokeFromIntro: boolean;
  stepShake: number;
}

export class RabbitAI {
  root = new THREE.Group();
  model: THREE.Group | null = null;
  state: RabbitState = 'INTRO_SIT';
  loaded = false;
  private mixer: THREE.AnimationMixer | null = null;
  private actions = new Map<string, THREE.AnimationAction>();
  private activeClip: string | null = null;

  private headBone: THREE.Bone | null = null;
  private mouthBone: THREE.Bone | null = null;
  private spineBone: THREE.Bone | null = null;
  private earLeftBone: THREE.Bone | null = null;
  private earRightBone: THREE.Bone | null = null;

  private eyeGlintMat: THREE.MeshBasicMaterial;
  private eyeGlints: THREE.Mesh[] = [];
  private jumpscareLight: THREE.PointLight;

  private path: Array<{ x: number; z: number }> = [];
  private pathRecalcTimer = 0;
  private stateTimer = 0;
  private footstepTimer = 0;
  private leapCooldown = 4;
  private stareCooldown = 7;
  private peekCooldown = 10;
  private closetInspectCooldown = 0;
  private closetScratchPlayed = false;
  private closetBreathDanger = 0;
  private performCooldown = 16;
  private lastSeenPlayerPos: { x: number; z: number } | null = null;
  private loseSightTimer = 0;
  private sawPlayerRecentlyTimer = 0;
  private targetCloset: HidingSpotDef | null = null;
  private currentWaypointIdx = 0;
  private difficulty: 'normal' | 'nightmare' = 'normal';
  private lungeDir = new THREE.Vector2(0, 1);
  private peekLeanSide = 1;
  private peekSpottedFlash = false;

  private headTrackYaw = 0;
  private headTrackPitch = 0;
  private headTiltZ = 0;
  private twitchTimer = 0;
  private earTwitchL = 0;
  private earTwitchR = 0;

  constructor(scene: THREE.Scene) {
    this.root.position.set(RABBIT_INTRO_POS.x, 0, RABBIT_INTRO_POS.z);
    this.root.rotation.y = RABBIT_INTRO_POS.rotY;
    this.eyeGlintMat = new THREE.MeshBasicMaterial({
      color: 0xffd2d6,
      transparent: true,
      opacity: 0,
    });
    this.jumpscareLight = new THREE.PointLight(0xffd0c4, 0, 6.2, 1.5);
    this.jumpscareLight.position.set(0, 1.18, 1.05);
    this.root.add(this.jumpscareLight);
    scene.add(this.root);
  }

  async load(
    url: string,
    textures: {
      suitNormal: THREE.CanvasTexture;
      suitGrime: THREE.CanvasTexture;
      faceGrime: THREE.CanvasTexture;
    }
  ): Promise<void> {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(url);
    this.model = gltf.scene;

    const eyeMeshes: THREE.Mesh[] = [];

    this.model.traverse((obj) => {
      if ((obj as THREE.Bone).isBone) {
        const b = obj as THREE.Bone;
        if (b.name === 'Head') this.headBone = b;
        else if (b.name === 'Mouth') this.mouthBone = b;
        else if (b.name === 'Spine') this.spineBone = b;
        else if (/^Ear1[._]?L$/i.test(b.name)) this.earLeftBone = b;
        else if (/^Ear1[._]?R$/i.test(b.name)) this.earRightBone = b;
      }
      if ((obj as THREE.Mesh).isMesh) {
        const m = obj as THREE.Mesh;
        m.castShadow = true;
        m.receiveShadow = true;
        m.frustumCulled = false;

        if (m.name === 'Eye_L' || m.name === 'Eye_R') {
          // Wet hollow obsidian glass eyes catching harsh pinpoint reflections
          m.material = new THREE.MeshPhysicalMaterial({
            color: 0x050508,
            roughness: 0.015,
            metalness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.012,
            reflectivity: 1.0,
            envMapIntensity: 3.8,
          });
          eyeMeshes.push(m);
          return;
        }
        if (m.name === 'Mouth') {
          m.material = new THREE.MeshStandardMaterial({
            color: 0x030103,
            roughness: 0.99,
            metalness: 0,
            envMapIntensity: 0.04,
          });
          return;
        }
        if (m.name === 'Nose') {
          m.material = new THREE.MeshPhysicalMaterial({
            color: 0x0c0a0e,
            roughness: 0.15,
            metalness: 0.05,
            clearcoat: 0.9,
            envMapIntensity: 2.0,
          });
          return;
        }

        if (m.name === 'FacePanel') {
          // Damp, soiled off-white felt kigurumi face mask under midnight lighting
          m.material = new THREE.MeshPhysicalMaterial({
            map: textures.faceGrime,
            color: 0xc2bcb0,
            normalMap: textures.suitNormal,
            normalScale: new THREE.Vector2(1.05, 1.05),
            roughness: 0.92,
            metalness: 0.02,
            sheen: 0.42,
            sheenRoughness: 0.82,
            sheenColor: new THREE.Color(0xc4beb2),
            envMapIntensity: 0.52,
          });
          return;
        }

        // Photorealistic matted soiled abandoned purple plush kigurumi fabric!
        m.material = new THREE.MeshPhysicalMaterial({
          map: textures.suitGrime,
          color: 0x764aa8,
          normalMap: textures.suitNormal,
          normalScale: new THREE.Vector2(1.65, 1.65),
          roughness: 0.91,
          metalness: 0.02,
          sheen: 0.68,
          sheenRoughness: 0.78,
          sheenColor: new THREE.Color(0x8862be),
          envMapIntensity: 0.62,
        });
      }
    });

    this.root.add(this.model);
    this.root.updateMatrixWorld(true);

    // Pinpoint nocturnal tapetum-lucidum eye-glints anchored directly onto Eye_L / Eye_R corneas
    if (this.headBone && eyeMeshes.length > 0) {
      const geo = new THREE.SphereGeometry(0.0062, 8, 8);
      for (const em of eyeMeshes) {
        em.geometry.computeBoundingBox();
        const bb = em.geometry.boundingBox;
        if (!bb) continue;
        const localCenter = new THREE.Vector3(
          (bb.min.x + bb.max.x) * 0.5,
          (bb.min.y + bb.max.y) * 0.5,
          bb.max.z + 0.0025
        );
        const worldPos = localCenter.applyMatrix4(em.matrixWorld);
        const headLocal = this.headBone.worldToLocal(worldPos.clone());
        const dot = new THREE.Mesh(geo, this.eyeGlintMat);
        dot.position.copy(headLocal);
        this.headBone.add(dot);
        this.eyeGlints.push(dot);
      }
    }
    this.mixer = new THREE.AnimationMixer(this.model);
    for (const name of ['Walk', 'Run', 'Leap', 'Sit', 'Dance', 'Spin', 'Jump']) {
      const clip = THREE.AnimationClip.findByName(gltf.animations, name);
      if (clip) {
        const act = this.mixer.clipAction(clip);
        act.setLoop(THREE.LoopRepeat, Infinity);
        this.actions.set(name, act);
      }
    }

    this.loaded = true;
    this.playClip('Sit', 0.01, 0.6);
  }

  setDifficulty(d: 'normal' | 'nightmare'): void {
    this.difficulty = d;
  }

  reset(): void {
    this.root.position.set(RABBIT_INTRO_POS.x, 0, RABBIT_INTRO_POS.z);
    this.root.rotation.y = RABBIT_INTRO_POS.rotY;
    this.state = 'INTRO_SIT';
    this.path = [];
    this.pathRecalcTimer = 0;
    this.stateTimer = 0;
    this.footstepTimer = 0;
    this.leapCooldown = 4;
    this.stareCooldown = 7;
    this.peekCooldown = 8;
    this.closetInspectCooldown = 0;
    this.closetScratchPlayed = false;
    this.closetBreathDanger = 0;
    this.performCooldown = 16;
    this.lastSeenPlayerPos = null;
    this.loseSightTimer = 0;
    this.sawPlayerRecentlyTimer = 0;
    this.targetCloset = null;
    this.currentWaypointIdx = 0;
    this.headTrackYaw = 0;
    this.headTrackPitch = 0;
    this.headTiltZ = 0;
    this.jumpscareLight.intensity = 0;
    this.eyeGlintMat.opacity = 0;
    this.playClip('Sit', 0.15, 0.55);
  }

  private playClip(name: string, fade = 0.22, speed = 1): void {
    const act = this.actions.get(name);
    if (!act) return;
    if (this.activeClip === name) {
      act.timeScale = speed;
      return;
    }
    const prev = this.activeClip ? this.actions.get(this.activeClip) : null;
    act.reset();
    act.enabled = true;
    act.setEffectiveWeight(1);
    act.timeScale = speed;
    act.play();
    if (prev && prev !== act) prev.crossFadeTo(act, fade, false);
    this.activeClip = name;
  }

  updateTitleShowcase(dt: number, elapsed: number): void {
    if (!this.loaded || !this.mixer) return;
    this.root.position.set(62.8, 0, 30.1);
    this.root.rotation.y = -Math.PI * 0.56 + Math.sin(elapsed * 0.34) * 0.22;
    this.jumpscareLight.intensity = 0;
    if (elapsed % 16 < 10) this.playClip('Sit', 0.5, 0.42);
    else this.playClip('Dance', 0.5, 0.5);
    this.eyeGlintMat.color.setHex(0xff5258);
    this.eyeGlintMat.opacity = 0.34 + 0.24 * Math.sin(elapsed * 2.4);
    this.mixer.update(dt);
    if (this.spineBone) this.spineBone.rotation.x += Math.sin(elapsed * 1.9) * 0.032;
    if (this.earLeftBone && this.earRightBone) {
      const twitch = Math.sin(elapsed * 13) > 0.96 ? 0.18 : 0;
      this.earLeftBone.rotation.z += Math.sin(elapsed * 0.8) * 0.04 + twitch;
      this.earRightBone.rotation.z -= Math.sin(elapsed * 0.8 + 0.7) * 0.04;
    }
    if (this.headBone) {
      this.headBone.rotation.y += Math.sin(elapsed * 0.85) * 0.14;
      this.headBone.rotation.x += 0.08;
      this.headBone.rotation.z += Math.sin(elapsed * 0.42) * 0.16;
    }
  }

  hearSound(x: number, z: number, priority: 'medium' | 'high'): void {
    if (this.state === 'JUMPSCARE') return;
    const d = Math.hypot(x - this.root.position.x, z - this.root.position.z);
    if (priority === 'medium' && d > 20) return;
    if (this.state === 'INTRO_SIT') this.state = 'INVESTIGATE';
    if (this.state === 'CHASE' && this.loseSightTimer < 1.2 && priority !== 'high') return;
    this.lastSeenPlayerPos = { x, z };
    if (
      this.state !== 'CHASE' &&
      this.state !== 'LEAP_LUNGE' &&
      this.state !== 'SEARCH_CLOSET' &&
      this.state !== 'CLOSET_INSPECT'
    ) {
      if (priority === 'high' && d > 5) {
        this.state = 'ALERT_HOP';
        this.stateTimer = 0.68;
        this.playClip('Jump', 0.15, 1.48);
      } else {
        this.state = 'INVESTIGATE';
        this.playClip('Walk', 0.2, 1.38);
      }
      this.path = findGridPath({ x: this.root.position.x, z: this.root.position.z }, { x, z });
      this.pathRecalcTimer = 0.85;
    }
  }

  notifyPlayerEnteredCloset(spot: HidingSpotDef): void {
    if (this.state === 'JUMPSCARE') return;
    if (this.sawPlayerRecentlyTimer > 0) {
      this.targetCloset = spot;
      this.state = 'SEARCH_CLOSET';
      this.stateTimer = 0;
      this.path = findGridPath(
        { x: this.root.position.x, z: this.root.position.z },
        { x: spot.exitX, z: spot.exitZ }
      );
      this.playClip('Run', 0.18, 1.32);
      return;
    }
    const d = Math.hypot(spot.exitX - this.root.position.x, spot.exitZ - this.root.position.z);
    if (
      this.closetInspectCooldown <= 0 &&
      d < 16.5 &&
      (this.state === 'CHASE' || this.state === 'INVESTIGATE' || this.state === 'ALERT_HOP' || this.state === 'PEEK_CORNER')
    ) {
      this.targetCloset = spot;
      this.state = 'CLOSET_INSPECT';
      this.stateTimer = 0;
      this.closetScratchPlayed = false;
      this.closetBreathDanger = 0;
      this.closetInspectCooldown = 22;
      this.path = findGridPath(
        { x: this.root.position.x, z: this.root.position.z },
        { x: spot.exitX, z: spot.exitZ }
      );
      this.playClip('Walk', 0.24, 1.15);
    }
  }

  triggerJumpscarePose(camPos: THREE.Vector3, playerYaw: number): void {
    this.state = 'JUMPSCARE';
    this.stateTimer = 0;
    const fx = -Math.sin(playerYaw);
    const fz = -Math.cos(playerYaw);
    this.root.position.set(camPos.x + fx * 1.0, 0, camPos.z + fz * 1.0);
    this.root.rotation.y = Math.atan2(camPos.x - this.root.position.x, camPos.z - this.root.position.z);
    this.playClip('Leap', 0.04, 1.48);
    this.eyeGlintMat.opacity = 1;
  }

  update(
    dt: number,
    elapsed: number,
    charges: number,
    player: PlayerContext,
    collision: CollisionSystem,
    audio: HorrorAudio
  ): RabbitUpdateResult {
    const rx = this.root.position.x;
    const rz = this.root.position.z;
    const dist = Math.hypot(player.x - rx, player.z - rz);
    const rightX = Math.cos(player.yaw);
    const rightZ = -Math.sin(player.yaw);
    const pan = ((rx - player.x) / Math.max(0.01, dist)) * rightX + ((rz - player.z) / Math.max(0.01, dist)) * rightZ;

    const out: RabbitUpdateResult = {
      caughtPlayer: false,
      ripClosetId: null,
      distance: dist,
      panValue: pan,
      fearLevel: 0,
      isChasing: this.state === 'CHASE' || this.state === 'LEAP_LUNGE',
      isInspectingCloset: this.state === 'CLOSET_INSPECT' && this.stateTimer > 0.2,
      justSpotted: false,
      justStareFroze: false,
      justKilledLight: false,
      justPeeked: false,
      justInspectingCloset: false,
      justScratchedCloset: false,
      wokeFromIntro: false,
      stepShake: 0,
    };

    if (!this.loaded || !this.mixer) return out;

    if (this.state === 'JUMPSCARE') {
      this.stateTimer += dt;
      const slow = this.stateTimer < 0.14;
      const redStrobe = !slow && Math.sin(elapsed * 56) > 0;
      this.jumpscareLight.color.setHex(redStrobe ? 0xff1c24 : 0xfff0d8);
      this.jumpscareLight.intensity = slow ? 5.2 : redStrobe ? 4.4 : 3.0;
      this.eyeGlintMat.color.setHex(0xff101a);
      this.eyeGlintMat.opacity = 1;
      this.mixer.update(slow ? dt * 0.18 : dt * 1.18);
      if (this.mouthBone) this.mouthBone.scale.set(1.48, 1.24, 2.25);
      if (this.headBone) this.headBone.rotation.z += Math.sin(elapsed * 52) * (slow ? 0.06 : 0.3);
      out.fearLevel = 1;
      out.isChasing = true;
      return out;
    }

    this.jumpscareLight.intensity = 0;
    this.leapCooldown = Math.max(0, this.leapCooldown - dt);
    this.stareCooldown = Math.max(0, this.stareCooldown - dt);
    this.peekCooldown = Math.max(0, this.peekCooldown - dt);
    this.closetInspectCooldown = Math.max(0, this.closetInspectCooldown - dt);
    this.performCooldown = Math.max(0, this.performCooldown - dt);
    this.sawPlayerRecentlyTimer = Math.max(0, this.sawPlayerRecentlyTimer - dt);

    const vis = this.evaluateVision(player, dist, charges, collision);
    const nm = this.difficulty === 'nightmare';
    const patrolSpd = (nm ? 3.55 : 2.85) + charges * 0.26;
    const chaseSpd = (nm ? 6.0 : 5.2) + charges * 0.34;
    const invSpd = (nm ? 4.4 : 3.7) + charges * 0.24;

    if (vis.canSee) {
      this.lastSeenPlayerPos = { x: player.x, z: player.z };
      this.loseSightTimer = 0;
      this.sawPlayerRecentlyTimer = 1.6;
    }

    // Hearing player running / walking footsteps
    if (!player.hiddenCloset && player.sprinting && dist < (nm ? 16 : 12.5)) {
      this.hearSound(player.x, player.z, 'medium');
    }

    const angleToPlayer = Math.atan2(player.x - rx, player.z - rz);

    switch (this.state) {
      case 'INTRO_SIT': {
        this.playClip('Sit', 0.2, 0.5);
        this.smoothRotateY(angleToPlayer, dt * 1.6);
        if (dist < 17.5 || (vis.playerAimingAtRabbit && dist < 24 && player.flashlightOn) || charges > 0) {
          this.state = 'STARE_FREEZE';
          this.stateTimer = 0;
          out.wokeFromIntro = true;
          this.playClip('Sit', 0.1, 0.05);
        }
        break;
      }

      case 'PATROL': {
        if (vis.canSee) {
          if (this.stareCooldown <= 0 && dist > 6.0 && dist < 21) {
            this.state = 'STARE_FREEZE';
            this.stateTimer = 0;
            this.stareCooldown = nm ? 11 : 14;
            out.justStareFroze = true;
            this.playClip('Sit', 0.15, 0.06);
          } else {
            this.enterChase(player, out);
          }
          break;
        }

        // Check if near a Shinjuku J・ADビジョン / Platform Pillar to perform a terrifying CORNER PEEK!
        if (
          this.peekCooldown <= 0 &&
          !player.hiddenCloset &&
          dist > 8.5 &&
          dist < 24 &&
          collision.hasLineOfSight(rx, rz, player.x, player.z)
        ) {
          for (const pil of PEEK_PILLARS) {
            if (Math.hypot(rx - pil.x, rz - pil.z) < 3.1) {
              this.state = 'PEEK_CORNER';
              this.stateTimer = 0;
              this.peekSpottedFlash = false;
              this.peekCooldown = nm ? 12 : 16;
              this.peekLeanSide = Math.random() < 0.5 ? 1 : -1;
              this.playClip('Sit', 0.25, 0.08);
              out.justPeeked = true;
              break;
            }
          }
          if (this.state === 'PEEK_CORNER') break;
        }

        if (this.performCooldown <= 0 && dist > 10 && dist < 24 && Math.random() < 0.012) {
          this.state = 'EERIE_DANCE';
          this.stateTimer = 5.5 + Math.random() * 4;
          this.performCooldown = 28;
          this.playClip(Math.random() < 0.55 ? 'Dance' : 'Spin', 0.35, 0.72);
          break;
        }

        if (this.path.length === 0) {
          this.currentWaypointIdx = (this.currentWaypointIdx + 1 + Math.floor(Math.random() * 3)) % PATROL_WAYPOINTS.length;
          const wp = PATROL_WAYPOINTS[this.currentWaypointIdx];
          this.path = findGridPath({ x: rx, z: rz }, wp);
        }
        this.playClip('Walk', 0.25, 1.05 + charges * 0.06);
        this.followPath(patrolSpd, dt, collision, audio, dist, pan, false, out);
        break;
      }

      case 'PEEK_CORNER': {
        // Uncanny leaning out from behind a glowing Shinjuku pillar staring silently at the player!
        this.stateTimer += dt;
        this.smoothRotateY(angleToPlayer, dt * 4.5);
        if (vis.playerAimingAtRabbit && player.flashlightOn) {
          this.peekSpottedFlash = true;
        }
        if (dist < 7.5) {
          this.enterChase(player, out);
          break;
        }
        if (this.peekSpottedFlash && this.stateTimer > 0.85) {
          if (Math.random() < 0.58) {
            // Sudden neck snap + domino light blowout!
            this.state = 'STARE_FREEZE';
            this.stateTimer = 0;
            this.stareCooldown = 16;
            out.justStareFroze = true;
          } else {
            // Pulls eerily back behind pillar & flanks you!
            this.state = 'INVESTIGATE';
            this.lastSeenPlayerPos = { x: player.x, z: player.z };
            this.path = findGridPath({ x: rx, z: rz }, PATROL_WAYPOINTS[Math.floor(Math.random() * PATROL_WAYPOINTS.length)]);
            this.playClip('Run', 0.16, 1.25);
          }
          break;
        }
        if (this.stateTimer > 4.2) {
          this.state = 'PATROL';
          this.path = [];
        }
        break;
      }

      case 'EERIE_DANCE': {
        this.stateTimer -= dt;
        if (vis.canSee || dist < 9.5) {
          this.enterChase(player, out);
        } else if (this.stateTimer <= 0) {
          this.state = 'PATROL';
        }
        break;
      }

      case 'ALERT_HOP': {
        this.stateTimer -= dt;
        if (this.lastSeenPlayerPos) {
          this.smoothRotateY(Math.atan2(this.lastSeenPlayerPos.x - rx, this.lastSeenPlayerPos.z - rz), dt * 8);
        }
        if (vis.canSee) this.enterChase(player, out);
        else if (this.stateTimer <= 0) {
          this.state = 'INVESTIGATE';
          this.playClip('Walk', 0.18, 1.38);
        }
        break;
      }

      case 'INVESTIGATE': {
        if (vis.canSee) {
          this.enterChase(player, out);
          break;
        }
        this.playClip('Walk', 0.22, 1.32);
        const reached = this.followPath(invSpd, dt, collision, audio, dist, pan, false, out);
        if (reached || this.path.length === 0) {
          this.state = 'PATROL';
          this.path = [];
        }
        break;
      }

      case 'STARE_FREEZE': {
        // Light-killer freeze: unhinges jaw, cracks neck, blows out overhead fluorescent lights in a domino wave!
        this.stateTimer += dt;
        this.smoothRotateY(angleToPlayer, dt * 6);
        if (this.stateTimer > 0.42 && this.stateTimer - dt <= 0.42) {
          out.justKilledLight = true;
        }
        if (this.stateTimer > (nm ? 1.15 : 1.45) || dist < 5.5) {
          this.enterChase(player, out);
        }
        break;
      }

      case 'CHASE': {
        out.isChasing = true;
        if (player.hiddenCloset && this.sawPlayerRecentlyTimer <= 0) {
          this.state = 'INVESTIGATE';
          break;
        }
        if (!vis.canSee) {
          this.loseSightTimer += dt;
          if (this.loseSightTimer > (nm ? 5.6 : 4.2)) {
            this.state = 'INVESTIGATE';
            break;
          }
        }
        if (dist < 1.38 && !player.hiddenCloset) {
          out.caughtPlayer = true;
          break;
        }
        if (this.leapCooldown <= 0 && dist > 3.2 && dist < 6.4 && vis.canSee) {
          this.state = 'LEAP_LUNGE';
          this.stateTimer = 0.56;
          this.leapCooldown = nm ? 5.5 : 8.0;
          const d = Math.max(0.01, dist);
          this.lungeDir.set((player.x - rx) / d, (player.z - rz) / d);
          this.playClip('Leap', 0.08, 1.5);
          break;
        }

        this.pathRecalcTimer -= dt;
        if (this.pathRecalcTimer <= 0 && this.lastSeenPlayerPos) {
          this.pathRecalcTimer = 0.38;
          this.path = findGridPath({ x: rx, z: rz }, this.lastSeenPlayerPos);
        }
        this.playClip('Run', 0.14, 1.24 + charges * 0.06);
        this.followPath(chaseSpd, dt, collision, audio, dist, pan, true, out);
        break;
      }

      case 'LEAP_LUNGE': {
        out.isChasing = true;
        this.stateTimer -= dt;
        const spd = chaseSpd * 1.48;
        const resolved = collision.resolveCircle(
          rx + this.lungeDir.x * spd * dt,
          rz + this.lungeDir.y * spd * dt,
          0.54
        );
        this.root.position.set(resolved.x, 0, resolved.z);
        this.smoothRotateY(Math.atan2(this.lungeDir.x, this.lungeDir.y), dt * 12);
        if (Math.hypot(player.x - resolved.x, player.z - resolved.z) < 1.42 && !player.hiddenCloset) {
          out.caughtPlayer = true;
          break;
        }
        if (this.stateTimer <= 0) {
          this.state = 'CHASE';
          this.playClip('Run', 0.15, 1.3);
        }
        break;
      }

      case 'SEARCH_CLOSET': {
        out.isChasing = true;
        if (!this.targetCloset || !player.hiddenCloset) {
          this.state = 'PATROL';
          break;
        }
        this.playClip('Run', 0.15, 1.35);
        const reached = this.followPath(chaseSpd * 0.96, dt, collision, audio, dist, pan, true, out);
        if (reached || Math.hypot(rx - this.targetCloset.exitX, rz - this.targetCloset.exitZ) < 1.1) {
          out.caughtPlayer = true;
          out.ripClosetId = this.targetCloset.id;
        }
        break;
      }

      case 'CLOSET_INSPECT': {
        if (!this.targetCloset || !player.hiddenCloset) {
          this.state = 'PATROL';
          break;
        }
        const dDoor = Math.hypot(rx - this.targetCloset.exitX, rz - this.targetCloset.exitZ);
        if (dDoor > 0.78 && this.stateTimer === 0) {
          this.playClip('Walk', 0.2, 1.08);
          this.followPath(invSpd * 0.85, dt, collision, audio, dist, pan, false, out);
        } else {
          if (this.stateTimer === 0) out.justInspectingCloset = true;
          this.stateTimer += dt;
          out.isInspectingCloset = true;
          // Presses its face right up to the locker slats / phone booth glass!
          this.root.position.lerp(
            new THREE.Vector3(this.targetCloset.exitX, 0, this.targetCloset.exitZ),
            Math.min(1, dt * 6)
          );
          this.smoothRotateY(Math.atan2(this.targetCloset.insideX - rx, this.targetCloset.insideZ - rz), dt * 8);
          this.playClip('Sit', 0.25, 0.14);

          if (!this.closetScratchPlayed && this.stateTimer > 1.55) {
            this.closetScratchPlayed = true;
            out.justScratchedCloset = true;
          }

          // BREATH-HOLDING & FLASHLIGHT CHECK!
          if (player.flashlightOn) {
            out.caughtPlayer = true;
            out.ripClosetId = this.targetCloset.id;
            break;
          }
          if (!player.holdingBreath) {
            this.closetBreathDanger += dt;
            if (this.closetBreathDanger > (nm ? 1.55 : 2.25)) {
              out.caughtPlayer = true;
              out.ripClosetId = this.targetCloset.id;
              break;
            }
          } else {
            this.closetBreathDanger = Math.max(0, this.closetBreathDanger - dt * 0.6);
          }

          if (this.stateTimer > 4.6) {
            this.state = 'PATROL';
            this.targetCloset = null;
            this.path = [];
          }
        }
        break;
      }
    }

    // Update GLB animation mixer
    this.mixer.update(dt);

    // Procedural uncanny bone terror layered over animations!
    this.applyProceduralHorrorBones(dt, elapsed, dist, angleToPlayer, vis.playerAimingAtRabbit);

    // Fear level calculation
    let fear = Math.max(0, 1 - dist / 22);
    if (out.isChasing) fear = Math.max(fear, 0.78);
    if (this.state === 'STARE_FREEZE' || this.state === 'CLOSET_INSPECT') fear = Math.max(fear, 0.88);
    if (this.state === 'PEEK_CORNER' && vis.playerAimingAtRabbit) fear = Math.max(fear, 0.72);
    out.fearLevel = Math.min(1, fear);

    // Tapetum-lucidum nocturnal eye glint — catches eerie light down dark Shinjuku corridors!
    const wantGlow =
      this.state === 'CHASE' ||
      this.state === 'LEAP_LUNGE' ||
      this.state === 'STARE_FREEZE' ||
      this.state === 'CLOSET_INSPECT' ||
      this.state === 'PEEK_CORNER' ||
      dist < 22 ||
      (vis.playerAimingAtRabbit && player.flashlightOn);
    this.eyeGlintMat.color.setHex(
      this.state === 'CHASE' || this.state === 'STARE_FREEZE' || this.state === 'CLOSET_INSPECT'
        ? 0xff1a24
        : 0xffe0e4
    );
    this.eyeGlintMat.opacity += ((wantGlow ? 0.96 : 0.28) - this.eyeGlintMat.opacity) * Math.min(1, dt * 8);

    return out;
  }

  private applyProceduralHorrorBones(
    dt: number,
    elapsed: number,
    dist: number,
    angleToPlayer: number,
    aimedAt: boolean
  ): void {
    this.twitchTimer -= dt;
    if (this.twitchTimer <= 0) {
      this.twitchTimer = 0.65 + Math.random() * 1.9;
      this.earTwitchL = (Math.random() - 0.5) * 0.34;
      this.earTwitchR = (Math.random() - 0.5) * 0.34;
    }
    this.earTwitchL *= Math.max(0, 1 - dt * 5);
    this.earTwitchR *= Math.max(0, 1 - dt * 5);

    if (this.earLeftBone) this.earLeftBone.rotation.z += this.earTwitchL;
    if (this.earRightBone) this.earRightBone.rotation.z += this.earTwitchR;

    // Spine corner-lean during PEEK_CORNER or creepy hunched crouch during CLOSET_INSPECT
    if (this.spineBone) {
      if (this.state === 'PEEK_CORNER') {
        const lean = Math.min(1, this.stateTimer * 2.4) * 0.46 * this.peekLeanSide;
        this.spineBone.rotation.z += lean;
        this.spineBone.rotation.x += 0.14;
      } else if (this.state === 'CLOSET_INSPECT') {
        this.spineBone.rotation.x += 0.3 + Math.sin(elapsed * 3.4) * 0.06;
      } else if (this.state === 'CHASE') {
        this.spineBone.rotation.x += 0.24;
      }
    }

    // Uncanny Head tracking + bone-crack 38° tilt + pre-sprint tremor during STARE_FREEZE!
    if (this.headBone) {
      let relYaw = angleToPlayer - this.root.rotation.y;
      while (relYaw > Math.PI) relYaw -= Math.PI * 2;
      while (relYaw < -Math.PI) relYaw += Math.PI * 2;
      const targetYaw = dist < 24 ? Math.max(-0.85, Math.min(0.85, relYaw)) : 0;
      const stareJitter =
        this.state === 'STARE_FREEZE' && Math.sin(elapsed * 43) > 0.78 ? (Math.random() - 0.5) * 0.14 : 0;
      const targetTilt =
        this.state === 'STARE_FREEZE'
          ? 0.62 * Math.sign(Math.sin(elapsed * 0.7) || 1) + stareJitter
          : this.state === 'PEEK_CORNER'
            ? 0.38 * this.peekLeanSide
            : this.state === 'CLOSET_INSPECT'
              ? Math.sin(elapsed * 2.5) * 0.34
              : aimedAt
                ? 0.24
                : Math.sin(elapsed * 0.9) * 0.08;

      this.headTrackYaw += (targetYaw - this.headTrackYaw) * Math.min(1, dt * 6);
      this.headTiltZ += (targetTilt - this.headTiltZ) * Math.min(1, dt * 7);
      this.headBone.rotation.y += this.headTrackYaw;
      this.headBone.rotation.z += this.headTiltZ;
    }

    // Mouth unhinges wider when staring, hunting, or peering into your locker!
    if (this.mouthBone) {
      const openAmt =
        this.state === 'STARE_FREEZE'
          ? 1.65
          : this.state === 'CHASE' || this.state === 'LEAP_LUNGE'
            ? 1.52 + Math.sin(elapsed * 14) * 0.18
            : this.state === 'CLOSET_INSPECT'
              ? 1.45 + Math.sin(elapsed * 6) * 0.12
              : 1.0;
      this.mouthBone.scale.set(1 + (openAmt - 1) * 0.35, 1 + (openAmt - 1) * 0.25, openAmt);
    }
  }

  private evaluateVision(
    player: PlayerContext,
    dist: number,
    charges: number,
    collision: CollisionSystem
  ): { canSee: boolean; playerAimingAtRabbit: boolean } {
    const dx = this.root.position.x - player.x;
    const dz = this.root.position.z - player.z;
    const len = Math.max(0.01, Math.hypot(dx, dz));
    const lookX = -Math.sin(player.yaw);
    const lookZ = -Math.cos(player.yaw);
    const playerDot = (dx / len) * lookX + (dz / len) * lookZ;
    const playerAimingAtRabbit = playerDot > 0.84;

    if (player.hiddenCloset) return { canSee: false, playerAimingAtRabbit };

    const nm = this.difficulty === 'nightmare';
    let maxRange = player.flashlightOn ? (nm ? 23 : 19) : player.crouching ? (nm ? 8.5 : 6.2) : (nm ? 13.5 : 10.5);
    maxRange += charges * 1.1;
    if (dist > maxRange) return { canSee: false, playerAimingAtRabbit };

    const los = collision.hasLineOfSight(this.root.position.x, this.root.position.z, player.x, player.z);
    if (!los) return { canSee: false, playerAimingAtRabbit };

    // Rabbit forward cone (wider if close or shining flashlight straight at it)
    const rFwdX = Math.sin(this.root.rotation.y);
    const rFwdZ = Math.cos(this.root.rotation.y);
    const toPlayerDot = (-dx / len) * rFwdX + (-dz / len) * rFwdZ;
    const seen = dist < 4.5 || toPlayerDot > 0.18 || (player.flashlightOn && playerAimingAtRabbit && dist < 18);
    return { canSee: seen, playerAimingAtRabbit };
  }

  private enterChase(player: PlayerContext, out: RabbitUpdateResult): void {
    const wasChasing = this.state === 'CHASE' || this.state === 'LEAP_LUNGE';
    this.state = 'CHASE';
    this.lastSeenPlayerPos = { x: player.x, z: player.z };
    this.loseSightTimer = 0;
    this.path = findGridPath({ x: this.root.position.x, z: this.root.position.z }, this.lastSeenPlayerPos);
    this.pathRecalcTimer = 0.35;
    if (!wasChasing) out.justSpotted = true;
    this.playClip('Run', 0.12, 1.3);
  }

  private followPath(
    speed: number,
    dt: number,
    collision: CollisionSystem,
    audio: HorrorAudio,
    distToPlayer: number,
    pan: number,
    chasing: boolean,
    out: RabbitUpdateResult
  ): boolean {
    if (this.path.length === 0) return true;
    const target = this.path[0];
    const dx = target.x - this.root.position.x;
    const dz = target.z - this.root.position.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.42) {
      this.path.shift();
      return this.path.length === 0;
    }
    const step = Math.min(d, speed * dt);
    const nx = this.root.position.x + (dx / d) * step;
    const nz = this.root.position.z + (dz / d) * step;
    const res = collision.resolveCircle(nx, nz, 0.54);
    this.root.position.set(res.x, 0, res.z);
    this.smoothRotateY(Math.atan2(dx, dz), dt * (chasing ? 10 : 6));

    this.footstepTimer -= dt;
    if (this.footstepTimer <= 0) {
      this.footstepTimer = chasing ? 0.3 : 0.54;
      audio.playRabbitStep(distToPlayer, pan, chasing);
      if (distToPlayer < 14) {
        out.stepShake = Math.max(out.stepShake, (1 - distToPlayer / 14) * (chasing ? 0.24 : 0.1));
      }
    }
    return false;
  }

  private smoothRotateY(target: number, alpha: number): void {
    let diff = target - this.root.rotation.y;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    this.root.rotation.y += diff * Math.min(1, alpha);
  }
}
