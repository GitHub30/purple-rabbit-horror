export const CELL = 4.0;
export const LOW_CEILING = 3.65;
export const HIGH_CEILING = 4.35;
export const PLAZA_CEILING = 6.2; // Recessed circular rotary skylight atrium in 西口地下広場
export const COLS = 35; // 140m East-West (West Plaza / Odakyu / Keio <-> JR 16..1番線 <-> East Plaza / Lumine Est)
export const ROWS = 23; // 92m North-South (Metro Promenade M08 <-> East-West Free Passage <-> Platforms 1-16 <-> Central Passage & N'EX Tunnel)

// Real-World JR Shinjuku Station B1F + Surrounding Underground Complex Grid
// North = -Z (row 0), South = +Z (row 22), West = -X (col 0), East = +X (col 34)
// 0 = walkable concourse / passage
// 1 = solid architectural wall
// 2 = J・ADビジョン新宿駅 Light-Box Digital Signage Column (10 columns in 東西自由通路 & 西改札前)
// 3 = みどりの窓口 Ticket Office glass storefront partition (blocks movement, transparent LOS)
// 4 = JR新宿駅 1Fホーム連絡階段・エスカレーター (ALL 1〜16番線: 15・16 / 13・14 / 11・12 / 9・10 / 7・8 / 3・4 / 1・2番線)
// 5 = Cylindrical structural concrete/stainless column (西口地下広場大円柱 & メトロプロムナード円柱 & 東口円柱)
// 6 = Private rail / subway glass ticket-gate facade (丸ノ内線 M08 / 小田急線 OH01 / 京王線 KO01 — transparent LOS!)
export const SHINJUKU_GRID: number[][] = [
  // c:0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // R0: 北外壁 (丸ノ内線B2Fホーム境界)
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], // R1: 丸ノ内線西改札M08(9..12) | 丸ノ内線東改札M08(21..24)
  [1, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 1], // R2: 東京メトロ メトロプロムナード北列 (全長132m!)
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // R3: 東京メトロ メトロプロムナード南列
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1], // R4: 南北連絡通路 (西口広場1..5 | 西連絡7 | 東連絡24 | 東口広場31..32)
  [1, 0, 5, 0, 5, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1], // R5: 南面c=9..20が新宿ウォール456(45.6m!) | 西口地下広場大柱
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // R6: 西口地下広場 | 東西自由通路北側(ウォール456前) | アルプス広場 | 東口地上出口(33..34)
  [1, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // R7: 西口ロータリー中央 | 西改札前J・AD北列(7,9) | 東西自由通路中央 | アルプス広場展示台(25.5) | 東口出口
  [1, 0, 5, 0, 5, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0], // R8: 西口大円柱(2,4) | J・ADビジョン光柱列(7,9,11,13,15,17,19,21) | 東口柱(28) | 東口出口
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // R9: 東西自由通路南側 (西改札・きっぷ・みどりの窓口・東改札・ルミネエストB1F前)
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 3, 3, 3, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], // R10: 西口広場(1..5) | 西改札(7..9) | きっぷ(10..12) | みどりの窓口(13..15) | 事務室裏(17) | 東改札(19..21) | ルミネ壁(22..30) | 東口通路(31..33)
  [1, 0, 5, 0, 5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 5, 0, 1], // R11: 西口広場南 | JR改札内北コンコース(7..21) | 東口・ルミネエスト連絡通路(31..33)
  [1, 0, 0, 0, 0, 0, 1, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], // R12: 1Fホーム北階段: 15・16(8) | 13・14(11) | 11・12(14) | 9・10(17) | 7・8(20)
  [1, 6, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], // R13: 小田急西口地下改札(1) | 改札内横断連絡通路(7..29: 1〜4番線エリアへ接続!)
  [1, 6, 0, 0, 0, 0, 1, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 4, 0, 1, 0, 5, 0, 1], // R14: 小田急改札(1) | ホーム階段: 15・16(8)..7・8(20) + 3・4番線(25) + 1・2番線(28)!
  [1, 6, 0, 5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], // R15: 小田急・京王コンコース | JR中央通路北側 (1〜16番線)
  [1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // R16: 中央通路北レーン (小田急/京王 ⇄ 中央西改札6 ⇄ 中央通路7..29 ⇄ 中央東改札30 ⇄ 東口広場)
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // R17: 中央通路中央レーン (全長132m!)
  [1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 1], // R18: 中央通路南レーン (京王西口前 ⇄ 中央西改札 ⇄ 精算・N'EX通路 ⇄ 中央東改札)
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 4, 0, 0, 4, 0, 1, 0, 0, 0, 1], // R19: 京王西口前(1..5) | 証明写真・精算(9..11) | 南口連絡(15..17) | 5・6番線N'EX地下道入口(23) | 3・4(25)&1・2(28)南階段!
  [1, 1, 6, 6, 6, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], // R20: 京王線京王西口改札KO01(2..4) | 精算アルコーブ(9..11) | 5・6 N'EX地下道(23) | 1〜4番線南端折返し(25..29)
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // R21: 5・6番線 成田エクスプレス(N'EX) 地下連絡ホーム入口(22..24)
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // R22: 南外壁 (南口・甲州街道・バスタ新宿境界)
];

