import * as THREE from 'three';

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  return [c, ctx];
}

function toTex(
  canvas: HTMLCanvasElement,
  repX = 1,
  repY = 1,
  srgb = true
): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repX, repY);
  tex.anisotropy = 8;
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function heightToNormal(
  canvas: HTMLCanvasElement,
  strength: number,
  repX = 1,
  repY = 1
): THREE.CanvasTexture {
  const w = canvas.width;
  const h = canvas.height;
  const src = canvas.getContext('2d')!.getImageData(0, 0, w, h).data;
  const [out, outCtx] = makeCanvas(w, h);
  const img = outCtx.createImageData(w, h);
  const dst = img.data;
  const sample = (x: number, y: number) => {
    const wx = ((x % w) + w) % w;
    const wy = ((y % h) + h) % h;
    return src[(wy * w + wx) * 4] / 255;
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const tl = sample(x - 1, y - 1);
      const t = sample(x, y - 1);
      const tr = sample(x + 1, y - 1);
      const l = sample(x - 1, y);
      const r = sample(x + 1, y);
      const bl = sample(x - 1, y + 1);
      const b = sample(x, y + 1);
      const br = sample(x + 1, y + 1);
      const dx = (tr + 2 * r + br - (tl + 2 * l + bl)) * strength;
      const dy = (bl + 2 * b + br - (tl + 2 * t + tr)) * strength;
      const dz = 1.0;
      const inv = 1 / Math.sqrt(dx * dx + dy * dy + dz * dz);
      const idx = (y * w + x) * 4;
      dst[idx] = Math.round((-dx * inv * 0.5 + 0.5) * 255);
      dst[idx + 1] = Math.round((-dy * inv * 0.5 + 0.5) * 255);
      dst[idx + 2] = Math.round((dz * inv * 0.5 + 0.5) * 255);
      dst[idx + 3] = 255;
    }
  }
  outCtx.putImageData(img, 0, 0);
  return toTex(out, repX, repY, false);
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
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
  stationMap: THREE.CanvasTexture;
  signageStages: THREE.CanvasTexture[];
  posterStages: THREE.CanvasTexture[];
  signEastExit: THREE.CanvasTexture;
  signWestPassage: THREE.CanvasTexture;
  signCentralEast: THREE.CanvasTexture;
  signMetroPromenade: THREE.CanvasTexture;
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
    stationMap: buildShinjukuGuideBoard(),
    signageStages: [0, 1, 2, 3, 4].map((s) => buildDigitalSignage(s)),
    posterStages: [0, 1, 2].map((s) => buildPoster(s)),
    signEastExit: buildJRSign(
      '↑ 東改札・地上出口（歌舞伎町）',
      'East Gate · Kabukicho / Alta EXIT',
      '#102d1e',
      '#e4f7ea',
      ['#80c342', '#e8c42c']
    ),
    signWestPassage: buildJRSign(
      '← 西口 / 小田急線・京王線・都庁',
      'West Exit · Odakyu / Keio / Coin Lockers',
      '#131b24',
      '#eceee8',
      ['#008ed6', '#dd0077']
    ),
    signCentralEast: buildJRSign(
      '中央東口 / ルミネエスト・NewDays →',
      'Central East · LUMINE EST / Station Office',
      '#131b24',
      '#eceee8',
      ['#80c342', '#f15a22']
    ),
    signMetroPromenade: buildJRSign(
      '↓ B1F メトロプロムナード / 丸ノ内線 M08',
      'Metro Promenade · Marunouchi Line / South Exit',
      '#1b1518',
      '#f0ece8',
      ['#f62e36', '#d8a62a']
    ),
    signYamanote: buildPlatformSign('14・15', '山手線', 'Yamanote Line（渋谷・品川方面）', '#80c342'),
    signChuo: buildPlatformSign('7・8', '中央線快速', 'Chuo Line Rapid（東京方面）', '#f15a22'),
    signStationName: buildShinjukuNameplate(),
    signWarning: buildLastTrainWarning(),
    signEmergencyExit: buildEmergencyExit(),
    signPhotoBooth: buildPhotoBoothHeader(),
    signPayphone: buildPayphoneSign(),
    pedestalPlaque: buildPedestalPlaque(),
    wetFloorSign: buildWetFloorSign(),
    clockFace: buildStationClock(),
    graffitiDonotLook: buildGraffiti('見 る な', 'う し ろ に い る'),
    graffitiSound: buildGraffiti('息 を 止 め ろ', '新宿駅から出られない'),
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

