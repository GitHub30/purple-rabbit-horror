import * as THREE from 'three';
import { PLATFORM_STAIRS, PlatformStairDef } from './shinjukuMap';

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')!];
}

function toTex(
  canvas: HTMLCanvasElement,
  repX = 1,
  repY = 1,
  srgb = true
): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repX, repY);
  t.anisotropy = 8;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

function heightToNormal(
  heightCanvas: HTMLCanvasElement,
  strength = 2.0,
  repX = 1,
  repY = 1
): THREE.CanvasTexture {
  const w = heightCanvas.width;
  const h = heightCanvas.height;
  const src = heightCanvas.getContext('2d')!.getImageData(0, 0, w, h).data;
  const [nC, nCtx] = makeCanvas(w, h);
  const out = nCtx.createImageData(w, h);
  const dst = out.data;

  const sample = (x: number, y: number): number => {
    const ix = ((x % w) + w) % w;
    const iy = ((y % h) + h) % h;
    return src[(iy * w + ix) * 4] / 255;
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const hL = sample(x - 1, y);
      const hR = sample(x + 1, y);
      const hU = sample(x, y - 1);
      const hD = sample(x, y + 1);
      let nx = (hL - hR) * strength;
      let ny = (hU - hD) * strength;
      let nz = 1.0;
      const inv = 1 / Math.hypot(nx, ny, nz);
      nx *= inv;
      ny *= inv;
      nz *= inv;
      const idx = (y * w + x) * 4;
      dst[idx] = Math.round((nx * 0.5 + 0.5) * 255);
      dst[idx + 1] = Math.round((ny * 0.5 + 0.5) * 255);
      dst[idx + 2] = Math.round((nz * 0.5 + 0.5) * 255);
      dst[idx + 3] = 255;
    }
  }
  nCtx.putImageData(out, 0, 0);
  return toTex(nC, repX, repY, false);
}

export interface ShinjukuTextureSet {
  wallTile: THREE.CanvasTexture;
  wallNormal: THREE.CanvasTexture;
  wallRoughness: THREE.CanvasTexture;
  pillarMetal: THREE.CanvasTexture;
  floorTerrazzo: THREE.CanvasTexture;
  floorNormal: THREE.CanvasTexture;
  floorRoughness: THREE.CanvasTexture;
  ceilingLouver: THREE.CanvasTexture;
  ceilingNormal: THREE.CanvasTexture;
  tactileLine: THREE.CanvasTexture;
  tactileDots: THREE.CanvasTexture;
  tactileLineNormal: THREE.CanvasTexture;
  lockerMetal: THREE.CanvasTexture;
  brushedMetalNormal: THREE.CanvasTexture;
  shutterMetal: THREE.CanvasTexture;
  shutterNormal: THREE.CanvasTexture;
  newDaysShutter: THREE.CanvasTexture;
  vendingFront: THREE.CanvasTexture;
  ticketMachineFront: THREE.CanvasTexture;
  chargeMachineHeader: THREE.CanvasTexture;
  chargeMachineLowerDeck: THREE.CanvasTexture;
  turnstileFrontArrow: THREE.CanvasTexture;
  barricadePanel: THREE.CanvasTexture;
  fireAlarmBox: THREE.CanvasTexture;
  fareTableHeader: THREE.CanvasTexture;
  fareAdjustFront: THREE.CanvasTexture;
  fareAdjustSign: THREE.CanvasTexture;
  midoriHeader: THREE.CanvasTexture;
  gateHeaderWest: THREE.CanvasTexture;
  gateHeaderEast: THREE.CanvasTexture;
  gateHeaderCentralWest: THREE.CanvasTexture;
  gateHeaderCentralEast: THREE.CanvasTexture;
  gatePillarWest: THREE.CanvasTexture;
  gatePillarEast: THREE.CanvasTexture;
  platformStairHeaders: Map<string, THREE.CanvasTexture>;
  platformNumPlaques: Map<string, THREE.CanvasTexture>;
  stationMap: THREE.CanvasTexture;
  wall456Stages: THREE.CanvasTexture[];
  signageStages: THREE.CanvasTexture[];
  posterStages: THREE.CanvasTexture[];
  signEastExit: THREE.CanvasTexture;
  signWestPassage: THREE.CanvasTexture;
  signCentralEast: THREE.CanvasTexture;
  signMetroPromenade: THREE.CanvasTexture;
  signMidoriTicket: THREE.CanvasTexture;
  signYamanote: THREE.CanvasTexture;
  signChuo: THREE.CanvasTexture;
  signStationName: THREE.CanvasTexture;
  signWarning: THREE.CanvasTexture;
  signEmergencyExit: THREE.CanvasTexture;
  signPhotoBooth: THREE.CanvasTexture;
  signPayphone: THREE.CanvasTexture;
  pedestalPlaque: THREE.CanvasTexture;
  wetFloorSign: THREE.CanvasTexture;
  clockFace: THREE.CanvasTexture;
  graffitiDonotLook: THREE.CanvasTexture;
  graffitiSound: THREE.CanvasTexture;
  fireHydrant: THREE.CanvasTexture;
  floorGrate: THREE.CanvasTexture;
  floorGrateNormal: THREE.CanvasTexture;
  clawDragDecal: THREE.CanvasTexture;
  flashlightCookie: THREE.CanvasTexture;
  rabbitSuitNormal: THREE.CanvasTexture;
  rabbitSuitGrime: THREE.CanvasTexture;
  rabbitFaceGrime: THREE.CanvasTexture;
  puddleAlpha: THREE.CanvasTexture;
  rippleRing: THREE.CanvasTexture;
  lightShaftSoft: THREE.CanvasTexture;
}

export function createShinjukuTextures(): ShinjukuTextureSet {
  const wall = buildShinjukuWall();
  const floor = buildShinjukuTerrazzo();
  const ceiling = buildShinjukuCeiling();
  const shutter = buildShutter();
  const grate = buildFloorGrate();

  const platformStairHeaders = new Map<string, THREE.CanvasTexture>();
  const platformNumPlaques = new Map<string, THREE.CanvasTexture>();
  for (const p of PLATFORM_STAIRS) {
    platformStairHeaders.set(p.id, buildPlatformStairHeader(p));
    platformNumPlaques.set(p.numLeft, buildPlatformNumberPlaque(p.numLeft, p.titleLeft, p.colorLeft));
    platformNumPlaques.set(p.numRight, buildPlatformNumberPlaque(p.numRight, p.titleRight, p.colorRight));
  }

  return {
    wallTile: wall.color,
    wallNormal: wall.normal,
    wallRoughness: wall.roughness,
    pillarMetal: buildPillarMetal(),
    floorTerrazzo: floor.color,
    floorNormal: floor.normal,
    floorRoughness: floor.roughness,
    ceilingLouver: ceiling.color,
    ceilingNormal: ceiling.normal,
    tactileLine: buildTactile(false),
    tactileDots: buildTactile(true),
    tactileLineNormal: buildTactileNormal(),
    lockerMetal: buildSuicaLockers(),
    brushedMetalNormal: buildBrushedMetalNormal(),
    shutterMetal: shutter.color,
    shutterNormal: shutter.normal,
    newDaysShutter: buildNewDaysShutter(),
    vendingFront: buildAcureVending(),
    ticketMachineFront: buildTicketMachines(),
    chargeMachineHeader: buildChargeMachineHeader(),
    chargeMachineLowerDeck: buildChargeMachineLowerDeck(),
    turnstileFrontArrow: buildTurnstileFrontArrow(),
    barricadePanel: buildBarricadePanel(),
    fireAlarmBox: buildFireAlarmBox(),
    fareTableHeader: buildFareTableHeader(),
    fareAdjustFront: buildFareAdjustmentMachines(),
    fareAdjustSign: buildFareAdjustSign(),
    midoriHeader: buildMidoriNoMadoguchiHeader(),
    gateHeaderWest: buildGatePortalHeader('西改札', 'West Gate', '西检票口  서쪽 개찰구'),
    gateHeaderEast: buildGatePortalHeader('東改札', 'East Gate', '東检票口  동쪽 개찰구'),
    gateHeaderCentralWest: buildGatePortalHeader('中央西改札', 'Central West Gate', '小田急線・京王線のりかえ'),
    gateHeaderCentralEast: buildGatePortalHeader('中央東改札', 'Central East Gate', 'ルミネエスト・東口方面'),
    gatePillarWest: buildGatePillarPlaque('西改札', 'West Gate', '西检票口  서쪽 개찰구'),
    gatePillarEast: buildGatePillarPlaque('東改札', 'East Gate', '東检票口  동쪽 개찰구'),
    platformStairHeaders,
    platformNumPlaques,
    stationMap: buildShinjukuGuideBoard(),
    wall456Stages: [0, 1, 2, 3, 4].map((s) => buildShinjukuWall456(s)),
    signageStages: [0, 1, 2, 3, 4].map((s) => buildDigitalSignage(s)),
    posterStages: [0, 1, 2].map((s) => buildPoster(s)),
    signEastExit: buildJRSign(
      '東口・アルプス広場・歌舞伎町 →',
      'East Exit · Alps Sq. / Kabukicho / Alta / Marunouchi Line',
      '#f4f5f0',
      '#14181c',
      ['#0e6b38', '#80c342', '#e62e36']
    ),
    signWestPassage: buildJRSign(
      '← 西口地下広場・都庁・小田急・京王',
      'West Concourse · for Met. Gov. Office / Odakyu / Keio Lines',
      '#f4f5f0',
      '#14181c',
      ['#0e6b38', '#008ed6', '#dd0077']
    ),
    signCentralEast: buildJRSign(
      '← 東改札 / 中央東改札・ルミネエスト →',
      'East Gate · Central East Gate / LUMINE EST / NewDays',
      '#f4f5f0',
      '#14181c',
      ['#80c342', '#f15a22', '#ffd400']
    ),
    signMetroPromenade: buildJRSign(
      '← 中央西改札 / 7〜16番線 / 中央東改札 →',
      'Central Passage · Tracks 7-16 / Odakyu & Keio Transfer',
      '#131b24',
      '#f0f4f2',
      ['#80c342', '#f15a22', '#ffd400']
    ),
    signMidoriTicket: buildWhiteOverheadSign('← きっぷうりば・みどりの窓口', 'Tickets / JR Ticket Office [i]'),
    signYamanote: buildPlatformSign('14・15', '山手線', '渋谷・品川 / 池袋・上野方面 [JY17]', '#80c342'),
    signChuo: buildPlatformSign('7・8', '中央線（快速）', '東京 / 高尾・立川方面 [JC05]', '#f15a22'),
    signStationName: buildShinjukuNameplate(),
    signWarning: buildLastTrainWarning(),
    signEmergencyExit: buildEmergencyExit(),
    signPhotoBooth: buildPhotoBoothHeader(),
    signPayphone: buildPayphoneSign(),
    pedestalPlaque: buildPedestalPlaque(),
    wetFloorSign: buildWetFloorSign(),
    clockFace: buildStationClock(),
    graffitiDonotLook: buildGraffiti('目を合わせるな', '新宿ウォールが赤くなったら走れ'),
    graffitiSound: buildGraffiti('音に反応する', '隠れたら [Space] で息を止めろ'),
    fireHydrant: buildFireHydrant(),
    floorGrate: grate.color,
    floorGrateNormal: grate.normal,
    clawDragDecal: buildClawDrag(),
    flashlightCookie: buildFlashlightCookie(),
    rabbitSuitNormal: buildPlushNormal(),
    rabbitSuitGrime: buildRabbitGrime(false),
    rabbitFaceGrime: buildRabbitGrime(true),
    puddleAlpha: buildPuddleAlpha(),
    rippleRing: buildRippleRing(),
    lightShaftSoft: buildSoftLightShaft(),
  };
}

// Authentic JR Shinjuku East-West Free Passage off-white/light-grey architectural fireproof wall cladding
function buildShinjukuWall() {
  const [c, ctx] = makeCanvas(1024, 1024);
  const [nC, nCtx] = makeCanvas(512, 512);
  const [rC, rCtx] = makeCanvas(512, 512);
  const rnd = mulberry32(2026);

  ctx.fillStyle = '#c5c3bc';
  ctx.fillRect(0, 0, 1024, 1024);
  nCtx.fillStyle = '#c8c8c8';
  nCtx.fillRect(0, 0, 512, 512);
  rCtx.fillStyle = '#a8a8a8';
  rCtx.fillRect(0, 0, 512, 512);

  // Clean large-format architectural calcium-silicate / enameled steel panels (matching shunkosha_jad.jpg)
  const pw = 256;
  const ph = 256;
  for (let y = 0; y < 1024; y += ph) {
    for (let x = 0; x < 1024; x += pw) {
      const shift = Math.floor((rnd() - 0.5) * 8);
      const r = 196 + shift;
      const g = 194 + shift;
      const b = 188 + shift;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x + 3, y + 3, pw - 6, ph - 6);

      const hVal = 205 + (rnd() - 0.5) * 10;
      nCtx.fillStyle = `rgb(${hVal | 0},${hVal | 0},${hVal | 0})`;
      nCtx.fillRect(x / 2 + 1.5, y / 2 + 1.5, pw / 2 - 3, ph / 2 - 3);

      const rVal = 135 + (rnd() - 0.5) * 20;
      rCtx.fillStyle = `rgb(${rVal | 0},${rVal | 0},${rVal | 0})`;
      rCtx.fillRect(x / 2 + 1.5, y / 2 + 1.5, pw / 2 - 3, ph / 2 - 3);
    }
  }

  // Crisp architectural panel reveal joints
  ctx.strokeStyle = 'rgba(72,74,72,0.75)';
  ctx.lineWidth = 3;
  nCtx.strokeStyle = '#707070';
  nCtx.lineWidth = 1.8;
  for (let y = 0; y <= 1024; y += ph) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
    nCtx.beginPath(); nCtx.moveTo(0, y / 2); nCtx.lineTo(512, y / 2); nCtx.stroke();
  }
  for (let x = 0; x <= 1024; x += pw) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke();
    nCtx.beginPath(); nCtx.moveTo(x / 2, 0); nCtx.lineTo(x / 2, 512); nCtx.stroke();
  }

  // Brushed stainless-steel baseboard kickplate (巾木) along bottom of walls (matching shinjuku_tr_709B41DD.jpeg)
  const kickG = ctx.createLinearGradient(0, 956, 0, 1024);
  kickG.addColorStop(0, '#787e84');
  kickG.addColorStop(0.35, '#aeb4ba');
  kickG.addColorStop(1, '#54585e');
  ctx.fillStyle = kickG;
  ctx.fillRect(0, 956, 1024, 68);
  rCtx.fillStyle = '#484848';
  rCtx.fillRect(0, 478, 512, 34);

  // Subtle top soffit shadow gradient
  const topAO = ctx.createLinearGradient(0, 0, 0, 140);
  topAO.addColorStop(0, 'rgba(28,32,36,0.34)');
  topAO.addColorStop(1, 'rgba(28,32,36,0)');
  ctx.fillStyle = topAO;
  ctx.fillRect(0, 0, 1024, 140);

  return {
    color: toTex(c, 1, 1, true),
    normal: heightToNormal(nC, 1.4, 1, 1),
    roughness: toTex(rC, 1, 1, false),
  };
}

