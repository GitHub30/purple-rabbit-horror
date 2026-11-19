export const CELL = 4.0;
export const LOW_CEILING = 3.65;
export const HIGH_CEILING = 4.25;
export const COLS = 21; // 84m East-West (West Exit <-> East-West Free Passage <-> East Exit)
export const ROWS = 15; // 60m North-South (Shinjuku Wall 456 <-> Platform 7-16 Stairs <-> Central Passage)

// Authentic JR Shinjuku Station B1F Grid (North = -Z, South = +Z, West = -X, East = +X)
// 0 = walkable concourse/passage
// 1 = solid architectural wall
// 2 = J・ADビジョン新宿駅 Light-Box Digital Signage Column (4柱 at 西改札前 + 5柱 along 東西自由通路 = 9 columns)
// 3 = みどりの窓口 Ticket Office glass storefront partition (blocks movement, transparent LOS)
// 4 = JR新宿駅 1Fホーム連絡階段・エスカレーター (15・16 / 13・14 / 11・12 / 9・10 / 7・8番線)
export const SHINJUKU_GRID: number[][] = [
  // c:0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // R0: 北外壁 (c=5..15 新宿ウォール456 W45.6m×H1.7m)
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // R1: 東西自由通路 北側 (新宿ウォール456前) | c=19..20 東口(歌舞伎町・アルタ)地上出口
  [1, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // R2: 西改札前 J・ADビジョン北列(2,2)(4,2) | 東西自由通路中央 | アルプス広場展示台 | 東口出口
  [1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0], // R3: 西改札前 J・ADビジョン南列(2,3)(4,3) | 東西自由通路 J・ADビジョン列柱(6,8,10,12,14) | 東改札前
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // R4: 東西自由通路 南側 (西改札前・きっぷうりば前・みどりの窓口前・東改札前)
  [1, 0, 1, 0, 0, 0, 1, 1, 1, 3, 3, 3, 1, 0, 1, 0, 0, 0, 1, 0, 1], // R5: 西口通路(1) | 西改札(3..5) | きっぷうりば(6..8) | みどりの窓口(9..11) | 事務室(13) | 東改札(15..17) | 東口通路(19)
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], // R6: 改札内北コンコース (西改札内〜みどりの窓口裏〜東改札内)
  [1, 0, 1, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 1, 0, 1], // R7: 1Fホーム階段(北): 15・16番線(4) | 13・14番線(7) | 11・12番線(10) | 9・10番線(13) | 7・8番線(16)
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], // R8: 改札内エレベーター・横断連絡通路
  [1, 0, 1, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 1, 0, 1], // R9: 1Fホーム階段(南): 15・16番線(4) | 13・14番線(7) | 11・12番線(10) | 9・10番線(13) | 7・8番線(16)
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], // R10: 中央通路北側 (各番線南階段前)
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // R11: 中央通路 (c=2 中央西改札・小田急/京王乗換 | c=3..17 中央通路 | c=18 中央東改札)
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // R12: 中央通路南側 (中央西改札〜精算機・NewDays西改札内〜中央東改札)
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1], // R13: 南側設備アルコーブ (c=4..5 小田急連絡口 | c=9..11 中央通路精算・券売機 | c=15..16 中央東口店舗)
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // R14: 南外壁 (南口・甲州街道方面境界)
];

export function cellCenter(col: number, row: number): { x: number; z: number } {
  return { x: (col + 0.5) * CELL, z: (row + 0.5) * CELL };
}

export function worldToCell(x: number, z: number): { col: number; row: number } {
  return { col: Math.floor(x / CELL), row: Math.floor(z / CELL) };
}

// The 25m-wide 東西自由通路 (rows 1..4) has the higher ceiling with indirect cove line LEDs
export function isHighCeiling(col: number, row: number): boolean {
  return col >= 1 && col <= 18 && row >= 1 && row <= 4;
}

// Player spawns in 東西自由通路 looking East (+X, yaw = -Math.PI/2) down the iconic corridor:
// Left: 45.6m 新宿ウォール456 | Right: J・ADビジョン light-columns & みどりの窓口 | Ahead: アルプス広場展示台 & 東口出口
export const PLAYER_SPAWN = { x: 8.6 * CELL, z: 2.32 * CELL, yaw: -Math.PI / 2 };
export const PEDESTAL_POS = { x: 14.8 * CELL, z: 2.25 * CELL };
export const RABBIT_INTRO_POS = { x: 17.55 * CELL, z: 2.25 * CELL, rotY: -Math.PI / 2 };

// Final Escape Exit Gate & Shutter at the East end of 東西自由通路 (東口・歌舞伎町／アルタ方面 地上出口)
export const GATE_LINE_X = 18.85 * CELL; // x = 75.4m
export const GATE_LINE_Z = 2.25 * CELL; // z = 9.0m (center of East Exit portal)
export const EXIT_GATE_INTERACT = { x: 18.45 * CELL, z: 2.25 * CELL };
export const VICTORY_X = 19.45 * CELL; // x > 77.8m triggers Victory
export const VICTORY_Z = 2.25 * CELL;