// Authentic Shinjuku underground honed stone/tile panels + JR green/stainless belt + baseboard
function buildShinjukuWall() {
  const [c, ctx] = makeCanvas(1024, 1024);
  const [nC, nCtx] = makeCanvas(512, 512);
  const [rC, rCtx] = makeCanvas(512, 512);
  const rnd = mulberry32(1017);

  ctx.fillStyle = '#9c988c';
  ctx.fillRect(0, 0, 1024, 1024);
  nCtx.fillStyle = '#d4d4d4';
  nCtx.fillRect(0, 0, 512, 512);
  rCtx.fillStyle = '#9e9e9e';
  rCtx.fillRect(0, 0, 512, 512);

  const pw = 128;
  const ph = 64;
  for (let y = 0; y < 1024; y += ph) {
    for (let x = 0; x < 1024; x += pw) {
      const jitter = Math.floor((rnd() - 0.5) * 18);
      const warm = Math.floor((rnd() - 0.5) * 8);
      const isBand = y >= 448 && y < 512;
      const isBase = y >= 896;

      let r = 176 + jitter + warm;
      let g = 172 + jitter;
      let b = 158 + jitter - warm;
      if (isBand) {
        // Subtle dark slate/JR-green architectural accent trim
        r = 44 + jitter * 0.5;
        g = 56 + jitter * 0.5;
        b = 50 + jitter * 0.5;
      } else if (isBase) {
        // Brushed dark stainless steel kickplate
        r = 52 + jitter * 0.5;
        g = 55 + jitter * 0.5;
        b = 59 + jitter * 0.5;
      }

      const grad = ctx.createLinearGradient(x, y + 2, x, y + ph - 2);
      grad.addColorStop(0, `rgb(${Math.min(255, r + 8)},${Math.min(255, g + 8)},${Math.min(255, b + 7)})`);
      grad.addColorStop(0.5, `rgb(${r},${g},${b})`);
      grad.addColorStop(1, `rgb(${Math.max(0, r - 10)},${Math.max(0, g - 10)},${Math.max(0, b - 9)})`);
      ctx.fillStyle = grad;
      ctx.fillRect(x + 2, y + 2, pw - 4, ph - 4);

      const rough = isBase ? 58 + rnd() * 28 : 96 + rnd() * 48;
      rCtx.fillStyle = `rgb(${rough | 0},${rough | 0},${rough | 0})`;
      rCtx.fillRect(x / 2 + 1, y / 2 + 1, pw / 2 - 2, ph / 2 - 2);

      const hVal = 208 + (rnd() - 0.5) * 26;
      nCtx.fillStyle = `rgb(${hVal | 0},${hVal | 0},${hVal | 0})`;
      nCtx.fillRect(x / 2 + 1, y / 2 + 1, pw / 2 - 2, ph / 2 - 2);

      // Subtle hairline stone cracks
      if (!isBase && rnd() < 0.065) {
        const cx0 = x + 14 + rnd() * (pw - 28);
        const cx1 = cx0 + (rnd() - 0.5) * 32;
        ctx.strokeStyle = 'rgba(26,28,26,0.45)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(cx0, y + 3);
        ctx.lineTo((cx0 + cx1) * 0.5 + (rnd() - 0.5) * 8, y + ph * 0.5);
        ctx.lineTo(cx1, y + ph - 3);
        ctx.stroke();
      }
    }
  }

  // Tile grout lines
  ctx.strokeStyle = 'rgba(22,24,22,0.82)';
  ctx.lineWidth = 3.5;
  nCtx.strokeStyle = '#1a1a1a';
  nCtx.lineWidth = 2.5;
  rCtx.strokeStyle = '#efefef';
  rCtx.lineWidth = 2.5;
  for (let y = 0; y <= 1024; y += ph) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
    nCtx.beginPath(); nCtx.moveTo(0, y / 2); nCtx.lineTo(512, y / 2); nCtx.stroke();
    rCtx.beginPath(); rCtx.moveTo(0, y / 2); rCtx.lineTo(512, y / 2); rCtx.stroke();
  }
  for (let x = 0; x <= 1024; x += pw) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke();
    nCtx.beginPath(); nCtx.moveTo(x / 2, 0); nCtx.lineTo(x / 2, 512); nCtx.stroke();
    rCtx.beginPath(); rCtx.moveTo(x / 2, 0); rCtx.lineTo(x / 2, 512); rCtx.stroke();
  }

  // Subtle top/bottom ambient occlusion & groundwater seepage streaks
  const topAO = ctx.createLinearGradient(0, 0, 0, 260);
  topAO.addColorStop(0, 'rgba(10,14,13,0.68)');
  topAO.addColorStop(1, 'rgba(10,14,13,0)');
  ctx.fillStyle = topAO;
  ctx.fillRect(0, 0, 1024, 260);

  const botAO = ctx.createLinearGradient(0, 760, 0, 1024);
  botAO.addColorStop(0, 'rgba(8,10,9,0)');
  botAO.addColorStop(1, 'rgba(6,8,7,0.74)');
  ctx.fillStyle = botAO;
  ctx.fillRect(0, 760, 1024, 264);

  for (let i = 0; i < 36; i++) {
    const sx = rnd() * 1024;
    const sh = 120 + rnd() * 520;
    const sw = 3 + rnd() * 10;
    const rust = rnd() < 0.32;
    const g = ctx.createLinearGradient(sx, 0, sx, sh);
    g.addColorStop(0, rust ? 'rgba(68,38,18,0.38)' : 'rgba(16,22,20,0.34)');
    g.addColorStop(1, 'rgba(16,22,20,0)');
    ctx.fillStyle = g;
    ctx.fillRect(sx, 0, sw, sh);
    rCtx.fillStyle = 'rgba(26,26,26,0.58)';
    rCtx.fillRect(sx / 2, 0, Math.max(1.5, sw / 2), sh / 2);
  }

  for (let i = 0; i < 3800; i++) {
    ctx.fillStyle = `rgba(18,20,18,${rnd() * 0.11})`;
    ctx.fillRect(rnd() * 1024, rnd() * 1024, 2, 2);
  }

  return {
    color: toTex(c, 1, 1, true),
    normal: heightToNormal(nC, 2.4, 1, 1),
    roughness: toTex(rC, 1, 1, false),
  };
}

// Shinjuku polished stainless steel + granite column cladding
function buildPillarMetal(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 1024);
  const rnd = mulberry32(2044);
  ctx.fillStyle = '#4e545c';
  ctx.fillRect(0, 0, 512, 1024);

  // Horizontal brushed satin steel panels
  for (let y = 0; y < 1024; y += 128) {
    const d = Math.floor((rnd() - 0.5) * 14);
    const g = ctx.createLinearGradient(0, y, 512, y);
    g.addColorStop(0, `rgb(${70 + d},${74 + d},${80 + d})`);
    g.addColorStop(0.5, `rgb(${98 + d},${102 + d},${108 + d})`);
    g.addColorStop(1, `rgb(${68 + d},${72 + d},${78 + d})`);
    ctx.fillStyle = g;
    ctx.fillRect(2, y + 2, 508, 124);
    ctx.strokeStyle = 'rgba(14,16,19,0.75)';
    ctx.lineWidth = 3;
    ctx.strokeRect(1.5, y + 1.5, 509, 125);
  }
  // Fine brushed streaks
  for (let i = 0; i < 1200; i++) {
    ctx.fillStyle = `rgba(255,255,255,${rnd() * 0.045})`;
    ctx.fillRect(0, rnd() * 1024, 512, 1);
  }
  // JR East Shinjuku green + charcoal bottom trim
  ctx.fillStyle = '#1b1f23';
  ctx.fillRect(0, 900, 512, 124);
  ctx.fillStyle = '#5fa032';
  ctx.fillRect(0, 886, 512, 14);
  return toTex(c, 1, 1, true);
}