export function cellCenter(col: number, row: number): { x: number; z: number } {
  return { x: (col + 0.5) * CELL, z: (row + 0.5) * CELL };
}

export function worldToCell(x: number, z: number): { col: number; row: number } {
  return { col: Math.floor(x / CELL), row: Math.floor(z / CELL) };
}

// High-ceiling zones: 東西自由通路 + アルプス広場 + 東口地下広場 (rows 6..9, cols 6..34)
export function isHighCeiling(col: number, row: number): boolean {
  return col >= 6 && col <= 34 && row >= 6 && row <= 9;
}

// Recessed circular rotary skylight atrium in 新宿西口地下広場 (cols 1..5, rows 5..11)
export function isWestPlazaAtrium(col: number, row: number): boolean {
  return col >= 1 && col <= 5 && row >= 5 && row <= 11;
}

// Real-time Japanese zone name & CCTV camera ID for HUD & Station Map!
export function getShinjukuZone(x: number, z: number): { cam: string; name: string } {
  const col = Math.floor(x / CELL);
  const row = Math.floor(z / CELL);
  if (row <= 3) {
    if (col <= 5) return { cam: 'CAM-W02', name: '西口地下広場・大江戸線新宿西口駅方面' };
    if (col >= 31) return { cam: 'CAM-M09', name: '新宿サブナード・アルタ地下連絡口' };
    return { cam: 'CAM-M08', name: '東京メトロ メトロプロムナード（丸ノ内線 M08）' };
  }
  if (col <= 5) {
    if (row >= 13 && row <= 17) return { cam: 'CAM-OH1', name: '小田急線 西口地下改札コンコース（OH01）' };
    if (row >= 18) return { cam: 'CAM-KO1', name: '京王線 京王西口・百貨店口コンコース（KO01）' };
    return { cam: 'CAM-W01', name: '新宿西口地下広場（ロータリー吹き抜け）' };
  }
  if (row >= 6 && row <= 9) {
    if (col >= 30) return { cam: 'CAM-E01', name: '東口地下広場・歌舞伎町／アルタ地上出口' };
    if (col >= 22) return { cam: 'CAM-E03', name: '東西自由通路・アルプス広場（東口）' };
    return { cam: 'CAM-E04', name: '東西自由通路・新宿ウォール456' };
  }
  if (col >= 31) {
    return { cam: 'CAM-LE1', name: 'ルミネエスト新宿 B1F・NewDays連絡通路' };
  }
  if (row >= 19 && col >= 22 && col <= 24) {
    return { cam: 'CAM-NX5', name: '5・6番線 成田エクスプレス（N\'EX）連絡地下道' };
  }
  if (col >= 23 && row >= 13) {
    return { cam: 'CAM-JS1', name: 'JR改札内 1〜4番線（埼京線・湘南新宿ライン）' };
  }
  if (row >= 16) {
    if (col <= 11) return { cam: 'CAM-CW1', name: '中央通路・中央西改札（小田急・京王連絡）' };
    if (col >= 25) return { cam: 'CAM-CE1', name: '中央通路・中央東改札（ルミネエスト方面）' };
    return { cam: 'CAM-C02', name: 'JR改札内 中央通路（全1〜16番線連絡）' };
  }
  if (col <= 12) return { cam: 'CAM-P14', name: 'JR改札内 13〜16番線（山手線・総武線）' };
  return { cam: 'CAM-P08', name: 'JR改札内 7〜12番線（中央快速・中央特急）' };
}

