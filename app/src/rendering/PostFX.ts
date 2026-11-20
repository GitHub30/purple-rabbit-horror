import * as THREE from 'three';

export interface PostFXParams {
  time: number;
  fear: number;
  chase: number;
  glitch: number;
  exposure: number;
  heartbeat: number;
  autoIso: number;
  breathFog: number;
  impactFlash: number;
  cameraNear: number;
  cameraFar: number;
}

const FULLSCREEN_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Pass 1: Extract only true high-energy specular/LED highlights (prevents white signs & floor glare!)
const BLOOM_EXTRACT_FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D tDiffuse;
  varying vec2 vUv;
  void main() {
    vec3 col = texture2D(tDiffuse, vUv).rgb;
    float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    float soft = smoothstep(1.12, 2.35, luma);
    vec3 extracted = min(col * soft, vec3(1.65));
    gl_FragColor = vec4(extracted, 1.0);
  }
`;

// Pass 2 & 3: Separable 9-tap Gaussian Blur
const BLOOM_BLUR_FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D tDiffuse;
  uniform vec2 uDir;
  varying vec2 vUv;
  void main() {
    vec3 sum = texture2D(tDiffuse, vUv).rgb * 0.227027;
    sum += texture2D(tDiffuse, clamp(vUv + uDir * 1.384615, 0.002, 0.998)).rgb * 0.316216;
    sum += texture2D(tDiffuse, clamp(vUv - uDir * 1.384615, 0.002, 0.998)).rgb * 0.316216;
    sum += texture2D(tDiffuse, clamp(vUv + uDir * 3.230769, 0.002, 0.998)).rgb * 0.070270;
    sum += texture2D(tDiffuse, clamp(vUv - uDir * 3.230769, 0.002, 0.998)).rgb * 0.070270;
    gl_FragColor = vec4(sum, 1.0);
  }
`;