// High-detail polished Shinjuku granite terrazzo floor with realistic wet specular patches
function buildShinjukuTerrazzo() {
  const [c, ctx] = makeCanvas(1024, 1024);
  const [nC, nCtx] = makeCanvas(512, 512);
  const [rC, rCtx] = makeCanvas(512, 512);
  const rnd = mulberry32(3088);

  ctx.fillStyle = '#52565c';
  ctx.fillRect(0, 0, 1024, 1024);
  nCtx.fillStyle = '#d4d4d4';
  nCtx.fillRect(0, 0, 512, 512);
  rCtx.fillStyle = '#9a9a9a';
  rCtx.fillRect(0, 0, 512, 512);

  const step = 256;
  for (let y = 0; y < 1024; y += step) {
    for (let x = 0; x < 1024; x += step) {
      const tone = Math.floor((rnd() - 0.5) * 16);
      ctx.fillStyle = `rgb(${84 + tone},${87 + tone},${92 + tone})`;
      ctx.fillRect(x + 3, y + 3, step - 6, step - 6);

      const hv = 212 + (rnd() - 0.5) * 18;
      nCtx.fillStyle = `rgb(${hv | 0},${hv | 0},${hv | 0})`;
      nCtx.fillRect(x / 2 + 1.5, y / 2 + 1.5, step / 2 - 3, step / 2 - 3);

      // Waxed polished terrazzo roughness ~0.38–0.58 so overhead JR signs reflect beautifully!
      const rv = 112 + (rnd() - 0.5) * 38;
      rCtx.fillStyle = `rgb(${rv | 0},${rv | 0},${rv | 0})`;
      rCtx.fillRect(x / 2 + 1.5, y / 2 + 1.5, step / 2 - 3, step / 2 - 3);
    }
  }

  // Granite / quartz terrazzo aggregate flecks
  for (let i = 0; i < 11000; i++) {
    const fx = rnd() * 1024;
    const fy = rnd() * 1024;
    const p = rnd();
    const col = p > 0.72 ? 156 : p > 0.36 ? 104 : 42;
    const sz = p > 0.86 ? 3.2 : 1.8;
    ctx.fillStyle = `rgba(${col},${col + 1},${col + 3},${0.22 + rnd() * 0.34})`;
    ctx.fillRect(fx, fy, sz, sz);
  }

  // Rainwater / condensation slick sheen patches (very glossy mirror reflections!)
  for (let i = 0; i < 16; i++) {
    const px = rnd() * 512;
    const py = rnd() * 512;
    const rad = 34 + rnd() * 88;
    const g = rCtx.createRadialGradient(px, py, 6, px, py, rad);
    g.addColorStop(0, 'rgba(10,10,10,0.96)');
    g.addColorStop(0.55, 'rgba(28,28,28,0.82)');
    g.addColorStop(1, 'rgba(140,140,140,0)');
    rCtx.fillStyle = g;
    rCtx.fillRect(px - rad, py - rad, rad * 2, rad * 2);

    const dg = ctx.createRadialGradient(px * 2, py * 2, 12, px * 2, py * 2, rad * 2);
    dg.addColorStop(0, 'rgba(14,18,22,0.34)');
    dg.addColorStop(1, 'rgba(14,18,22,0)');
    ctx.fillStyle = dg;
    ctx.fillRect(px * 2 - rad * 2, py * 2 - rad * 2, rad * 4, rad * 4);
  }

  // Tile seams (subtle recessed bevel to avoid grazing specular aliasing)
  ctx.strokeStyle = 'rgba(16,18,20,0.88)';
  ctx.lineWidth = 4;
  nCtx.strokeStyle = '#9e9e9e';
  nCtx.lineWidth = 1.6;
  rCtx.strokeStyle = '#ececec';
  rCtx.lineWidth = 2.5;
  for (let i = 0; i <= 1024; i += step) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1024, i); ctx.stroke();
    nCtx.beginPath(); nCtx.moveTo(i / 2, 0); nCtx.lineTo(i / 2, 512); nCtx.stroke();
    nCtx.beginPath(); nCtx.moveTo(0, i / 2); nCtx.lineTo(512, i / 2); nCtx.stroke();
    rCtx.beginPath(); rCtx.moveTo(i / 2, 0); rCtx.lineTo(i / 2, 512); rCtx.stroke();
    rCtx.beginPath(); rCtx.moveTo(0, i / 2); rCtx.lineTo(512, i / 2); rCtx.stroke();
  }

  return {
    color: toTex(c, 15, 13, true),
    normal: heightToNormal(nC, 0.85, 15, 13),
    roughness: toTex(rC, 15, 13, false),
  };
}

