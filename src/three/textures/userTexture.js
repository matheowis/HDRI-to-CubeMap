import { Texture, ImageLoader,RGBEEncoding,NearestFilter } from 'three';
import {RGBELoader} from '../examples/RGBELoader';
import {imageProps} from '../components/props'
import {updateSphereMap} from '../materials/sphereMat';

const userTexture = new Texture();

const updateImage = (callback = () => {}) => {
  const reader = new FileReader();
  reader.readAsDataURL(imageProps.file);
  if( imageProps.format === 'hdr'){
    const loader = new RGBELoader();
    reader.onload = (theFile)=>{
      const dataURL = theFile.target.result;
      loader.load(
        dataURL,
        tex => {
          console.log('tex:',tex);
          console.log('userTex:',userTexture);
          tex.encoding = RGBEEncoding;
          tex.minFilter = NearestFilter;
          tex.magFilter = NearestFilter;
          tex.flipY = true;

          updateSphereMap(tex);
          callback();
        },
        undefined,
        err => {
          console.error('failed to load HDR texture',err);
        }
      )
    }
  }else{
    const loader = new ImageLoader();
    reader.onload = (theFile)=>{
      const dataURL = theFile.target.result;
      loader.load(
        dataURL,
        (image) => {
          userTexture.image = image;
          userTexture.flipY = true;
          userTexture.needsUpdate = true;
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