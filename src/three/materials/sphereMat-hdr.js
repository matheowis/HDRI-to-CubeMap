import { ShaderMaterial, DoubleSide } from 'three';
import { HdrTexture } from '../textures/iniHdrTexture';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';
console.log(fragmentShader);

export const sphereMatHdr = new ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    tDiffuse: { value: HdrTexture }
  },
  transparent: true,
  side: DoubleSide
});