// Player spawns in 東西自由通路 looking East (+X, yaw = -Math.PI/2) down the 100m iconic corridor:
// Left: 45.6m 新宿ウォール456 | Right: J・ADビジョン columns, きっぷうりば & みどりの窓口 | Ahead: アルプス広場 & 東口出口
export const PLAYER_SPAWN = { x: 11.8 * CELL, z: 7.35 * CELL, yaw: -Math.PI / 2 };
export const PEDESTAL_POS = { x: 25.5 * CELL, z: 7.35 * CELL };
export const RABBIT_INTRO_POS = { x: 28.4 * CELL, z: 7.35 * CELL, rotY: -Math.PI / 2 };

// Final Escape Exit Gate & Shutter at the East end of 東西自由通路 (東口・歌舞伎町／アルタ方面 地上出口)
export const GATE_LINE_X = 32.85 * CELL; // x = 131.4m
export const GATE_LINE_Z = 7.5 * CELL; // z = 30.0m (center of East Exit portal)
export const EXIT_GATE_INTERACT = { x: 32.4 * CELL, z: 7.5 * CELL };
export const VICTORY_X = 33.45 * CELL; // x > 133.8m triggers Victory
export const VICTORY_Z = 7.5 * CELL;

// Shinjuku Wall 456 span along the North wall of 東西自由通路 (z = 24.06m, x = 36.0m .. 81.6m = EXACT 45.6m!)
export const WALL_456_SPAN = {
  xStart: 9.0 * CELL,
  xEnd: 20.4 * CELL,
  z: 6.0 * CELL + 0.06,
  height: 1.72,
  centerY: 1.32,
};

export const PHOTOBOOTH_POS = { x: 10.5 * CELL, z: 20.5 * CELL };
export const PAYPHONE_POS = { x: 1.0 * CELL + 0.52, z: 12.2 * CELL };

export interface PlatformStairDef {
  id: string;
  col: number;
  northRow: number;
  southRow: number;
  numLeft: string;
  numRight: string;
  titleLeft: string;
  subLeft: string;
  colorLeft: string;
  badgeLeft: string;
  titleRight: string;
  subRight: string;
  colorRight: string;
  badgeRight: string;
  glowColor: number;
}

