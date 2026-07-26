#include ../includes/avatar-progress/vertex.glsl;

varying vec3 vViewNormal;
varying vec3 vViewPosition;

void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);

    vViewPosition = viewPosition.xyz;
    vViewNormal = normalize(normalMatrix * normal);
    vModelProgress = getModelProgress(position);

    gl_Position = projectionMatrix * viewPosition;
}
