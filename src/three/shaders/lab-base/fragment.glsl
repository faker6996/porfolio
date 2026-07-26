varying vec2 vUv;
varying vec3 vPosition;

uniform sampler2D uDiffuseMap;
uniform float uProgress;

#define COLOR_TOP vec3(0.42,0.09,0.055)
#define COLOR_CYAN vec3(0.85,0.23,0.17)

#define SHADOW_START -0.4
#define SHADOW_END 0.
#define SHADOW_COLOR vec3(0.06, 0.012, 0.008)
#define SHADOW_OPACITY 0.5

#define RADIUS 2.11

#define INNER_RADIUS 0.435
#define OUTER_RADIUS 0.455
#define RING_WIDTH 0.005
#define RIGHT_BLOOM_WIDTH 0.045

void main() {

    vec4 diffuse = texture2D(uDiffuseMap, vUv);

    // Calculate distance from origin using model position, normalized by radius
    float dist = length(vPosition.xz) / RADIUS;

    // Create smooth ring mask (hollow circle)
    float ring = smoothstep(INNER_RADIUS, INNER_RADIUS + RING_WIDTH, dist) * 
                smoothstep(OUTER_RADIUS + RING_WIDTH, OUTER_RADIUS, dist);
    float ringBloom = smoothstep(INNER_RADIUS, INNER_RADIUS + RIGHT_BLOOM_WIDTH, dist) *
                smoothstep(OUTER_RADIUS + RIGHT_BLOOM_WIDTH, OUTER_RADIUS, dist);
    ring += ringBloom * 0.5;

    float centerCircle = smoothstep(0.4, 0.1, dist);
    ring += centerCircle * 0.5;
    ring = min(1., ring);

    float shadow = smoothstep(SHADOW_END, SHADOW_START, vPosition.y);

    // Preserve the baked light information while shifting the original blue
    // platform texture into the lacquer-red identity palette.
    float diffuseLight = dot(diffuse.rgb, vec3(0.299, 0.587, 0.114));
    vec3 tintedDiffuse = mix(COLOR_TOP * 0.42, COLOR_TOP * 1.7, diffuseLight);
    vec3 color = mix(tintedDiffuse, COLOR_CYAN, ring * (0.1 + 0.9 * uProgress));
    color = mix(color, SHADOW_COLOR, shadow * SHADOW_OPACITY);

    gl_FragColor = vec4(color, 1.0);
}