// Shinjuku Wall 456 span along the North wall of 東西自由通路 (z = 4.06m, x = 20.0m .. 65.6m = 45.6m!)
export const WALL_456_SPAN = {
  xStart: 5.0 * CELL,
  xEnd: 16.4 * CELL,
  z: 1.0 * CELL + 0.06,
  height: 1.72,
  centerY: 1.32,
};

export const PHOTOBOOTH_POS = { x: 4.5 * CELL, z: 13.5 * CELL };
export const PAYPHONE_POS = { x: 1 * CELL + 0.52, z: 7.5 * CELL };

export interface PlatformStairDef {
  id: string;
  col: number;
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

// Authentic West-to-East platform stairs of JR Shinjuku Station B1F (16番線 -> 7番線)
export const PLATFORM_STAIRS: PlatformStairDef[] = [
  {
    id: 'plat-15-16',
    col: 4,
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
    col: 7,
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
    col: 10,
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
    col: 13,
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
    col: 16,
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
];

export interface TerminalDef {
  id: string;
  name: string;
  zone: string;
  x: number;
  z: number;
  rotY: number;
}

// 5 Suica Charge Terminals at authentic JR Shinjuku B1F ticket / fare-adjustment locations
export const TERMINALS: TerminalDef[] = [
  {
    id: 'term-midori',
    name: 'チャージ機 #01',
    zone: '東西自由通路・地下みどりの窓口横 きっぷうりば',
    x: 7.5 * CELL,
    z: 5.0 * CELL - 0.42,
    rotY: Math.PI,
  },
  {
    id: 'term-west-gate',
    name: 'チャージ機 #02',
    zone: '東西自由通路・西改札前（西口広場方面）',
    x: 1.0 * CELL + 0.46,
    z: 2.5 * CELL,
    rotY: Math.PI / 2,
  },
  {
    id: 'term-inside-14',
    name: 'チャージ機 #03',
    zone: '改札内コンコース・13/14番線階段横 のりこし精算所',
    x: 7.5 * CELL,
    z: 6.0 * CELL + 0.42,
    rotY: 0,
  },
  {
    id: 'term-central-west',
    name: 'チャージ機 #04',
    zone: '中央通路・中央西改札（小田急・京王のりかえ口）',
    x: 5.5 * CELL,
    z: 14.0 * CELL - 0.46,
    rotY: Math.PI,
  },
  {
    id: 'term-central-east',
    name: 'チャージ機 #05',
    zone: '中央東改札・ルミネエスト／NewDays新宿横',
    x: 16.5 * CELL,
    z: 14.0 * CELL - 0.46,
    rotY: Math.PI,
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
    name: '公衆電話ボックス（西口地下連絡通路）',
    kind: 'phonebooth',
    x: 1 * CELL + 0.52,
    z: 7.5 * CELL,
    rotY: Math.PI / 2,
    insideX: 1 * CELL + 0.48,
    insideZ: 7.5 * CELL,
    exitX: 1 * CELL + 1.52,
    exitZ: 7.5 * CELL,
  },
  {
    id: 'hide-west-locker',
    name: 'Suicaコインロッカー（西改札前広場）',
    kind: 'locker',
    x: 1 * CELL + 0.48,
    z: 4.2 * CELL,
    rotY: Math.PI / 2,
    insideX: 1 * CELL + 0.42,
    insideZ: 4.2 * CELL,
    exitX: 1 * CELL + 1.48,
    exitZ: 4.2 * CELL,
  },
  {
    id: 'hide-midori-office',
    name: '駅員用ロッカー（地下みどりの窓口・駅事務室裏）',
    kind: 'locker',
    x: 12.0 * CELL + 0.48,
    z: 5.5 * CELL,
    rotY: Math.PI / 2,
    insideX: 12.0 * CELL + 0.42,
    insideZ: 5.5 * CELL,
    exitX: 12.0 * CELL + 1.48,
    exitZ: 5.5 * CELL,
  },
  {
    id: 'hide-central-sw',
    name: '清掃用具ロッカー（中央通路 15・16番線階段下）',
    kind: 'locker',
    x: 4.0 * CELL + 0.48,
    z: 13.5 * CELL,
    rotY: Math.PI / 2,
    insideX: 4.0 * CELL + 0.42,
    insideZ: 13.5 * CELL,
    exitX: 4.0 * CELL + 1.48,
    exitZ: 13.5 * CELL,
  },
  {
    id: 'hide-central-east',
    name: '大型コインロッカー（東口・ルミネエスト連絡通路）',
    kind: 'locker',
    x: 20.0 * CELL - 0.48,
    z: 8.5 * CELL,
    rotY: -Math.PI / 2,
    insideX: 20.0 * CELL - 0.42,
    insideZ: 8.5 * CELL,
    exitX: 20.0 * CELL - 1.48,
    exitZ: 8.5 * CELL,
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
    x: 11.2 * CELL,
    y: 0.86,
    z: 6.2 * CELL,
    rotY: 0.35,
    lines: [
      '00:15 山手線・中央線・総武線 終電発車確認。東口・西口地上出口シャッター閉鎖。',
      '00:22 「新宿ウォール456」と柱の「J・ADビジョン」が全て紫のうさぎに切り替わり、直後に展示台が空に。',
      '00:24 東口（歌舞伎町方面）非常シャッターは、構内5か所のチャージ機で残高¥1,000を認証しないと開かない。',
      'チャージ音が鳴ると奴は改札を抜けて猛スピードで飛んでくる。隠れたら【息を止めろ】([Space])。ライトも消せ。',
    ],
  },
  {
    id: 'note-bench',
    title: '改札内コンコース 13・14番線階段前の手帳',
    date: '日付不明',
    x: 8.6 * CELL,
    y: 0.55,
    z: 8.5 * CELL,
    rotY: 0.35,
    lines: [
      '新宿駅の地下は東西自由通路と中央通路が7〜16番線の階段で繋がっている。',
      'J・ADビジョンの光柱の陰から、紫の大きな耳が半分だけ覗いていた。懐中電灯を当てた瞬間、照明が端から順番に破裂した。',
      '硬貨([G])を遠くへ投げれば音のほうへ走る。西口連絡通路の公衆電話が鳴っても、絶対に出るな。',
    ],
  },
  {
    id: 'note-newdays',
    title: 'NewDays 新宿（東口改札外）シャッター貼紙',
    date: '11月19日 深夜',
    x: 19.0 * CELL + 0.06,
    y: 1.38,
    z: 5.8 * CELL,
    rotY: Math.PI / 2,
    vertical: true,
    lines: [
      '【緊急】東口・地上出口（歌舞伎町・アルタ方面）強制解錠手順',
      '1. 地下みどりの窓口横 きっぷうりば / 2. 西改札前（西口広場）',
      '3. 改札内 13・14番線階段横 精算所 / 4. 中央西改札 / 5. 中央東改札',
      '5か所すべてでSuicaチャージし ¥1,000 に到達すると、東口非常ゲートの緑ランプが点灯する。',
      '※13・14番線や15・16番線から電車の音が聴こえても、終電はもう終わっている。階段を上がるな。',
    ],
  },
  {
    id: 'note-metro',
    title: '中央通路 清掃員のメモ',
    date: '11月19日 00:34',
    x: 10.5 * CELL,
    y: 0.03,
    z: 12.2 * CELL,
    rotY: -0.45,
    lines: [
      '中央通路の証明写真機のカーテンの中でストロボが光った。誰も入っていないのに。',
      'ロッカーに隠れている時、扉のスリットのすぐ向こうに奴の赤い目が見えた。',
      '[Space]（スマホは「息を止める」）を押し続けて息を殺したら、扉を引っ掻いて去っていった。息を切らすな。',
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
  { id: 'coin-1', x: 11.5 * CELL, y: 0.02, z: 2.2 * CELL },
  { id: 'coin-2', x: 3.5 * CELL, y: 0.02, z: 6.5 * CELL },
  { id: 'coin-3', x: 11.5 * CELL, y: 0.02, z: 8.5 * CELL },
  { id: 'coin-4', x: 14.5 * CELL, y: 0.02, z: 11.8 * CELL },
];

export const PATROL_WAYPOINTS: Array<{ x: number; z: number }> = [
  { x: 16.5 * CELL, z: 2.2 * CELL }, // 東西自由通路 東口・アルプス広場
  { x: 11.0 * CELL, z: 2.2 * CELL }, // 東西自由通路 新宿ウォール456中央
  { x: 5.5 * CELL, z: 2.2 * CELL },  // 東西自由通路 西改札前
  { x: 4.5 * CELL, z: 6.5 * CELL },  // 西改札内 15・16番線前
  { x: 8.5 * CELL, z: 8.5 * CELL },  // 改札内中央 13・14 / 11・12番線間
  { x: 16.5 * CELL, z: 6.5 * CELL }, // 東改札内 7・8番線前
  { x: 16.5 * CELL, z: 11.5 * CELL }, // 中央通路 東側 (中央東改札前)
  { x: 10.5 * CELL, z: 11.8 * CELL }, // 中央通路 中央
  { x: 4.5 * CELL, z: 11.5 * CELL },  // 中央通路 西側 (中央西改札前)
  { x: 1.5 * CELL, z: 8.5 * CELL },   // 西口地下連絡通路
  { x: 19.5 * CELL, z: 8.5 * CELL },  // 東口・ルミネエスト連絡通路
];

export const PEEK_PILLARS: Array<{ x: number; z: number }> = [
  { x: 6.5 * CELL, z: 3.5 * CELL },
  { x: 8.5 * CELL, z: 3.5 * CELL },
  { x: 10.5 * CELL, z: 3.5 * CELL },
  { x: 12.5 * CELL, z: 3.5 * CELL },
  { x: 14.5 * CELL, z: 3.5 * CELL },
];
