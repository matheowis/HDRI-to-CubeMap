import { DataTexture } from 'three';
import { RGBELoader } from '../examples/RGBELoader';

export const iniHdrTexture = new DataTexture();

const loader = new RGBELoader()

loader.load(
  'images/venetian_crossroads_1k.hdr',
  tex => {
    tex.encoding = RGBEEncoding;
    tex.minFilter = NearestFilter;
    tex.magFilter = NearestFilter;
    tex.flipY = true;

    iniHdrTexture.copy(tex);
    iniHdrTexture.needsUpdate = true;
  }
)