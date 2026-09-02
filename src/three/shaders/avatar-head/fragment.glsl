#include ../includes/avatar-progress/fragment.glsl;
#include ../includes/about-ambient.glsl;

uniform sampler2D uHeadTexture;
uniform vec2 uHeadTextureSize;

varying vec2 vUv;

void main() {
    vec4 tex = texture2D(uHeadTexture, vUv);

    float progress = getProgress();

    // Cleanly separate hair from skin based on luminance
    float lum = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    
    // Smooth hair mask: hair is dark (lum < 0.48), skin is bright (lum > 0.64)
    float isHair = 1.0 - smoothstep(0.48, 0.64, lum);

    // Rich Asian black/dark-brown tone preserving ambient shading & highlights
    vec3 darkHair = vec3(0.065, 0.060, 0.058) + tex.rgb * 0.15;

    vec3 finalColor = mix(tex.rgb, darkHair, isHair);

    gl_FragColor = vec4(applyAmbient(finalColor), progress);
}


