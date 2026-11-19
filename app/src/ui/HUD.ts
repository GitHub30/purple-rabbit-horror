import { CELL, COLS, LoreNoteDef, ROWS, SHINJUKU_GRID } from '../station/shinjukuMap';
import { TerminalInstance } from '../station/ShinjukuStation';

export type ScreenName = 'LOADING' | 'TITLE' | 'PLAYING' | 'PAUSED' | 'NOTE' | 'JUMPSCARE' | 'GAMEOVER' | 'VICTORY';

export interface HUDCallbacks {
  onStartGame: (difficulty: 'normal' | 'nightmare') => void;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
  onReturnTitle: () => void;
  onCloseNote: () => void;
  onToggleMute: () => boolean;
  onSensitivityChange: (v: number) => void;
  onBrightnessChange: (v: number) => void;
  onTouchModeChange: (m: 'auto' | 'on' | 'off') => void;
  onQualityChange: (q: 'ultra' | 'standard') => void;
}

export interface EndStats {
  elapsedSec: number;
  charges: number;
  notesRead: number;
  totalNotes: number;
  coinsTossed: number;
  chasesSurvived: number;
  difficulty: 'normal' | 'nightmare';
}

export class HUD {
  private rootEl = document.documentElement;
  private loadingScreen = document.getElementById('screen-loading')!;
  private titleScreen = document.getElementById('screen-title')!;
  private hudLayer = document.getElementById('hud-layer')!;
  private pauseScreen = document.getElementById('screen-pause')!;
  private noteScreen = document.getElementById('screen-note')!;
  private gameoverScreen = document.getElementById('screen-gameover')!;
  private victoryScreen = document.getElementById('screen-victory')!;
  private hideOverlay = document.getElementById('hide-slats-overlay')!;
  private hideBreathLabel = document.getElementById('hide-breath-label')!;
  private breathMeterWrap = document.getElementById('breath-meter-wrap')!;
  private breathMeterFill = document.getElementById('breath-meter-fill')!;
  private breathMeterHint = document.getElementById('breath-meter-hint')!;

  private balanceEl = document.getElementById('ic-balance')!;
  private objectiveEl = document.getElementById('ic-objective')!;
  private pipEls = Array.from(document.querySelectorAll('.ic-pip'));
  private cctvClockEl = document.getElementById('cctv-clock')!;
  private muteBtn = document.getElementById('btn-mute')!;
  private crosshairEl = document.getElementById('crosshair')!;
  private chargeWrapEl = document.getElementById('charge-ring-wrap')!;
  private chargeFillEl = document.getElementById('charge-ring-fill') as unknown as SVGCircleElement;
  private chargePctEl = document.getElementById('charge-pct')!;
  private promptEl = document.getElementById('interact-prompt')!;
  private promptKeyEl = document.getElementById('prompt-key')!;
  private promptTextEl = document.getElementById('prompt-text')!;
  private subtitleEl = document.getElementById('subtitle-bar')!;
  private staminaWrapEl = document.getElementById('stamina-wrap')!;
  private staminaFillEl = document.getElementById('stamina-fill')!;
  private statusFlashEl = document.getElementById('status-flashlight')!;
  private statusCrouchEl = document.getElementById('status-crouch')!;
  private statusCoinsEl = document.getElementById('status-coins')!;
  private statusMapEl = document.getElementById('status-map')!;
  private lookHintEl = document.getElementById('look-hint')!;
  private mapPanelEl = document.getElementById('station-map-panel')!;
  private mapCanvas = document.getElementById('station-map-canvas') as HTMLCanvasElement;
  private mapCtx = this.mapCanvas.getContext('2d')!;

