import {
  CELL,
  COLS,
  CORE_OX,
  CORE_OZ,
  EYE_OF_SHINJUKU_POS,
  getShinjukuZone,
  HIDING_SPOTS,
  isKeioMallZone,
  isSubnadeZone,
  LoreNoteDef,
  MOVING_WALKWAY_SPAN,
  ROWS,
  SHINJUKU_GRID,
} from '../station/shinjukuMap';
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
    const X = (col: number) => padX + col * cw;
    const Y = (row: number) => padY + row * ch;
    const OX = CORE_OX;
    const OZ = CORE_OZ;

    // 1. Real-world Shinjuku Underground Megacomplex 45x29 (180m x 116m) Zone Floorplan
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = SHINJUKU_GRID[r][c];
        const x = X(c);
        const y = Y(r);

        if (cell === 1) {
          if (r === 10 + OZ && c >= 10 + OX && c <= 12 + OX) {
            ctx.fillStyle = '#1b3d33'; // きっぷうりば
            ctx.fillRect(x, y, cw - 0.5, ch - 0.5);
          } else if (r === 10 + OZ && c >= 22 + OX && c <= 30 + OX) {
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
          if (r === 1 && c <= 5) ctx.fillStyle = '#b6007a'; // 都営大江戸線 E01 (Ruby Magenta)
          else if (r === 1) ctx.fillStyle = '#c8962e'; // 新宿サブナード北口 (amber)
          else if (r === 3) ctx.fillStyle = '#c82626'; // 東京メトロ丸ノ内線 M08 (Red)
          else if (c === 6) ctx.fillStyle = '#1b6dd6'; // 小田急線 OH01 (Cobalt Blue)
          else if (r === 22) ctx.fillStyle = '#c41878'; // 京王線 KO01 (Magenta)
          else if (c === 1) ctx.fillStyle = '#6cbb5a'; // 都営新宿線 S01 (Leaf Green)
          else ctx.fillStyle = '#2a9a50'; // JR新南改札 (JR Green)
          ctx.fillRect(x, y, cw - 0.5, ch - 0.5);
          continue;
        }

        const isEastExit = c >= 37 && c <= 38 && r >= 8 && r <= 10;
        const isSubnade = isSubnadeZone(c, r);
        const isKeioMall = isKeioMallZone(c, r);
        const isOedo = c >= 2 && c <= 5 && r >= 2 && r <= 5;
        const isEyeWalkway = c >= 1 && c <= 5 && r >= 8 && r <= 11;
        const isWestConnector = c >= 1 && c <= 5 && r >= 12 && r <= 26;
        const isMetroPromenade = r >= 3 && r <= 5 && c >= 11 && c <= 35;
        const isWestPlaza = c >= 6 && c <= 10 && r >= 3 && r <= 23;
        const isFreePassage = r >= 8 && r <= 11 && c >= 11 && c <= 36;
        const isNexTunnel = c >= 27 && c <= 29 && r >= 21 && r <= 23;
        const isSouthConcourse = (c >= 14 && c <= 38 && r >= 24 && r <= 26) || (c >= 20 && c <= 22 && r >= 21 && r <= 23);
        const isEastWing = c >= 36 && c <= 38 && r >= 6 && r <= 23;
        const isPaidConcourse = c >= 12 && c <= 34 && r >= 13 && r <= 22;

        if (isEastExit) {
          ctx.fillStyle = exitReady ? '#1f7c46' : '#581c24';
        } else if (cell === 2) {
          ctx.fillStyle = '#6042ac'; // J・ADビジョン新宿駅 column
        } else if (cell === 4) {
          ctx.fillStyle = '#14211c'; // Platform stair/escalator bay
        } else if (isSubnade) {
          ctx.fillStyle = r <= 5 ? '#3a3020' : '#2e2618'; // 新宿サブナード (oak wood & greenery)
        } else if (isKeioMall) {
          ctx.fillStyle = '#2c1f2e'; // 京王モール
        } else if (isOedo) {
          ctx.fillStyle = '#2e1a2a'; // 都営大江戸線 E01 コンコース
        } else if (isEyeWalkway) {
          ctx.fillStyle = '#1e2c3e'; // 新宿の目・動く歩道
        } else if (isWestConnector) {
          ctx.fillStyle = '#1a2430'; // 西新宿地下連絡道
        } else if (isNexTunnel) {
          ctx.fillStyle = '#2e1a20'; // 5・6番線 N'EX underground tunnel
        } else if (isSouthConcourse) {
          ctx.fillStyle = '#1d2c3a'; // JR南口・バスタ新宿 大コンコース
        } else if (isMetroPromenade) {
          ctx.fillStyle = '#241c24'; // 東京メトロ メトロプロムナード
        } else if (isWestPlaza) {
          ctx.fillStyle = r >= 15 && r <= 18 ? '#182b44' : r >= 20 ? '#271c32' : '#1b2938';
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

        if (cell === 5) {
          ctx.fillStyle = '#5a6874';
          ctx.beginPath();
          ctx.arc(x + cw * 0.5, y + ch * 0.5, Math.min(cw, ch) * 0.32, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#9aa8b4';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // 2. West Plaza rotary skylight ring + Subnade サンデッキ広場 skylight oculus
    ctx.save();
    ctx.setLineDash([4, 3]);
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = 'rgba(130, 178, 224, 0.35)';
    ctx.beginPath();
    ctx.arc(X(8.5), Y(10.5), 2.1 * cw, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(232, 200, 120, 0.4)';
    ctx.beginPath();
    ctx.arc(X(41.5), Y(3.6), 1.15 * cw, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // 3. 『新宿ウォール456』 (45.6m LED along North wall of 東西自由通路)
    ctx.fillStyle = '#38d8f4';
    ctx.fillRect(X(14.0), Y(8.0) - 3.2, 11.4 * cw, 3.6);

    // 4. 『新宿の目』 golden illuminated eye icon (10m x 3.4m, North wall of R8)
    const eyeCx = padX + (EYE_OF_SHINJUKU_POS.x / CELL) * cw;
    const eyeCy = Y(8.0) + 3.5;
    ctx.save();
    ctx.fillStyle = 'rgba(248, 214, 120, 0.16)';
    ctx.strokeStyle = '#f2cc62';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.ellipse(eyeCx, eyeCy, 1.25 * cw, 0.34 * ch, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#f2cc62';
    ctx.beginPath();
    ctx.arc(eyeCx, eyeCy, 2.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 5. 動く歩道 dual belts (north belt → West, south belt → East)
    const mwX0 = padX + (MOVING_WALKWAY_SPAN.xStart / CELL) * cw;
    const mwX1 = padX + (MOVING_WALKWAY_SPAN.xEnd / CELL) * cw;
    const mwY = padY + (MOVING_WALKWAY_SPAN.zCenter / CELL) * ch;
    const drawBelt = (y: number, dir: 1 | -1) => {
      ctx.fillStyle = 'rgba(150, 160, 172, 0.35)';
      ctx.fillRect(mwX0, y - 2.2, mwX1 - mwX0, 4.4);
      ctx.fillStyle = '#c4d2de';
      for (let ax = mwX0 + 8; ax < mwX1 - 4; ax += 14) {
        ctx.beginPath();
        ctx.moveTo(ax + dir * 4, y);
        ctx.lineTo(ax - dir * 2, y - 2.6);
        ctx.lineTo(ax - dir * 2, y + 2.6);
        ctx.closePath();
        ctx.fill();
      }
    };
    drawBelt(mwY - 3.6, -1);
    drawBelt(mwY + 3.6, 1);

    // 6. Tactile Yellow Guide Lines (北大動脈 / 東西自由通路 / 中央通路 / 南大動脈)
    ctx.strokeStyle = 'rgba(224, 186, 46, 0.30)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(X(2.5), Y(4.7));
    ctx.lineTo(X(43.5), Y(4.7));
    ctx.moveTo(X(1.5), Y(9.0));
    ctx.lineTo(X(38.6), Y(9.0));
    ctx.moveTo(X(7.2), Y(19.3));
    ctx.lineTo(X(38.2), Y(19.3));
    ctx.moveTo(X(2.2), Y(25.5));
    ctx.lineTo(X(38.6), Y(25.5));
    ctx.moveTo(X(2.5), Y(9.0));
    ctx.lineTo(X(2.5), Y(25.5));
    ctx.moveTo(X(41.5), Y(2.5));
    ctx.lineTo(X(41.5), Y(22.5));
    ctx.stroke();

    // 7. ALL 16 JR PLATFORMS Color-Coded Badges
    const northPlatBadges: Array<[number, string, string, string]> = [
      [13, '15·16', '山手/総武', '#7ac142'],
      [16, '13·14', '総武/山手', '#e8be00'],
      [19, '11·12', '中央快速', '#f15a22'],
      [22, '9·10', '中央特急', '#2888d8'],
      [25, '7·8', '中央快速', '#f15a22'],
    ];
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    for (const [col, label, sub, color] of northPlatBadges) {
      const bx = X(col + 0.5);
      ctx.fillStyle = color;
      ctx.fillRect(X(col), Y(14), cw - 0.5, 3);
      ctx.fillRect(X(col), Y(16.85), cw - 0.5, 3);
      ctx.fillStyle = '#f2f7f4';
      ctx.font = 'bold 9.5px monospace';
      ctx.fillText(label, bx, Y(15.55));
      ctx.fillStyle = '#9bb2a8';
      ctx.font = '600 7px sans-serif';
      ctx.fillText(sub, bx, Y(16.3));
    }

    const eastPlats: Array<[number, string, string, string]> = [
      [30, '3·4', '埼京/湘南', '#00ac9a'],
      [33, '1·2', '湘南/埼京', '#e21f26'],
    ];
    for (const [col, label, sub, color] of eastPlats) {
      const bx = X(col + 0.5);
      ctx.fillStyle = color;
      ctx.fillRect(X(col), Y(16), cw - 0.5, 3);
      ctx.fillRect(X(col), Y(21), cw - 0.5, 3);
      ctx.fillStyle = '#f2f7f4';
      ctx.font = 'bold 9.5px monospace';
      ctx.fillText(label, bx, Y(17.6));
      ctx.fillStyle = '#9db8b2';
      ctx.font = '600 7px sans-serif';
      ctx.fillText(sub, bx, Y(18.35));
      ctx.fillStyle = '#d4e6e2';
      ctx.font = 'bold 8px monospace';
      ctx.fillText(label, bx, Y(21.8));
    }

    // 5·6番線 成田エクスプレス (N'EX)
    ctx.fillStyle = '#e03a3e';
    ctx.fillRect(X(27), Y(23.85), 3 * cw - 0.5, 2.5);
    ctx.fillStyle = '#ff9aa0';
    ctx.font = 'bold 8.5px monospace';
    ctx.fillText("5·6 N'EX", X(28.5), Y(23.55));

    // 8. Authentic Shinjuku Megacomplex Wing & Gate Labels (zero-overlap layout)
    ctx.textAlign = 'center';

    // Far North-West: 都営大江戸線 新宿西口駅 E01
    ctx.fillStyle = '#ff7ac8';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('大江戸線 新宿西口 E01', X(5.6), Y(0.8));
    ctx.fillStyle = '#e0a8cc';
    ctx.font = '600 7.5px sans-serif';
    ctx.fillText('E01コンコース', X(3.9), Y(3.9));

    // North: Tokyo Metro Marunouchi Line M08
    ctx.fillStyle = '#ff8a8a';
    ctx.font = 'bold 9.5px sans-serif';
    ctx.fillText('丸ノ内線 西改札 M08', X(16.0), Y(2.6));
    ctx.fillText('丸ノ内線 東改札 M08', X(28.0), Y(2.6));
    ctx.fillStyle = '#d4c4cf';
    ctx.font = '600 9px sans-serif';
    ctx.fillText('← 北大動脈・メトロプロムナード →', X(25.5), Y(5.55));

    // Far North-East: 新宿サブナード
    ctx.fillStyle = '#f2c46a';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('サブナード北口', X(41.5), Y(0.8));
    ctx.fillStyle = '#e8d6a8';
    ctx.font = '600 7.5px sans-serif';
    ctx.fillText('サンデッキ広場', X(41.5), Y(5.55));
    ctx.fillStyle = '#f2c46a';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('新宿', X(41.5), Y(12.75));
    ctx.fillText('サブナード', X(41.5), Y(13.75));
    ctx.fillStyle = '#9cc890';
    ctx.font = '600 7px sans-serif';
    ctx.fillText('アーバン', X(41.5), Y(16.85));
    ctx.fillText('ジャングル', X(41.5), Y(17.65));

    // Far West: 新宿の目 + 動く歩道 + 西新宿連絡
    ctx.fillStyle = '#f2d27a';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('新宿の目', X(3.5), Y(7.6));
    ctx.fillStyle = '#c4d8e8';
    ctx.font = '600 7.5px sans-serif';
    ctx.fillText('動く歩道(都庁方面)', X(3.85), Y(9.65));
    ctx.fillStyle = '#9fb4c8';
    ctx.font = '600 7.5px sans-serif';
    ctx.fillText('西新宿', X(3.0), Y(16.2));
    ctx.fillText('連絡道', X(3.0), Y(17.1));

    // West Plaza, Odakyu OH01, Keio KO01
    ctx.fillStyle = '#b4d6f4';
    ctx.font = 'bold 9.5px sans-serif';
    ctx.fillText('西口地下広場', X(8.5), Y(8.75));
    ctx.fillStyle = '#8cb6dc';
    ctx.font = '600 7.5px sans-serif';
    ctx.fillText('ロータリー吹抜', X(8.5), Y(9.55));

    ctx.fillStyle = '#6db8ff';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('小田急', X(8.55), Y(16.05));
    ctx.fillStyle = '#7ec0ff';
    ctx.font = '600 7.5px monospace';
    ctx.fillText('OH01', X(8.55), Y(16.85));

    ctx.fillStyle = '#ff78c4';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('京王西口 KO01', X(10.5), Y(23.75));

    // Far South-West: 京王モール + 都営新宿線 S01 / 大江戸線 E27
    ctx.fillStyle = '#e8a8d8';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('京王モール', X(8.6), Y(25.45));
    ctx.fillStyle = '#b48aa8';
    ctx.font = '600 7px monospace';
    ctx.fillText('KEIO MALL', X(8.6), Y(26.35));
    ctx.fillStyle = '#8ee07a';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('都営新宿線 S01·大江戸線 E27', X(7.4), Y(27.75));

    // Core North: Shinjuku Wall 456 & East-West Free Passage & Alps Plaza
    ctx.fillStyle = '#7ce6fc';
    ctx.font = 'bold 9.5px sans-serif';
    ctx.fillText('━━ 新宿ウォール456 (45.6m) ━━', X(19.7), Y(7.55));
    ctx.fillStyle = '#e8f2f8';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('東西自由通路 (J・ADビジョン柱列)', X(21.0), Y(9.5));
    ctx.fillStyle = '#c2dce8';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('アルプス広場', X(31.2), Y(9.5));

    // East Exit (Kabukicho)
    ctx.fillStyle = exitReady ? '#6af6aa' : '#ff8c92';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('東口', X(38.0), Y(9.1));
    ctx.font = '600 7.5px sans-serif';
    ctx.fillText(exitReady ? '解錠' : '出口', X(38.0), Y(9.95));

    // JR Row 12 Gates & Facilities
    ctx.fillStyle = '#8ef4b8';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('西改札', X(13.5), Y(12.88));
    ctx.fillStyle = '#a4e8d0';
    ctx.font = '600 8px sans-serif';
    ctx.fillText('きっぷ', X(17.75), Y(12.88));
    ctx.fillStyle = '#90f8be';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('みどり', X(19.65), Y(12.88));
    ctx.fillStyle = '#8ef4b8';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('東改札', X(25.5), Y(12.88));
    ctx.fillStyle = '#d6b4ea';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('ルミネエスト B1F', X(31.5), Y(12.92));

    // Central Passage
    ctx.fillStyle = '#8ef4b8';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('中央西', X(11.5), Y(19.45));
    ctx.fillStyle = '#cad8df';
    ctx.font = 'bold 9.5px sans-serif';
    ctx.fillText('←  JR中央通路 (1〜16番線連絡)  →', X(22.5), Y(19.45));
    ctx.fillStyle = '#8ef4b8';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('中央東', X(35.5), Y(19.45));

    // Far South: JR南口・バスタ新宿・新南改札
    ctx.fillStyle = '#a8c4d8';
    ctx.font = '600 7.5px sans-serif';
    ctx.fillText('南口連絡', X(21.5), Y(22.6));
    ctx.fillStyle = '#d4e4f0';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('JR南口・甲州街道・バスタ新宿 大コンコース', X(27.0), Y(25.45));
    ctx.fillStyle = '#8ef4b8';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('新南改札 (QR) → バスタ新宿4F', X(22.0), Y(28.6));
    ctx.fillStyle = '#c8b4e0';
    ctx.font = '600 7px sans-serif';
    ctx.fillText('東南口', X(37.0), Y(23.75));

    // 9. Compass Badge (top-left, clear of all wing labels)
    ctx.fillStyle = 'rgba(16, 26, 34, 0.92)';
    ctx.fillRect(4, 4, 28, 22);
    ctx.strokeStyle = 'rgba(128, 195, 66, 0.55)';
    ctx.lineWidth = 1;
    ctx.strokeRect(4, 4, 28, 22);
    ctx.fillStyle = '#80c342';
    ctx.font = 'bold 10.5px monospace';
    ctx.fillText('N↑', 18, 19);

    // 10. Hiding Spots (Phone Booths & Suica Lockers)
    for (const hSpot of HIDING_SPOTS) {
      const hx = padX + (hSpot.x / CELL) * cw;
      const hy = padY + (hSpot.z / CELL) * ch;
      ctx.fillStyle = hSpot.kind === 'phonebooth' ? '#36c476' : '#429a76';
      ctx.fillRect(hx - 3, hy - 3, 6, 6);
      ctx.strokeStyle = '#081015';
      ctx.lineWidth = 1;
      ctx.strokeRect(hx - 3, hy - 3, 6, 6);
    }

    // 11. 5 Suica Charge Terminals
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

    // 12. Player Marker + Heading Cone
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
      <div class="stat-row"><span>舞台</span><strong>新宿駅 地下街全域 180m×116m（東口脱出）</strong></div>
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
