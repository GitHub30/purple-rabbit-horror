export const CELL = 4.0;
export const LOW_CEILING = 3.65;
export const HIGH_CEILING = 4.35;
export const PLAZA_CEILING = 6.2; // Recessed circular rotary skylight atrium in 西口地下広場

// Core shift relative to previous 35x23 map so ALL core JR Shinjuku coordinates stay parametrically aligned!
export const CORE_OX = 5; // +5 cols West (+20m): 新宿の目, 動く歩道, 大江戸線E01, 京王モール, 都営新宿線S01/大江戸線E27
export const CORE_OZ = 2; // +2 rows North (+8m): 大江戸線E01北口, 新宿サブナード・サンデッキ広場

export const COLS = 45; // 180m East-West (都庁方面動く歩道/新宿の目/京王モール <-> JR 1〜16番線 <-> 新宿サブナード)
export const ROWS = 29; // 116m North-South (大江戸線E01/丸ノ内線M08 <-> 東西自由通路 <-> 中央通路 <-> JR南口/バスタ新宿/新南改札)

// Real-World JR Shinjuku Station B1F + Full Surrounding Underground Megacomplex Grid (45 x 29 = 180m x 116m = 20,880 m2)
// North = -Z (row 0), South = +Z (row 28), West = -X (col 0), East = +X (col 44)
// 0 = walkable concourse / passage / underground shopping arcade
// 1 = solid architectural wall
// 2 = J・ADビジョン新宿駅 Light-Box Digital Signage Column (10 columns in 東西自由通路 & 西改札前)
// 3 = みどりの窓口 Ticket Office glass storefront partition (blocks movement, transparent LOS)
// 4 = JR新宿駅 1Fホーム連絡階段・エスカレーター (ALL 1〜16番線: 15・16 / 13・14 / 11・12 / 9・10 / 7・8 / 3・4 / 1・2番線)
// 5 = Cylindrical structural concrete/stainless column (西口広場大円柱 / メトロプロムナード / 東口 / サブナード / 南口)
// 6 = Private rail / subway / JR Shinnan glass ticket-gate facade (transparent LOS!)
//     - R1, C3..5: 都営大江戸線 新宿西口駅 (E01)
//     - R1, C40..42: 新宿サブナード北口 (西武新宿駅・歌舞伎町連絡)
//     - R3, C14..17 & C26..29: 東京メトロ 丸ノ内線 新宿駅 (M08) 西改札 / 東改札
//     - C6, R15..18: 小田急線 西口地下改札 (OH01)
//     - R22, C7..9: 京王線 京王西口改札 (KO01)
//     - C1, R24..26: 都営新宿線 (S01)・京王新線・都営大江戸線 (E27) 連絡改札
//     - R27, C18..25: JR新宿駅 新南改札 / バスタ新宿・NEWoMan直結 (QR対応EG21)
export const SHINJUKU_GRID: number[][] = [
  //c:0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // R0: 北外壁
  [1, 1, 1, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6, 1, 1], // R1: 大江戸線新宿西口E01(3..5) | サブナード北・西武新宿口(40..42)
  [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1], // R2: 大江戸線E01コンコース(2..5) | 新宿サブナード サンデッキ広場北(39..43)
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 5, 0, 0, 1], // R3: 大江戸線連絡 | 丸ノ内線西M08(14..17) | 東M08(26..29) | サブナード サンデッキ広場
  [1, 1, 0, 5, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // R4: 北大動脈(168m): 大江戸線E01 <-> 東京メトロ メトロプロムナード <-> 新宿サブナード
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // R5: メトロプロムナード南列 <-> サブナード西口連絡
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1], // R6: 南北連絡 (西口6..10 | 西連絡12 | 東連絡29 | 東口36..37 | サブナード40..43)
  [1, 1, 1, 1, 1, 1, 0, 5, 0, 5, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 5, 0, 0, 1], // R7: 南面C2..4=新宿の目(10m×3.4m!) | C14..25=新宿ウォール456(45.6m!) | サブナード
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], // R8: 新宿の目前(1..5) | 西口広場(6..10) | 東西自由通路・ウォール456(11..35) | 東口出口(37..38) | 壁(39) | サブナード(40..43)
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], // R9: 西新宿4号地下道(1..5) | 西口ロータリー | J・AD北(12,14) | 東西自由通路 | アルプス広場(30.5) | 東口出口 | 壁(39) | サブナード
  [1, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], // R10: 動く歩道(1..5) | 西口大円柱(7,9) | J・AD光柱列(12..26) | 東口柱(33) | 東口出口 | 壁(39) | サブナード
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 5, 0, 0, 1], // R11: 動く歩道南 | 東西自由通路南側 (西改札・きっぷ・みどりの窓口・東改札・ルミネエスト前) | サブナード
  [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 3, 3, 3, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1], // R12: 西新宿連絡(2..3) | 西口(6..10) | 西改札(12..14) | きっぷ(15..17) | みどり(18..20) | 事務室(22) | 東改札(24..26) | ルミネ壁(27..35) | 東口通路(36..38) | サブナード
  [1, 1, 0, 0, 1, 1, 0, 5, 0, 5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 5, 0, 1, 0, 0, 0, 0, 1], // R13: 西新宿連絡 | 西口広場南 | JR改札内北コンコース(12..26) | ルミネエスト・NewDays通路(36..38) | サブナード
  [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1], // R14: 1Fホーム北階段: 15・16(13) | 13・14(16) | 11・12(19) | 9・10(22) | 7・8(25) | サブナード
  [1, 1, 0, 0, 1, 1, 6, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 5, 0, 0, 1], // R15: 西新宿連絡 | 小田急OH01(6) | 改札内横断通路(12..34) | 東口⇄サブナード南連絡口(39)!
  [1, 1, 0, 0, 1, 1, 6, 0, 0, 0, 0, 1, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 4, 0, 1, 0, 5, 0, 0, 0, 0, 0, 0, 1], // R16: 小田急OH01(6) | ホーム階段: 15・16..7・8 + 3・4(30) + 1・2(33) | サブナード南連絡口(39)!
  [1, 1, 0, 0, 1, 1, 6, 0, 5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1], // R17: 西新宿連絡 | 小田急・京王コンコース | JR中央通路北側(1〜16番線) | サブナード南(新宿三丁目方面)
  [1, 1, 0, 0, 1, 1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], // R18: 中央通路北レーン (小田急/京王 ⇄ 中央西改札11 ⇄ 中央通路12..34 ⇄ 中央東改札35 ⇄ 東口広場)
  [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 5, 0, 0, 1], // R19: 中央通路中央レーン | サブナード南広場
  [1, 1, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 1, 0, 0, 0, 0, 1], // R20: 西新宿連絡⇄京王西口前(2..10) | 中央通路南レーン | 東口南 | サブナード南端
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 4, 0, 0, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // R21: 京王モール北口(2..5) | 京王西口前(6..10) | 証明写真(14..16) | 南口連絡(20..22) | 5・6 N'EX入口(28) | 3・4(30)&1・2(33)南階段 | 東南口⇄サブナード(39)!
  [1, 1, 0, 0, 0, 0, 1, 6, 6, 6, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // R22: 京王モール北 | 京王線KO01(7..9) | 証明写真アルコーブ(14..16) | 南口連絡(20..22) | 5・6 N'EX地下道(28) | 1〜4南折返し(30..34) | 東南口・サブナード南
  [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], // R23: 京王モール西連絡(2..5) | 南口連絡通路(20..22) | 5・6番線N'EX地下室(27..29) | 東南口・ルミネ2連絡(36..38)
  [1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], // R24: 都営新宿線S01/大江戸線E27(1) | 京王モール北列(2..13) | 南口連絡(20..22) | 東南口連絡(36..38)
  [1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], // R25: 南大動脈(148m): 都営新宿S01/大江戸E27 <-> 京王モール(2..13) <-> JR南口・甲州街道・バスタ新宿・新南改札大コンコース(14..38)
  [1, 6, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], // R26: 京王モール南列(2..13) <-> JR南口・バスタ新宿・新南改札前(14..38)
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // R27: 京王モール南店舗壁(2..17) | JR新南改札・バスタ新宿・NEWoMan直結(18..25) | 東南口・ルミネ2壁(26..38)
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // R28: 南外壁
];

