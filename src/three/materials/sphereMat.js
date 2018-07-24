import { MeshBasicMaterial, DoubleSide } from 'three';


const sphereMat = new MeshBasicMaterial({ color: 0xffffff, map: null, side: DoubleSide });

const updateSphereMap = (map) => {
  sphereMat.map = map;
  sphereMat.needsUpdate = true;
}

export { sphereMat, updateSphereMap };