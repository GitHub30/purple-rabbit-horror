import * as THREE from 'three';
import './styles/main.css';
import { CollisionSystem } from './station/CollisionSystem';
import {
  EXIT_GATE_INTERACT,
  LORE_NOTES,
  PAYPHONE_POS,
  PEDESTAL_POS,
  PHOTOBOOTH_POS,
  VICTORY_Z,
} from './station/shinjukuMap';
import { createShinjukuEnvMap } from './station/shinjukuTextures';
import {
  CoinInstance,
  HidingSpotInstance,
  NoteInstance,
  ShinjukuStation,
  TerminalInstance,
} from './station/ShinjukuStation';
import { RabbitAI } from './ai/RabbitAI';
import { HorrorAudio } from './audio/HorrorAudio';
import { PlayerController } from './player/PlayerController';
import { PostFX } from './rendering/PostFX';
import { HUD, ScreenName } from './ui/HUD';

type InteractTarget =
  | { kind: 'terminal'; item: TerminalInstance }
  | { kind: 'closet'; item: HidingSpotInstance }
  | { kind: 'exit-closet' }
  | { kind: 'note'; item: NoteInstance }
  | { kind: 'coin'; item: CoinInstance }
  | { kind: 'exit-gate' };

class ShinjukuHorrorGame {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  postFX: PostFX;
  collision: CollisionSystem;
  station: ShinjukuStation;
  rabbit: RabbitAI;
  player: PlayerController;
  sound: HorrorAudio;
  hud: HUD;

  screen: ScreenName = 'LOADING';
  chargesCompleted = 0;
  exitGateUnlocked = false;
  difficulty: 'normal' | 'nightmare' = 'normal';
  pendingLandscapeLock = false;