// Satin silver-white anodized aluminum casing for J・ADビジョン columns (matching shibata_pillar.jpg & shunkosha_jad.jpg)
function buildPillarMetal(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 1024);
  ctx.fillStyle = '#d4d6db';
  ctx.fillRect(0, 0, 512, 1024);

  for (let y = 0; y < 940; y += 235) {
    const g = ctx.createLinearGradient(0, y, 512, y);
    g.addColorStop(0, '#c6c9cf');
    g.addColorStop(0.5, '#e2e5ea');
    g.addColorStop(1, '#c4c7cd');
    ctx.fillStyle = g;
    ctx.fillRect(3, y + 3, 506, 229);
    ctx.strokeStyle = 'rgba(72,76,82,0.72)';
    ctx.lineWidth = 3;
    ctx.strokeRect(2, y + 2, 508, 231);
  }
  // Stainless steel kickplate at base (matching shibata_pillar.jpg)
  const kg = ctx.createLinearGradient(0, 940, 512, 940);
  kg.addColorStop(0, '#6a7076');
  kg.addColorStop(0.5, '#a4abb2');
  kg.addColorStop(1, '#646a70');
  ctx.fillStyle = kg;
  ctx.fillRect(0, 940, 512, 84);
  ctx.strokeStyle = '#2a2e33';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(0, 940); ctx.lineTo(512, 940); ctx.stroke();
  return toTex(c, 1, 1, true);
}

// Authentic 600mm two-tone warm grey/beige honed granite patchwork floor of Shinjuku East-West Free Passage!
// Compare directly with jeki_wall456.jpg, shunkosha_jad.jpg, bizpa_jad.jpg, shibata_pillar.jpg, shinjuku_tr_709B41DD.jpeg
function buildShinjukuTerrazzo() {
  const [c, ctx] = makeCanvas(1024, 1024);
  const [nC, nCtx] = makeCanvas(512, 512);
  const [rC, rCtx] = makeCanvas(512, 512);
  const rnd = mulberry32(3088);

  ctx.fillStyle = '#969289';
  ctx.fillRect(0, 0, 1024, 1024);
  nCtx.fillStyle = '#d4d4d4';
  nCtx.fillRect(0, 0, 512, 512);
  rCtx.fillStyle = '#7c7c7c';
  rCtx.fillRect(0, 0, 512, 512);

  // 4x4 grid of 600mm square granite tiles in the signature Shinjuku two-tone patchwork (light warm grey & medium taupe-grey)
  const step = 256;
  const patchwork = [
    [0, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 1, 1, 0],
  ];
  for (let gy = 0; gy < 4; gy++) {
    for (let gx = 0; gx < 4; gx++) {
      const x = gx * step;
      const y = gy * step;
      const isDarkTile = patchwork[gy][gx] === 1;
      const jitter = Math.floor((rnd() - 0.5) * 8);
      const baseR = (isDarkTile ? 132 : 168) + jitter;
      const baseG = (isDarkTile ? 127 : 163) + jitter;
      const baseB = (isDarkTile ? 118 : 153) + jitter;
      ctx.fillStyle = `rgb(${baseR},${baseG},${baseB})`;
      ctx.fillRect(x + 2, y + 2, step - 4, step - 4);

      const hv = 212 + (rnd() - 0.5) * 10;
      nCtx.fillStyle = `rgb(${hv | 0},${hv | 0},${hv | 0})`;
      nCtx.fillRect(x / 2 + 1, y / 2 + 1, step / 2 - 2, step / 2 - 2);

      // Honed natural granite roughness ~0.46-0.62 (authentic Tokyo commuter satin sheen without harsh glare!)
      const rv = (isDarkTile ? 122 : 136) + (rnd() - 0.5) * 20;
      rCtx.fillStyle = `rgb(${rv | 0},${rv | 0},${rv | 0})`;
      rCtx.fillRect(x / 2 + 1, y / 2 + 1, step / 2 - 2, step / 2 - 2);
    }
  }

  // Fine natural granite quartz/feldspar/biotite crystal speckle + subtle commuter foot scuffing
  for (let i = 0; i < 20000; i++) {
    const fx = rnd() * 1024;
    const fy = rnd() * 1024;
    const p = rnd();
    const col = p > 0.7 ? 190 : p > 0.34 ? 136 : 64;
    const sz = p > 0.88 ? 2.5 : 1.5;
    ctx.fillStyle = `rgba(${col},${col - 2},${col - 5},${0.16 + rnd() * 0.24})`;
    ctx.fillRect(fx, fy, sz, sz);
  }

  // Subtle midnight dampness & foot-traffic patina near joints
  for (let i = 0; i < 18; i++) {
    const px = rnd() * 1024;
    const py = rnd() * 1024;
    const rad = 45 + rnd() * 110;
    const dg = ctx.createRadialGradient(px, py, 8, px, py, rad);
    dg.addColorStop(0, 'rgba(32, 34, 36, 0.14)');
    dg.addColorStop(1, 'rgba(32, 34, 36, 0)');
    ctx.fillStyle = dg;
    ctx.fillRect(px - rad, py - rad, rad * 2, rad * 2);
  }

  // Subtle satin moisture/wax sheen variations (toned down so lights don't blow out into mirrors)
  for (let i = 0; i < 14; i++) {
    const px = rnd() * 512;
    const py = rnd() * 512;
    const rad = 36 + rnd() * 82;
    const g = rCtx.createRadialGradient(px, py, 6, px, py, rad);
    g.addColorStop(0, 'rgba(62,62,62,0.72)');
    g.addColorStop(0.55, 'rgba(92,92,92,0.52)');
    g.addColorStop(1, 'rgba(130,130,130,0)');
    rCtx.fillStyle = g;
    rCtx.fillRect(px - rad, py - rad, rad * 2, rad * 2);
  }

  // Crisp thin mortar seams (soft bevel normal to avoid grazing aliasing)
  ctx.strokeStyle = 'rgba(48,46,42,0.86)';
  ctx.lineWidth = 3;
  nCtx.strokeStyle = '#a4a4a4';
  nCtx.lineWidth = 1.4;
  rCtx.strokeStyle = '#e0e0e0';
  rCtx.lineWidth = 2.0;
  for (let i = 0; i <= 1024; i += step) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1024, i); ctx.stroke();
    nCtx.beginPath(); nCtx.moveTo(i / 2, 0); nCtx.lineTo(i / 2, 512); nCtx.stroke();
    nCtx.beginPath(); nCtx.moveTo(0, i / 2); nCtx.lineTo(512, i / 2); nCtx.stroke();
    rCtx.beginPath(); rCtx.moveTo(i / 2, 0); rCtx.lineTo(i / 2, 512); rCtx.stroke();
    rCtx.beginPath(); rCtx.moveTo(0, i / 2); rCtx.lineTo(512, i / 2); rCtx.stroke();
  }

  return {
    color: toTex(c, 21, 15, true),
    normal: heightToNormal(nC, 0.76, 21, 15),
    roughness: toTex(rC, 21, 15, false),
  };
}

// Authentic Shinjuku East-West Free Passage Off-White Linear Strip Spandrel Ceiling (白いスパンドレル／ルーバー天井)
// Compare directly with jeki_wall456.jpg, shunkosha_jad.jpg, bizpa_jad.jpg, shinjuku_tr_709B41DD.jpeg, shinjuku_tr_BBEABFFC.png
function buildShinjukuCeiling() {
  const [c, ctx] = makeCanvas(512, 512);
  const [nC, nCtx] = makeCanvas(256, 256);
  const rnd = mulberry32(5151);

  ctx.fillStyle = '#c8c6be';
  ctx.fillRect(0, 0, 512, 512);
  nCtx.fillStyle = '#c0c0c0';
  nCtx.fillRect(0, 0, 256, 256);

  // White matte linear spandrel panels running East-West (every 32px)
  for (let y = 0; y < 512; y += 32) {
    const d = Math.floor((rnd() - 0.5) * 6);
    ctx.fillStyle = `rgb(${202 + d},${200 + d},${194 + d})`;
    ctx.fillRect(0, y + 3, 512, 27);
    // Fine dark recessed reveal seam between strips
    ctx.fillStyle = '#6c6a64';
    ctx.fillRect(0, y, 512, 3);

    nCtx.fillStyle = '#e4e4e4';
    nCtx.fillRect(0, y / 2 + 2, 256, 13);
    nCtx.fillStyle = '#525252';
    nCtx.fillRect(0, y / 2, 256, 2);
  }

  // Transverse expansion joint track & maintenance ceiling hatch outline (matching shinjuku_tr_BBEABFFC.png)
  ctx.fillStyle = '#484a4d';
  ctx.fillRect(0, 0, 10, 512);
  ctx.fillStyle = '#8c8a84';
  ctx.fillRect(10, 0, 6, 512);
  ctx.strokeStyle = 'rgba(110,110,106,0.75)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(160, 128, 192, 192);

  return {
    color: toTex(c, 21, 15, true),
    normal: heightToNormal(nC, 1.35, 21, 15),
  };
}

// Chrome-Yellow Tactile Paving (点字ブロック) with dark stone border (matching shunkosha_jad.jpg & shibata_pillar.jpg)
function buildTactile(dots: boolean): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(128, 128);
  ctx.fillStyle = '#e0b212';
  ctx.fillRect(0, 0, 128, 128);
  if (dots) {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const cx = 14 + x * 25;
        const cy = 14 + y * 25;
        ctx.fillStyle = '#9c7808';
        ctx.beginPath(); ctx.arc(cx + 1.5, cy + 1.5, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#f5ca28';
        ctx.beginPath(); ctx.arc(cx, cy, 6.2, 0, Math.PI * 2); ctx.fill();
      }
    }
  } else {
    for (let i = 0; i < 4; i++) {
      const sx = 14 + i * 31;
      ctx.fillStyle = '#9c7808';
      ctx.fillRect(sx + 2, 6, 11, 116);
      ctx.fillStyle = '#f5ca28';
      ctx.fillRect(sx, 6, 10, 116);
    }
  }
  ctx.strokeStyle = 'rgba(54,42,10,0.62)';
  ctx.lineWidth = 3;
  ctx.strokeRect(1.5, 1.5, 125, 125);
  return toTex(c, 1, 1, true);
}

function buildTactileNormal(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(128, 128);
  ctx.fillStyle = '#606060';
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = '#ececec';
  for (let i = 0; i < 4; i++) ctx.fillRect(14 + i * 31, 6, 10, 116);
  return heightToNormal(c, 2.2, 1, 1);
}