export function cellCenter(col: number, row: number): { x: number; z: number } {
  return { x: (col + 0.5) * CELL, z: (row + 0.5) * CELL };
}

export function worldToCell(x: number, z: number): { col: number; row: number } {
  return { col: Math.floor(x / CELL), row: Math.floor(z / CELL) };
}

// High-ceiling zones: 東西自由通路 + アルプス広場 + 東口地下広場 + 新宿の目/動く歩道 + サブナード・サンデッキ広場 + JR南口大コンコース
export function isHighCeiling(col: number, row: number): boolean {
  const isEastWestFree = col >= 11 && col <= 38 && row >= 8 && row <= 11;
  const isEyeWalkway = col >= 1 && col <= 5 && row >= 8 && row <= 11;
  const isSubnadeSundeck = col >= 39 && col <= 43 && row >= 2 && row <= 5;
  const isSouthConcourse = col >= 14 && col <= 38 && row >= 25 && row <= 26;
  return isEastWestFree || isEyeWalkway || isSubnadeSundeck || isSouthConcourse;
}

// Recessed circular rotary skylight atrium in 新宿西口地下広場 (cols 6..10, rows 7..13)
export function isWestPlazaAtrium(col: number, row: number): boolean {
  return col >= 6 && col <= 10 && row >= 7 && row <= 13;
}

