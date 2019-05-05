import { Vector3 as V3 } from 'three'
import { rgbm16ProcRenderer, hdrRenderTarget, procCamera, rgbm16Scene } from '../components/process'
import { mainCamera } from '../components/base';
import { updateMaterialRgbm16 } from '../materials/sphereMat-rgbm16';
import { hdrConverterEmmisive } from '../../converters/hdrConverterEmissive';

const renderCatch = {
  blobs: [],
  names: [],
  packed: [],
  zipping: false,
  progNow: 0,
  progTotal: 0,
  canvas: document.createElement('canvas'),
}


const calcAngle = () => {
  const direction = new V3
  mainCamera.getWorldDirection(direction);
  const angle = direction.multiply(new V3(1, 0, 1)).angleTo(new V3(0, 0, -1));
  if (direction.x < 0) {
    return angle;
  } else {
    return -angle;
  }
}
const packBlobsSep = (callback = href => { }, progress = prog => { }) => {
  const { names, blobs, } = renderCatch;
  renderCatch.packed = [false, false, false, false, false, false];
  console.log(blobs);

  zip.createWriter(new zip.BlobWriter(), writer => {
    const nester = (startIndex = 0, endIndex = 5, callback = () => { }) => {
      console.log('startIndex0:', startIndex);
      writer.add(names[startIndex], new zip.BlobReader(blobs[startIndex]), () => {
        renderCatch.packed[startIndex] = true;
        console.log('startIndex:', startIndex);

        renderCatch.progNow++;
        const { progNow, progTotal } = renderCatch
        progress({ progNow, progTotal });

        if (startIndex >= endIndex) {
          callback();
        } else {
          nester(startIndex + 1, endIndex, callback);
        }
      });
    }
    nester(0, 5, () => {
      console.log(renderCatch.packed);
      writer.close(blob => {
        callback(URL.createObjectURL(blob));
      });
    });
  });
}