// 45.6m Ultra-Wide LED Video Wall 『新宿ウォール456』(Shinjuku Wall 456) — 5 Progressive Horror Stages!
// Rich velvety twilight colors calibrated so LED artwork & "WELCOME TO SHINJUKU" stay crystal-clear without bloom glare!
function buildShinjukuWall456(stage: number): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(2048, 256);

  if (stage === 0 || stage === 1) {
    const bg = ctx.createLinearGradient(0, 0, 2048, 256);
    if (stage === 0) {
      bg.addColorStop(0.0, '#0d4e74');
      bg.addColorStop(0.24, '#1c428c');
      bg.addColorStop(0.5, '#4c2c82');
      bg.addColorStop(0.76, '#842e72');
      bg.addColorStop(1.0, '#105078');
    } else {
      bg.addColorStop(0.0, '#0b2f4e');
      bg.addColorStop(0.3, '#2d1858');
      bg.addColorStop(0.6, '#4d144a');
      bg.addColorStop(1.0, '#0d2a46');
    }
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 2048, 256);

    // Flowing translucent Moment Factory silk ribbons across the 45.6m canvas
    for (let w = 0; w < 7; w++) {
      ctx.beginPath();
      const yBase = 52 + w * 25;
      ctx.moveTo(0, yBase);
      for (let x = 0; x <= 2048; x += 64) {
        const y =
          yBase +
          Math.sin(x * 0.0045 + w * 1.1) * 44 +
          Math.cos(x * 0.009 - w * 0.7) * 22;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(2048, 256);
      ctx.lineTo(0, 256);
      ctx.closePath();
      ctx.fillStyle =
        w % 2 === 0
          ? stage === 0
            ? 'rgba(72, 188, 232, 0.17)'
            : 'rgba(92, 54, 152, 0.20)'
          : stage === 0
            ? 'rgba(208, 96, 184, 0.17)'
            : 'rgba(128, 24, 96, 0.24)';
      ctx.fill();
    }

    // Center "WELCOME TO SHINJUKU / ようこそ 新宿" crisp typography with subtle drop shadow
    ctx.shadowColor = 'rgba(6, 10, 22, 0.72)';
    ctx.shadowBlur = 10;
    ctx.fillStyle = 'rgba(232, 242, 248, 0.92)';
    ctx.textAlign = 'center';
    ctx.font = '600 26px sans-serif';
    ctx.fillText('WELCOME TO', 720, 102);
    ctx.font = '700 62px sans-serif';
    ctx.fillText('SHINJUKU', 720, 164);

    ctx.font = '600 26px sans-serif';
    ctx.fillText('ようこそ', 1320, 102);
    ctx.font = '700 60px sans-serif';
    ctx.fillText('新 宿', 1320, 164);
    ctx.shadowBlur = 0;

    // JR East / Shinjuku Ward info & mascot exhibition frames on left & right ends
    ctx.fillStyle = 'rgba(16, 26, 38, 0.78)';
    ctx.fillRect(48, 26, 340, 204);
    ctx.strokeStyle = '#80c342';
    ctx.lineWidth = 4;
    ctx.strokeRect(48, 26, 340, 204);
    ctx.fillStyle = '#a8ef72';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('JR新宿駅 東西自由通路', 218, 66);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(stage === 0 ? '新マスコット「紫のうさぎ」' : '展示ケース破損・警戒中', 218, 114);
    ctx.fillStyle = '#c8d8e4';
    ctx.font = '600 18px sans-serif';
    ctx.fillText(stage === 0 ? 'アルプス広場にて特別展示中' : '00:47 終電運行終了・東口閉鎖', 218, 162);

    // Mascot graphic on right end (or eerie multiple silhouettes in Stage 1)
    const drawMiniRabbit = (rx: number, ry: number, redEyes: boolean) => {
      ctx.fillStyle = '#6c42a4';
      ctx.beginPath();
      ctx.ellipse(rx - 26, ry - 60, 12, 34, -0.35, 0, Math.PI * 2);
      ctx.ellipse(rx + 26, ry - 60, 12, 34, 0.35, 0, Math.PI * 2);
      ctx.arc(rx, ry - 12, 34, 0, Math.PI * 2);
      ctx.ellipse(rx, ry + 48, 42, 48, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#efeae0';
      ctx.beginPath();
      ctx.ellipse(rx, ry - 14, 24, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = redEyes ? '#ff242c' : '#101216';
      ctx.beginPath();
      ctx.arc(rx - 10, ry - 16, 4.5, 0, Math.PI * 2);
      ctx.arc(rx + 10, ry - 16, 4.5, 0, Math.PI * 2);
      ctx.fill();
    };
    drawMiniRabbit(1820, 142, stage >= 1);
    if (stage === 1) {
      drawMiniRabbit(1024, 148, true);
      drawMiniRabbit(510, 152, true);
    }
  } else if (stage === 2) {
    // 15-Panel Synchronized Split Jack (15面分割表示 as seen in panasonic_pdf.pdf & jeki_slides.pdf Page 4!)
    const panelW = 2048 / 15;
    for (let i = 0; i < 15; i++) {
      const x0 = i * panelW;
      ctx.fillStyle = i % 2 === 0 ? '#1c1228' : '#261736';
      ctx.fillRect(x0 + 2, 0, panelW - 4, 256);
      ctx.fillStyle = '#4e1658';
      ctx.fillRect(x0 + 2, 0, panelW - 4, 34);
      ctx.fillStyle = '#f2e8f8';
      ctx.textAlign = 'center';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('見てるよ', x0 + panelW * 0.5, 23);

      const cx = x0 + panelW * 0.5;
      const cy = 136;
      ctx.fillStyle = '#5c308e';
      ctx.beginPath();
      ctx.ellipse(cx - 24, cy - 52, 11, 32, -0.38, 0, Math.PI * 2);
      ctx.ellipse(cx + 24, cy - 52, 11, 32, 0.38, 0, Math.PI * 2);
      ctx.arc(cx, cy - 6, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#dcd4c8';
      ctx.beginPath();
      ctx.ellipse(cx, cy - 8, 25, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#07060a';
      ctx.beginPath();
      ctx.arc(cx - 10, cy - 11, 5.5, 0, Math.PI * 2);
      ctx.arc(cx + 10, cy - 11, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff262c';
      ctx.beginPath();
      ctx.arc(cx - 10, cy - 11, 2.2, 0, Math.PI * 2);
      ctx.arc(cx + 10, cy - 11, 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#e43a44';
      ctx.font = 'bold 18px serif';
      ctx.fillText(i % 3 === 0 ? 'まだ帰れない' : i % 3 === 1 ? '東口閉鎖中' : 'うしろに注意', cx, 232);
    }
  } else if (stage === 3) {
    // Stage 3: Emergency Surveillance Override across the 45.6m wall
    ctx.fillStyle = '#0c0e13';
    ctx.fillRect(0, 0, 2048, 256);
    ctx.strokeStyle = '#d82c34';
    ctx.lineWidth = 6;
    ctx.strokeRect(8, 8, 2032, 240);
    ctx.fillStyle = '#f03840';
    ctx.textAlign = 'center';
    ctx.font = '900 72px serif';
    ctx.fillText('う し ろ に い る        振 り 向 く な        息 を 止 め ろ', 1024, 150);
    ctx.fillStyle = '#a4b2be';
    ctx.font = '700 22px monospace';
    ctx.fillText('SHINJUKU WALL 456 // EMERGENCY ALERT — UNIDENTIFIED ENTITY IN CONCOURSE B1F', 1024, 218);
  } else {
    // Stage 4: Full Blood-Crimson Takeover across the entire 45.6m wall!
    const bg = ctx.createLinearGradient(0, 0, 0, 256);
    bg.addColorStop(0, '#3a0508');
    bg.addColorStop(0.5, '#1a0305');
    bg.addColorStop(1, '#42060a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 2048, 256);

    for (let x = 220; x <= 1828; x += 402) {
      ctx.fillStyle = '#3c1452';
      ctx.beginPath(); ctx.ellipse(x, 128, 145, 118, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#d6cfc4';
      ctx.beginPath(); ctx.ellipse(x, 120, 108, 76, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#050407';
      ctx.beginPath();
      ctx.arc(x - 42, 104, 22, 0, Math.PI * 2);
      ctx.arc(x + 42, 104, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff1e26';
      ctx.beginPath();
      ctx.arc(x - 42, 104, 6.5, 0, Math.PI * 2);
      ctx.arc(x + 42, 104, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#050407';
      ctx.beginPath();
      ctx.ellipse(x, 150, 64, 42, 0, 0, Math.PI);
      ctx.fill();
    }
    ctx.fillStyle = '#ff2e36';
    ctx.textAlign = 'center';
    ctx.font = '900 54px serif';
    ctx.fillText('逃 が さ な い', 420, 236);
    ctx.fillText('み つ け た', 1024, 236);
    ctx.fillText('逃 が さ な い', 1628, 236);
  }

  // Fine COB LED 1.58mm pitch scanline texture
  ctx.fillStyle = 'rgba(0,0,0,0.14)';
  for (let y = 0; y < 256; y += 4) {
    ctx.fillRect(0, y, 2048, 1);
  }
  return toTex(c, 1, 1, true);
}

// Authentic 『みどりの窓口 Ticket Office』 white backlit header signband (matching shinjuku_tr_709B41DD.jpeg!)
function buildMidoriNoMadoguchiHeader(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(2048, 128);
  ctx.fillStyle = '#f6f8f5';
  ctx.fillRect(0, 0, 2048, 128);
  ctx.strokeStyle = '#26282a';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 2042, 122);

  // Subtle vertical backlit panel join lines on left & right wings (matching shinjuku_tr_709B41DD.jpeg!)
  ctx.strokeStyle = '#dcdfd9';
  ctx.lineWidth = 2;
  for (const px of [420, 840, 1260, 1680]) {
    ctx.beginPath();
    ctx.moveTo(px, 6);
    ctx.lineTo(px, 122);
    ctx.stroke();
  }

  // Green Midori-no-Madoguchi ticket counter pictogram badge centered above the automatic doors
  const ox = 560;
  ctx.fillStyle = '#0d7a3e';
  ctx.fillRect(ox, 20, 88, 88);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(ox + 44, 45, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(ox + 22, 62, 44, 22);
  ctx.fillStyle = '#0d7a3e';
  ctx.fillRect(ox + 14, 82, 60, 7);

  // Green "みどりの窓口" + Bold Black "Ticket Office" (exact typography & spacing from shinjuku_tr_709B41DD.jpeg!)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#0d7a3e';
  ctx.font = '800 58px sans-serif';
  ctx.fillText('みどりの窓口', ox + 114, 86);

  ctx.fillStyle = '#14171a';
  ctx.font = '700 56px sans-serif';
  ctx.fillText('Ticket Office', ox + 492, 86);

  return toTex(c, 1, 1, true);
}

// Authentic JR Shinjuku Gate Portal Green Fascia Sign (matching shinjuku_tr_D9CE0257.jpeg & full_jr1.jpg!)
// "JR 新宿駅 Shinjuku Station   西改札 West Gate   [JY][JC][JB][JA][JS]"
function buildGatePortalHeader(
  gateJP: string,
  gateEN: string,
  subMulti: string
): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(2048, 128);
  ctx.fillStyle = '#146837';
  ctx.fillRect(0, 0, 2048, 128);
  ctx.fillStyle = '#0d4a26';
  ctx.fillRect(0, 118, 2048, 10);

  // White JR Logo + 新宿駅 Shinjuku Station
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.font = 'italic 900 52px sans-serif';
  ctx.fillText('JR', 180, 76);
  ctx.font = '700 38px sans-serif';
  ctx.fillText('新宿駅', 274, 58);
  ctx.font = '600 20px sans-serif';
  ctx.fillText('Shinjuku Station', 274, 90);

  // Gate Name (西改札 / 東改札 / 中央西改札 / 中央東改札)
  ctx.font = '800 54px sans-serif';
  ctx.fillText(gateJP, 620, 64);
  ctx.font = '600 22px sans-serif';
  ctx.fillText(`${gateEN}    ${subMulti}`, 624, 98);

  // 5 Authentic JR East Shinjuku Line-Code Square Badges: [JY] [JC] [JB] [JA] [JS] (matching shinjuku_tr_D9CE0257.jpeg!)
  const badges: Array<[string, string]> = [
    ['JY', '#7ac142'],
    ['JC', '#f15a22'],
    ['JB', '#f2c700'],
    ['JA', '#009e60'],
    ['JS', '#e21f26'],
  ];
  badges.forEach(([code, col], idx) => {
    const bx = 1360 + idx * 78;
    const by = 32;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bx, by, 56, 56);
    ctx.strokeStyle = col;
    ctx.lineWidth = 7;
    ctx.strokeRect(bx + 4, by + 4, 48, 48);
    ctx.fillStyle = '#14181c';
    ctx.textAlign = 'center';
    ctx.font = '900 24px sans-serif';
    ctx.fillText(code, bx + 28, by + 37);
  });

  return toTex(c, 1, 1, true);
}

// Square Green Gate Plaque mounted on the glossy white central pillar at 西改札 & 東改札 (matching shinjuku_tr_D9CE0257.jpeg!)
function buildGatePillarPlaque(
  gateJP: string,
  gateEN: string,
  subMulti: string
): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 512);
  ctx.fillStyle = '#146837';
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = '#e6ece8';
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, 496, 496);

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.font = 'italic 900 54px sans-serif';
  ctx.fillText('JR', 44, 92);
  ctx.font = '700 42px sans-serif';
  ctx.fillText('新宿駅', 136, 76);
  ctx.font = '600 22px sans-serif';
  ctx.fillText('Shinjuku Station', 136, 108);

  const badges: Array<[string, string]> = [
    ['JY', '#7ac142'],
    ['JC', '#f15a22'],
    ['JB', '#f2c700'],
    ['JA', '#009e60'],
    ['JS', '#e21f26'],
  ];
  badges.forEach(([code, col], idx) => {
    const bx = 46 + idx * 62;
    const by = 136;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bx, by, 52, 52);
    ctx.strokeStyle = col;
    ctx.lineWidth = 7;
    ctx.strokeRect(bx + 4, by + 4, 44, 44);
    ctx.fillStyle = '#14181c';
    ctx.textAlign = 'center';
    ctx.font = '900 22px sans-serif';
    ctx.fillText(code, bx + 26, by + 34);
  });

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = '800 92px sans-serif';
  ctx.fillText(gateJP, 256, 316);
  ctx.font = '700 44px sans-serif';
  ctx.fillText(gateEN, 256, 388);
  ctx.font = '600 26px sans-serif';
  ctx.fillText(subMulti, 256, 446);

  return toTex(c, 1, 1, true);
}

// Split Line-Color Backlit Staircase Header Sign above Platforms 7-16 Stairs (matching shinjuku_tr_CB5E0175.jpeg & FD427215.jpeg!)
function buildPlatformStairHeader(def: PlatformStairDef): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(1024, 192);
  // Left half
  ctx.fillStyle = def.colorLeft;
  ctx.fillRect(0, 0, 512, 192);
  // Right half
  ctx.fillStyle = def.colorRight;
  ctx.fillRect(512, 0, 512, 192);

  // Center white arrow box "↑"
  ctx.fillStyle = '#f6f8f6';
  ctx.fillRect(468, 12, 88, 168);
  ctx.fillStyle = '#14181c';
  ctx.textAlign = 'center';
  ctx.font = '900 72px sans-serif';
  ctx.fillText('↑', 512, 120);

  const isLightLeft = def.colorLeft === '#e8be00';
  const fgL = isLightLeft ? '#14181c' : '#ffffff';
  ctx.fillStyle = fgL;
  ctx.textAlign = 'left';
  ctx.font = '900 84px sans-serif';
  ctx.fillText(def.numLeft, 24, 114);
  ctx.font = '800 32px sans-serif';
  ctx.fillText(def.titleLeft, 138, 76);
  ctx.font = '600 21px sans-serif';
  ctx.fillText(def.subLeft, 138, 122);

  const isLightRight = def.colorRight === '#e8be00';
  const fgR = isLightRight ? '#14181c' : '#ffffff';
  ctx.fillStyle = fgR;
  ctx.textAlign = 'right';
  ctx.font = '900 84px sans-serif';
  ctx.fillText(def.numRight, 1000, 114);
  ctx.textAlign = 'left';
  ctx.font = '800 32px sans-serif';
  ctx.fillText(def.titleRight, 576, 76);
  ctx.font = '600 21px sans-serif';
  ctx.fillText(def.subRight, 576, 122);

  // Bottom notice strip (matching "こちらの階段は混雑します..." in shinjuku_tr_FD427215.jpeg)
  ctx.fillStyle = '#f4f4f0';
  ctx.fillRect(0, 152, 1024, 40);
  ctx.fillStyle = '#c42428';
  ctx.textAlign = 'center';
  ctx.font = '700 22px sans-serif';
  ctx.fillText('↑ 1F ホーム階段  //  00:47 終電運行終了・ホーム立入禁止', 512, 180);

  return toTex(c, 1, 1, true);
}

// Giant Bold White Helvetica Platform Number Pillar Plaque ("16", "15", "14", "13" on matte charcoal-black pillar)
// Compare directly with shinjuku_tr_CB5E0175.jpeg, shinjuku_tr_FD427215.jpeg, shinjuku_tr_22AF0325.jpeg!
function buildPlatformNumberPlaque(
  numStr: string,
  lineTitle: string,
  accentColor: string
): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 512);
  ctx.fillStyle = '#1c2024';
  ctx.fillRect(0, 0, 256, 512);

  // Top line-color accent bar
  ctx.fillStyle = accentColor;
  ctx.fillRect(0, 0, 256, 20);

  // Giant bold white platform number
  ctx.fillStyle = '#f4f6f8';
  ctx.textAlign = 'center';
  ctx.font = '900 162px sans-serif';
  ctx.fillText(numStr, 128, 186);

  ctx.fillStyle = '#cfd6dc';
  ctx.font = '700 20px sans-serif';
  ctx.fillText(`${numStr}番線のりば`, 128, 228);

  // Framed notice poster below the big numeral (just like shinjuku_tr_CB5E0175.jpeg & FD427215.jpeg!)
  ctx.fillStyle = '#e8e6df';
  ctx.fillRect(28, 260, 200, 224);
  ctx.strokeStyle = '#687078';
  ctx.lineWidth = 6;
  ctx.strokeRect(28, 260, 200, 224);

  ctx.fillStyle = '#b82226';
  ctx.fillRect(34, 266, 188, 38);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('終電終了のお知らせ', 128, 291);

  ctx.fillStyle = '#1c2024';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText(lineTitle, 128, 332);
  ctx.font = '600 14px sans-serif';
  ctx.fillText('本日の運転はすべて', 128, 366);
  ctx.fillText('終了いたしました。', 128, 390);
  ctx.fillStyle = '#b82226';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('東口非常出口へ', 128, 430);
  ctx.fillStyle = '#22262a';
  ctx.font = 'bold 14px monospace';
  ctx.fillText('JR東日本 新宿駅', 128, 464);

  return toTex(c, 1, 1, true);
}

// White Suspended Sign Style ("← きっぷうりば / インフォメーション [i] →") seen in shunkosha_jad.jpg & bizpa_jad.jpg
function buildWhiteOverheadSign(jp: string, en: string): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(640, 160);
  ctx.fillStyle = '#f6f8f5';
  ctx.fillRect(0, 0, 640, 160);
  ctx.strokeStyle = '#1c2024';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 632, 152);

  ctx.fillStyle = '#14181c';
  ctx.textAlign = 'center';
  ctx.font = '800 40px sans-serif';
  ctx.fillText(jp, 320, 76);
  ctx.fillStyle = '#3a4248';
  ctx.font = '600 22px sans-serif';
  ctx.fillText(en, 320, 122);
  return toTex(c, 1, 1, true);
}

