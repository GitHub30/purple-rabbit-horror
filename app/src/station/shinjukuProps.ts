import * as THREE from 'three';
import { HidingSpotDef } from './shinjukuMap';
import { ShinjukuTextureSet } from './shinjukuTextures';

// Museum-grade, ultra-precise 3D prop factory library for JR Shinjuku Station B1F.
// Every single prop shares pooled BufferGeometries & PBR Materials for 60 FPS performance
// while faithfully matching real-world Japanese railway hardware (EG20/21, EV20/MV50, acure,
// NTT MC-D8, DNP Ki-Re-i, JR East Suica lockers, Kotobuki benches, 3-bin clear recyclers, 総合盤).
export class ShinjukuPropLibrary {
  readonly steelMat: THREE.MeshStandardMaterial;
  readonly darkSteelMat: THREE.MeshStandardMaterial;
  readonly chromeMat: THREE.MeshStandardMaterial;
  readonly matteBlackMat: THREE.MeshStandardMaterial;
  readonly brassMat: THREE.MeshStandardMaterial;
  readonly clearGlassMat: THREE.MeshPhysicalMaterial;
  readonly smokedGlassMat: THREE.MeshPhysicalMaterial;
  readonly velvetRedMat: THREE.MeshStandardMaterial;

  // Shared turnstile geometries & materials
  private tsBodyGeo = new THREE.BoxGeometry(0.24, 0.8, 1.44);
  private tsKickGeo = new THREE.BoxGeometry(0.21, 0.08, 1.4);
  private tsTopGeo = new THREE.BoxGeometry(0.26, 0.055, 1.48);
  private tsHoodGeo = new THREE.BoxGeometry(0.25, 0.07, 0.24);
  private tsSensorBarGeo = new THREE.BoxGeometry(0.014, 0.055, 1.24);
  private tsSensorDotGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.016, 8);
  private tsEndCapGeo = new THREE.BoxGeometry(0.255, 0.82, 0.12);
  private tsArrowGeo = new THREE.PlaneGeometry(0.18, 0.42);
  private tsPadBezelGeo = new THREE.BoxGeometry(0.19, 0.028, 0.21);
  private tsPadFaceGeo = new THREE.PlaneGeometry(0.165, 0.185);
  private tsLcdGeo = new THREE.PlaneGeometry(0.15, 0.058);
  private tsSlotBezelGeo = new THREE.BoxGeometry(0.13, 0.022, 0.065);
  private tsSlotSlitGeo = new THREE.BoxGeometry(0.095, 0.025, 0.014);
  private tsFlapperGeo = new THREE.BoxGeometry(0.22, 0.56, 0.026);

  private suicaPadMat: THREE.MeshStandardMaterial;
  private gateMiniLcdMat: THREE.MeshStandardMaterial;
  private frontArrowMat: THREE.MeshStandardMaterial;
  private ticketYellowMat: THREE.MeshStandardMaterial;
  private sensorLedMat: THREE.MeshBasicMaterial;
  private flapperMat: THREE.MeshPhysicalMaterial;

  // Shared vending drink geometries & materials
  private petBodyGeo = new THREE.CylinderGeometry(0.026, 0.027, 0.145, 8);
  private petNeckGeo = new THREE.CylinderGeometry(0.012, 0.025, 0.042, 8);
  private petCapGeo = new THREE.CylinderGeometry(0.013, 0.013, 0.016, 8);
  private canBodyGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.115, 8);
  private canTopGeo = new THREE.CylinderGeometry(0.023, 0.023, 0.008, 8);
  private drinkMats: THREE.MeshStandardMaterial[];
  private capMats: THREE.MeshStandardMaterial[];

  constructor(private textures: ShinjukuTextureSet) {
    this.steelMat = new THREE.MeshStandardMaterial({
      color: 0xbac2ca,
      normalMap: textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.4, 0.4),
      roughness: 0.28,
      metalness: 0.84,
      envMapIntensity: 1.05,
    });
    this.darkSteelMat = new THREE.MeshStandardMaterial({
      color: 0x20262c,
      normalMap: textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.3, 0.3),
      roughness: 0.4,
      metalness: 0.74,
    });
    this.chromeMat = new THREE.MeshStandardMaterial({
      color: 0xd8dfe6,
      roughness: 0.18,
      metalness: 0.94,
      envMapIntensity: 1.25,
    });
    this.matteBlackMat = new THREE.MeshStandardMaterial({
      color: 0x14171c,
      roughness: 0.46,
      metalness: 0.34,
    });
    this.brassMat = new THREE.MeshStandardMaterial({
      color: 0xbfa054,
      roughness: 0.25,
      metalness: 0.88,
    });
    this.clearGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x587280,
      transparent: true,
      opacity: 0.11,
      roughness: 0.28,
      metalness: 0.04,
      clearcoat: 0.12,
    });
    this.smokedGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x5c707c,
      transparent: true,
      opacity: 0.34,
      roughness: 0.22,
      metalness: 0.08,
    });
    this.velvetRedMat = new THREE.MeshStandardMaterial({
      color: 0x7c1420,
      roughness: 0.88,
      metalness: 0.04,
    });

    this.suicaPadMat = new THREE.MeshStandardMaterial({
      color: 0x4c5862,
      map: textures.suicaTouchPad,
      emissive: new THREE.Color(0x88e8ff),
      emissiveMap: textures.suicaTouchPad,
      emissiveIntensity: 0.82,
      roughness: 0.42,
      metalness: 0.08,
    });
    this.gateMiniLcdMat = new THREE.MeshStandardMaterial({
      color: 0x38423e,
      map: textures.gateMiniLcd,
      emissive: new THREE.Color(0x98f8c4),
      emissiveMap: textures.gateMiniLcd,
      emissiveIntensity: 0.72,
      roughness: 0.56,
    });
    this.frontArrowMat = new THREE.MeshStandardMaterial({
      color: 0x424a52,
      map: textures.turnstileFrontArrow,
      emissive: new THREE.Color(0x64f0a8),
      emissiveMap: textures.turnstileFrontArrow,
      emissiveIntensity: 0.62,
      roughness: 0.68,
    });
    this.ticketYellowMat = new THREE.MeshStandardMaterial({
      color: 0xe6b818,
      emissive: new THREE.Color(0x523e08),
      emissiveIntensity: 0.35,
      roughness: 0.38,
    });
    this.sensorLedMat = new THREE.MeshBasicMaterial({ color: 0xaa181c });
    this.flapperMat = new THREE.MeshPhysicalMaterial({
      color: 0xd8282c,
      emissive: new THREE.Color(0x460c0e),
      emissiveIntensity: 0.42,
      transparent: true,
      opacity: 0.78,
      roughness: 0.22,
    });

    this.drinkMats = [0, 1, 2, 3, 4, 5].map(
      (idx) =>
        new THREE.MeshStandardMaterial({
          map: textures.drinkLabels[idx],
          roughness: idx === 2 || idx === 3 ? 0.24 : 0.28,
          metalness: idx === 2 || idx === 3 ? 0.56 : 0.14,
        })
    );
    this.capMats = [
      new THREE.MeshStandardMaterial({ color: 0x16642a, roughness: 0.42 }),
      new THREE.MeshStandardMaterial({ color: 0x186ab0, roughness: 0.42 }),
      new THREE.MeshStandardMaterial({ color: 0xb4181e, roughness: 0.42 }),
      new THREE.MeshStandardMaterial({ color: 0xe6e6e2, roughness: 0.42 }),
      new THREE.MeshStandardMaterial({ color: 0xd45a12, roughness: 0.42 }),
      new THREE.MeshStandardMaterial({ color: 0x183c78, roughness: 0.42 }),
    ];
  }

  private makeBacklitMat(tex: THREE.CanvasTexture, emissiveIntensity = 0.64, tint = 0xffffff): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color: 0x485058,
      map: tex,
      emissive: new THREE.Color(tint),
      emissiveMap: tex,
      emissiveIntensity,
      roughness: 0.74,
      metalness: 0.04,
    });
  }

  // 1. Authentic JR East EG20 / EG21 QR-Enabled Automatic Ticket Gate Unit (Shinjuku New-Gen Spec!)
  buildEG20Turnstile(
    x: number,
    z: number,
    rotY = 0,
    accentColorHex = 0x3ea038,
    showFrontArrows = true,
    withSideFlappers = true
  ): THREE.Group {
    const u = new THREE.Group();
    u.position.set(x, 0, z);
    u.rotation.y = rotY;

    const accentMat = new THREE.MeshStandardMaterial({
      color: accentColorHex,
      roughness: 0.34,
      metalness: 0.16,
    });
    const laneLedMat = new THREE.MeshBasicMaterial({ color: 0x34e898 });
    const qrGlowMat = new THREE.MeshStandardMaterial({
      color: 0x202a30,
      emissive: new THREE.Color(0x56c8f2),
      emissiveIntensity: 0.72,
      roughness: 0.22,
    });

    // Brushed floor cable conduit strip + recessed kickplate + stainless cabinet body
    const floorPlate = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.012, 1.54), this.darkSteelMat);
    floorPlate.position.y = 0.006;
    const kick = new THREE.Mesh(this.tsKickGeo, this.matteBlackMat);
    kick.position.y = 0.04;
    const body = new THREE.Mesh(this.tsBodyGeo, this.steelMat);
    body.position.y = 0.48;
    body.castShadow = true;
    body.receiveShadow = true;
    u.add(floorPlate, kick, body);

    // Side recessed infrared passenger-tracking optical sensor strips & photocell lenses!
    for (const sx of [-0.122, 0.122]) {
      const bar = new THREE.Mesh(this.tsSensorBarGeo, this.matteBlackMat);
      bar.position.set(sx, 0.54, 0);
      u.add(bar);
      for (const sz of [-0.46, -0.15, 0.15, 0.46]) {
        const dot = new THREE.Mesh(this.tsSensorDotGeo, this.sensorLedMat);
        dot.rotation.z = Math.PI / 2;
        dot.position.set(sx + (sx > 0 ? 0.005 : -0.005), 0.54, sz);
        u.add(dot);
      }
      // Subtle lower side stripe trim
      const sideTrim = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.036, 1.28), accentMat);
      sideTrim.position.set(sx + (sx > 0 ? 0.003 : -0.003), 0.22, 0);
      u.add(sideTrim);
    }

    // Sloped black polycarbonate top deck + front/rear angled reading hoods
    const top = new THREE.Mesh(this.tsTopGeo, this.matteBlackMat);
    top.position.y = 0.905;
    u.add(top);

    for (const dir of [-1, 1]) {
      // Colored beveled front/rear fascia cap
      const cap = new THREE.Mesh(this.tsEndCapGeo, accentMat);
      cap.position.set(0, 0.46, dir * 0.7);
      u.add(cap);

      // Vertical brushed-chrome corner bumpers + vertical lane-status LED strips (authentic EG20/21!)
      for (const cx of [-0.128, 0.128]) {
        const bumper = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.82, 0.022), this.chromeMat);
        bumper.position.set(cx, 0.46, dir * 0.758);
        u.add(bumper);
        if (showFrontArrows) {
          const ledStrip = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.34, 0.012), laneLedMat);
          ledStrip.position.set(cx * 0.88, 0.66, dir * 0.766);
          u.add(ledStrip);
        }
      }

      // Sloped upper nose cowl
      const hood = new THREE.Mesh(this.tsHoodGeo, this.matteBlackMat);
      hood.position.set(0, 0.91, dir * 0.64);
      hood.rotation.x = dir * 0.24;
      u.add(hood);

      // Glowing front/rear pass arrow LED display (↓ / IC)
      if (showFrontArrows) {
        const arrow = new THREE.Mesh(this.tsArrowGeo, this.frontArrowMat);
        arrow.position.set(0, 0.6, dir * 0.764);
        if (dir < 0) arrow.rotation.y = Math.PI;
        u.add(arrow);
      }

      // Recessed yellow-trimmed magnetic ticket insertion/ejection slot (きっぷ投入口)
      const slotBezel = new THREE.Mesh(this.tsSlotBezelGeo, this.ticketYellowMat);
      slotBezel.position.set(-0.04, 0.946, dir * 0.64);
      slotBezel.rotation.x = dir * 0.24;
      const slotSlit = new THREE.Mesh(this.tsSlotSlitGeo, this.matteBlackMat);
      slotSlit.position.set(-0.04, 0.952, dir * 0.64);
      slotSlit.rotation.x = dir * 0.24;
      u.add(slotBezel, slotSlit);

      // Iconic angled glowing cyan-blue 『IC』 Suica card reader pad
      const padBezel = new THREE.Mesh(this.tsPadBezelGeo, this.darkSteelMat);
      padBezel.position.set(0.01, 0.948, dir * 0.44);
      padBezel.rotation.x = dir * 0.22;
      const padFace = new THREE.Mesh(this.tsPadFaceGeo, this.suicaPadMat);
      padFace.position.set(0.01, 0.964, dir * 0.442);
      padFace.rotation.x = -Math.PI / 2 + dir * 0.22;
      if (dir < 0) padFace.rotation.z = Math.PI;
      u.add(padBezel, padFace);

      // Authentic Shinjuku New-Gen EG21 Angled Recessed QR-Code Optical Scanner Window!
      const qrFrame = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.024, 0.11), this.darkSteelMat);
      qrFrame.position.set(0.055, 0.935, dir * 0.59);
      qrFrame.rotation.x = dir * 0.24;
      const qrLens = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.028, 0.075), qrGlowMat);
      qrLens.position.set(0.055, 0.938, dir * 0.59);
      qrLens.rotation.x = dir * 0.24;
      u.add(qrFrame, qrLens);

      // Tilted residual-balance mini LCD display window behind IC pad
      const lcd = new THREE.Mesh(this.tsLcdGeo, this.gateMiniLcdMat);
      lcd.position.set(0, 0.938, dir * 0.22);
      lcd.rotation.x = -Math.PI / 2 + dir * 0.18;
      if (dir < 0) lcd.rotation.z = Math.PI;
      u.add(lcd);
    }

    // Recessed translucent crimson motorized flapper door blades (tucked open/ready inside slot!)
    if (withSideFlappers) {
      for (const sx of [-0.145, 0.145]) {
        const blade = new THREE.Mesh(this.tsFlapperGeo, this.flapperMat);
        blade.position.set(sx, 0.56, 0.04);
        blade.rotation.y = sx > 0 ? -0.18 : 0.18;
        u.add(blade);
      }
    }

    return u;
  }

  // 2. Sculpted 3D 『きっぷうりば』 Bank (6 × EV20 Pearl-Silver + 3 × MV50 Black/Violet 指定席券売機!)
  buildTicketMachineBank(centerX: number, southZ: number): THREE.Group {
    const bank = new THREE.Group();
    bank.position.set(centerX, 0, southZ);
    bank.rotation.y = Math.PI; // Faces North (-Z) into 東西自由通路

    // Brushed stainless architectural recessed wall surround frame
    const surroundBack = new THREE.Mesh(new THREE.BoxGeometry(11.4, 2.38, 0.16), this.darkSteelMat);
    surroundBack.position.set(0, 1.19, -0.02);
    const surroundTop = new THREE.Mesh(new THREE.BoxGeometry(11.48, 0.12, 0.34), this.steelMat);
    surroundTop.position.set(0, 2.36, 0.08);
    bank.add(surroundBack, surroundTop);

    const silverShell = new THREE.MeshStandardMaterial({
      color: 0xd0d6da,
      normalMap: this.textures.brushedMetalNormal,
      normalScale: new THREE.Vector2(0.32, 0.32),
      roughness: 0.34,
      metalness: 0.58,
    });
    const mv50BodyMat = new THREE.MeshStandardMaterial({
      color: 0x20242c,
      normalMap: this.textures.brushedMetalNormal,
      roughness: 0.38,
      metalness: 0.64,
    });
    const evHeaderMat = this.makeBacklitMat(this.textures.chargeMachineHeader, 0.56);
    const mvHeaderMat = this.makeBacklitMat(this.textures.mv50Header, 0.62);
    const scrMat = this.makeBacklitMat(this.textures.ev20Screen, 0.64);
    const lowerDeckMat = new THREE.MeshStandardMaterial({
      color: 0xbcc4ca,
      map: this.textures.chargeMachineLowerDeck,
      normalMap: this.textures.brushedMetalNormal,
      roughness: 0.44,
      metalness: 0.42,
    });
    const btnWhiteMat = new THREE.MeshStandardMaterial({ color: 0xe6ecee, roughness: 0.4 });
    const greenLedMat = new THREE.MeshBasicMaterial({ color: 0x38d888 });

    const bodyGeo = new THREE.BoxGeometry(0.96, 1.98, 0.36);
    const headGeo = new THREE.BoxGeometry(0.98, 0.44, 0.42);
    const headFaceGeo = new THREE.PlaneGeometry(0.92, 0.38);
    const bezelGeo = new THREE.BoxGeometry(0.64, 0.46, 0.04);
    const scrGeo = new THREE.PlaneGeometry(0.58, 0.41);
    const deckGeo = new THREE.BoxGeometry(0.94, 0.11, 0.22);
    const trayGeo = new THREE.BoxGeometry(0.22, 0.036, 0.15);
    const cupGeo = new THREE.BoxGeometry(0.15, 0.045, 0.13);
    const lowerGeo = new THREE.PlaneGeometry(0.88, 0.78);
    const cavityGeo = new THREE.BoxGeometry(0.56, 0.16, 0.08);
    const btnGeo = new THREE.BoxGeometry(0.06, 0.05, 0.025);

    // 9 bays spanning -4.8m .. +4.8m (skip center slot i=4 so interactive `term-midori` sits flush inside!)
    // Rightmost 3 units (local x < -1.8, since rotated PI -> viewer's right!) are MV50 指定席券売機
    for (let i = 0; i < 9; i++) {
      if (i === 4) continue;
      const lx = -4.8 + i * 1.2;
      const isMV50 = i < 3;
      const ug = new THREE.Group();
      ug.position.set(lx, 0, 0.08);

      const body = new THREE.Mesh(bodyGeo, isMV50 ? mv50BodyMat : silverShell);
      body.position.set(0, 1.05, 0);
      const head = new THREE.Mesh(headGeo, this.matteBlackMat);
      head.position.set(0, 1.88, 0.03);
      const headFace = new THREE.Mesh(headFaceGeo, isMV50 ? mvHeaderMat : evHeaderMat);
      headFace.position.set(0, 1.88, 0.244);

      const bezel = new THREE.Mesh(bezelGeo, this.matteBlackMat);
      bezel.position.set(0.06, 1.34, 0.18);
      bezel.rotation.x = -0.14;
      const scr = new THREE.Mesh(scrGeo, scrMat);
      scr.position.set(0.06, 1.34, 0.204);
      scr.rotation.x = -0.14;

      // 4 Physical tactile side buttons
      for (let b = 0; b < 4; b++) {
        const btn = new THREE.Mesh(btnGeo, btnWhiteMat);
        btn.position.set(-0.34, 1.48 - b * 0.086, 0.185);
        ug.add(btn);
      }

      // Protruding slanted brushed-steel operating console deck + IC tray + acrylic lip + keypad + coin/bill hoods
      const deck = new THREE.Mesh(deckGeo, isMV50 ? this.darkSteelMat : silverShell);
      deck.position.set(0, 1.02, 0.26);
      deck.rotation.x = 0.22;

      const icTray = new THREE.Mesh(trayGeo, this.matteBlackMat);
      icTray.position.set(-0.26, 1.08, 0.27);
      icTray.rotation.x = 0.22;
      const icFace = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.11), this.suicaPadMat);
      icFace.position.set(-0.26, 1.1, 0.272);
      icFace.rotation.x = -Math.PI / 2 + 0.22;
      const icLip = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.018, 0.014), this.clearGlassMat);
      icLip.position.set(-0.26, 1.09, 0.34);

      // 3x4 Embossed metallic PIN/numeric keypad + green OK / red Cancel buttons
      const kpPad = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.018, 0.12), this.darkSteelMat);
      kpPad.position.set(-0.02, 1.08, 0.27);
      kpPad.rotation.x = 0.22;
      ug.add(kpPad);
      for (let kr = 0; kr < 4; kr++) {
        for (let kc = 0; kc < 3; kc++) {
          const kBtn = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.01, 0.018), this.chromeMat);
          kBtn.position.set(-0.052 + kc * 0.032, 1.092 - kr * 0.005, 0.232 + kr * 0.024);
          kBtn.rotation.x = 0.22;
          ug.add(kBtn);
        }
      }

      const coinCup = new THREE.Mesh(cupGeo, this.matteBlackMat);
      coinCup.position.set(0.16, 1.08, 0.27);
      coinCup.rotation.x = 0.22;
      const coinFunnel = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.018, 0.024, 10), this.chromeMat);
      coinFunnel.position.set(0.16, 1.102, 0.25);
      const billSlot = new THREE.Mesh(cupGeo, this.matteBlackMat);
      billSlot.position.set(0.32, 1.08, 0.27);
      billSlot.rotation.x = 0.22;
      const billLed = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.012, 0.012), greenLedMat);
      billLed.position.set(0.32, 1.106, 0.24);
      // Overhead green 『空 / 利用可』 status indicator lamp on top canopy
      const topStatusLamp = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.036, 0.036), greenLedMat);
      topStatusLamp.position.set(0, 2.12, 0.16);

      const lower = new THREE.Mesh(lowerGeo, lowerDeckMat);
      lower.position.set(0, 0.56, 0.184);
      const cavity = new THREE.Mesh(cavityGeo, this.matteBlackMat);
      cavity.position.set(0, 0.42, 0.16);
      const receiptSlit = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.024, 0.03), this.chromeMat);
      receiptSlit.position.set(0.26, 0.72, 0.19);

      // Authentic 『話せる指定席券売機』 operator handset + camera bezel on unit 0!
      if (i === 0) {
        const assistPod = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.36, 0.12), this.darkSteelMat);
        assistPod.position.set(-0.46, 1.32, 0.21);
        const handset = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.24, 8), this.matteBlackMat);
        handset.position.set(-0.46, 1.32, 0.28);
        ug.add(assistPod, handset);
      }

      ug.add(
        body, head, headFace, bezel, scr, deck, icTray, icFace, icLip,
        coinCup, coinFunnel, billSlot, billLed, topStatusLamp, lower, cavity, receiptSlit
      );
      bank.add(ug);
    }
    return bank;
  }

  // 3. Sculpted 3D Golden-Yellow 『のりこし精算機』 (Fare Adjustment Machine) Bank (3 units clear of term-inside-14!)
  buildFareAdjustmentBank(centerX: number, northZ: number): THREE.Group {
    const bank = new THREE.Group();
    bank.position.set(centerX, 0, northZ);

    const yellowBodyMat = new THREE.MeshStandardMaterial({
      color: 0xd8a822,
      normalMap: this.textures.brushedMetalNormal,
      roughness: 0.36,
      metalness: 0.32,
    });
    const scrMat = this.makeBacklitMat(this.textures.fareAdjustScreen, 0.62);
    const statusGreenMat = new THREE.MeshBasicMaterial({ color: 0x38d888 });

    const surround = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.26, 0.16), this.darkSteelMat);
    surround.position.set(0, 1.13, -0.02);
    bank.add(surround);

    for (let i = 0; i < 3; i++) {
      const lx = -1.3 + i * 1.3;
      const ug = new THREE.Group();
      ug.position.set(lx, 0, 0.08);

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.98, 1.94, 0.36), yellowBodyMat);
      body.position.set(0, 1.0, 0);
      const canopy = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.34, 0.42), this.matteBlackMat);
      canopy.position.set(0, 1.84, 0.03);
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.12, 0.03), yellowBodyMat);
      stripe.position.set(0, 1.84, 0.24);
      const statusLamp = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.032, 0.032), statusGreenMat);
      statusLamp.position.set(0, 2.02, 0.15);

      const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.48, 0.04), this.matteBlackMat);
      bezel.position.set(0, 1.32, 0.18);
      bezel.rotation.x = -0.14;
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.42), scrMat);
      scr.position.set(0, 1.32, 0.204);
      scr.rotation.x = -0.14;

      const deck = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.11, 0.22), this.steelMat);
      deck.position.set(0, 0.98, 0.26);
      deck.rotation.x = 0.2;
      const icFace = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.12), this.suicaPadMat);
      icFace.position.set(-0.24, 1.05, 0.27);
      icFace.rotation.x = -Math.PI / 2 + 0.2;
      const coinFunnel = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.018, 0.024, 10), this.chromeMat);
      coinFunnel.position.set(0.08, 1.06, 0.25);
      const billHood = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.12), this.matteBlackMat);
      billHood.position.set(0.28, 1.05, 0.26);
      billHood.rotation.x = 0.2;
      const chute = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.18, 0.08), this.matteBlackMat);
      chute.position.set(0, 0.44, 0.16);
      const chuteLip = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.02, 0.035), this.chromeMat);
      chuteLip.position.set(0, 0.35, 0.195);

      ug.add(body, canopy, stripe, statusLamp, bezel, scr, deck, icFace, coinFunnel, billHood, chute, chuteLip);
      bank.add(ug);
    }
    return bank;
  }

  // 4. Ultra-Precise 3D JR East 『acure』 Smart Vending Pair + See-Through PET/Can Recycling Bin!
  buildAcureVendingPair(x: number, z: number, rotY: number): THREE.Group {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotY;

    const whiteBodyMat = new THREE.MeshStandardMaterial({ color: 0xd4dae0, roughness: 0.36, metalness: 0.28 });
    const acureBlueMat = new THREE.MeshStandardMaterial({ color: 0x0e4680, roughness: 0.34, metalness: 0.22 });
    const canopyFaceMat = this.makeBacklitMat(this.textures.acureCanopy, 0.62);
    const chamberBackMat = new THREE.MeshStandardMaterial({
      color: 0xd8e4ea,
      emissive: new THREE.Color(0x9ec6da),
      emissiveIntensity: 0.34,
      roughness: 0.56,
    });
    const coldStripMat = new THREE.MeshBasicMaterial({ color: 0x2ca8f0 });
    const hotStripMat = new THREE.MeshBasicMaterial({ color: 0xe83828 });
    const btnGlowMat = new THREE.MeshBasicMaterial({ color: 0xc2e6f4 });
    const ledDigitRedMat = new THREE.MeshBasicMaterial({ color: 0xf43628 });

    // Local +X is the front face (matching original addAcurePair orientation!)
    const buildSingleAcure = (zOffset: number, seed: number) => {
      const m = new THREE.Group();
      m.position.set(0, 0, zOffset);

      // Leveling feet & cabinet shell (width Z = 1.18, depth X = 0.78, height Y = 1.98)
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.08, 1.16), this.matteBlackMat);
      base.position.y = 0.04;
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.56, 1.9, 1.18), whiteBodyMat);
      back.position.set(-0.11, 1.03, 0);
      back.castShadow = true;
      back.receiveShadow = true;
      const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.9, 0.06), acureBlueMat);
      sideL.position.set(0.28, 1.03, -0.56);
      const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.9, 0.06), acureBlueMat);
      sideR.position.set(0.28, 1.03, 0.56);

      // Top backlit curved-look 『acure』 header marquee canopy
      const canopy = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.28, 1.2), acureBlueMat);
      canopy.position.set(0.02, 1.86, 0);
      const canopyFace = new THREE.Mesh(new THREE.PlaneGeometry(1.12, 0.24), canopyFaceMat);
      canopyFace.position.set(0.445, 1.86, 0);
      canopyFace.rotation.y = Math.PI / 2;

      // Illuminated recessed showcase chamber back
      const chamber = new THREE.Mesh(new THREE.PlaneGeometry(1.06, 0.88), chamberBackMat);
      chamber.position.set(0.18, 1.28, 0);
      chamber.rotation.y = Math.PI / 2;

      // 3 Horizontal drink shelves populated with ACTUAL 3D LABELED MINIATURE CANS & PET BOTTLES!
      const shelfYs = [1.54, 1.26, 0.98];
      shelfYs.forEach((sy, rowIdx) => {
        const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.02, 1.06), this.steelMat);
        shelf.position.set(0.28, sy - 0.06, 0);
        m.add(shelf);

        // Cold (blue) / Hot (red) temperature rail + metallic price tag strip + select buttons
        const isHot = rowIdx === 2;
        const rail = new THREE.Mesh(
          new THREE.BoxGeometry(0.02, 0.028, 1.04),
          isHot ? hotStripMat : coldStripMat
        );
        rail.position.set(0.375, sy - 0.072, 0);
        const priceRail = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.018, 1.04), this.chromeMat);
        priceRail.position.set(0.376, sy - 0.048, 0);
        m.add(rail, priceRail);

        for (let col = 0; col < 7; col++) {
          const dz = -0.44 + col * 0.146;
          const drinkIdx = (rowIdx * 5 + col + seed) % this.drinkMats.length;
          const isPet = rowIdx < 2;
          if (isPet) {
            const pb = new THREE.Mesh(this.petBodyGeo, this.drinkMats[drinkIdx]);
            pb.position.set(0.29, sy + 0.02, dz);
            pb.rotation.y = -Math.PI * 0.5;
            const pn = new THREE.Mesh(this.petNeckGeo, this.drinkMats[drinkIdx]);
            pn.position.set(0.29, sy + 0.11, dz);
            const pc = new THREE.Mesh(this.petCapGeo, this.capMats[drinkIdx]);
            pc.position.set(0.29, sy + 0.138, dz);
            m.add(pb, pn, pc);
          } else {
            const cb = new THREE.Mesh(this.canBodyGeo, this.drinkMats[drinkIdx]);
            cb.position.set(0.29, sy + 0.008, dz);
            cb.rotation.y = -Math.PI * 0.5;
            const ct = new THREE.Mesh(this.canTopGeo, this.chromeMat);
            ct.position.set(0.29, sy + 0.068, dz);
            m.add(cb, ct);
          }
          // Glowing miniature select push-button
          const btn = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.022, 0.048), btnGlowMat);
          btn.position.set(0.386, sy - 0.072, dz);
          m.add(btn);
        }
      });

      // Front clear showcase glass pane
      const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.06, 0.88), this.clearGlassMat);
      glass.position.set(0.392, 1.28, 0);
      glass.rotation.y = Math.PI / 2;

      // Brushed-steel middle payment bar (VM-30 Suica reader + 7-segment LED + coin slot + return lever + bill acceptor)
      const midBar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.34, 1.08), this.darkSteelMat);
      midBar.position.set(0.28, 0.66, 0);
      const vmPod = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.18), this.matteBlackMat);
      vmPod.position.set(0.41, 0.68, 0.26);
      const vmSuica = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.14), this.suicaPadMat);
      vmSuica.position.set(0.444, 0.68, 0.26);
      vmSuica.rotation.y = Math.PI / 2;
      const billBox = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.12, 0.12), this.steelMat);
      billBox.position.set(0.405, 0.68, -0.02);
      // Red 7-segment digital price readout window + vertical coin slot + chrome return lever!
      const ledWindow = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.045, 0.1), this.matteBlackMat);
      ledWindow.position.set(0.408, 0.74, -0.24);
      const ledDigits = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.018, 0.064), ledDigitRedMat);
      ledDigits.position.set(0.412, 0.74, -0.24);
      const coinSlot = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.024, 10), this.chromeMat);
      coinSlot.rotation.z = Math.PI / 2;
      coinSlot.position.set(0.41, 0.68, -0.22);
      const returnLever = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.042, 0.016), this.chromeMat);
      returnLever.position.set(0.412, 0.68, -0.28);
      const coinCup = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.09, 0.1), this.matteBlackMat);
      coinCup.position.set(0.405, 0.58, -0.24);

      // Deeply recessed lower drink pickup bin with translucent dark push-flap & sculpted handle bar!
      const lowerWall = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.42, 1.08), whiteBodyMat);
      lowerWall.position.set(0.28, 0.28, 0);
      const pickupHole = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.22, 0.72), this.matteBlackMat);
      pickupHole.position.set(0.37, 0.28, 0);
      const pickupFlap = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.19, 0.68), this.smokedGlassMat);
      pickupFlap.position.set(0.395, 0.28, 0);
      const flapHandle = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.024, 0.34), this.chromeMat);
      flapHandle.position.set(0.408, 0.22, 0);

      m.add(
        base, back, sideL, sideR, canopy, canopyFace, chamber, glass,
        midBar, vmPod, vmSuica, billBox, ledWindow, ledDigits, coinSlot, returnLever,
        coinCup, lowerWall, pickupHole, pickupFlap, flapHandle
      );
      return m;
    };

    group.add(buildSingleAcure(-0.64, 0), buildSingleAcure(0.64, 3));

    // Authentic JR East 『acure』 See-Through PET/Can Trash Box standing right beside the vending pair!
    const tBox = new THREE.Group();
    tBox.position.set(0.08, 0, 1.54);
    const tBase = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.08, 0.46), this.darkSteelMat);
    tBase.position.y = 0.04;
    const tClear = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.72, 0.44), this.smokedGlassMat);
    tClear.position.y = 0.44;
    const tTop = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 0.48), acureBlueMat);
    tTop.position.y = 0.87;
    // Dual circular PET bottle & aluminum can deposit holes on top
    for (const dz of [-0.11, 0.11]) {
      const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.03, 12), this.matteBlackMat);
      hole.position.set(0.02, 0.94, dz);
      tBox.add(hole);
    }
    // Visible discarded 3D bottles & cans piled inside the clear liner!
    for (let k = 0; k < 5; k++) {
      const b = new THREE.Mesh(
        k % 2 === 0 ? this.petBodyGeo : this.canBodyGeo,
        this.drinkMats[k % this.drinkMats.length]
      );
      b.position.set((k % 3 - 1) * 0.08, 0.16 + Math.floor(k / 3) * 0.09, ((k * 7) % 3 - 1) * 0.08);
      b.rotation.set(1.1 + k * 0.5, k * 0.9, 0.4);
      tBox.add(b);
    }
    tBox.add(tBase, tClear, tTop);
    group.add(tBox);

    return group;
  }

  // 5. Authentic JR East 3-Compartment Stainless + Clear-Window Recycling Trash Station
  buildStationTrashBin(x: number, z: number, rotY = 0): THREE.Group {
    const bin = new THREE.Group();
    bin.position.set(x, 0, z);
    bin.rotation.y = rotY;

    // 1.32m wide × 0.94m tall × 0.42m deep stainless frame + sloped anti-terrorism hood!
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.06, 0.4), this.matteBlackMat);
    plinth.position.y = 0.03;
    const back = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.86, 0.08), this.steelMat);
    back.position.set(0, 0.49, -0.16);
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.86, 0.4), this.steelMat);
    sideL.position.set(-0.63, 0.49, 0);
    const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.86, 0.4), this.steelMat);
    sideR.position.set(0.63, 0.49, 0);
    // Internal vertical bay dividers
    for (const dx of [-0.21, 0.21]) {
      const div = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.84, 0.38), this.steelMat);
      div.position.set(dx, 0.48, 0);
      bin.add(div);
    }
    // Sloped stainless top hood (prevents placing bags on top — authentic Japanese station spec!)
    const hood = new THREE.Mesh(new THREE.BoxGeometry(1.34, 0.14, 0.44), this.steelMat);
    hood.position.set(0, 0.92, -0.01);
    hood.rotation.x = 0.2;

    // 3 Color-coded sorting header fascia (`びん・かん・PET` | `新聞・雑誌` | `もえるゴミ`)
    const labelFace = new THREE.Mesh(
      new THREE.PlaneGeometry(1.26, 0.26),
      new THREE.MeshStandardMaterial({ map: this.textures.trashBinLabels, roughness: 0.44 })
    );
    labelFace.position.set(0, 0.77, 0.205);

    // Sculpted 3D deposit openings per compartment:
    // Left: dual bottle/can circles | Middle: newspaper slot | Right: trash drop chute
    for (const ox of [-0.5, -0.34]) {
      const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.03, 12), this.matteBlackMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(ox, 0.72, 0.202);
      bin.add(ring);
    }
    const newsSlit = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.045, 0.03), this.matteBlackMat);
    newsSlit.position.set(0, 0.72, 0.202);
    const trashHole = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.11, 0.03), this.matteBlackMat);
    trashHole.position.set(0.42, 0.72, 0.202);

    // Transparent smoked-acrylic anti-terrorism front windows showing bottles & paper inside!
    const frontGlass = new THREE.Mesh(new THREE.PlaneGeometry(1.24, 0.56), this.smokedGlassMat);
    frontGlass.position.set(0, 0.36, 0.195);

    for (let k = 0; k < 4; k++) {
      const bt = new THREE.Mesh(this.petBodyGeo, this.drinkMats[k]);
      bt.position.set(-0.46 + (k % 2) * 0.11, 0.16 + Math.floor(k / 2) * 0.08, 0.02);
      bt.rotation.z = 0.7 + k * 0.4;
      bin.add(bt);
    }
    const crumpledPaper = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.06, 0.22),
      new THREE.MeshStandardMaterial({ color: 0xd0ccc0, roughness: 0.9 })
    );
    crumpledPaper.position.set(0, 0.1, 0.02);

    bin.add(plinth, back, sideL, sideR, hood, labelFace, newsSlit, trashHole, frontGlass, crumpledPaper);
    return bin;
  }

  // 6. Ultra-Precise NTT East Aluminum/Green Glass Phone Booth + 3D 『MC-D8』 Green Payphone!
  buildPhoneBooth3D(def: HidingSpotDef): { group: THREE.Group; doorPivot: THREE.Group } {
    const g = new THREE.Group();
    g.position.set(def.x, 0, def.z);
    g.rotation.y = def.rotY;

    const nttGreen = new THREE.MeshStandardMaterial({ color: 0x16643c, roughness: 0.36, metalness: 0.46 });
    const phoneBodyGreen = new THREE.MeshStandardMaterial({ color: 0x1a8248, roughness: 0.3, metalness: 0.18 });
    const phoneFaceMat = new THREE.MeshStandardMaterial({
      color: 0x82a88c,
      map: this.textures.payphoneFace,
      emissive: new THREE.Color(0x528460),
      emissiveMap: this.textures.payphoneFace,
      emissiveIntensity: 0.36,
      roughness: 0.42,
    });
    const frostedStripeMat = new THREE.MeshStandardMaterial({
      color: 0xd4e2dc,
      transparent: true,
      opacity: 0.52,
      roughness: 0.58,
    });

    // Aluminum floor threshold & 4 extruded vertical corner mullions
    const floorPlate = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.04, 1.04), this.steelMat);
    floorPlate.position.y = 0.02;
    g.add(floorPlate);
    for (const [cx, cz] of [
      [-0.51, -0.48], [0.51, -0.48], [-0.51, 0.48], [0.51, 0.48],
    ]) {
      const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.065, 2.38, 0.065), this.steelMat);
      mullion.position.set(cx, 1.19, cz);
      g.add(mullion);
    }

    // Back green composite panel + left/right glass panels with mid-transoms & safety stripes
    const backPanel = new THREE.Mesh(new THREE.BoxGeometry(1.02, 2.34, 0.05), nttGreen);
    backPanel.position.set(0, 1.19, -0.48);
    g.add(backPanel);

    for (const sx of [-0.51, 0.51]) {
      const lowerKick = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.42, 0.92), nttGreen);
      lowerKick.position.set(sx, 0.23, 0);
      const glass = new THREE.Mesh(new THREE.BoxGeometry(0.025, 1.82, 0.9), this.clearGlassMat);
      glass.position.set(sx, 1.35, 0);
      const transom = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.045, 0.92), this.steelMat);
      transom.position.set(sx, 1.04, 0);
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.08, 0.9), frostedStripeMat);
      stripe.position.set(sx, 1.38, 0);
      g.add(lowerKick, glass, transom, stripe);
    }

    // Backlit 『電話 TELEPHONE』 green roof marquee + interior ceiling fluorescent diffuser + vent grille!
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.14, 0.26, 1.08), nttGreen);
    roof.position.set(0, 2.38, 0);
    const roofVent = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.04, 0.42), this.darkSteelMat);
    roofVent.position.set(0, 2.52, -0.1);
    const signMat = this.makeBacklitMat(this.textures.signPayphone, 0.72, 0xa8f8c4);
    const signFront = new THREE.Mesh(new THREE.PlaneGeometry(0.96, 0.21), signMat);
    signFront.position.set(0, 2.38, 0.545);
    const signLeft = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.21), signMat);
    signLeft.position.set(-0.575, 2.38, 0);
    signLeft.rotation.y = -Math.PI / 2;
    const signRight = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.21), signMat);
    signRight.position.set(0.575, 2.38, 0);
    signRight.rotation.y = Math.PI / 2;
    const innerDiffuser = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.045, 0.14), this.clearGlassMat);
    innerDiffuser.position.set(0, 2.22, -0.05);
    const innerTube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, 0.62, 8),
      new THREE.MeshBasicMaterial({ color: 0xd8f4e2 })
    );
    innerTube.rotation.z = Math.PI / 2;
    innerTube.position.set(0, 2.22, -0.05);
    // Interior emergency 110 / 119 red-header instruction plaque mounted on back wall
    const plaque = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.36, 0.014),
      new THREE.MeshStandardMaterial({ color: 0xe6e4dc, roughness: 0.55 })
    );
    plaque.position.set(0.26, 1.44, -0.445);
    const plaqueTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.07, 0.016),
      new THREE.MeshStandardMaterial({ color: 0xc82026, roughness: 0.42 })
    );
    plaqueTop.position.set(0.26, 1.585, -0.444);
    g.add(roof, roofVent, signFront, signLeft, signRight, innerDiffuser, innerTube, plaque, plaqueTop);

    // Interior brushed stainless writing shelf + yellow phone directory
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.035, 0.32), this.steelMat);
    shelf.position.set(0, 0.92, -0.3);
    const phoneBook = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.05, 0.28),
      new THREE.MeshStandardMaterial({ color: 0xc8a428, roughness: 0.72 })
    );
    phoneBook.position.set(0.26, 0.96, -0.31);
    g.add(shelf, phoneBook);

    // ULTRA-DETAILED 3D NTT EAST 『MC-D8』 GREEN PUBLIC PAYPHONE!
    const phoneG = new THREE.Group();
    phoneG.position.set(-0.14, 1.32, -0.35);

    const pBody = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.38, 0.19), phoneBodyGreen);
    const pSlope = new THREE.Mesh(new THREE.BoxGeometry(0.275, 0.14, 0.18), phoneBodyGreen);
    pSlope.position.set(0, 0.16, 0.01);
    pSlope.rotation.x = -0.24;
    const pFace = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.35), phoneFaceMat);
    pFace.position.set(0, 0, 0.098);
    // Authentic embossed 10円/100円 coin funnel, telecard slot bezel, and yellow coin-return flap!
    const pCoinFunnel = new THREE.Mesh(new THREE.BoxGeometry(0.058, 0.032, 0.036), this.chromeMat);
    pCoinFunnel.position.set(0.072, 0.16, 0.105);
    const pCardSlot = new THREE.Mesh(new THREE.BoxGeometry(0.072, 0.018, 0.024), this.matteBlackMat);
    pCardSlot.position.set(0.068, 0.068, 0.102);
    const pReturnFlap = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.048, 0.022), this.ticketYellowMat);
    pReturnFlap.position.set(0.068, -0.125, 0.102);
    phoneG.add(pBody, pSlope, pFace, pCoinFunnel, pCardSlot, pReturnFlap);

    // 3×4 Raised metallic push-button keypad + red 緊急通報 button!
    const keyGeo = new THREE.BoxGeometry(0.022, 0.022, 0.014);
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 3; c++) {
        const key = new THREE.Mesh(keyGeo, this.chromeMat);
        key.position.set(-0.04 + c * 0.036, 0.02 - r * 0.032, 0.102);
        phoneG.add(key);
      }
    }
    const redBtn = new THREE.Mesh(
      new THREE.BoxGeometry(0.036, 0.028, 0.018),
      new THREE.MeshStandardMaterial({ color: 0xd81c22, emissive: 0x3a080a, roughness: 0.36 })
    );
    redBtn.position.set(-0.072, -0.128, 0.104);
    phoneG.add(redBtn);

    // Sculpted 3D green handset resting on chrome cradle + curved armored metal cord!
    const cradle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.06), this.chromeMat);
    cradle.position.set(-0.155, 0.07, 0);
    const hGrip = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.18, 8), phoneBodyGreen);
    hGrip.position.set(-0.185, 0.03, 0.01);
    const hEar = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.024, 0.04, 10), phoneBodyGreen);
    hEar.rotation.z = Math.PI / 2;
    hEar.position.set(-0.165, 0.115, 0.01);
    const hMouth = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.024, 0.04, 10), phoneBodyGreen);
    hMouth.rotation.z = Math.PI / 2;
    hMouth.position.set(-0.165, -0.055, 0.01);
    // Curved metallic armored handset cord dangling in a natural catenary loop!
    const cordCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.18, -0.06, 0.01),
      new THREE.Vector3(-0.19, -0.22, 0.05),
      new THREE.Vector3(-0.12, -0.28, 0.03),
      new THREE.Vector3(-0.07, -0.18, 0.02),
    ]);
    const cord = new THREE.Mesh(new THREE.TubeGeometry(cordCurve, 12, 0.008, 6, false), this.chromeMat);
    phoneG.add(cradle, hGrip, hEar, hMouth, cord);
    g.add(phoneG);

    // Bi-fold aluminum-framed glass door with vertical tubular stainless pull handle
    const doorPivot = new THREE.Group();
    doorPivot.position.set(-0.48, 0, 0.48);
    const dBottom = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.56, 0.04), nttGreen);
    dBottom.position.set(0.48, 0.3, 0);
    const dTop = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.24, 0.04), nttGreen);
    dTop.position.set(0.48, 2.16, 0);
    const dGlass = new THREE.Mesh(new THREE.BoxGeometry(0.84, 1.46, 0.022), this.clearGlassMat);
    dGlass.position.set(0.48, 1.31, 0);
    const dMidBar = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.045, 0.042), this.steelMat);
    dMidBar.position.set(0.48, 1.04, 0);
    const dStripe = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.08, 0.028), frostedStripeMat);
    dStripe.position.set(0.48, 1.38, 0);
    // Vertical tubular stainless pull handle + mounting standoffs
    const dBar = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.36, 8), this.chromeMat);
    dBar.position.set(0.84, 1.12, 0.055);
    for (const hy of [0.98, 1.26]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.05, 6), this.chromeMat);
      post.rotation.x = Math.PI / 2;
      post.position.set(0.84, hy, 0.03);
      doorPivot.add(post);
    }
    doorPivot.add(dBottom, dTop, dGlass, dMidBar, dStripe, dBar);
    g.add(doorPivot);

    return { group: g, doorPivot };
  }

  // 7. Ultra-Precise Hideable JR Station Staff Maintenance Locker
  buildMaintenanceLocker3D(def: HidingSpotDef): { group: THREE.Group; doorPivot: THREE.Group } {
    const lockerMat = new THREE.MeshStandardMaterial({
      color: 0x303c46,
      normalMap: this.textures.brushedMetalNormal,
      roughness: 0.42,
      metalness: 0.68,
    });
    const innerMat = new THREE.MeshStandardMaterial({ color: 0x0b0e11, roughness: 0.92 });
    const badgeMat = new THREE.MeshStandardMaterial({
      color: 0xd8b242,
      emissive: new THREE.Color(0x46360e),
      emissiveIntensity: 0.45,
      roughness: 0.38,
    });

    const g = new THREE.Group();
    g.position.set(def.x, 0, def.z);
    g.rotation.y = def.rotY;

    const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.08, 0.94), this.matteBlackMat);
    plinth.position.y = 0.04;
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.98, 2.22, 0.05), innerMat);
    back.position.set(0, 1.15, -0.45);
    const left = new THREE.Mesh(new THREE.BoxGeometry(0.05, 2.22, 0.94), lockerMat);
    left.position.set(-0.475, 1.15, 0);
    const right = new THREE.Mesh(new THREE.BoxGeometry(0.05, 2.22, 0.94), lockerMat);
    right.position.set(0.475, 1.15, 0);
    const top = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.06, 0.98), lockerMat);
    top.position.set(0, 2.26, 0);
    // Interior shelf & coat bar visible when peeking inside
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.03, 0.56), this.darkSteelMat);
    shelf.position.set(0, 1.88, -0.14);
    const hookBar = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.86, 6), this.chromeMat);
    hookBar.rotation.z = Math.PI / 2;
    hookBar.position.set(0, 1.76, -0.12);
    g.add(plinth, back, left, right, top, shelf, hookBar);

    const doorPivot = new THREE.Group();
    doorPivot.position.set(-0.45, 0, 0.45);
    const lower = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.24, 0.04), lockerMat);
    lower.position.set(0.45, 0.7, 0);
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.46, 0.04), lockerMat);
    upper.position.set(0.45, 2.0, 0);
    // Side stiles flanking the 6 recessed viewing/ventilation louvers
    const stileL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 0.042), lockerMat);
    stileL.position.set(0.04, 1.54, 0);
    const stileR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 0.042), lockerMat);
    stileR.position.set(0.86, 1.54, 0);
    doorPivot.add(lower, upper, stileL, stileR);

    for (let i = 0; i < 6; i++) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.018, 0.048), this.darkSteelMat);
      slat.position.set(0.45, 1.36 + i * 0.072, 0);
      slat.rotation.x = 0.28;
      doorPivot.add(slat);
    }

    // Recessed brushed-steel latch pocket + handle + cylinder keyhole + riveted ID plate
    const latchRecess = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.22, 0.048), this.matteBlackMat);
    latchRecess.position.set(0.79, 1.08, 0.004);
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.14, 0.055), this.chromeMat);
    handle.position.set(0.79, 1.08, 0.036);
    const lockCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.02, 8), this.chromeMat);
    lockCyl.rotation.x = Math.PI / 2;
    lockCyl.position.set(0.79, 1.15, 0.03);
    const idPlate = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.075, 0.015), badgeMat);
    idPlate.position.set(0.45, 1.92, 0.025);
    doorPivot.add(latchRecess, handle, lockCyl, idPlate);

    g.add(doorPivot);
    return { group: g, doorPivot };
  }

  // 8. Ultra-Precise 3D Multi-Door JR East 『Suica コインロッカー』 Bank with Central Touch Terminal!
  buildSuicaCoinLockerBank3D(x: number, z: number, ry: number): THREE.Group {
    const bank = new THREE.Group();
    bank.position.set(x, 0, z);
    bank.rotation.y = ry;

    // Local -X is front face when ry=0 (matching wall positions x=23.72 facing -X, x=135.72 facing -X, z=15.72 with ry=PI/2 facing -Z!)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x262c34,
      normalMap: this.textures.brushedMetalNormal,
      roughness: 0.44,
      metalness: 0.66,
    });
    const doorMat = new THREE.MeshStandardMaterial({
      color: 0x3b444e,
      normalMap: this.textures.brushedMetalNormal,
      roughness: 0.36,
      metalness: 0.72,
    });
    const yellowTrimMat = new THREE.MeshStandardMaterial({ color: 0xdcb01a, roughness: 0.36 });
    const touchMat = this.makeBacklitMat(this.textures.suicaLockerTouch, 0.62);
    const ledFreeMat = new THREE.MeshBasicMaterial({ color: 0x34e082 });
    const ledUsedMat = new THREE.MeshBasicMaterial({ color: 0xe04238 });

    const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.54, 2.1, 1.94), bodyMat);
    cabinet.position.y = 1.05;
    cabinet.castShadow = true;
    // Sloped anti-dust top cornice + overhead protruding yellow 『Suica ロッカー』 banner sign!
    const cornice = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.12, 1.96), bodyMat);
    cornice.position.set(0.01, 2.15, 0);
    cornice.rotation.z = -0.18;
    const overheadBanner = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.24, 1.72), yellowTrimMat);
    overheadBanner.position.set(-0.27, 2.28, 0);
    bank.add(cabinet, cornice, overheadBanner);

    // 4 Columns along Z: col 0, 1, 3 are 3D beveled locker doors; col 2 is the Central Suica Touch Terminal!
    const colZs = [-0.7, -0.24, 0.24, 0.7];
    const rowSpecs: Array<[number, number]> = [
      [1.82, 0.38], // Top small
      [1.4, 0.38],  // Upper-mid small
      [0.95, 0.44], // Medium
      [0.39, 0.6],  // Bottom large suitcase locker
    ];

    colZs.forEach((cz, ci) => {
      if (ci === 2) {
        // Central Suica Touch-Screen Control Column!
        const header = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.14, 0.42), yellowTrimMat);
        header.position.set(-0.278, 1.88, cz);
        const scrBezel = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.56, 0.38), this.matteBlackMat);
        scrBezel.position.set(-0.275, 1.46, cz);
        const scrFace = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.5), touchMat);
        scrFace.position.set(-0.298, 1.46, cz);
        scrFace.rotation.y = -Math.PI / 2;
        // Glowing blue Suica IC reader pad + coin/receipt bay below screen
        const icPad = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.14), this.suicaPadMat);
        icPad.position.set(-0.29, 1.08, cz);
        icPad.rotation.y = -Math.PI / 2;
        const receipt = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.2), this.matteBlackMat);
        receipt.position.set(-0.275, 0.88, cz);
        // Bottom luggage locker door below terminal
        const bDoor = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.58, 0.41), doorMat);
        bDoor.position.set(-0.276, 0.39, cz);
        bank.add(header, scrBezel, scrFace, icPad, receipt, bDoor);
      } else {
        rowSpecs.forEach(([ryCenter, rh], ri) => {
          const door = new THREE.Mesh(new THREE.BoxGeometry(0.036, rh - 0.025, 0.41), doorMat);
          door.position.set(-0.276, ryCenter, cz);
          const handle = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.11, 0.024), this.chromeMat);
          handle.position.set(-0.3, ryCenter, cz + 0.14);
          // Stamped metallic locker number plate + cylinder keyhole!
          const numBadge = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.038, 0.078), this.steelMat);
          numBadge.position.set(-0.296, ryCenter + rh * 0.28, cz + 0.02);
          const keyhole = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.018, 8), this.chromeMat);
          keyhole.rotation.z = Math.PI / 2;
          keyhole.position.set(-0.298, ryCenter + 0.06, cz + 0.14);
          const led = new THREE.Mesh(
            new THREE.BoxGeometry(0.015, 0.022, 0.04),
            (ci + ri) % 3 === 0 ? ledUsedMat : ledFreeMat
          );
          led.position.set(-0.296, ryCenter + rh * 0.34, cz - 0.12);
          bank.add(door, handle, numBadge, keyhole, led);
        });
      }
    });

    return bank;
  }

  // 9. Ultra-Precise DNP 『Ki-Re-i』 証明写真機 (Pleated Curtain, Interior Studio, Ring Flash & Swivel Stool!)
  buildKiReiPhotoBooth3D(pos: { x: number; z: number }): { group: THREE.Group; shadowMesh: THREE.Mesh } {
    const g = new THREE.Group();
    g.position.set(pos.x, 0, pos.z);

    const kWhiteMat = new THREE.MeshStandardMaterial({ color: 0xdce2e8, roughness: 0.32, metalness: 0.16 });
    const kBlueMat = new THREE.MeshStandardMaterial({ color: 0x1668aa, roughness: 0.34, metalness: 0.2 });
    const innerDarkMat = new THREE.MeshStandardMaterial({ color: 0x121820, roughness: 0.86 });
    const curtainMat = new THREE.MeshStandardMaterial({ color: 0x101c32, roughness: 0.92, side: THREE.DoubleSide });
    const strobeMat = new THREE.MeshStandardMaterial({
      color: 0xdce8f0,
      emissive: new THREE.Color(0x9ed6f2),
      emissiveIntensity: 0.42,
      roughness: 0.4,
    });

    // Hollow 3-sided interior studio chamber (1.62m W × 2.26m H × 1.46m D) opening North (-Z)!
    const floor = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.06, 1.46), this.darkSteelMat);
    floor.position.y = 0.03;
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(1.62, 2.24, 0.08), kWhiteMat);
    backWall.position.set(0, 1.12, 0.69);
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.24, 1.46), kBlueMat);
    leftWall.position.set(-0.76, 1.12, 0);
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.24, 1.46), kWhiteMat);
    rightWall.position.set(0.76, 1.12, 0);
    const frontLeftPanel = new THREE.Mesh(new THREE.BoxGeometry(0.68, 2.24, 0.1), kWhiteMat);
    frontLeftPanel.position.set(-0.46, 1.12, -0.68);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.66, 0.24, 1.5), kBlueMat);
    roof.position.set(0, 2.16, 0);
    g.add(floor, backWall, leftWall, rightWall, frontLeftPanel, roof);

    // Backlit 『証明写真 Ki-Re-i』 Top Marquee & Exterior Side Price/Info Lightbox + Photo Out Tray!
    const marqueeMat = this.makeBacklitMat(this.textures.signPhotoBooth, 0.72, 0x98e4ff);
    const marquee = new THREE.Mesh(new THREE.PlaneGeometry(1.54, 0.44), marqueeMat);
    marquee.position.set(0, 2.02, -0.755);
    marquee.rotation.y = Math.PI;
    const sideGuideMat = this.makeBacklitMat(this.textures.kiReiSidePanel, 0.56);
    const sideGuide = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 1.18), sideGuideMat);
    sideGuide.position.set(-0.46, 1.18, -0.736);
    sideGuide.rotation.y = Math.PI;
    // Recessed exterior photo-delivery tray pocket with clear lid
    const trayBox = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.16, 0.08), this.matteBlackMat);
    trayBox.position.set(-0.46, 0.46, -0.72);
    const trayLid = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.12, 0.015), this.clearGlassMat);
    trayLid.position.set(-0.46, 0.47, -0.762);
    g.add(marquee, sideGuide, trayBox, trayLid);

    // Interior Studio: Camera wall + glowing studio strobe mirror + lens eye + swivel stool!
    const studioWall = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.9, 1.24), innerDarkMat);
    studioWall.position.set(-0.68, 1.0, 0);
    const flashBox = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.54), strobeMat);
    flashBox.position.set(-0.63, 1.28, 0.05);
    flashBox.rotation.y = Math.PI / 2;
    const camEye = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.04, 0.04, 12), this.matteBlackMat);
    camEye.rotation.z = Math.PI / 2;
    camEye.position.set(-0.62, 1.36, 0.05);
    // Chrome round swivel stool inside booth
    const stoolBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.03, 12), this.chromeMat);
    stoolBase.position.set(0.26, 0.07, 0.08);
    const stoolStem = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.48, 8), this.chromeMat);
    stoolStem.position.set(0.26, 0.32, 0.08);
    const stoolSeat = new THREE.Mesh(
      new THREE.CylinderGeometry(0.17, 0.17, 0.06, 14),
      new THREE.MeshStandardMaterial({ color: 0x1e2632, roughness: 0.62 })
    );
    stoolSeat.position.set(0.26, 0.58, 0.08);
    g.add(studioWall, flashBox, camEye, stoolBase, stoolStem, stoolSeat);

    // 7 Sculpted 3D Vertical-Pleated Navy Blackout Curtain Strips hung on Chrome Rod (parted slightly!)
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.88, 8), this.chromeMat);
    rod.rotation.z = Math.PI / 2;
    rod.position.set(0.32, 1.78, -0.68);
    g.add(rod);
    for (let i = 0; i < 7; i++) {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.105, 1.66, 0.018), curtainMat);
      strip.position.set(0.02 + i * 0.095, 0.94, -0.68 + (i % 2 === 0 ? -0.022 : 0.022));
      strip.rotation.y = i % 2 === 0 ? 0.34 : -0.34;
      g.add(strip);
    }

    // Eerie tall shadow silhouette revealed inside when the flash fires!
    const shadowMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.34, 1.58, 10),
      new THREE.MeshBasicMaterial({ color: 0x050208 })
    );
    shadowMesh.position.set(0.18, 0.86, 0.05);
    shadowMesh.visible = false;
    g.add(shadowMesh);

    return { group: g, shadowMesh };
  }

  // 10. Authentic JR East Kotobuki Perforated Stainless Station Bench with Curved Divider Armrests!
  buildKotobukiBench3D(x: number, z: number, ry = 0): THREE.Group {
    const b = new THREE.Group();
    b.position.set(x, 0, z);
    b.rotation.y = ry;

    const perfSteelMat = new THREE.MeshStandardMaterial({
      color: 0xa4acb4,
      normalMap: this.textures.brushedMetalNormal,
      roughness: 0.34,
      metalness: 0.8,
    });
    const endCapMat = new THREE.MeshStandardMaterial({ color: 0x2a2826, roughness: 0.44, metalness: 0.56 });

    // Contoured 4-slat ergonomic curved seat + 3-slat lumbar backrest
    const seatCurve: Array<[number, number, number]> = [
      [0.44, 0.24, 0.28],
      [0.46, 0.09, 0.06],
      [0.45, -0.06, -0.04],
      [0.47, -0.2, -0.2],
    ];
    for (const [sy, sz, rx] of seatCurve) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(2.68, 0.032, 0.13), perfSteelMat);
      slat.position.set(0, sy, sz);
      slat.rotation.x = rx;
      slat.castShadow = true;
      b.add(slat);
    }
    const backCurve: Array<[number, number, number]> = [
      [0.62, -0.26, -0.18],
      [0.75, -0.29, -0.14],
      [0.88, -0.31, -0.1],
    ];
    for (const [by, bz, rx] of backCurve) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(2.68, 0.11, 0.028), perfSteelMat);
      slat.position.set(0, by, bz);
      slat.rotation.x = rx;
      slat.castShadow = true;
      b.add(slat);
    }

    // 4 Curved Tubular Stainless Anti-Sleeping Divider Armrests (仕切り肘掛け)
    const armCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.46, 0.22),
      new THREE.Vector3(0, 0.64, 0.18),
      new THREE.Vector3(0, 0.66, -0.04),
      new THREE.Vector3(0, 0.62, -0.26),
    ]);
    const armGeo = new THREE.TubeGeometry(armCurve, 12, 0.018, 8, false);
    for (const ax of [-1.32, -0.44, 0.44, 1.32]) {
      const arm = new THREE.Mesh(armGeo, this.chromeMat);
      arm.position.x = ax;
      b.add(arm);
    }

    // Horizontal steel spine beam + 3 tapered cast-aluminum pedestal legs bolted to floor flanges
    const beam = new THREE.Mesh(new THREE.BoxGeometry(2.44, 0.07, 0.09), endCapMat);
    beam.position.set(0, 0.36, -0.04);
    b.add(beam);
    for (const lx of [-1.05, 0, 1.05]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.044, 0.38, 10), endCapMat);
      leg.position.set(lx, 0.19, -0.04);
      const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.09, 0.022, 12), this.steelMat);
      flange.position.set(lx, 0.011, -0.04);
      const backBrace = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.46, 0.05), endCapMat);
      backBrace.position.set(lx, 0.62, -0.29);
      backBrace.rotation.x = -0.14;
      b.add(leg, flange, backBrace);
    }
    return b;
  }

  // 11. Authentic Japanese 『屋内消火栓 総合盤』 (Emergency Φ150 Bell, Ruby Pilot Lamp, Transmitter & Hose Cabinet!)
  buildFireHydrantCabinet3D(x: number, z: number, ry: number): THREE.Group {
    const hg = new THREE.Group();
    hg.position.set(x, 1.16, z);
    hg.rotation.y = ry;

    const hydRedMat = new THREE.MeshStandardMaterial({ color: 0x9c181e, roughness: 0.34, metalness: 0.48 });
    const hydFaceMat = new THREE.MeshStandardMaterial({
      map: this.textures.fireHydrant,
      normalMap: this.textures.brushedMetalNormal,
      roughness: 0.36,
      metalness: 0.5,
    });
    const rubyLampMat = new THREE.MeshBasicMaterial({ color: 0xff2824 });

    // Recessed perimeter steel flange + crimson cabinet body
    const flange = new THREE.Mesh(new THREE.BoxGeometry(0.74, 1.5, 0.04), this.steelMat);
    flange.position.z = 0.01;
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.68, 1.44, 0.14), hydRedMat);
    box.position.z = 0.07;
    const front = new THREE.Mesh(new THREE.PlaneGeometry(0.64, 1.4), hydFaceMat);
    front.position.z = 0.142;

    // 3D Round Red Φ150 Emergency Alarm Bell (非常ベル) + chrome center nut
    const bell = new THREE.Mesh(
      new THREE.SphereGeometry(0.078, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55),
      hydRedMat
    );
    bell.rotation.x = Math.PI / 2;
    bell.position.set(0.14, 0.5, 0.14);
    const bellNut = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.025, 8), this.chromeMat);
    bellNut.rotation.x = Math.PI / 2;
    bellNut.position.set(0.14, 0.5, 0.212);

    // 3D Glowing Ruby Pilot Lamp (表示灯) inside chrome bezel collar
    const lampCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.052, 0.03, 12), this.chromeMat);
    lampCollar.rotation.x = Math.PI / 2;
    lampCollar.position.set(-0.14, 0.52, 0.15);
    const lampDome = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 10), rubyLampMat);
    lampDome.position.set(-0.14, 0.52, 0.168);

    // 3D Push-Button Fire Transmitter (火災報知機・発信機) with translucent protective ring
    const txRing = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.074, 0.036, 14), hydRedMat);
    txRing.rotation.x = Math.PI / 2;
    txRing.position.set(-0.14, 0.34, 0.155);
    const txCover = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.012, 14), this.clearGlassMat);
    txCover.rotation.x = Math.PI / 2;
    txCover.position.set(-0.14, 0.34, 0.176);

    // Recessed chrome door handle & 2 barrel hinges on lower hose door
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.14, 0.035), this.chromeMat);
    handle.position.set(0.24, -0.14, 0.155);
    for (const hy of [-0.04, -0.48]) {
      const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.07, 8), this.chromeMat);
      hinge.position.set(-0.33, hy, 0.142);
      hg.add(hinge);
    }

    hg.add(flange, box, front, bell, bellNut, lampCollar, lampDome, txRing, txCover, handle);
    return hg;
  }

  // 12. Authentic JR East Suspended Green-Frame Station Analog Clock with Real 3D Hands at 00:47!
  buildJRStationClock3D(x: number, y: number, z: number, ry: number, ceilH: number): THREE.Group {
    const cg = new THREE.Group();
    cg.position.set(x, y, z);
    cg.rotation.y = ry;

    const jrGreenMat = new THREE.MeshStandardMaterial({ color: 0x126032, roughness: 0.38, metalness: 0.18 });
    const clockMat = new THREE.MeshStandardMaterial({
      color: 0x566052,
      map: this.textures.clockFace,
      emissive: new THREE.Color(0x9ec85e),
      emissiveMap: this.textures.clockFace,
      emissiveIntensity: 0.56,
      roughness: 0.68,
    });
    const handBlack = this.matteBlackMat;
    const handRed = new THREE.MeshBasicMaterial({ color: 0xd82428 });

    const box = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.6, 0.16), jrGreenMat);
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.62, 0.04), this.darkSteelMat);
    cg.add(box, bezel);

    // Ceiling suspension pipe & ceiling canopy escutcheon
    const rodLen = Math.max(0.2, ceilH - (y + 0.3));
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, rodLen, 8), this.darkSteelMat);
    rod.position.y = 0.3 + rodLen * 0.5;
    const ceilingPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.025, 12), this.darkSteelMat);
    ceilingPlate.position.y = 0.3 + rodLen - 0.01;
    cg.add(rod, ceilingPlate);

    for (const dir of [-1, 1]) {
      const f = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 0.52), clockMat);
      f.position.z = dir * 0.083;
      if (dir < 0) f.rotation.y = Math.PI;

      // Actual 3D raised hands stopped at 00:47!
      const hGroup = new THREE.Group();
      hGroup.position.z = dir * 0.088;
      if (dir < 0) hGroup.rotation.y = Math.PI;
      const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.14, 0.008), handBlack);
      hourHand.position.set(0.015, 0.055, 0);
      hourHand.rotation.z = -0.4; // ~00:47 hour hand
      const minHand = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.2, 0.008), handBlack);
      minHand.position.set(-0.072, 0.036, 0.003);
      minHand.rotation.z = 1.15; // 47 minutes
      const secHand = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.21, 0.006), handRed);
      secHand.position.set(0.04, -0.05, 0.006);
      secHand.rotation.z = -2.4;
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.014, 8), this.chromeMat);
      pin.rotation.x = Math.PI / 2;
      hGroup.add(hourHand, minHand, secHand, pin);

      const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.54), this.clearGlassMat);
      glass.position.z = dir * 0.096;
      if (dir < 0) glass.rotation.y = Math.PI;
      cg.add(f, hGroup, glass);
    }

    return cg;
  }

  // 13. Authentic Shinjuku Station Ceiling Security CCTV Camera (Swivel Bracket, Sun Hood, Optical Lens & Cable!)
  buildSecurityCamera3D(cx: number, cy: number, cz: number): {
    mount: THREE.Group;
    headPivot: THREE.Group;
    ledMat: THREE.MeshBasicMaterial;
  } {
    const mount = new THREE.Group();
    mount.position.set(cx, cy, cz);

    const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.095, 0.025, 12), this.darkSteelMat);
    flange.position.y = 0.31;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8), this.darkSteelMat);
    stem.position.y = 0.16;
    const knuckle = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 10), this.darkSteelMat);
    mount.add(flange, stem, knuckle);

    const headPivot = new THREE.Group();
    const housing = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.11, 0.28), this.steelMat);
    const hood = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.022, 0.34), this.steelMat);
    hood.position.set(0, 0.062, 0.025);
    const frontMask = new THREE.Mesh(new THREE.BoxGeometry(0.118, 0.098, 0.02), this.matteBlackMat);
    frontMask.position.z = 0.14;
    const lensBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.04, 0.055, 14), this.darkSteelMat);
    lensBarrel.rotation.x = Math.PI / 2;
    lensBarrel.position.z = 0.165;
    const lensGlass = new THREE.Mesh(
      new THREE.CircleGeometry(0.03, 12),
      new THREE.MeshPhysicalMaterial({ color: 0x0c1a28, roughness: 0.06, metalness: 0.3, clearcoat: 1.0 })
    );
    lensGlass.position.z = 0.194;

    const ledMat = new THREE.MeshBasicMaterial({ color: 0xff2222 });
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 8), ledMat);
    led.position.set(0.04, 0.03, 0.154);

    // Coiled power pigtail connecting rear of camera housing to ceiling stem
    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.02, -0.14),
      new THREE.Vector3(0.03, -0.05, -0.18),
      new THREE.Vector3(0.02, 0.08, -0.06),
      new THREE.Vector3(0, 0.16, 0),
    ]);
    const cable = new THREE.Mesh(new THREE.TubeGeometry(cableCurve, 10, 0.006, 6, false), this.matteBlackMat);

    headPivot.add(housing, hood, frontMask, lensBarrel, lensGlass, led, cable);
    mount.add(headPivot);
    return { mount, headPivot, ledMat };
  }

  // 14. Real 3D Recessed 『NewDays 新宿』 Storefront with Signboard Canopy, Pilasters & Shutter Track!
  buildNewDaysStorefront3D(x: number, z: number, ry: number): THREE.Group {
    const nd = new THREE.Group();
    nd.position.set(x, 0, z);
    nd.rotation.y = ry;

    const greenTrimMat = new THREE.MeshStandardMaterial({ color: 0x147c42, roughness: 0.36 });
    const shutterFaceMat = new THREE.MeshStandardMaterial({
      map: this.textures.newDaysShutter,
      emissive: new THREE.Color(0x82c288),
      emissiveMap: this.textures.newDaysShutter,
      emissiveIntensity: 0.24,
      roughness: 0.5,
      metalness: 0.52,
    });

    const shutter = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 2.72), shutterFaceMat);
    shutter.position.set(0, 1.36, 0.02);
    // Protruding 3D brushed-aluminum storefront surround & illuminated top signboard soffit (clears NewDays header!)
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(6.92, 0.24, 0.28), greenTrimMat);
    canopy.position.set(0, 2.86, 0.12);
    const canopyTrim = new THREE.Mesh(new THREE.BoxGeometry(6.96, 0.045, 0.32), this.steelMat);
    canopyTrim.position.set(0, 2.73, 0.13);
    const bottomBar = new THREE.Mesh(new THREE.BoxGeometry(6.62, 0.08, 0.09), this.darkSteelMat);
    bottomBar.position.set(0, 0.05, 0.04);
    for (const px of [-3.38, 3.38]) {
      const pilaster = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.98, 0.22), this.steelMat);
      pilaster.position.set(px, 1.49, 0.09);
      nd.add(pilaster);
    }
    // Side illuminated promotional light-box poster frame
    const promoBox = new THREE.Mesh(new THREE.BoxGeometry(0.84, 1.18, 0.08), this.darkSteelMat);
    promoBox.position.set(3.96, 1.56, 0.04);
    const promoFace = new THREE.Mesh(
      new THREE.PlaneGeometry(0.76, 1.1),
      this.makeBacklitMat(this.textures.posterStages[0], 0.42)
    );
    promoFace.position.set(3.96, 1.56, 0.084);

    nd.add(shutter, canopy, canopyTrim, bottomBar, promoBox, promoFace);
    return nd;
  }

  // 15. Upgraded Alps Plaza Shattered Display Case Pedestal (Jagged Glass Clamps + Draped Red Velvet Ropes!)
  buildAlpsPedestal3D(pos: { x: number; z: number }): THREE.Group {
    const g = new THREE.Group();
    g.position.set(pos.x, 0, pos.z);
    g.rotation.y = -Math.PI / 2;

    const marble = new THREE.MeshStandardMaterial({
      color: 0x1e2328,
      roughness: 0.26,
      metalness: 0.28,
      envMapIntensity: 0.95,
    });
    const shardMat = new THREE.MeshPhysicalMaterial({
      color: 0xaad6e2,
      transparent: true,
      opacity: 0.28,
      roughness: 0.08,
      metalness: 0.14,
      side: THREE.DoubleSide,
    });

    const step1 = new THREE.Mesh(new THREE.BoxGeometry(2.12, 0.22, 2.12), marble);
    step1.position.y = 0.11;
    step1.castShadow = true;
    step1.receiveShadow = true;
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.58, 1.68), marble);
    body.position.y = 0.51;
    body.castShadow = true;
    body.receiveShadow = true;
    const trim = new THREE.Mesh(new THREE.BoxGeometry(1.74, 0.045, 1.74), this.brassMat);
    trim.position.y = 0.81;

    const plaqueFrame = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.56, 0.04), this.brassMat);
    plaqueFrame.position.set(0, 0.54, 0.84);
    const plaque = new THREE.Mesh(
      new THREE.PlaneGeometry(1.16, 0.48),
      new THREE.MeshStandardMaterial({ map: this.textures.pedestalPlaque, roughness: 0.4 })
    );
    plaque.position.set(0, 0.54, 0.864);
    g.add(step1, body, trim, plaqueFrame, plaque);

    // 4 Vertical brass display-case corner rails still standing with delicate jagged shattered glass edges!
    const cornerSpecs: Array<[number, number, number, number]> = [
      [-0.78, -0.78, 0.18, 0.24],
      [0.78, -0.78, 0.22, -0.18],
      [-0.78, 0.78, 0.16, 0.3],
      [0.78, 0.78, 0.14, -0.22],
    ];
    for (const [cx, cz, sh, rz] of cornerSpecs) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.95, 0.04), this.brassMat);
      rail.position.set(cx, 1.79, cz);
      const jagged = new THREE.Mesh(new THREE.CircleGeometry(sh, 3), shardMat);
      jagged.position.set(cx * 0.86, 0.92, cz);
      jagged.rotation.z = rz;
      g.add(rail, jagged);
    }
    const topFrame = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.05, 1.64), this.brassMat);
    topFrame.position.y = 2.76;
    g.add(topFrame);

    // Scattered multi-faceted shattered tempered glass shards on the floor
    const shards: Array<[number, number, number, number]> = [
      [0.65, -1.25, 0.34, 0.4], [-0.85, -1.1, 0.26, 1.1], [0.22, -1.55, 0.22, 2.2],
      [-0.4, -1.45, 0.3, 0.8], [1.15, -0.7, 0.24, 1.7], [0.95, -1.62, 0.19, 0.9],
      [-0.95, -1.78, 0.21, 2.6], [0.1, -0.98, 0.18, 1.4],
    ];
    for (const [sx, sz, sc, rot] of shards) {
      const m = new THREE.Mesh(new THREE.CircleGeometry(sc, 3), shardMat);
      m.rotation.x = -Math.PI / 2;
      m.rotation.z = rot;
      m.position.set(sx, 0.015, sz);
      g.add(m);
    }

    // 4 Brass velvet-rope stanchions (3 upright connected by draped curved red velvet ropes + 1 knocked over!)
    const posts: Array<[number, number, boolean]> = [
      [-1.42, 1.42, false],
      [1.42, 1.42, false],
      [-1.42, -1.42, false],
      [1.42, -1.42, true],
    ];
    for (const [px, pz, fallen] of posts) {
      const p = new THREE.Group();
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.04, 14), this.brassMat);
      base.position.y = 0.02;
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.88, 10), this.brassMat);
      pole.position.y = 0.46;
      pole.castShadow = true;
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.046, 10, 10), this.brassMat);
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

    // Draped catenary red velvet ropes between intact stanchions + snapped rope pooling on the floor!
    const addRope = (p1: THREE.Vector3, p2: THREE.Vector3, sagY: number) => {
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      mid.y = sagY;
      const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
      g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 14, 0.02, 8, false), this.velvetRedMat));
    };
    addRope(new THREE.Vector3(-1.42, 0.84, 1.42), new THREE.Vector3(1.42, 0.84, 1.42), 0.36);
    addRope(new THREE.Vector3(-1.42, 0.84, 1.42), new THREE.Vector3(-1.42, 0.84, -1.42), 0.52);
    addRope(new THREE.Vector3(1.42, 0.84, 1.42), new THREE.Vector3(1.58, 0.04, 0.05), 0.24); // Snapped!

    // Purple mascot footprints leading off the shattered pedestal
    const fpMat = new THREE.MeshStandardMaterial({
      color: 0x4e2278,
      emissive: new THREE.Color(0x1c0830),
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: 0.78,
      roughness: 0.22,
    });
    for (let i = 0; i < 8; i++) {
      const fp = new THREE.Mesh(new THREE.CircleGeometry(0.17, 12), fpMat);
      fp.rotation.x = -Math.PI / 2;
      fp.scale.set(0.85, 1.38, 1);
      fp.position.set((i % 2 === 0 ? -0.24 : 0.24) + i * 0.03, 0.013, -1.4 - i * 0.92);
      g.add(fp);
    }

    return g;
  }

  // 16. Detailed Clear Japanese Commuter Vinyl Umbrella (8 Metal Wireframe Ribs, Runner & White J-Handle!)
  buildVinylUmbrella3D(x: number, z: number, rotY: number): THREE.Group {
    const u = new THREE.Group();
    u.position.set(x, 0.14, z);
    u.rotation.set(0.08, rotY, Math.PI * 0.47);

    const canopyMat = new THREE.MeshPhysicalMaterial({
      color: 0xdce6ea,
      transparent: true,
      opacity: 0.34,
      roughness: 0.14,
      side: THREE.DoubleSide,
    });
    const whitePlastic = new THREE.MeshStandardMaterial({ color: 0xe2dfd8, roughness: 0.46 });

    const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.46, 0.34, 8, 1, true), canopyMat);
    canopy.position.y = 0.24;
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.84, 6), this.chromeMat);
    shaft.position.y = -0.04;
    const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.01, 0.07, 6), whitePlastic);
    ferrule.position.y = 0.43;
    const runner = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.04, 8), whitePlastic);
    runner.position.y = 0.06;
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.052, 0.012, 8, 12, Math.PI), whitePlastic);
    handle.position.set(0.052, -0.46, 0);
    handle.rotation.z = Math.PI;
    u.add(canopy, shaft, ferrule, runner, handle);

    // 8 internal steel wireframe ribs radiating inside the clear canopy
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const rib = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.56, 4), this.chromeMat);
      rib.position.set(Math.cos(a) * 0.22, 0.24, Math.sin(a) * 0.22);
      rib.rotation.y = -a;
      rib.rotation.z = 0.94;
      u.add(rib);
    }
    return u;
  }

  // 17. Detailed Forgotten Commuter Leather Briefcase (Stitched Trim, Dual Chrome Buckles & Draped Strap!)
  buildBriefcase3D(x: number, z: number, rotY: number): THREE.Group {
    const bg = new THREE.Group();
    bg.position.set(x, 0.16, z);
    bg.rotation.y = rotY;

    const leather = new THREE.MeshStandardMaterial({ color: 0x1a181c, roughness: 0.48, metalness: 0.12 });
    const piping = new THREE.MeshStandardMaterial({ color: 0x2a262c, roughness: 0.42 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.32, 0.12), leather);
    const flap = new THREE.Mesh(new THREE.BoxGeometry(0.445, 0.14, 0.128), piping);
    flap.position.y = 0.095;
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.058, 0.012, 8, 12, Math.PI), leather);
    handle.position.y = 0.165;
    for (const cx of [-0.11, 0.11]) {
      const strap = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.14, 0.134), leather);
      strap.position.set(cx, 0.05, 0);
      const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.032, 0.14), this.chromeMat);
      buckle.position.set(cx, -0.005, 0);
      bg.add(strap, buckle);
    }
    // Leather shoulder strap spilling onto the terrazzo floor beside the bag!
    const strapCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.22, 0.12, 0),
      new THREE.Vector3(-0.34, -0.14, 0.08),
      new THREE.Vector3(-0.18, -0.15, 0.24),
      new THREE.Vector3(0.16, -0.15, 0.18),
      new THREE.Vector3(0.22, 0.12, 0),
    ]);
    const shoulderStrap = new THREE.Mesh(new THREE.TubeGeometry(strapCurve, 14, 0.008, 6, false), leather);
    bg.add(body, flap, handle, shoulderStrap);
    return bg;
  }

  // 18. Detailed Folding Station Safety Barricade (`終電終了・立入禁止`) with Amber Top Warning Beacon!
  buildSafetyBarricade3D(x: number, z: number, ry: number): THREE.Group {
    const bg = new THREE.Group();
    bg.position.set(x, 0, z);
    bg.rotation.y = ry;

    const boardMat = new THREE.MeshStandardMaterial({
      map: this.textures.barricadePanel,
      roughness: 0.44,
      metalness: 0.14,
    });
    const amberBeaconMat = new THREE.MeshStandardMaterial({
      color: 0xe89818,
      emissive: new THREE.Color(0xc86410),
      emissiveIntensity: 0.82,
      roughness: 0.24,
    });

    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.82, 0.045), this.darkSteelMat);
    frame.position.y = 0.56;
    const panel = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.76, 0.055), boardMat);
    panel.position.y = 0.56;
    panel.castShadow = true;
    bg.add(frame, panel);

    for (const lx of [-0.72, 0.72]) {
      for (const dir of [-1, 1]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.96, 8), this.chromeMat);
        leg.position.set(lx, 0.46, dir * 0.13);
        leg.rotation.x = -dir * 0.24;
        const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.026, 0.04, 8), this.matteBlackMat);
        foot.position.set(lx, 0.02, dir * 0.24);
        bg.add(leg, foot);
      }
      const hinge = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.06, 0.09), this.darkSteelMat);
      hinge.position.set(lx, 0.92, 0);
      bg.add(hinge);
    }

    // Amber solar warning beacon mounted on right corner!
    const beaconBase = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.046, 0.06, 10), this.matteBlackMat);
    beaconBase.position.set(0.66, 1.0, 0);
    const beaconLens = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.04, 0.09, 10), amberBeaconMat);
    beaconLens.position.set(0.66, 1.07, 0);
    bg.add(beaconBase, beaconLens);

    return bg;
  }

  // 19. Molded Yellow Polypropylene Folding 『足元注意』 Wet-Floor Sign with Carry-Handle Bridge!
  buildWetFloorSign3D(x: number, z: number, ry: number, tipped: boolean): THREE.Group {
    const g = new THREE.Group();
    const wfMat = new THREE.MeshStandardMaterial({ map: this.textures.wetFloorSign, roughness: 0.42 });
    const yellowRimMat = new THREE.MeshStandardMaterial({ color: 0xe6b414, roughness: 0.44 });

    for (const dir of [-1, 1]) {
      const board = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.62, 0.024), wfMat);
      board.position.set(0, 0.31, dir * 0.12);
      board.rotation.x = -dir * 0.22;
      board.castShadow = true;
      g.add(board);
    }
    // Top carry-handle bridge & side folding hinges
    const topBridge = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.036, 0.06), yellowRimMat);
    topBridge.position.y = 0.61;
    const handleSlot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.024, 0.066), this.matteBlackMat);
    handleSlot.position.y = 0.565;
    g.add(topBridge, handleSlot);

    g.position.set(x, 0, z);
    g.rotation.y = ry;
    if (tipped) {
      g.rotation.z = Math.PI / 2 - 0.12;
      g.position.y = 0.18;
    }
    return g;
  }

  // 20. Iconic 1969 『新宿の目』(Eye of Shinjuku — Yoshiko Miyashita, 10.0m × 3.4m Sculpted Illuminated Acrylic Art!)
  buildEyeOfShinjuku3D(
    x: number,
    y: number,
    z: number
  ): { group: THREE.Group; pupilGroup: THREE.Group; irisMat: THREE.MeshStandardMaterial } {
    const g = new THREE.Group();
    g.position.set(x, y, z);

    const stoneFrameMat = new THREE.MeshStandardMaterial({
      color: 0x302e2c,
      roughness: 0.62,
      metalness: 0.24,
    });
    const acrylicRibMat = new THREE.MeshStandardMaterial({
      color: 0xd8cfc0,
      emissive: new THREE.Color(0xc4a878),
      emissiveIntensity: 0.48,
      roughness: 0.34,
      metalness: 0.08,
    });
    const innerCavityMat = new THREE.MeshStandardMaterial({
      color: 0x26201a,
      emissive: new THREE.Color(0x52402a),
      emissiveIntensity: 0.38,
      roughness: 0.65,
    });
    const irisMat = new THREE.MeshStandardMaterial({
      color: 0xb8aa94,
      map: this.textures.eyeOfShinjukuIris,
      emissive: new THREE.Color(0xf4dec0),
      emissiveMap: this.textures.eyeOfShinjukuIris,
      emissiveIntensity: 0.68,
      roughness: 0.28,
      metalness: 0.12,
    });

    // Recessed architectural dark-granite surround frame (exact 10.0m wide × 3.4m tall!)
    const frameBack = new THREE.Mesh(new THREE.BoxGeometry(10.1, 3.42, 0.16), stoneFrameMat);
    frameBack.position.z = 0.04;
    const recessGlow = new THREE.Mesh(new THREE.PlaneGeometry(9.6, 3.0), innerCavityMat);
    recessGlow.position.z = 0.13;
    const topLintel = new THREE.Mesh(new THREE.BoxGeometry(10.24, 0.18, 0.36), stoneFrameMat);
    topLintel.position.set(0, 1.72, 0.14);
    const botSill = new THREE.Mesh(new THREE.BoxGeometry(10.24, 0.18, 0.36), stoneFrameMat);
    botSill.position.set(0, -1.72, 0.14);
    g.add(frameBack, recessGlow, topLintel, botSill);

    // 14 Sculpted concentric almond-curved translucent acrylic eyelid ribs (upper & lower swept arcs!)
    const ribCurves: Array<{ sign: number; height: number; width: number; depth: number; r: number }> = [
      { sign: 1, height: 1.48, width: 4.7, depth: 0.28, r: 0.055 },
      { sign: 1, height: 1.24, width: 4.5, depth: 0.25, r: 0.048 },
      { sign: 1, height: 1.0, width: 4.2, depth: 0.22, r: 0.042 },
      { sign: 1, height: 0.78, width: 3.8, depth: 0.2, r: 0.036 },
      { sign: -1, height: 1.48, width: 4.7, depth: 0.28, r: 0.055 },
      { sign: -1, height: 1.24, width: 4.5, depth: 0.25, r: 0.048 },
      { sign: -1, height: 1.0, width: 4.2, depth: 0.22, r: 0.042 },
      { sign: -1, height: 0.78, width: 3.8, depth: 0.2, r: 0.036 },
    ];
    for (const rc of ribCurves) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 16; i++) {
        const t = i / 16;
        const u = t * 2 - 1; // -1 .. +1
        const px = u * rc.width;
        const arch = Math.pow(Math.max(0, 1 - u * u), 0.72);
        const py = rc.sign * arch * rc.height;
        const pz = 0.14 + arch * rc.depth;
        pts.push(new THREE.Vector3(px, py, pz));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, rc.r, 7, false), acrylicRibMat);
      g.add(tube);
    }

    // Translucent frosted white acrylic almond sclera backing shells on left & right of iris
    const scleraShape = new THREE.Shape();
    scleraShape.moveTo(-4.45, 0);
    scleraShape.quadraticCurveTo(0, 1.82, 4.45, 0);
    scleraShape.quadraticCurveTo(0, -1.82, -4.45, 0);
    const scleraMat = new THREE.MeshStandardMaterial({
      color: 0xd0c6b4,
      emissive: new THREE.Color(0x9e8864),
      emissiveIntensity: 0.44,
      roughness: 0.36,
      metalness: 0.06,
    });
    const scleraMesh = new THREE.Mesh(new THREE.ShapeGeometry(scleraShape, 24), scleraMat);
    scleraMesh.position.z = 0.15;
    g.add(scleraMesh);

    // Sculpted vertical light-diffuser fins across sclera corners (authentic 1969 Miyashita faceted look!)
    for (const sx of [-3.6, -2.9, -2.2, 2.2, 2.9, 3.6]) {
      const hFrac = Math.sqrt(Math.max(0.05, 1 - (sx / 4.5) * (sx / 4.5)));
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 2.15 * hFrac, 0.14), acrylicRibMat);
      fin.position.set(sx, 0, 0.21);
      g.add(fin);
    }

    // Independently articulated rotating illuminated acrylic iris & obsidian pupil orb!
    const pupilGroup = new THREE.Group();
    pupilGroup.position.set(0, 0, 0.26);

    const outerIrisRing = new THREE.Mesh(new THREE.TorusGeometry(1.12, 0.065, 10, 32), this.darkSteelMat);
    const irisDome = new THREE.Mesh(new THREE.CircleGeometry(1.08, 32), irisMat);
    irisDome.position.z = 0.04;
    const pupilCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 18, 14, 0, Math.PI * 2, 0, Math.PI * 0.5),
      new THREE.MeshPhysicalMaterial({
        color: 0x060406,
        roughness: 0.06,
        metalness: 0.25,
        clearcoat: 1.0,
      })
    );
    pupilCore.rotation.x = Math.PI / 2;
    pupilCore.position.z = 0.05;
    const innerCornerOrb = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), acrylicRibMat);
    innerCornerOrb.position.set(-3.45, 0, 0.24);
    g.add(innerCornerOrb);

    pupilGroup.add(outerIrisRing, irisDome, pupilCore);
    g.add(pupilGroup);

    // Subtle brushed bronze museum plaque beneath 『新宿の目 1969 宮下芳子』
    const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.22, 0.03), this.brassMat);
    plaque.position.set(4.1, -1.55, 0.22);
    g.add(plaque);

    return { group: g, pupilGroup, irisMat };
  }

  // 21. Dual Parallel 『西新宿・都庁方面 動く歩道』 (Moving Walkways with Grooved Belts, Glass Balustrades & Comb Plates!)
  buildMovingWalkway3D(
    xStart: number,
    xEnd: number,
    zCenter: number,
    halfWidth: number
  ): { group: THREE.Group; beltTexWest: THREE.CanvasTexture; beltTexEast: THREE.CanvasTexture } {
    const g = new THREE.Group();
    const len = xEnd - xStart;
    const midX = (xStart + xEnd) * 0.5;
    g.position.set(midX, 0, zCenter);

    // Clone belt texture so westbound & eastbound lanes scroll smoothly in opposite directions!
    const beltTexWest = this.textures.movingWalkwayBelt;
    const beltTexEast = this.textures.movingWalkwayBelt.clone();
    beltTexEast.needsUpdate = true;

    const makeBeltMat = (tex: THREE.CanvasTexture) =>
      new THREE.MeshStandardMaterial({
        map: tex,
        normalMap: this.textures.movingWalkwayBeltNormal,
        normalScale: new THREE.Vector2(0.85, 0.85),
        roughness: 0.42,
        metalness: 0.72,
      });

    const yellowSafetyMat = new THREE.MeshStandardMaterial({ color: 0xe2b216, roughness: 0.46 });
    const greenArrowMat = new THREE.MeshBasicMaterial({ color: 0x36e68a });
    const redStopMat = new THREE.MeshBasicMaterial({ color: 0xe6282e });

    const laneWidth = halfWidth - 0.16;
    const beltLen = len - 1.3;

    // 2 Parallel Moving Belts (North lane = Westbound toward 都庁, South lane = Eastbound toward 新宿駅)
    const lanes: Array<{ zOff: number; mat: THREE.MeshStandardMaterial; goWest: boolean }> = [
      { zOff: -halfWidth * 0.5, mat: makeBeltMat(beltTexWest), goWest: true },
      { zOff: halfWidth * 0.5, mat: makeBeltMat(beltTexEast), goWest: false },
    ];
    for (const lane of lanes) {
      const belt = new THREE.Mesh(new THREE.BoxGeometry(beltLen, 0.04, laneWidth), lane.mat);
      belt.position.set(0, 0.025, lane.zOff);
      belt.receiveShadow = true;
      g.add(belt);

      // Grooved stainless comb landing plates (`コムプレート`) + yellow safety strips at BOTH ends!
      for (const endDir of [-1, 1]) {
        const combPlate = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.044, laneWidth + 0.08), this.steelMat);
        combPlate.position.set(endDir * (len * 0.5 - 0.34), 0.024, lane.zOff);
        const yellowComb = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.048, laneWidth), yellowSafetyMat);
        yellowComb.position.set(endDir * (beltLen * 0.5 + 0.05), 0.026, lane.zOff);
        g.add(combPlate, yellowComb);
      }
    }

    // 3 Continuous Tempered-Glass Balustrades (North outer, Center divider, South outer)
    // with Brushed Stainless Decking, Black Moving Rubber Handrails, Curved Inlet Boots & Red Emergency Stop!
    for (const bz of [-halfWidth, 0, halfWidth]) {
      const skirt = new THREE.Mesh(new THREE.BoxGeometry(len - 0.2, 0.24, 0.14), this.steelMat);
      skirt.position.set(0, 0.12, bz);
      const glass = new THREE.Mesh(new THREE.BoxGeometry(len - 0.7, 0.72, 0.026), this.clearGlassMat);
      glass.position.set(0, 0.58, bz);
      const handrail = new THREE.Mesh(new THREE.BoxGeometry(len - 0.3, 0.058, 0.09), this.matteBlackMat);
      handrail.position.set(0, 0.96, bz);
      g.add(skirt, glass, handrail);

      // Rounded newel ends + black rubber handrail return curves + yellow inlet guard + red emergency stop button!
      for (const endDir of [-1, 1]) {
        const endX = endDir * (len * 0.5 - 0.18);
        const newel = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.072, 0.94, 12), this.steelMat);
        newel.position.set(endX, 0.47, bz);
        // Curved black rubber handrail wrap around newel nose
        const wrap = new THREE.Mesh(
          new THREE.TorusGeometry(0.24, 0.036, 8, 12, Math.PI),
          this.matteBlackMat
        );
        wrap.rotation.z = endDir > 0 ? -Math.PI / 2 : Math.PI / 2;
        wrap.position.set(endX - endDir * 0.08, 0.72, bz);
        // Yellow brush safety inlet boot (`入り込み口`)
        const inletBoot = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.11), yellowSafetyMat);
        inletBoot.position.set(endX - endDir * 0.02, 0.48, bz);
        // Red emergency stop push-button (`非常停止ボタン`) inside protective collar
        const stopCollar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.08), this.chromeMat);
        stopCollar.position.set(endX + endDir * 0.04, 0.68, bz);
        const stopBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.03, 10), redStopMat);
        stopBtn.rotation.z = Math.PI / 2;
        stopBtn.position.set(endX + endDir * 0.068, 0.68, bz);
        // Glowing directional entry arrow indicator on inner newel face (Green GO / Red NO ENTRY!)
        const isGo = (bz <= 0 && endDir > 0) || (bz >= 0 && endDir < 0);
        const indicator = new THREE.Mesh(
          new THREE.BoxGeometry(0.02, 0.075, 0.075),
          isGo ? greenArrowMat : redStopMat
        );
        indicator.position.set(endX + endDir * 0.07, 0.84, bz);
        g.add(newel, wrap, inletBoot, stopCollar, stopBtn, indicator);
      }
    }

    return { group: g, beltTexWest, beltTexEast };
  }

  // 22. Authentic JR East Wall-Mounted 『AED 自動体外式除細動器』 Emergency Cabinet + Protruding Corridor Flag!
  buildAEDCabinet3D(x: number, z: number, ry: number): THREE.Group {
    const g = new THREE.Group();
    g.position.set(x, 1.38, z);
    g.rotation.y = ry;

    const aedRedMat = new THREE.MeshStandardMaterial({ color: 0xc81c24, roughness: 0.34, metalness: 0.28 });
    const aedWhiteMat = new THREE.MeshStandardMaterial({ color: 0xe6e8e4, roughness: 0.38, metalness: 0.2 });
    const aedUnitOrange = new THREE.MeshStandardMaterial({ color: 0xe86414, roughness: 0.36 });
    const faceMat = this.makeBacklitMat(this.textures.aedCabinetFace, 0.46);
    const readyLedMat = new THREE.MeshBasicMaterial({ color: 0x38f084 });

    // Outer white/red steel wall box (0.44m W × 0.56m H × 0.18m D)
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.56, 0.18), aedWhiteMat);
    box.position.z = 0.09;
    const redHood = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.1, 0.2), aedRedMat);
    redHood.position.set(0, 0.24, 0.095);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.54), faceMat);
    face.position.z = 0.184;

    // Clear inspection window recess showing the actual 3D orange-and-white AED defibrillator inside!
    const recess = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.24, 0.05), this.matteBlackMat);
    recess.position.set(0, 0.04, 0.165);
    const aedDevice = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.06), aedUnitOrange);
    aedDevice.position.set(0, 0.03, 0.16);
    const aedHandle = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.025, 0.03), this.matteBlackMat);
    aedHandle.position.set(0, 0.13, 0.17);
    const statusLed = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 8), readyLedMat);
    statusLed.position.set(0.08, 0.09, 0.195);
    const windowGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.24), this.clearGlassMat);
    windowGlass.position.set(0, 0.04, 0.196);
    const doorHandle = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.11, 0.03), this.chromeMat);
    doorHandle.position.set(0.185, 0.02, 0.195);

    // Protruding double-sided red 『AED』 wayfinding blade sign above cabinet!
    const flagArm = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.04, 0.34), this.steelMat);
    flagArm.position.set(0, 0.56, 0.17);
    const flagBlade = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.24, 0.32), aedRedMat);
    flagBlade.position.set(0, 0.52, 0.28);

    g.add(box, redHood, face, recess, aedDevice, aedHandle, statusLed, windowGlass, doorHandle, flagArm, flagBlade);
    return g;
  }

  // 23. Authentic JR East Barrier-Free Stainless & Glass Station Elevator Portal (`エレベーター Elevator`)
  buildJRElevator3D(x: number, z: number, ry: number): THREE.Group {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = ry;

    const headerMat = this.makeBacklitMat(this.textures.elevatorHeader, 0.62);
    const floorLedAmber = new THREE.MeshBasicMaterial({ color: 0xf4a828 });
    const callGlowMat = new THREE.MeshBasicMaterial({ color: 0x52e098 });

    // Brushed dark-steel surround portal (2.5m W × 3.2m H)
    const surroundTop = new THREE.Mesh(new THREE.BoxGeometry(2.54, 0.72, 0.24), this.darkSteelMat);
    surroundTop.position.set(0, 2.74, 0.08);
    const headerFace = new THREE.Mesh(new THREE.PlaneGeometry(2.38, 0.58), headerMat);
    headerFace.position.set(0, 2.74, 0.205);
    for (const sx of [-1.08, 1.08]) {
      const jamb = new THREE.Mesh(new THREE.BoxGeometry(0.38, 2.4, 0.22), this.darkSteelMat);
      jamb.position.set(sx, 1.2, 0.07);
      g.add(jamb);
    }

    // Dual brushed-stainless sliding elevator doors with vertical smoked glass inspection vision panels!
    for (const dx of [-0.44, 0.44]) {
      const door = new THREE.Mesh(new THREE.BoxGeometry(0.86, 2.28, 0.08), this.steelMat);
      door.position.set(dx, 1.14, 0.03);
      const slitBack = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.32, 0.09), this.matteBlackMat);
      slitBack.position.set(dx, 1.32, 0.032);
      const slitGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 1.28), this.smokedGlassMat);
      slitGlass.position.set(dx, 1.32, 0.08);
      g.add(door, slitBack, slitGlass);
    }
    const doorSeam = new THREE.Mesh(new THREE.BoxGeometry(0.014, 2.28, 0.09), this.matteBlackMat);
    doorSeam.position.set(0, 1.14, 0.035);
    const sill = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.025, 0.24), this.chromeMat);
    sill.position.set(0, 0.012, 0.08);

    // Digital amber B1F floor indicator above doors
    const floorBox = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.14, 0.06), this.matteBlackMat);
    floorBox.position.set(0, 2.34, 0.19);
    const floorDigit = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.055, 0.015), floorLedAmber);
    floorDigit.position.set(0, 2.34, 0.222);

    // Right jamb stainless call-button panel with glowing UP/DOWN buttons & wheelchair lower button!
    const callPlate = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.34, 0.03), this.steelMat);
    callPlate.position.set(1.08, 1.12, 0.185);
    for (const by of [1.18, 1.06]) {
      const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.02, 10), callGlowMat);
      btn.rotation.x = Math.PI / 2;
      btn.position.set(1.08, by, 0.205);
      g.add(btn);
    }

    g.add(surroundTop, headerFace, doorSeam, sill, floorBox, floorDigit, callPlate);
    return g;
  }

  // 24. Populated 『みどりの窓口』 MARS Ticketing Counter Interior (3 Stations, Monitors, Partitions & Queue Stanchions!)
  buildMidoriInterior3D(centerX: number, centerZ: number): THREE.Group {
    const g = new THREE.Group();
    g.position.set(centerX, 0, centerZ);

    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x48b89a,
      emissive: new THREE.Color(0x1e8868),
      emissiveIntensity: 0.62,
      roughness: 0.36,
    });
    const jrGreenBadgeMat = new THREE.MeshStandardMaterial({
      color: 0x10763c,
      emissive: new THREE.Color(0x145830),
      emissiveIntensity: 0.56,
      roughness: 0.42,
    });
    const brochureMat = new THREE.MeshStandardMaterial({ color: 0xe2dfd4, roughness: 0.72 });

    // 3 JR East MARS Ticketing Counter Workstations (`1番 / 2番 / 3番窓口`)
    for (let i = 0; i < 3; i++) {
      const lx = -2.6 + i * 2.6;
      // Overhead counter number box
      const numBox = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.28, 0.1), jrGreenBadgeMat);
      numBox.position.set(lx, 2.22, -0.15);
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.65, 6), this.darkSteelMat);
      rod.position.set(lx, 2.68, -0.15);

      // MARS dual monitor + magnetic ticket printer + customer acrylic partition!
      const monStand = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.14), this.darkSteelMat);
      monStand.position.set(lx - 0.32, 1.12, 0.04);
      const monBox = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.3, 0.06), this.darkSteelMat);
      monBox.position.set(lx - 0.32, 1.28, 0.04);
      const monFace = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.25), screenMat);
      monFace.position.set(lx - 0.32, 1.28, 0.006);
      monFace.rotation.y = Math.PI;

      const marsPrinter = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.22, 0.42), this.steelMat);
      marsPrinter.position.set(lx + 0.32, 1.16, 0.06);
      const sneezeGlass = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.68, 0.025), this.clearGlassMat);
      sneezeGlass.position.set(lx, 1.4, -0.34);

      // Stacked timetable brochure leaflets beside each window
      const leaflets = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.16), brochureMat);
      leaflets.position.set(lx + 0.85, 1.12, -0.22);

      g.add(numBox, rod, monStand, monBox, monFace, marsPrinter, sneezeGlass, leaflets);
    }

    // Waiting queue stainless belt stanchions inside Midori-no-Madoguchi
    for (const sx of [-2.4, 0, 2.4]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.88, 8), this.chromeMat);
      post.position.set(sx, 0.44, -1.22);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.14, 0.03, 10), this.darkSteelMat);
      base.position.set(sx, 0.015, -1.22);
      g.add(post, base);
    }
    const belt = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.048, 0.014), this.velvetRedMat);
    belt.position.set(0, 0.82, -1.22);
    g.add(belt);

    return g;
  }

  // 25. Recessed Shuttered Underground Mall Shopfront (`新宿サブナード` or `京王モール` Arcade Boutiques!)
  buildUndergroundShopArcade3D(
    x: number,
    z: number,
    ry: number,
    width: number,
    isSubnade: boolean
  ): THREE.Group {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = ry;

    const shutterTex = isSubnade ? this.textures.subnadeShopShutter : this.textures.keioMallShopShutter;
    const faceMat = new THREE.MeshStandardMaterial({
      map: shutterTex,
      emissive: new THREE.Color(isSubnade ? 0xa4c89e : 0xc6b4c8),
      emissiveMap: shutterTex,
      emissiveIntensity: 0.24,
      roughness: 0.5,
      metalness: 0.44,
    });
    const trimMat = new THREE.MeshStandardMaterial({
      color: isSubnade ? 0x264430 : 0x3c223c,
      roughness: 0.42,
      metalness: 0.24,
    });

    const panel = new THREE.Mesh(new THREE.PlaneGeometry(width - 0.24, 2.68), faceMat);
    panel.position.set(0, 1.34, 0.03);
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(width + 0.08, 0.22, 0.26), trimMat);
    canopy.position.set(0, 2.78, 0.11);
    const kickBar = new THREE.Mesh(new THREE.BoxGeometry(width - 0.2, 0.08, 0.08), this.darkSteelMat);
    kickBar.position.set(0, 0.04, 0.04);
    for (const px of [-width * 0.5 + 0.06, width * 0.5 - 0.06]) {
      const pilaster = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.86, 0.2), this.steelMat);
      pilaster.position.set(px, 1.43, 0.08);
      g.add(pilaster);
    }
    g.add(panel, canopy, kickBar);
    return g;
  }

  // 26. Freestanding JR East Shinjuku Multilingual Digital Touch Guidance Kiosk Totem (`新宿駅 構内案内`)
  buildDigitalKioskStand3D(x: number, z: number, ry: number): THREE.Group {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = ry;

    const scrMat = this.makeBacklitMat(this.textures.digitalKioskScreen, 0.62);
    const jrGreenRim = new THREE.MeshBasicMaterial({ color: 0x38c86e });

    const base = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.08, 0.56), this.darkSteelMat);
    base.position.y = 0.04;
    const baseLed = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.016, 0.58), jrGreenRim);
    baseLed.position.y = 0.085;
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.68, 1.78, 0.18), this.darkSteelMat);
    chassis.position.y = 0.98;
    chassis.castShadow = true;
    const sideTrimL = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.78, 0.2), this.steelMat);
    sideTrimL.position.set(-0.34, 0.98, 0);
    const sideTrimR = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.78, 0.2), this.steelMat);
    sideTrimR.position.set(0.34, 0.98, 0);

    // Dual-sided crisp backlit touchscreen display
    const f1 = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 1.24), scrMat);
    f1.position.set(0, 1.12, 0.095);
    const f2 = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 1.24), scrMat);
    f2.position.set(0, 1.12, -0.095);
    f2.rotation.y = Math.PI;

    // Angled side brochure pocket with maps
    const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.26, 0.16), this.clearGlassMat);
    pocket.position.set(0.39, 0.94, 0);

    g.add(base, baseLed, chassis, sideTrimL, sideTrimR, f1, f2, pocket);
    return g;
  }

  // 27. 50th Anniversary Shinjuku Subnade "Urban Jungle" Oak-Wood Lounge Bench + Integrated Planter!
  buildSubnadeLoungeBench3D(x: number, z: number, ry = 0): THREE.Group {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = ry;

    const oakMat = new THREE.MeshStandardMaterial({ color: 0x866240, roughness: 0.54, metalness: 0.06 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x2c3034, roughness: 0.62, metalness: 0.18 });
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x285c34,
      roughness: 0.58,
      side: THREE.DoubleSide,
    });

    const basePlinth = new THREE.Mesh(new THREE.BoxGeometry(2.56, 0.34, 0.78), stoneMat);
    basePlinth.position.y = 0.17;
    basePlinth.castShadow = true;
    const seatDeck = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.075, 0.84), oakMat);
    seatDeck.position.set(-0.34, 0.38, 0);
    seatDeck.castShadow = true;
    const backRest = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.36, 0.08), oakMat);
    backRest.position.set(-0.34, 0.58, -0.34);
    backRest.rotation.x = -0.14;

    // Integrated Urban Jungle planter box on bench end with sculpted botanical foliage fronds!
    const planter = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.58, 0.82), stoneMat);
    planter.position.set(0.96, 0.29, 0);
    g.add(basePlinth, seatDeck, backRest, planter);

    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const frond = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.56, 4), leafMat);
      frond.position.set(0.96 + Math.cos(a) * 0.14, 0.78 + (i % 3) * 0.06, Math.sin(a) * 0.14);
      frond.rotation.set(Math.sin(a) * 0.45, a, -Math.cos(a) * 0.45);
      g.add(frond);
    }

    return g;
  }
}
