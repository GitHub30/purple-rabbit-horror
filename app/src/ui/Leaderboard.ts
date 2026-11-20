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
  source: 'global' | 'live' | 'local';
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
const REPO_SLUG = 'GitHub30/purple-rabbit-horror';

function fnv1aHex(str: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

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

export function computeSignature(entry: {
  id: string;
  name: string;
  elapsedSec: number;
  difficulty: 'normal' | 'nightmare';
  notesRead: number;
  chasesSurvived: number;
  coinsTossed: number;
}): string {
  const sec10 = Math.round(entry.elapsedSec * 10);
  const raw = `shinjuku-0047|${entry.id}|${entry.name}|${sec10}|${entry.difficulty}|${entry.notesRead}|${entry.chasesSurvived}|${entry.coinsTossed}`;
  return fnv1aHex(raw);
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

export function loadLocalRankings(): RankingEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => x && typeof x.id === 'string' && typeof x.elapsedSec === 'number')
      .map((x) => ({
        id: String(x.id),
        name: sanitizePlayerName(x.name) || '新宿からの脱出者',
        elapsedSec: Math.round(Math.max(1, Number(x.elapsedSec)) * 10) / 10,
        difficulty: x.difficulty === 'nightmare' ? 'nightmare' : 'normal',
        notesRead: Math.max(0, Math.min(8, Math.floor(Number(x.notesRead) || 0))),
        totalNotes: Math.max(1, Math.floor(Number(x.totalNotes) || 8)),
        chasesSurvived: Math.max(0, Math.floor(Number(x.chasesSurvived) || 0)),
        coinsTossed: Math.max(0, Math.floor(Number(x.coinsTossed) || 0)),
        clearedAt: typeof x.clearedAt === 'string' ? x.clearedAt : new Date().toISOString(),
        source: 'local' as const,
      }));
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

export function buildGitHubSubmitUrl(entry: RankingEntry): string {
  const payload = {
    id: entry.id,
    name: entry.name,
    elapsedSec: entry.elapsedSec,
    difficulty: entry.difficulty,
    notesRead: entry.notesRead,
    chasesSurvived: entry.chasesSurvived,
    coinsTossed: entry.coinsTossed,
    sig: computeSignature(entry),
  };
  const diffLabel = entry.difficulty === 'nightmare' ? '悪夢' : '通常';
  const rank = computeClearRank(entry.elapsedSec, entry.difficulty);
  const title = `[脱出記録] ${entry.name} / ${formatClearTime(entry.elapsedSec)} (${diffLabel}・ランク${rank})`;
  const body = [
    'このまま下の「Submit new issue」ボタンを押すと、自動的にオンライン全体ランキングへ登録されます。',
    '',
    '```json',
    JSON.stringify(payload, null, 2),
    '```',
  ].join('\n');
  const params = new URLSearchParams({
    labels: 'clear-ranking',
    title,
    body,
  });
  return `https://github.com/${REPO_SLUG}/issues/new?${params.toString()}`;
}

async function fetchStaticGlobalRankings(): Promise<{ ok: boolean; entries: RankingEntry[] }> {
  try {
    const res = await fetch(`./rankings.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return { ok: false, entries: [] };
    const data = await res.json();
    const list = Array.isArray(data?.entries) ? data.entries : [];
    const entries = list
      .filter((x: unknown): x is Record<string, unknown> => !!x && typeof x === 'object')
      .map((x: Record<string, unknown>) => ({
        id: String(x.id || ''),
        name: sanitizePlayerName(String(x.name || '')) || '脱出者',
        elapsedSec: Math.round(Math.max(1, Number(x.elapsedSec) || 0) * 10) / 10,
        difficulty: x.difficulty === 'nightmare' ? ('nightmare' as const) : ('normal' as const),
        notesRead: Math.max(0, Math.min(8, Math.floor(Number(x.notesRead) || 0))),
        totalNotes: Math.max(1, Math.floor(Number(x.totalNotes) || 8)),
        chasesSurvived: Math.max(0, Math.floor(Number(x.chasesSurvived) || 0)),
        coinsTossed: Math.max(0, Math.floor(Number(x.coinsTossed) || 0)),
        clearedAt: typeof x.clearedAt === 'string' ? x.clearedAt : new Date().toISOString(),
        source: 'global' as const,
      }))
      .filter((x: RankingEntry) => x.id.length > 0 && x.elapsedSec >= 20);
    return { ok: true, entries };
  } catch {
    return { ok: false, entries: [] };
  }
}

async function fetchLiveIssueRankings(): Promise<RankingEntry[]> {
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 3500);
    const res = await fetch(
      `https://api.github.com/repos/${REPO_SLUG}/issues?labels=clear-ranking&state=open&per_page=50`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        signal: controller.signal,
      }
    );
    window.clearTimeout(timer);
    if (!res.ok) return [];
    const issues = await res.json();
    if (!Array.isArray(issues)) return [];
    const out: RankingEntry[] = [];
    for (const iss of issues) {
      const body = typeof iss?.body === 'string' ? iss.body : '';
      const m = body.match(/```json\s*([\s\S]*?)```/);
      if (!m) continue;
      try {
        const d = JSON.parse(m[1]);
        const elapsedSec = Math.round(Number(d.elapsedSec) * 10) / 10;
        const difficulty = d.difficulty === 'nightmare' ? 'nightmare' : d.difficulty === 'normal' ? 'normal' : null;
        if (!difficulty || !Number.isFinite(elapsedSec) || elapsedSec < 25 || elapsedSec > 7200) continue;
        const entry: RankingEntry = {
          id: String(d.id || `gh-${iss.number}`),
          name: sanitizePlayerName(d.name || iss?.user?.login || '') || '脱出者',
          elapsedSec,
          difficulty,
          notesRead: Math.max(0, Math.min(8, Math.floor(Number(d.notesRead) || 0))),
          totalNotes: 8,
          chasesSurvived: Math.max(0, Math.floor(Number(d.chasesSurvived) || 0)),
          coinsTossed: Math.max(0, Math.floor(Number(d.coinsTossed) || 0)),
          clearedAt: typeof iss.created_at === 'string' ? iss.created_at : new Date().toISOString(),
          source: 'live',
        };
        if (d.sig && d.sig !== computeSignature(entry)) continue;
        out.push(entry);
      } catch {}
    }
    return out;
  } catch {
    return [];
  }
}

export interface MergedRankingResult {
  entries: RankingEntry[];
  onlineSynced: boolean;
}

export async function fetchMergedRankings(): Promise<MergedRankingResult> {
  const local = loadLocalRankings();
  const [globalRes, liveList] = await Promise.all([
    fetchStaticGlobalRankings(),
    fetchLiveIssueRankings(),
  ]);

  const byId = new Map<string, RankingEntry>();
  for (const e of local) byId.set(e.id, e);
  for (const e of liveList) byId.set(e.id, e);
  for (const e of globalRes.entries) byId.set(e.id, e);

  return {
    entries: sortRankings(Array.from(byId.values())).slice(0, 100),
    onlineSynced: globalRes.ok || liveList.length > 0,
  };
}
