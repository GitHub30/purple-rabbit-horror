export type ClearRank = 'S' | 'A' | 'B';
export type RankingFilter = 'all' | 'normal' | 'nightmare';

export interface RankingEntry {
  id: string;
  name: string;
  elapsedSec: number;
  difficulty: 'normal' | 'nightmare';
  notesRead: number;
  totalNotes: number;
  chasesSurvived: number;
  coinsTossed: number;
  clearedAt: string;
  source: 'global' | 'local';
}

export interface RankingRunInput {
  elapsedSec: number;
  difficulty: 'normal' | 'nightmare';
  notesRead: number;
  totalNotes: number;
  chasesSurvived: number;
  coinsTossed: number;
}

const LOCAL_STORAGE_KEY = 'purple_rabbit_shinjuku_rankings_v1';
const PLAYER_NAME_KEY = 'purple_rabbit_shinjuku_player_name_v1';

// JSONBin.io v3 Global Leaderboard Configuration
export const JSONBIN_BIN_ID = '6b002310ac6210605a971ec7';
export const JSONBIN_MASTER_KEY =
  '$2a$10$aIIH0qWAL2Me4dWkIMtp1OTdWRxiWQoOJtRidy.VAGvKV3wxDKtky';
const JSONBIN_BASE_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

export function sanitizePlayerName(raw: string): string {
  return String(raw || '')
    .replace(/[\u0000-\u001f\u007f<>`]/g, '')
    .trim()
    .slice(0, 16);
}

export function computeClearRank(elapsedSec: number, difficulty: 'normal' | 'nightmare'): ClearRank {
  if (difficulty === 'nightmare') {
    if (elapsedSec < 300) return 'S';
    if (elapsedSec < 480) return 'A';
    return 'B';
  }
  if (elapsedSec < 180) return 'S';
  if (elapsedSec < 330) return 'A';
  return 'B';
}

export function formatClearTime(sec: number): string {
  const safe = Math.max(0, sec);
  const m = Math.floor(safe / 60);
  const s = Math.floor(safe % 60);
  const tenths = Math.floor((safe * 10) % 10);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${tenths}`;
}

export function formatShortDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export function sortRankings(entries: RankingEntry[]): RankingEntry[] {
  return [...entries].sort((a, b) => {
    if (a.elapsedSec !== b.elapsedSec) return a.elapsedSec - b.elapsedSec;
    if (a.difficulty !== b.difficulty) return a.difficulty === 'nightmare' ? -1 : 1;
    if (b.notesRead !== a.notesRead) return b.notesRead - a.notesRead;
    if (a.coinsTossed !== b.coinsTossed) return a.coinsTossed - b.coinsTossed;
    return a.clearedAt.localeCompare(b.clearedAt);
  });
}

export function loadSavedPlayerName(): string {
  try {
    return sanitizePlayerName(localStorage.getItem(PLAYER_NAME_KEY) || '');
  } catch {
    return '';
  }
}

export function savePlayerName(name: string): void {
  try {
    const clean = sanitizePlayerName(name);
    if (clean) localStorage.setItem(PLAYER_NAME_KEY, clean);
  } catch {}
}

function normalizeEntry(raw: unknown, source: 'global' | 'local'): RankingEntry | null {
  if (!raw || typeof raw !== 'object') return null;
  const x = raw as Record<string, unknown>;
  const id = String(x.id || '').trim();
  const elapsedSec = Math.round(Number(x.elapsedSec) * 10) / 10;
  if (!id || !Number.isFinite(elapsedSec) || elapsedSec < 1 || elapsedSec > 10800) return null;
  return {
    id,
    name: sanitizePlayerName(String(x.name || '')) || '新宿からの脱出者',
    elapsedSec,
    difficulty: x.difficulty === 'nightmare' ? 'nightmare' : 'normal',
    notesRead: Math.max(0, Math.min(8, Math.floor(Number(x.notesRead) || 0))),
    totalNotes: Math.max(1, Math.floor(Number(x.totalNotes) || 8)),
    chasesSurvived: Math.max(0, Math.floor(Number(x.chasesSurvived) || 0)),
    coinsTossed: Math.max(0, Math.floor(Number(x.coinsTossed) || 0)),
    clearedAt: typeof x.clearedAt === 'string' ? x.clearedAt : new Date().toISOString(),
    source,
  };
}

export function loadLocalRankings(): RankingEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const out: RankingEntry[] = [];
    for (const item of parsed) {
      const e = normalizeEntry(item, 'local');
      if (e) out.push(e);
    }
    return sortRankings(out);
  } catch {
    return [];
  }
}

