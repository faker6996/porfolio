uniform float uAmbientStrength;

#define AMBIENT_COLOR vec3(0.045,0.012,0.008)

vec3 applyAmbient(vec3 color) {
    return color + AMBIENT_COLOR * uAmbientStrength;
}
