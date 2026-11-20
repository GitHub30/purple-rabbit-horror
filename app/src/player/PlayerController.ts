import * as THREE from 'three';
import { CollisionSystem } from '../station/CollisionSystem';
import { HidingSpotDef, PLAYER_SPAWN } from '../station/shinjukuMap';
import { HorrorAudio } from '../audio/HorrorAudio';
import { TouchControls } from './TouchControls';

export interface PlayerCallbacks {
  onInteractTap: () => void;
  onTogglePause: () => void;
  onCoinLand: (x: number, z: number) => void;
}

interface ThrownCoin {
  mesh: THREE.Mesh;
  vel: THREE.Vector3;
  bounced: boolean;
  life: number;
}

export class PlayerController {
  position = new THREE.Vector3(PLAYER_SPAWN.x, 1.62, PLAYER_SPAWN.z);
  yaw = PLAYER_SPAWN.yaw;
  pitch = 0;
  sensitivity = 1.0;
  stamina = 1.0;
  exhausted = false;
  breath = 1.0;
  holdingBreath = false;
  breathLockout = 0;
  flashlightOn = true;
  crouching = false;
  sprinting = false;
  hiddenCloset: HidingSpotDef | null = null;
  coins = 2;
  coinsTossed = 0;
  pointerLocked = false;
  touch: TouchControls;

  private active = false;
  private keys = new Set<string>();
  private dragging = false;
  private lastPointerX = 0;
  private lastPointerY = 0;
  private eyeHeight = 1.62;
  private headBobPhase = 0;
  private stepAccum = 0;
  private strafeRoll = 0;
  private cameraShake = 0;
  private hideYawBase = 0;
  private hideYawOffset = 0;

  // Handheld flashlight inertia (trails slightly behind view like Outlast / RE7!)
  private flYaw = PLAYER_SPAWN.yaw;
  private flPitch = 0;
  private flashlight: THREE.SpotLight;
  private flashlightTarget: THREE.Object3D;
  private fillLight: THREE.PointLight;
  private flashlightBeam: THREE.Mesh;
  private flashlightBeamMat: THREE.ShaderMaterial;