// Angled Overhead Backlit Fare & Route Map Board above きっぷうりば (matching shunkosha_jad.jpg & shinjuku_tr_709B41DD.jpeg!)
function buildFareTableHeader(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(1024, 256);
  ctx.fillStyle = '#f4f7f5';
  ctx.fillRect(0, 0, 1024, 256);
  ctx.strokeStyle = '#5c646c';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 1018, 250);

  // 4 individual framed fare/route panels side by side
  for (let i = 0; i < 4; i++) {
    const x0 = 12 + i * 252;
    ctx.strokeStyle = '#7a828a';
    ctx.lineWidth = 4;
    ctx.strokeRect(x0, 12, 240, 232);
    ctx.fillStyle = '#0e6b38';
    ctx.fillRect(x0 + 4, 16, 232, 28);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(
      i === 0 ? 'JR東日本線 近郊区間運賃表' : i === 1 ? '山手線・中央線 案内図' : i === 2 ? '湘南新宿・埼京線 運賃表' : 'Suica・指定席ご案内',
      x0 + 120,
      36
    );

    // Route diagram lines
    const cx = x0 + 120;
    const cy = 126;
    ctx.strokeStyle = '#7ac142';
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.ellipse(cx, cy, 46, 56, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#f15a22';
    ctx.beginPath(); ctx.moveTo(x0 + 20, cy); ctx.lineTo(x0 + 220, cy); ctx.stroke();
    ctx.strokeStyle = '#f2c700';
    ctx.beginPath(); ctx.moveTo(x0 + 20, cy + 12); ctx.lineTo(x0 + 220, cy + 12); ctx.stroke();
    ctx.strokeStyle = '#008ed6';
    ctx.beginPath(); ctx.moveTo(cx - 20, 56); ctx.lineTo(cx + 25, 224); ctx.stroke();

    // Red "新宿" center dot
    ctx.fillStyle = '#e02428';
    ctx.fillRect(cx - 48, cy - 12, 34, 18);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('新宿', cx - 31, cy + 1);
  }
  return toTex(c, 1, 1, true);
}

// Inside-Gate Yellow 『精算機 Fare Adjustment Machine』 Bank (matching shinjuku_tr_CB5E0175.jpeg!)
function buildFareAdjustmentMachines(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 512);
  // White tiled recess wall
  ctx.fillStyle = '#d8dad6';
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = '#b4b8b4';
  ctx.lineWidth = 2;
  for (let x = 0; x <= 512; x += 64) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
  }
  for (let y = 0; y <= 512; y += 64) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
  }

  // 3 Bright Yellow JR Fare Adjustment Machines (のりこし精算機)
  for (let i = 0; i < 3; i++) {
    const x = 22 + i * 162;
    ctx.fillStyle = '#e8be14';
    ctx.fillRect(x, 76, 144, 240);
    ctx.strokeStyle = '#383424';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, 76, 144, 240);

    // Top yellow header "のりこし精算機"
    ctx.fillStyle = '#181816';
    ctx.textAlign = 'center';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('のりこし精算機', x + 72, 102);

    // Glowing cyan/blue touchscreen
    ctx.fillStyle = '#162834';
    ctx.fillRect(x + 18, 118, 108, 86);
    ctx.fillStyle = '#84e8f4';
    ctx.fillRect(x + 24, 124, 96, 74);
    ctx.fillStyle = '#0c222c';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('IC・きっぷ精算', x + 72, 156);
    ctx.fillText('Suicaチャージ', x + 72, 178);

    // Card/coin slots
    ctx.fillStyle = '#24282c';
    ctx.fillRect(x + 20, 218, 104, 72);
  }

  // Stainless steel counter ledge & lower skirt
  const g = ctx.createLinearGradient(0, 316, 0, 512);
  g.addColorStop(0, '#b8bec4');
  g.addColorStop(0.12, '#787e84');
  g.addColorStop(1, '#585e64');
  ctx.fillStyle = g;
  ctx.fillRect(0, 316, 512, 196);
  return toTex(c, 1, 1, true);
}

function buildFareAdjustSign(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 112);
  ctx.fillStyle = '#f4f6f2';
  ctx.fillRect(0, 0, 512, 112);
  ctx.strokeStyle = '#1e2226';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 506, 106);

  ctx.fillStyle = '#181c20';
  ctx.fillRect(24, 20, 72, 72);
  ctx.fillStyle = '#f4c818';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('¥', 60, 66);

  ctx.fillStyle = '#181c20';
  ctx.textAlign = 'left';
  ctx.font = '800 36px sans-serif';
  ctx.fillText('精算機', 116, 56);
  ctx.font = '700 22px sans-serif';
  ctx.fillText('Fare Adjustment Machine', 116, 88);
  return toTex(c, 1, 1, true);
}

function buildSuicaLockers(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 512);
  ctx.fillStyle = '#2c3844';
  ctx.fillRect(0, 0, 256, 512);
  ctx.fillStyle = '#19222b';
  ctx.fillRect(0, 0, 256, 44);
  ctx.fillStyle = '#7cd152';
  ctx.fillRect(10, 10, 74, 24);
  ctx.fillStyle = '#0f1d0d';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('Suica対応', 15, 27);
  ctx.fillStyle = '#dce2e6';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('コインロッカー', 96, 28);

  for (let r = 0; r < 4; r++) {
    for (let col = 0; col < 2; col++) {
      const x = 8 + col * 124;
      const y = 52 + r * 114;
      ctx.fillStyle = '#435262';
      ctx.fillRect(x, y, 116, 106);
      ctx.strokeStyle = '#181e24';
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, 116, 106);
      ctx.fillStyle = '#1a1f24';
      ctx.fillRect(x + 84, y + 32, 20, 42);
      ctx.fillStyle = (r + col) % 3 === 0 ? '#3ad678' : '#d63e3e';
      ctx.fillRect(x + 90, y + 38, 8, 6);
      ctx.fillStyle = '#cfd5dc';
      ctx.font = 'bold 13px monospace';
      ctx.fillText(`W-${r * 2 + col + 201}`, x + 10, y + 22);
    }
  }
  return toTex(c, 1, 1, true);
}

function buildShutter() {
  const [c, ctx] = makeCanvas(256, 256);
  const [nC, nCtx] = makeCanvas(128, 128);
  ctx.fillStyle = '#53585e';
  ctx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 16) {
    const g = ctx.createLinearGradient(0, y, 0, y + 16);
    g.addColorStop(0, '#6a7076');
    g.addColorStop(0.5, '#4c5156');
    g.addColorStop(1, '#2b2e32');
    ctx.fillStyle = g;
    ctx.fillRect(0, y, 256, 16);

    const ng = nCtx.createLinearGradient(0, y / 2, 0, y / 2 + 8);
    ng.addColorStop(0, '#ffffff');
    ng.addColorStop(0.5, '#909090');
    ng.addColorStop(1, '#202020');
    nCtx.fillStyle = ng;
    nCtx.fillRect(0, y / 2, 128, 8);
  }
  return {
    color: toTex(c, 2, 2, true),
    normal: heightToNormal(nC, 2.6, 2, 2),
  };
}

function buildNewDaysShutter(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 512);
  for (let y = 112; y < 512; y += 16) {
    const g = ctx.createLinearGradient(0, y, 0, y + 16);
    g.addColorStop(0, '#656c72');
    g.addColorStop(0.5, '#4c5258');
    g.addColorStop(1, '#2e3236');
    ctx.fillStyle = g;
    ctx.fillRect(0, y, 512, 16);
  }
  ctx.fillStyle = '#125a32';
  ctx.fillRect(0, 0, 512, 112);
  ctx.fillStyle = '#7cc93d';
  ctx.fillRect(0, 96, 512, 16);
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 50px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('NewDays', 28, 66);
  ctx.fillStyle = '#d4f2df';
  ctx.font = '600 18px sans-serif';
  ctx.fillText('新宿（東口改札外） // 営業時間外', 248, 62);
  ctx.fillStyle = 'rgba(8,10,12,0.28)';
  ctx.fillRect(0, 112, 512, 34);
  return toTex(c, 1, 1, true);
}

function buildAcureVending(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 512);
  ctx.fillStyle = '#d4d6d2';
  ctx.fillRect(0, 0, 256, 512);
  ctx.fillStyle = '#114d7c';
  ctx.fillRect(0, 0, 256, 36);
  ctx.fillStyle = '#eaf6ff';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('acure  //  SHINJUKU', 128, 25);

  ctx.fillStyle = '#121d26';
  ctx.fillRect(14, 44, 228, 240);
  ctx.fillStyle = '#dff2f8';
  ctx.fillRect(20, 50, 216, 228);
  const cols = ['#2575b8', '#c63529', '#388a45', '#d49a24', '#1e242b', '#cf6b24', '#468aa6'];
  for (let row = 0; row < 3; row++) {
    const ry = 66 + row * 74;
    ctx.fillStyle = '#b4c0c6';
    ctx.fillRect(22, ry + 48, 212, 7);
    for (let col = 0; col < 6; col++) {
      const rx = 30 + col * 33;
      ctx.fillStyle = cols[(row * 6 + col) % cols.length];
      ctx.fillRect(rx, ry + 6, 22, 40);
      ctx.fillStyle = 'rgba(255,255,255,0.38)';
      ctx.fillRect(rx + 3, ry + 10, 5, 32);
      ctx.fillStyle = row === 2 ? '#c43329' : '#1b5896';
      ctx.fillRect(rx, ry + 50, 22, 10);
    }
  }
  ctx.fillStyle = '#1f242b';
  ctx.fillRect(156, 298, 78, 84);
  ctx.fillStyle = '#2ec278';
  ctx.fillRect(168, 312, 54, 22);
  ctx.fillStyle = '#f2f5f2';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('Suica', 195, 327);
  ctx.fillStyle = '#161a1f';
  ctx.fillRect(22, 400, 212, 82);
  ctx.strokeStyle = '#737980';
  ctx.lineWidth = 3;
  ctx.strokeRect(22, 400, 212, 82);
  return toTex(c, 1, 1, true);
}