const storeBlobsSep = (name, callback = href => { }, progress = prog => { }) => {
  rgbm16ProcRenderer.domElement.toBlob(blob => {
    renderCatch.blobs.push(blob);
    renderCatch.names.push(`${name}.png`)
    renderCatch.progNow++;
    const { progNow, progTotal } = renderCatch;
    progress({ progNow, progTotal })
    console.log('blob', blob)
    if (renderCatch.blobs.length === 6) {
      packBlobsSep(callback, progress);
    }
  });
}
const rgmb16ProcRenderSep = (size = 64, callback = (href) => { }, progress = prog => { }) => {
  console.log("Seperate RGBM16");
  renderCatch.blobs = [];
  renderCatch.names = [];
  renderCatch.progNow = 0;
  renderCatch.progTotal = 12;
  rgbm16ProcRenderer.setSize(size, size);
  hdrRenderTarget.setSize(size, size);
  procCamera.rotation.set(0, 0, 0);

  // document.body.appendChild(rgbm16ProcRenderer.domElement);

  const angle = calcAngle();
  procCamera.rotateY(angle);

  //+x
  updateMaterialRgbm16();
  procCamera.rotateY(-Math.PI / 2);
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  // rgbm16ProcRenderer.render(rgbm16Scene, procCamera, hdrRenderTarget);
  storeBlobsSep('px', callback, progress);
  //-x
  updateMaterialRgbm16();
  procCamera.rotateY(Math.PI);
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  // rgbm16ProcRenderer.render(rgbm16Scene, procCamera, hdrRenderTarget);
  storeBlobsSep('nx', callback, progress);
  //+y
  updateMaterialRgbm16();
  procCamera.rotateY(-Math.PI / 2);
  procCamera.rotateX(Math.PI / 2);
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  // rgbm16ProcRenderer.render(rgbm16Scene, procCamera, hdrRenderTarget);
  storeBlobsSep('py', callback, progress);
  //-y
  updateMaterialRgbm16();
  procCamera.rotateX(-Math.PI);
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  // rgbm16ProcRenderer.render(rgbm16Scene, procCamera, hdrRenderTarget);
  storeBlobsSep('ny', callback, progress);
  //+z
  updateMaterialRgbm16();
  procCamera.rotateX(Math.PI / 2);
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  // rgbm16ProcRenderer.render(rgbm16Scene, procCamera, hdrRenderTarget);
  storeBlobsSep('pz', callback, progress);
  //-z
  updateMaterialRgbm16();
  procCamera.rotateY(Math.PI);
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  // rgbm16ProcRenderer.render(rgbm16Scene, procCamera, hdrRenderTarget);
  storeBlobsSep('nz', callback, progress);

  // packBlobs(callback);
}
const rgbm16ProcRenderUnity = (size = 64, callback = href => { }, progress = prog => { }) => {
  renderCatch.progNow = 0;
  renderCatch.progTotal = 4;
  const { canvas } = renderCatch;
  canvas.width = size * 4;
  canvas.height = size * 3;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  rgbm16ProcRenderer.setSize(size, size);
  procCamera.rotation.set(0, 0, 0);

  const angle = calcAngle();
  procCamera.rotateY(angle);

  updateMaterialRgbm16();
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  ctx.drawImage(rgbm16ProcRenderer.domElement, size, size);

  updateMaterialRgbm16();
  procCamera.rotateY(-Math.PI / 2);
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  ctx.drawImage(rgbm16ProcRenderer.domElement, size * 2, size);

  updateMaterialRgbm16();
  procCamera.rotateY(-Math.PI / 2);
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  ctx.drawImage(rgbm16ProcRenderer.domElement, size * 3, size);

  updateMaterialRgbm16();
  procCamera.rotateY(-Math.PI / 2);
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  ctx.drawImage(rgbm16ProcRenderer.domElement, 0, size);

  updateMaterialRgbm16();
  procCamera.rotateY(-Math.PI / 2);
  procCamera.rotateX(Math.PI / 2);
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  ctx.drawImage(rgbm16ProcRenderer.domElement, size, 0);

  updateMaterialRgbm16();
  procCamera.rotateX(-Math.PI);
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  ctx.drawImage(rgbm16ProcRenderer.domElement, size, size * 2);

  renderCatch.progNow++
  progress({ progNow: renderCatch.progNow, progTotal: renderCatch.progTotal });

  // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  console.log('zip start');
  canvas.toBlob(blob => {
    console.log('blob created')
    renderCatch.progNow++
    progress({ progNow: renderCatch.progNow, progTotal: renderCatch.progTotal });
  
    zip.createWriter(new zip.BlobWriter(), writer => {
      writer.add('StandardCubeMap.png', new zip.BlobReader(blob), () => {
        renderCatch.progNow++
        progress({ progNow: renderCatch.progNow, progTotal: renderCatch.progTotal });
      
        writer.close(blob => {
          console.log('zip end')
          renderCatch.progNow++
          progress({ progNow: renderCatch.progNow, progTotal: renderCatch.progTotal });
        
          callback(URL.createObjectURL(blob));
        });
      });
    });
  });
  // hdrConverterEmmisive(canvas.width, canvas.height, imageData.data, false).then(blob => {
  //   console.log('blob created')
  //   renderCatch.progNow++
  //   progress({ progNow: renderCatch.progNow, progTotal: renderCatch.progTotal });

  //   zip.createWriter(new zip.BlobWriter(), writer => {
  //     writer.add('StandardCubeMap.hdr', new zip.BlobReader(blob), () => {
  //       renderCatch.progNow++
  //       progress({ progNow: renderCatch.progNow, progTotal: renderCatch.progTotal });

  //       writer.close(blob => {
  //         console.log('zip end')
  //         renderCatch.progNow++
  //         progress({ progNow: renderCatch.progNow, progTotal: renderCatch.progTotal });

  //         callback(URL.createObjectURL(blob));
  //       });
  //     });
  //   });
  // })
}
const rgbm16ProcRenderUE4 = (size = 64, callback = href => { }, progress = prog => { }) => {
  renderCatch.progNow = 0;
  renderCatch.progTotal = 4;
  const { canvas } = renderCatch;
  canvas.width = size * 6;
  canvas.height = size * 1;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  rgbm16ProcRenderer.setSize(size, size);
  procCamera.rotation.set(0, 0, 0);

  const angle = calcAngle();
  procCamera.rotateY(angle);
  //+z
  updateMaterialRgbm16();
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  ctx.drawImage(rgbm16ProcRenderer.domElement, 3 * size, 0);
  //+x
  procCamera.rotateY(-Math.PI / 2);
  procCamera.rotateZ(-Math.PI / 2);
  updateMaterialRgbm16();
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  ctx.drawImage(rgbm16ProcRenderer.domElement, 0, 0);
  //-z
  procCamera.rotateZ(Math.PI / 2);
  procCamera.rotateY(-Math.PI / 2);
  procCamera.rotateZ(Math.PI);
  updateMaterialRgbm16();
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  ctx.drawImage(rgbm16ProcRenderer.domElement, 2 * size, 0);
  //-x
  procCamera.rotateZ(-Math.PI);
  procCamera.rotateY(-Math.PI / 2);
  procCamera.rotateZ(Math.PI / 2);
  updateMaterialRgbm16();
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  ctx.drawImage(rgbm16ProcRenderer.domElement, 1 * size, 0);
  //+y
  procCamera.rotateZ(-Math.PI / 2);
  procCamera.rotateY(-Math.PI / 2);
  procCamera.rotateX(Math.PI / 2);
  updateMaterialRgbm16();
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  ctx.drawImage(rgbm16ProcRenderer.domElement, 4 * size, 0);
  //-y
  procCamera.rotateX(-Math.PI);
  procCamera.rotateZ(Math.PI);
  updateMaterialRgbm16();
  rgbm16ProcRenderer.render(rgbm16Scene, procCamera);
  ctx.drawImage(rgbm16ProcRenderer.domElement, 5 * size, 0);

  renderCatch.progNow++
  progress({ progNow: renderCatch.progNow, progTotal: renderCatch.progTotal });

  console.log('zip start')
  canvas.toBlob(blob => {
    console.log('blob created')
    renderCatch.progNow++
    progress({ progNow: renderCatch.progNow, progTotal: renderCatch.progTotal });
  
    zip.createWriter(new zip.BlobWriter(), writer => {
      writer.add('StandardCubeMap.png', new zip.BlobReader(blob), () => {
        renderCatch.progNow++
        progress({ progNow: renderCatch.progNow, progTotal: renderCatch.progTotal });
      
        writer.close(blob => {
          console.log('zip end')
          renderCatch.progNow++
          progress({ progNow: renderCatch.progNow, progTotal: renderCatch.progTotal });
        
          callback(URL.createObjectURL(blob));
        });
      });
    });
  });
  // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // console.log('zip start')
  // hdrConverterEmmisive(canvas.width, canvas.height, imageData.data, false).then(blob => {
  //   console.log('blob created')
  //   renderCatch.progNow++
  //   progress({ progNow: renderCatch.progNow, progTotal: renderCatch.progTotal });

  //   zip.createWriter(new zip.BlobWriter(), writer => {
  //     writer.add('StandardCubeMap.hdr', new zip.BlobReader(blob), () => {
  //       renderCatch.progNow++
  //       progress({ progNow: renderCatch.progNow, progTotal: renderCatch.progTotal });

  //       writer.close(blob => {
  //         console.log('zip end')
  //         renderCatch.progNow++
  //         progress({ progNow: renderCatch.progNow, progTotal: renderCatch.progTotal });

  //         callback(URL.createObjectURL(blob));
  //       });
  //     });
  //   });
  // })
}


export { rgmb16ProcRenderSep, rgbm16ProcRenderUnity, rgbm16ProcRenderUE4 }

