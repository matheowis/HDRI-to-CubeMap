import { PerspectiveCamera, Scene, WebGLRenderer, Vector3 as V3, LinearToneMapping, ReinhardToneMapping } from 'three';
import { mainCamera, mainScene } from './base';
import { updateMaterial } from '../materials/sphereMat'
import { convProps, canvasProps } from './props';


const convCamera = new PerspectiveCamera(90, 1, 0.1, 5000);

let convRenderers = [new WebGLRenderer(), new WebGLRenderer(), new WebGLRenderer(), new WebGLRenderer(), new WebGLRenderer(), new WebGLRenderer()]

const updateConv = () => {
  convRenderers = convRenderers.map((r, i) => {
    const canvas = document.getElementById(`convCanv${i}`);

    convProps.refs.push(canvas);
    return new WebGLRenderer({ canvas, antialias: true });
  });
  convProps.refs.push(document.getElementById('convCanvContainer'))
  console.log(document.getElementById('convCanvContainer'))
  convRenderers.map(r => {

    // r.setSize(segSize, segSize);//128
    r.toneMapping = LinearToneMapping;
    r.toneMappingExposure = 1;
  })
  resizeConv();
}
const resizeConv = () => {
  if (convProps.refs.length !== 0) {
    const segSize = Math.floor(window.innerWidth * canvasProps.vhw / 3);

    convProps.refs[0].style.top = `${segSize}px`;
    convProps.refs[1].style.top = `${segSize}px`;
    convProps.refs[1].style.left = `${segSize}px`;
    convProps.refs[2].style.top = `${segSize}px`;
    convProps.refs[2].style.left = `${segSize * 2}px`;
    convProps.refs[3].style.top = `${segSize}px`;
    convProps.refs[3].style.left = `${segSize * 3}px`;
    convProps.refs[4].style.left = `${segSize}px`;
    convProps.refs[5].style.top = `${segSize * 2}px`;
    convProps.refs[5].style.left = `${segSize}px`;

    convProps.refs[6].style.width = `${segSize*4}px`;
    convProps.refs[6].style.height = `${segSize*3}px`;

    convRenderers.map(renderer => {
      renderer.setSize(segSize, segSize);
    })
  }

}
const convRender = () => {
  convCamera.rotation.set(0, 0, 0);
  const direction = new V3
  mainCamera.getWorldDirection(direction)
  const angle = direction.multiply(new V3(1, 0, 1)).angleTo(new V3(0, 0, -1));
  if (direction.x < 0) {
    convCamera.rotateY(angle);
  } else {
    convCamera.rotateY(-angle);
  }
  updateMaterial();
  convRenderers[1].render(mainScene, convCamera)
  convCamera.rotateY(-Math.PI / 2);
  updateMaterial();
  convRenderers[2].render(mainScene, convCamera)
  convCamera.rotateY(-Math.PI / 2);
  updateMaterial();
  convRenderers[3].render(mainScene, convCamera)
  convCamera.rotateY(-Math.PI / 2);
  updateMaterial();
  convRenderers[0].render(mainScene, convCamera)
  convCamera.rotateY(-Math.PI / 2);
  convCamera.rotateX(Math.PI / 2);
  updateMaterial();
  convRenderers[4].render(mainScene, convCamera)
  convCamera.rotateX(-Math.PI);
  updateMaterial();
  convRenderers[5].render(mainScene, convCamera)
}

export { convRender, updateConv,resizeConv };