// Authentic West-to-East platform stairs of JR Shinjuku Station B1F (ALL 16番線 -> 1番線!)
export const PLATFORM_STAIRS: PlatformStairDef[] = [
  {
    id: 'plat-15-16',
    col: 8,
    northRow: 12,
    southRow: 14,
    numLeft: '16',
    numRight: '15',
    titleLeft: '中央・総武線 (各駅停車)',
    subLeft: '中野・三鷹方面  Chuo-Sobu Line',
    colorLeft: '#e8be00',
    badgeLeft: 'JB',
    titleRight: '山手線 (外回り)',
    subRight: '池袋・上野方面  Yamanote Line',
    colorRight: '#6fba2c',
    badgeRight: 'JY',
    glowColor: 0x72c838,
  },
  {
    id: 'plat-13-14',
    col: 11,
    northRow: 12,
    southRow: 14,
    numLeft: '14',
    numRight: '13',
    titleLeft: '山手線 (内回り)',
    subLeft: '渋谷・品川方面  Yamanote Line',
    colorLeft: '#6fba2c',
    badgeLeft: 'JY',
    titleRight: '中央・総武線 (各駅停車)',
    subRight: '水道橋・秋葉原・千葉方面',
    colorRight: '#e8be00',
    badgeRight: 'JB',
    glowColor: 0x6fba2c,
  },
  {
    id: 'plat-11-12',
    col: 14,
    northRow: 12,
    southRow: 14,
    numLeft: '12',
    numRight: '11',
    titleLeft: '中央線 (快速)',
    subLeft: '中野・立川・高尾方面  Chuo Line',
    colorLeft: '#eb5a1e',
    badgeLeft: 'JC',
    titleRight: '中央線 (快速・青梅線)',
    subRight: '立川・八王子・青梅方面',
    colorRight: '#eb5a1e',
    badgeRight: 'JC',
    glowColor: 0xe66224,
  },
  {
    id: 'plat-9-10',
    col: 17,
    northRow: 12,
    southRow: 14,
    numLeft: '10',
    numRight: '9',
    titleLeft: '中央本線 (特急)',
    subLeft: 'あずさ・かいじ・富士回遊',
    colorLeft: '#0074be',
    badgeLeft: 'JC',
    titleRight: '中央本線 (特急)',
    subRight: '甲府・松本・河口湖方面',
    colorRight: '#0074be',
    badgeRight: 'JC',
    glowColor: 0x2888d8,
  },
  {
    id: 'plat-7-8',
    col: 20,
    northRow: 12,
    southRow: 14,
    numLeft: '8',
    numRight: '7',
    titleLeft: '中央線 (快速)',
    subLeft: '四ツ谷・御茶ノ水・東京方面',
    colorLeft: '#eb5a1e',
    badgeLeft: 'JC',
    titleRight: '中央線 (快速)',
    subRight: '御茶ノ水・東京方面  Chuo Line',
    colorRight: '#eb5a1e',
    badgeRight: 'JC',
    glowColor: 0xe66224,
  },
  {
    id: 'plat-3-4',
    col: 25,
    northRow: 14,
    southRow: 19,
    numLeft: '4',
    numRight: '3',
    titleLeft: '埼京線・湘南新宿ライン',
    subLeft: '池袋・赤羽・大宮・宇都宮方面',
    colorLeft: '#00ac9a',
    badgeLeft: 'JA',
    titleRight: '湘南新宿ライン (北行)',
    subRight: '池袋・大宮・高崎方面  Shonan-Shinjuku',
    colorRight: '#e21f26',
    badgeRight: 'JS',
    glowColor: 0x16a89a,
  },
  {
    id: 'plat-1-2',
    col: 28,
    northRow: 14,
    southRow: 19,
    numLeft: '2',
    numRight: '1',
    titleLeft: '埼京線 (南行)',
    subLeft: '渋谷・大崎・新木場・海老名方面',
    colorLeft: '#00ac9a',
    badgeLeft: 'JA',
    titleRight: '湘南新宿ライン (南行)',
    subRight: '渋谷・横浜・大船・小田原方面',
    colorRight: '#e21f26',
    badgeRight: 'JS',
    glowColor: 0xd83236,
  },
];

export interface TerminalDef {
  id: string;
  name: string;
  zone: string;
  x: number;
  z: number;
  rotY: number;
}

// 5 Suica Charge Terminals spanning ALL 5 iconic real-world wings of Shinjuku Station B1F!
export const TERMINALS: TerminalDef[] = [
  {
    id: 'term-midori',
    name: 'チャージ機 #01',
    zone: '東西自由通路・地下みどりの窓口横 きっぷうりば',
    x: 11.5 * CELL,
    z: 10.0 * CELL - 0.44,
    rotY: Math.PI,
  },
  {
    id: 'term-metro',
    name: 'チャージ機 #02',
    zone: '東京メトロ メトロプロムナード・丸ノ内線M08改札前',
    x: 16.5 * CELL,
    z: 2.0 * CELL + 0.44,
    rotY: 0,
  },
  {
    id: 'term-west-odakyu',
    name: 'チャージ機 #03',
    zone: '西口地下広場・小田急線／京王線連絡コンコース',
    x: 5.95 * CELL - 0.38,
    z: 14.5 * CELL,
    rotY: -Math.PI / 2,
  },
  {
    id: 'term-inside-14',
    name: 'チャージ機 #04',
    zone: 'JR改札内コンコース・13/14番線階段横 のりこし精算所',
    x: 11.5 * CELL,
    z: 11.0 * CELL + 0.44,
    rotY: 0,
  },
  {
    id: 'term-saikyo-nex',
    name: 'チャージ機 #05',
    zone: '中央通路東・1〜4番線（埼京線）／5・6番線N\'EX連絡口',
    x: 26.5 * CELL,
    z: 13.0 * CELL + 0.44,
    rotY: 0,
  },
];