// Shinjuku Subnade 50th Anniversary "Urban Jungle" underground shopping mall zone
export function isSubnadeZone(col: number, row: number): boolean {
  return (col >= 39 && col <= 43 && row >= 2 && row <= 22) || (col >= 38 && col <= 43 && row >= 2 && row <= 5);
}

// Keio Mall underground shopping arcade zone
export function isKeioMallZone(col: number, row: number): boolean {
  return col >= 2 && col <= 13 && row >= 24 && row <= 26;
}

// Real-time Japanese zone name & CCTV camera ID for HUD & Station Map!
export function getShinjukuZone(x: number, z: number): { cam: string; name: string } {
  const col = Math.floor(x / CELL);
  const row = Math.floor(z / CELL);

  // Far Northeast / Far East: 新宿サブナード
  if (col >= 39) {
    if (row <= 5) return { cam: 'CAM-SB1', name: '新宿サブナード・サンデッキ広場（西武新宿駅方面）' };
    if (row >= 16) return { cam: 'CAM-SB3', name: '新宿サブナード南（新宿三丁目・東南口連絡）' };
    return { cam: 'CAM-SB2', name: '新宿サブナード・アーバンジャングル地下街' };
  }
  // Far West: 大江戸線E01 / 新宿の目・動く歩道 / 西新宿連絡 / 京王モール・都営新宿線
  if (col <= 5) {
    if (row <= 5) return { cam: 'CAM-E01', name: '都営大江戸線 新宿西口駅コンコース（E01）' };
    if (row >= 8 && row <= 11) {
      if (row === 8 || col <= 3) return { cam: 'CAM-EYE', name: '新宿の目（スバルビル地下）・都庁方面 動く歩道' };
      return { cam: 'CAM-MW1', name: '新宿副都心4号街路地下道（西新宿 動く歩道）' };
    }
    if (row >= 24) return { cam: 'CAM-S01', name: '都営新宿線(S01)・京王新線・大江戸線(E27)連絡口' };
    return { cam: 'CAM-WN1', name: '西新宿地下連絡道（西口広場⇄京王モール）' };
  }
  // Far South: 京王モール & JR南口・甲州街道・バスタ新宿・新南改札大コンコース
  if (row >= 24) {
    if (col <= 13) return { cam: 'CAM-KM1', name: '京王モール（KEIO MALL）地下街アーケード' };
    if (col >= 33) return { cam: 'CAM-SE2', name: 'JR東南口・ルミネ2／NEWoMan連絡コンコース' };
    return { cam: 'CAM-SG1', name: 'JR南口・甲州街道・バスタ新宿／新南改札大コンコース' };
  }
  // North: 東京メトロ メトロプロムナード (M08)
  if (row <= 5) {
    if (col <= 10) return { cam: 'CAM-W02', name: '西口地下広場北・大江戸線新宿西口駅連絡' };
    if (col >= 36) return { cam: 'CAM-M09', name: '新宿サブナード・アルタ地下連絡口' };
    return { cam: 'CAM-M08', name: '東京メトロ メトロプロムナード（丸ノ内線 M08）' };
  }
  // West Plaza / Odakyu OH01 / Keio KO01
  if (col <= 10) {
    if (row >= 15 && row <= 19) return { cam: 'CAM-OH1', name: '小田急線 西口地下改札コンコース（OH01）' };
    if (row >= 20) return { cam: 'CAM-KO1', name: '京王線 京王西口・百貨店口コンコース（KO01）' };
    return { cam: 'CAM-W01', name: '新宿西口地下広場（ロータリー吹き抜け）' };
  }
  // East-West Free Passage & East Exit
  if (row >= 8 && row <= 11) {
    if (col >= 35) return { cam: 'CAM-E01', name: '東口地下広場・歌舞伎町／アルタ地上出口' };
    if (col >= 27) return { cam: 'CAM-E03', name: '東西自由通路・アルプス広場（東口）' };
    return { cam: 'CAM-E04', name: '東西自由通路・新宿ウォール456' };
  }
  // Lumine Est & NewDays East Corridor
  if (col >= 36) {
    return { cam: 'CAM-LE1', name: 'ルミネエスト新宿 B1F・NewDays連絡通路' };
  }
  // 5・6 N'EX Tunnel
  if (row >= 21 && col >= 27 && col <= 29) {
    return { cam: 'CAM-NX5', name: '5・6番線 成田エクスプレス（N\'EX）連絡地下道' };
  }
  // South Connector
  if (row >= 21 && col >= 20 && col <= 22) {
    return { cam: 'CAM-SC1', name: 'JR中央通路⇄南口・バスタ新宿 連絡大通路' };
  }
  // 1〜4 Platforms (Saikyo / Shonan-Shinjuku)
  if (col >= 28 && row >= 15) {
    return { cam: 'CAM-JS1', name: 'JR改札内 1〜4番線（埼京線・湘南新宿ライン）' };
  }
  // Central Passage
  if (row >= 18) {
    if (col <= 16) return { cam: 'CAM-CW1', name: '中央通路・中央西改札（小田急・京王連絡）' };
    if (col >= 30) return { cam: 'CAM-CE1', name: '中央通路・中央東改札（ルミネエスト方面）' };
    return { cam: 'CAM-C02', name: 'JR改札内 中央通路（全1〜16番線連絡）' };
  }
  if (col <= 17) return { cam: 'CAM-P14', name: 'JR改札内 13〜16番線（山手線・総武線）' };
  return { cam: 'CAM-P08', name: 'JR改札内 7〜12番線（中央快速・中央特急）' };
}