  private ambientHemi: THREE.HemisphereLight;
  private titleLight: THREE.SpotLight;
  private brightnessMult = 1.0;
  private lastTime = performance.now();
  private totalElapsed = 0;
  private runElapsed = 0;
  private blackoutTimer = 0;
  private jumpscareTimer = 0;
  private glitchPulse = 0;
  private currentFear = 0;
  private currentChase = 0;
  private autoIso = 0;
  private breathFog = 0;
  private impactFlash = 0;
  private dynamicFovKick = 0;
  private phantomTimer = 22;
  private phantomTrainCooldown = 18;
  private photoBoothTriggered = false;
  private payphoneTriggered = false;
  private payphoneRingTimer = 0;
  private currentTarget: InteractTarget | null = null;
  private activeChargingTerminal: TerminalInstance | null = null;
  private chargeTickAccum = 0;
  private pedestalCommentShown = false;
  private wasChasing = false;
  private chasesSurvived = 0;
  private notesReadCount = 0;
  private rafId = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.NoToneMapping; // Handled in HDR PostFX ACES pass!

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x05090d);
    this.scene.fog = new THREE.FogExp2(0x060b10, 0.044);
    this.scene.environment = createShinjukuEnvMap(this.renderer);

    const aspect = window.innerWidth / Math.max(1, window.innerHeight);
    this.camera = new THREE.PerspectiveCamera(this.computeFov(aspect), aspect, 0.08, 75);
    this.postFX = new PostFX(this.renderer, window.innerWidth, window.innerHeight, dpr);

    // Subtle cool-teal subterranean bounce fill so Shinjuku stone & signage stay legible!
    this.ambientHemi = new THREE.HemisphereLight(0x3a5260, 0x10161c, 0.52);
    this.scene.add(this.ambientHemi);

    // Dramatic title showcase raking spotlight on the 2.2m purple rabbit under East Gate!
    this.titleLight = new THREE.SpotLight(0xdaf4ee, 34, 22, Math.PI * 0.28, 0.62, 1.25);
    this.titleLight.position.set(31.8, 3.25, 21.4);
    this.titleLight.target.position.set(PEDESTAL_POS.x, 1.25, PEDESTAL_POS.z - 4.4);
    this.scene.add(this.titleLight, this.titleLight.target);

    this.collision = new CollisionSystem();
    this.station = new ShinjukuStation(this.scene);
    this.rabbit = new RabbitAI(this.scene);
    this.sound = new HorrorAudio();

    this.player = new PlayerController(
      canvas,
      this.scene,
      {
        onInteractTap: () => this.handleInteractTap(),
        onTogglePause: () => this.togglePause(),
        onCoinLand: (x, z) => this.handleCoinLand(x, z),
      },
      this.station.textures.flashlightCookie
    );

    this.hud = new HUD({
      onStartGame: (d) => this.startGame(d),
      onPause: () => this.togglePause(),
      onResume: () => this.resumeGame(),
      onRestart: () => this.startGame(this.difficulty),
      onReturnTitle: () => this.returnToTitle(),
      onCloseNote: () => this.closeNote(),
      onToggleMute: () => {
        this.sound.unlock();
        const next = !this.sound.isMuted();
        this.sound.setMuted(next);
        return next;
      },
      onSensitivityChange: (v) => {
        this.player.sensitivity = v;
      },
      onBrightnessChange: (v) => {
        this.brightnessMult = v;
        this.ambientHemi.intensity = 0.52 * v;
      },
      onTouchModeChange: (m) => this.player.setTouchUIMode(m),
      onQualityChange: (q) => this.postFX.setQuality(q),
    });

    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('orientationchange', () => this.scheduleResizeSync());
    screen.orientation?.addEventListener?.('change', () => this.scheduleResizeSync());
    document.addEventListener('fullscreenchange', () => this.onFullscreenChange());
    document.addEventListener('webkitfullscreenchange', () => this.onFullscreenChange());
    window.visualViewport?.addEventListener('resize', () => this.onResize());

    window.addEventListener('game:toggle-flashlight', () => {
      if (this.screen === 'PLAYING') this.player.toggleFlashlight(this.sound);
    });
    window.addEventListener('game:toss-coin', () => {
      if (this.screen === 'PLAYING' && !this.player.tossCoin(this.sound) && this.player.coins <= 0) {
        this.hud.showSubtitle('硬貨を持っていない…新宿駅構内の床を探してみよう', 2.4);
      }
    });
    window.addEventListener('game:toggle-map', () => {
      if (this.screen === 'PLAYING') {
        this.hud.toggleMap();
        this.sound.playPaperRustle();
      }
    });

    (window as unknown as { __GAME__: ShinjukuHorrorGame }).__GAME__ = this;
    this.init();
  }

  private async init(): Promise<void> {
    this.hud.setScreen('LOADING');
    try {
      await this.rabbit.load('./models/purple_rabbit_animated.glb', {
        suitNormal: this.station.textures.rabbitSuitNormal,
        suitGrime: this.station.textures.rabbitSuitGrime,
        faceGrime: this.station.textures.rabbitFaceGrime,
      });
    } catch (err) {
      console.error('Failed to load purple_rabbit_animated.glb:', err);
    }
    this.screen = 'TITLE';
    this.hud.setScreen('TITLE');
    this.lastTime = performance.now();
    this.loop();
  }

  private scheduleResizeSync(): void {
    this.onResize();
    this.player.touch.refreshVisibility();
    requestAnimationFrame(() => {
      this.onResize();
      this.player.touch.refreshVisibility();
    });
    window.setTimeout(() => {
      this.onResize();
      this.player.touch.refreshVisibility();
    }, 250);
  }

  private async lockLandscape(): Promise<void> {
    try {
      const orient = screen.orientation as ScreenOrientation & {
        lock?: (mode: string) => Promise<void>;
      };
      if (orient && typeof orient.lock === 'function') {
        await orient.lock('landscape');
        return;
      }
      const scr = screen as unknown as {
        lockOrientation?: (m: string) => void;
        mozLockOrientation?: (m: string) => void;
        msLockOrientation?: (m: string) => void;
      };
      const fn = scr.lockOrientation || scr.mozLockOrientation || scr.msLockOrientation;
      if (fn) fn.call(screen, 'landscape');
    } catch {}
  }

  private isFullscreen(): boolean {
    const doc = document as Document & {
      webkitFullscreenElement?: Element;
      mozFullScreenElement?: Element;
      msFullscreenElement?: Element;
    };
    return !!(
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement
    );
  }

  private onFullscreenChange(): void {
    const fs = this.isFullscreen();
    if (fs && this.pendingLandscapeLock) {
      this.pendingLandscapeLock = false;
      this.lockLandscape().finally(() => this.scheduleResizeSync());
    }
    this.scheduleResizeSync();
    if (fs && this.screen === 'PLAYING' && !this.player.touch.enabled && !document.pointerLockElement) {
      this.player.requestLock();
    }
  }

  private enterFullscreenAndLandscape(): void {
    const el = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
      mozRequestFullScreen?: () => Promise<void> | void;
      msRequestFullscreen?: () => Promise<void> | void;
    };
    this.pendingLandscapeLock = true;
    if (this.isFullscreen()) {
      this.pendingLandscapeLock = false;
      this.lockLandscape().finally(() => this.scheduleResizeSync());
      return;
    }
    const finish = () => {
      const fs = this.isFullscreen();
      if (this.pendingLandscapeLock) {
        this.pendingLandscapeLock = false;
        this.lockLandscape().finally(() => {
          this.scheduleResizeSync();
          if (fs && this.screen === 'PLAYING' && !this.player.touch.enabled && !document.pointerLockElement) {
            this.player.requestLock();
          }
        });
      } else {
        this.scheduleResizeSync();
      }
    };
    try {
      let prom: Promise<void> | void;
      if (typeof el.requestFullscreen === 'function') {
        try {
          prom = el.requestFullscreen({ navigationUI: 'hide' });
        } catch {
          prom = el.requestFullscreen();
        }
      } else if (typeof el.webkitRequestFullscreen === 'function') {
        prom = el.webkitRequestFullscreen();
      } else if (typeof el.mozRequestFullScreen === 'function') {
        prom = el.mozRequestFullScreen();
      } else if (typeof el.msRequestFullscreen === 'function') {
        prom = el.msRequestFullscreen();
      } else {
        finish();
        return;
      }
      if (prom && typeof (prom as Promise<void>).then === 'function') {
        (prom as Promise<void>).then(finish, finish);
      }
    } catch {
      finish();
    }
  }

  startGame(diff: 'normal' | 'nightmare'): void {
    this.sound.unlock();
    this.enterFullscreenAndLandscape();
    this.difficulty = diff;
    this.rabbit.setDifficulty(diff);
    this.chargesCompleted = 0;
    this.exitGateUnlocked = false;
    this.runElapsed = 0;
    this.blackoutTimer = 0;
    this.jumpscareTimer = 0;
    this.glitchPulse = 0;
    this.currentFear = 0;
    this.currentChase = 0;
    this.autoIso = 0;
    this.breathFog = 0;
    this.impactFlash = 0;
    this.dynamicFovKick = 0;
    this.phantomTimer = 20;
    this.phantomTrainCooldown = 16;
    this.photoBoothTriggered = false;
    this.payphoneTriggered = false;
    this.payphoneRingTimer = 0;
    this.currentTarget = null;
    this.activeChargingTerminal = null;
    this.pedestalCommentShown = false;
    this.wasChasing = false;
    this.chasesSurvived = 0;
    this.notesReadCount = 0;

    this.collision.setExitGateUnlocked(false);
    this.station.resetVisuals();
    this.player.reset();
    this.rabbit.reset();
    this.titleLight.intensity = 0;

    this.screen = 'PLAYING';
    this.hud.setScreen('PLAYING');
    this.hud.setHiding(false);
    this.hud.updateChargeCount(0, this.station.terminals.length);
    this.player.setActive(true);
    this.player.requestLock();

    const mapHint = this.player.touch.enabled ? '（右下の「構内図」で確認）' : '（[M]で新宿駅構内図）';
    this.hud.showSubtitle(
      `00:47 新宿駅。終電を逃した……東改札の非常シャッターを開くには、構内5か所のチャージ機で¥1,000貯める必要がある。${mapHint}`,
      6.8
    );
  }

  togglePause(): void {
    if (this.screen === 'PLAYING') {
      this.screen = 'PAUSED';
      this.player.setActive(false);
      this.hud.setScreen('PAUSED');
    } else if (this.screen === 'PAUSED') {
      this.resumeGame();
    } else if (this.screen === 'NOTE') {
      this.closeNote();
    }
  }

  resumeGame(): void {
    if (this.screen !== 'PAUSED') return;
    this.screen = 'PLAYING';
    this.hud.setScreen('PLAYING');
    this.player.setActive(true);
    this.player.requestLock();
  }

  closeNote(): void {
    if (this.screen !== 'NOTE') return;
    this.screen = 'PLAYING';
    this.hud.setScreen('PLAYING');
    this.player.setActive(true);
    this.player.requestLock();
  }

  returnToTitle(): void {
    this.screen = 'TITLE';
    this.player.setActive(false);
    this.titleLight.intensity = 28;
    this.currentFear = 0;
    this.currentChase = 0;
    this.glitchPulse = 0;
    this.station.resetVisuals();
    this.hud.setScreen('TITLE');
  }

  private computeFov(aspect: number): number {
    return aspect >= 1 ? 68 : Math.min(86, 68 + (1 - aspect) * 34);
  }

  onResize(): void {
    const w = window.innerWidth;
    const h = Math.max(1, window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const aspect = w / h;
    this.camera.aspect = aspect;
    this.camera.fov = this.computeFov(aspect) + this.dynamicFovKick;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h);
    this.postFX.setSize(w, h, dpr);
  }

  private loop = (): void => {
    this.rafId = requestAnimationFrame(this.loop);
    const now = performance.now();
    const dt = Math.min(0.05, Math.max(0.001, (now - this.lastTime) / 1000));
    this.lastTime = now;
    this.totalElapsed += dt;
    this.glitchPulse = Math.max(0, this.glitchPulse - dt * 1.45);
    this.impactFlash = Math.max(0, this.impactFlash - dt * 3.4);

    if (this.screen === 'TITLE') this.updateTitle(dt);
    else if (this.screen === 'PLAYING') this.updatePlaying(dt);
    else if (this.screen === 'JUMPSCARE') this.updateJumpscare(dt);

    const isTitle = this.screen === 'TITLE';
    const isJump = this.screen === 'JUMPSCARE';
    const darkStealth =
      !isTitle &&
      !isJump &&
      (!this.player.flashlightOn || this.player.hiddenCloset !== null || this.blackoutTimer > 0);
    this.autoIso += ((darkStealth ? 0.92 : 0) - this.autoIso) * Math.min(1, dt * 1.6);

    const targetBreathFog =
      isTitle || isJump
        ? 0
        : this.player.holdingBreath
          ? 0.95
          : this.player.hiddenCloset
            ? 0.54 + this.currentFear * 0.42
            : this.player.exhausted
              ? 0.72
              : Math.max(0, this.currentFear - 0.65) * 1.1;
    this.breathFog += (targetBreathFog - this.breathFog) * Math.min(1, dt * 2.4);

    this.postFX.render(this.renderer, this.scene, this.camera, {
      time: this.totalElapsed,
      fear: isTitle ? 0.14 : isJump ? 1 : this.currentFear,
      chase: isTitle ? 0 : isJump ? 1 : this.currentChase,
      glitch: isJump ? 0.94 : this.glitchPulse,
      exposure: this.brightnessMult * 1.18,
      heartbeat: isTitle ? 0 : this.sound.getHeartbeatPulse(),
      autoIso: this.autoIso,
      breathFog: this.breathFog,
      impactFlash: this.impactFlash,
      cameraNear: this.camera.near,
      cameraFar: this.camera.far,
    });
  };

  private updateTitle(dt: number): void {
    this.rabbit.updateTitleShowcase(dt, this.totalElapsed);
    this.station.update(
      dt,
      this.totalElapsed,
      1,
      { x: this.rabbit.root.position.x, z: this.rabbit.root.position.z },
      0
    );
    const sway = Math.sin(this.totalElapsed * 0.38) * 0.38;
    const targetZ = PEDESTAL_POS.z - 4.4;
    if (this.camera.aspect < 0.92) {
      this.camera.position.set(PEDESTAL_POS.x + sway * 0.28, 1.4 + Math.sin(this.totalElapsed * 0.7) * 0.03, targetZ + 4.9);
      this.camera.lookAt(PEDESTAL_POS.x, 0.42, targetZ);
    } else {
      this.camera.position.set(PEDESTAL_POS.x - 1.35 + sway, 1.52 + Math.sin(this.totalElapsed * 0.7) * 0.04, targetZ + 3.85);
      this.camera.lookAt(PEDESTAL_POS.x - 0.85, 1.15, targetZ);
    }
    this.titleLight.intensity = 28 * (Math.sin(this.totalElapsed * 29) > 0.91 ? 0.35 : 1);
    this.player.hideFlashlight();
  }

  private updatePlaying(dt: number): void {
    this.runElapsed += dt;
    if (this.blackoutTimer > 0) this.blackoutTimer = Math.max(0, this.blackoutTimer - dt);

    const res = this.rabbit.update(
      dt,
      this.totalElapsed,
      this.chargesCompleted,
      {
        x: this.player.position.x,
        z: this.player.position.z,
        yaw: this.player.yaw,
        flashlightOn: this.player.flashlightOn,
        crouching: this.player.crouching,
        sprinting: this.player.sprinting,
        hiddenCloset: this.player.hiddenCloset,
        holdingBreath: this.player.holdingBreath,
      },
      this.collision,
      this.sound
    );

    this.currentFear += (res.fearLevel - this.currentFear) * Math.min(1, dt * 5);
    this.currentChase += ((res.isChasing ? 1 : 0) - this.currentChase) * Math.min(1, dt * 5);
    if (res.stepShake > 0) this.player.addCameraShake(res.stepShake);

    // Choreography reactions from RabbitAI
    if (res.wokeFromIntro) {
      this.blackoutTimer = 0.7;
      this.glitchPulse = 0.8;
      this.player.addCameraShake(0.5);
      this.sound.playBlackoutThunk();
      this.sound.playSpotStinger();
      this.hud.showSubtitle('……ッ！ 東改札の前に座っていた「あれ」が立ち上がった！', 4.6);
    }
    if (res.justPeeked) {
      this.glitchPulse = Math.max(this.glitchPulse, 0.32);
      this.sound.playStareChill();
      this.hud.showSubtitle('……アルプス広場の柱の陰から、紫の大きな耳が覗いている……', 3.6);
    }
    if (res.justStareFroze) {
      this.glitchPulse = 0.78;
      this.sound.playNeckCrack();
      this.sound.playStareChill();
      this.hud.showSubtitle('……首が鳴った……こっちをじっと見ている……来るッ！！', 3.4);
    }
    if (res.justKilledLight) {
      if (
        this.station.triggerDominoBlowout(
          this.rabbit.root.position.x,
          this.rabbit.root.position.z,
          this.player.position.x,
          this.player.position.z,
          11
        )
      ) {
        this.sound.playLightBlowout();
        this.player.addCameraShake(0.38);
      }
    }
    if (res.justInspectingCloset) {
      this.glitchPulse = Math.max(this.glitchPulse, 0.5);
      const breathTip = this.player.touch.enabled ? '「息を止める」を長押ししろ！' : '[Space]長押しで息を止めろ！';
      this.hud.showSubtitle(`……扉のすぐ外にいる……${breathTip} ライトは絶対につけるな……`, 4.2);
    }
    if (res.justScratchedCloset) {
      this.glitchPulse = Math.max(this.glitchPulse, 0.68);
      this.player.addCameraShake(0.42);
      this.sound.playLockerScratch();
    }
    if (res.justSpotted) {
      this.glitchPulse = 0.88;
      this.player.addCameraShake(0.45);
      this.sound.playSpotStinger();
      this.hud.showSubtitle('見つかった！！ 走れ！ ロッカーか公衆電話ボックスへ逃げろ！', 3.6);
    }
    if (this.wasChasing && !res.isChasing && !res.caughtPlayer) {
      this.chasesSurvived++;
      this.hud.showSubtitle('……撒いたか？ 新宿の地下はまだ静かすぎる。', 3.0);
    }
    this.wasChasing = res.isChasing;

    // Shinjuku Station Environmental Psychological Scares!
    this.updateShinjukuHorrorEvents(dt, res.isChasing, res.distance);

    if (res.caughtPlayer) {
      if (res.ripClosetId) {
        const spot = this.station.closets.find((c) => c.def.id === res.ripClosetId);
        if (spot) spot.targetAngle = -1.65;
        this.player.exitCloset();
        this.hud.setHiding(false);
      }
      this.startJumpscare();
      return;
    }

    // Dynamic sprint/chase FOV kick
    const targetKick = this.player.sprinting ? 5.2 : res.isChasing ? 3.0 : 0;
    if (Math.abs(targetKick - this.dynamicFovKick) > 0.02) {
      this.dynamicFovKick += (targetKick - this.dynamicFovKick) * Math.min(1, dt * 6);
      this.camera.fov = this.computeFov(this.camera.aspect) + this.dynamicFovKick;
      this.camera.updateProjectionMatrix();
    }

    this.player.update(
      dt,
      this.totalElapsed,
      this.camera,
      this.collision,
      this.sound,
      res.fearLevel,
      this.brightnessMult,
      (x, z) => this.station.isPointOnPuddle(x, z)
    );

    this.station.update(
      dt,
      this.totalElapsed,
      this.chargesCompleted,
      { x: this.rabbit.root.position.x, z: this.rabbit.root.position.z },
      this.blackoutTimer,
      { x: this.player.position.x, z: this.player.position.z }
    );

    if (
      !this.pedestalCommentShown &&
      Math.hypot(this.player.position.x - PEDESTAL_POS.x, this.player.position.z - PEDESTAL_POS.z) < 4.6
    ) {
      this.pedestalCommentShown = true;
      this.hud.showSubtitle(
        'アルプス広場の展示ケースが内側から割られている……紫色の足跡が東改札へ続いている。',
        5.0
      );
    }

    this.updateInteractions(dt);

    if (this.exitGateUnlocked && this.player.position.z < VICTORY_Z) {
      this.triggerVictory();
      return;
    }

    this.sound.updateContinuous(dt, res.fearLevel, res.isChasing, true, {
      hiding: this.player.hiddenCloset !== null,
      holdingBreath: this.player.holdingBreath,
      exhausted: this.player.exhausted,
      rabbitDist: res.distance,
      rabbitPan: res.panValue,
    });

    this.hud.setFearLevel(res.fearLevel, res.isChasing);
    if (this.player.hiddenCloset) {
      this.hud.updateBreathState(
        this.player.breath,
        this.player.holdingBreath,
        res.isInspectingCloset || res.distance < 4.5,
        this.player.touch.enabled
      );
    }
    this.hud.updatePlayerStatus(
      dt,
      this.runElapsed,
      this.player.stamina,
      this.player.exhausted,
      this.player.flashlightOn,
      this.player.crouching,
      this.player.coins,
      this.player.pointerLocked
    );
    this.hud.renderStationMap(
      this.player.position.x,
      this.player.position.z,
      this.player.yaw,
      this.station.terminals,
      this.chargesCompleted >= this.station.terminals.length
    );
    this.player.touch.syncButtonVisuals({
      flashlightOn: this.player.flashlightOn,
      crouching: this.player.crouching,
      coins: this.player.coins,
      mapOpen: this.hud.mapOpen,
      hiding: this.player.hiddenCloset !== null,
      holdingBreath: this.player.holdingBreath,
      promptKind: this.currentTarget ? this.currentTarget.kind : null,
    });
  }

  private updateShinjukuHorrorEvents(dt: number, isChasing: boolean, rabbitDist: number): void {
    // 1. Photo Booth sudden camera strobe flash when player approaches!
    if (!this.photoBoothTriggered) {
      const dPhoto = Math.hypot(
        this.player.position.x - PHOTOBOOTH_POS.x,
        this.player.position.z - PHOTOBOOTH_POS.z
      );
      if (dPhoto < 4.8) {
        this.photoBoothTriggered = true;
        this.station.triggerPhotoBoothFlash();
        this.sound.playPhotoBoothFlash();
        this.impactFlash = 0.65;
        this.glitchPulse = Math.max(this.glitchPulse, 0.52);
        this.player.addCameraShake(0.28);
        this.hud.showSubtitle(
          '……ッ！ 証明写真機の中でフラッシュが光った！ 誰も入っていないのに、カーテンの奥に大きな影が……',
          4.8
        );
      }
    }

    // 2. Green Public Payphone eerie ringing in West Passage!
    if (!this.payphoneTriggered && this.chargesCompleted >= 1 && !this.player.hiddenCloset) {
      const dPhone = Math.hypot(
        this.player.position.x - PAYPHONE_POS.x,
        this.player.position.z - PAYPHONE_POS.z
      );
      if (dPhone < 10.5) {
        this.payphoneTriggered = true;
        this.payphoneRingTimer = 4.2;
        this.station.setPayphoneRinging(true);
        this.sound.playPayphoneRing(-0.45);
        this.hud.showSubtitle(
          '西口通路の公衆電話が鳴っている……受話器の向こうから笑い声が漏れている……',
          4.6
        );
      }
    }
    if (this.payphoneRingTimer > 0) {
      this.payphoneRingTimer -= dt;
      if (this.payphoneRingTimer <= 0) this.station.setPayphoneRinging(false);
    }

    // 3. Phantom Yamanote Line train roaring past below 14・15番線 stairwell!
    this.phantomTrainCooldown -= dt;
    const nearYamanote = Math.hypot(this.player.position.x - 26, this.player.position.z - 42) < 11.5;
    if (
      this.phantomTrainCooldown <= 0 &&
      !isChasing &&
      (nearYamanote || (this.chargesCompleted >= 1 && Math.random() < 0.008))
    ) {
      this.phantomTrainCooldown = 36 + Math.random() * 24;
      this.station.triggerPhantomTrain();
      this.sound.playPhantomTrain();
      this.player.addCameraShake(0.32);
      this.glitchPulse = Math.max(this.glitchPulse, 0.34);
      this.hud.showSubtitle(
        '14・15番線のホームを電車が轟音で通過した……！ 00:47、終電はもう終わったはずなのに……',
        5.0
      );
    }

    // 4. Binaural Phantom Whisper / Scare behind the player's ear
    if (this.chargesCompleted >= 1 && !isChasing && rabbitDist > 12) {
      this.phantomTimer -= dt;
      if (this.phantomTimer <= 0) {
        this.phantomTimer = 17 + Math.random() * 17;
        this.glitchPulse = Math.max(this.glitchPulse, 0.4);
        const side = Math.random() < 0.5 ? -0.95 : 0.95;
        if (Math.random() < 0.58) this.sound.playPhantomWhisper(side);
        else this.sound.playPhantomScare(side * 0.85);
      }
    }
  }

  private updateInteractions(dt: number): void {
    if (this.player.hiddenCloset) {
      this.currentTarget = { kind: 'exit-closet' };
      const exitLabel =
        this.player.hiddenCloset.kind === 'phonebooth' ? '公衆電話ボックスから出る' : 'ロッカーから出る';
      this.hud.setInteractPrompt({ key: 'E', text: exitLabel });
      this.hud.setChargeProgress(0);
      this.activeChargingTerminal = null;
      return;
    }

    const px = this.player.position.x;
    const pz = this.player.position.z;
    const fx = -Math.sin(this.player.yaw);
    const fz = -Math.cos(this.player.yaw);

    let best: InteractTarget | null = null;
    let bestScore = Infinity;

    const score = (x: number, z: number, maxD: number, minDot: number): number | null => {
      const dx = x - px;
      const dz = z - pz;
      const d = Math.hypot(dx, dz);
      if (d > maxD || d < 0.01) return null;
      const dot = (dx / d) * fx + (dz / d) * fz;
      return dot < minDot ? null : d - dot * 0.8;
    };

    for (const t of this.station.terminals) {
      if (t.charged) continue;
      const sc = score(t.def.x, t.def.z, 2.4, 0.45);
      if (sc !== null && sc < bestScore) {
        bestScore = sc;
        best = { kind: 'terminal', item: t };
      }
    }

    if (!this.exitGateUnlocked) {
      const sc = score(EXIT_GATE_INTERACT.x, EXIT_GATE_INTERACT.z, 3.0, 0.35);
      if (sc !== null && sc < bestScore) {
        bestScore = sc;
        best = { kind: 'exit-gate' };
      }
    }

    for (const c of this.station.closets) {
      const sc = score(c.def.x, c.def.z, 2.35, 0.45);
      if (sc !== null && sc < bestScore) {
        bestScore = sc;
        best = { kind: 'closet', item: c };
      }
    }

    for (const n of this.station.notes) {
      const sc = score(n.def.x, n.def.z, 2.25, 0.4);
      if (sc !== null && sc < bestScore) {
        bestScore = sc;
        best = { kind: 'note', item: n };
      }
    }

    for (const c of this.station.coinPickups) {
      if (c.collected) continue;
      const sc = score(c.def.x, c.def.z, 2.25, 0.3);
      if (sc !== null && sc < bestScore) {
        bestScore = sc;
        best = { kind: 'coin', item: c };
      }
    }

    this.currentTarget = best;
    if (!best) {
      this.hud.setInteractPrompt(null);
    } else {
      switch (best.kind) {
        case 'terminal':
          this.hud.setInteractPrompt({
            key: 'E長押し',
            text: `${best.item.def.name} にSuicaチャージ（¥200）`,
          });
          break;
        case 'closet':
          this.hud.setInteractPrompt({ key: 'E', text: `${best.item.def.name} に隠れる` });
          break;
        case 'note':
          this.hud.setInteractPrompt({ key: 'E', text: `メモを読む「${best.item.def.title}」` });
          break;
        case 'coin':
          this.hud.setInteractPrompt({ key: 'E', text: '¥100硬貨を拾う（陽動用）' });
          break;
        case 'exit-gate':
          this.hud.setInteractPrompt({
            key: 'E',
            text:
              this.chargesCompleted >= this.station.terminals.length
                ? 'Suicaをタッチして東改札シャッターを開ける！'
                : `東改札（残高不足：${this.chargesCompleted}/${this.station.terminals.length}）`,
          });
          break;
      }
    }

    if (best && best.kind === 'terminal' && this.player.isInteractHeld()) {
      const t = best.item;
      this.activeChargingTerminal = t;
      t.progress = Math.min(1, t.progress + dt / 2.35);
      this.station.updateTerminalVisual(t);
      this.hud.setChargeProgress(t.progress);
      this.chargeTickAccum += dt;
      if (this.chargeTickAccum >= 0.34) {
        this.chargeTickAccum = 0;
        this.sound.playChargeTick(t.progress);
      }
      if (t.progress >= 1) this.completeTerminalCharge(t);
    } else {
      if (this.activeChargingTerminal && !this.activeChargingTerminal.charged) {
        this.activeChargingTerminal.progress = Math.max(0, this.activeChargingTerminal.progress - dt * 0.9);
        this.station.updateTerminalVisual(this.activeChargingTerminal);
        if (this.activeChargingTerminal.progress <= 0) this.activeChargingTerminal = null;
      }
      this.hud.setChargeProgress(0);
    }
  }

  private handleInteractTap(): void {
    if (this.screen === 'NOTE') {
      this.closeNote();
      return;
    }
    if (this.screen !== 'PLAYING' || !this.currentTarget) return;

    switch (this.currentTarget.kind) {
      case 'closet': {
        const spot = this.currentTarget.item;
        spot.targetAngle = -1.35;
        window.setTimeout(() => {
          spot.targetAngle = 0;
        }, 380);
        this.sound.playLockerDoor(true);
        this.player.enterCloset(spot.def);
        this.hud.setHiding(true, spot.def.kind);
        this.rabbit.notifyPlayerEnteredCloset(spot.def);
        break;
      }
      case 'exit-closet': {
        const left = this.player.exitCloset();
        if (left) {
          const spot = this.station.closets.find((c) => c.def.id === left.id);
          if (spot) {
            spot.targetAngle = -1.25;
            window.setTimeout(() => {
              spot.targetAngle = 0;
            }, 420);
          }
        }
        this.sound.playLockerDoor(false);
        this.hud.setHiding(false);
        break;
      }
      case 'note': {
        const note = this.currentTarget.item;
        if (!note.read) {
          note.read = true;
          this.notesReadCount++;
        }
        this.sound.playPaperRustle();
        this.screen = 'NOTE';
        this.player.setActive(false);
        this.hud.openNote(note.def);
        break;
      }
      case 'coin': {
        const coin = this.currentTarget.item;
        coin.collected = true;
        coin.mesh.visible = false;
        this.player.coins++;
        this.sound.playCoinClink(0.42, 0);
        const tip = this.player.touch.enabled
          ? '右下の「硬貨」ボタンで投げて陽動できる。'
          : '[G] または右クリックで投げて陽動できる。';
        this.hud.showSubtitle(`¥100硬貨を拾った。${tip}`, 3.4);
        break;
      }
      case 'exit-gate': {
        if (this.chargesCompleted >= this.station.terminals.length) {
          this.exitGateUnlocked = true;
          this.collision.setExitGateUnlocked(true);
          this.station.unlockExitShutter();
          this.player.addCameraShake(0.38);
          this.sound.playGateUnlockAndShutter();
          this.hud.showSubtitle('東改札・非常シャッター解錠！！ 階段を駆け上がって新宿東口へ脱出しろ！！', 5.2);
          this.rabbit.hearSound(EXIT_GATE_INTERACT.x, EXIT_GATE_INTERACT.z, 'high');
        } else {
          this.sound.playGateError();
          this.hud.showSubtitle(
            `残高不足だ……新宿駅構内であと ${this.station.terminals.length - this.chargesCompleted} 箇所チャージしないと。`,
            3.6
          );
        }
        break;
      }
    }
  }

  private completeTerminalCharge(t: TerminalInstance): void {
    t.charged = true;
    t.progress = 1;
    this.activeChargingTerminal = null;
    this.chargesCompleted++;
    this.station.updateTerminalVisual(t);
    this.hud.setChargeProgress(0);
    this.hud.updateChargeCount(this.chargesCompleted, this.station.terminals.length);
    this.sound.playChargeComplete();
    this.rabbit.hearSound(t.def.x, t.def.z, 'high');

    // Progressively corrupt Shinjuku's giant Digital Signage Columns!
    this.station.setSignageCorruptionStage(Math.min(4, this.chargesCompleted));

    if (this.chargesCompleted === 1) {
      this.hud.showSubtitle('チャージ完了（1/5）！ 電子音が響いた……足音がこちらへ向かってくる！', 4.5);
    } else if (this.chargesCompleted === 2) {
      this.blackoutTimer = 0.6;
      this.glitchPulse = 0.78;
      this.player.addCameraShake(0.4);
      this.sound.playBlackoutThunk();
      this.sound.playDistortedPAChime();
      this.hud.showSubtitle('チャージ完了（2/5）！ 新宿駅の構内放送が歪んだ……サイネージ柱の映像が変わっている！', 5.0);
    } else if (this.chargesCompleted === 3) {
      this.glitchPulse = 0.62;
      this.hud.showSubtitle('チャージ完了（3/5）！ 発車標の文字が乱れている……あいつ、さらに速くなっている！', 4.4);
    } else if (this.chargesCompleted === 4) {
      this.blackoutTimer = 0.78;
      this.glitchPulse = 0.9;
      this.player.addCameraShake(0.48);
      this.sound.playBlackoutThunk();
      this.sound.playDistortedPAChime();
      this.hud.showSubtitle('チャージ完了（4/5）！ サイネージ柱が真っ赤に……あと1箇所、背後に気をつけろ！', 4.8);
    } else if (this.chargesCompleted >= this.station.terminals.length) {
      this.station.setExitReady(true);
      this.glitchPulse = 0.95;
      this.sound.playDistortedPAChime();
      this.hud.showSubtitle('残高 ¥1,000 到達！！ 東改札の緑ランプが点灯した！ 全速力で東改札へ向かえ！！', 6.5);
    }
  }

  private handleCoinLand(x: number, z: number): void {
    this.rabbit.hearSound(x, z, 'high');
    this.hud.showSubtitle('硬貨の音が響いた……紫のうさぎが音のほうへ引き寄せられている！', 2.8);
  }

  private startJumpscare(): void {
    this.screen = 'JUMPSCARE';
    this.jumpscareTimer = 0;
    this.glitchPulse = 1;
    this.impactFlash = 0.9;
    this.player.setActive(false);
    this.player.flashlightOn = false;
    this.player.hideFlashlight();
    this.camera.position.set(this.player.position.x, 1.48, this.player.position.z);
    this.hud.setScreen('JUMPSCARE');
    this.hud.setFearLevel(1, true);
    this.rabbit.triggerJumpscarePose(this.camera.position, this.player.yaw);
    this.sound.playJumpscare();
  }

  private updateJumpscare(dt: number): void {
    this.jumpscareTimer += dt;
    this.rabbit.update(
      dt,
      this.totalElapsed,
      this.chargesCompleted,
      {
        x: this.player.position.x,
        z: this.player.position.z,
        yaw: this.player.yaw,
        flashlightOn: false,
        crouching: false,
        sprinting: false,
        hiddenCloset: null,
        holdingBreath: false,
      },
      this.collision,
      this.sound
    );
    const shake = (1 - Math.min(1, this.jumpscareTimer / 1.48)) * 0.13;
    const rx = this.rabbit.root.position.x;
    const rz = this.rabbit.root.position.z;
    const sy = Math.sin(this.rabbit.root.rotation.y);
    const cy = Math.cos(this.rabbit.root.rotation.y);
    this.camera.position.set(
      rx + sy * 1.02 + (Math.random() - 0.5) * shake * 0.4,
      1.42 + (Math.random() - 0.5) * shake,
      rz + cy * 1.02 + (Math.random() - 0.5) * shake * 0.4
    );
    this.camera.lookAt(rx + (Math.random() - 0.5) * shake, 1.38 + (Math.random() - 0.5) * shake, rz);
    this.camera.rotation.z += Math.sin(this.totalElapsed * 42) * 0.2;

    if (this.jumpscareTimer >= 1.48) {
      this.screen = 'GAMEOVER';
      this.hud.showEndStats(false, {
        elapsedSec: this.runElapsed,
        charges: this.chargesCompleted,
        notesRead: this.notesReadCount,
        totalNotes: LORE_NOTES.length,
        coinsTossed: this.player.coinsTossed,
        chasesSurvived: this.chasesSurvived,
        difficulty: this.difficulty,
      });
    }
  }

  private triggerVictory(): void {
    this.screen = 'VICTORY';
    this.player.setActive(false);
    this.currentFear = 0;
    this.currentChase = 0;
    this.glitchPulse = 0;
    this.sound.updateContinuous(0, 0, false, false);
    this.sound.playVictoryChord();
    this.hud.showEndStats(true, {
      elapsedSec: this.runElapsed,
      charges: this.chargesCompleted,
      notesRead: this.notesReadCount,
      totalNotes: LORE_NOTES.length,
      coinsTossed: this.player.coinsTossed,
      chasesSurvived: this.chasesSurvived,
      difficulty: this.difficulty,
    });
  }

  dispose(): void {
    cancelAnimationFrame(this.rafId);
    this.postFX.dispose();
    this.renderer.dispose();
  }
}

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement | null;
if (!canvas) throw new Error('Missing #game-canvas element');
new ShinjukuHorrorGame(canvas);