export function saveLocalRanking(entry: RankingEntry): RankingEntry[] {
  const list = loadLocalRankings();
  const idx = list.findIndex((e) => e.id === entry.id);
  if (idx >= 0) list[idx] = { ...entry, source: 'local' };
  else list.push({ ...entry, source: 'local' });
  const sorted = sortRankings(list).slice(0, 50);
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sorted));
  } catch {}
  return sorted;
}

export function createRunEntry(name: string, run: RankingRunInput, existingId?: string): RankingEntry {
  const cleanName = sanitizePlayerName(name) || '新宿からの脱出者';
  const id =
    existingId ||
    `run_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  return {
    id,
    name: cleanName,
    elapsedSec: Math.round(Math.max(1, run.elapsedSec) * 10) / 10,
    difficulty: run.difficulty,
    notesRead: run.notesRead,
    totalNotes: run.totalNotes,
    chasesSurvived: run.chasesSurvived,
    coinsTossed: run.coinsTossed,
    clearedAt: new Date().toISOString(),
    source: 'local',
  };
}

async function fetchJsonBinLatest(): Promise<{ ok: boolean; entries: RankingEntry[] }> {
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 6500);
    const res = await fetch(`${JSONBIN_BASE_URL}/latest`, {
      method: 'GET',
      headers: {
        'X-Master-Key': JSONBIN_MASTER_KEY,
      },
      cache: 'no-store',
      signal: controller.signal,
    });
    window.clearTimeout(timer);
    if (!res.ok) return { ok: false, entries: [] };
    const payload = await res.json();
    const record = payload?.record ?? payload;
    const rawList = Array.isArray(record?.entries) ? record.entries : [];
    const entries: RankingEntry[] = [];
    for (const item of rawList) {
      const e = normalizeEntry(item, 'global');
      if (e) entries.push(e);
    }
    return { ok: true, entries: sortRankings(entries) };
  } catch {
    return { ok: false, entries: [] };
  }
}

export interface MergedRankingResult {
  entries: RankingEntry[];
  onlineSynced: boolean;
}

export async function fetchMergedRankings(): Promise<MergedRankingResult> {
  const local = loadLocalRankings();
  const remote = await fetchJsonBinLatest();

  const byId = new Map<string, RankingEntry>();
  for (const e of local) byId.set(e.id, e);
  for (const e of remote.entries) byId.set(e.id, e);

  return {
    entries: sortRankings(Array.from(byId.values())).slice(0, 100),
    onlineSynced: remote.ok,
  };
}

export interface SubmitRankingResult {
  ok: boolean;
  entries: RankingEntry[];
  entry: RankingEntry;
}

/**
 * Automatically read-merge-write the clear record to JSONBin.io.
 * Only executes PUT if the preceding GET succeeded, preventing accidental data loss if offline.
 */
export async function submitRankingToJsonBin(entry: RankingEntry): Promise<SubmitRankingResult> {
  saveLocalRanking(entry);

  const remote = await fetchJsonBinLatest();
  if (!remote.ok) {
    const local = loadLocalRankings();
    return { ok: false, entries: local, entry };
  }

  const byId = new Map<string, RankingEntry>();
  for (const e of remote.entries) byId.set(e.id, e);
  const storedEntry: RankingEntry = { ...entry, source: 'global' };
  byId.set(storedEntry.id, storedEntry);

  const mergedGlobal = sortRankings(Array.from(byId.values())).slice(0, 100);
  const wireEntries = mergedGlobal.map(({ source: _src, ...rest }) => rest);

  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 7500);
    const putRes = await fetch(JSONBIN_BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_MASTER_KEY,
      },
      body: JSON.stringify({
        version: 1,
        updatedAt: new Date().toISOString(),
        entries: wireEntries,
      }),
      signal: controller.signal,
    });
    window.clearTimeout(timer);
    if (!putRes.ok) {
      return { ok: false, entries: mergedGlobal, entry };
    }
  } catch {
    return { ok: false, entries: mergedGlobal, entry };
  }

  // Merge any remaining local-only runs into the returned view
  const local = loadLocalRankings();
  const displayMap = new Map<string, RankingEntry>();
  for (const e of local) displayMap.set(e.id, e);
  for (const e of mergedGlobal) displayMap.set(e.id, e);

  return {
    ok: true,
    entries: sortRankings(Array.from(displayMap.values())).slice(0, 100),
    entry: storedEntry,
  };
}
