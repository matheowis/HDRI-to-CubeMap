import {
  WebGLRenderer, PerspectiveCamera, ReinhardToneMapping, LinearToneMapping,
  SphereGeometry, Mesh, Scene, WebGLRenderTarget
} from 'three'
import { sphereMatHdr } from '../materials/sphereMat-hdr';
import { sphereMatRgbm16 } from "../materials/sphereMat-rgbm16";
// canvas is in .domElement
const procRenderer = new WebGLRenderer();
const hdrProcRenderer = new WebGLRenderer({ alpha: true });
const rgbm16ProcRenderer = new WebGLRenderer({ alpha: true });
const hdrRenderTarget = new WebGLRenderTarget();
const procCamera = new PerspectiveCamera(90, 1, 1, 5000);

const hdrScene = new Scene();
const hdrGeo = new SphereGeometry(2000, 100, 100);
const hdrSphereMesh = new Mesh(hdrGeo, sphereMatHdr);
const rgbm16Scene = new Scene();
const rgmb16SphereMesh = new Mesh(hdrGeo, sphereMatRgbm16);
hdrSphereMesh.scale.set(-1, -1, -1);
hdrSphereMesh.rotateZ(Math.PI);
hdrSphereMesh.rotateY(-Math.PI / 2);
hdrSphereMesh.position.set(0, 0, 0);

rgmb16SphereMesh.scale.set(-1, -1, -1);
rgmb16SphereMesh.rotateZ(Math.PI);
rgmb16SphereMesh.rotateY(-Math.PI / 2);
rgmb16SphereMesh.position.set(0, 0, 0);

hdrScene.add(hdrSphereMesh);
rgbm16Scene.add(rgmb16SphereMesh);

const hdrToneMappingProc = (hdr = true) => {
  if (hdr) {
    procRenderer.toneMapping = ReinhardToneMapping;
    procRenderer.toneMappingExposure = 4;
  } else {
    procRenderer.toneMapping = LinearToneMapping;
    procRenderer.toneMappingExposure = 1;
  }
}

hdrToneMappingProc(true);

export {
  procRenderer,
  hdrProcRenderer,
  rgbm16ProcRenderer,
  hdrRenderTarget,
  hdrScene,
  rgbm16Scene,
  procCamera,
  hdrToneMappingProc
};