// Shinjuku suspended metal louver / grid ceiling
function buildShinjukuCeiling() {
  const [c, ctx] = makeCanvas(512, 512);
  const [nC, nCtx] = makeCanvas(256, 256);
  const rnd = mulberry32(5151);

  ctx.fillStyle = '#1d2024';
  ctx.fillRect(0, 0, 512, 512);
  nCtx.fillStyle = '#808080';
  nCtx.fillRect(0, 0, 256, 256);

  // Anodized louver ribs
  for (let y = 0; y < 512; y += 32) {
    const d = Math.floor((rnd() - 0.5) * 10);
    ctx.fillStyle = `rgb(${44 + d},${48 + d},${52 + d})`;
    ctx.fillRect(0, y + 6, 512, 20);
    ctx.fillStyle = '#121518';
    ctx.fillRect(0, y, 512, 6);
    nCtx.fillStyle = '#e0e0e0';
    nCtx.fillRect(0, y / 2 + 3, 256, 10);
    nCtx.fillStyle = '#181818';
    nCtx.fillRect(0, y / 2, 256, 3);
  }
  // Cross beams
  for (let x = 0; x < 512; x += 128) {
    ctx.fillStyle = '#25292e';
    ctx.fillRect(x, 0, 12, 512);
    nCtx.fillStyle = '#f0f0f0';
    nCtx.fillRect(x / 2, 0, 6, 256);
  }
  for (let i = 0; i < 10; i++) {
    const sx = rnd() * 512;
    const sy = rnd() * 512;
    const r = 30 + rnd() * 70;
    const g = ctx.createRadialGradient(sx, sy, 4, sx, sy, r);
    g.addColorStop(0, 'rgba(10,14,12,0.5)');
    g.addColorStop(1, 'rgba(10,14,12,0)');
    ctx.fillStyle = g;
    ctx.fillRect(sx - r, sy - r, r * 2, r * 2);
  }
  return {
    color: toTex(c, 15, 13, true),
    normal: heightToNormal(nC, 2.2, 15, 13),
  };
}

function buildTactile(dots: boolean): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(128, 128);
  ctx.fillStyle = '#c29820';
  ctx.fillRect(0, 0, 128, 128);
  if (dots) {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const cx = 14 + x * 25;
        const cy = 14 + y * 25;
        ctx.fillStyle = '#876712';
        ctx.beginPath(); ctx.arc(cx + 1.5, cy + 1.5, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#dfb838';
        ctx.beginPath(); ctx.arc(cx, cy, 6.2, 0, Math.PI * 2); ctx.fill();
      }
    }
  } else {
    for (let i = 0; i < 4; i++) {
      const sx = 14 + i * 31;
      ctx.fillStyle = '#876712';
      ctx.fillRect(sx + 2, 6, 11, 116);
      ctx.fillStyle = '#dfb838';
      ctx.fillRect(sx, 6, 10, 116);
    }
  }
  const rnd = mulberry32(606);
  for (let i = 0; i < 240; i++) {
    ctx.fillStyle = `rgba(22,20,16,${rnd() * 0.2})`;
    ctx.fillRect(rnd() * 128, rnd() * 128, 3, 2);
  }
  ctx.strokeStyle = 'rgba(28,22,8,0.55)';
  ctx.lineWidth = 3;
  ctx.strokeRect(1.5, 1.5, 125, 125);
  return toTex(c, 1, 1, true);
}

function buildTactileNormal(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(128, 128);
  ctx.fillStyle = '#505050';
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = '#f0f0f0';
  for (let i = 0; i < 4; i++) ctx.fillRect(14 + i * 31, 6, 10, 116);
  return heightToNormal(c, 2.8, 1, 1);
}

function buildSuicaLockers(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 512);
  ctx.fillStyle = '#2c3844';
  ctx.fillRect(0, 0, 256, 512);
  // Header strip
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
      // Occupied red / available green LED
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
  // Corrugated shutter lower area
  for (let y = 112; y < 512; y += 16) {
    const g = ctx.createLinearGradient(0, y, 0, y + 16);
    g.addColorStop(0, '#656c72');
    g.addColorStop(0.5, '#4c5258');
    g.addColorStop(1, '#2e3236');
    ctx.fillStyle = g;
    ctx.fillRect(0, y, 512, 16);
  }
  // Iconic NewDays green/white shop fascia
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
  ctx.fillText('新宿東口店  //  営業時間外 CLOSED', 260, 62);
  // Subtle grime
  ctx.fillStyle = 'rgba(8,10,12,0.28)';
  ctx.fillRect(0, 112, 512, 34);
  return toTex(c, 1, 1, true);
}

function buildAcureVending(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 512);
  ctx.fillStyle = '#d4d6d2';
  ctx.fillRect(0, 0, 256, 512);
  // Top acure brand stripe
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

