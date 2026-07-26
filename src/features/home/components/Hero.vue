<script setup>
import ArrowRightLong from "../../../components/icons/ArrowRightLong.vue";
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-frame" aria-hidden="true">
      <span class="hero-frame-corner hero-frame-corner-a"></span>
      <span class="hero-frame-corner hero-frame-corner-b"></span>
      <span class="hero-frame-axis hero-frame-axis-x"></span>
      <span class="hero-frame-axis hero-frame-axis-y"></span>
      <div class="hero-reticle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="hero-content grid">
      <div class="hero-content-inner" id="hero-content-inner">
        <div class="hero-kicker system-label">
          <span>BACH.SYSTEM / 2026</span>
          <span class="hero-kicker-status"><i></i> AVAILABLE</span>
        </div>
        <div class="hero-content-copys">
          <h1 class="hero-title" id="hero-title">
            <span class="hero-title-line">Tran Van</span>
            <span class="hero-title-line hero-title-line-outline">Bach</span>
          </h1>
        </div>
        <div class="hero-summary">
          <p>Full-stack engineer building real-time systems, native tools, and interactive 3D experiences.</p>
          <a href="#projects" class="hero-link" data-cursor="arrow" data-sound="click">
            <span>Explore selected systems</span>
            <ArrowRightLong class="hero-link-icon" />
          </a>
        </div>
      </div>
      <div class="hero-meta system-label">
        <span>VIETNAM / UTC+7</span>
        <span>10.8231° N / 106.6297° E</span>
      </div>
      <div class="hero-index system-label">
        <span>01</span>
        <span>IDENTITY / ENGINEERING / MOTION</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  min-height: calc(var(--dvh) * 100);
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  isolation: isolate;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(90deg, rgba(17, 21, 18, 0.96) 0%, rgba(17, 21, 18, 0.5) 45%, transparent 72%),
      linear-gradient(180deg, transparent 64%, var(--color-background-400) 100%);
    pointer-events: none;
  }

  &-frame {
    position: absolute;
    inset: calc(var(--height-header) - 18px) var(--space-outer) var(--space-outer);
    border: 1px solid rgba(240, 234, 223, 0.13);
    pointer-events: none;

    &-corner {
      position: absolute;
      width: 48px;
      height: 48px;
      border-color: var(--color-accent-400);

      &-a {
        top: -1px;
        left: -1px;
        border-top: 2px solid;
        border-left: 2px solid;
      }

      &-b {
        right: -1px;
        bottom: -1px;
        border-right: 2px solid;
        border-bottom: 2px solid;
      }
    }

    &-axis {
      position: absolute;
      background: rgba(240, 234, 223, 0.1);

      &-x {
        left: 0;
        right: 0;
        top: 62%;
        height: 1px;
      }

      &-y {
        top: 0;
        bottom: 0;
        left: 68%;
        width: 1px;
      }
    }
  }

  &-reticle {
    position: absolute;
    left: 68%;
    top: 62%;
    width: clamp(80px, 10vw, 150px);
    aspect-ratio: 1;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(216, 93, 73, 0.42);
    border-radius: 50%;
    animation: reticle-turn 16s linear infinite;

    &::before,
    &::after {
      content: "";
      position: absolute;
      background: var(--color-accent-400);
    }

    &::before {
      width: 18px;
      height: 1px;
      left: -9px;
      top: 50%;
    }

    &::after {
      width: 1px;
      height: 18px;
      left: 50%;
      top: -9px;
    }

    span {
      position: absolute;
      inset: calc(12% * var(--ring, 1));
      border: 1px dashed rgba(240, 234, 223, 0.18);
      border-radius: 50%;

      &:nth-child(2) {
        --ring: 2;
      }

      &:nth-child(3) {
        --ring: 3;
      }
    }
  }

  &-content {
    min-height: calc(var(--dvh) * 100);
    padding: calc(var(--height-header) + var(--space-xl)) var(--space-outer) var(--space-xl);
    align-content: center;

    &-inner {
      transform-origin: center center;
      grid-column: 1 / 13;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-lg);
      position: relative;
      z-index: 2;

      @include mixins.mq("md") {
        grid-column: 1 / 9;
      }

      @include mixins.mq("lg") {
        grid-column: 1 / 8;
      }
    }

    &-copys {
      width: 100%;
    }
  }

  &-kicker {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-sm);
    color: var(--color-text-300);

    &-status {
      color: var(--color-text-400);

      i {
        display: inline-block;
        width: 6px;
        height: 6px;
        margin-right: 6px;
        border-radius: 50%;
        background: var(--color-accent-400);
        box-shadow: 0 0 12px var(--color-accent-400);
      }
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: -0.075em;
    line-height: 0.78;
    font-size: clamp(4.25rem, 13vw, 11rem);
    text-transform: uppercase;

    &-line {
      display: block;
      white-space: nowrap;

      &-outline {
        color: transparent;
        -webkit-text-stroke: 1px rgba(240, 234, 223, 0.82);
        transform: translateX(clamp(18px, 5vw, 72px));
      }
    }
  }

  &-summary {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    max-width: 36rem;

    p {
      max-width: 48ch;
      color: var(--color-text-300);
      font-size: clamp(1rem, 1.5vw, 1.25rem);
      text-wrap: pretty;
    }
  }

  &-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    width: fit-content;
    padding-bottom: 7px;
    border-bottom: 1px solid var(--color-accent-400);
    font-weight: 700;
    transition:
      color 220ms ease,
      gap 320ms var(--ease-smooth);

    &-icon {
      width: 24px;
    }

    @include mixins.hover {
      &:hover {
        color: var(--color-accent-400);
        gap: var(--space-md);
      }
    }
  }

  &-meta,
  &-index {
    position: absolute;
    color: var(--color-text-300);
    display: flex;
    gap: var(--space-md);
  }

  &-meta {
    right: calc(var(--space-outer) * 2);
    bottom: calc(var(--space-outer) * 2);
    flex-direction: column;
    text-align: right;

    @media (max-width: 639px) {
      display: none;
    }
  }

  &-index {
    left: calc(var(--space-outer) * 2);
    top: calc(var(--height-header) + var(--space-xs));

    span:first-child {
      color: var(--color-accent-400);
    }

    @media (max-width: 639px) {
      span:last-child {
        display: none;
      }
    }
  }
}

@keyframes reticle-turn {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
