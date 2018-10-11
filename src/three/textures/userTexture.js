import { Texture, ImageLoader, RGBEEncoding, NearestFilter } from 'three';
import { RGBELoader } from '../examples/RGBELoader';
import { imageProps } from '../components/props'
import { updateSphereMap } from '../materials/sphereMat';
import { HdrTexture } from './iniHdrTexture';
import { hdrToneMappingProc } from '../components/process'
const userTexture = new Texture();

const updateImage = (callback = () => { }) => {
  const reader = new FileReader();
  reader.readAsDataURL(imageProps.file);
  if (imageProps.format === 'hdr') {
    const loader = new RGBELoader();
    reader.onload = (theFile) => {
      const dataURL = theFile.target.result;
      loader.load(
        dataURL,
        tex => {
          tex.encoding = RGBEEncoding;
          tex.minFilter = NearestFilter;
          tex.magFilter = NearestFilter;
          tex.flipY = true;

          HdrTexture.copy(tex);
          HdrTexture.needsUpdate = true;
          hdrToneMappingProc(true);
          updateSphereMap(tex);
          callback();
        },
        undefined,
        err => {
          console.error('failed to load HDR texture', err);
        }
      )
    }
  } else {
    const loader = new ImageLoader();
    reader.onload = (theFile) => {
      const dataURL = theFile.target.result;
      loader.load(
        dataURL,
        (image) => {
          userTexture.image = image;
          userTexture.flipY = true;
          userTexture.needsUpdate = true;
          hdrToneMappingProc(false);
          updateSphereMap(userTexture);
          callback();
        },
        undefined,
        (err) => {
          console.error('error - loading image', err);
        }
      );
    };
  }


}

export { updateImage }