export interface HidingSpotDef {
  id: string;
  name: string;
  kind: 'locker' | 'phonebooth';
  x: number;
  z: number;
  rotY: number;
  insideX: number;
  insideZ: number;
  exitX: number;
  exitZ: number;
}

export const HIDING_SPOTS: HidingSpotDef[] = [
  {
    id: 'hide-phone',
    name: '公衆電話ボックス（西口地下広場・小田急連絡口）',
    kind: 'phonebooth',
    x: 1.0 * CELL + 0.52,
    z: 12.2 * CELL,
    rotY: Math.PI / 2,
    insideX: 1.0 * CELL + 0.48,
    insideZ: 12.2 * CELL,
    exitX: 1.0 * CELL + 1.52,
    exitZ: 12.2 * CELL,
  },
  {
    id: 'hide-west-locker',
    name: 'Suicaコインロッカー（西口地下広場北側）',
    kind: 'locker',
    x: 1.0 * CELL + 0.48,
    z: 7.2 * CELL,
    rotY: Math.PI / 2,
    insideX: 1.0 * CELL + 0.42,
    insideZ: 7.2 * CELL,
    exitX: 1.0 * CELL + 1.48,
    exitZ: 7.2 * CELL,
  },
  {
    id: 'hide-metro-locker',
    name: '大型コインロッカー（メトロプロムナード 丸ノ内線連絡）',
    kind: 'locker',
    x: 19.5 * CELL,
    z: 4.0 * CELL - 0.48,
    rotY: Math.PI,
    insideX: 19.5 * CELL,
    insideZ: 4.0 * CELL - 0.42,
    exitX: 19.5 * CELL,
    exitZ: 4.0 * CELL - 1.48,
  },
  {
    id: 'hide-midori-office',
    name: '駅員用ロッカー（地下みどりの窓口・駅事務室裏）',
    kind: 'locker',
    x: 17.0 * CELL + 0.48,
    z: 10.5 * CELL,
    rotY: Math.PI / 2,
    insideX: 17.0 * CELL + 0.42,
    insideZ: 10.5 * CELL,
    exitX: 17.0 * CELL + 1.48,
    exitZ: 10.5 * CELL,
  },
  {
    id: 'hide-central-sw',
    name: '清掃用具ロッカー（中央通路 13〜16番線精算所裏）',
    kind: 'locker',
    x: 9.0 * CELL + 0.48,
    z: 20.4 * CELL,
    rotY: Math.PI / 2,
    insideX: 9.0 * CELL + 0.42,
    insideZ: 20.4 * CELL,
    exitX: 9.0 * CELL + 1.48,
    exitZ: 20.4 * CELL,
  },
  {
    id: 'hide-nex-tunnel',
    name: '保守作業員ロッカー（5・6番線 N\'EX 連絡地下道奥）',
    kind: 'locker',
    x: 22.0 * CELL + 0.48,
    z: 21.5 * CELL,
    rotY: Math.PI / 2,
    insideX: 22.0 * CELL + 0.42,
    insideZ: 21.5 * CELL,
    exitX: 22.0 * CELL + 1.48,
    exitZ: 21.5 * CELL,
  },
  {
    id: 'hide-central-east',
    name: '大型コインロッカー（東口地下広場・ルミネエストB1F）',
    kind: 'locker',
    x: 34.0 * CELL - 0.48,
    z: 13.5 * CELL,
    rotY: -Math.PI / 2,
    insideX: 34.0 * CELL - 0.42,
    insideZ: 13.5 * CELL,
    exitX: 34.0 * CELL - 1.48,
    exitZ: 13.5 * CELL,
  },
];

export interface LoreNoteDef {
  id: string;
  title: string;
  date: string;
  x: number;
  y: number;
  z: number;
  rotY: number;
  vertical?: boolean;
  lines: string[];
}

