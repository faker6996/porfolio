<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  project: string;
  compact?: boolean;
}>();

const label = computed(() => {
  const labels: Record<string, string> = {
    underverse: "COMPONENT SYSTEM / 60+ MODULES",
    "md-extension": "MARKDOWN / MULTI-FORMAT PIPELINE",
    ziply: "NATIVE ARCHIVE ENGINE / CROSS-PLATFORM",
    facebook: "GLOBAL SIGNAL / REAL-TIME NETWORK",
    "stream-detection": "MULTI-CAM / AI OVERLAY",
  };

  return labels[props.project] ?? "BACH.SYSTEM / ACTIVE";
});
</script>

<template>
  <div class="system-visual" :class="[`system-visual-${project}`, { 'system-visual-compact': compact }]">
    <div class="system-visual-grid"></div>
    <div class="system-visual-scan"></div>
    <div class="system-visual-object">
      <span v-for="index in 6" :key="index" class="system-visual-module" :style="{ '--index': index }"></span>
      <span class="system-visual-core"></span>
      <span class="system-visual-orbit system-visual-orbit-a"></span>
      <span class="system-visual-orbit system-visual-orbit-b"></span>
    </div>
    <div class="system-visual-hud system-label">
      <span>{{ label }}</span>
      <span class="system-visual-status"><i></i> ONLINE</span>
    </div>
    <span class="system-visual-corner system-visual-corner-a"></span>
    <span class="system-visual-corner system-visual-corner-b"></span>
  </div>
</template>

