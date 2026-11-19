export interface TouchCallbacks {
  onLookDelta: (dx: number, dy: number) => void;
  onInteractTap: () => void;
  onToggleFlashlight: () => void;
  onToggleCrouch: () => void;
  onTossCoin: () => void;
  onToggleMap: () => void;
}

export interface TouchVisualSync {
  flashlightOn: boolean;
  crouching: boolean;
  coins: number;
  mapOpen: boolean;
  hiding: boolean;
  holdingBreath: boolean;
  promptKind: string | null;
}

export class TouchControls {
  state = {
    moveX: 0,
    moveY: 0,
    autoSprint: false,
    sprintHeld: false,
    interactHeld: false,
    holdBreathHeld: false,
  };
  mode: 'auto' | 'on' | 'off' = 'auto';
  enabled = false;
  private active = false;
  private moveTouchId: number | null = null;
  private lookTouchId: number | null = null;
  private lastLookX = 0;
  private lastLookY = 0;
  private sprintToggled = false;
  private joyOriginX = 0;
  private joyOriginY = 0;

  private containerEl: HTMLElement;
  private joyZoneEl: HTMLElement;
  private joyBaseEl: HTMLElement;
  private joyKnobEl: HTMLElement;
  private btnInteract: HTMLButtonElement;
  private interactLabelEl: HTMLElement;
  private btnLight: HTMLButtonElement;
  private btnCrouch: HTMLButtonElement;
  private btnSprint: HTMLButtonElement;
  private btnCoin: HTMLButtonElement;
  private btnMap: HTMLButtonElement;
  private btnBreath: HTMLButtonElement;

  constructor(private canvas: HTMLCanvasElement, private cb: TouchCallbacks) {
    this.containerEl = document.getElementById('touch-controls')!;
    this.joyZoneEl = document.getElementById('touch-joystick-zone')!;
    this.joyBaseEl = document.getElementById('touch-joystick-base')!;
    this.joyKnobEl = document.getElementById('touch-joystick-knob')!;
    this.btnInteract = document.getElementById('touch-btn-interact') as HTMLButtonElement;
    this.interactLabelEl = document.getElementById('touch-interact-label')!;
    this.btnLight = document.getElementById('touch-btn-light') as HTMLButtonElement;
    this.btnCrouch = document.getElementById('touch-btn-crouch') as HTMLButtonElement;
    this.btnSprint = document.getElementById('touch-btn-sprint') as HTMLButtonElement;
    this.btnCoin = document.getElementById('touch-btn-coin') as HTMLButtonElement;
    this.btnMap = document.getElementById('touch-btn-map') as HTMLButtonElement;
    this.btnBreath = document.getElementById('touch-btn-breath') as HTMLButtonElement;

    this.refreshVisibility();
    window.addEventListener('resize', () => this.refreshVisibility());
    this.bindJoystick();
    this.bindCanvasLook();
    this.bindButtons();
  }

  setMode(m: 'auto' | 'on' | 'off'): void {
    this.mode = m;
    this.refreshVisibility();
  }

  refreshVisibility(): void {
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.innerWidth <= 900;
    this.enabled = this.mode === 'on' || (this.mode === 'auto' && isTouch);
    document.body.classList.toggle('is-touch-ui', this.enabled);
    this.containerEl.hidden = !this.enabled;
  }

  setActive(a: boolean): void {
    this.active = a;
    if (!a) this.resetInputs();
  }

  resetInputs(): void {
    this.moveTouchId = null;
    this.lookTouchId = null;
    this.state.moveX = 0;
    this.state.moveY = 0;
    this.state.autoSprint = false;
    this.state.sprintHeld = false;
    this.state.interactHeld = false;
    this.state.holdBreathHeld = false;
    this.sprintToggled = false;
    this.joyKnobEl.style.transform = 'translate(-50%, -50%)';
    this.joyBaseEl.classList.remove('is-sprinting', 'is-active');
    this.btnSprint.classList.remove('is-active');
    this.btnInteract.classList.remove('is-pressed');
    this.btnBreath.classList.remove('is-pressed');
  }

