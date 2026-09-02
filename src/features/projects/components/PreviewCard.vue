<script setup lang="ts">
import Link from "../../../components/Link.vue";
import ArrowRightLong from "../../../components/icons/ArrowRightLong.vue";
import gsap from "gsap";
import { onMounted, onUnmounted, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { t } from "../../../i18n/utils/translate";
import { social } from "../../../content/social";
import Plus from "../../../components/icons/Plus.vue";
import SystemVisual from "./SystemVisual.vue";

import type { ProjectPreview } from "../../../content/types";

const tlRef = ref<gsap.core.Timeline | null>(null);
const wrapperRef = ref<HTMLDivElement | null>(null);

const props = defineProps<{
  preview?: ProjectPreview;
  index?: number;
}>();

onMounted(async () => {
  if (!wrapperRef.value || ScrollTrigger.isInViewport(wrapperRef.value)) {
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperRef.value,
      start: "top bottom",
    },
  });
  tl.fromTo(wrapperRef.value, { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0);

  tlRef.value = tl;
});

onUnmounted(() => {
  if (tlRef.value) {
    tlRef.value.kill();
    tlRef.value = null;
  }
});
</script>

<template>
  <Link
    class="preview-card children-unclickable"
    :to="`/project/${props.preview.slug}`"
    :aria-label="t('switch-to-project', { project: props.preview.title })"
    data-cursor="arrow"
    data-sound="click"
    data-hoversound="hover"
    v-if="props.preview"
  >
    <article class="preview-card-shell" ref="wrapperRef">
      <div class="preview-card-rail system-label">
        <span>{{ String((props.index ?? 0) + 1).padStart(2, "0") }}</span>
        <span>SELECTED SYSTEM</span>
      </div>
      <div class="preview-card-visual">
        <SystemVisual :project="props.preview.slug" />
      </div>
      <div class="preview-card-content">
        <div class="preview-card-copys">
          <p class="preview-card-code system-label">BACH / {{ props.preview.slug.replace("-", "_") }}</p>
          <h3 class="preview-card-title">{{ props.preview.title }}</h3>
          <p class="preview-card-description">{{ props.preview.description }}</p>
        </div>
        <div class="preview-card-action">
          <span class="system-label">{{ t("view-project") }}</span>
          <ArrowRightLong class="preview-card-action-icon" />
        </div>
      </div>
    </article>
  </Link>

  <Link
    v-else
    class="preview-card children-unclickable"
    data-cursor="arrow-external"
    data-hoversound="hover"
    external
    :href="social[0].url"
  >
    <article class="preview-card-shell preview-card-shell-empty">
      <div class="preview-card-rail system-label">
        <span>09</span>
        <span>OPEN CHANNEL</span>
      </div>
      <div class="preview-card-empty-mark">
        <Plus class="preview-card-empty-mark-icon" />
      </div>
      <div class="preview-card-content">
        <div class="preview-card-copys">
          <p class="preview-card-code system-label">GITHUB / FAKER6996</p>
          <h3 class="preview-card-title">{{ t("start-a-new-project") }}</h3>
          <p class="preview-card-description">Ideas, tools, and experiments continue in public.</p>
        </div>
        <div class="preview-card-action">
          <span class="system-label">OPEN GITHUB</span>
          <ArrowRightLong class="preview-card-action-icon" />
        </div>
      </div>
    </article>
  </Link>
</template>

<style scoped lang="scss">
.preview-card {
  --chapter-shift: 0px;
  position: relative;
  z-index: var(--z-index-layout);
  display: block;
  width: 100%;

  &:nth-child(even) {
    @include mixins.mq("lg") {
      --chapter-shift: -6vw;
    }
  }

  &-shell {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-md);
    padding: var(--space-sm);
    border-top: 1px solid rgba(240, 234, 223, 0.18);
    transform: translateX(var(--chapter-shift));
    transition:
      transform 600ms var(--ease-smooth),
      border-color 240ms ease;

    @include mixins.mq("md") {
      grid-template-columns: 52px minmax(0, 1.35fr) minmax(280px, 0.65fr);
      align-items: stretch;
      padding: var(--space-md) 0;
      min-height: 520px;
    }

    &-empty {
      min-height: 360px;
      border-bottom: 1px solid rgba(240, 234, 223, 0.18);
    }
  }

  &-rail {
    color: var(--color-text-300);
    display: flex;
    justify-content: space-between;
    gap: var(--space-md);

    span:first-child {
      color: var(--color-accent-400);
    }

    @include mixins.mq("md") {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      span:last-child {
        writing-mode: vertical-rl;
      }
    }
  }

  &-visual {
    min-width: 0;
    overflow: hidden;
  }

  &-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--space-xxl);
    padding: var(--space-sm) 0 var(--space-sm) var(--space-sm);
  }

  &-copys {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  &-code {
    color: var(--color-accent-400);
  }

  &-title {
    max-width: 9ch;
    color: var(--color-text-400);
    font-size: clamp(2.5rem, 5vw, 5.75rem);
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -0.06em;
    text-wrap: balance;
  }

  &-description {
    max-width: 29ch;
    color: var(--color-text-300);
    font-size: var(--font-size-lg);
    line-height: 1.35;
  }

  &-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: var(--space-md);
    border-top: 1px solid rgba(240, 234, 223, 0.18);
    color: var(--color-text-300);

    &-icon {
      width: 30px;
      transition: transform 340ms var(--ease-smooth);
    }
  }

  &-empty-mark {
    min-height: 260px;
    display: grid;
    place-items: center;
    border: 1px dashed rgba(240, 234, 223, 0.22);
    background:
      radial-gradient(circle, rgba(173, 63, 49, 0.14), transparent 45%),
      rgba(240, 234, 223, 0.02);

    &-icon {
      width: 54px;
      color: var(--color-accent-400);
      --icon-color: var(--color-accent-400);
    }
  }

  @include mixins.hover {
    &:hover &-shell {
      border-color: var(--color-accent-400);
      transform: translateX(var(--chapter-shift)) translateY(-5px);
    }

    &:hover &-action {
      color: var(--color-text-400);
    }

    &:hover &-action-icon {
      transform: translateX(8px);
    }
  }
}
</style>
