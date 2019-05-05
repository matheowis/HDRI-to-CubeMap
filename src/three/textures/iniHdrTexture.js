import { DataTexture, RGBEEncoding, NearestFilter } from 'three';
import { RGBELoader } from '../examples/RGBELoader';
import { updateSphereMap } from '../materials/sphereMat'
import {updateSphereMapRgbm16} from '../materials/sphereMat-rgbm16';
export const HdrTexture = new DataTexture();

const loader = new RGBELoader()

loader.load(
  'images/venetian_crossroads_1k.hdr',
  tex => {
    tex.encoding = RGBEEncoding;
    tex.minFilter = NearestFilter;
    tex.magFilter = NearestFilter;
    tex.flipY = true;

    HdrTexture.copy(tex);
    HdrTexture.needsUpdate = true;

    updateSphereMap(tex);
    updateSphereMapRgbm16(tex);
  }
)