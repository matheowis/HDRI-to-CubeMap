import {SphereGeometry,Mesh,BoxGeometry} from 'three';
import {mainScene} from '../components/base';
import {sphereMat} from '../materials/sphereMat'

const preview = () => {

  const geo = new SphereGeometry(2000,100,100);
  const sphereMesh = new Mesh(geo,sphereMat);
  sphereMesh.position.set(0,0,0);
  mainScene.add(sphereMesh);

  const testCube = new Mesh(new BoxGeometry(50,50,50))
  testCube.position.z = -300;
  mainScene.add(testCube);
}

export default preview;