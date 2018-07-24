import { OrbitControls } from '../examples/OrbitControls';
import { mainCamera } from '../components/base';

const cameraControl = new OrbitControls(mainCamera);
mainCamera.position.set(0, 0, 1);
cameraControl.enablePan = false;
cameraControl.enableDamping = true;
cameraControl.dampingFactor = 0.1;
cameraControl.rotateSpeed = 0.035;
cameraControl.enabled=false;
cameraControl.update();

export default cameraControl;