  private coinGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.015, 12);
  private coinMat = new THREE.MeshStandardMaterial({
    color: 0xeaeef2,
    roughness: 0.16,
    metalness: 0.96,
  });
  private activeCoins: ThrownCoin[] = [];

  constructor(
    private canvas: HTMLCanvasElement,
    private scene: THREE.Scene,
    private cb: PlayerCallbacks,
    flashlightCookie: THREE.CanvasTexture
  ) {
    // Dynamic Shadow-Casting Tactical Flashlight (crisp narrow horror beam without washing out signs!)
    this.flashlight = new THREE.SpotLight(0xfff1de, 19, 28, Math.PI * 0.23, 0.64, 1.48);
    this.flashlight.map = flashlightCookie;
    this.flashlight.castShadow = true;
    const sm = window.innerWidth <= 900 ? 512 : 1024;
    this.flashlight.shadow.mapSize.set(sm, sm);
    this.flashlight.shadow.camera.near = 0.2;
    this.flashlight.shadow.camera.far = 26;
    this.flashlight.shadow.bias = -0.0009;

    this.flashlightTarget = new THREE.Object3D();
    this.flashlight.target = this.flashlightTarget;

    // Subtle close bounce fill around player
    this.fillLight = new THREE.PointLight(0x88a8bc, 0.62, 5.4, 2.0);

    // Subtle volumetric handheld flashlight dust beam
    const coneGeo = new THREE.ConeGeometry(1.4, 6.4, 18, 1, true);
    coneGeo.translate(0, -3.2, 0);
    coneGeo.rotateX(Math.PI / 2);
    this.flashlightBeamMat = new THREE.ShaderMaterial({
      uniforms: {
        uOpacity: { value: 0.02 },
        uColor: { value: new THREE.Color(0xc2d8e2) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vFresnel;
        void main() {
          vUv = uv;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vec3 viewDir = normalize(-mvPos.xyz);
          vec3 n = normalize(normalMatrix * normal);
          vFresnel = pow(max(0.0, dot(n, viewDir)), 3.2);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform float uOpacity;
        uniform vec3 uColor;
        varying vec2 vUv;
        varying float vFresnel;
        void main() {
          float nearFade = smoothstep(0.95, 0.52, vUv.y);
          float farFade = smoothstep(0.16, 0.65, vUv.y);
          float alpha = nearFade * farFade * vFresnel * uOpacity;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
    });
    this.flashlightBeam = new THREE.Mesh(coneGeo, this.flashlightBeamMat);
    this.flashlightBeam.frustumCulled = false;

    scene.add(this.flashlight, this.flashlightTarget, this.fillLight, this.flashlightBeam);

    this.touch = new TouchControls(canvas, {
      onLookDelta: (dx, dy) => this.applyLookDelta(dx, dy),
      onInteractTap: () => this.cb.onInteractTap(),
      onToggleFlashlight: () => window.dispatchEvent(new CustomEvent('game:toggle-flashlight')),
      onToggleCrouch: () => {
        if (!this.hiddenCloset) this.crouching = !this.crouching;
      },
      onTossCoin: () => window.dispatchEvent(new CustomEvent('game:toss-coin')),
      onToggleMap: () => window.dispatchEvent(new CustomEvent('game:toggle-map')),
    });

    this.bindEvents();
  }

  addCameraShake(amount: number): void {
    this.cameraShake = Math.min(1, Math.max(this.cameraShake, amount));
  }

  setTouchUIMode(mode: 'auto' | 'on' | 'off'): void {
    this.touch.setMode(mode);
  }

  setActive(a: boolean): void {
    this.active = a;
    this.touch.setActive(a);
    if (!a) {
      this.keys.clear();
      this.dragging = false;
      this.holdingBreath = false;
      if (document.pointerLockElement === this.canvas) {
        document.exitPointerLock?.();
      }
    }
  }

  requestLock(): void {
    if (this.touch.enabled) return;
    try {
      const p = this.canvas.requestPointerLock?.() as unknown as Promise<void> | undefined;
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch {}
  }

  reset(): void {
    this.position.set(PLAYER_SPAWN.x, 1.62, PLAYER_SPAWN.z);
    this.yaw = PLAYER_SPAWN.yaw;
    this.pitch = 0;
    this.flYaw = PLAYER_SPAWN.yaw;
    this.flPitch = 0;
    this.stamina = 1.0;
    this.exhausted = false;
    this.breath = 1.0;
    this.holdingBreath = false;
    this.breathLockout = 0;
    this.flashlightOn = true;
    this.crouching = false;
    this.sprinting = false;
    this.hiddenCloset = null;
    this.coins = 2;
    this.coinsTossed = 0;
    this.eyeHeight = 1.62;
    this.headBobPhase = 0;
    this.keys.clear();
    this.touch.resetInputs();
    for (const c of this.activeCoins) this.scene.remove(c.mesh);
    this.activeCoins.length = 0;
  }

  isInteractHeld(): boolean {
    return this.keys.has('KeyE') || this.touch.state.interactHeld;
  }

  isHoldBreathInput(): boolean {
    return (
      this.keys.has('Space') ||
      this.keys.has('KeyB') ||
      this.keys.has('ShiftLeft') ||
      this.touch.state.holdBreathHeld
    );
  }

  enterCloset(spot: HidingSpotDef): void {
    this.hiddenCloset = spot;
    this.crouching = false;
    this.sprinting = false;
    this.flashlightOn = false;
    this.position.set(spot.insideX, 1.54, spot.insideZ);
    this.hideYawBase = spot.rotY + Math.PI;
    this.hideYawOffset = 0;
    this.yaw = this.hideYawBase;
    this.pitch = 0;
    this.flYaw = this.yaw;
    this.flPitch = 0;
  }

  exitCloset(): HidingSpotDef | null {
    const c = this.hiddenCloset;
    if (!c) return null;
    this.hiddenCloset = null;
    this.holdingBreath = false;
    this.position.set(c.exitX, 1.62, c.exitZ);
    this.yaw = c.rotY + Math.PI;
    return c;
  }

  tossCoin(audio: HorrorAudio): boolean {
    if (!this.active || this.hiddenCloset || this.coins <= 0) return false;
    this.coins--;
    this.coinsTossed++;
    const mesh = new THREE.Mesh(this.coinGeo, this.coinMat);
    const dir = new THREE.Vector3(
      -Math.sin(this.yaw) * Math.cos(this.pitch),
      Math.sin(this.pitch),
      -Math.cos(this.yaw) * Math.cos(this.pitch)
    ).normalize();
    mesh.position.copy(this.position).addScaledVector(dir, 0.5);
    const vel = dir.multiplyScalar(9.8);
    vel.y += 2.3;
    this.scene.add(mesh);
    this.activeCoins.push({ mesh, vel, bounced: false, life: 6 });
    audio.playFlashlightClick();
    return true;
  }

  toggleFlashlight(audio: HorrorAudio): void {
    if (this.hiddenCloset) return;
    this.flashlightOn = !this.flashlightOn;
    audio.playFlashlightClick();
  }

  hideFlashlight(): void {
    this.flashlight.intensity = 0;
    this.fillLight.intensity = 0;
    this.flashlightBeam.visible = false;
  }

  private bindEvents(): void {
    window.addEventListener('keydown', (e) => {
      if (!this.active) return;
      if (e.code === 'Escape' || e.code === 'KeyP') {
        this.cb.onTogglePause();
        return;
      }
      if (!this.keys.has(e.code)) {
        if (e.code === 'KeyE') this.cb.onInteractTap();
        else if (e.code === 'Space' && !this.hiddenCloset) this.cb.onInteractTap();
        else if (e.code === 'KeyF') window.dispatchEvent(new CustomEvent('game:toggle-flashlight'));
        else if (e.code === 'KeyG') window.dispatchEvent(new CustomEvent('game:toss-coin'));
        else if (e.code === 'KeyM' || e.code === 'Tab') {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('game:toggle-map'));
        } else if (e.code === 'KeyC' || e.code === 'ControlLeft') {
          if (!this.hiddenCloset) this.crouching = !this.crouching;
        }
      }
      if (e.code === 'Space' && this.hiddenCloset) e.preventDefault();
      this.keys.add(e.code);
    });

    window.addEventListener('keyup', (e) => this.keys.delete(e.code));

    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === this.canvas;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.active) return;
      if (this.pointerLocked) {
        this.applyLookDelta(e.movementX, e.movementY);
      } else if (this.dragging) {
        const dx = e.clientX - this.lastPointerX;
        const dy = e.clientY - this.lastPointerY;
        this.lastPointerX = e.clientX;
        this.lastPointerY = e.clientY;
        this.applyLookDelta(dx * 1.45, dy * 1.45);
      }
    });

    this.canvas.addEventListener('mousedown', (e) => {
      if (!this.active) return;
      if (e.button === 2) {
        window.dispatchEvent(new CustomEvent('game:toss-coin'));
        return;
      }
      if (e.button === 0) {
        this.dragging = true;
        this.lastPointerX = e.clientX;
        this.lastPointerY = e.clientY;
        if (!this.pointerLocked) this.requestLock();
      }
    });

    window.addEventListener('mouseup', () => {
      this.dragging = false;
    });

    this.canvas.addEventListener('contextmenu', (e) => {
      if (this.active) e.preventDefault();
    });
  }

  private applyLookDelta(dx: number, dy: number): void {
    const s = 0.0022 * this.sensitivity;
    if (this.hiddenCloset) {
      this.hideYawOffset = Math.max(-0.58, Math.min(0.58, this.hideYawOffset - dx * s));
      this.yaw = this.hideYawBase + this.hideYawOffset;
      this.pitch = Math.max(-0.34, Math.min(0.34, this.pitch - dy * s));
    } else {
      this.yaw -= dx * s;
      this.pitch = Math.max(-1.28, Math.min(1.28, this.pitch - dy * s));
    }
  }

  update(
    dt: number,
    elapsed: number,
    camera: THREE.PerspectiveCamera,
    collision: CollisionSystem,
    audio: HorrorAudio,
    fear: number,
    brightnessMult: number,
    isOnPuddle: (x: number, z: number) => boolean,
    getWalkwayDrift?: (x: number, z: number) => number
  ): void {
    // Arrow keys look support
    const keyTurn = 2.15 * this.sensitivity;
    if (this.keys.has('ArrowLeft')) this.applyLookDelta(-keyTurn * dt * 420, 0);
    if (this.keys.has('ArrowRight')) this.applyLookDelta(keyTurn * dt * 420, 0);

    // Hold-Breath stealth mechanic when hiding!
    this.breathLockout = Math.max(0, this.breathLockout - dt);
    if (this.hiddenCloset) {
      const wantHold = this.isHoldBreathInput() && this.breathLockout <= 0;
      if (wantHold && this.breath > 0.02) {
        this.holdingBreath = true;
        this.breath = Math.max(0, this.breath - dt * 0.145);
        if (this.breath <= 0.02) {
          this.holdingBreath = false;
          this.breathLockout = 2.2;
          audio.playBreathGasp();
        }
      } else {
        this.holdingBreath = false;
        this.breath = Math.min(1, this.breath + dt * 0.28);
      }
    } else {
      this.holdingBreath = false;
      this.breath = Math.min(1, this.breath + dt * 0.45);
    }

    let moveMag = 0;
    if (this.hiddenCloset) {
      this.sprinting = false;
      this.strafeRoll *= 0.9;
      this.stamina = Math.min(1, this.stamina + dt * 0.24);
      const breathBob = this.holdingBreath ? 0.002 : 0.009 + fear * 0.008;
      camera.position.set(
        this.position.x,
        1.54 + Math.sin(elapsed * (2.4 + fear * 1.6)) * breathBob,
        this.position.z
      );
    } else {
      let fwd = 0;
      let strafe = 0;
      if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) fwd += 1;
      if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) fwd -= 1;
      if (this.keys.has('KeyD')) strafe += 1;
      if (this.keys.has('KeyA')) strafe -= 1;

      if (Math.abs(this.touch.state.moveX) > 0.05 || Math.abs(this.touch.state.moveY) > 0.05) {
        strafe += this.touch.state.moveX;
        fwd += this.touch.state.moveY;
      }

      const len = Math.hypot(fwd, strafe);
      if (len > 1) {
        fwd /= len;
        strafe /= len;
      }
      moveMag = Math.min(1, len);

      const wantSprint =
        !this.crouching &&
        !this.exhausted &&
        moveMag > 0.2 &&
        (this.keys.has('ShiftLeft') ||
          this.keys.has('ShiftRight') ||
          this.touch.state.sprintHeld ||
          this.touch.state.autoSprint);

      this.sprinting = wantSprint && this.stamina > 0.02;
      if (this.sprinting) {
        this.stamina = Math.max(0, this.stamina - dt * 0.2);
        if (this.stamina <= 0.01) this.exhausted = true;
      } else {
        this.stamina = Math.min(1, this.stamina + dt * (moveMag > 0.1 ? 0.15 : 0.25));
        if (this.exhausted && this.stamina > 0.3) this.exhausted = false;
      }

      const speed = this.crouching ? 2.35 : this.sprinting ? 6.8 : 4.2;
      const fx = -Math.sin(this.yaw);
      const fz = -Math.cos(this.yaw);
      const rx = Math.cos(this.yaw);
      const rz = -Math.sin(this.yaw);

      const beltDriftX = getWalkwayDrift ? getWalkwayDrift(this.position.x, this.position.z) : 0;
      const nx = this.position.x + ((fx * fwd + rx * strafe) * speed + beltDriftX) * dt;
      const nz = this.position.z + (fz * fwd + rz * strafe) * speed * dt;
      const res = collision.resolveCircle(nx, nz, 0.42);
      this.position.x = res.x;
      this.position.z = res.z;

      const targetEye = this.crouching ? 1.08 : 1.62;
      this.eyeHeight += (targetEye - this.eyeHeight) * Math.min(1, dt * 9);

      if (moveMag > 0.1) {
        const bobRate = this.sprinting ? 12.8 : this.crouching ? 5.6 : 8.4;
        this.headBobPhase += dt * bobRate;
        this.stepAccum += dt * (this.sprinting ? 2.55 : this.crouching ? 1.15 : 1.68);
        if (this.stepAccum >= 1) {
          this.stepAccum = 0;
          audio.playPlayerStep(
            this.sprinting,
            this.crouching,
            isOnPuddle(this.position.x, this.position.z)
          );
        }
      }

      const bobAmp = moveMag > 0.1 ? (this.sprinting ? 0.056 : this.crouching ? 0.016 : 0.032) : 0;
      const bobY = Math.sin(this.headBobPhase) * bobAmp + Math.sin(elapsed * 1.9) * 0.008;
      const bobX = Math.cos(this.headBobPhase * 0.5) * bobAmp * 0.45;
      this.strafeRoll += (-strafe * 0.022 - this.strafeRoll) * Math.min(1, dt * 8);

      camera.position.set(
        this.position.x + rx * bobX,
        this.eyeHeight + bobY,
        this.position.z + rz * bobX
      );
    }

    // Camera shake + adrenaline hand tremor
    this.cameraShake = Math.max(0, this.cameraShake - dt * 2.4);
    const sx = (Math.random() - 0.5) * this.cameraShake * 0.065;
    const sy = (Math.random() - 0.5) * this.cameraShake * 0.065;
    camera.rotation.order = 'YXZ';
    camera.rotation.y = this.yaw + sx;
    camera.rotation.x = this.pitch + sy;
    camera.rotation.z = this.strafeRoll + (Math.random() - 0.5) * this.cameraShake * 0.04;

    // Handheld Tactical Flashlight with physical spring lag & EM interference flicker!
    const lag = Math.min(1, dt * 11.5);
    this.flYaw += (this.yaw - this.flYaw) * lag;
    this.flPitch += (this.pitch - this.flPitch) * lag;

    const handSwayX = Math.sin(this.headBobPhase * 0.5) * 0.018 * moveMag + Math.sin(elapsed * 14) * fear * 0.006;
    const handSwayY = Math.cos(this.headBobPhase) * 0.014 * moveMag + Math.cos(elapsed * 11) * fear * 0.006;
    const fx = -Math.sin(this.flYaw + handSwayX) * Math.cos(this.flPitch + handSwayY);
    const fy = Math.sin(this.flPitch + handSwayY);
    const fz = -Math.cos(this.flYaw + handSwayX) * Math.cos(this.flPitch + handSwayY);

    const rightX = Math.cos(this.yaw);
    const rightZ = -Math.sin(this.yaw);
    this.flashlight.position.set(
      camera.position.x + rightX * 0.16,
      camera.position.y - 0.14,
      camera.position.z + rightZ * 0.16
    );
    this.flashlightTarget.position.set(
      this.flashlight.position.x + fx * 10,
      this.flashlight.position.y + fy * 10,
      this.flashlight.position.z + fz * 10
    );
    this.flashlightTarget.updateMatrixWorld();

    const emFlicker =
      fear > 0.45 && Math.sin(elapsed * 47) * Math.sin(elapsed * 29) > 0.56 ? 0.14 : 1.0;
    const on = this.flashlightOn && !this.hiddenCloset;
    this.flashlight.intensity = on ? 19 * brightnessMult * emFlicker : 0;
    this.fillLight.position.copy(camera.position);
    this.fillLight.intensity = (on ? 0.62 : 0.34) * brightnessMult;

    this.flashlightBeam.visible = on;
    if (on) {
      this.flashlightBeam.position.copy(this.flashlight.position);
      this.flashlightBeam.lookAt(this.flashlightTarget.position);
      this.flashlightBeamMat.uniforms.uOpacity.value = 0.02 * emFlicker;
    }

    // Update thrown distraction coins
    for (let i = this.activeCoins.length - 1; i >= 0; i--) {
      const c = this.activeCoins[i];
      c.life -= dt;
      if (c.life <= 0) {
        this.scene.remove(c.mesh);
        this.activeCoins.splice(i, 1);
        continue;
      }
      c.vel.y -= 13.5 * dt;
      const nx = c.mesh.position.x + c.vel.x * dt;
      const nz = c.mesh.position.z + c.vel.z * dt;
      const res = collision.resolveCircle(nx, nz, 0.12);
      if (Math.abs(res.x - nx) > 0.01) c.vel.x *= -0.45;
      if (Math.abs(res.z - nz) > 0.01) c.vel.z *= -0.45;
      c.mesh.position.x = res.x;
      c.mesh.position.z = res.z;
      c.mesh.position.y += c.vel.y * dt;
      c.mesh.rotation.x += dt * 16;
      c.mesh.rotation.z += dt * 12;

      if (c.mesh.position.y <= 0.025) {
        c.mesh.position.y = 0.025;
        c.vel.y = Math.abs(c.vel.y) * 0.34;
        c.vel.x *= 0.62;
        c.vel.z *= 0.62;
        if (!c.bounced) {
          c.bounced = true;
          audio.playCoinClink(0.32, 0);
          this.cb.onCoinLand(c.mesh.position.x, c.mesh.position.z);
        }
      }
    }
  }
}