function buildTicketMachines(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 512);
  ctx.fillStyle = '#252b31';
  ctx.fillRect(0, 0, 512, 512);
  // JR East green ticket machine fascia
  ctx.fillStyle = '#124a2b';
  ctx.fillRect(0, 0, 512, 96);
  ctx.fillStyle = '#80c342';
  ctx.fillRect(0, 86, 512, 10);
  ctx.fillStyle = '#f2f5f2';
  ctx.font = 'bold 34px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('きっぷ・Suica 券売機', 256, 58);

  for (let i = 0; i < 3; i++) {
    const x = 18 + i * 162;
    ctx.fillStyle = '#323a42';
    ctx.fillRect(x, 114, 150, 380);
    // Dark powered-down / error screen
    ctx.fillStyle = i === 1 ? '#1c090b' : '#0b1218';
    ctx.fillRect(x + 14, 134, 122, 118);
    ctx.strokeStyle = '#5a646e';
    ctx.lineWidth = 3;
    ctx.strokeRect(x + 14, 134, 122, 118);
    ctx.fillStyle = i === 1 ? '#e24444' : '#58828e';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(i === 1 ? '取扱中止' : '営業時間外', x + 75, 198);
    ctx.fillStyle = '#181c20';
    ctx.fillRect(x + 20, 272, 110, 44);
    ctx.fillRect(x + 20, 336, 110, 62);
  }
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
  ctx.strokeStyle = 'rgba(255,255,255,0.28)';
  ctx.lineWidth = 5;
  ctx.strokeRect(4, 4, 760, 168);

  // Authentic JR East / Tokyo Metro color stripes along bottom edge
  const sw = 752 / stripes.length;
  stripes.forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.fillRect(8 + i * sw, 154, sw, 14);
  });

  ctx.fillStyle = fg;
  ctx.textAlign = 'center';
  ctx.font = '700 44px sans-serif';
  ctx.fillText(jp, 384, 82);
  ctx.fillStyle = 'rgba(232,238,236,0.82)';
  ctx.font = '600 24px monospace';
  ctx.fillText(en, 384, 128);
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
  // JR East green band + station number badges JY17 / JC05
  ctx.fillStyle = '#20262b';
  ctx.fillRect(0, 0, 512, 14);
  ctx.fillStyle = '#1c6d36';
  ctx.fillRect(0, 114, 512, 26);
  ctx.fillStyle = '#80c342';
  ctx.fillRect(174, 114, 164, 26);

  // JY17 badge
  ctx.strokeStyle = '#80c342';
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 30, 56, 60);
  ctx.fillStyle = '#14171a';
  ctx.textAlign = 'center';
  ctx.font = '800 17px monospace';
  ctx.fillText('JY', 48, 55);
  ctx.font = '900 24px monospace';
  ctx.fillText('17', 48, 82);

  // JC05 badge
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
  ctx.fillText('東改札 非常出口（歌舞伎町）へ', 256, 162);
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
  ctx.font = '700 30px serif';
  ctx.fillText('新宿駅アルプス広場 特設展示台', 256, 74);
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

function buildStationClock(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 256);
  ctx.fillStyle = '#191d22';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = '#ece9dd';
  ctx.beginPath(); ctx.arc(128, 128, 114, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#191c20';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const r0 = i % 3 === 0 ? 84 : 94;
    ctx.lineWidth = i % 3 === 0 ? 6 : 3;
    ctx.beginPath();
    ctx.moveTo(128 + Math.cos(a) * r0, 128 + Math.sin(a) * r0);
    ctx.lineTo(128 + Math.cos(a) * 106, 128 + Math.sin(a) * 106);
    ctx.stroke();
  }
  const hA = ((0 + 47 / 60) / 12) * Math.PI * 2 - Math.PI / 2;
  const mA = (47 / 60) * Math.PI * 2 - Math.PI / 2;
  ctx.strokeStyle = '#141618';
  ctx.lineCap = 'round';
  ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(128, 128); ctx.lineTo(128 + Math.cos(hA) * 56, 128 + Math.sin(hA) * 56); ctx.stroke();
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(128, 128); ctx.lineTo(128 + Math.cos(mA) * 86, 128 + Math.sin(mA) * 86); ctx.stroke();
  ctx.strokeStyle = '#bf2626';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(128, 128); ctx.lineTo(196, 84); ctx.stroke();
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
  ctx.font = '900 56px serif';
  ctx.fillText(line1, 0, -16);
  ctx.fillStyle = 'rgba(116,12,12,0.75)';
  ctx.font = '700 30px serif';
  ctx.fillText(line2, 6, 52);
  ctx.strokeStyle = 'rgba(120,14,14,0.65)';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(-180, 4); ctx.lineTo(188, -2); ctx.stroke();
  for (let x = -140; x <= 140; x += 48) {
    ctx.fillStyle = 'rgba(105,12,12,0.58)';
    ctx.fillRect(x, 4, 3, 28 + Math.abs(x % 35));
  }
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
  const rnd = mulberry32(909);
  for (let i = 0; i < 20; i++) {
    const a = rnd() * Math.PI * 2;
    const d = rnd() * 86;
    ctx.fillStyle = `rgba(0,0,0,${0.03 + rnd() * 0.06})`;
    ctx.beginPath(); ctx.arc(128 + Math.cos(a) * d, 128 + Math.sin(a) * d, 2 + rnd() * 4, 0, Math.PI * 2); ctx.fill();
  }
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
    const v = 116 + Math.floor((rnd() - 0.5) * 28);
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.fillRect(0, y, 256, 1);
  }
  return heightToNormal(c, 1.35, 2, 2);
}

function buildFireHydrant(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 512);
  const rnd = mulberry32(818);
  ctx.fillStyle = '#8e1f22';
  ctx.fillRect(0, 0, 256, 512);
  ctx.strokeStyle = '#380c0d';
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, 240, 496);
  ctx.strokeStyle = '#c85454';
  ctx.lineWidth = 2;
  ctx.strokeRect(18, 18, 220, 476);
  ctx.fillStyle = '#241819';
  ctx.fillRect(28, 28, 200, 118);
  ctx.fillStyle = '#e02d2d';
  ctx.beginPath(); ctx.arc(82, 88, 22, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffa298';
  ctx.beginPath(); ctx.arc(78, 82, 7, 0, Math.PI * 2); ctx.fill();
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
  for (let i = 0; i < 400; i++) {
    ctx.fillStyle = `rgba(12,8,8,${rnd() * 0.14})`;
    ctx.fillRect(rnd() * 256, rnd() * 512, 2, 2);
  }
  return toTex(c, 1, 1, true);
}

