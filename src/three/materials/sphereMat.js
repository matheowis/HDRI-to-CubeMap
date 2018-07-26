import { MeshBasicMaterial, DoubleSide,ShaderMaterial } from 'three';
import vertexShader from '../shaders/base.vs';
import fragmentShader from '../shaders/flipped.fs';

console.log('vertexShader',vertexShader)
console.log('fragmentShader',fragmentShader);

const sphereMat2 = new MeshBasicMaterial({ color: 0xffffff, map: null, side: DoubleSide });
const sphereMat = new ShaderMaterial({side:DoubleSide});

sphereMat.vertexShader = vertexShader;
sphereMat.fragmentShader = fragmentShader;
sphereMat.uniforms={
  tDiffuse:{value:null}
}

const updateSphereMap = (map) => {
  sphereMat.uniforms.tDiffuse.value = map;
  sphereMat.needsUpdate = true;

  console.log(sphereMat.uniforms)
  // sphereMat2.map = map;
  // sphereMat2.needsUpdate = true;
}
const updateMaterial = ()=>{
  sphereMat.needsUpdate = true;
  // sphereMat2.needsUpdate = true;

}

export { sphereMat, updateSphereMap,updateMaterial };