export const LORE_NOTES: LoreNoteDef[] = [
  {
    id: 'note-pedestal',
    title: '東西自由通路・アルプス広場 特設展示プレート',
    date: '11月18日 掲示',
    x: PEDESTAL_POS.x - 0.36,
    y: 0.82,
    z: PEDESTAL_POS.z + 0.25,
    rotY: -Math.PI / 2 + 0.14,
    lines: [
      '【JR新宿駅 東西自由通路 特設展示「紫のうさぎ」等身大立像】',
      '長さ45.6mの「新宿ウォール456」と連動し、新しい仲間が新宿駅に登場しました。',
      '※終電後の自由通路立ち入り・着ぐるみ立像への接触は厳禁です。',
      '（裏面に爪で引っ掻いたような文字）',
      '「00:19、展示ケースを内側から割って出てきた。笑ったまま目が合う。絶対に見るな」',
    ],
  },
  {
    id: 'note-office',
    title: '新宿駅 地下みどりの窓口・当直日誌',
    date: '11月19日 00:26',
    x: 15.2 * CELL,
    y: 0.86,
    z: 11.2 * CELL,
    rotY: 0.35,
    lines: [
      '00:15 山手線・中央線・埼京線・丸ノ内線・小田急・京王 全線終電発車確認。全地上出口シャッター閉鎖。',
      '00:22 「新宿ウォール456」と10本の「J・ADビジョン」光柱が全て紫のうさぎに切り替わり、直後に展示台が空に。',
      '00:24 東口（歌舞伎町方面）非常シャッターは、構内5か所のSuicaチャージ機で残高¥1,000を認証しないと開かない。',
      'チャージ音が鳴ると奴は改札もメトロプロムナードも突き抜けて走ってくる。隠れたら【息を止めろ】([Space])。',
    ],
  },
  {
    id: 'note-metro',
    title: '東京メトロ メトロプロムナード 警備員のメモ',
    date: '11月19日 00:31',
    x: 12.2 * CELL,
    y: 0.03,
    z: 2.7 * CELL,
    rotY: 0.25,
    lines: [
      '丸ノ内線(M08)改札の赤い照明の下を、2メートルの紫の影が西口地下広場へ向かって歩いていった。',
      '西口ロータリーの吹き抜け天井から雨音が響いているのに、地上へ上がる階段は全て封鎖されている。',
      '小田急線と京王線の連絡改札はガラス越しに真っ暗だった。引き返そうとしたら、円柱の陰から耳が覗いていた。',
    ],
  },
  {
    id: 'note-bench',
    title: '改札内コンコース 13・14番線階段前の手帳',
    date: '日付不明',
    x: 12.6 * CELL,
    y: 0.55,
    z: 13.5 * CELL,
    rotY: 0.35,
    lines: [
      '新宿駅の地下は北のメトロプロムナード、東西自由通路、中央通路、そして1〜16番線まで巨大な迷宮だ。',
      '懐中電灯を奴に当てた瞬間、天井のLEDが端から順番に火花を散らして破裂した。',
      '硬貨([G])を遠くへ投げれば音のほうへ走る。西口広場の公衆電話が鳴っても、絶対に出るな。',
    ],
  },
  {
    id: 'note-nex',
    title: '5・6番線 成田エクスプレス(N\'EX) 連絡地下道の作業日報',
    date: '11月19日 00:39',
    x: 23.6 * CELL,
    y: 0.03,
    z: 21.4 * CELL,
    rotY: -0.5,
    lines: [
      '7・8番線のさらに南東に延びる5・6番線連絡地下道は、深夜になると誰の声も届かない。',
      '1〜4番線（埼京線・湘南新宿ライン）の階段下から、重いぬいぐるみが湿った床を這う音が聞こえた。',
      'ここは袋小路だ。奥の保守ロッカーに隠れられるが、追い詰められたら息を止めてやり過ごすしかない。',
    ],
  },
  {
    id: 'note-newdays',
    title: 'NewDays 新宿（東口ルミネエスト連絡通路）シャッター貼紙',
    date: '11月19日 深夜',
    x: 31.0 * CELL + 0.08,
    y: 1.38,
    z: 12.2 * CELL,
    rotY: Math.PI / 2,
    vertical: true,
    lines: [
      '【緊急】東口・地上出口（歌舞伎町・アルタ方面）強制解錠手順',
      '1. みどりの窓口横 きっぷうりば / 2. 丸ノ内線メトロプロムナード',
      '3. 西口広場・小田急/京王連絡 / 4. 改札内13・14番線 / 5. 中央通路1〜4番線横',
      '5か所すべてでSuicaチャージし ¥1,000 に到達すると、東口非常ゲートの緑ランプが点灯する。',
      '※13〜16番線や1〜4番線から電車の轟音が聴こえても、終電は終わっている。絶対に階段を上がるな。',
    ],
  },
];

