import { CELL, COLS, getShinjukuZone, HIDING_SPOTS, LoreNoteDef, ROWS, SHINJUKU_GRID } from '../station/shinjukuMap';
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
  private mapZoneEl = document.getElementById('station-map-zone')!;
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
    document.getElementById('btn-map-close')?.addEventListener('click', () => {
      if (this.mapOpen) this.toggleMap();
    });

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
      this.objectiveEl.textContent = '残高到達！ 東口出口（歌舞伎町）へ走れ！';
      this.objectiveEl.classList.add('is-ready');
    } else {
      this.objectiveEl.textContent = `新宿駅B1Fのチャージ機を探す（残り ${total - done} 箇所）`;
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
    pointerLocked: boolean,
    px?: number,
    pz?: number
  ): void {
    const mins = 47 + Math.floor(elapsed / 60);
    const secs = Math.floor(elapsed % 60);
    const hh = String(Math.floor(mins / 60) % 24).padStart(2, '0');
    const mm = String(mins % 60).padStart(2, '0');
    const ss = String(secs).padStart(2, '0');
    const camId = px !== undefined && pz !== undefined ? getShinjukuZone(px, pz).cam : 'CAM-E04';
    this.cctvClockEl.textContent = `SHINJUKU ${camId}  ${hh}:${mm}:${ss}`;

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
    const zone = getShinjukuZone(px, pz);
    this.mapZoneEl.textContent = zone.name;

    const ctx = this.mapCtx;
    const w = this.mapCanvas.width;
    const h = this.mapCanvas.height;
    ctx.fillStyle = '#080d12';
    ctx.fillRect(0, 0, w, h);

    // Subtle architectural coordinate grid
    ctx.strokeStyle = 'rgba(130, 170, 190, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 20; x < w; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 20; y < h; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const padX = 12;
    const padY = 14;
    const cw = (w - padX * 2) / COLS;
    const ch = (h - padY * 2) / ROWS;

    // 1. Real-world Shinjuku Station B1F 35x23 Zone Floorplan
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = SHINJUKU_GRID[r][c];
        const x = padX + c * cw;
        const y = padY + r * ch;

        if (cell === 1) {
          // Architectural highlights embedded in structural walls
          if (r === 10 && c >= 10 && c <= 12) {
            ctx.fillStyle = '#1b3d33'; // きっぷうりば
            ctx.fillRect(x, y, cw - 0.5, ch - 0.5);
          } else if (r === 10 && c >= 22 && c <= 30) {
            ctx.fillStyle = '#2d2036'; // ルミネエスト B1F storefront
            ctx.fillRect(x, y, cw - 0.5, ch - 0.5);
          }
          continue;
        }

        if (cell === 3) {
          ctx.fillStyle = '#146238'; // 地下みどりの窓口
          ctx.fillRect(x, y, cw - 0.5, ch - 0.5);
          continue;
        }

        if (cell === 6) {
          // Private Rail & Subway Glass Ticket-Gate Bays
          if (r === 1) ctx.fillStyle = '#c82626'; // 東京メトロ丸ノ内線 M08 (Red)
          else if (c === 1) ctx.fillStyle = '#1b6dd6'; // 小田急線 OH01 (Cobalt Blue)
          else ctx.fillStyle = '#c41878'; // 京王線 KO01 (Magenta)
          ctx.fillRect(x, y, cw - 0.5, ch - 0.5);
          continue;
        }

        const isEastExit = c >= 33 && r >= 6 && r <= 8;
        const isMetroPromenade = r >= 1 && r <= 3 && c >= 6 && c <= 30;
        const isWestPlaza = c >= 1 && c <= 5 && r >= 1 && r <= 19;
        const isFreePassage = r >= 6 && r <= 9 && c >= 6 && c <= 32;
        const isNexTunnel = c >= 22 && c <= 24 && r >= 19 && r <= 21;
        const isEastWing = c >= 31 && c <= 33 && r >= 10 && r <= 20;
        const isPaidConcourse = c >= 7 && c <= 29 && r >= 11 && r <= 20;

        if (isEastExit) {
          ctx.fillStyle = exitReady ? '#1f7c46' : '#581c24';
        } else if (cell === 2) {
          ctx.fillStyle = '#6042ac'; // J・ADビジョン新宿駅 column
        } else if (cell === 4) {
          ctx.fillStyle = '#14211c'; // Platform stair/escalator bay
        } else if (isNexTunnel) {
          ctx.fillStyle = '#2e1a20'; // 5・6番線 N'EX underground tunnel
        } else if (isMetroPromenade) {
          ctx.fillStyle = '#241c24'; // 東京メトロ メトロプロムナード
        } else if (isWestPlaza) {
          ctx.fillStyle = r >= 13 && r <= 16 ? '#182b44' : r >= 18 ? '#271c32' : '#1b2938';
        } else if (isFreePassage) {
          ctx.fillStyle = '#1f3445'; // 東西自由通路 / アルプス広場
        } else if (isEastWing) {
          ctx.fillStyle = '#242232'; // ルミネエスト・東口連絡通路
        } else if (isPaidConcourse) {
          ctx.fillStyle = '#192a22'; // JR改札内 (1〜16番線 + 中央通路)
        } else {
          ctx.fillStyle = '#1c252e';
        }

        ctx.fillRect(x, y, cw - 0.5, ch - 0.5);

        // Draw circular structural concrete column dot for cell === 5
        if (cell === 5) {
          ctx.fillStyle = '#5a6874';
          ctx.beginPath();
          ctx.arc(x + cw * 0.5, y + ch * 0.5, Math.min(cw, ch) * 0.34, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#9aa8b4';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // 2. Iconic West Plaza Circular Rotary Skylight Atrium ring (C1..5, R5..11)
    ctx.save();
    ctx.strokeStyle = 'rgba(130, 178, 224, 0.35)';
    ctx.lineWidth = 1.4;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.arc(padX + 3.5 * cw, padY + 8.5 * ch, 2.15 * cw, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // 3. Highlight 『新宿ウォール456』 (45.6m LED along North wall of 東西自由通路, C9..20.4, R6)
    ctx.fillStyle = '#38d8f4';
    ctx.fillRect(padX + 9.0 * cw, padY + 6.0 * ch - 3.2, 11.4 * cw, 3.6);

    // 4. Tactile Yellow Guide Lines (メトロプロムナード / 東西自由通路 / 中央通路)
    ctx.strokeStyle = 'rgba(224, 186, 46, 0.30)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(padX + 1.8 * cw, padY + 3.2 * ch);
    ctx.lineTo(padX + 32.5 * cw, padY + 3.2 * ch);
    ctx.moveTo(padX + 2.0 * cw, padY + 7.5 * ch);
    ctx.lineTo(padX + 32.8 * cw, padY + 7.5 * ch);
    ctx.moveTo(padX + 2.2 * cw, padY + 17.3 * ch);
    ctx.lineTo(padX + 33.2 * cw, padY + 17.3 * ch);
    ctx.stroke();

    // 5. ALL 16 JR PLATFORMS (15・16 -> 1・2番線 + 5・6番線 N'EX) Color-Coded Badges
    const northPlatBadges: Array<[number, string, string, string]> = [
      [8, '15·16', '山手/総武', '#7ac142'],
      [11, '13·14', '総武/山手', '#e8be00'],
      [14, '11·12', '中央快速', '#f15a22'],
      [17, '9·10', '中央特急', '#2888d8'],
      [20, '7·8', '中央快速', '#f15a22'],
    ];
    ctx.textAlign = 'center';
    for (const [col, label, sub, color] of northPlatBadges) {
      const bx = padX + (col + 0.5) * cw;
      ctx.fillStyle = color;
      ctx.fillRect(padX + col * cw, padY + 12 * ch, cw - 0.5, 3);
      ctx.fillRect(padX + col * cw, padY + 14.85 * ch, cw - 0.5, 3);
      ctx.fillStyle = '#f2f7f4';
      ctx.font = 'bold 9.5px monospace';
      ctx.fillText(label, bx, padY + 13.45 * ch);
      ctx.fillStyle = '#9bb2a8';
      ctx.font = '600 7px sans-serif';
      ctx.fillText(sub, bx, padY + 14.25 * ch);
    }

    // East JR Platforms 3·4 (埼京/湘南) & 1·2 (湘南/埼京) at C25 & C28 (R14 & R19 stairs)
    const eastPlats: Array<[number, string, string, string]> = [
      [25, '3·4', '埼京/湘南', '#00ac9a'],
      [28, '1·2', '湘南/埼京', '#e21f26'],
    ];
    for (const [col, label, sub, color] of eastPlats) {
      const bx = padX + (col + 0.5) * cw;
      ctx.fillStyle = color;
      ctx.fillRect(padX + col * cw, padY + 14 * ch, cw - 0.5, 3);
      ctx.fillRect(padX + col * cw, padY + 19 * ch, cw - 0.5, 3);
      ctx.fillStyle = '#f2f7f4';
      ctx.font = 'bold 9.5px monospace';
      ctx.fillText(label, bx, padY + 14.95 * ch);
      ctx.fillStyle = '#9db8b2';
      ctx.font = '600 7px sans-serif';
      ctx.fillText(sub, bx, padY + 15.65 * ch);
      ctx.fillStyle = '#d4e6e2';
      ctx.font = 'bold 8px monospace';
      ctx.fillText(label, bx, padY + 19.8 * ch);
    }

    // 5·6番線 成田エクスプレス (N'EX) Underground Passage
    ctx.fillStyle = '#e03a3e';
    ctx.fillRect(padX + 22 * cw, padY + 21.85 * ch, 3 * cw - 0.5, 2.5);
    ctx.fillStyle = '#ff9aa0';
    ctx.font = 'bold 8.5px monospace';
    ctx.fillText("5·6 N'EX", padX + 23.5 * cw, padY + 21.65 * ch);

    // 6. Authentic Shinjuku B1F Wing & Gate Labels (carefully positioned for zero overlap)
    ctx.textAlign = 'center';

    // North: Tokyo Metro Marunouchi Line M08
    ctx.fillStyle = '#ff8a8a';
    ctx.font = 'bold 9.5px sans-serif';
    ctx.fillText('丸ノ内線 西改札 M08', padX + 11.0 * cw, padY + 0.8 * ch);
    ctx.fillText('丸ノ内線 東改札 M08', padX + 23.0 * cw, padY + 0.8 * ch);
    ctx.fillStyle = '#d4c4cf';
    ctx.font = '600 9.5px sans-serif';
    ctx.fillText('← 東京メトロ メトロプロムナード (132m) →', padX + 18.0 * cw, padY + 3.25 * ch);

    // West: West Plaza, Odakyu OH01, Keio KO01
    ctx.fillStyle = '#b4d6f4';
    ctx.font = 'bold 9.5px sans-serif';
    ctx.fillText('西口地下広場', padX + 3.5 * cw, padY + 7.9 * ch);
    ctx.fillStyle = '#8cb6dc';
    ctx.font = '600 7.5px sans-serif';
    ctx.fillText('ロータリー吹抜', padX + 3.5 * cw, padY + 8.85 * ch);

    ctx.fillStyle = '#6db8ff';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('小田急', padX + 2.38 * cw, padY + 14.35 * ch);
    ctx.fillStyle = '#7ec0ff';
    ctx.font = '600 7.5px monospace';
    ctx.fillText('OH01', padX + 2.38 * cw, padY + 15.2 * ch);

    ctx.fillStyle = '#ff78c4';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('京王西口 KO01', padX + 3.5 * cw, padY + 21.1 * ch);

    // Core North: Shinjuku Wall 456 & East-West Free Passage & Alps Plaza
    ctx.fillStyle = '#7ce6fc';
    ctx.font = 'bold 9.5px sans-serif';
    ctx.fillText('━━ 新宿ウォール456 (45.6m) ━━', padX + 14.7 * cw, padY + 5.55 * ch);
    ctx.fillStyle = '#e8f2f8';
    ctx.font = 'bold 10.5px sans-serif';
    ctx.fillText('東西自由通路 (J・ADビジョン柱列)', padX + 14.8 * cw, padY + 7.45 * ch);
    ctx.fillStyle = '#c2dce8';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('アルプス広場', padX + 26.2 * cw, padY + 7.45 * ch);

    // East Exit (Kabukicho)
    ctx.fillStyle = exitReady ? '#6af6aa' : '#ff8c92';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('東口', padX + 33.8 * cw, padY + 7.1 * ch);
    ctx.font = '600 7.5px sans-serif';
    ctx.fillText(exitReady ? '解錠' : '出口', padX + 33.8 * cw, padY + 7.95 * ch);

    // JR Row 10 Gates & Facilities
    ctx.fillStyle = '#8ef4b8';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('西改札', padX + 8.5 * cw, padY + 10.75 * ch);
    ctx.fillStyle = '#a4e8d0';
    ctx.font = '600 8px sans-serif';
    ctx.fillText('きっぷ', padX + 11.5 * cw, padY + 10.75 * ch);
    ctx.fillStyle = '#90f8be';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('みどり', padX + 14.5 * cw, padY + 10.75 * ch);
    ctx.fillStyle = '#8ef4b8';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('東改札', padX + 20.5 * cw, padY + 10.75 * ch);
    ctx.fillStyle = '#d6b4ea';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('ルミネエスト B1F', padX + 26.5 * cw, padY + 10.75 * ch);

    // Central Passage & South
    ctx.fillStyle = '#8ef4b8';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('中央西', padX + 6.5 * cw, padY + 17.45 * ch);
    ctx.fillStyle = '#cad8df';
    ctx.font = 'bold 9.5px sans-serif';
    ctx.fillText('←  JR中央通路 (1〜16番線連絡)  →', padX + 17.5 * cw, padY + 17.45 * ch);
    ctx.fillStyle = '#8ef4b8';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('中央東', padX + 30.5 * cw, padY + 17.45 * ch);

    ctx.fillStyle = '#96a4ae';
    ctx.font = '600 7.5px sans-serif';
    ctx.fillText('南口・バスタ(封鎖)', padX + 16.5 * cw, padY + 20.6 * ch);

    // 7. Compass Badge Top-Right
    ctx.fillStyle = 'rgba(16, 26, 34, 0.92)';
    ctx.fillRect(w - 38, 6, 28, 22);
    ctx.strokeStyle = 'rgba(128, 195, 66, 0.55)';
    ctx.lineWidth = 1;
    ctx.strokeRect(w - 38, 6, 28, 22);
    ctx.fillStyle = '#80c342';
    ctx.font = 'bold 10.5px monospace';
    ctx.fillText('N↑', w - 24, 21);

    // 8. Hiding Spots (Phone Booths & Suica Lockers)
    for (const hSpot of HIDING_SPOTS) {
      const hx = padX + (hSpot.x / CELL) * cw;
      const hy = padY + (hSpot.z / CELL) * ch;
      ctx.fillStyle = hSpot.kind === 'phonebooth' ? '#36c476' : '#429a76';
      ctx.fillRect(hx - 3, hy - 3, 6, 6);
      ctx.strokeStyle = '#081015';
      ctx.lineWidth = 1;
      ctx.strokeRect(hx - 3, hy - 3, 6, 6);
    }

    // 9. 5 Suica Charge Terminals (きっぷ・チャージ)
    const pulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.006);
    for (const t of terminals) {
      const mx = padX + (t.def.x / CELL) * cw;
      const my = padY + (t.def.z / CELL) * ch;
      if (!t.charged) {
        ctx.strokeStyle = `rgba(74, 224, 214, ${0.35 + pulse * 0.45})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(mx, my, 6.8 + pulse * 2.6, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = t.charged ? '#38d884' : '#4ae0d6';
      ctx.beginPath();
      ctx.arc(mx, my, 4.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#070d12';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 10. Player Marker + Heading Cone
    const ux = padX + (px / CELL) * cw;
    const uy = padY + (pz / CELL) * ch;
    ctx.save();
    ctx.translate(ux, uy);
    ctx.rotate(-yaw);
    ctx.fillStyle = 'rgba(240, 192, 56, 0.36)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-11, -22);
    ctx.lineTo(11, -22);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f2c43a';
    ctx.beginPath();
    ctx.arc(0, 0, 4.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#090d11';
    ctx.lineWidth = 1.5;
    ctx.stroke();
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
      <div class="stat-row"><span>舞台</span><strong>新宿駅 B1F 全域（東口脱出）</strong></div>
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