function buildFloorGrate() {
  const [c, ctx] = makeCanvas(256, 256);
  const [nC, nCtx] = makeCanvas(128, 128);
  ctx.fillStyle = '#090b0d';
  ctx.fillRect(0, 0, 256, 256);
  nCtx.fillStyle = '#121212';
  nCtx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = '#40474e';
  nCtx.fillStyle = '#e4e4e4';
  ctx.fillRect(0, 0, 256, 16); ctx.fillRect(0, 240, 256, 16);
  ctx.fillRect(0, 0, 16, 256); ctx.fillRect(240, 0, 16, 256);
  nCtx.fillRect(0, 0, 128, 8); nCtx.fillRect(0, 120, 128, 8);
  nCtx.fillRect(0, 0, 8, 128); nCtx.fillRect(120, 0, 8, 128);
  for (let x = 24; x < 236; x += 18) {
    ctx.fillStyle = '#383e44';
    ctx.fillRect(x, 12, 8, 232);
    nCtx.fillStyle = '#d4d4d4';
    nCtx.fillRect(x / 2, 6, 4, 116);
  }
  ctx.fillStyle = '#485056';
  ctx.fillRect(12, 122, 232, 12);
  nCtx.fillStyle = '#eaeaea';
  nCtx.fillRect(6, 61, 116, 6);
  return {
    color: toTex(c, 2, 1, true),
    normal: heightToNormal(nC, 3.0, 2, 1),
  };
}

function buildClawDrag(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 256);
  ctx.clearRect(0, 0, 512, 256);
  const rnd = mulberry32(666);
  const ys = [64, 102, 144, 186];
  ys.forEach((y, i) => {
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(68,14,44,0.78)' : 'rgba(98,12,24,0.68)';
    ctx.lineWidth = 10 + (i === 1 ? 5 : 0);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(42 + i * 8, y);
    ctx.bezierCurveTo(180, y + 8, 310, y + 18, 465 - i * 14, y + 34);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(26,5,16,0.82)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(46 + i * 8, y);
    ctx.bezierCurveTo(182, y + 8, 312, y + 18, 455 - i * 14, y + 33);
    ctx.stroke();
  });
  for (let i = 0; i < 85; i++) {
    ctx.fillStyle = `rgba(82,12,28,${0.18 + rnd() * 0.45})`;
    ctx.beginPath(); ctx.arc(30 + rnd() * 440, 40 + rnd() * 190, 1 + rnd() * 3.5, 0, Math.PI * 2); ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

// High-frequency matted kigurumi fleece normal map for the Purple Rabbit
function buildPlushNormal(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 512);
  const rnd = mulberry32(777);
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);
  // Directional matted plush strands
  for (let i = 0; i < 22000; i++) {
    const x = rnd() * 512;
    const y = rnd() * 512;
    const v = Math.floor(58 + rnd() * 140);
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.fillRect(x, y, 1.3 + rnd() * 1.4, 2.6 + rnd() * 3.2);
  }
  // Damp clumped patches
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
  // Stitched kigurumi seam lines
  ctx.strokeStyle = 'rgba(22,22,22,0.72)';
  ctx.lineWidth = 2.2;
  ctx.setLineDash([7, 4]);
  ctx.beginPath();
  ctx.moveTo(0, 256); ctx.lineTo(512, 256);
  ctx.moveTo(256, 0); ctx.lineTo(256, 512);
  ctx.stroke();
  ctx.setLineDash([]);
  return heightToNormal(c, 2.7, 4, 4);
}

// Soiled / damp mottled fabric albedo texture for uncanny realism on the mascot
function buildRabbitGrime(isFace: boolean): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 512);
  const rnd = mulberry32(isFace ? 912 : 911);
  ctx.fillStyle = isFace ? '#c4beb2' : '#7b4fa8';
  ctx.fillRect(0, 0, 512, 512);
  // Plush micro-tone variation
  for (let i = 0; i < 14000; i++) {
    const x = rnd() * 512;
    const y = rnd() * 512;
    const dark = rnd() > 0.42;
    ctx.fillStyle = isFace
      ? dark ? `rgba(54,48,44,${rnd() * 0.16})` : `rgba(235,232,224,${rnd() * 0.14})`
      : dark ? `rgba(28,14,44,${rnd() * 0.24})` : `rgba(154,112,202,${rnd() * 0.16})`;
    ctx.fillRect(x, y, 2, 3);
  }
  // Subtle damp underground grime smudges
  for (let i = 0; i < 24; i++) {
    const x = rnd() * 512;
    const y = rnd() * 512;
    const r = 24 + rnd() * 72;
    const g = ctx.createRadialGradient(x, y, 4, x, y, r);
    g.addColorStop(0, isFace ? 'rgba(42,36,34,0.22)' : 'rgba(24,10,36,0.34)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  return toTex(c, 2, 2, true);
}

// Iconic Shinjuku Alps Square Digital Signage Column Screen (5 progressive horror stages!)
function buildDigitalSignage(stage: number): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 1024);
  const bgColors = ['#e8e4da', '#c4c0b8', '#1f1626', '#0c1015', '#180507'];
  ctx.fillStyle = bgColors[stage] || '#180507';
  ctx.fillRect(0, 0, 512, 1024);

  // Header bar
  ctx.fillStyle = stage >= 4 ? '#7c0f14' : stage === 3 ? '#1a242c' : stage === 2 ? '#4d1954' : '#1b6d38';
  ctx.fillRect(0, 0, 512, 118);
  ctx.fillStyle = stage >= 3 ? '#f44a4a' : '#f4f2ec';
  ctx.textAlign = 'center';
  ctx.font = '800 32px sans-serif';
  const headers = [
    'JR新宿駅 新マスコット誕生',
    '新宿駅でずっと見てるよ',
    '終電はもう終わったよ',
    'CAM-E04 // TARGET LOCKED',
    'み つ け た',
  ];
  ctx.fillText(headers[stage], 256, 72);

  // Rabbit silhouette / face graphic
  const cx = 256;
  const cy = 480;
  if (stage === 3) {
    // Grainy CCTV corruption screen
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
    ctx.fillText('背後に 2.2m の未確認個体', 256, 560);
    ctx.fillText('ライトを消して逃げてください', 256, 610);
  } else if (stage === 4) {
    // Extreme macro crimson eye terror
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
    // Wide distorted grin
    ctx.fillStyle = '#050407';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 44, 96, 68, 0, 0, Math.PI);
    ctx.fill();
  } else {
    // Full mascot art (progressively unhinging)
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
      ctx.arc(cx - 28, cy - 58, 3, 0, Math.PI * 2);
      ctx.arc(cx + 28, cy - 58, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#07070a';
    ctx.beginPath();
    ctx.ellipse(cx, cy - 22, stage === 2 ? 44 : 32, stage === 2 ? 36 : 20, 0, 0, Math.PI);
    ctx.fill();
  }

  // Footer copy
  ctx.fillStyle = stage >= 2 ? '#df3636' : '#1b1e22';
  ctx.font = '800 46px serif';
  const footers = ['紫のうさぎ', '名前を呼んで', 'まだ帰れない', '振り向くな', '逃がさない'];
  ctx.fillText(footers[stage], 256, 845);
  ctx.fillStyle = stage >= 2 ? '#b46a6a' : '#4a5258';
  ctx.font = '600 22px sans-serif';
  const subs = [
    '新宿駅アルプス広場 特設展示中',
    '東改札の向こうでお待ちしています',
    '残高 ¥1,000 が足りません',
    'SHINJUKU STATION B1F // 00:47',
    'もう すぐ うしろ',
  ];
  ctx.fillText(subs[stage], 256, 908);

  // Subtle LCD scanlines & glitch bars on higher stages
  for (let y = 0; y < 1024; y += 6) {
    ctx.fillStyle = stage >= 2 ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, y, 512, 2);
  }
  if (stage >= 2) {
    const rnd = mulberry32(440 + stage * 31);
    for (let i = 0; i < 14; i++) {
      ctx.fillStyle = stage >= 4 ? 'rgba(200,20,25,0.28)' : 'rgba(160,60,220,0.22)';
      ctx.fillRect(0, rnd() * 1024, 512, 4 + rnd() * 14);
    }
  }
  return toTex(c, 1, 1, true);
}