// Player spawns in 東西自由通路 looking East (+X, yaw = -Math.PI/2) down the iconic 100m corridor:
export const PLAYER_SPAWN = {
  x: (11.8 + CORE_OX) * CELL,
  z: (7.35 + CORE_OZ) * CELL,
  yaw: -Math.PI / 2,
};
export const PEDESTAL_POS = {
  x: (25.5 + CORE_OX) * CELL,
  z: (7.35 + CORE_OZ) * CELL,
};
export const RABBIT_INTRO_POS = {
  x: (28.4 + CORE_OX) * CELL,
  z: (7.35 + CORE_OZ) * CELL,
  rotY: -Math.PI / 2,
};

// Title showcase position (in 東西自由通路 facing camera)
export const RABBIT_TITLE_POS = {
  x: 62.8 + CORE_OX * CELL,
  z: 30.1 + CORE_OZ * CELL,
};

// Final Escape Exit Gate & Shutter at the East end of 東西自由通路 (isolated from Subnade by solid wall C39!)
export const GATE_LINE_X = (32.65 + CORE_OX) * CELL; // 37.65 * 4 = 150.6m
export const GATE_LINE_Z = (7.5 + CORE_OZ) * CELL;   // 9.5 * 4 = 38.0m
export const EXIT_GATE_INTERACT = { x: (32.15 + CORE_OX) * CELL, z: GATE_LINE_Z };
export const VICTORY_X_MIN = (33.15 + CORE_OX) * CELL; // 38.15 * 4 = 152.6m (East Exit stairs inside C38!)
export const VICTORY_X_MAX = (34.1 + CORE_OX) * CELL;  // 39.1 * 4 = 156.4m (strictly west of Subnade C40!)
export const VICTORY_Z = GATE_LINE_Z;

// Iconic 45.6m Shinjuku Wall 456 along the North wall of 東西自由通路 (exact 45.6m!)
export const WALL_456_SPAN = {
  xStart: (9.0 + CORE_OX) * CELL,
  xEnd: (20.4 + CORE_OX) * CELL,
  z: (6.0 + CORE_OZ) * CELL + 0.06,
  height: 1.72,
  centerY: 1.32,
};

// Iconic 10.0m x 3.4m 『新宿の目』(Eye of Shinjuku) recessed into the North wall of West Shinjuku Passage (R8)!
export const EYE_OF_SHINJUKU_POS = {
  x: 3.5 * CELL, // 14.0m (center of C2..C4)
  y: 1.98,
  z: 8.0 * CELL + 0.08, // North face of R8 (facing South +Z!)
};

// Dual Parallel Moving Walkways in 新宿副都心4号街路地下道 (West Exit -> Tokyo Metropolitan Gov.)
export const MOVING_WALKWAY_SPAN = {
  xStart: 1.8 * CELL, // 7.2m
  xEnd: 5.5 * CELL,   // 22.0m (14.8m moving belt length!)
  zCenter: 10.45 * CELL, // 41.8m (centered in R10, wide granite walkway north & south!)
  halfWidth: 1.38,
};

export const PHOTOBOOTH_POS = {
  x: (10.5 + CORE_OX) * CELL,
  z: (20.5 + CORE_OZ) * CELL,
};
export const PAYPHONE_POS = {
  x: (1.0 + CORE_OX) * CELL + 0.52,
  z: (12.2 + CORE_OZ) * CELL,
};