export interface CoinDef {
  id: string;
  x: number;
  y: number;
  z: number;
}

export const COINS: CoinDef[] = [
  { id: 'coin-1', x: 18.5 * CELL, y: 0.02, z: 7.4 * CELL },
  { id: 'coin-2', x: 15.5 * CELL, y: 0.02, z: 3.3 * CELL },
  { id: 'coin-3', x: 3.5 * CELL, y: 0.02, z: 9.5 * CELL },
  { id: 'coin-4', x: 12.5 * CELL, y: 0.02, z: 15.2 * CELL },
  { id: 'coin-5', x: 26.5 * CELL, y: 0.02, z: 17.2 * CELL },
  { id: 'coin-6', x: 32.2 * CELL, y: 0.02, z: 16.5 * CELL },
];

export const PATROL_WAYPOINTS: Array<{ x: number; z: number }> = [
  { x: 27.5 * CELL, z: 7.5 * CELL },  // アルプス広場・東口
  { x: 16.5 * CELL, z: 7.2 * CELL },  // 東西自由通路 新宿ウォール456中央
  { x: 8.5 * CELL, z: 7.5 * CELL },   // 西改札前
  { x: 3.5 * CELL, z: 7.2 * CELL },   // 新宿西口地下広場 ロータリー
  { x: 4.5 * CELL, z: 15.5 * CELL },  // 小田急・京王連絡コンコース
  { x: 11.5 * CELL, z: 3.0 * CELL },  // メトロプロムナード 丸ノ内線西改札前
  { x: 23.5 * CELL, z: 3.0 * CELL },  // メトロプロムナード 丸ノ内線東改札前
  { x: 9.5 * CELL, z: 11.5 * CELL },  // JR西改札内 15・16番線前
  { x: 14.5 * CELL, z: 13.5 * CELL }, // JR改札内 11・12番線間
  { x: 20.5 * CELL, z: 11.5 * CELL }, // JR東改札内 7・8番線前
  { x: 26.5 * CELL, z: 15.5 * CELL }, // JR改札内 1〜4番線（埼京・湘南新宿）
  { x: 23.5 * CELL, z: 19.5 * CELL }, // 5・6番線 N'EX連絡地下道入口
  { x: 16.5 * CELL, z: 17.2 * CELL }, // 中央通路 中央
  { x: 8.5 * CELL, z: 17.2 * CELL },  // 中央通路 中央西改札前
  { x: 29.5 * CELL, z: 17.2 * CELL }, // 中央通路 中央東改札前
  { x: 32.0 * CELL, z: 12.5 * CELL }, // 東口地下広場・ルミネエストB1F
];

export const PEEK_PILLARS: Array<{ x: number; z: number }> = [
  { x: 11.5 * CELL, z: 8.5 * CELL },
  { x: 13.5 * CELL, z: 8.5 * CELL },
  { x: 15.5 * CELL, z: 8.5 * CELL },
  { x: 17.5 * CELL, z: 8.5 * CELL },
  { x: 19.5 * CELL, z: 8.5 * CELL },
  { x: 21.5 * CELL, z: 8.5 * CELL },
  { x: 4.5 * CELL, z: 8.5 * CELL },
  { x: 14.5 * CELL, z: 2.5 * CELL },
  { x: 18.5 * CELL, z: 2.5 * CELL },
  { x: 27.5 * CELL, z: 2.5 * CELL },
];
