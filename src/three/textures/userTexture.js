import { Texture, ImageLoader } from 'three';
import {imageProps} from '../components/props'
const userTexture = new Texture();

const updateImage = () => {
  const loader = new ImageLoader();
  const reader = new FileReader();
  reader.readAsDataURL(imageProps.file);
  reader.onload = (theFile)=>{
    const dataURI = theFile.target.result;
    loader.load(
      dataURI,
      (image) => {
        userTexture.image = image;
        userTexture.needsUpdate = true;
      },
      undefined,
      (err) => {
        console.error('error - loading image', err);
      }
    )
  };

}

export { userTexture, updateImage }