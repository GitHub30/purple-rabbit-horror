export const CELL = 4.0;
export const LOW_CEILING = 3.85;
export const HIGH_CEILING = 5.2;
export const COLS = 15;
export const ROWS = 13;

// 0 = walkable, 1 = wall, 2 = Shinjuku Digital Signage Pillar,
// 3 = Glass office wall (transparent LOS!), 4 = Yamanote/Chuo platform iron grille overlook
export const SHINJUKU_GRID: number[][] = [
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], // R0: 東口地上階段 (Kabukicho Exit)
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // R1: 東改札コンコース
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1], // R2: 西口ロッカー | アルプス広場北 | 駅事務室
  [1, 0, 1, 1, 0, 2, 0, 0, 0, 2, 3, 0, 0, 0, 1], // R3: サイネージ柱(5,3)(9,3) | 駅事務室
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], // R4: 西口公衆電話 | アルプス広場
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], // R5: アルプス広場中央(展示台) | NewDays通路
  [1, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1, 0, 0, 0, 1], // R6: サイネージ柱(5,6)(9,6) | NewDays前
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // R7: 東西自由通路
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1], // R8: 西口待合 | 南口連絡 | 券売機
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1], // R9: 証明写真機 | 山手線階段連絡 | 東南通路
  [1, 0, 1, 0, 0, 4, 0, 0, 0, 4, 0, 1, 0, 0, 1], // R10: 14・15番線 & 7・8番線 階段吹抜
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // R11: B1F メトロプロムナード (丸ノ内線 M08)
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // R12: 南外壁
];

export function cellCenter(col: number, row: number): { x: number; z: number } {
  return { x: (col + 0.5) * CELL, z: (row + 0.5) * CELL };
}

export function worldToCell(x: number, z: number): { col: number; row: number } {
  return { col: Math.floor(x / CELL), row: Math.floor(z / CELL) };
}

export function isHighCeiling(col: number, row: number): boolean {
  return col >= 4 && col <= 9 && row >= 1 && row <= 8;
}

export const PLAYER_SPAWN = { x: 7.5 * CELL, z: 8.85 * CELL, yaw: 0 };
export const RABBIT_INTRO_POS = { x: 7.5 * CELL, z: 2.25 * CELL, rotY: 0 };
export const PEDESTAL_POS = { x: 7.5 * CELL, z: 5.5 * CELL };
export const GATE_LINE_Z = 1.15 * CELL; // z = 4.6m (東改札)
export const EXIT_GATE_INTERACT = { x: 7.5 * CELL, z: 1.38 * CELL };
export const VICTORY_Z = 0.52 * CELL;

export const PHOTOBOOTH_POS = { x: 2.5 * CELL, z: 10.5 * CELL };
export const PAYPHONE_POS = { x: 1 * CELL + 0.5, z: 4.5 * CELL };

export interface TerminalDef {
  id: string;
  name: string;
  zone: string;
  x: number;
  z: number;
  rotY: number;
}

