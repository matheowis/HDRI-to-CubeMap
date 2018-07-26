import {SphereGeometry,Mesh,BoxGeometry} from 'three';
import {mainScene} from '../components/base';
import {sphereMat} from '../materials/sphereMat'

const preview = () => {

  const geo = new SphereGeometry(2000,100,100);
  const sphereMesh = new Mesh(geo,sphereMat);
  sphereMesh.scale.set(-1,-1,-1);
  sphereMesh.rotateZ(Math.PI);
  sphereMesh.rotateY(-Math.PI/2);
  sphereMesh.position.set(0,0,0);
  mainScene.add(sphereMesh);

  // const testCube = new Mesh(new BoxGeometry(50,50,50),sphereMat)
  // testCube.position.z = -300;
  // mainScene.add(testCube);
}

export default preview;