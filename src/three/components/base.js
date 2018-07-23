import { Scene, PerspectiveCamera, OrthographicCamera, WebGLRenderer } from 'three';
import { canvasProps } from './props';

const { width, height } = canvasProps;

let mainScene = new Scene();
let uiScene = new Scene();

let mainCamera = new PerspectiveCamera(60, width / height, 0.1, 5000);
let uiCamera = new OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000);

// set for referances
let renderer = new WebGLRenderer();

const update = () => {
  const canvas = document.getElementById('MainCanvas')
  renderer = new WebGLRenderer({canvas, antialias:true});
  console.dir(canvas)
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}
const resize = () => {
  renderer.setSize(window.innerWidth * 0.64, window.innerWidth * 0.36);
  
}

export { mainScene, uiScene, mainCamera, uiCamera, renderer, update,resize };