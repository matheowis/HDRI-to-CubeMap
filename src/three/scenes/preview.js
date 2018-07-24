import {SphereGeometry,Mesh,MeshBasicMaterial,DoubleSide} from 'three';
import {mainScene} from '../components/base';
import {sphereMat} from '../materials/sphereMat'

const preview = () => {

  const geo = new SphereGeometry(2000,100,100);
  const testcube = new Mesh(geo,sphereMat);
  testcube.position.set(0,0,0);
  mainScene.add(testcube);

  
}

export default preview;