  private noteTitleEl = document.getElementById('note-title')!;
  private noteDateEl = document.getElementById('note-date')!;
  private noteBodyEl = document.getElementById('note-body')!;
  private gameoverStatsEl = document.getElementById('gameover-stats')!;
  private victoryStatsEl = document.getElementById('victory-stats')!;
  private diffButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-diff]'));

  private subtitleTimeout = 0;
  private selectedDifficulty: 'normal' | 'nightmare' = 'normal';
  mapOpen = false;

  constructor(cb: HUDCallbacks) {
    document.getElementById('btn-start')?.addEventListener('click', () => {
      cb.onStartGame(this.selectedDifficulty);
    });
    document.getElementById('btn-pause-hud')?.addEventListener('click', cb.onPause);
    document.getElementById('btn-resume')?.addEventListener('click', cb.onResume);
    document.getElementById('btn-pause-restart')?.addEventListener('click', cb.onRestart);
    document.getElementById('btn-pause-title')?.addEventListener('click', cb.onReturnTitle);
    document.getElementById('btn-note-close')?.addEventListener('click', cb.onCloseNote);
    document.getElementById('btn-gameover-retry')?.addEventListener('click', cb.onRestart);
    document.getElementById('btn-gameover-title')?.addEventListener('click', cb.onReturnTitle);
    document.getElementById('btn-victory-retry')?.addEventListener('click', cb.onRestart);
    document.getElementById('btn-victory-title')?.addEventListener('click', cb.onReturnTitle);

    this.muteBtn.addEventListener('click', () => {
      const m = cb.onToggleMute();
      this.muteBtn.textContent = m ? '音声 OFF' : '音声 ON';
    });

    for (const btn of this.diffButtons) {
      btn.addEventListener('click', () => {
        const d = (btn.dataset.diff === 'nightmare' ? 'nightmare' : 'normal') as 'normal' | 'nightmare';
        this.selectedDifficulty = d;
        for (const b of this.diffButtons) b.classList.toggle('is-active', b === btn);
      });
    }

    const sensEl = document.getElementById('slider-sens') as HTMLInputElement | null;
    const sensVal = document.getElementById('val-sens');
    sensEl?.addEventListener('input', () => {
      const v = parseFloat(sensEl.value);
      if (sensVal) sensVal.textContent = `${v.toFixed(1)}x`;
      cb.onSensitivityChange(v);
    });

    const briEl = document.getElementById('slider-bright') as HTMLInputElement | null;
    const briVal = document.getElementById('val-bright');
    briEl?.addEventListener('input', () => {
      const v = parseFloat(briEl.value);
      if (briVal) briVal.textContent = `${Math.round(v * 100)}%`;
      cb.onBrightnessChange(v);
    });

    const touchEl = document.getElementById('select-touch-ui') as HTMLSelectElement | null;
    touchEl?.addEventListener('change', () => {
      const val = touchEl.value;
      if (val === 'auto' || val === 'on' || val === 'off') cb.onTouchModeChange(val);
    });

    const qualEl = document.getElementById('select-quality') as HTMLSelectElement | null;
    qualEl?.addEventListener('change', () => {
      const val = qualEl.value;
      if (val === 'ultra' || val === 'standard') cb.onQualityChange(val);
    });
  }

  setScreen(screen: ScreenName): void {
    this.loadingScreen.hidden = screen !== 'LOADING';
    this.titleScreen.hidden = screen !== 'TITLE';
    this.hudLayer.hidden = screen !== 'PLAYING';
    this.pauseScreen.hidden = screen !== 'PAUSED';
    this.noteScreen.hidden = screen !== 'NOTE';
    this.gameoverScreen.hidden = screen !== 'GAMEOVER';
    this.victoryScreen.hidden = screen !== 'VICTORY';
    if (screen !== 'PLAYING') {
      this.setHiding(false);
      this.mapOpen = false;
      this.mapPanelEl.hidden = true;
    }
  }

  setHiding(hiding: boolean, kind: 'locker' | 'phonebooth' = 'locker'): void {
    document.body.classList.toggle('is-hiding', hiding);
    this.hideOverlay.classList.toggle('is-hiding', hiding);
    this.hideOverlay.classList.toggle('is-phonebooth', hiding && kind === 'phonebooth');
    this.breathMeterWrap.hidden = !hiding;
  }

  updateBreathState(breath: number, holding: boolean, danger: boolean, touchEnabled: boolean): void {
    this.breathMeterFill.style.width = `${Math.round(breath * 100)}%`;
    this.breathMeterWrap.classList.toggle('is-danger', danger);
    this.breathMeterWrap.classList.toggle('is-holding', holding);
    if (danger) {
      this.hideBreathLabel.textContent = holding
        ? '息を止めている…動くな…'
        : 'すぐ外にいる！！ 息を止めろ！！';
      this.breathMeterHint.textContent = touchEnabled ? '「息を止める」を長押し！' : '[Space] 長押しで息を止める！';
    } else {
      this.hideBreathLabel.textContent = holding ? '息を潜めている…' : '隠れている…';
      this.breathMeterHint.textContent = touchEnabled ? '右の「息を止める」で無音化' : '[Space] 長押しで息を止める';
    }
  }

  toggleMap(): void {
    this.mapOpen = !this.mapOpen;
    this.mapPanelEl.hidden = !this.mapOpen;
    this.statusMapEl.classList.toggle('is-on', this.mapOpen);
  }

  updateChargeCount(done: number, total: number): void {
    const yen = done * 200;
    this.balanceEl.textContent = `¥${yen.toLocaleString()} / ¥1,000`;
    this.pipEls.forEach((el, i) => el.classList.toggle('is-filled', i < done));
    if (done >= total) {
      this.objectiveEl.textContent = '残高到達！ 東改札（歌舞伎町出口）へ走れ！';
      this.objectiveEl.classList.add('is-ready');
    } else {
      this.objectiveEl.textContent = `新宿駅構内のチャージ機を探す（残り ${total - done} 箇所）`;
      this.objectiveEl.classList.remove('is-ready');
    }
  }

  setFearLevel(fear: number, chasing: boolean): void {
    this.rootEl.style.setProperty('--fear', fear.toFixed(3));
    document.body.classList.toggle('is-chasing', chasing);
  }

  setInteractPrompt(prompt: { key: string; text: string } | null): void {
    if (!prompt) {
      this.promptEl.hidden = true;
      this.crosshairEl.classList.remove('is-active');
      return;
    }
    this.promptEl.hidden = false;
    this.promptKeyEl.textContent = prompt.key;
    this.promptTextEl.textContent = prompt.text;
    this.crosshairEl.classList.add('is-active');
  }

  setChargeProgress(p: number): void {
    if (p <= 0) {
      this.chargeWrapEl.hidden = true;
      return;
    }
    this.chargeWrapEl.hidden = false;
    const circ = 2 * Math.PI * 28;
    this.chargeFillEl.style.strokeDasharray = `${circ}`;
    this.chargeFillEl.style.strokeDashoffset = `${circ * (1 - p)}`;
    this.chargePctEl.textContent = `${Math.round(p * 100)}%`;
  }

  showSubtitle(text: string, sec = 4): void {
    this.subtitleEl.textContent = text;
    this.subtitleEl.classList.add('is-visible');
    window.clearTimeout(this.subtitleTimeout);
    this.subtitleTimeout = window.setTimeout(() => {
      this.subtitleEl.classList.remove('is-visible');
    }, sec * 1000);
  }

  updatePlayerStatus(
    _dt: number,
    elapsed: number,
    stamina: number,
    exhausted: boolean,
    flashlightOn: boolean,
    crouching: boolean,
    coins: number,
    pointerLocked: boolean
  ): void {
    const mins = 47 + Math.floor(elapsed / 60);
    const secs = Math.floor(elapsed % 60);
    const hh = String(Math.floor(mins / 60) % 24).padStart(2, '0');
    const mm = String(mins % 60).padStart(2, '0');
    const ss = String(secs).padStart(2, '0');
    this.cctvClockEl.textContent = `SHINJUKU CAM-E04  ${hh}:${mm}:${ss}`;

    this.staminaWrapEl.classList.toggle('is-visible', stamina < 0.98 || exhausted);
    this.staminaFillEl.style.width = `${Math.round(stamina * 100)}%`;
    this.staminaFillEl.classList.toggle('is-exhausted', exhausted);

    this.statusFlashEl.textContent = flashlightOn ? '[F] ライト ON' : '[F] ライト OFF';
    this.statusFlashEl.classList.toggle('is-on', flashlightOn);
    this.statusCrouchEl.textContent = crouching ? '[C] しゃがみ' : '[C] 立つ';
    this.statusCrouchEl.classList.toggle('is-on', crouching);
    this.statusCoinsEl.textContent = `[G] 硬貨 ×${coins}`;
    this.statusCoinsEl.classList.toggle('is-empty', coins <= 0);
    this.lookHintEl.style.opacity = pointerLocked ? '0' : '0.82';
  }

  renderStationMap(
    px: number,
    pz: number,
    yaw: number,
    terminals: TerminalInstance[],
    exitReady: boolean
  ): void {
    if (!this.mapOpen) return;
    const ctx = this.mapCtx;
    const w = this.mapCanvas.width;
    const h = this.mapCanvas.height;
    ctx.fillStyle = '#0c1116';
    ctx.fillRect(0, 0, w, h);

    const pad = 10;
    const cw = (w - pad * 2) / COLS;
    const ch = (h - pad * 2) / ROWS;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = SHINJUKU_GRID[r][c];
        if (cell === 1) continue;
        ctx.fillStyle =
          r === 0
            ? exitReady
              ? '#247848'
              : '#3b1e20'
            : cell === 2
              ? '#5a4678'
              : cell === 4
                ? '#203c2a'
                : '#232e38';
        ctx.fillRect(pad + c * cw, pad + r * ch, cw - 0.5, ch - 0.5);
      }
    }

    // Zone micro labels
    ctx.fillStyle = '#8ef0b8';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('東改札', pad + 7.5 * cw, pad + 0.85 * ch);
    ctx.fillStyle = '#a0abb4';
    ctx.font = '8px sans-serif';
    ctx.fillText('アルプス広場', pad + 7.5 * cw, pad + 5.7 * ch);
    ctx.fillText('メトロプロムナード', pad + 7.5 * cw, pad + 11.7 * ch);

    // Charge terminals
    for (const t of terminals) {
      const mx = pad + (t.def.x / CELL) * cw;
      const my = pad + (t.def.z / CELL) * ch;
      ctx.fillStyle = t.charged ? '#38d884' : '#4ae0d6';
      ctx.beginPath();
      ctx.arc(mx, my, 4.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Player marker + heading cone
    const ux = pad + (px / CELL) * cw;
    const uy = pad + (pz / CELL) * ch;
    ctx.save();
    ctx.translate(ux, uy);
    ctx.rotate(-yaw);
    ctx.fillStyle = 'rgba(218, 174, 48, 0.28)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-9, -18);
    ctx.lineTo(9, -18);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#e6b836';
    ctx.beginPath();
    ctx.arc(0, 0, 3.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  openNote(note: LoreNoteDef): void {
    this.noteTitleEl.textContent = note.title;
    this.noteDateEl.textContent = note.date;
    this.noteBodyEl.innerHTML = note.lines.map((l) => `<p>${l}</p>`).join('');
    this.setScreen('NOTE');
  }

  showEndStats(victory: boolean, stats: EndStats): void {
    const m = Math.floor(stats.elapsedSec / 60);
    const s = Math.floor(stats.elapsedSec % 60);
    const timeStr = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    const html = `
      <div class="stat-row"><span>舞台</span><strong>JR新宿駅 B1F（東改札）</strong></div>
      <div class="stat-row"><span>難易度</span><strong>${stats.difficulty === 'nightmare' ? '悪夢' : '通常'}</strong></div>
      <div class="stat-row"><span>経過時間</span><strong>${timeStr}</strong></div>
      <div class="stat-row"><span>Suicaチャージ</span><strong>${stats.charges} / 5（¥${stats.charges * 200}）</strong></div>
      <div class="stat-row"><span>追跡からの生還</span><strong>${stats.chasesSurvived} 回</strong></div>
      <div class="stat-row"><span>発見メモ</span><strong>${stats.notesRead} / ${stats.totalNotes}</strong></div>
      <div class="stat-row"><span>硬貨陽動</span><strong>${stats.coinsTossed} 回</strong></div>
    `;
    if (victory) {
      this.victoryStatsEl.innerHTML = html;
      this.setScreen('VICTORY');
    } else {
      this.gameoverStatsEl.innerHTML = html;
      this.setScreen('GAMEOVER');
    }
  }
}
