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
// vec3 rgbe2rgb(vec4 rgbe) {
//   return (rgbe.rgb * pow(2.0, rgbe.a * 255.0 - 128.0));
// }
///http://marcinignac.com/blog/pragmatic-pbr-hdr
// vec3 tonemapReinhard(vec3 color) {
//   return color / (color + vec3(1.0));
// }

/// https://github.com/glslify/glsl-gamma/blob/master/out.glsl
// const float gamma = 2.2;
// vec3 toGamma(vec3 v) {
//   return pow(v, vec3(1.0 / gamma));
// }



// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html
// it is already defined
// vec4 RGBMToLinear2( in vec4 value, in float maxRange ) {
// 	return vec4( value.rgb * value.a * maxRange, 1.0 );
// }

// vec4 LinearToRGBM2( in vec4 value, in float maxRange ) {
// 	float maxRGB = max( value.r, max( value.g, value.b ) );
// 	float M = clamp( maxRGB / maxRange, 0.0, 1.0 );
// 	M = ceil( M * 255.0 ) / 255.0;
// 	return vec4( value.rgb / ( M * maxRange ), M );
// }

// most functions https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderChunk/encodings_pars_fragment.glsl.js

/// http://graphicrants.blogspot.com/2009/04/rgbm-color-encoding.html
vec4 RGBMEncode(vec3 color){
  vec4 rgbm;
  color *= 1.0 / 6.0;
  rgbm.w = clamp( max( max( color.r, color.g ), max( color.b, 1e-6 ) ),0.0,1.0 );
  rgbm.w = ceil( rgbm.w * 255.0 ) / 255.0;
  rgbm.xyz = color / rgbm.w;
  return rgbm;
}

void main() {

  vec4 texelColor = texture2D( tDiffuse, vUv );

  texelColor = RGBEToLinear(texelColor);

  // texelColor = LinearToGamma(texelColor, 2.2);

  texelColor.xyz = sqrt(texelColor.xyz);

  texelColor = RGBMEncode(texelColor.xyz);

  // texelColor = LinearToRGBM(texelColor, 6.0);

  // color test
  // texelColor = RGBMToLinear(texelColor, 6.0);

  gl_FragColor = texelColor;
}
