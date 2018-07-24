import { Scene, PerspectiveCamera, OrthographicCamera, WebGLRenderer, ReinhardToneMapping, LinearToneMapping } from 'three';
import { canvasProps, renderProps } from './props';
const { width, height } = canvasProps;

let mainScene = new Scene();
let uiScene = new Scene();

let mainCamera = new PerspectiveCamera(60, width / height, 0.1, 5000);//60
let uiCamera = new OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000);

// set for referances
let renderer = new WebGLRenderer();
const update = () => {
  
  const canvas = document.getElementById('MainCanvas')

  renderer = new WebGLRenderer({ canvas, antialias: true });
  renderer.toneMapping = ReinhardToneMapping;
  renderer.toneMappingExposure = renderProps.exposure;
  resize();
  renderer.setPixelRatio(2);

}
const resize = () => {
  renderer.setSize(window.innerWidth * canvasProps.vww, window.innerWidth * canvasProps.vhw);
}
const setExposure = (val = renderProps.exposure) => {
  renderer.toneMappingExposure = val;
}
const hdrToneMapping = (hdr = true) => {
  if (hdr) {
    renderer.toneMapping = ReinhardToneMapping;
    renderer.toneMappingExposure = 4;
    renderProps.exposure = 4
  } else {
    renderer.toneMapping = LinearToneMapping;
    renderer.toneMappingExposure = 1;
    renderProps.exposure = 1;
  }
}
export { mainScene, uiScene, mainCamera, uiCamera, renderer, update, resize, setExposure, hdrToneMapping };