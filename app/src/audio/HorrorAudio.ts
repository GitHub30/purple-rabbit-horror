export interface ContinuousAudioState {
  hiding: boolean;
  holdingBreath: boolean;
  exhausted: boolean;
  rabbitDist: number;
  rabbitPan: number;
}

export class HorrorAudio {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private reverbSend: GainNode | null = null;
  private ambienceGain: GainNode | null = null;
  private chaseGain: GainNode | null = null;
  private chaseOsc1: OscillatorNode | null = null;
  private chaseOsc2: OscillatorNode | null = null;
  private dreadHumGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private muted = false;
  private initialized = false;
  private heartbeatTimer = 0;
  private heartbeatPulseValue = 0;
  private dripTimer = 3.8;
  private melodyTimer = 18;
  private breathTimer = 0;
  private rabbitBreathTimer = 0;

  unlock(): void {
    if (this.initialized) {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    this.ctx = new Ctor();

    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -8;
    comp.knee.value = 12;
    comp.ratio.value = 8;
    comp.attack.value = 0.004;
    comp.release.value = 0.16;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = this.muted ? 0 : 0.88;
    this.masterGain.connect(comp);
    comp.connect(this.ctx.destination);

    // 2s white noise buffer
    const len = this.ctx.sampleRate * 2;
    this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

    // Vast Shinjuku underground concrete concourse convolution reverb (2.1s tail)
    const conv = this.ctx.createConvolver();
    conv.buffer = this.createSubwayImpulse(2.1, 2.5);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2800;
    const wet = this.ctx.createGain();
    wet.gain.value = 0.48;
    this.reverbSend = this.ctx.createGain();
    this.reverbSend.gain.value = 1.0;
    this.reverbSend.connect(conv).connect(lp).connect(wet).connect(this.masterGain);

    this.startAmbience();
    this.initialized = true;
  }

  private createSubwayImpulse(duration: number, decay: number): AudioBuffer {
    const ctx = this.ctx!;
    const length = Math.floor(ctx.sampleRate * duration);
    const buf = ctx.createBuffer(2, length, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const out = buf.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        const t = i / length;
        const early = i < ctx.sampleRate * 0.09 ? (i % 680 < 6 ? 0.55 : 0.16) : 1;
        out[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay) * early;
      }
    }
    return buf;
  }

