import {WebGLRenderer,PerspectiveCamera, ReinhardToneMapping,LinearToneMapping} from 'three'

// canvas is in .domElement
let procRenderer =new WebGLRenderer()
const procCamera = new PerspectiveCamera(90,1,1,5000);

const hdrToneMappingProc = (hdr = true) => {

  if (hdr) {
    procRenderer.toneMapping = ReinhardToneMapping;
    procRenderer.toneMappingExposure = 4;
  } else {
    procRenderer.toneMapping = LinearToneMapping;
    procRenderer.toneMappingExposure = 1;
  }
}


export {procRenderer,procCamera,hdrToneMappingProc};