// Key fixed collider anchor positions shared between CollisionSystem & ShinjukuStation
export const MIDORI_DESK_POS = {
  x: (15.2 + CORE_OX) * CELL,
  z: (11.2 + CORE_OZ) * CELL,
};
export const WAIT_BENCH_POS = {
  x: (12.6 + CORE_OX) * CELL,
  z: (13.5 + CORE_OZ) * CELL,
};
export const SUBNADE_BENCH_POS = {
  x: 42.6 * CELL,
  z: 14.5 * CELL,
};
export const SOUTH_BENCH_POS = {
  x: 24.5 * CELL,
  z: 25.4 * CELL,
};

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
    col: 8 + CORE_OX,
    northRow: 12 + CORE_OZ,
    southRow: 14 + CORE_OZ,
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
    col: 11 + CORE_OX,
    northRow: 12 + CORE_OZ,
    southRow: 14 + CORE_OZ,
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
    col: 14 + CORE_OX,
    northRow: 12 + CORE_OZ,
    southRow: 14 + CORE_OZ,
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
    col: 17 + CORE_OX,
    northRow: 12 + CORE_OZ,
    southRow: 14 + CORE_OZ,
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
    col: 20 + CORE_OX,
    northRow: 12 + CORE_OZ,
    southRow: 14 + CORE_OZ,
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
    col: 25 + CORE_OX,
    northRow: 14 + CORE_OZ,
    southRow: 19 + CORE_OZ,
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
    col: 28 + CORE_OX,
    northRow: 14 + CORE_OZ,
    southRow: 19 + CORE_OZ,
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