  syncButtonVisuals(v: TouchVisualSync): void {
    if (!this.enabled) return;
    this.btnLight.classList.toggle('is-active', v.flashlightOn);
    this.btnCrouch.classList.toggle('is-active', v.crouching);
    this.btnMap.classList.toggle('is-active', v.mapOpen);
    this.btnSprint.classList.toggle('is-active', this.sprintToggled || this.state.autoSprint);
    this.btnCoin.textContent = `硬貨 ${v.coins}`;
    this.btnCoin.classList.toggle('is-empty', v.coins <= 0);
    this.joyZoneEl.classList.toggle('is-hidden-in-locker', v.hiding);
    this.btnBreath.hidden = !v.hiding;
    this.btnBreath.classList.toggle('is-active', v.holdingBreath);

    const ready = v.promptKind !== null;
    this.btnInteract.classList.toggle('is-ready', ready);
    const labelMap: Record<string, string> = {
      terminal: '長押し\nチャージ',
      closet: '隠れる',
      'exit-closet': '出る',
      note: 'メモ',
      coin: '拾う',
      'exit-gate': '改札へ',
    };
    this.interactLabelEl.textContent = v.promptKind ? labelMap[v.promptKind] || '操作' : '操作';
  }

  private bindJoystick(): void {
    const maxR = 44;
    const updateStick = (cx: number, cy: number) => {
      const dx = cx - this.joyOriginX;
      const dy = cy - this.joyOriginY;
      const dist = Math.hypot(dx, dy);
      const clamped = Math.min(dist, maxR);
      const ang = Math.atan2(dy, dx);
      const kx = Math.cos(ang) * clamped;
      const ky = Math.sin(ang) * clamped;
      this.joyKnobEl.style.transform = `translate(calc(-50% + ${kx}px), calc(-50% + ${ky}px))`;
      this.state.moveX = kx / maxR;
      this.state.moveY = -ky / maxR;
      const autoRun = dist > maxR * 0.86 && this.state.moveY > 0.35;
      this.state.autoSprint = autoRun;
      this.joyBaseEl.classList.toggle('is-sprinting', autoRun);
    };

    this.joyZoneEl.addEventListener(
      'touchstart',
      (e) => {
        if (!this.active || !this.enabled) return;
        e.preventDefault();
        if (this.moveTouchId !== null) return;
        const t = e.changedTouches[0];
        this.moveTouchId = t.identifier;
        const rect = this.joyBaseEl.getBoundingClientRect();
        this.joyOriginX = rect.left + rect.width * 0.5;
        this.joyOriginY = rect.top + rect.height * 0.5;
        this.joyBaseEl.classList.add('is-active');
        updateStick(t.clientX, t.clientY);
      },
      { passive: false }
    );

    window.addEventListener(
      'touchmove',
      (e) => {
        if (this.moveTouchId === null) return;
        for (const t of Array.from(e.changedTouches)) {
          if (t.identifier === this.moveTouchId) {
            updateStick(t.clientX, t.clientY);
            break;
          }
        }
      },
      { passive: true }
    );

    const endStick = (e: TouchEvent) => {
      if (this.moveTouchId === null) return;
      for (const t of Array.from(e.changedTouches)) {
        if (t.identifier === this.moveTouchId) {
          this.moveTouchId = null;
          this.state.moveX = 0;
          this.state.moveY = 0;
          this.state.autoSprint = false;
          this.joyKnobEl.style.transform = 'translate(-50%, -50%)';
          this.joyBaseEl.classList.remove('is-active', 'is-sprinting');
          break;
        }
      }
    };
    window.addEventListener('touchend', endStick, { passive: true });
    window.addEventListener('touchcancel', endStick, { passive: true });
  }

