import {
  CELL,
  COLS,
  GATE_LINE_X,
  GATE_LINE_Z,
  PEDESTAL_POS,
  ROWS,
  SHINJUKU_GRID,
  worldToCell,
} from './shinjukuMap';

export interface AABB {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  opaque: boolean;
}

export class CollisionSystem {
  colliders: AABB[] = [];
  private exitGateColliderIndex = -1;

  constructor() {
    this.buildColliders();
  }

  private buildColliders(): void {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = SHINJUKU_GRID[r][c];
        const x0 = c * CELL;
        const z0 = r * CELL;
        if (cell === 1) {
          this.colliders.push({
            minX: x0,
            maxX: x0 + CELL,
            minZ: z0,
            maxZ: z0 + CELL,
            opaque: true,
          });
        } else if (cell === 2) {
          // J・ADビジョン新宿駅 Rectangular Light-Box Digital Signage Column (1.92m x 1.54m)
          const padX = (CELL - 1.92) * 0.5;
          const padZ = (CELL - 1.54) * 0.5;
          this.colliders.push({
            minX: x0 + padX,
            maxX: x0 + CELL - padX,
            minZ: z0 + padZ,
            maxZ: z0 + CELL - padZ,
            opaque: true,
          });
        } else if (cell === 3) {
          // みどりの窓口 Ticket Office glass storefront (runs East-West along North face of R5, allows LOS!)
          this.colliders.push({
            minX: x0,
            maxX: x0 + CELL,
            minZ: z0 + 0.15,
            maxZ: z0 + 0.65,
            opaque: false,
          });
        } else if (cell === 4) {
          // JR Shinjuku Platform 1-16 Ascending Staircase & Escalator Block
          this.colliders.push({
            minX: x0 + 0.16,
            maxX: x0 + CELL - 0.16,
            minZ: z0 + 0.14,
            maxZ: z0 + CELL - 0.14,
            opaque: false,
          });
        } else if (cell === 5) {
          // West Plaza / Metro Promenade / East Plaza Cylindrical Structural Column (D = 1.56m)
          const pad = (CELL - 1.56) * 0.5;
          this.colliders.push({
            minX: x0 + pad,
            maxX: x0 + CELL - pad,
            minZ: z0 + pad,
            maxZ: z0 + CELL - pad,
            opaque: true,
          });
        } else if (cell === 6) {
          // Tokyo Metro Marunouchi M08 / Odakyu OH01 / Keio KO01 Glass Gate Concourse Partition (transparent LOS!)
          this.colliders.push({
            minX: x0,
            maxX: x0 + CELL,
            minZ: z0,
            maxZ: z0 + CELL,
            opaque: false,
          });
        }
      }
    }

    // Alps Square empty mascot display pedestal
    this.colliders.push({
      minX: PEDESTAL_POS.x - 1.05,
      maxX: PEDESTAL_POS.x + 1.05,
      minZ: PEDESTAL_POS.z - 1.05,
      maxZ: PEDESTAL_POS.z + 1.05,
      opaque: false,
    });

    // East Exit (歌舞伎町・アルタ方面 地上出口) side gate banks along x = GATE_LINE_X (R6..R8 -> z = 24m..36m)
    this.colliders.push({
      minX: GATE_LINE_X - 0.68,
      maxX: GATE_LINE_X + 0.68,
      minZ: 6.0 * CELL,
      maxZ: GATE_LINE_Z - 1.35,
      opaque: false,
    });
    this.colliders.push({
      minX: GATE_LINE_X - 0.68,
      maxX: GATE_LINE_X + 0.68,
      minZ: GATE_LINE_Z + 1.35,
      maxZ: 9.0 * CELL,
      opaque: false,
    });

    // Center East Exit Emergency Gate & Shutter (unlocks when 5/5 Suica charges complete!)
    this.exitGateColliderIndex = this.colliders.length;
    this.colliders.push({
      minX: GATE_LINE_X - 0.62,
      maxX: GATE_LINE_X + 0.62,
      minZ: GATE_LINE_Z - 1.35,
      maxZ: GATE_LINE_Z + 1.35,
      opaque: false,
    });

    // Midori-no-Madoguchi interior counter desk (inside R11 behind glass at C13..15)
    this.colliders.push({
      minX: 15.2 * CELL - 1.2,
      maxX: 15.2 * CELL + 1.2,
      minZ: 11.2 * CELL - 0.45,
      maxZ: 11.2 * CELL + 0.45,
      opaque: false,
    });

    // Inside-gate waiting bench (between 13・14 and 11・12 stairs at R13)
    this.colliders.push({
      minX: 12.6 * CELL - 1.4,
      maxX: 12.6 * CELL + 1.4,
      minZ: 13.5 * CELL - 0.35,
      maxZ: 13.5 * CELL + 0.35,
      opaque: false,
    });
  }

  setExitGateUnlocked(unlocked: boolean): void {
    const col = this.colliders[this.exitGateColliderIndex];
    if (!col) return;
    if (unlocked) {
      col.minZ = -999;
      col.maxZ = -998;
    } else {
      col.minZ = GATE_LINE_Z - 1.35;
      col.maxZ = GATE_LINE_Z + 1.35;
    }
  }

  resolveCircle(x: number, z: number, radius: number): { x: number; z: number } {
    let rx = x;
    let rz = z;
    for (let iter = 0; iter < 3; iter++) {
      for (const box of this.colliders) {
        const cx = Math.max(box.minX, Math.min(rx, box.maxX));
        const cz = Math.max(box.minZ, Math.min(rz, box.maxZ));
        const dx = rx - cx;
        const dz = rz - cz;
        const d2 = dx * dx + dz * dz;
        if (d2 < radius * radius) {
          if (d2 > 1e-8) {
            const d = Math.sqrt(d2);
            const push = radius - d;
            rx += (dx / d) * push;
            rz += (dz / d) * push;
          } else {
            const dL = Math.abs(rx - box.minX);
            const dR = Math.abs(rx - box.maxX);
            const dT = Math.abs(rz - box.minZ);
            const dB = Math.abs(rz - box.maxZ);
            const m = Math.min(dL, dR, dT, dB);
            if (m === dL) rx = box.minX - radius;
            else if (m === dR) rx = box.maxX + radius;
            else if (m === dT) rz = box.minZ - radius;
            else rz = box.maxZ + radius;
          }
        }
      }
    }
    return { x: rx, z: rz };
  }

  hasLineOfSight(x1: number, z1: number, x2: number, z2: number): boolean {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const dist = Math.hypot(dx, dz);
    if (dist < 0.05) return true;
    const steps = Math.ceil(dist / 0.35);
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const px = x1 + dx * t;
      const pz = z1 + dz * t;
      for (const box of this.colliders) {
        if (!box.opaque) continue;
        if (px >= box.minX && px <= box.maxX && pz >= box.minZ && pz <= box.maxZ) {
          return false;
        }
      }
    }
    return true;
  }
}

