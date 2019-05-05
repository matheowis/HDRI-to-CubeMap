import { MeshBasicMaterial, DoubleSide } from 'three';

class SphereMatRgbm16 extends MeshBasicMaterial {
  constructor(props) {
    super(props)
  }

  onBeforeCompile(shader, renderer) {
    console.log("BeforeCompile", shader);
    //RGBM
    const injection = [
      'vec4 rgbm;',
      'vec3 colorT = gl_FragColor.xyz;',
      'colorT *= 1.0/6.0;',
      'rgbm.w = saturate( max( max( colorT.x, colorT.y ), max( colorT.z, 1e-6 ) ) );',
      // 'rgbm.w = ceil( rgbm.w * 255.0 ) / 255.0;',
      'rgbm.xyz = colorT / rgbm.w;',
      'gl_FragColor = rgbm;',
    ].join('\n');

    // const injection2 = [
    //   'mat3 M = mat3(',
    //   '0.2209, 0.3390, 0.4184,',
    //   '0.1138, 0.6780, 0.7319,',
    //   '0.0102, 0.1130, 0.2969);',

    //   'vec4 vResult;',
    //   // 'vec3 Xp_Y_XYZp = mul(gl_FragColor.xyz, M);',
    //   'vec3 Xp_Y_XYZp = gl_FragColor.xyz * M;',
    //   'Xp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));',
    //   'vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;',
    //   'float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;',
    //   'vResult.w = fract(Le);',
    //   'vResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;',

    //   'gl_FragColor = vResult;',
    // ].join('\n');
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

