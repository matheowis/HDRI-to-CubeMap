import { MeshBasicMaterial, DoubleSide } from 'three';

class SphereMatRgbm16 extends MeshBasicMaterial {
  constructor(props) {
    super(props)
  }

  onBeforeCompile(shader, renderer) {
    console.log("BeforeCompile", shader);

    const injection = [
      // 'vec4 RGBMEncode( vec3 color ) {',
      // 'vec4 rgbm;',
      // 'color *= 1.0 / 6.0;',
      // 'rgbm.a = saturate( max( max( color.r, color.g ), max( color.b, 1e-6 ) ) );',
      // 'rgbm.a = ceil( rgbm.a * 255.0 ) / 255.0;',
      // 'rgbm.rgb = color / rgbm.a;',
      // 'return rgbm;',
      // '}',
      // 'gl_FragColor = RGBMEncode(gl_FragColor.xyz)'
      'vec4 rgbm;',
      'vec3 colorT = gl_FragColor.xyz;',
      'colorT *= 1.0/6.0;',
      'rgbm.w = saturate( max( max( colorT.x, colorT.y ), max( colorT.z, 1e-6 ) ) );',
      'rgbm.w = ceil( rgbm.w * 255.0 ) / 255.0;',
      'rgbm.xyz = colorT / rgbm.w;',
      'gl_FragColor = rgbm;',
    ].join('\n');

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <fog_fragment>',
      '#include <fog_fragment>\n' + injection
    );
  }
}

const sphereMatRgbm16 = new SphereMatRgbm16({ color: 0xffffff, map: null, side: DoubleSide, transparent: true });

const updateSphereMapRgbm16 = (map) => {
  sphereMatRgbm16.map = map;
  sphereMatRgbm16.needsUpdate = true;
}
const updateMaterialRgbm16 = () => {
  sphereMatRgbm16.needsUpdate = true;
}

export { sphereMatRgbm16, updateSphereMapRgbm16, updateMaterialRgbm16 }

