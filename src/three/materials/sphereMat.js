import { MeshBasicMaterial, DoubleSide,RGBEEncoding,NearestFilter, ShaderMaterial, ShaderChunk, UniformsUtils, UniformsLib,TextureLoader } from 'three';
import {RGBELoader} from '../examples/RGBELoader'


const sphereMat = new MeshBasicMaterial({ color: 0xffffff, map: null, side: DoubleSide });

const loader = new RGBELoader()

loader.load(
  'images/venetian_crossroads_1k.hdr',
  tex =>{

    tex.encoding = RGBEEncoding;
    tex.minFilter = NearestFilter;
    tex.magFilter = NearestFilter;
    tex.flipY = true;

    sphereMat.map = tex;
    sphereMat.needsUpdate = true;


  }
)

const updateSphereMap = (map) => {

  sphereMat.map = map;
  sphereMat.needsUpdate = true;
}
const updateMaterial = () => {
  sphereMat.needsUpdate = true;

}

export { sphereMat, updateSphereMap, updateMaterial };