import {OrbitControls} from '../examples/OrbitControls';
import {mainCamera} from '../components/base';

const cameraControl = new OrbitControls(mainCamera);
mainCamera.position.set(0,0,1);
cameraControl.update();

export default cameraControl;