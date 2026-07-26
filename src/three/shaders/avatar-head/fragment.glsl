#include ../includes/avatar-progress/fragment.glsl;
#include ../includes/about-ambient.glsl;

uniform sampler2D uHeadTexture;
uniform vec2 uHeadTextureSize;

varying vec2 vUv;

void main() {
    vec4 tex = texture2D(uHeadTexture, vUv);

    float progress = getProgress();
    float hairMask = 1.0 - smoothstep(0.42, 0.68, tex.r);
    vec3 darkHair = vec3(0.075, 0.064, 0.055) + tex.rgb * 0.14;
    vec3 identityColor = mix(tex.rgb, darkHair, hairMask);

    gl_FragColor = vec4(applyAmbient(identityColor), progress);
}