export function findGridPath(
  start: { x: number; z: number },
  goal: { x: number; z: number }
): Array<{ x: number; z: number }> {
  const s = worldToCell(start.x, start.z);
  const g = worldToCell(goal.x, goal.z);

  const isWalkable = (c: number, r: number): boolean => {
    if (c < 1 || c >= COLS - 1 || r < 1 || r >= ROWS - 1) return false;
    return SHINJUKU_GRID[r][c] === 0;
  };

  const clampWalkable = (cell: { col: number; row: number }) => {
    if (isWalkable(cell.col, cell.row)) return cell;
    for (let rad = 1; rad <= 3; rad++) {
      for (let dr = -rad; dr <= rad; dr++) {
        for (let dc = -rad; dc <= rad; dc++) {
          if (isWalkable(cell.col + dc, cell.row + dr)) {
            return { col: cell.col + dc, row: cell.row + dr };
          }
        }
      }
    }
    return { col: 15, row: 7 };
  };

  const sCell = clampWalkable(s);
  const gCell = clampWalkable(g);
  const key = (c: number, r: number) => `${c},${r}`;

  interface Node {
    c: number;
    r: number;
    g: number;
    f: number;
    parent: Node | null;
  }

  const open: Node[] = [
    {
      c: sCell.col,
      r: sCell.row,
      g: 0,
      f: Math.hypot(gCell.col - sCell.col, gCell.row - sCell.row),
      parent: null,
    },
  ];
  const bestG = new Map<string, number>([[key(sCell.col, sCell.row), 0]]);
  const dirs = [
    [1, 0, 1],
    [-1, 0, 1],
    [0, 1, 1],
    [0, -1, 1],
    [1, 1, 1.414],
    [-1, 1, 1.414],
    [1, -1, 1.414],
    [-1, -1, 1.414],
  ];

  let found: Node | null = null;
  let steps = 0;
  while (open.length > 0 && steps++ < 1600) {
    open.sort((a, b) => a.f - b.f);
    const cur = open.shift()!;
    if (cur.c === gCell.col && cur.r === gCell.row) {
      found = cur;
      break;
    }
    for (const [dc, dr, cost] of dirs) {
      const nc = cur.c + dc;
      const nr = cur.r + dr;
      if (!isWalkable(nc, nr)) continue;
      if (dc !== 0 && dr !== 0 && (!isWalkable(cur.c + dc, cur.r) || !isWalkable(cur.c, cur.r + dr))) {
        continue;
      }
      const ng = cur.g + cost;
      const k = key(nc, nr);
      if (ng < (bestG.get(k) ?? Infinity)) {
        bestG.set(k, ng);
        open.push({
          c: nc,
          r: nr,
          g: ng,
          f: ng + Math.hypot(gCell.col - nc, gCell.row - nr),
          parent: cur,
        });
      }
    }
  }

  if (!found) return [{ x: goal.x, z: goal.z }];
  const pts: Array<{ x: number; z: number }> = [];
  let cur: Node | null = found;
  while (cur && cur.parent) {
    pts.unshift({ x: (cur.c + 0.5) * CELL, z: (cur.r + 0.5) * CELL });
    cur = cur.parent;
  }
  if (pts.length > 0) {
    pts[pts.length - 1] = { x: goal.x, z: goal.z };
  } else {
    pts.push({ x: goal.x, z: goal.z });
  }
  return pts;
}