// 5 Suica Charge Terminals spanning ALL major wings of the 180m x 116m Shinjuku Underground Megacomplex!
export const TERMINALS: TerminalDef[] = [
  {
    id: 'term-midori',
    name: 'チャージ機 #01',
    zone: '東西自由通路・地下みどりの窓口横 きっぷうりば',
    x: (11.5 + CORE_OX) * CELL,
    z: (10.0 + CORE_OZ) * CELL - 0.44,
    rotY: Math.PI,
  },
  {
    id: 'term-eye-walkway',
    name: 'チャージ機 #02',
    zone: '西新宿・新宿の目／都庁方面 動く歩道コンコース',
    x: 5.0 * CELL,
    z: 12.0 * CELL - 0.44,
    rotY: Math.PI,
  },
  {
    id: 'term-subnade',
    name: 'チャージ機 #03',
    zone: '新宿サブナード・アーバンジャングル地下街',
    x: 44.0 * CELL - 0.44,
    z: 11.5 * CELL,
    rotY: -Math.PI / 2,
  },
  {
    id: 'term-inside-14',
    name: 'チャージ機 #04',
    zone: 'JR改札内コンコース・13/14番線階段横 のりこし精算所',
    x: (11.5 + CORE_OX) * CELL,
    z: (11.0 + CORE_OZ) * CELL + 0.44,
    rotY: 0,
  },
  {
    id: 'term-south-busta',
    name: 'チャージ機 #05',
    zone: 'JR南口・バスタ新宿／京王モール連絡大コンコース',
    x: 15.0 * CELL,
    z: 27.0 * CELL - 0.44,
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
    name: '公衆電話ボックス（西口地下広場・小田急連絡口）',
    kind: 'phonebooth',
    x: PAYPHONE_POS.x,
    z: PAYPHONE_POS.z,
    rotY: Math.PI / 2,
    insideX: PAYPHONE_POS.x - 0.04,
    insideZ: PAYPHONE_POS.z,
    exitX: PAYPHONE_POS.x + 1.0,
    exitZ: PAYPHONE_POS.z,
  },
  {
    id: 'hide-phone-south',
    name: '公衆電話ボックス（京王モール・JR南口連絡コンコース）',
    kind: 'phonebooth',
    x: 12.2 * CELL,
    z: 27.0 * CELL - 0.52,
    rotY: Math.PI,
    insideX: 12.2 * CELL,
    insideZ: 27.0 * CELL - 0.48,
    exitX: 12.2 * CELL,
    exitZ: 27.0 * CELL - 1.52,
  },
  {
    id: 'hide-west-eye',
    name: 'Suicaコインロッカー（西新宿・新宿の目／大江戸線方面）',
    kind: 'locker',
    x: 1.0 * CELL + 0.48,
    z: 9.2 * CELL,
    rotY: Math.PI / 2,
    insideX: 1.0 * CELL + 0.42,
    insideZ: 9.2 * CELL,
    exitX: 1.0 * CELL + 1.48,
    exitZ: 9.2 * CELL,
  },
  {
    id: 'hide-metro-locker',
    name: '大型コインロッカー（メトロプロムナード 丸ノ内線連絡）',
    kind: 'locker',
    x: (19.5 + CORE_OX) * CELL,
    z: (4.0 + CORE_OZ) * CELL - 0.48,
    rotY: Math.PI,
    insideX: (19.5 + CORE_OX) * CELL,
    insideZ: (4.0 + CORE_OZ) * CELL - 0.42,
    exitX: (19.5 + CORE_OX) * CELL,
    exitZ: (4.0 + CORE_OZ) * CELL - 1.48,
  },
  {
    id: 'hide-subnade-locker',
    name: '大型コインロッカー（新宿サブナード・アーバンジャングル）',
    kind: 'locker',
    x: 40.0 * CELL + 0.48,
    z: 9.5 * CELL,
    rotY: Math.PI / 2,
    insideX: 40.0 * CELL + 0.42,
    insideZ: 9.5 * CELL,
    exitX: 40.0 * CELL + 1.48,
    exitZ: 9.5 * CELL,
  },
  {
    id: 'hide-midori-office',
    name: '駅員用ロッカー（地下みどりの窓口・駅事務室裏）',
    kind: 'locker',
    x: (17.0 + CORE_OX) * CELL + 0.48,
    z: (10.5 + CORE_OZ) * CELL,
    rotY: Math.PI / 2,
    insideX: (17.0 + CORE_OX) * CELL + 0.42,
    insideZ: (10.5 + CORE_OZ) * CELL,
    exitX: (17.0 + CORE_OX) * CELL + 1.48,
    exitZ: (10.5 + CORE_OZ) * CELL,
  },
  {
    id: 'hide-central-sw',
    name: '清掃用具ロッカー（中央通路 13〜16番線精算所裏）',
    kind: 'locker',
    x: (9.0 + CORE_OX) * CELL + 0.48,
    z: (20.4 + CORE_OZ) * CELL,
    rotY: Math.PI / 2,
    insideX: (9.0 + CORE_OX) * CELL + 0.42,
    insideZ: (20.4 + CORE_OZ) * CELL,
    exitX: (9.0 + CORE_OX) * CELL + 1.48,
    exitZ: (20.4 + CORE_OZ) * CELL,
  },
  {
    id: 'hide-nex-tunnel',
    name: '保守作業員ロッカー（5・6番線 N\'EX 連絡地下道奥）',
    kind: 'locker',
    x: (22.0 + CORE_OX) * CELL + 0.48,
    z: (21.5 + CORE_OZ) * CELL,
    rotY: Math.PI / 2,
    insideX: (22.0 + CORE_OX) * CELL + 0.42,
    insideZ: (21.5 + CORE_OZ) * CELL,
    exitX: (22.0 + CORE_OX) * CELL + 1.48,
    exitZ: (21.5 + CORE_OZ) * CELL,
  },
  {
    id: 'hide-central-east',
    name: '大型コインロッカー（東口地下広場・ルミネエストB1F）',
    kind: 'locker',
    x: (34.0 + CORE_OX) * CELL - 0.48,
    z: (13.5 + CORE_OZ) * CELL,
    rotY: -Math.PI / 2,
    insideX: (34.0 + CORE_OX) * CELL - 0.42,
    insideZ: (13.5 + CORE_OZ) * CELL,
    exitX: (34.0 + CORE_OX) * CELL - 1.48,
    exitZ: (13.5 + CORE_OZ) * CELL,
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
    x: MIDORI_DESK_POS.x,
    y: 0.86,
    z: MIDORI_DESK_POS.z,
    rotY: 0.35,
    lines: [
      '00:15 JR・丸ノ内線・小田急・京王・都営新宿線・大江戸線 全線終電発車。全地上出口シャッター閉鎖。',
      '00:22 「新宿ウォール456」と10本の「J・ADビジョン」光柱が全て紫のうさぎに切り替わり、直後に展示台が空に。',
      '00:24 東口（歌舞伎町方面）非常シャッターは、新宿地下迷宮全域の5か所でSuicaチャージ¥1,000を認証しないと開かない。',
      'チャージ音が鳴ると奴はサブナードも京王モールも突き抜けて走ってくる。隠れたら【息を止めろ】([Space])。',
    ],
  },
  {
    id: 'note-eye',
    title: '西新宿「新宿の目」前・警備巡回メモ',
    date: '11月19日 00:29',
    x: 3.5 * CELL,
    y: 0.03,
    z: 9.1 * CELL,
    rotY: -0.2,
    lines: [
      'スバルビル地下の幅10mのアクリル彫刻「新宿の目」が、00:20頃から本来の回転を止め、通路を歩く者をじっと追い始めた。',
      '都庁方面へ延びる動く歩道の上を、紫色の巨大な影が音もなく滑っていくのを見た。',
      '西口広場から南の「京王モール」や「都営新宿線(S01)・大江戸線(E27)」へ抜ける裏通路がある。奴に挟まれたら迂回しろ。',
    ],
  },
  {
    id: 'note-subnade',
    title: '新宿サブナード 夜間清掃員のメモ',
    date: '11月19日 00:34',
    x: 42.1 * CELL,
    y: 0.56,
    z: 14.5 * CELL,
    rotY: 0.4,
    lines: [
      '50周年で木目と緑の「アーバンジャングル」に生まれ変わった新宿サブナードも、深夜は全店舗のシャッターが閉まり不気味に静まり返っている。',
      'サンデッキ広場から西武新宿駅方面へ逃げようとしたが、シャッターも改札も完全に封鎖されていた。',
      'ただしサブナードはメトロプロムナード東口とルミネエスト南東口を繋ぐ巨大な迂回路になっている。追われたらここへ逃げ込め。',
    ],
  },
  {
    id: 'note-bench',
    title: '改札内コンコース 13・14番線階段前の手帳',
    date: '日付不明',
    x: WAIT_BENCH_POS.x,
    y: 0.55,
    z: WAIT_BENCH_POS.z,
    rotY: 0.35,
    lines: [
      '新宿駅の地下は北のメトロプロムナード、東西自由通路、中央通路、1〜16番線、さらに西の動く歩道・東のサブナード・南のバスタ新宿連絡まで繋がる日本最大の迷宮だ。',
      '懐中電灯を奴に当てた瞬間、天井のLEDが端から順番に火花を散らして破裂した。',
      '硬貨([G])を遠くへ投げれば音のほうへ走る。西口広場の公衆電話が鳴っても、絶対に出るな。',
    ],
  },
  {
    id: 'note-nex',
    title: '5・6番線 成田エクスプレス(N\'EX) 連絡地下道の作業日報',
    date: '11月19日 00:39',
    x: (23.6 + CORE_OX) * CELL,
    y: 0.03,
    z: (21.4 + CORE_OZ) * CELL,
    rotY: -0.5,
    lines: [
      '7・8番線のさらに南東に延びる5・6番線連絡地下道は、深夜になると誰の声も届かない。',
      '1〜4番線（埼京線・湘南新宿ライン）の階段下から、重いぬいぐるみが湿った床を這う音が聞こえた。',
      'ここは袋小路だ。奥の保守ロッカーに隠れられるが、追い詰められたら息を止めてやり過ごすしかない。',
    ],
  },
  {
    id: 'note-south-busta',
    title: 'JR南口・新南改札（バスタ新宿直結）案内カウンターの走り書き',
    date: '11月19日 00:42',
    x: 21.8 * CELL,
    y: 0.03,
    z: 25.8 * CELL,
    rotY: 0.3,
    lines: [
      'バスタ新宿4Fへ上がる新南改札のQR対応新型改札機も、京王モール奥の都営新宿線(S01)・大江戸線(E27)連絡改札もすべて閉鎖された。',
      '脱出できるのは東西自由通路の突き当たり、歌舞伎町方面の「東口・地上出口」だけだ。',
      '京王モール南端の公衆電話ボックスは身を隠せる。もし足音が迫ったらライトを消して中へ入れ。',
    ],
  },
  {
    id: 'note-newdays',
    title: 'NewDays 新宿（東口ルミネエスト連絡通路）シャッター貼紙',
    date: '11月19日 深夜',
    x: (31.0 + CORE_OX) * CELL + 0.08,
    y: 1.38,
    z: (12.2 + CORE_OZ) * CELL,
    rotY: Math.PI / 2,
    vertical: true,
    lines: [
      '【緊急】東口・地上出口（歌舞伎町・アルタ方面）強制解錠手順',
      '1. みどりの窓口横 きっぷうりば / 2. 西新宿・新宿の目／動く歩道',
      '3. 新宿サブナード地下街 / 4. 改札内13・14番線 / 5. JR南口・バスタ新宿／京王モール連絡',
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
  { id: 'coin-1', x: (18.5 + CORE_OX) * CELL, y: 0.02, z: (7.4 + CORE_OZ) * CELL },
  { id: 'coin-2', x: (15.5 + CORE_OX) * CELL, y: 0.02, z: (3.3 + CORE_OZ) * CELL },
  { id: 'coin-3', x: 3.4 * CELL, y: 0.02, z: 11.4 * CELL },    // 西新宿・動く歩道横
  { id: 'coin-4', x: (12.5 + CORE_OX) * CELL, y: 0.02, z: (15.2 + CORE_OZ) * CELL },
  { id: 'coin-5', x: (26.5 + CORE_OX) * CELL, y: 0.02, z: (17.2 + CORE_OZ) * CELL },
  { id: 'coin-6', x: 42.2 * CELL, y: 0.02, z: 8.6 * CELL },    // 新宿サブナード
  { id: 'coin-7', x: 8.4 * CELL, y: 0.02, z: 25.4 * CELL },    // 京王モール
  { id: 'coin-8', x: 29.4 * CELL, y: 0.02, z: 25.6 * CELL },   // JR南口・バスタ新宿連絡
];

export const PATROL_WAYPOINTS: Array<{ x: number; z: number }> = [
  { x: (27.5 + CORE_OX) * CELL, z: (7.5 + CORE_OZ) * CELL },   // アルプス広場・東口
  { x: (16.5 + CORE_OX) * CELL, z: (7.2 + CORE_OZ) * CELL },   // 東西自由通路 新宿ウォール456中央
  { x: (8.5 + CORE_OX) * CELL, z: (7.5 + CORE_OZ) * CELL },    // 西改札前
  { x: (3.5 + CORE_OX) * CELL, z: (7.2 + CORE_OZ) * CELL },    // 新宿西口地下広場 ロータリー
  { x: 3.5 * CELL, z: 9.0 * CELL },                            // 新宿の目・動く歩道北
  { x: 4.2 * CELL, z: 4.5 * CELL },                            // 都営大江戸線 新宿西口駅E01前
  { x: (4.5 + CORE_OX) * CELL, z: (15.5 + CORE_OZ) * CELL },   // 小田急・京王連絡コンコース
  { x: 3.2 * CELL, z: 18.5 * CELL },                           // 西新宿地下連絡道
  { x: 7.5 * CELL, z: 25.2 * CELL },                           // 京王モール中央
  { x: 21.5 * CELL, z: 25.4 * CELL },                          // JR南口・新南改札/バスタ新宿前
  { x: 33.5 * CELL, z: 25.4 * CELL },                          // JR東南口・ルミネ2連絡
  { x: (11.5 + CORE_OX) * CELL, z: (3.0 + CORE_OZ) * CELL },   // メトロプロムナード 丸ノ内線西改札前
  { x: (23.5 + CORE_OX) * CELL, z: (3.0 + CORE_OZ) * CELL },   // メトロプロムナード 丸ノ内線東改札前
  { x: 42.2 * CELL, z: 4.5 * CELL },                           // 新宿サブナード サンデッキ広場
  { x: 42.2 * CELL, z: 12.5 * CELL },                          // 新宿サブナード中央
  { x: 42.2 * CELL, z: 20.5 * CELL },                          // 新宿サブナード南
  { x: (9.5 + CORE_OX) * CELL, z: (11.5 + CORE_OZ) * CELL },   // JR西改札内 15・16番線前
  { x: (14.5 + CORE_OX) * CELL, z: (13.5 + CORE_OZ) * CELL },  // JR改札内 11・12番線間
  { x: (20.5 + CORE_OX) * CELL, z: (11.5 + CORE_OZ) * CELL },  // JR東改札内 7・8番線前
  { x: (26.5 + CORE_OX) * CELL, z: (15.5 + CORE_OZ) * CELL },  // JR改札内 1〜4番線（埼京・湘南新宿）
  { x: (23.5 + CORE_OX) * CELL, z: (19.5 + CORE_OZ) * CELL },  // 5・6番線 N'EX連絡地下道入口
  { x: (16.5 + CORE_OX) * CELL, z: (17.2 + CORE_OZ) * CELL },  // 中央通路 中央
];

export const PEEK_PILLARS: Array<{ x: number; z: number }> = [
  { x: (11.5 + CORE_OX) * CELL, z: (8.5 + CORE_OZ) * CELL },
  { x: (13.5 + CORE_OX) * CELL, z: (8.5 + CORE_OZ) * CELL },
  { x: (15.5 + CORE_OX) * CELL, z: (8.5 + CORE_OZ) * CELL },
  { x: (17.5 + CORE_OX) * CELL, z: (8.5 + CORE_OZ) * CELL },
  { x: (19.5 + CORE_OX) * CELL, z: (8.5 + CORE_OZ) * CELL },
  { x: (21.5 + CORE_OX) * CELL, z: (8.5 + CORE_OZ) * CELL },
  { x: (4.5 + CORE_OX) * CELL, z: (8.5 + CORE_OZ) * CELL },
  { x: (14.5 + CORE_OX) * CELL, z: (2.5 + CORE_OZ) * CELL },
  { x: (18.5 + CORE_OX) * CELL, z: (2.5 + CORE_OZ) * CELL },
  { x: 41.5 * CELL, z: 11.5 * CELL },
  { x: 16.5 * CELL, z: 26.5 * CELL },
  { x: 26.5 * CELL, z: 26.5 * CELL },
];
