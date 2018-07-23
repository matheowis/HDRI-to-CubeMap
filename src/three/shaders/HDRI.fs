    'uniform sampler2D   tDiffuse;',
    'uniform float       exposure;',
    'uniform float       brightMax;',
    'varying vec2  vUv;',

'vec3 decode_pnghdr( const in vec4 color ) {',
	'vec4 rgbcolor = vec4( 0.0, 0.0, 0.0, 0.0 );',
    
    'if ( color.w > 0.0 ) {',
        'float f = pow(2.0, 255.0*(color.w-0.5));',

        'rgbcolor.xyz = color.xyz * f;',

    '}',

    'return rgbcolor.xyz;',

'}',
'void main()	{',
    'vec2 myUV = vec2(vUv.x,1.0 -vUv.y);',

    'vec4 color = texture2D( tDiffuse, myUV );',
    'color.xyz  = decode_pnghdr( color );',

    // Code For Exposure
    'float YD = exposure * (exposure/brightMax + 1.0) / (exposure + 1.0);',

    'color *= YD;',
    'color.xyz = sqrt(color.xyz);',

    'gl_FragColor = vec4( color.xyz, 1.0 );',

'}',