// Final Composite: Deep Bilateral Depth SSAO + Tight Anti-Glare Optical Bloom + CAS + ACES + Midnight Horror Optics
const COMPOSITE_FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D tDiffuse;
  uniform sampler2D tDepth;
  uniform sampler2D tBloom;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uFear;
  uniform float uChase;
  uniform float uGlitch;
  uniform float uExposure;
  uniform float uHeartbeat;
  uniform float uAutoIso;
  uniform float uBreathFog;
  uniform float uImpactFlash;
  uniform float uNear;
  uniform float uFar;
  uniform float uHasDepth;
  uniform float uUltra;
  varying vec2 vUv;

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float interleavedNoise(vec2 px) {
    return fract(52.9829189 * fract(dot(px, vec2(0.06711056, 0.00583715))));
  }

  float linearizeDepth(float d) {
    float z = d * 2.0 - 1.0;
    return (2.0 * uNear * uFar) / max(0.0001, (uFar + uNear - z * (uFar - uNear)));
  }

  // ACES Filmic Tone Mapping
  vec3 acesFilm(vec3 x) {
    const float a = 2.51;
    const float b = 0.03;
    const float c = 2.43;
    const float d = 0.59;
    const float e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
  }

  vec2 barrelDistort(vec2 uv, float amt) {
    vec2 c = uv - 0.5;
    float r2 = dot(c, c);
    return 0.5 + c * (1.0 + amt * r2);
  }

  // 10-tap Rotated-Kernel Bilateral Depth SSAO (crisp architectural crease & floor contact occlusion!)
  float computeSSAO(vec2 uv, float centerZ, vec2 px) {
    if (uHasDepth < 0.5 || uUltra < 0.5 || centerZ > 26.0 || centerZ < 0.15) return 1.0;
    float ang = interleavedNoise(uv * uResolution) * 6.2831853;
    float sa = sin(ang);
    float ca = cos(ang);
    mat2 rot = mat2(ca, -sa, sa, ca);

    float screenRad = clamp(0.48 / max(centerZ, 0.65), 0.004, 0.028);
    float aspect = uResolution.x / max(1.0, uResolution.y);
    vec2 radVec = vec2(screenRad / max(0.65, aspect), screenRad);

    vec2 k[10];
    k[0] = vec2( 0.92,  0.14) * 0.36;
    k[1] = vec2(-0.85,  0.32) * 0.46;
    k[2] = vec2( 0.24, -0.91) * 0.54;
    k[3] = vec2(-0.34, -0.82) * 0.64;
    k[4] = vec2( 0.68,  0.65) * 0.74;
    k[5] = vec2(-0.62, -0.68) * 0.82;
    k[6] = vec2(-0.18,  0.96) * 0.90;
    k[7] = vec2( 0.78, -0.58) * 0.98;
    k[8] = vec2( 0.10,  0.52) * 0.42;
    k[9] = vec2(-0.50, -0.15) * 0.58;

    float occ = 0.0;
    float bias = 0.024 + centerZ * 0.0065;
    float maxRange = 0.78 + centerZ * 0.042;

    for (int i = 0; i < 10; i++) {
      vec2 suv = clamp(uv + (rot * k[i]) * radVec, px * 2.0, 1.0 - px * 2.0);
      float sampleZ = linearizeDepth(texture2D(tDepth, suv).x);
      float diff = centerZ - sampleZ;
      float rangeW = 1.0 - smoothstep(maxRange * 0.42, maxRange * 1.35, abs(diff));
      occ += smoothstep(bias, bias + 0.14, diff) * rangeW;
    }

    occ = clamp((occ / 10.0) * 1.32, 0.0, 0.78);
    float distFade = 1.0 - smoothstep(16.0, 26.0, centerZ);
    return 1.0 - occ * 0.62 * distFade;
  }

  // Whisper-subtle horizontal anamorphic glint strictly on intense point emitters
  vec3 sampleAnamorphic(vec2 uv, vec2 px) {
    if (uUltra < 0.5) return vec3(0.0);
    vec3 streak = vec3(0.0);
    float offs[4];
    offs[0] = -14.0; offs[1] = -6.0; offs[2] = 6.0; offs[3] = 14.0;
    for (int i = 0; i < 4; i++) {
      vec3 s = texture2D(tBloom, clamp(uv + vec2(offs[i] * px.x * 1.8, 0.0), 0.002, 0.998)).rgb;
      streak += s;
    }
    return streak * vec3(0.14, 0.22, 0.26) * 0.09;
  }

  void main() {
    vec2 px = 1.0 / max(vec2(1.0), uResolution);
    float distAmt = (uUltra > 0.5 ? 0.028 : 0.015) + uFear * 0.032 + uGlitch * 0.056;
    vec2 uv = barrelDistort(vUv, distAmt);

    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      gl_FragColor = vec4(0.008, 0.011, 0.016, 1.0);
      return;
    }

    // VHS / Electromagnetic interference tearing during terror & jumpscares
    if (uGlitch > 0.015) {
      float band = floor(uv.y * 46.0);
      float tear = hash12(vec2(band, floor(uTime * 30.0)));
      if (tear > 1.0 - uGlitch * 0.34) {
        uv.x = clamp(uv.x + (tear - 0.5) * 0.062 * uGlitch, 0.002, 0.998);
      }
    }

    vec2 centered = uv - 0.5;
    float rad2 = dot(centered, centered);

    // Subtle optic chromatic aberration at lens edges, surging during panic/glitch
    float ca = (0.00055 + uFear * 0.0026 + uGlitch * 0.0085) * (0.25 + rad2 * 2.2);
    vec2 caDir = centered * ca;
    vec3 col;
    col.r = texture2D(tDiffuse, clamp(uv + caDir, 0.002, 0.998)).r;
    col.g = texture2D(tDiffuse, uv).g;
    col.b = texture2D(tDiffuse, clamp(uv - caDir, 0.002, 0.998)).b;

    // FidelityFX CAS local contrast sharpening (razor-sharp kanji signs, ticket machine buttons & matted plush fur!)
    if (uUltra > 0.5) {
      vec3 nN = texture2D(tDiffuse, clamp(uv + vec2(0.0, px.y), 0.002, 0.998)).rgb;
      vec3 nS = texture2D(tDiffuse, clamp(uv - vec2(0.0, px.y), 0.002, 0.998)).rgb;
      vec3 nE = texture2D(tDiffuse, clamp(uv + vec2(px.x, 0.0), 0.002, 0.998)).rgb;
      vec3 nW = texture2D(tDiffuse, clamp(uv - vec2(px.x, 0.0), 0.002, 0.998)).rgb;
      vec3 blur = (nN + nS + nE + nW) * 0.25;
      float contrast = length(col - blur);
      float sharpAmt = clamp(0.34 - contrast * 0.22, 0.08, 0.34);
      col = max(vec3(0.0), col + (col - blur) * sharpAmt);
    }

    // Bilateral DepthTexture SSAO contact shadows
    float centerZ = uHasDepth > 0.5 ? linearizeDepth(texture2D(tDepth, uv).x) : 10.0;
    float ao = computeSSAO(uv, centerZ, px);
    col *= ao;

    // Controlled tight HDR optical bloom (ZERO blinding whiteout glare!)
    vec3 bloom = texture2D(tBloom, uv).rgb;
    col += bloom * (uUltra > 0.5 ? 0.20 : 0.13);
    col += sampleAnamorphic(uv, px);

    // Subtle dark-room eye adaptation when hiding or flashlight OFF
    float isoBoost = 1.0 + uAutoIso * 0.22;
    col *= uExposure * isoBoost;

    // Soft highlight knee before ACES so white signage stays crisp & readable
    col = col / (1.0 + max(vec3(0.0), col - vec3(1.15)) * 0.32);

    // Cinematic ACES Filmic Tone Mapping
    col = acesFilm(col);

    // Tokyo 00:47 Midnight Underground Shinjuku Film Color Grade (deep slate shadows, natural cool-neutral highlights)
    float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    vec3 shadowTint = vec3(0.84, 0.94, 1.05);
    vec3 hiTint = vec3(1.01, 1.00, 0.97);
    col *= mix(shadowTint, hiTint, smoothstep(0.06, 0.72, luma));

    // Filmic shadow contrast (deep blacks for authentic midnight horror dread!)
    col = mix(col, smoothstep(0.0, 1.0, col), 0.18);

    // Fear desaturation & blood-crimson chase shift
    float desat = uFear * 0.32 + uChase * 0.14;
    col = mix(col, vec3(luma), desat);
    col = mix(col, col * vec3(1.22, 0.84, 0.84), uChase * 0.36);

    // Cold breath condensation / moisture halo at screen edges when hiding/holding breath
    if (uBreathFog > 0.02) {
      float edgeMask = smoothstep(0.26, 0.80, length(centered * vec2(1.05, 1.28)));
      float breathWave = 0.6 + 0.4 * sin(uTime * 2.1 + uv.x * 5.0);
      float fogAmt = edgeMask * uBreathFog * (0.30 + 0.14 * breathWave);
      col = mix(col, vec3(0.52, 0.62, 0.68), clamp(fogAmt, 0.0, 0.38));
    }

    // Impact / Photo Booth / Lightning flash (controlled, never blinding whiteout)
    col += vec3(0.85, 0.92, 0.98) * uImpactFlash * 0.36;

    // Atmospheric claustrophobic lens vignette + heartbeat crimson rim
    float vigBase = smoothstep(0.88, 0.22, length(centered * vec2(1.14, 1.02)));
    float vigPower = mix(0.32, 0.78, clamp(uFear * 0.72 + uChase * 0.3 + uHeartbeat * 0.25, 0.0, 1.0));
    col *= mix(1.0 - vigPower, 1.0, vigBase);

    float redRim = (1.0 - vigBase) * (uFear * 0.26 + uHeartbeat * 0.32 + uChase * 0.26);
    col += vec3(0.52, 0.025, 0.035) * redRim;

    // Linear -> sRGB display encoding FIRST
    col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));

    // Organic sRGB-space 35mm midnight film grain
    float grainNoise = hash12(uv * uResolution + fract(uTime * 19.7) * 512.0) - 0.5;
    float grainAmt = 0.026 + uAutoIso * 0.028 + uFear * 0.032 + uGlitch * 0.095;
    col = clamp(col + grainNoise * grainAmt, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export class PostFX {
  private sceneTarget: THREE.WebGLRenderTarget;
  private depthTexture: THREE.DepthTexture | null = null;
  private bloomExtractTarget: THREE.WebGLRenderTarget;
  private bloomBlurH: THREE.WebGLRenderTarget;
  private bloomBlurV: THREE.WebGLRenderTarget;
  private quadScene = new THREE.Scene();
  private quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private quadGeo = new THREE.PlaneGeometry(2, 2);
  private extractMat: THREE.ShaderMaterial;
  private blurMat: THREE.ShaderMaterial;
  private compositeMat: THREE.ShaderMaterial;
  private quadMesh: THREE.Mesh;
  private quality: 'ultra' | 'standard' = 'ultra';
  private hasDepth = false;

  constructor(
    renderer: THREE.WebGLRenderer,
    width: number,
    height: number,
    dpr: number
  ) {
    const rw = Math.max(2, Math.floor(width * dpr));
    const rh = Math.max(2, Math.floor(height * dpr));
    const bw = Math.max(2, Math.floor(rw * 0.25));
    const bh = Math.max(2, Math.floor(rh * 0.25));

    const isWebGL2 = renderer.capabilities.isWebGL2;
    const rtType = isWebGL2 ? THREE.HalfFloatType : THREE.UnsignedByteType;

    this.sceneTarget = new THREE.WebGLRenderTarget(rw, rh, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: rtType,
      depthBuffer: true,
    });

    if (isWebGL2) {
      this.depthTexture = new THREE.DepthTexture(rw, rh);
      this.depthTexture.type = THREE.UnsignedIntType;
      this.sceneTarget.depthTexture = this.depthTexture;
      this.hasDepth = true;
    }

    const bloomOpts: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: rtType,
      depthBuffer: false,
    };
    this.bloomExtractTarget = new THREE.WebGLRenderTarget(bw, bh, bloomOpts);
    this.bloomBlurH = new THREE.WebGLRenderTarget(bw, bh, bloomOpts);
    this.bloomBlurV = new THREE.WebGLRenderTarget(bw, bh, bloomOpts);

    this.extractMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: BLOOM_EXTRACT_FRAG,
      uniforms: { tDiffuse: { value: this.sceneTarget.texture } },
      depthTest: false,
      depthWrite: false,
    });

    this.blurMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: BLOOM_BLUR_FRAG,
      uniforms: {
        tDiffuse: { value: null },
        uDir: { value: new THREE.Vector2(1 / bw, 0) },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.compositeMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: COMPOSITE_FRAG,
      uniforms: {
        tDiffuse: { value: this.sceneTarget.texture },
        tDepth: { value: this.depthTexture },
        tBloom: { value: this.bloomBlurV.texture },
        uResolution: { value: new THREE.Vector2(rw, rh) },
        uTime: { value: 0 },
        uFear: { value: 0 },
        uChase: { value: 0 },
        uGlitch: { value: 0 },
        uExposure: { value: 1.15 },
        uHeartbeat: { value: 0 },
        uAutoIso: { value: 0 },
        uBreathFog: { value: 0 },
        uImpactFlash: { value: 0 },
        uNear: { value: 0.08 },
        uFar: { value: 75.0 },
        uHasDepth: { value: this.hasDepth ? 1.0 : 0.0 },
        uUltra: { value: 1.0 },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.quadMesh = new THREE.Mesh(this.quadGeo, this.compositeMat);
    this.quadScene.add(this.quadMesh);
  }

  setQuality(q: 'ultra' | 'standard'): void {
    this.quality = q;
    this.compositeMat.uniforms.uUltra.value = q === 'ultra' ? 1.0 : 0.0;
  }

  setSize(width: number, height: number, dpr: number): void {
    const rw = Math.max(2, Math.floor(width * dpr));
    const rh = Math.max(2, Math.floor(height * dpr));
    const bw = Math.max(2, Math.floor(rw * 0.25));
    const bh = Math.max(2, Math.floor(rh * 0.25));
    this.sceneTarget.setSize(rw, rh);
    this.bloomExtractTarget.setSize(bw, bh);
    this.bloomBlurH.setSize(bw, bh);
    this.bloomBlurV.setSize(bw, bh);
    this.compositeMat.uniforms.uResolution.value.set(rw, rh);
  }

  render(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    p: PostFXParams
  ): void {
    // 1. Render 3D Shinjuku scene into HDR + DepthTexture target
    renderer.setRenderTarget(this.sceneTarget);
    renderer.clear();
    renderer.render(scene, camera);

    // 2. Quarter-res HDR Bloom Extract
    this.quadMesh.material = this.extractMat;
    this.extractMat.uniforms.tDiffuse.value = this.sceneTarget.texture;
    renderer.setRenderTarget(this.bloomExtractTarget);
    renderer.render(this.quadScene, this.quadCamera);

    // 3. Separable Gaussian Blur (2 passes for rich silky glow!)
    const bw = this.bloomBlurH.width;
    const bh = this.bloomBlurH.height;
    this.quadMesh.material = this.blurMat;

    // Pass A (Horizontal)
    this.blurMat.uniforms.tDiffuse.value = this.bloomExtractTarget.texture;
    this.blurMat.uniforms.uDir.value.set(1.15 / bw, 0);
    renderer.setRenderTarget(this.bloomBlurH);
    renderer.render(this.quadScene, this.quadCamera);

    // Pass B (Vertical)
    this.blurMat.uniforms.tDiffuse.value = this.bloomBlurH.texture;
    this.blurMat.uniforms.uDir.value.set(0, 1.15 / bh);
    renderer.setRenderTarget(this.bloomBlurV);
    renderer.render(this.quadScene, this.quadCamera);

    if (this.quality === 'ultra') {
      // Controlled tight optical second Gaussian iteration
      this.blurMat.uniforms.tDiffuse.value = this.bloomBlurV.texture;
      this.blurMat.uniforms.uDir.value.set(2.05 / bw, 0);
      renderer.setRenderTarget(this.bloomBlurH);
      renderer.render(this.quadScene, this.quadCamera);

      this.blurMat.uniforms.tDiffuse.value = this.bloomBlurH.texture;
      this.blurMat.uniforms.uDir.value.set(0, 2.05 / bh);
      renderer.setRenderTarget(this.bloomBlurV);
      renderer.render(this.quadScene, this.quadCamera);
    }

    // 4. Final Cinematic Composite to screen
    const u = this.compositeMat.uniforms;
    u.uTime.value = p.time;
    u.uFear.value = p.fear;
    u.uChase.value = p.chase;
    u.uGlitch.value = p.glitch;
    u.uExposure.value = p.exposure;
    u.uHeartbeat.value = p.heartbeat;
    u.uAutoIso.value = p.autoIso;
    u.uBreathFog.value = p.breathFog;
    u.uImpactFlash.value = p.impactFlash;
    u.uNear.value = p.cameraNear;
    u.uFar.value = p.cameraFar;

    this.quadMesh.material = this.compositeMat;
    renderer.setRenderTarget(null);
    renderer.render(this.quadScene, this.quadCamera);
  }

  dispose(): void {
    this.sceneTarget.dispose();
    this.depthTexture?.dispose();
    this.bloomExtractTarget.dispose();
    this.bloomBlurH.dispose();
    this.bloomBlurV.dispose();
    this.quadGeo.dispose();
    this.extractMat.dispose();
    this.blurMat.dispose();
    this.compositeMat.dispose();
  }
}
