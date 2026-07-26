<script setup lang="ts">
import Tag from "../../../components/Tag.vue";
import Button from "../../../components/Button.vue";
import { t } from "../../../i18n/utils/translate";
import Link from "../../../components/Link.vue";
import { projectId } from "../../../composables/useRouteObserver";
import { computed, ref, watch } from "vue";
import SystemVisual from "./SystemVisual.vue";

import type { ProjectContent } from "../../../content/types";

const { content } = defineProps<{
  content: ProjectContent;
}>();

const animationKey = ref(0);
const projectNumber = computed(() => {
  const order = ["underverse", "md-extension", "ziply", "facebook", "stream-detection"];
  const index = order.indexOf(projectId.value ?? "");
  return String(Math.max(0, index) + 1).padStart(2, "0");
});

// Force animation restart when projectId changes
watch(projectId, () => {
  animationKey.value++;
});
</script>

<template>
  <section class="project-hero grid">
    <div class="project-hero-rail system-label">
      <span>{{ projectNumber }} / SELECTED SYSTEM</span>
      <span>TRẦN VĂN BÁCH / VIETNAM</span>
    </div>
    <div class="project-hero-top">
      <p class="project-hero-code system-label">BACH / {{ projectId?.replace("-", "_") }}</p>
      <div class="project-hero-title-wrapper">
        <h1 class="project-hero-title" :key="animationKey">
          {{ content.title }}
        </h1>
      </div>
      <div class="project-hero-tags">
        <Tag v-for="tag in content.tags" :key="tag" :variant="tag" />
      </div>
    </div>
    <p class="project-hero-description" v-html="content.description"></p>
    <div class="project-hero-buttons">
      <Link v-if="content.live" :href="content.live" external class="project-hero-button" data-cursor="arrow-external">
        <Button renderAs="div" variant="accent" class="children-unclickable" data-hoversound="hover">{{
          t("live-view")
        }}</Button>
      </Link>
      <Link
        v-if="content.source"
        :href="content.source"
        external
        class="project-hero-button"
        data-cursor="arrow-external"
      >
        <Button renderAs="div" variant="border" class="children-unclickable" data-hoversound="hover">{{
          t("source-code")
        }}</Button>
      </Link>
    </div>
    <div class="project-hero-visual">
      <SystemVisual :project="projectId ?? ''" />
    </div>
    <div class="project-hero-footer system-label">
      <span>SCROLL TO INSPECT</span>
      <span>SOURCE / PUBLIC</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-hero {
  padding: 0 var(--space-outer);
  padding-bottom: clamp(56px, 8vw, 120px);
  padding-top: calc(var(--height-header) + 24px);
  min-height: calc(var(--dvh) * 100);
  align-content: start;
  row-gap: var(--space-xl);

  @include mixins.mq("md") {
    padding-top: calc(var(--height-header) + 42px);
  }

  &-rail {
    grid-column: 1 / 13;
    display: flex;
    justify-content: space-between;
    padding-bottom: var(--space-md);
    border-bottom: 1px solid rgba(240, 234, 223, 0.16);
    color: var(--color-text-300);

    span:first-child {
      color: var(--color-accent-400);
    }
  }

  &-code {
    color: var(--color-accent-400);
  }

  &-button {
    flex: 0.5;

    @include mixins.mq("md") {
      width: fit-content;
    }
  }

  &-buttons {
    grid-row: auto;
    grid-column: 1 / 13;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    margin-top: var(--space-md);
    width: 100%;
    grid-column: 1 / 13;

    @include mixins.mq("md") {
      gap: var(--space-md);
      width: fit-content;
      grid-column: 1 / 6;
      grid-row: auto;
      margin-top: 0;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 6;
    }
  }

  &-video {
    grid-column: 1 / span 12;
    align-self: center;

    @include mixins.mq("md") {
      grid-column: 1 / 8;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 8;
    }
  }

  &-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  &-title {
    font-size: clamp(3.5rem, 9vw, 9rem);
    color: var(--color-text-400);
    line-height: 0.88;
    letter-spacing: -0.07em;
    text-transform: uppercase;
    transform: translateY(0%);
    animation: project-hero-title-visible 0.5s var(--ease-smooth);

    @include mixins.mq("md") {
      max-width: 8ch;
    }

    @keyframes project-hero-title-visible {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }

    &-wrapper {
      overflow: hidden;
    }
  }

  &-description {
    color: var(--color-text-400);
    line-height: var(--line-height-copy);
    grid-column: 1 / 13;
    align-self: center;

    @include mixins.mq("md") {
      grid-column: 8 / 13;
      margin-top: var(--space-xl);
    }

    @include mixins.mq("lg") {
      grid-column: 8 / 13;
    }

    @include mixins.mq("xl") {
      grid-column: 8 / 12;
    }
  }

  &-top {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    align-self: top;
    grid-column: 1 / 13;

    @include mixins.mq("md") {
      grid-column: 1 / 8;
    }

    @include mixins.mq("lg") {
      grid-column: 1 / 8;
    }
  }

  &-visual {
    grid-column: 1 / 13;
    margin-top: var(--space-lg);
  }

  &-footer {
    grid-column: 1 / 13;
    display: flex;
    justify-content: space-between;
    color: var(--color-text-300);
  }
}
</style>
