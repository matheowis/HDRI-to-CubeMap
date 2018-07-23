import {BoxGeometry,Mesh,MeshBasicMaterial} from 'three';
import {mainScene} from '../components/base';
import {userTexture} from '../textures/userTexture';
const preview = () => {
  const geo = new BoxGeometry(100,100,100);
  const mat = new MeshBasicMaterial({color:0xffffff,map:userTexture})
  const testcube = new Mesh(geo,mat);
  testcube.position.set(0,0,-300);
  mainScene.add(testcube);
}

export default preview;