<style scoped lang="scss">
.system-visual {
  --visual-accent: #d85d49;
  --visual-accent-soft: rgba(216, 93, 73, 0.18);
  position: relative;
  width: 100%;
  min-height: 320px;
  overflow: hidden;
  border: 1px solid rgba(240, 234, 223, 0.14);
  background:
    radial-gradient(circle at 50% 44%, var(--visual-accent-soft), transparent 31%),
    linear-gradient(140deg, #1c211d 0%, #0b0e0c 70%);
  isolation: isolate;
  perspective: 900px;

  @include mixins.mq("md") {
    min-height: 480px;
  }

  &-compact {
    min-height: 100%;
    border: 0;
  }

  &-grid {
    position: absolute;
    inset: -20%;
    opacity: 0.34;
    background-image:
      linear-gradient(rgba(240, 234, 223, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(240, 234, 223, 0.08) 1px, transparent 1px);
    background-size: 42px 42px;
    transform: rotateX(64deg) translateY(20%);
    transform-origin: center bottom;
  }

  &-scan {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(216, 93, 73, 0.16) 49%, transparent 51%);
    background-size: 100% 38%;
    animation: visual-scan 5s linear infinite;
    opacity: 0.55;
  }

  &-object {
    position: absolute;
    width: min(44vw, 330px);
    aspect-ratio: 1;
    left: 50%;
    top: 48%;
    transform: translate(-50%, -50%) rotateX(57deg) rotateZ(-31deg);
    transform-style: preserve-3d;
    transition: transform 700ms var(--ease-smooth);
  }

  &-module {
    position: absolute;
    width: 38%;
    height: 38%;
    left: 8%;
    top: 10%;
    border: 1px solid rgba(240, 234, 223, 0.3);
    background: linear-gradient(145deg, rgba(240, 234, 223, 0.12), rgba(240, 234, 223, 0.02));
    box-shadow:
      inset 0 0 20px rgba(240, 234, 223, 0.04),
      12px 16px 0 rgba(0, 0, 0, 0.14);
    transform: translateZ(-18px);

    &:nth-child(2) {
      left: 35%;
      top: 10%;
      transform: translateZ(-9px);
    }

    &:nth-child(3) {
      left: 62%;
      top: 10%;
      transform: translateZ(0);
    }

    &:nth-child(4) {
      left: 8%;
      top: 57%;
      transform: translateZ(9px);
    }

    &:nth-child(5) {
      left: 35%;
      top: 57%;
      transform: translateZ(18px);
    }

    &:nth-child(6) {
      left: 62%;
      top: 57%;
      transform: translateZ(27px);
    }
  }

  &-core {
    position: absolute;
    inset: 32%;
    background: var(--visual-accent);
    box-shadow:
      0 0 34px var(--visual-accent),
      0 0 90px var(--visual-accent-soft);
    transform: translateZ(68px);
    animation: core-pulse 2.8s ease-in-out infinite;
  }

  &-orbit {
    position: absolute;
    inset: 17%;
    border: 1px solid var(--visual-accent);
    border-radius: 50%;
    transform: translateZ(38px);

    &-a {
      animation: orbit-a 9s linear infinite;
    }

    &-b {
      inset: 5%;
      border-color: rgba(240, 234, 223, 0.25);
      animation: orbit-b 13s linear infinite reverse;
    }
  }

  &-hud {
    position: absolute;
    left: 18px;
    right: 18px;
    bottom: 16px;
    display: flex;
    justify-content: space-between;
    gap: var(--space-md);
    color: var(--color-text-300);
  }

  &-status {
    color: var(--color-text-400);
    white-space: nowrap;

    i {
      display: inline-block;
      width: 6px;
      height: 6px;
      margin-right: 6px;
      border-radius: 50%;
      background: var(--visual-accent);
      box-shadow: 0 0 12px var(--visual-accent);
    }
  }

  &-corner {
    position: absolute;
    width: 34px;
    height: 34px;
    border-color: rgba(240, 234, 223, 0.35);

    &-a {
      top: 16px;
      left: 16px;
      border-top: 1px solid;
      border-left: 1px solid;
    }

    &-b {
      right: 16px;
      bottom: 16px;
      border-right: 1px solid;
      border-bottom: 1px solid;
    }
  }

  &-underverse {
    .system-visual-module {
      border-radius: 4px;
    }
  }

  &-md-extension {
    .system-visual-object {
      transform: translate(-50%, -50%) rotateX(60deg) rotateZ(-22deg);
    }

    .system-visual-module {
      width: 62%;
      height: 75%;
      left: 19%;
      top: 12%;
      transform: translate3d(-15px, 15px, 10px);

      &:nth-child(2) {
        transform: translate3d(-10px, 10px, 20px);
      }

      &:nth-child(3) {
        transform: translate3d(-5px, 5px, 30px);
      }

      &:nth-child(4) {
        transform: translate3d(0, 0, 40px);
      }

      &:nth-child(5) {
        transform: translate3d(5px, -5px, 50px);
      }

      &:nth-child(6) {
        transform: translate3d(10px, -10px, 60px);
      }
    }
  }

  &-ziply {
    .system-visual-module {
      width: 29%;
      height: 29%;
      transform: translateZ(-18px);

      &:nth-child(2) {
        transform: translateZ(0);
      }

      &:nth-child(3) {
        transform: translateZ(18px);
      }

      &:nth-child(4) {
        transform: translateZ(36px);
      }

      &:nth-child(5) {
        transform: translateZ(54px);
      }

      &:nth-child(6) {
        transform: translateZ(72px);
      }
    }
  }

  &-facebook {
    .system-visual-module {
      width: 20%;
      height: 20%;
      border-radius: 50%;
      box-shadow:
        0 0 0 8px rgba(216, 93, 73, 0.08),
        0 0 30px rgba(216, 93, 73, 0.18);
    }
  }

  &-stream-detection {
    .system-visual-module {
      border: 1px solid rgba(216, 93, 73, 0.6);
      background:
        linear-gradient(90deg, transparent 48%, rgba(216, 93, 73, 0.45) 49%, rgba(216, 93, 73, 0.45) 51%, transparent 52%),
        linear-gradient(transparent 48%, rgba(216, 93, 73, 0.45) 49%, rgba(216, 93, 73, 0.45) 51%, transparent 52%),
        rgba(240, 234, 223, 0.04);
    }
  }

  @include mixins.hover {
    &:hover &-object {
      transform: translate(-50%, -50%) rotateX(52deg) rotateZ(-24deg) scale(1.05);
    }
  }
}

@keyframes visual-scan {
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(210%);
  }
}

@keyframes core-pulse {
  0%,
  100% {
    opacity: 0.72;
    transform: translateZ(68px) scale(0.9);
  }
  50% {
    opacity: 1;
    transform: translateZ(68px) scale(1.05);
  }
}

@keyframes orbit-a {
  to {
    transform: translateZ(38px) rotate(360deg);
  }
}

@keyframes orbit-b {
  to {
    transform: translateZ(24px) rotate(360deg);
  }
}
</style>