  setMuted(m: boolean): void {
    this.muted = m;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(m ? 0 : 0.88, this.ctx.currentTime, 0.04);
    }
  }

  isMuted(): boolean {
    return this.muted;
  }

  getHeartbeatPulse(): number {
    return this.heartbeatPulseValue;
  }

  private connectOutput(node: AudioNode, reverbAmt = 0.55): void {
    if (!this.masterGain) return;
    node.connect(this.masterGain);
    if (this.reverbSend && reverbAmt > 0 && this.ctx) {
      const send = this.ctx.createGain();
      send.gain.value = reverbAmt;
      node.connect(send).connect(this.reverbSend);
    }
  }

  private panNode(pan: number): AudioNode {
    const ctx = this.ctx!;
    if (typeof ctx.createStereoPanner === 'function') {
      const p = ctx.createStereoPanner();
      p.pan.value = Math.max(-1, Math.min(1, pan));
      return p;
    }
    return ctx.createGain();
  }

  private startAmbience(): void {
    if (!this.ctx || !this.masterGain || !this.noiseBuffer) return;
    this.ambienceGain = this.ctx.createGain();
    this.ambienceGain.gain.value = 0.26;
    this.ambienceGain.connect(this.masterGain);

    // Shinjuku deep tunnel ventilation rumble
    const vent = this.ctx.createBufferSource();
    vent.buffer = this.noiseBuffer;
    vent.loop = true;
    const ventF = this.ctx.createBiquadFilter();
    ventF.type = 'lowpass';
    ventF.frequency.value = 98;
    const ventG = this.ctx.createGain();
    ventG.gain.value = 0.62;
    vent.connect(ventF).connect(ventG).connect(this.ambienceGain);
    vent.start();

    // 50Hz East Japan (Tokyo!) fluorescent ballast hum
    const hum50 = this.ctx.createOscillator();
    hum50.type = 'sine';
    hum50.frequency.value = 50;
    const humG = this.ctx.createGain();
    humG.gain.value = 0.08;
    hum50.connect(humG).connect(this.ambienceGain);
    hum50.start();

    // Sub-bass architectural drone
    const sub = this.ctx.createOscillator();
    sub.type = 'triangle';
    sub.frequency.value = 34.6;
    const subG = this.ctx.createGain();
    subG.gain.value = 0.16;
    sub.connect(subG).connect(this.ambienceGain);
    sub.start();

    // Chase dissonant bowed-metal horror strings
    this.chaseGain = this.ctx.createGain();
    this.chaseGain.gain.value = 0;
    const chaseF = this.ctx.createBiquadFilter();
    chaseF.type = 'bandpass';
    chaseF.frequency.value = 265;
    chaseF.Q.value = 4.5;
    this.chaseOsc1 = this.ctx.createOscillator();
    this.chaseOsc1.type = 'sawtooth';
    this.chaseOsc1.frequency.value = 65.4;
    this.chaseOsc2 = this.ctx.createOscillator();
    this.chaseOsc2.type = 'sawtooth';
    this.chaseOsc2.frequency.value = 69.5;
    this.chaseOsc1.connect(chaseF);
    this.chaseOsc2.connect(chaseF);
    chaseF.connect(this.chaseGain);
    this.connectOutput(this.chaseGain, 0.8);
    this.chaseOsc1.start();
    this.chaseOsc2.start();

    // Infrasound psychological dread beating (28Hz + 31.5Hz)
    this.dreadHumGain = this.ctx.createGain();
    this.dreadHumGain.gain.value = 0;
    const i1 = this.ctx.createOscillator();
    i1.type = 'sine';
    i1.frequency.value = 28;
    const i2 = this.ctx.createOscillator();
    i2.type = 'sine';
    i2.frequency.value = 31.5;
    i1.connect(this.dreadHumGain);
    i2.connect(this.dreadHumGain);
    this.dreadHumGain.connect(this.masterGain);
    i1.start();
    i2.start();
  }

  updateContinuous(
    dt: number,
    fear: number,
    isChasing: boolean,
    active: boolean,
    state?: ContinuousAudioState
  ): void {
    this.heartbeatPulseValue = Math.max(0, this.heartbeatPulseValue - dt * 3.4);
    if (!this.ctx || !this.initialized) return;
    const now = this.ctx.currentTime;

    if (this.chaseGain && this.chaseOsc1 && this.chaseOsc2) {
      const targetG = active ? (isChasing ? 0.25 : fear * 0.09) : 0;
      this.chaseGain.gain.setTargetAtTime(targetG, now, 0.16);
      const vib = Math.sin(now * 9.2) * 4.8;
      this.chaseOsc1.frequency.setTargetAtTime(isChasing ? 73.4 + vib : 55, now, 0.14);
      this.chaseOsc2.frequency.setTargetAtTime(isChasing ? 78.2 - vib * 0.7 : 58.6, now, 0.14);
    }

    if (this.dreadHumGain) {
      const d = active ? Math.max(0, fear - 0.14) * 0.28 : 0;
      this.dreadHumGain.gain.setTargetAtTime(d, now, 0.2);
    }

    if (!active) return;

    // Proximity / breath-hold heartbeat
    const effectiveFear = state?.holdingBreath ? Math.max(fear, 0.62) : fear;
    if (effectiveFear > 0.14) {
      const bpm = 60 + effectiveFear * 108;
      this.heartbeatTimer -= dt;
      if (this.heartbeatTimer <= 0) {
        this.heartbeatTimer = 60 / bpm;
        this.heartbeatPulseValue = 0.48 + effectiveFear * 0.52;
        this.playHeartbeat(0.15 + effectiveFear * 0.44);
      }
    }

    // Player breath (silenced while holding breath!)
    if (state && !state.holdingBreath && (state.exhausted || (state.hiding && fear > 0.3))) {
      this.breathTimer -= dt;
      if (this.breathTimer <= 0) {
        this.breathTimer = state.exhausted ? 0.72 : 1.1;
        this.playHumanBreath(state.exhausted ? 0.18 : 0.09);
      }
    }

    // Rabbit eerie raspy breathing/sniffing when very close
    if (state && state.rabbitDist < 8.5) {
      this.rabbitBreathTimer -= dt;
      if (this.rabbitBreathTimer <= 0) {
        this.rabbitBreathTimer = 1.45 + Math.random() * 0.9;
        const vol = Math.max(0.05, (1 - state.rabbitDist / 8.5) * 0.26);
        this.playRabbitSniff(vol, state.rabbitPan);
      }
    }

    // Distant subterranean water drips
    this.dripTimer -= dt;
    if (this.dripTimer <= 0) {
      this.dripTimer = 3.2 + Math.random() * 5.2;
      this.playWaterDrip((Math.random() - 0.5) * 1.4);
    }

    // Distant warped JR Shinjuku departure melody haunting the halls
    this.melodyTimer -= dt;
    if (this.melodyTimer <= 0 && !isChasing) {
      this.melodyTimer = 26 + Math.random() * 24;
      this.playShinjukuDepartureMelody(0.11 + fear * 0.06);
    }
  }

  private playHeartbeat(vol: number): void {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const thump = (offset: number, freq: number, gain: number) => {
      const o = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now + offset);
      o.frequency.exponentialRampToValueAtTime(28, now + offset + 0.14);
      g.gain.setValueAtTime(0.001, now + offset);
      g.gain.linearRampToValueAtTime(gain, now + offset + 0.015);
      g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.17);
      o.connect(g).connect(this.masterGain!);
      o.start(now + offset);
      o.stop(now + offset + 0.19);
    };
    thump(0, 62, vol);
    thump(0.16, 52, vol * 0.68);
  }

  playHumanBreath(vol: number): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.setValueAtTime(740, now);
    f.Q.value = 2.6;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.14);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.44);
    src.connect(f).connect(g);
    this.connectOutput(g, 0.18);
    src.start(now);
    src.stop(now + 0.48);
  }

  playBreathGasp(): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.setValueAtTime(1150, now);
    f.frequency.exponentialRampToValueAtTime(520, now + 0.34);
    f.Q.value = 3.2;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.32, now + 0.06);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
    src.connect(f).connect(g);
    this.connectOutput(g, 0.35);
    src.start(now);
    src.stop(now + 0.4);
  }

  playRabbitSniff(vol: number, pan = 0): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.setValueAtTime(420, now);
    f.frequency.linearRampToValueAtTime(680, now + 0.25);
    f.Q.value = 5.5;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.1);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
    const p = this.panNode(pan);
    src.connect(f).connect(g).connect(p);
    this.connectOutput(p, 0.65);
    src.start(now);
    src.stop(now + 0.46);
  }

  playWaterDrip(pan = 0): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(1450 + Math.random() * 550, now);
    o.frequency.exponentialRampToValueAtTime(520, now + 0.075);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.07, now + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0005, now + 0.09);
    const p = this.panNode(pan);
    o.connect(g).connect(p);
    this.connectOutput(p, 0.85);
    o.start(now);
    o.stop(now + 0.11);
  }

  // Eerie detuned JR East Shinjuku departure melody echoing from nowhere
  playShinjukuDepartureMelody(vol = 0.12): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [659.25, 783.99, 622.25, 587.33, 493.88, 466.16];
    notes.forEach((freq, i) => {
      const t = now + i * 0.44;
      const o = this.ctx!.createOscillator();
      o.type = 'triangle';
      const detune = (Math.random() - 0.5) * 18 - i * 4;
      o.frequency.setValueAtTime(freq, t);
      o.detune.setValueAtTime(detune, t);
      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.025);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 0.68);
      o.connect(g);
      this.connectOutput(g, 0.95);
      o.start(t);
      o.stop(t + 0.72);
    });
  }

  // Thundering phantom Yamanote Line train passing deep below the locked 14・15 stairs!
  playPhantomTrain(): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const dur = 5.2;

    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;

    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(90, now);
    lp.frequency.linearRampToValueAtTime(520, now + dur * 0.48);
    lp.frequency.exponentialRampToValueAtTime(80, now + dur);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.42, now + dur * 0.45);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);

    const pan = this.panNode(-0.9);
    if ('pan' in pan) {
      (pan as StereoPannerNode).pan.setValueAtTime(-0.95, now);
      (pan as StereoPannerNode).pan.linearRampToValueAtTime(0.95, now + dur);
    }

    src.connect(lp).connect(g).connect(pan);
    this.connectOutput(pan, 0.85);
    src.start(now);
    src.stop(now + dur + 0.1);

    // Rhythmic metallic rail clack (ガタン・ゴトン)
    for (let i = 0; i < 10; i++) {
      const t = now + 0.55 + i * 0.42;
      const clack = this.ctx.createOscillator();
      clack.type = 'square';
      clack.frequency.setValueAtTime(115 + (i % 2) * 28, t);
      clack.frequency.exponentialRampToValueAtTime(42, t + 0.08);
      const cg = this.ctx.createGain();
      const env = Math.sin(((i + 1) / 11) * Math.PI);
      cg.gain.setValueAtTime(0.14 * env, t);
      cg.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      clack.connect(cg);
      this.connectOutput(cg, 0.7);
      clack.start(t);
      clack.stop(t + 0.12);
    }
  }

  // Retro green Japanese public payphone ringing in West Passage!
  playPayphoneRing(pan = -0.5): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const ring = (offset: number) => {
      for (let i = 0; i < 14; i++) {
        const t = now + offset + i * 0.055;
        const o1 = this.ctx!.createOscillator();
        const o2 = this.ctx!.createOscillator();
        o1.type = 'sine';
        o2.type = 'sine';
        o1.frequency.setValueAtTime(1480, t);
        o2.frequency.setValueAtTime(1920, t);
        const g = this.ctx!.createGain();
        g.gain.setValueAtTime(0.075, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.048);
        const p = this.panNode(pan);
        o1.connect(g);
        o2.connect(g);
        g.connect(p);
        this.connectOutput(p, 0.9);
        o1.start(t);
        o2.start(t);
        o1.stop(t + 0.05);
        o2.stop(t + 0.05);
      }
    };
    ring(0);
    ring(1.45);
  }

  // Photo Booth camera shutter + xenon capacitor whine!
  playPhotoBoothFlash(): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 1800;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.38, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    src.connect(hp).connect(g);
    this.connectOutput(g, 0.55);
    src.start(now);
    src.stop(now + 0.12);

    // Rising strobe capacitor whine
    const whine = this.ctx.createOscillator();
    whine.type = 'sine';
    whine.frequency.setValueAtTime(1100, now + 0.06);
    whine.frequency.exponentialRampToValueAtTime(5400, now + 1.25);
    const wg = this.ctx.createGain();
    wg.gain.setValueAtTime(0.001, now + 0.06);
    wg.gain.linearRampToValueAtTime(0.055, now + 0.2);
    wg.gain.exponentialRampToValueAtTime(0.0005, now + 1.3);
    whine.connect(wg);
    this.connectOutput(wg, 0.45);
    whine.start(now + 0.06);
    whine.stop(now + 1.35);
  }

  playPlayerStep(sprint: boolean, crouch: boolean, onPuddle: boolean): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = onPuddle ? 'bandpass' : 'lowpass';
    f.frequency.value = onPuddle ? 1750 : sprint ? 680 : crouch ? 340 : 480;
    const g = this.ctx.createGain();
    const vol = (crouch ? 0.05 : sprint ? 0.22 : 0.12) * (onPuddle ? 1.3 : 1);
    g.gain.setValueAtTime(vol, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + (onPuddle ? 0.14 : 0.08));
    src.connect(f).connect(g);
    this.connectOutput(g, 0.35);
    src.start(now);
    src.stop(now + 0.16);
  }

  playRabbitStep(dist: number, pan: number, chasing: boolean): void {
    if (!this.ctx || dist > 26) return;
    const now = this.ctx.currentTime;
    const atten = Math.pow(Math.max(0, 1 - dist / 26), 1.65);
    const o = this.ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(chasing ? 102 : 76, now);
    o.frequency.exponentialRampToValueAtTime(28, now + 0.16);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(atten * (chasing ? 0.6 : 0.36), now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
    const p = this.panNode(pan);
    o.connect(g).connect(p);
    this.connectOutput(p, 0.72);
    o.start(now);
    o.stop(now + 0.22);
  }

  playFlashlightClick(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = 'square';
    o.frequency.setValueAtTime(2100, now);
    o.frequency.exponentialRampToValueAtTime(620, now + 0.025);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.14, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    o.connect(g);
    this.connectOutput(g, 0.12);
    o.start(now);
    o.stop(now + 0.04);
  }

  playPaperRustle(): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = 1600;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.11, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
    src.connect(f).connect(g);
    this.connectOutput(g, 0.18);
    src.start(now);
    src.stop(now + 0.18);
  }

  playCoinClink(vol = 0.26, pan = 0): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [3420, 4880, 6210].forEach((freq, i) => {
      const t = now + i * 0.06;
      const o = this.ctx!.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, t);
      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(vol * (1 - i * 0.22), t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.26);
      const p = this.panNode(pan);
      o.connect(g).connect(p);
      this.connectOutput(p, 0.78);
      o.start(t);
      o.stop(t + 0.28);
    });
  }

  playLockerDoor(enter: boolean): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(enter ? 185 : 140, now);
    o.frequency.exponentialRampToValueAtTime(62, now + 0.2);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.16, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    o.connect(g);
    this.connectOutput(g, 0.62);
    o.start(now);
    o.stop(now + 0.24);
  }

  playLockerScratch(): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.setValueAtTime(2600, now);
    f.frequency.linearRampToValueAtTime(1450, now + 0.65);
    f.Q.value = 9.0;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.32, now + 0.07);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.72);
    src.connect(f).connect(g);
    this.connectOutput(g, 0.75);
    src.start(now);
    src.stop(now + 0.76);
  }

  playChargeTick(progress: number): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(680 + progress * 560, now);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.12, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    o.connect(g);
    this.connectOutput(g, 0.42);
    o.start(now);
    o.stop(now + 0.09);
  }

  playChargeComplete(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // Iconic Suica "ピピッ!" double confirmation beep!
    [1318.5, 1760].forEach((freq, i) => {
      const t = now + i * 0.11;
      const o = this.ctx!.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, t);
      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(0.22, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
      o.connect(g);
      this.connectOutput(g, 0.7);
      o.start(t);
      o.stop(t + 0.26);
    });
  }

  playDistortedPAChime(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 508.0].forEach((freq, i) => {
      const t = now + i * 0.34;
      const o = this.ctx!.createOscillator();
      o.type = 'triangle';
      o.frequency.setValueAtTime(freq, t);
      o.frequency.linearRampToValueAtTime(freq * (i === 3 ? 0.86 : 0.96), t + 0.38);
      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(0.18, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.56);
      o.connect(g);
      this.connectOutput(g, 0.92);
      o.start(t);
      o.stop(t + 0.6);
    });
  }

  playBlackoutThunk(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(92, now);
    o.frequency.exponentialRampToValueAtTime(22, now + 0.36);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.55, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
    o.connect(g);
    this.connectOutput(g, 0.85);
    o.start(now);
    o.stop(now + 0.45);
  }

  playLightBlowout(): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 3200;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.42, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    src.connect(f).connect(g);
    this.connectOutput(g, 0.72);
    src.start(now);
    src.stop(now + 0.28);
  }

  playNeckCrack(): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    [0, 0.09].forEach((off, idx) => {
      const src = this.ctx!.createBufferSource();
      src.buffer = this.noiseBuffer!;
      const f = this.ctx!.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = idx === 0 ? 1400 : 980;
      f.Q.value = 5;
      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(0.38, now + off);
      g.gain.exponentialRampToValueAtTime(0.001, now + off + 0.065);
      src.connect(f).connect(g);
      this.connectOutput(g, 0.55);
      src.start(now + off);
      src.stop(now + off + 0.08);
    });
  }

  playStareChill(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [418, 434].forEach((freq) => {
      const o = this.ctx!.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(freq, now);
      o.frequency.exponentialRampToValueAtTime(freq * 1.42, now + 1.15);
      const lp = this.ctx!.createBiquadFilter();
      lp.type = 'bandpass';
      lp.frequency.value = 1100;
      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(0.14, now + 0.2);
      g.gain.exponentialRampToValueAtTime(0.001, now + 1.25);
      o.connect(lp).connect(g);
      this.connectOutput(g, 0.85);
      o.start(now);
      o.stop(now + 1.3);
    });
  }

  playSpotStinger(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [146.8, 155.6, 587.3, 622.3].forEach((freq) => {
      const o = this.ctx!.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(freq, now);
      o.frequency.exponentialRampToValueAtTime(freq * 0.92, now + 0.85);
      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(0.16, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      o.connect(g);
      this.connectOutput(g, 0.82);
      o.start(now);
      o.stop(now + 0.95);
    });
  }

  playPhantomWhisper(pan: number): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.setValueAtTime(1700, now);
    f.frequency.linearRampToValueAtTime(980, now + 0.75);
    f.Q.value = 7.5;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.24, now + 0.15);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.88);
    const p = this.panNode(pan);
    src.connect(f).connect(g).connect(p);
    this.connectOutput(p, 0.82);
    src.start(now);
    src.stop(now + 0.92);
  }

  playPhantomScare(pan: number): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(220, now);
    o.frequency.exponentialRampToValueAtTime(62, now + 0.52);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.22, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.56);
    const p = this.panNode(pan);
    o.connect(g).connect(p);
    this.connectOutput(p, 0.88);
    o.start(now);
    o.stop(now + 0.6);
  }

  playGateError(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [0, 0.16].forEach((off) => {
      const o = this.ctx!.createOscillator();
      o.type = 'square';
      o.frequency.setValueAtTime(240, now + off);
      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(0.16, now + off);
      g.gain.exponentialRampToValueAtTime(0.001, now + off + 0.12);
      o.connect(g);
      this.connectOutput(g, 0.45);
      o.start(now + off);
      o.stop(now + off + 0.14);
    });
  }

  playGateUnlockAndShutter(): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    [880, 1174.6, 1567.9].forEach((f, i) => {
      const t = now + i * 0.11;
      const o = this.ctx!.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(f, t);
      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(0.2, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
      o.connect(g);
      this.connectOutput(g, 0.72);
      o.start(t);
      o.stop(t + 0.36);
    });
    // Heavy steel shutter rolling open
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 320;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now + 0.2);
    g.gain.linearRampToValueAtTime(0.32, now + 0.45);
    g.gain.exponentialRampToValueAtTime(0.001, now + 2.4);
    src.connect(bp).connect(g);
    this.connectOutput(g, 0.8);
    src.start(now + 0.2);
    src.stop(now + 2.5);
  }

  playJumpscare(): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    // Layered dissonant horror shriek + sub-impact + tearing distortion
    [98, 104, 311, 622, 932, 1396].forEach((freq, i) => {
      const o = this.ctx!.createOscillator();
      o.type = i % 2 === 0 ? 'sawtooth' : 'square';
      o.frequency.setValueAtTime(freq, now);
      o.frequency.exponentialRampToValueAtTime(freq * (i < 2 ? 0.55 : 1.18), now + 1.35);
      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(0.22, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 1.42);
      o.connect(g);
      this.connectOutput(g, 0.75);
      o.start(now);
      o.stop(now + 1.45);
    });
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'bandpass';
    hp.frequency.value = 1800;
    const ng = this.ctx.createGain();
    ng.gain.setValueAtTime(0.55, now);
    ng.gain.exponentialRampToValueAtTime(0.001, now + 1.25);
    src.connect(hp).connect(ng);
    this.connectOutput(ng, 0.65);
    src.start(now);
    src.stop(now + 1.3);
  }

  playVictoryChord(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [261.63, 329.63, 392.0, 523.25].forEach((freq) => {
      const o = this.ctx!.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now);
      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(0.11, now + 0.35);
      g.gain.exponentialRampToValueAtTime(0.001, now + 2.8);
      o.connect(g);
      this.connectOutput(g, 0.9);
      o.start(now);
      o.stop(now + 2.9);
    });
  }
}