function buildPoster(stage: number): THREE.CanvasTexture {
  return buildDigitalSignage(stage === 0 ? 0 : stage === 1 ? 1 : 4);
}

function buildShinjukuGuideBoard(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(512, 512);
  ctx.fillStyle = '#12181e';
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = '#80c342';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, 496, 496);
  ctx.fillStyle = '#1b2622';
  ctx.fillRect(14, 14, 484, 58);
  ctx.fillStyle = '#eef2ec';
  ctx.font = '700 25px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('JR新宿駅 B1F 構内案内図', 256, 52);

  // Simplified architectural diagram
  ctx.fillStyle = '#2a343d';
  ctx.fillRect(46, 108, 420, 326);
  ctx.fillStyle = '#175436';
  ctx.fillRect(194, 84, 124, 34);
  ctx.fillStyle = '#a0f5c4';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('↑ 東改札 (歌舞伎町)', 256, 107);

  ctx.fillStyle = '#d4a72c';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('アルプス広場 (展示台)', 256, 256);
  ctx.fillStyle = '#dce2e6';
  ctx.fillText('西口・ロッカー', 105, 190);
  ctx.fillText('公衆電話', 105, 256);
  ctx.fillText('証明写真機', 105, 355);
  ctx.fillText('夜間事務室', 404, 190);
  ctx.fillText('NewDays', 404, 290);
  ctx.fillText('14・15 山手線階段', 256, 355);
  ctx.fillStyle = '#f28b8e';
  ctx.fillText('B1F メトロプロムナード (丸ノ内線 M08)', 256, 412);

  ctx.fillStyle = '#4ad2c8';
  ctx.beginPath(); ctx.arc(70, 468, 8, 0, Math.PI * 2); ctx.fill();
  ctx.textAlign = 'left';
  ctx.fillStyle = '#d7d5cd';
  ctx.font = '600 17px sans-serif';
  ctx.fillText('チャージ機 (全5箇所 → 東改札 非常解錠)', 88, 474);
  return toTex(c, 1, 1, true);
}

export function createTerminalScreen(zone: string): {
  texture: THREE.CanvasTexture;
  ctx: CanvasRenderingContext2D;
} {
  const [c, ctx] = makeCanvas(256, 256);
  drawTerminalScreen(ctx, zone, false, 0);
  return { texture: toTex(c, 1, 1, true), ctx };
}

export function drawTerminalScreen(
  ctx: CanvasRenderingContext2D,
  zone: string,
  charged: boolean,
  progress: number
): void {
  ctx.fillStyle = charged ? '#0c2618' : '#081b22';
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = charged ? '#38d882' : '#42d4ca';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, 240, 240);
  ctx.fillStyle = charged ? '#5ef0a0' : '#7af0e8';
  ctx.textAlign = 'center';
  ctx.font = '700 22px sans-serif';
  ctx.fillText('Suica チャージ機', 128, 48);
  ctx.fillStyle = '#c8d6d8';
  ctx.font = '500 14px sans-serif';
  ctx.fillText(zone, 128, 76);
  if (charged) {
    ctx.fillStyle = '#4be594';
    ctx.font = '700 32px sans-serif';
    ctx.fillText('チャージ完了', 128, 146);
    ctx.font = '600 20px monospace';
    ctx.fillText('+¥200  OK', 128, 186);
  } else if (progress > 0) {
    ctx.fillStyle = '#f2cc52';
    ctx.font = '700 24px sans-serif';
    ctx.fillText('認証中…', 128, 126);
    ctx.fillStyle = '#15343d';
    ctx.fillRect(32, 148, 192, 26);
    ctx.fillStyle = '#4be3d6';
    ctx.fillRect(34, 150, Math.round(188 * Math.min(1, progress)), 22);
    ctx.fillStyle = '#d9ecf0';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`${Math.round(progress * 100)}%`, 128, 202);
  } else {
    ctx.fillStyle = '#e6f7f5';
    ctx.font = '700 25px sans-serif';
    ctx.fillText('ICカードをタッチ', 128, 138);
    ctx.fillStyle = '#57d4cb';
    ctx.font = '700 22px monospace';
    ctx.fillText('¥200 CHARGE', 128, 178);
    ctx.fillStyle = '#8ab3b8';
    ctx.font = '500 14px sans-serif';
    ctx.fillText('長押しでチャージ', 128, 218);
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
  ctx.font = '700 30px sans-serif';
  ctx.fillText(ready ? '→ 東改札 解錠OK' : '× 残高不足', 128, 56);
  ctx.fillStyle = '#d7dad8';
  ctx.font = '600 17px sans-serif';
  ctx.fillText(ready ? 'ICタッチで地上出口へ' : '構内5か所でチャージ必要', 128, 96);
  return toTex(c, 1, 1, true);
}

