import { CELL, COLS, GATE_LINE_Z, PEDESTAL_POS, ROWS, SHINJUKU_GRID, worldToCell } from './shinjukuMap';

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
          // Shinjuku Digital Signage Pillar (1.42m x 1.42m)
          const pad = (CELL - 1.42) * 0.5;
          this.colliders.push({
            minX: x0 + pad,
            maxX: x0 + CELL - pad,
            minZ: z0 + pad,
            maxZ: z0 + CELL - pad,
            opaque: true,
          });
        } else if (cell === 3) {
          // Transparent glass station office partition (blocks movement, allows LOS!)
          this.colliders.push({
            minX: x0 + CELL * 0.5 - 0.24,
            maxX: x0 + CELL * 0.5 + 0.24,
            minZ: z0,
            maxZ: z0 + CELL,
            opaque: false,
          });
        } else if (cell === 4) {
          // Yamanote / Chuo Platform Stairwell Iron Grille (blocks movement, allows seeing through!)
          this.colliders.push({
            minX: x0 + 0.15,
            maxX: x0 + CELL - 0.15,
            minZ: z0 + 0.15,
            maxZ: z0 + CELL - 0.15,
            opaque: false,
          });
        }
      }
    }

    // Alps Square central empty mascot pedestal
    this.colliders.push({
      minX: PEDESTAL_POS.x - 1.05,
      maxX: PEDESTAL_POS.x + 1.05,
      minZ: PEDESTAL_POS.z - 1.05,
      maxZ: PEDESTAL_POS.z + 1.05,
      opaque: false,
    });

    // East Ticket Gate side banks (left & right of center emergency gate @ x = 30.0)
    this.colliders.push({
      minX: 23.6,
      maxX: 28.7,
      minZ: GATE_LINE_Z - 0.72,
      maxZ: GATE_LINE_Z + 0.72,
      opaque: false,
    });
    this.colliders.push({
      minX: 31.3,
      maxX: 36.4,
      minZ: GATE_LINE_Z - 0.72,
      maxZ: GATE_LINE_Z + 0.72,
      opaque: false,
    });

    // Center East Ticket Gate (unlocks when 5/5 charges complete)
    this.exitGateColliderIndex = this.colliders.length;
    this.colliders.push({
      minX: 28.7,
      maxX: 31.3,
      minZ: GATE_LINE_Z - 0.6,
      maxZ: GATE_LINE_Z + 0.6,
      opaque: false,
    });

    // Station office desk
    this.colliders.push({
      minX: 44.3,
      maxX: 45.8,
      minZ: 11.4,
      maxZ: 14.3,
      opaque: false,
    });

    // West waiting bench
    this.colliders.push({
      minX: 11.0,
      maxX: 14.2,
      minZ: 36.4,
      maxZ: 37.3,
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
      col.minZ = GATE_LINE_Z - 0.6;
      col.maxZ = GATE_LINE_Z + 0.6;
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
            const dR = Math.abs(box.maxX - rx);
            const dT = Math.abs(rz - box.minZ);
            const dB = Math.abs(box.maxZ - rz);
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
    if (c < 0 || c >= COLS || r < 1 || r >= ROWS) return false;
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
    return { col: 7, row: 4 };
  };

  const sc = clampWalkable(s);
  const gc = clampWalkable(g);
  if (sc.col === gc.col && sc.row === gc.row) return [goal];

  const key = (c: number, r: number) => r * COLS + c;
  const open: number[] = [key(sc.col, sc.row)];
  const cameFrom = new Int16Array(COLS * ROWS).fill(-1);
  const gScore = new Float32Array(COLS * ROWS).fill(1e9);
  const fScore = new Float32Array(COLS * ROWS).fill(1e9);
  const inOpen = new Uint8Array(COLS * ROWS);

  const startK = key(sc.col, sc.row);
  const goalK = key(gc.col, gc.row);
  gScore[startK] = 0;
  fScore[startK] = Math.abs(sc.col - gc.col) + Math.abs(sc.row - gc.row);
  inOpen[startK] = 1;

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (open.length > 0) {
    let bestIdx = 0;
    for (let i = 1; i < open.length; i++) {
      if (fScore[open[i]] < fScore[open[bestIdx]]) bestIdx = i;
    }
    const curr = open.splice(bestIdx, 1)[0];
    inOpen[curr] = 0;
    if (curr === goalK) {
      const path: Array<{ x: number; z: number }> = [];
      let k = curr;
      while (k !== -1 && k !== startK) {
        const r = Math.floor(k / COLS);
        const c = k % COLS;
        path.push({ x: (c + 0.5) * CELL, z: (r + 0.5) * CELL });
        k = cameFrom[k];
      }
      path.reverse();
      if (path.length > 0) path[path.length - 1] = { x: goal.x, z: goal.z };
      return path;
    }

    const cr = Math.floor(curr / COLS);
    const cc = curr % COLS;
    for (const [dc, dr] of dirs) {
      const nc = cc + dc;
      const nr = cr + dr;
      if (!isWalkable(nc, nr)) continue;
      const nk = key(nc, nr);
      const tentG = gScore[curr] + 1;
      if (tentG < gScore[nk]) {
        cameFrom[nk] = curr;
        gScore[nk] = tentG;
        fScore[nk] = tentG + Math.abs(nc - gc.col) + Math.abs(nr - gc.row);
        if (!inOpen[nk]) {
          open.push(nk);
          inOpen[nk] = 1;
        }
      }
    }
  }
  return [goal];
}