export const TERMINALS: TerminalDef[] = [
  {
    id: 'term-nw',
    name: 'チャージ機 #01',
    zone: '西口・コインロッカー前',
    x: 1.5 * CELL,
    z: 1 * CELL + 0.46,
    rotY: 0,
  },
  {
    id: 'term-sw',
    name: 'チャージ機 #02',
    zone: '西口・証明写真機横',
    x: 1 * CELL + 0.46,
    z: 9.5 * CELL,
    rotY: Math.PI / 2,
  },
  {
    id: 'term-ne',
    name: 'チャージ機 #03',
    zone: '東口・新宿駅 夜間事務室',
    x: 14 * CELL - 0.46,
    z: 2.5 * CELL,
    rotY: -Math.PI / 2,
  },
  {
    id: 'term-se',
    name: 'チャージ機 #04',
    zone: '中央東口・NewDays横',
    x: 14 * CELL - 0.46,
    z: 8.5 * CELL,
    rotY: -Math.PI / 2,
  },
  {
    id: 'term-s',
    name: 'チャージ機 #05',
    zone: 'B1F メトロプロムナード',
    x: 7.5 * CELL,
    z: 12 * CELL - 0.46,
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
    name: '公衆電話ボックス（西口通路）',
    kind: 'phonebooth',
    x: 1 * CELL + 0.5,
    z: 4.5 * CELL,
    rotY: Math.PI / 2,
    insideX: 1 * CELL + 0.46,
    insideZ: 4.5 * CELL,
    exitX: 1 * CELL + 1.5,
    exitZ: 4.5 * CELL,
  },
  {
    id: 'hide-sw',
    name: '清掃用具ロッカー（西口南）',
    kind: 'locker',
    x: 2.5 * CELL,
    z: 12 * CELL - 0.48,
    rotY: Math.PI,
    insideX: 2.5 * CELL,
    insideZ: 12 * CELL - 0.42,
    exitX: 2.5 * CELL,
    exitZ: 12 * CELL - 1.48,
  },
  {
    id: 'hide-ne',
    name: '駅員ロッカー（夜間事務室）',
    kind: 'locker',
    x: 14 * CELL - 0.48,
    z: 4.5 * CELL,
    rotY: -Math.PI / 2,
    insideX: 14 * CELL - 0.42,
    insideZ: 4.5 * CELL,
    exitX: 14 * CELL - 1.48,
    exitZ: 4.5 * CELL,
  },
  {
    id: 'hide-east',
    name: '業務用ロッカー（NewDays裏）',
    kind: 'locker',
    x: 11 * CELL + 0.48,
    z: 6.5 * CELL,
    rotY: Math.PI / 2,
    insideX: 11 * CELL + 0.42,
    insideZ: 6.5 * CELL,
    exitX: 11 * CELL + 1.48,
    exitZ: 6.5 * CELL,
  },
  {
    id: 'hide-se',
    name: '大型ロッカー（メトロ東）',
    kind: 'locker',
    x: 12.5 * CELL,
    z: 12 * CELL - 0.48,
    rotY: Math.PI,
    insideX: 12.5 * CELL,
    insideZ: 12 * CELL - 0.42,
    exitX: 12.5 * CELL,
    exitZ: 12 * CELL - 1.48,
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
    title: 'アルプス広場 特設展示プレート',
    date: '11月18日 掲示',
    x: PEDESTAL_POS.x + 0.25,
    y: 0.82,
    z: PEDESTAL_POS.z + 0.36,
    rotY: 0.16,
    lines: [
      '【新宿駅 新公式マスコット「紫のうさぎ」等身大立像】',
      '1日350万人が行き交う新宿駅に、新しい仲間がやってきました。',
      '※終電後の展示エリア立ち入り・着ぐるみ立像への接触は厳禁です。',
      '（裏面に爪で引っ掻いたような文字）',
      '「00:19、展示ケースを内側から割って歩いている。笑ったまま目が合う。絶対に見るな」',
    ],
  },
  {
    id: 'note-office',
    title: '新宿駅 夜間当直日誌（東口）',
    date: '11月19日 00:26',
    x: 45.1,
    y: 0.86,
    z: 12.8,
    rotY: 0.42,
    lines: [
      '00:15 山手線・中央線 終電発車確認。東改札シャッター閉鎖。',
      '00:22 アルプス広場のサイネージ柱が全て「紫のうさぎ」に切り替わり、直後に展示台が空に。',
      '00:24 非常シャッターは電子ロックがかかり、構内5か所のチャージ機で残高¥1,000を認証しないと開かない。',
      'チャージ音が鳴ると奴は猛スピードで飛んでくる。隠れたら【息を止めろ】([Space])。ライトも消せ。',
    ],
  },
  {
    id: 'note-bench',
    title: '西口通路 忘れ物の手帳',
    date: '日付不明',
    x: 3.15 * CELL,
    y: 0.55,
    z: 9.25 * CELL,
    rotY: 0.35,
    lines: [
      '新宿の地下は広すぎて、どこから足音が響いているのか分からない。',
      '柱の陰から紫の大きな耳が半分だけ覗いていた。懐中電灯を当てた瞬間、蛍光灯が端から順番に破裂した。',
      '小銭([G])を遠くへ投げれば音のほうへ走る。西口の公衆電話が鳴っても、絶対に出るな。',
    ],
  },
  {
    id: 'note-newdays',
    title: 'NewDays 新宿東口店 シャッター貼紙',
    date: '11月19日 深夜',
    x: 11.5 * CELL,
    y: 1.38,
    z: 7 * CELL + 0.08,
    rotY: 0,
    vertical: true,
    lines: [
      '【緊急】東改札・地上出口（歌舞伎町方面）強制解錠手順',
      '1. 西口コインロッカー前 / 2. 西口証明写真機横',
      '3. 東口・夜間事務室 / 4. 中央東口・NewDays横 / 5. B1Fメトロプロムナード',
      '5か所すべてチャージし ¥1,000 に到達すると、東改札の緑ランプが点灯する。',
      '※14・15番線から電車の音が聴こえても、今日は終電後だ。乗るな。',
    ],
  },
  {
    id: 'note-metro',
    title: 'メトロプロムナード 清掃員のメモ',
    date: '11月19日 00:34',
    x: 7.2 * CELL,
    y: 0.03,
    z: 11.45 * CELL,
    rotY: -0.45,
    lines: [
      '証明写真機のカーテンの中でストロボが光った。誰も入っていないのに。',
      'ロッカーに隠れている時、扉の隙間のすぐ向こうに奴の赤い目が見えた。',
      '息を止めてライトを消していたら、金属を引っ掻いて去っていった。',
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
  { id: 'coin-1', x: 5.5 * CELL, y: 0.04, z: 7.6 * CELL },
  { id: 'coin-2', x: 2.3 * CELL, y: 0.04, z: 4.5 * CELL },
  { id: 'coin-3', x: 11.6 * CELL, y: 0.04, z: 5.5 * CELL },
  { id: 'coin-4', x: 9.6 * CELL, y: 0.04, z: 11.4 * CELL },
];

export const PATROL_WAYPOINTS: Array<{ x: number; z: number }> = [
  cellCenter(7, 2),
  cellCenter(2, 1),
  cellCenter(1, 4),
  cellCenter(1, 7),
  cellCenter(1, 10),
  cellCenter(4, 11),
  cellCenter(7, 11),
  cellCenter(11, 11),
  cellCenter(13, 9),
  cellCenter(13, 6),
  cellCenter(13, 3),
  cellCenter(11, 1),
  cellCenter(4, 4),
  cellCenter(8, 5),
  cellCenter(6, 7),
];

// Pillars around which the rabbit can execute terrifying corner-peeks!
export const PEEK_PILLARS: Array<{ x: number; z: number }> = [
  cellCenter(5, 3),
  cellCenter(9, 3),
  cellCenter(5, 6),
  cellCenter(9, 6),
];
