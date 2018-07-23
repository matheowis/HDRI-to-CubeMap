import {SphereGeometry,Mesh,MeshBasicMaterial,DoubleSide} from 'three';
import {mainScene} from '../components/base';
import {userTexture} from '../textures/userTexture';
const preview = () => {
  const geo = new SphereGeometry(200,100,100);
  const mat = new MeshBasicMaterial({color:0xffffff,map:userTexture,side:DoubleSide})
  const testcube = new Mesh(geo,mat);
  testcube.position.set(0,0,0);
  mainScene.add(testcube);

  
}

export default preview;