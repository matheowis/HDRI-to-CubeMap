uniform sampler2D tDiffuse;
varying vec2 vUv;

/// https://github.com/glslify/glsl-gamma/blob/master/out.glsl
// const float gamma = 2.2;

// float toGamma(float v) {
//   return pow(v, 1.0 / gamma);
// }

// vec2 toGamma(vec2 v) {
//   return pow(v, vec2(1.0 / gamma));
// }

// vec3 toGamma(vec3 v) {
//   return pow(v, vec3(1.0 / gamma));
// }

// vec4 toGamma(vec4 v) {
//   return vec4(toGamma(v.rgb), v.a);
// }

///http://marcinignac.com/blog/pragmatic-pbr-hdr
vec3 rgbe2rgb(vec4 rgbe) {
  return (rgbe.rgb * pow(2.0, rgbe.a * 255.0 - 128.0));
}
///http://marcinignac.com/blog/pragmatic-pbr-hdr
vec3 tonemapReinhard(vec3 color) {
  return color / (color + vec3(1.0));
}

/// https://github.com/glslify/glsl-gamma/blob/master/out.glsl
const float gamma = 2.2;
vec3 toGamma(vec3 v) {
  return pow(v, vec3(1.0 / gamma));
}

/// http://graphicrants.blogspot.com/2009/04/rgbm-color-encoding.html
vec4 RGBMEncode(vec3 color){
  vec4 rgbm;
  color *= 1.0 / 6.0;
  rgbm.w = clamp( max( max( color.r, color.g ), max( color.b, 1e-6 ) ),0.0,1.0 );
  rgbm.w = ceil( rgbm.a * 255.0 ) / 255.0;
  rgbm.xyz = color / rgbm.w;
  return rgbm;
}

void main() {
  float uExposure = 2.0;

  vec4 texelColor = texture2D( tDiffuse, vUv );

  texelColor.rgb *= uExposure;

  texelColor.rgb = tonemapReinhard(texelColor.rgb);

  texelColor.rgb = toGamma(texelColor.rgb);

  vec4 rgbm = RGBMEncode(texelColor);

  gl_FragColor = rgbm;
}