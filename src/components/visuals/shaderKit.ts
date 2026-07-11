/**
 * Shared GLSL for the hero shaders. Each variant supplies only a `shade()`
 * function; HEADER provides the palette, noise, AF-ECG helpers and uniforms,
 * and MAIN provides the shared chromatic-aberration split, resolve-from-noise,
 * scroll-recede and vignette. Compose as HEADER + shade + MAIN.
 *
 * Uniforms: u_mouse is the smoothed pointer (sheen hue only, anchored — never
 * translates the form); u_energy is the smoothed pointer-velocity (shimmer);
 * u_recede dims toward the flat grape field on scroll (home).
 */
export const HEADER = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_intro;
uniform vec2 u_mouse;
uniform float u_energy;
uniform float u_recede;

const vec3 DEEP  = vec3(0.09, 0.04, 0.26);
const vec3 GRAPE = vec3(0.416, 0.133, 0.839);

float hash(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }
float vnoise(vec2 p){
  vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  float a=hash(i), b=hash(i+vec2(1.0,0.0)), c=hash(i+vec2(0.0,1.0)), d=hash(i+vec2(1.0,1.0));
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){ float s=0.0,a=0.5; mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<5;i++){ s+=a*vnoise(p); p=m*p; a*=0.5; } return s; }
vec3 ramp(float f){
  vec3 c1=vec3(0.09,0.04,0.26), c2=vec3(0.32,0.12,0.72), c3=vec3(0.55,0.36,0.94), c4=vec3(0.86,0.84,0.99);
  vec3 col=mix(c1,c2,smoothstep(0.0,0.45,f));
  col=mix(col,c3,smoothstep(0.40,0.72,f));
  col=mix(col,c4,smoothstep(0.78,1.0,f));
  return col;
}
float gaus(float d, float w){ return exp(-(d*d)/(w*w)); }
// AF-ECG morphology (QRS + T, no P wave) at distance d from an R peak.
float ecg(float d){
  return -0.10*gaus(d+0.008,0.004) + 0.95*gaus(d,0.004)
         -0.26*gaus(d-0.009,0.0045) + 0.20*gaus(d-0.042,0.017);
}
// Anchored, irregularly-irregular (atrial fibrillation) ECG trace at x. Beats
// sit on a jittered grid — the R-R intervals never repeat — with no time term.
float afTrace(float x){
  float period = 0.42;
  float idx = floor(x / period);
  float v = 0.0;
  for(int k=-1;k<=1;k++){
    float i = idx + float(k);
    float jit = (hash(vec2(i, 7.0)) - 0.5) * 0.30; // ±0.15 R-R jitter (AF)
    float center = (i + 0.5) * period + jit;
    v += ecg(x - center);
  }
  return v;
}
`

const MAIN = `
void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float t = u_time;
  float en = u_energy;
  float off = 0.0016 + 0.03 * en;               // horizontal chromatic aberration
  vec3 cR = shade(uv + vec2(off, 0.0), t, en);
  vec3 cG = shade(uv, t, en);
  vec3 cB = shade(uv - vec2(off, 0.0), t, en);
  vec3 col = vec3(cR.r, cG.g, cB.b);
  float n = hash(gl_FragCoord.xy * 0.5 + vec2(u_time));
  col = mix(mix(DEEP, vec3(n), 0.5), col, u_intro);
  col = mix(col, GRAPE, u_recede * 0.9);        // recede to the flat grape field
  float v = smoothstep(1.55, 0.15, length(uv));
  col *= 0.9 + 0.1 * v;
  gl_FragColor = vec4(col, 1.0);
}
`

// HOME: best of both — the lab's iridescent, domain-warped field carrying the
// contained home ribbon. The field blooms toward the right negative space (where
// the signal lives) and stays calm, high-contrast grape under the left-aligned
// headline (keratoconus: text legibility first). The ribbon is dropped into the
// empty space below the headline. The busier field also earns the lab's stronger
// chromatic glitch through the shared split in MAIN.
const HERO_SHADE = `
vec3 shade(vec2 uv, float t, float en){
  // iridescent field (from the lab): domain-warped fbm + thin-film sheen
  vec2 q = vec2(fbm(uv * 1.5 + vec2(0.0, 0.05 * t)),
                fbm(uv * 1.5 + vec2(3.2, -0.05 * t)));
  float ff = fbm(uv * 1.5 + 1.7 * q);
  vec3 field = ramp(ff);
  float e = length(q - 0.5) * 1.6;
  float sheen = smoothstep(0.35, 0.95, e);
  vec3 fIrid = 0.14 * cos(6.28318 * (ff * 2.0 + u_mouse.x * 0.4 + vec3(0.0, 0.33, 0.66)));
  field += fIrid * sheen;
  field = mix(field, GRAPE, 0.14);

  // calm grape for the headline zone — keeps the left high-contrast for text
  vec3 calm = mix(GRAPE * 0.88, GRAPE * 1.06, ff);

  // field blooms across the right negative space; calmer under the headline
  float rightBias = smoothstep(-0.1, 0.4, uv.x);
  vec3 base = mix(calm, field, rightBias);

  // contained ECG feature — sits in the empty band just below "signal", in the
  // right negative space (clear of "noise." and the body copy on the left),
  // held by a soft envelope.
  vec2 fc = vec2(0.5, -0.06);
  float x = uv.x - fc.x;
  float xe = x / 0.45;
  float env = exp(-xe * xe);
  float trace = afTrace(x);
  float yc = fc.y - 0.05 * x + trace * 0.26 * env; // gentle tilt, reined height
  float thick = 0.028;                              // thin ribbon
  float d = abs(uv.y - yc);
  float ribbon = smoothstep(thick, thick * 0.3, d) * env;

  float f = 0.6 + trace * 0.6;
  vec3 sig = ramp(clamp(f, 0.0, 1.0)) + vec3(0.05);
  vec3 col = mix(base, sig, ribbon);
  float edge = smoothstep(thick, thick * 0.5, d) * (1.0 - smoothstep(thick * 0.5, 0.0, d)) * env;
  vec3 irid = 0.16 * cos(6.28318 * (f * 2.0 + x * 0.8 + 0.03 * t + u_mouse.x * 0.4 + vec3(0.0, 0.33, 0.66)));
  col += irid * ribbon * (1.0 + 0.8 * en);
  col += edge * vec3(0.9, 0.95, 0.8) * 0.3;
  return col;
}
`

// LAB: the signal living inside the iridescent field — the field is the noise,
// the ECG is the signal emerging from it. Field kept calm (grape-biased) so the
// signal stays the clear focal element.
const LAB_SHADE = `
vec3 shade(vec2 uv, float t, float en){
  vec2 q = vec2(fbm(uv * 1.5 + vec2(0.0, 0.05 * t)),
                fbm(uv * 1.5 + vec2(3.2, -0.05 * t)));
  float ff = fbm(uv * 1.5 + 1.7 * q);
  vec3 field = ramp(ff);
  float e = length(q - 0.5) * 1.6;
  float sheen = smoothstep(0.35, 0.95, e);
  vec3 irid = 0.12 * cos(6.28318 * (ff * 2.0 + u_mouse.x * 0.4 + vec3(0.0, 0.33, 0.66)));
  field += irid * sheen;
  field = mix(field, GRAPE, 0.18);              // keep the noise calm + grape

  // the anchored AF-ECG signal, emerging brighter from the field
  float trace = afTrace(uv.x);
  float yc = trace * 0.32;
  float thick = 0.026;
  float d = abs(uv.y - yc);
  float ribbon = smoothstep(thick, thick * 0.3, d);
  vec3 sig = ramp(clamp(0.62 + trace * 0.6, 0.0, 1.0)) + vec3(0.08);
  vec3 col = mix(field, sig, ribbon);
  float edge = smoothstep(thick, thick * 0.5, d) * (1.0 - smoothstep(thick * 0.5, 0.0, d));
  col += edge * vec3(0.9, 0.95, 0.8) * 0.3;
  col += irid * ribbon * (1.0 + 0.8 * en);
  return col;
}
`

export const HERO_FRAG = HEADER + HERO_SHADE + MAIN
export const LAB_FRAG = HEADER + LAB_SHADE + MAIN