// Animated JR East Shinjuku LED Departure Board (発車標)
export function createDepartureBoard(): {
  texture: THREE.CanvasTexture;
  ctx: CanvasRenderingContext2D;
} {
  const [c, ctx] = makeCanvas(512, 160);
  updateDepartureBoard(ctx, 0, 0, false);
  return { texture: toTex(c, 1, 1, true), ctx };
}

export function updateDepartureBoard(
  ctx: CanvasRenderingContext2D,
  charges: number,
  elapsed: number,
  exitReady: boolean
): void {
  ctx.fillStyle = '#0a0c0e';
  ctx.fillRect(0, 0, 512, 160);
  ctx.strokeStyle = '#30363c';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 504, 152);

  // Header strip
  ctx.fillStyle = '#18241d';
  ctx.fillRect(8, 8, 496, 32);
  ctx.fillStyle = '#92e88a';
  ctx.font = '700 17px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('JR SHINJUKU // 発車標  14・15 山手線 / 7・8 中央線', 18, 30);

  const blink = Math.sin(elapsed * 4.5) > 0;
  const glitch = charges >= 2 && Math.sin(elapsed * 17.3) > 0.72;

  ctx.font = '700 24px monospace';
  if (exitReady) {
    ctx.fillStyle = blink ? '#46f28a' : '#289a56';
    ctx.fillText('東改札  非常シャッター解錠可能', 22, 84);
    ctx.fillStyle = '#f0c440';
    ctx.fillText('直ちに地上出口（歌舞伎町）へ脱出せよ', 22, 130);
  } else if (glitch || charges >= 4) {
    ctx.fillStyle = '#ff3434';
    ctx.fillText('00:47  ████████   う し ろ に い る', 22, 84);
    ctx.fillStyle = blink ? '#ff5834' : '#a82222';
    ctx.fillText('00:47  新宿駅     逃 げ ら れ な い', 22, 130);
  } else if (charges >= 2) {
    ctx.fillStyle = '#f2a434';
    ctx.fillText('14番線 00:47  回送（乗るな） 展示台 空', 22, 84);
    ctx.fillStyle = '#4ad87a';
    ctx.fillText(`東改札ロック中   チャージ ${charges}/5 完了`, 22, 130);
  } else {
    ctx.fillStyle = '#4ad87a';
    ctx.fillText('14番線 00:15  山手線  終電運行終了', 22, 84);
    ctx.fillStyle = '#f0a638';
    ctx.fillText(' 7番線 00:15  中央線  東改札 閉鎖中', 22, 130);
  }

  // Subtle LED matrix grid dots
  ctx.fillStyle = 'rgba(0,0,0,0.34)';
  for (let y = 40; y < 156; y += 4) ctx.fillRect(8, y, 496, 1);
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

// Soft feathered volumetric haze texture (NO hard cone triangles!)
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

// Rich multi-band PMREM reflection environment mimicking Shinjuku Station fluorescent ceiling,
// backlit JR signs, green/orange line stripes, and glowing digital signage pillars!
export function createShinjukuEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x0b1116);

  const shell = new THREE.Mesh(
    new THREE.BoxGeometry(22, 10, 26),
    new THREE.MeshBasicMaterial({ color: 0x161f26, side: THREE.BackSide })
  );
  envScene.add(shell);

  // Cool Tokyo fluorescent ceiling tube reflections (bright enough to glint off wet puddles!)
  const tubeGeo = new THREE.PlaneGeometry(6.4, 0.42);
  const brightMat = new THREE.MeshBasicMaterial({ color: 0xe6f8f5, side: THREE.DoubleSide });
  const coolMat = new THREE.MeshBasicMaterial({ color: 0x88beb8, side: THREE.DoubleSide });
  for (const x of [-5, 0, 5]) {
    for (const z of [-8, -2.5, 2.5, 8]) {
      const m = new THREE.Mesh(tubeGeo, x === 0 ? brightMat : coolMat);
      m.position.set(x, 4.8, z);
      m.rotation.x = Math.PI / 2;
      envScene.add(m);
    }
  }

  // Colored Shinjuku reflections (JR Yamanote green, Marunouchi red, signage cyan, Kabukicho amber)
  const bands: Array<[number, number, number, number, number, number, number]> = [
    [0, 2.0, -12.5, 5.2, 1.8, 0x3ad876, 0], // East Gate green exit reflection
    [6.5, 1.2, -12.2, 2.2, 2.8, 0x8f44d8, 0], // Signage purple/violet bounce
    [-10.6, 1.4, 2.5, 3.8, 3.2, 0x3ec8dc, Math.PI / 2], // Acure vending cyan glow
    [10.6, 1.4, -2.5, 3.8, 3.0, 0xdd6b28, -Math.PI / 2], // Chuo/emergency amber
    [0, 1.6, 12.5, 4.4, 1.6, 0xd8323c, Math.PI], // Marunouchi red glow
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

  const target = pmrem.fromScene(envScene, 0.03);
  pmrem.dispose();
  return target.texture;
}