// Authentic JR East 交通系IC Mark helper (red 'IC' with gold stylized rail badge, matching user reference Screenshot_20261120-100223.png!)
function drawICBadge(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void {
  ctx.fillStyle = '#f6f7f5';
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = '#9a8068';
  ctx.fillRect(x + w * 0.14, y + h * 0.24, w * 0.18, h * 0.56);
  ctx.fillStyle = '#d41b24';
  ctx.font = `900 ${Math.round(h * 0.62)}px sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText('IC', x + w * 0.36, y + h * 0.78);
}

// Recessed Ticket Vending Machines in きっぷうりば — matching Screenshot_20261120-100223.png:
// 2x JR Green 自動券売機 (きっぷ・チャージ), 1x Dark Slate 多機能券売機 (定期券・Suica・きっぷ・チャージ), 1x JR Blue 指定席券売機!
function buildTicketMachines(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(1024, 512);
  ctx.fillStyle = '#d4d8da';
  ctx.fillRect(0, 0, 1024, 512);

  const units: Array<{
    kind: 'green' | 'multi' | 'mv';
    title: string;
    sub: string;
  }> = [
    { kind: 'green', title: 'きっぷ・チャージ', sub: 'Tickets / Charge' },
    { kind: 'green', title: 'きっぷ・チャージ', sub: 'Tickets / Charge' },
    { kind: 'multi', title: '定期券・Suica', sub: 'Commuter Pass / Charge' },
    { kind: 'mv', title: '指定席券売機', sub: 'Reserved Seat Tickets' },
  ];

  units.forEach((u, i) => {
    const x = 18 + i * 248;
    const w = 232;
    // Brushed pearl-silver stainless housing
    const bodyG = ctx.createLinearGradient(x, 0, x + w, 0);
    bodyG.addColorStop(0, '#c8ced2');
    bodyG.addColorStop(0.5, '#dde1e4');
    bodyG.addColorStop(1, '#bcc2c6');
    ctx.fillStyle = bodyG;
    ctx.fillRect(x, 18, w, 476);
    ctx.strokeStyle = '#6c7278';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, 18, w, 476);

    const topCol = u.kind === 'green' ? '#1c9638' : u.kind === 'multi' ? '#464a50' : '#185296';
    const subCol = u.kind === 'green' ? '#6ac042' : u.kind === 'multi' ? '#8c929a' : '#3a78c2';
    const leftCol = u.kind === 'green' ? '#6cc044' : u.kind === 'multi' ? '#70767e' : '#2a64ad';

    // Top fascia header (exact split layout from JR East Screenshot_20261120-100223.png!)
    ctx.fillStyle = leftCol;
    ctx.fillRect(x + 4, 22, 54, 106);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic 900 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('JR', x + 31, 48);
    drawICBadge(ctx, x + 11, 58, 40, 26);

    // Right main header bar
    ctx.fillStyle = topCol;
    ctx.fillRect(x + 60, 22, w - 64, 54);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(u.title, x + 60 + (w - 64) * 0.5, 56);

    // Sub-banner with recessed black LED fare status box on right
    ctx.fillStyle = subCol;
    ctx.fillRect(x + 60, 78, w - 64, 50);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.font = '700 12px sans-serif';
    ctx.fillText(u.sub.split(' / ')[0], x + 68, 98);
    ctx.fillText(u.sub.split(' / ')[1] || 'Tickets', x + 68, 116);
    ctx.fillStyle = '#0e1114';
    ctx.fillRect(x + w - 58, 86, 44, 34);

    // Recessed touchscreen LCD area + left side physical push-buttons
    ctx.fillStyle = '#b4babf';
    ctx.fillRect(x + 12, 138, w - 24, 152);
    // 4 tactile buttons on left of screen
    for (let b = 0; b < 4; b++) {
      ctx.fillStyle = '#eaedf0';
      ctx.fillRect(x + 18, 156 + b * 28, 22, 20);
      ctx.strokeStyle = '#70767c';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x + 18, 156 + b * 28, 22, 20);
    }
    // White touchscreen monitor with authentic JR East UI
    ctx.fillStyle = '#1e242a';
    ctx.fillRect(x + 48, 146, 166, 136);
    ctx.fillStyle = '#f2f5f2';
    ctx.fillRect(x + 54, 152, 154, 124);
    if (u.kind === 'multi') {
      // Multi-function machine green & magenta menu tiles (from right side of user screenshot!)
      ctx.fillStyle = '#249848';
      ctx.fillRect(x + 62, 174, 66, 36);
      ctx.fillStyle = '#c83474';
      ctx.fillRect(x + 62, 218, 66, 36);
      ctx.fillStyle = '#2c3036';
      ctx.fillRect(x + 134, 174, 66, 36);
      ctx.fillStyle = '#22262c';
      ctx.fillRect(x + 134, 218, 66, 36);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('きっぷ', x + 95, 196);
      ctx.fillText('定期券', x + 95, 240);
      ctx.fillText('Suica', x + 167, 196);
      ctx.fillText('チャージ', x + 167, 240);
    } else {
      // Standard JR green framed white touchscreen UI (from left side of user screenshot!)
      ctx.strokeStyle = '#38a446';
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 62, 164, 138, 86);
      ctx.fillStyle = '#24943c';
      ctx.fillRect(x + 64, 166, 134, 18);
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('Suica・きっぷ選択', x + 131, 179);
      // Mini green Suica card + IC icon inside screen
      drawICBadge(ctx, x + 76, 198, 34, 24);
      ctx.fillStyle = '#7ec83c';
      ctx.fillRect(x + 122, 198, 42, 26);
      ctx.fillStyle = '#183018';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText('Suica', x + 143, 214);
      ctx.fillStyle = '#207834';
      ctx.fillRect(x + 76, 232, 110, 12);
    }

    // Lower deck: IC card tray, bill/coin slots, keypad, recessed dark ticket/change pocket
    ctx.fillStyle = '#a4acb2';
    ctx.fillRect(x + 12, 300, w - 24, 178);
    // IC card holder tray (left)
    ctx.fillStyle = '#22272c';
    ctx.fillRect(x + 22, 314, 62, 32);
    ctx.fillStyle = '#28a89a';
    ctx.fillRect(x + 26, 318, 54, 6);
    // Coin cup & bill slot (center)
    ctx.fillStyle = '#1a1f24';
    ctx.fillRect(x + 94, 314, 54, 28);
    ctx.fillStyle = '#262b30';
    ctx.fillRect(x + 94, 350, 54, 14);
    // 10-key keypad (right)
    ctx.fillStyle = '#d4d8dc';
    ctx.fillRect(x + 158, 314, 52, 54);
    ctx.fillStyle = '#5a6066';
    for (let kr = 0; kr < 4; kr++) {
      for (let kc = 0; kc < 3; kc++) {
        ctx.fillRect(x + 163 + kc * 15, 319 + kr * 12, 10, 8);
      }
    }
    // Deep recessed dark-steel ticket & change dispenser trays
    ctx.fillStyle = '#181c20';
    ctx.fillRect(x + 22, 382, 126, 76);
    ctx.fillStyle = '#2e343a';
    ctx.fillRect(x + 28, 390, 114, 28);
    ctx.fillRect(x + 28, 424, 114, 26);
    ctx.fillStyle = '#181c20';
    ctx.fillRect(x + 158, 382, 52, 76);
  });

  return toTex(c, 1, 1, true);
}

// Ultra-Precise Top Fascia Texture for Interactable 3D JR East 『自動券売機 きっぷ・チャージ』 (exact match to Screenshot_20261120-100223.png!)
function buildChargeMachineHeader(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 256);
  // Crisp white separator frame
  ctx.fillStyle = '#e8ecea';
  ctx.fillRect(0, 0, 512, 256);

  // Left vertical JR green column (JR logo + official 交通系IC badge)
  ctx.fillStyle = '#6ec244';
  ctx.fillRect(6, 6, 122, 244);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic 900 44px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('JR', 67, 66);
  drawICBadge(ctx, 20, 92, 94, 62);
  ctx.fillStyle = '#123e1c';
  ctx.font = '700 16px sans-serif';
  ctx.fillText('Suica対応', 67, 198);

  // Upper-right bright JR lime-green header: 『きっぷ・チャージ』
  ctx.fillStyle = '#1a9a3a';
  ctx.fillRect(134, 6, 372, 122);
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 42px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('きっぷ・チャージ', 320, 82);

  // Lower-right lighter lime-green sub-header: 『Tickets / Charge』 + black rectangular LED display window!
  ctx.fillStyle = '#6ec244';
  ctx.fillRect(134, 134, 372, 116);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.font = '700 32px sans-serif';
  ctx.fillText('Tickets', 160, 182);
  ctx.fillText('Charge', 160, 224);

  // Black recessed numeric/status LED box on right (iconic detail in Screenshot_20261120-100223.png!)
  ctx.fillStyle = '#0c0f12';
  ctx.fillRect(384, 150, 102, 82);
  ctx.strokeStyle = '#384048';
  ctx.lineWidth = 4;
  ctx.strokeRect(384, 150, 102, 82);
  ctx.fillStyle = '#48e88c';
  ctx.font = '700 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('¥200', 435, 198);

  return toTex(c, 1, 1, true);
}

// Ultra-Precise Brushed Stainless Lower Console Deck for 3D JR East 『自動券売機 きっぷ・チャージ』
function buildChargeMachineLowerDeck(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 512);
  const bg = ctx.createLinearGradient(0, 0, 512, 0);
  bg.addColorStop(0, '#c6ccd0');
  bg.addColorStop(0.5, '#dfe3e6');
  bg.addColorStop(1, '#bcc2c6');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 512);

  // Brushed metallic panel joints
  ctx.strokeStyle = '#70767c';
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, 496, 496);
  ctx.beginPath();
  ctx.moveTo(8, 226); ctx.lineTo(504, 226);
  ctx.stroke();

  // Top-left: Bill Acceptor (紙幣 1000円〜1万円)
  ctx.fillStyle = '#181c20';
  ctx.fillRect(28, 36, 134, 72);
  ctx.fillStyle = '#24b456';
  ctx.fillRect(46, 56, 98, 10);
  ctx.fillStyle = '#2c3238';
  ctx.font = '700 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('紙幣 / BILLS', 95, 132);

  // Top-center: Coin Slot & Tray (硬貨)
  ctx.fillStyle = '#181c20';
  ctx.fillRect(184, 36, 136, 86);
  ctx.fillStyle = '#384048';
  ctx.fillRect(204, 52, 96, 44);
  ctx.fillStyle = '#2c3238';
  ctx.fillText('硬貨 / COINS', 252, 146);

  // Top-right: Numeric 10-Key Keypad
  ctx.fillStyle = '#edf0f2';
  ctx.fillRect(344, 30, 140, 168);
  ctx.strokeStyle = '#6c7278';
  ctx.lineWidth = 3;
  ctx.strokeRect(344, 30, 140, 168);
  for (let r = 0; r < 4; r++) {
    for (let col = 0; col < 3; col++) {
      ctx.fillStyle = r === 3 && col === 0 ? '#d44238' : r === 3 && col === 2 ? '#228c44' : '#6e757c';
      ctx.fillRect(358 + col * 40, 44 + r * 36, 30, 26);
    }
  }

  // Bottom-left & center: Deep recessed dark steel Ticket / Receipt / Change Dispenser Bins
  ctx.fillStyle = '#161a1f';
  ctx.fillRect(28, 250, 294, 224);
  ctx.strokeStyle = '#5a6066';
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 250, 294, 224);
  // Horizontal slot divider
  ctx.fillStyle = '#2a3036';
  ctx.fillRect(44, 272, 262, 62);
  ctx.fillRect(44, 356, 262, 94);
  ctx.fillStyle = '#aeb6bc';
  ctx.font = '700 15px sans-serif';
  ctx.fillText('きっぷ・領収書 / TICKETS', 175, 308);
  ctx.fillText('おつり / CHANGE', 175, 408);

  // Bottom-right: Maintenance access panel + black kickplate
  ctx.fillStyle = '#9aa0a6';
  ctx.fillRect(344, 250, 140, 224);
  ctx.strokeStyle = '#5a6066';
  ctx.strokeRect(344, 250, 140, 224);
  ctx.fillStyle = '#181c20';
  ctx.fillRect(0, 482, 512, 30);

  return toTex(c, 1, 1, true);
}

// Authentic JR East Automatic Ticket Gate Front LED Direction Arrow (↓ Emerald Open / Magnetic Ticket Slit)
function buildTurnstileFrontArrow(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(128, 256);
  ctx.fillStyle = '#161a20';
  ctx.fillRect(0, 0, 128, 256);
  ctx.strokeStyle = '#3c444c';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 122, 250);

  // Upper illuminated green downward entry arrow lens
  ctx.fillStyle = '#0e281a';
  ctx.fillRect(18, 20, 92, 92);
  ctx.fillStyle = '#38e882';
  ctx.beginPath();
  ctx.moveTo(64, 98);
  ctx.lineTo(28, 56);
  ctx.lineTo(48, 56);
  ctx.lineTo(48, 30);
  ctx.lineTo(80, 30);
  ctx.lineTo(80, 56);
  ctx.lineTo(100, 56);
  ctx.closePath();
  ctx.fill();

  // Middle magnetic paper ticket insertion slot
  ctx.fillStyle = '#06080a';
  ctx.fillRect(24, 144, 80, 14);
  ctx.fillStyle = '#54d88c';
  ctx.fillRect(24, 138, 80, 4);

  // Lower IC mark badge
  drawICBadge(ctx, 26, 184, 76, 46);
  return toTex(c, 1, 1, true);
}

// Midnight Shinjuku Station Closed-Corridor / Last-Train Folding Barricade Panel
function buildBarricadePanel(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 256);
  ctx.fillStyle = '#e6e4dc';
  ctx.fillRect(0, 0, 512, 256);

  // Top & bottom red/white reflective hazard chevron bars
  for (let x = -64; x < 576; x += 48) {
    ctx.fillStyle = '#c82026';
    ctx.beginPath();
    ctx.moveTo(x, 0); ctx.lineTo(x + 24, 0); ctx.lineTo(x + 8, 38); ctx.lineTo(x - 16, 38);
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, 218); ctx.lineTo(x + 24, 218); ctx.lineTo(x + 8, 256); ctx.lineTo(x - 16, 256);
    ctx.closePath(); ctx.fill();
  }

  ctx.fillStyle = '#181a1d';
  ctx.textAlign = 'center';
  ctx.font = '900 46px sans-serif';
  ctx.fillText('終電終了・立入禁止', 256, 118);
  ctx.fillStyle = '#b81e24';
  ctx.font = '800 28px monospace';
  ctx.fillText('CLOSED AFTER LAST TRAIN — 00:47', 256, 166);
  ctx.fillStyle = '#484e54';
  ctx.font = '700 20px sans-serif';
  ctx.fillText('JR東日本 新宿駅', 256, 202);
  return toTex(c, 1, 1, true);
}

// Wall-Mounted Japanese Station Fire Alarm Call Box (火災報知機)
function buildFireAlarmBox(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(128, 256);
  ctx.fillStyle = '#a81c20';
  ctx.fillRect(0, 0, 128, 256);
  ctx.strokeStyle = '#520c0e';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 122, 250);
  // Red pilot lamp & white circular push button
  ctx.fillStyle = '#ff3838';
  ctx.beginPath(); ctx.arc(64, 52, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f2efe8';
  ctx.beginPath(); ctx.arc(64, 136, 34, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#d42228';
  ctx.beginPath(); ctx.arc(64, 136, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('強く押す', 64, 212);
  ctx.font = 'bold 14px monospace';
  ctx.fillText('FIRE ALARM', 64, 238);
  return toTex(c, 1, 1, true);
}

function buildJRSign(
  jp: string,
  en: string,
  bg: string,
  fg: string,
  stripes: string[]
): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(768, 176);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 768, 176);
  ctx.strokeStyle = bg === '#f4f5f0' ? '#24282c' : 'rgba(255,255,255,0.28)';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 760, 168);

  const sw = 752 / stripes.length;
  stripes.forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.fillRect(8 + i * sw, 152, sw, 16);
  });

  // Green JR square icon on left
  ctx.fillStyle = '#0e6b38';
  ctx.fillRect(24, 28, 62, 62);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = 'italic 900 28px sans-serif';
  ctx.fillText('JR', 55, 70);

  ctx.fillStyle = fg;
  ctx.textAlign = 'center';
  ctx.font = '800 40px sans-serif';
  ctx.fillText(jp, 416, 78);
  ctx.fillStyle = bg === '#f4f5f0' ? '#363c42' : 'rgba(232,238,236,0.84)';
  ctx.font = '600 21px sans-serif';
  ctx.fillText(en, 416, 126);
  return toTex(c, 1, 1, true);
}

function buildPlatformSign(
  num: string,
  line: string,
  sub: string,
  accent: string
): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(640, 176);
  ctx.fillStyle = '#11161d';
  ctx.fillRect(0, 0, 640, 176);
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, 132, 176);
  ctx.fillStyle = '#0c1014';
  ctx.textAlign = 'center';
  ctx.font = '900 40px sans-serif';
  ctx.fillText(num, 66, 102);
  ctx.font = '700 18px sans-serif';
  ctx.fillText('番線', 66, 138);

  ctx.fillStyle = '#f2f4f0';
  ctx.textAlign = 'left';
  ctx.font = '700 46px sans-serif';
  ctx.fillText(line, 156, 84);
  ctx.fillStyle = '#b4c0c8';
  ctx.font = '600 22px sans-serif';
  ctx.fillText(sub, 156, 132);
  ctx.fillStyle = accent;
  ctx.fillRect(132, 160, 508, 16);
  return toTex(c, 1, 1, true);
}

function buildShinjukuNameplate(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 192);
  ctx.fillStyle = '#eae7de';
  ctx.fillRect(0, 0, 512, 192);
  ctx.fillStyle = '#20262b';
  ctx.fillRect(0, 0, 512, 14);
  ctx.fillStyle = '#1c6d36';
  ctx.fillRect(0, 114, 512, 26);
  ctx.fillStyle = '#80c342';
  ctx.fillRect(174, 114, 164, 26);

  ctx.strokeStyle = '#80c342';
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 30, 56, 60);
  ctx.fillStyle = '#14171a';
  ctx.textAlign = 'center';
  ctx.font = '800 17px monospace';
  ctx.fillText('JY', 48, 55);
  ctx.font = '900 24px monospace';
  ctx.fillText('17', 48, 82);

  ctx.strokeStyle = '#f15a22';
  ctx.strokeRect(436, 30, 56, 60);
  ctx.font = '800 17px monospace';
  ctx.fillText('JC', 464, 55);
  ctx.font = '900 24px monospace';
  ctx.fillText('05', 464, 82);

  ctx.fillStyle = '#14171a';
  ctx.font = '800 54px sans-serif';
  ctx.fillText('しんじゅく', 256, 84);
  ctx.fillStyle = '#16191c';
  ctx.font = '700 28px sans-serif';
  ctx.fillText('新宿   Shinjuku', 256, 174);

  ctx.fillStyle = '#eef4ee';
  ctx.font = '600 14px sans-serif';
  ctx.fillText('← 代々木', 70, 132);
  ctx.fillText('新大久保 →', 440, 132);
  return toTex(c, 1, 1, true);
}

function buildEmergencyExit(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 96);
  ctx.fillStyle = '#0e783f';
  ctx.fillRect(0, 0, 256, 96);
  ctx.strokeStyle = '#c4f8dc';
  ctx.lineWidth = 5;
  ctx.strokeRect(4, 4, 248, 88);
  ctx.fillStyle = '#eefff6';
  ctx.beginPath(); ctx.arc(54, 28, 9, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#eefff6';
  ctx.beginPath();
  ctx.moveTo(54, 38); ctx.lineTo(48, 60); ctx.lineTo(36, 76);
  ctx.moveTo(48, 60); ctx.lineTo(66, 76);
  ctx.moveTo(52, 46); ctx.lineTo(72, 42);
  ctx.moveTo(52, 46); ctx.lineTo(34, 54);
  ctx.stroke();
  ctx.textAlign = 'left';
  ctx.font = '700 32px sans-serif';
  ctx.fillText('非常口', 92, 50);
  ctx.font = '700 18px monospace';
  ctx.fillText('EXIT', 102, 76);
  return toTex(c, 1, 1, true);
}

function buildLastTrainWarning(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 256);
  ctx.fillStyle = '#15181c';
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = '#d4a224';
  ctx.fillRect(0, 0, 512, 36);
  ctx.fillRect(0, 220, 512, 36);
  ctx.fillStyle = '#111417';
  ctx.textAlign = 'center';
  ctx.font = '800 22px sans-serif';
  ctx.fillText('JR SHINJUKU STATION // 終電終了', 256, 26);
  ctx.fillStyle = '#f0ede4';
  ctx.font = '700 33px sans-serif';
  ctx.fillText('本日ノ運行ハ終了シマシタ', 256, 110);
  ctx.fillStyle = '#e54949';
  ctx.font = '700 25px sans-serif';
  ctx.fillText('東口 非常出口（歌舞伎町方面）へ', 256, 162);
  ctx.fillStyle = '#9aa2aa';
  ctx.font = '600 18px monospace';
  ctx.fillText('LAST TRAIN DEPARTED — 00:15', 256, 200);
  return toTex(c, 1, 1, true);
}

function buildPhotoBoothHeader(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 96);
  ctx.fillStyle = '#0c334a';
  ctx.fillRect(0, 0, 256, 96);
  ctx.strokeStyle = '#6fe2ff';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 248, 88);
  ctx.fillStyle = '#ecfbff';
  ctx.textAlign = 'center';
  ctx.font = '800 32px sans-serif';
  ctx.fillText('証明写真', 128, 48);
  ctx.fillStyle = '#7de6ff';
  ctx.font = '700 17px monospace';
  ctx.fillText('PHOTO BOOTH ¥800', 128, 78);
  return toTex(c, 1, 1, true);
}

function buildPayphoneSign(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 80);
  ctx.fillStyle = '#0f683a';
  ctx.fillRect(0, 0, 256, 80);
  ctx.strokeStyle = '#b4f6cf';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 248, 72);
  ctx.fillStyle = '#f4fff8';
  ctx.textAlign = 'center';
  ctx.font = '700 28px sans-serif';
  ctx.fillText('公衆電話', 128, 42);
  ctx.font = '600 15px monospace';
  ctx.fillText('PUBLIC TELEPHONE', 128, 66);
  return toTex(c, 1, 1, true);
}

function buildPedestalPlaque(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 256);
  ctx.fillStyle = '#15181c';
  ctx.fillRect(0, 0, 512, 256);
  ctx.strokeStyle = '#c8aa60';
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, 492, 236);
  ctx.fillStyle = '#ece8dd';
  ctx.textAlign = 'center';
  ctx.font = '700 28px serif';
  ctx.fillText('新宿駅東西自由通路・アルプス広場 特設展示', 256, 74);
  ctx.fillStyle = '#d4b464';
  ctx.font = '700 44px sans-serif';
  ctx.fillText('「 紫のうさぎ 」', 256, 146);
  ctx.fillStyle = '#a4aab2';
  ctx.font = '500 20px sans-serif';
  ctx.fillText('JR新宿駅 新マスコット等身大立像 — 展示中', 256, 202);
  return toTex(c, 1, 1, true);
}

function buildWetFloorSign(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 384);
  ctx.fillStyle = '#d4a620';
  ctx.fillRect(0, 0, 256, 384);
  ctx.strokeStyle = '#181818';
  ctx.lineWidth = 10;
  ctx.strokeRect(12, 12, 232, 360);
  ctx.beginPath();
  ctx.moveTo(128, 56); ctx.lineTo(196, 174); ctx.lineTo(60, 174); ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = '#181818';
  ctx.textAlign = 'center';
  ctx.font = '900 58px sans-serif';
  ctx.fillText('!', 128, 158);
  ctx.font = '700 40px sans-serif';
  ctx.fillText('足元注意', 128, 250);
  ctx.font = '700 26px sans-serif';
  ctx.fillText('清掃中', 128, 298);
  ctx.font = '700 18px monospace';
  ctx.fillText('WET FLOOR', 128, 342);
  return toTex(c, 1, 1, true);
}

// Green-frame rectangular/roundJR East Station Clock stopped at 00:47 (matching jeki_slides.pdf Page 3 & shinjuku_tr_9B178FCD.jpeg!)
function buildStationClock(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 256);
  ctx.fillStyle = '#125a30';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = '#d8f084';
  ctx.beginPath(); ctx.arc(128, 128, 110, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#14181a';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const r0 = i % 3 === 0 ? 82 : 92;
    ctx.lineWidth = i % 3 === 0 ? 7 : 3.5;
    ctx.beginPath();
    ctx.moveTo(128 + Math.cos(a) * r0, 128 + Math.sin(a) * r0);
    ctx.lineTo(128 + Math.cos(a) * 104, 128 + Math.sin(a) * 104);
    ctx.stroke();
  }
  const hA = ((0 + 47 / 60) / 12) * Math.PI * 2 - Math.PI / 2;
  const mA = (47 / 60) * Math.PI * 2 - Math.PI / 2;
  ctx.strokeStyle = '#141618';
  ctx.lineCap = 'round';
  ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(128, 128); ctx.lineTo(128 + Math.cos(hA) * 56, 128 + Math.sin(hA) * 56); ctx.stroke();
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(128, 128); ctx.lineTo(128 + Math.cos(mA) * 84, 128 + Math.sin(mA) * 84); ctx.stroke();
  ctx.fillStyle = '#141618';
  ctx.beginPath(); ctx.arc(128, 128, 7, 0, Math.PI * 2); ctx.fill();
  return toTex(c, 1, 1, true);
}

function buildGraffiti(line1: string, line2: string): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 256);
  ctx.clearRect(0, 0, 512, 256);
  ctx.save();
  ctx.translate(256, 128);
  ctx.rotate(-0.04);
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(138,16,16,0.85)';
  ctx.font = '900 54px serif';
  ctx.fillText(line1, 0, -16);
  ctx.fillStyle = 'rgba(116,12,12,0.75)';
  ctx.font = '700 28px serif';
  ctx.fillText(line2, 6, 52);
  ctx.strokeStyle = 'rgba(120,14,14,0.65)';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(-180, 4); ctx.lineTo(188, -2); ctx.stroke();
  ctx.restore();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function buildFlashlightCookie(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 256);
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 256, 256);
  const g = ctx.createRadialGradient(128, 128, 6, 128, 128, 124);
  g.addColorStop(0.0, 'rgba(255,250,240,1.0)');
  g.addColorStop(0.24, 'rgba(246,248,242,0.95)');
  g.addColorStop(0.52, 'rgba(196,214,218,0.56)');
  g.addColorStop(0.76, 'rgba(176,198,206,0.34)');
  g.addColorStop(0.84, 'rgba(224,238,242,0.48)');
  g.addColorStop(0.93, 'rgba(72,88,96,0.14)');
  g.addColorStop(1.0, 'rgba(0,0,0,0.0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function buildBrushedMetalNormal(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 256);
  const rnd = mulberry32(414);
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y++) {
    const v = 116 + Math.floor((rnd() - 0.5) * 24);
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.fillRect(0, y, 256, 1);
  }
  return heightToNormal(c, 1.25, 2, 2);
}

function buildFireHydrant(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 512);
  ctx.fillStyle = '#8e1f22';
  ctx.fillRect(0, 0, 256, 512);
  ctx.strokeStyle = '#380c0d';
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, 240, 496);
  ctx.fillStyle = '#241819';
  ctx.fillRect(28, 28, 200, 118);
  ctx.fillStyle = '#e02d2d';
  ctx.beginPath(); ctx.arc(82, 88, 22, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#a0a6ad';
  ctx.beginPath(); ctx.arc(174, 88, 30, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ebe6dc';
  ctx.textAlign = 'center';
  ctx.font = '900 62px sans-serif';
  ctx.fillText('消', 128, 240);
  ctx.fillText('火', 128, 314);
  ctx.fillText('栓', 128, 388);
  ctx.fillStyle = '#d8cec4';
  ctx.font = '700 18px monospace';
  ctx.fillText('FIRE HYDRANT', 128, 444);
  return toTex(c, 1, 1, true);
}

function buildFloorGrate() {
  const [c, ctx] = makeCanvas(256, 256);
  const [nC, nCtx] = makeCanvas(128, 128);
  ctx.fillStyle = '#090b0d';
  ctx.fillRect(0, 0, 256, 256);
  nCtx.fillStyle = '#121212';
  nCtx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = '#606870';
  nCtx.fillStyle = '#e4e4e4';
  ctx.fillRect(0, 0, 256, 16); ctx.fillRect(0, 240, 256, 16);
  ctx.fillRect(0, 0, 16, 256); ctx.fillRect(240, 0, 16, 256);
  for (let x = 24; x < 236; x += 18) {
    ctx.fillStyle = '#505860';
    ctx.fillRect(x, 12, 8, 232);
    nCtx.fillStyle = '#d4d4d4';
    nCtx.fillRect(x / 2, 6, 4, 116);
  }
  return {
    color: toTex(c, 2, 1, true),
    normal: heightToNormal(nC, 2.4, 2, 1),
  };
}

function buildClawDrag(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 256);
  ctx.clearRect(0, 0, 512, 256);
  const ys = [64, 102, 144, 186];
  ys.forEach((y, i) => {
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(68,14,44,0.78)' : 'rgba(98,12,24,0.68)';
    ctx.lineWidth = 10 + (i === 1 ? 5 : 0);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(42 + i * 8, y);
    ctx.bezierCurveTo(180, y + 8, 310, y + 18, 465 - i * 14, y + 34);
    ctx.stroke();
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function buildPlushNormal(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 512);
  const rnd = mulberry32(777);
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 22000; i++) {
    const x = rnd() * 512;
    const y = rnd() * 512;
    const v = Math.floor(58 + rnd() * 140);
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.fillRect(x, y, 1.3 + rnd() * 1.4, 2.6 + rnd() * 3.2);
  }
  for (let i = 0; i < 42; i++) {
    const x = rnd() * 512;
    const y = rnd() * 512;
    const r = 16 + rnd() * 48;
    const g = ctx.createRadialGradient(x, y, 2, x, y, r);
    const v = rnd() > 0.45 ? 32 : 204;
    g.addColorStop(0, `rgba(${v},${v},${v},0.46)`);
    g.addColorStop(1, 'rgba(128,128,128,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  return heightToNormal(c, 2.7, 4, 4);
}

function buildRabbitGrime(isFace: boolean): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 512);
  const rnd = mulberry32(isFace ? 912 : 911);
  ctx.fillStyle = isFace ? '#c4beb2' : '#7b4fa8';
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 14000; i++) {
    const x = rnd() * 512;
    const y = rnd() * 512;
    const dark = rnd() > 0.42;
    ctx.fillStyle = isFace
      ? dark ? `rgba(54,48,44,${rnd() * 0.16})` : `rgba(235,232,224,${rnd() * 0.14})`
      : dark ? `rgba(28,14,44,${rnd() * 0.24})` : `rgba(154,112,202,${rnd() * 0.16})`;
    ctx.fillRect(x, y, 2, 3);
  }
  return toTex(c, 2, 2, true);
}

// 70-inch Vertical FHD 『J・ADビジョン新宿駅東西自由通路』 Column Screen (5 progressive stages synchronized with Shinjuku Wall 456!)
// Compare directly with shibata_pillar.jpg, panasonic_pdf.pdf, jeki_slides.pdf Page 2 & 3
function buildDigitalSignage(stage: number): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 1024);

  if (stage === 0) {
    // Synchronized Moment Factory "新宿カラーバス" cyan/blue/pink wave background + mascot showcase!
    const bg = ctx.createLinearGradient(0, 0, 512, 1024);
    bg.addColorStop(0.0, '#28b8e8');
    bg.addColorStop(0.42, '#d8c4f8');
    bg.addColorStop(0.75, '#f2a4dc');
    bg.addColorStop(1.0, '#3898f0');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 1024);

    // Flowing silk wave overlay
    ctx.fillStyle = 'rgba(255,255,255,0.34)';
    ctx.beginPath();
    ctx.moveTo(0, 240);
    ctx.bezierCurveTo(180, 140, 340, 360, 512, 220);
    ctx.lineTo(512, 740);
    ctx.bezierCurveTo(340, 820, 180, 620, 0, 740);
    ctx.closePath();
    ctx.fill();
  } else {
    const bgColors = ['#e8e4da', '#221830', '#181022', '#0c1015', '#1a0406'];
    ctx.fillStyle = bgColors[stage] || '#1a0406';
    ctx.fillRect(0, 0, 512, 1024);
  }

  // Top header bar
  ctx.fillStyle = stage >= 4 ? '#7c0f14' : stage === 3 ? '#1a242c' : stage === 2 ? '#4d1954' : '#0f6a36';
  ctx.fillRect(0, 0, 512, 112);
  ctx.fillStyle = stage >= 3 ? '#f44a4a' : '#f4f6f2';
  ctx.textAlign = 'center';
  ctx.font = '800 30px sans-serif';
  const headers = [
    'J・AD VISION // JR新宿駅',
    '新宿駅でずっと見てるよ',
    '終電はもう終わったよ',
    'CAM-E04 // TARGET LOCKED',
    'み つ け た',
  ];
  ctx.fillText(headers[stage], 256, 70);

  const cx = 256;
  const cy = 480;
  if (stage === 3) {
    ctx.strokeStyle = 'rgba(220,50,50,0.65)';
    ctx.lineWidth = 4;
    ctx.strokeRect(48, 220, 416, 460);
    ctx.fillStyle = 'rgba(235,60,60,0.9)';
    ctx.font = '700 26px monospace';
    ctx.fillText('REC ● SHINJUKU B1F', 256, 270);
    ctx.font = '900 84px serif';
    ctx.fillText('う し ろ', 256, 470);
    ctx.fillStyle = '#cfd8df';
    ctx.font = '600 24px sans-serif';
    ctx.fillText('東西自由通路・改札内を徘徊中', 256, 560);
    ctx.fillText('ライトを消して息を止めろ', 256, 610);
  } else if (stage === 4) {
    ctx.fillStyle = '#38134d';
    ctx.beginPath(); ctx.ellipse(cx, cy, 220, 260, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#cec8be';
    ctx.beginPath(); ctx.ellipse(cx, cy - 10, 155, 118, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#050407';
    ctx.beginPath();
    ctx.arc(cx - 64, cy - 34, 34, 0, Math.PI * 2);
    ctx.arc(cx + 64, cy - 34, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff2228';
    ctx.beginPath();
    ctx.arc(cx - 64, cy - 34, 8, 0, Math.PI * 2);
    ctx.arc(cx + 64, cy - 34, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#050407';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 44, 96, 68, 0, 0, Math.PI);
    ctx.fill();
  } else {
    ctx.fillStyle = stage === 2 ? '#3f1e5a' : '#6a479e';
    ctx.beginPath();
    ctx.ellipse(cx - 78, cy - 170, 34, 96, -0.45, 0, Math.PI * 2);
    ctx.ellipse(cx + 78, cy - 170, 34, 96, 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx, cy + 70, 114, 146, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx, cy - 52, 86, 82, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = stage === 2 ? '#cfc8bc' : '#f2efe8';
    ctx.beginPath();
    ctx.ellipse(cx - 24, cy - 60, 36, 28, -0.12, 0, Math.PI * 2);
    ctx.ellipse(cx + 24, cy - 60, 36, 28, 0.12, 0, Math.PI * 2);
    ctx.ellipse(cx, cy - 34, 54, 34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#09090c';
    ctx.beginPath();
    ctx.arc(cx - 28, cy - 58, stage === 2 ? 13 : 9, 0, Math.PI * 2);
    ctx.arc(cx + 28, cy - 58, stage === 2 ? 13 : 9, 0, Math.PI * 2);
    ctx.fill();
    if (stage >= 1) {
      ctx.fillStyle = stage === 2 ? '#ff2c32' : '#ffffff';
      ctx.beginPath();
      ctx.arc(cx - 28, cy - 58, 3.5, 0, Math.PI * 2);
      ctx.arc(cx + 28, cy - 58, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#07070a';
    ctx.beginPath();
    ctx.ellipse(cx, cy - 22, stage === 2 ? 44 : 32, stage === 2 ? 36 : 20, 0, 0, Math.PI);
    ctx.fill();
  }

  ctx.fillStyle = stage >= 2 ? '#df3636' : '#14181e';
  ctx.font = '800 46px serif';
  const footers = ['紫のうさぎ', '名前を呼んで', 'まだ帰れない', '振り向くな', '逃がさない'];
  ctx.fillText(footers[stage], 256, 845);
  ctx.fillStyle = stage >= 2 ? '#c47a7a' : '#2a3238';
  ctx.font = '700 22px sans-serif';
  const subs = [
    'WELCOME TO SHINJUKU // 東西自由通路',
    '東改札の向こうでお待ちしています',
    '残高 ¥1,000 が足りません',
    'SHINJUKU STATION B1F // 00:47',
    'もう すぐ うしろ',
  ];
  ctx.fillText(subs[stage], 256, 908);

  for (let y = 0; y < 1024; y += 6) {
    ctx.fillStyle = stage >= 2 ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, y, 512, 2);
  }
  return toTex(c, 1, 1, true);
}

function buildPoster(stage: number): THREE.CanvasTexture {
  return buildDigitalSignage(stage === 0 ? 0 : stage === 1 ? 1 : 4);
}

// Authentic JR East Shinjuku Station B1F Guide Board (JR新宿駅 B1F 構内図)
// Matches official JR East B1F floorplan (impress1_jr6_s.jpg, shinjuku_city.pdf, panasonic_pdf.pdf)!
function buildShinjukuGuideBoard(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(768, 576);
  ctx.fillStyle = '#12181e';
  ctx.fillRect(0, 0, 768, 576);
  ctx.strokeStyle = '#80c342';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, 752, 560);

  // JR East green header bar
  ctx.fillStyle = '#146837';
  ctx.fillRect(14, 14, 740, 62);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic 900 32px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('JR', 32, 56);
  ctx.font = '800 28px sans-serif';
  ctx.fillText('新宿駅 B1F 構内案内図   Shinjuku Station B1F Map', 92, 55);

  // 1. North Artery: 東西自由通路 (East-West Free Passage)
  ctx.fillStyle = '#2d4b64';
  ctx.fillRect(54, 102, 660, 92);
  ctx.strokeStyle = '#5ab4e8';
  ctx.lineWidth = 2;
  ctx.strokeRect(54, 102, 660, 92);

  // Shinjuku Wall 456 along North Wall
  ctx.fillStyle = '#24d0e8';
  ctx.fillRect(195, 96, 360, 10);
  ctx.fillStyle = '#9cf4ff';
  ctx.textAlign = 'center';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('新宿ウォール456 (W45.6m LEDビジョン)', 375, 91);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('← 西口広場          東 西 自 由 通 路 (幅員25m)          アルプス広場・東口 →', 384, 142);

  // J・ADビジョン 9 columns
  ctx.fillStyle = '#a478e8';
  for (const px of [118, 158]) {
    ctx.fillRect(px, 122, 14, 14);
    ctx.fillRect(px, 162, 14, 14);
  }
  for (const px of [224, 288, 352, 416, 480]) {
    ctx.fillRect(px, 162, 16, 14);
  }

  // East Exit (歌舞伎町方面 最終出口)
  ctx.fillStyle = '#1e7844';
  ctx.fillRect(636, 108, 74, 80);
  ctx.fillStyle = '#9ef8c0';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('東口出口', 673, 142);
  ctx.fillText('(歌舞伎町)', 673, 162);

  // 2. Gate Line & みどりの窓口・きっぷうりば
  ctx.fillStyle = '#22382c';
  ctx.fillRect(114, 196, 520, 42);
  ctx.fillStyle = '#8ef0b0';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('西改札', 156, 222);
  ctx.fillText('東改札', 572, 222);
  ctx.fillStyle = '#f2f6f0';
  ctx.fillRect(230, 198, 260, 38);
  ctx.fillStyle = '#0d6834';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('きっぷうりば / みどりの窓口 Ticket Office', 360, 222);

  // 3. Inside-Gate Concourse & Platforms 16 -> 7 Stairs
  ctx.fillStyle = '#1f2e26';
  ctx.fillRect(114, 240, 520, 168);

  const plats: Array<[string, string, string, number]> = [
    ['15・16番線', '山手・総武線', '#7ac142', 162],
    ['13・14番線', '山手・総武線', '#f2c700', 262],
    ['11・12番線', '中央線(高尾)', '#f15a22', 362],
    ['9・10番線', '中央線(特急)', '#2888d8', 462],
    ['7・8番線', '中央線(東京)', '#f15a22', 562],
  ];
  for (const [num, name, col, px] of plats) {
    ctx.fillStyle = '#14181c';
    ctx.fillRect(px - 38, 264, 76, 118);
    ctx.fillStyle = col;
    ctx.fillRect(px - 38, 264, 76, 14);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(num, px, 314);
    ctx.fillStyle = '#b8c4cc';
    ctx.font = '600 11px sans-serif';
    ctx.fillText(name, px, 342);
  }

  // 4. South Artery: 中央通路 + 中央西改札 & 中央東改札
  ctx.fillStyle = '#253830';
  ctx.fillRect(54, 410, 660, 74);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 19px sans-serif';
  ctx.fillText('← 中央西改札 (小田急・京王)          中 央 通 路          中央東改札 (ルミネエスト) →', 384, 454);

  // Outer West & East Passages
  ctx.fillStyle = '#24303c';
  ctx.fillRect(54, 196, 46, 214);
  ctx.fillRect(648, 196, 66, 214);

  // Legend at bottom
  ctx.fillStyle = '#4ae0d6';
  ctx.beginPath(); ctx.arc(76, 530, 9, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e8ece6';
  ctx.textAlign = 'left';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('Suicaチャージ機 (全5箇所で ¥1,000 チャージ → 東口非常シャッター解錠)', 98, 536);

  return toTex(c, 1, 1, true);
}

export function createTerminalScreen(zone: string): {
  texture: THREE.CanvasTexture;
  ctx: CanvasRenderingContext2D;
} {
  const [c, ctx] = makeCanvas(512, 384);
  drawTerminalScreen(ctx, zone, false, 0);
  return { texture: toTex(c, 1, 1, true), ctx };
}

export function drawTerminalScreen(
  ctx: CanvasRenderingContext2D,
  zone: string,
  charged: boolean,
  progress: number
): void {
  // Authentic JR East Automatic Ticket/Charge Machine White & Lime-Green Touchscreen UI (Screenshot_20261120-100223.png!)
  ctx.fillStyle = charged ? '#eaf7ee' : '#eef3f0';
  ctx.fillRect(0, 0, 512, 384);

  // Top JR East green status header bar
  ctx.fillStyle = charged ? '#167c3c' : '#1b8e3e';
  ctx.fillRect(0, 0, 512, 56);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.font = '800 24px sans-serif';
  ctx.fillText('Suica チャージ  /  IC Charge', 18, 37);
  ctx.textAlign = 'right';
  ctx.font = '600 15px monospace';
  ctx.fillStyle = '#d6f4dc';
  ctx.fillText('00:47  JR新宿', 494, 35);

  // Left vertical mode tab column (matching user screenshot!)
  const tabs = ['きっぷ', 'チャージ', '履歴印字', 'English'];
  tabs.forEach((label, i) => {
    const ty = 70 + i * 72;
    ctx.fillStyle = i === 1 ? '#209440' : '#d2dad6';
    ctx.fillRect(14, ty, 108, 60);
    ctx.strokeStyle = i === 1 ? '#12642a' : '#96a09a';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(14, ty, 108, 60);
    ctx.fillStyle = i === 1 ? '#ffffff' : '#26302a';
    ctx.textAlign = 'center';
    ctx.font = '700 17px sans-serif';
    ctx.fillText(label, 68, ty + 37);
  });

  // Main right green-bordered content card (exact visual signature of Screenshot_20261120-100223.png!)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(138, 70, 358, 294);
  ctx.strokeStyle = charged ? '#1a8e42' : '#40a848';
  ctx.lineWidth = 6;
  ctx.strokeRect(138, 70, 358, 294);

  ctx.fillStyle = '#526058';
  ctx.textAlign = 'center';
  ctx.font = '600 15px sans-serif';
  ctx.fillText(zone, 317, 102);

  if (charged) {
    ctx.fillStyle = '#157e3a';
    ctx.font = '900 40px sans-serif';
    ctx.fillText('チャージ完了', 317, 196);
    ctx.fillStyle = '#1e3026';
    ctx.font = '700 24px monospace';
    ctx.fillText('+¥200  COMPLETED', 317, 246);
    ctx.fillStyle = '#1d8a42';
    ctx.fillRect(184, 286, 266, 44);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 18px sans-serif';
    ctx.fillText('カードをお取りください', 317, 315);
  } else if (progress > 0) {
    ctx.fillStyle = '#b8760a';
    ctx.font = '800 32px sans-serif';
    ctx.fillText('ICカード書込中…', 317, 174);
    ctx.fillStyle = '#dce4e0';
    ctx.fillRect(168, 206, 298, 34);
    ctx.fillStyle = '#22a64c';
    ctx.fillRect(172, 210, Math.round(290 * Math.min(1, progress)), 26);
    ctx.fillStyle = '#1c2822';
    ctx.font = '800 24px monospace';
    ctx.fillText(`${Math.round(progress * 100)}%`, 317, 284);
    ctx.fillStyle = '#c43228';
    ctx.font = '700 15px sans-serif';
    ctx.fillText('カードを抜かないでください', 317, 326);
  } else {
    // Official red/gold IC mark + green Suica card illustration inside main box!
    drawICBadge(ctx, 186, 126, 76, 52);
    // Mini Suica card
    ctx.fillStyle = '#84cc3c';
    ctx.fillRect(284, 124, 96, 58);
    ctx.fillStyle = '#e8ece6';
    ctx.fillRect(284, 162, 96, 20);
    ctx.fillStyle = '#163618';
    ctx.textAlign = 'left';
    ctx.font = '800 20px sans-serif';
    ctx.fillText('Suica', 294, 152);
    // Mini blue Pasmo/IC card accent
    ctx.fillStyle = '#2486c8';
    ctx.fillRect(392, 128, 62, 50);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 13px sans-serif';
    ctx.fillText('IC', 416, 158);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#14201a';
    ctx.font = '800 26px sans-serif';
    ctx.fillText('Suicaをホルダーへ入れてください', 317, 232);

    ctx.fillStyle = '#1d923c';
    ctx.fillRect(176, 260, 282, 54);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 24px sans-serif';
    ctx.fillText('¥200 チャージ（長押し）', 317, 296);

    ctx.fillStyle = '#56645c';
    ctx.font = '600 14px sans-serif';
    ctx.fillText('HOLD [E] / 操作長押しでICチャージ', 317, 344);
  }
}

export function createGateDisplay(ready: boolean): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 128);
  ctx.fillStyle = '#101418';
  ctx.fillRect(0, 0, 256, 128);
  ctx.strokeStyle = ready ? '#2ed87c' : '#d63333';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 244, 116);
  ctx.textAlign = 'center';
  ctx.fillStyle = ready ? '#48f296' : '#f24a4a';
  ctx.font = '700 28px sans-serif';
  ctx.fillText(ready ? '→ 東口シャッター 解錠OK' : '× 残高不足 (¥1,000必要)', 128, 56);
  ctx.fillStyle = '#d7dad8';
  ctx.font = '600 16px sans-serif';
  ctx.fillText(ready ? 'ICタッチで地上出口(歌舞伎町)へ' : '新宿駅構内5か所でチャージ必要', 128, 96);
  return toTex(c, 1, 1, true);
}

// Authentic 5-Column JR East Shinjuku LED Departure Board (発車標 matching shinjuku_tr_9B178FCD.jpeg!)
export function createDepartureBoard(): {
  texture: THREE.CanvasTexture;
  ctx: CanvasRenderingContext2D;
} {
  const [c, ctx] = makeCanvas(1024, 224);
  updateDepartureBoard(ctx, 0, 0, false);
  return { texture: toTex(c, 1, 1, true), ctx };
}

export function updateDepartureBoard(
  ctx: CanvasRenderingContext2D,
  charges: number,
  elapsed: number,
  exitReady: boolean
): void {
  ctx.fillStyle = '#161a1e';
  ctx.fillRect(0, 0, 1024, 224);
  ctx.strokeStyle = '#383e44';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 1018, 218);

  const cols: Array<{ line: string; sub: string; color: string; trackA: string; trackB: string }> = [
    { line: '中央・総武線(各停)', sub: '水道橋・秋葉原・三鷹', color: '#e8be00', trackA: '各停 00:14 千葉 13', trackB: '各停 00:16 三鷹 16' },
    { line: '中央線(快速)', sub: '四ツ谷・東京・高尾', color: '#eb5a1e', trackA: '快速 00:14 東京  8', trackB: '快速 00:17 高尾 12' },
    { line: '中央本線(特急)', sub: '甲府・松本・河口湖', color: '#0074be', trackA: 'かいじ 終電終了  9', trackB: 'あずさ 終電終了 10' },
    { line: '山手線', sub: '渋谷・品川・池袋・上野', color: '#6fba2c', trackA: '内回り 00:15 品川 14', trackB: '外回り 00:15 池袋 15' },
  ];

  const blink = Math.sin(elapsed * 4.5) > 0;
  const glitch = charges >= 2 && Math.sin(elapsed * 17.3) > 0.72;

  cols.forEach((col, idx) => {
    const x0 = 12 + idx * 252;
    ctx.fillStyle = '#0a0c0e';
    ctx.fillRect(x0, 12, 242, 200);
    ctx.strokeStyle = '#2c3238';
    ctx.lineWidth = 3;
    ctx.strokeRect(x0, 12, 242, 200);

    // Line color header bar (matching shinjuku_tr_9B178FCD.jpeg!)
    ctx.fillStyle = '#242a30';
    ctx.fillRect(x0 + 4, 16, 234, 48);
    ctx.fillStyle = col.color;
    ctx.fillRect(x0 + 8, 22, 14, 36);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.font = 'bold 17px sans-serif';
    ctx.fillText(col.line, x0 + 28, 38);
    ctx.fillStyle = '#b4bec6';
    ctx.font = '600 12px sans-serif';
    ctx.fillText(col.sub, x0 + 28, 56);

    ctx.font = '700 20px monospace';
    if (exitReady) {
      ctx.fillStyle = blink ? '#46f28a' : '#289a56';
      ctx.fillText('東口 非常解錠OK', x0 + 16, 112);
      ctx.fillStyle = '#f0c440';
      ctx.fillText('歌舞伎町出口へ!', x0 + 16, 168);
    } else if (glitch || charges >= 4) {
      ctx.fillStyle = '#ff3434';
      ctx.fillText('00:47 うしろにいる', x0 + 14, 112);
      ctx.fillStyle = blink ? '#ff5834' : '#a82222';
      ctx.fillText('00:47 逃げられない', x0 + 14, 168);
    } else if (charges >= 2) {
      ctx.fillStyle = '#f2a434';
      ctx.fillText(col.trackA, x0 + 14, 112);
      ctx.fillStyle = '#e84838';
      ctx.fillText(`回送  残${5 - charges}箇所`, x0 + 14, 168);
    } else {
      ctx.fillStyle = '#4ad87a';
      ctx.fillText(col.trackA, x0 + 14, 112);
      ctx.fillStyle = '#f0a638';
      ctx.fillText(col.trackB, x0 + 14, 168);
    }
  });

  // LED scanlines
  ctx.fillStyle = 'rgba(0,0,0,0.34)';
  for (let y = 66; y < 208; y += 4) ctx.fillRect(12, y, 1000, 1);
}

function buildPuddleAlpha(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 256);
  ctx.clearRect(0, 0, 256, 256);
  const blobs = [
    [128, 128, 72],
    [88, 114, 52],
    [166, 138, 56],
    [122, 82, 46],
    [144, 174, 44],
    [76, 148, 36],
  ];
  for (const [x, y, r] of blobs) {
    const g = ctx.createRadialGradient(x, y, r * 0.25, x, y, r);
    g.addColorStop(0, 'rgba(255,255,255,0.92)');
    g.addColorStop(0.68, 'rgba(255,255,255,0.72)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function buildRippleRing(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(128, 128);
  ctx.clearRect(0, 0, 128, 128);
  ctx.strokeStyle = 'rgba(215,240,245,0.92)';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(64, 64, 50, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = 'rgba(180,218,226,0.48)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(64, 64, 34, 0, Math.PI * 2); ctx.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function buildSoftLightShaft(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(128, 128);
  const g = ctx.createRadialGradient(64, 24, 6, 64, 72, 62);
  g.addColorStop(0.0, 'rgba(225,245,242,0.22)');
  g.addColorStop(0.35, 'rgba(185,222,220,0.08)');
  g.addColorStop(0.75, 'rgba(160,200,204,0.02)');
  g.addColorStop(1.0, 'rgba(160,200,204,0.0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

// Moody 00:47 Midnight Shinjuku Station PMREM reflection cube (eliminates harsh ceiling whiteout reflections!)
export function createShinjukuEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x0b1016);

  const shell = new THREE.Mesh(
    new THREE.BoxGeometry(28, 10, 24),
    new THREE.MeshBasicMaterial({ color: 0x131920, side: THREE.BackSide })
  );
  envScene.add(shell);

  // Subdued midnight ceiling bounce + soft recessed LED pinpoints
  const ceilBounce = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 20),
    new THREE.MeshBasicMaterial({ color: 0x2c3238, side: THREE.DoubleSide })
  );
  ceilBounce.position.set(0, 4.85, 0);
  ceilBounce.rotation.x = Math.PI / 2;
  envScene.add(ceilBounce);

  const discGeo = new THREE.CircleGeometry(0.28, 10);
  const discMat = new THREE.MeshBasicMaterial({ color: 0x9aaab4, side: THREE.DoubleSide });
  for (const x of [-8, 0, 8]) {
    for (const z of [-4, 4]) {
      const d = new THREE.Mesh(discGeo, discMat);
      d.position.set(x, 4.78, z);
      d.rotation.x = Math.PI / 2;
      envScene.add(d);
    }
  }

  // Soft muted midnight glow bands from Wall 456, J・ADビジョン, and JR gates
  const bands: Array<[number, number, number, number, number, number, number]> = [
    [0, 1.8, -11.5, 18.0, 2.2, 0x1a5878, 0],
    [0, 3.6, -11.2, 20.0, 0.35, 0x245494, 0],
    [0, 1.8, 11.5, 14.0, 2.4, 0x1a3e78, Math.PI],
    [13.5, 1.8, 0, 6.0, 1.8, 0x165e34, -Math.PI / 2],
    [-13.5, 1.8, 0, 6.0, 1.8, 0x165e34, Math.PI / 2],
  ];
  for (const [x, y, z, w, h, col, ry] of bands) {
    const p = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide })
    );
    p.position.set(x, y, z);
    p.rotation.y = ry;
    envScene.add(p);
  }

  const target = pmrem.fromScene(envScene, 0.045);
  pmrem.dispose();
  return target.texture;
}
