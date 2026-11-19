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

// Pass 1: Extract bright HDR highlights for silky optical bloom
const BLOOM_EXTRACT_FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D tDiffuse;
  varying vec2 vUv;
  void main() {
    vec3 col = texture2D(tDiffuse, vUv).rgb;
    float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    float soft = smoothstep(0.56, 1.38, luma);
    gl_FragColor = vec4(col * soft, 1.0);
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

// Final Composite: DepthTexture SSAO + Multi-Pass Bloom + Anamorphic Streak + CAS + ACES + Horror Optics
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

  // 10-tap Rotated-Kernel Bilateral Depth SSAO
  float computeSSAO(vec2 uv, float centerZ, vec2 px) {
    if (uHasDepth < 0.5 || uUltra < 0.5 || centerZ > 24.0 || centerZ < 0.16) return 1.0;
    float ang = interleavedNoise(uv * uResolution) * 6.2831853;
    float sa = sin(ang);
    float ca = cos(ang);
    mat2 rot = mat2(ca, -sa, sa, ca);

    float screenRad = clamp(0.42 / max(centerZ, 0.65), 0.0035, 0.024);
    float aspect = uResolution.x / max(1.0, uResolution.y);
    vec2 radVec = vec2(screenRad / max(0.65, aspect), screenRad);

    vec2 k[10];
    k[0] = vec2( 0.92,  0.14) * 0.38;
    k[1] = vec2(-0.85,  0.32) * 0.48;
    k[2] = vec2( 0.24, -0.91) * 0.56;
    k[3] = vec2(-0.34, -0.82) * 0.66;
    k[4] = vec2( 0.68,  0.65) * 0.74;
    k[5] = vec2(-0.62, -0.68) * 0.82;
    k[6] = vec2(-0.18,  0.96) * 0.90;
    k[7] = vec2( 0.78, -0.58) * 0.96;
    k[8] = vec2( 0.10,  0.52) * 0.44;
    k[9] = vec2(-0.50, -0.15) * 0.60;

    float occ = 0.0;
    float bias = 0.032 + centerZ * 0.008;
    float maxRange = 0.7 + centerZ * 0.04;

    for (int i = 0; i < 10; i++) {
      vec2 suv = clamp(uv + (rot * k[i]) * radVec, px * 2.0, 1.0 - px * 2.0);
      float sampleZ = linearizeDepth(texture2D(tDepth, suv).x);
      float diff = centerZ - sampleZ;
      float rangeW = 1.0 - smoothstep(maxRange * 0.45, maxRange * 1.4, abs(diff));
      occ += smoothstep(bias, bias + 0.16, diff) * rangeW;
    }

    occ = clamp((occ / 10.0) * 1.15, 0.0, 0.68);
    float distFade = 1.0 - smoothstep(14.0, 24.0, centerZ);
    return 1.0 - occ * 0.48 * distFade;
  }

  // Subtle horizontal anamorphic lens flare on blazing Shinjuku fluorescent tubes & headlights
  vec3 sampleAnamorphic(vec2 uv, vec2 px) {
    if (uUltra < 0.5) return vec3(0.0);
    vec3 streak = vec3(0.0);
    float offs[4];
    offs[0] = -18.0; offs[1] = -8.0; offs[2] = 8.0; offs[3] = 18.0;
    for (int i = 0; i < 4; i++) {
      vec3 s = texture2D(tBloom, clamp(uv + vec2(offs[i] * px.x * 2.0, 0.0), 0.002, 0.998)).rgb;
      streak += s;
    }
    return streak * vec3(0.16, 0.24, 0.28) * 0.32;
  }

  void main() {
    vec2 px = 1.0 / max(vec2(1.0), uResolution);
    float distAmt = (uUltra > 0.5 ? 0.036 : 0.018) + uFear * 0.026 + uGlitch * 0.052;
    vec2 uv = barrelDistort(vUv, distAmt);

    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      gl_FragColor = vec4(0.012, 0.016, 0.022, 1.0);
      return;
    }

    // VHS / Electromagnetic interference tearing during terror & jumpscares
    if (uGlitch > 0.015) {
      float band = floor(uv.y * 42.0);
      float tear = hash12(vec2(band, floor(uTime * 28.0)));
      if (tear > 1.0 - uGlitch * 0.32) {
        uv.x = clamp(uv.x + (tear - 0.5) * 0.055 * uGlitch, 0.002, 0.998);
      }
    }

    vec2 centered = uv - 0.5;
    float rad2 = dot(centered, centered);

    // Subtle optic chromatic aberration at lens edges, surging during panic/glitch
    float ca = (0.0007 + uFear * 0.0024 + uGlitch * 0.008) * (0.25 + rad2 * 2.2);
    vec2 caDir = centered * ca;
    vec3 col;
    col.r = texture2D(tDiffuse, clamp(uv + caDir, 0.002, 0.998)).r;
    col.g = texture2D(tDiffuse, uv).g;
    col.b = texture2D(tDiffuse, clamp(uv - caDir, 0.002, 0.998)).b;

    // FidelityFX CAS local contrast sharpening (crisp Japanese kanji signs & matted plush fur!)
    if (uUltra > 0.5) {
      vec3 nN = texture2D(tDiffuse, clamp(uv + vec2(0.0, px.y), 0.002, 0.998)).rgb;
      vec3 nS = texture2D(tDiffuse, clamp(uv - vec2(0.0, px.y), 0.002, 0.998)).rgb;
      vec3 nE = texture2D(tDiffuse, clamp(uv + vec2(px.x, 0.0), 0.002, 0.998)).rgb;
      vec3 nW = texture2D(tDiffuse, clamp(uv - vec2(px.x, 0.0), 0.002, 0.998)).rgb;
      vec3 blur = (nN + nS + nE + nW) * 0.25;
      float contrast = length(col - blur);
      float sharpAmt = clamp(0.28 - contrast * 0.2, 0.06, 0.28);
      col = max(vec3(0.0), col + (col - blur) * sharpAmt);
    }

    // Bilateral DepthTexture SSAO contact shadows
    float centerZ = uHasDepth > 0.5 ? linearizeDepth(texture2D(tDepth, uv).x) : 10.0;
    float ao = computeSSAO(uv, centerZ, px);
    col *= ao;

    // Multi-pass silky HDR optical bloom + horizontal anamorphic glint
    vec3 bloom = texture2D(tBloom, uv).rgb;
    col += bloom * (uUltra > 0.5 ? 0.62 : 0.36);
    col += sampleAnamorphic(uv, px);

    // Subtle eye adaptation in stealth
    float isoBoost = 1.0 + uAutoIso * 0.24;
    col *= uExposure * isoBoost;

    // Cinematic ACES Filmic Tone Mapping
    col = acesFilm(col);

    // Tokyo Underground Shinjuku Film Color Grade
    float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    vec3 shadowTint = vec3(0.90, 0.97, 1.06);
    vec3 hiTint = vec3(1.03, 1.01, 0.97);
    col *= mix(shadowTint, hiTint, smoothstep(0.08, 0.78, luma));

    // Gentle S-curve contrast lift
    col = mix(col, smoothstep(0.0, 1.0, col), 0.14);

    // Fear desaturation & crimson chase shift
    float desat = uFear * 0.22 + uChase * 0.12;
    col = mix(col, vec3(luma), desat);
    col = mix(col, col * vec3(1.18, 0.87, 0.87), uChase * 0.32);

    // Cold breath condensation / moisture halo at screen edges when hiding/holding breath
    if (uBreathFog > 0.02) {
      float edgeMask = smoothstep(0.26, 0.80, length(centered * vec2(1.05, 1.28)));
      float breathWave = 0.6 + 0.4 * sin(uTime * 2.1 + uv.x * 5.0);
      float fogAmt = edgeMask * uBreathFog * (0.28 + 0.14 * breathWave);
      col = mix(col, vec3(0.56, 0.66, 0.72), clamp(fogAmt, 0.0, 0.36));
    }

    // Impact / Photo Booth / Lightning flash
    col += vec3(0.9, 0.95, 1.0) * uImpactFlash * 0.48;

    // Physical lens vignette + heartbeat crimson rim
    float vigBase = smoothstep(0.90, 0.26, length(centered * vec2(1.16, 1.02)));
    float vigPower = mix(0.22, 0.68, clamp(uFear * 0.7 + uChase * 0.3 + uHeartbeat * 0.25, 0.0, 1.0));
    col *= mix(1.0 - vigPower, 1.0, vigBase);

    float redRim = (1.0 - vigBase) * (uFear * 0.22 + uHeartbeat * 0.28 + uChase * 0.22);
    col += vec3(0.48, 0.03, 0.04) * redRim;

    // Linear -> sRGB display encoding FIRST (prevents gamma from blowing up shadow noise!)
    col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));

    // Subtle organic sRGB-space 35mm film grain (clean & velvety even in deep blacks!)
    float grainNoise = hash12(uv * uResolution + fract(uTime * 19.7) * 512.0) - 0.5;
    float grainAmt = 0.022 + uAutoIso * 0.024 + uFear * 0.028 + uGlitch * 0.085;
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
    this.blurMat.uniforms.uDir.value.set(1.6 / bw, 0);
    renderer.setRenderTarget(this.bloomBlurH);
    renderer.render(this.quadScene, this.quadCamera);

    // Pass B (Vertical)
    this.blurMat.uniforms.tDiffuse.value = this.bloomBlurH.texture;
    this.blurMat.uniforms.uDir.value.set(0, 1.6 / bh);
    renderer.setRenderTarget(this.bloomBlurV);
    renderer.render(this.quadScene, this.quadCamera);

    if (this.quality === 'ultra') {
      // Wide halo second Gaussian iteration
      this.blurMat.uniforms.tDiffuse.value = this.bloomBlurV.texture;
      this.blurMat.uniforms.uDir.value.set(3.2 / bw, 0);
      renderer.setRenderTarget(this.bloomBlurH);
      renderer.render(this.quadScene, this.quadCamera);

      this.blurMat.uniforms.tDiffuse.value = this.bloomBlurH.texture;
      this.blurMat.uniforms.uDir.value.set(0, 3.2 / bh);
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