  private bindCanvasLook(): void {
    this.canvas.addEventListener(
      'touchstart',
      (e) => {
        if (!this.active || !this.enabled) return;
        for (const t of Array.from(e.changedTouches)) {
          if (this.lookTouchId === null && t.identifier !== this.moveTouchId) {
            this.lookTouchId = t.identifier;
            this.lastLookX = t.clientX;
            this.lastLookY = t.clientY;
            break;
          }
        }
      },
      { passive: true }
    );

    window.addEventListener(
      'touchmove',
      (e) => {
        if (!this.active || this.lookTouchId === null) return;
        for (const t of Array.from(e.changedTouches)) {
          if (t.identifier === this.lookTouchId) {
            const dx = t.clientX - this.lastLookX;
            const dy = t.clientY - this.lastLookY;
            this.lastLookX = t.clientX;
            this.lastLookY = t.clientY;
            this.cb.onLookDelta(dx * 1.9, dy * 1.55);
            break;
          }
        }
      },
      { passive: true }
    );

    const endLook = (e: TouchEvent) => {
      if (this.lookTouchId === null) return;
      for (const t of Array.from(e.changedTouches)) {
        if (t.identifier === this.lookTouchId) {
          this.lookTouchId = null;
          break;
        }
      }
    };
    window.addEventListener('touchend', endLook, { passive: true });
    window.addEventListener('touchcancel', endLook, { passive: true });
  }

  private bindButtons(): void {
    const bindTap = (el: HTMLElement, fn: () => void) => {
      el.addEventListener(
        'touchstart',
        (e) => {
          if (!this.active) return;
          e.preventDefault();
          e.stopPropagation();
          fn();
        },
        { passive: false }
      );
      el.addEventListener('click', (e) => {
        if (!this.active || e.detail === 0) return;
        fn();
      });
    };

    bindTap(this.btnLight, () => this.cb.onToggleFlashlight());
    bindTap(this.btnCrouch, () => this.cb.onToggleCrouch());
    bindTap(this.btnSprint, () => {
      this.sprintToggled = !this.sprintToggled;
      this.state.sprintHeld = this.sprintToggled;
    });
    bindTap(this.btnCoin, () => this.cb.onTossCoin());
    bindTap(this.btnMap, () => this.cb.onToggleMap());

    // Holdable Interact Button
    const startInteract = (e: Event) => {
      if (!this.active) return;
      e.preventDefault();
      e.stopPropagation();
      this.state.interactHeld = true;
      this.btnInteract.classList.add('is-pressed');
      this.cb.onInteractTap();
    };
    const endInteract = () => {
      this.state.interactHeld = false;
      this.btnInteract.classList.remove('is-pressed');
    };
    this.btnInteract.addEventListener('touchstart', startInteract, { passive: false });
    this.btnInteract.addEventListener('touchend', endInteract, { passive: true });
    this.btnInteract.addEventListener('touchcancel', endInteract, { passive: true });
    this.btnInteract.addEventListener('mousedown', startInteract);
    window.addEventListener('mouseup', endInteract);

    // Holdable Breath Button (visible when hiding inside locker / phone booth!)
    const startBreath = (e: Event) => {
      if (!this.active) return;
      e.preventDefault();
      e.stopPropagation();
      this.state.holdBreathHeld = true;
      this.btnBreath.classList.add('is-pressed');
    };
    const endBreath = () => {
      this.state.holdBreathHeld = false;
      this.btnBreath.classList.remove('is-pressed');
    };
    this.btnBreath.addEventListener('touchstart', startBreath, { passive: false });
    this.btnBreath.addEventListener('touchend', endBreath, { passive: true });
    this.btnBreath.addEventListener('touchcancel', endBreath, { passive: true });
    this.btnBreath.addEventListener('mousedown', startBreath);
    window.addEventListener('mouseup', endBreath);
  }
}
