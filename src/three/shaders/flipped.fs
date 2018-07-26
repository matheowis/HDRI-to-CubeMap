uniform sampler2D   tDiffuse;
varying vec2  vUv;

void main()	{
    vec2 myUV = vec2(1.0 -vUv.x,vUv.y);
    vec4 color = texture2D( tDiffuse, myUV );
    gl_FragColor = vec4( color.xyz, 1.0 );
}