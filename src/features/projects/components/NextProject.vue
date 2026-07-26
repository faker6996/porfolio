<script setup lang="ts">
import ArrowRight from "../../../components/icons/ArrowRight.vue";
import { t } from "../../../i18n/utils/translate";

import type { ProjectPreview } from "../../../content/types";
import SystemVisual from "./SystemVisual.vue";

const { project } = defineProps<{
  project: ProjectPreview;
}>();
</script>

<template>
  <div class="next-project children-unclickable" data-hoversound="hover">
    <div class="next-project-image">
      <SystemVisual :project="project.slug" compact />
    </div>
    <div class="next-project-content">
      <p class="next-project-prefix">{{ t("next-project") }}:</p>
      <h3 class="next-project-title">{{ project.title }}</h3>
    </div>
    <ArrowRight class="next-project-arrow" />
  </div>
</template>

<style scoped lang="scss">
.next-project {
  border-top: 1px solid var(--color-grayscale-400);
  border-bottom: 1px solid var(--color-grayscale-400);
  padding: var(--space-sm) 0;
  border-radius: 0;
  color: var(--color-text-400);
  --icon-color: var(--color-text-400);
  transition: background-color 0.1s ease-in-out;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: space-between;
  min-height: 120px;

  @include mixins.mq("sm") {
    min-height: 160px;
  }

  @include mixins.mq("md") {
    padding: var(--space-md) 0;
    min-height: 220px;
  }

  @include mixins.mq("lg") {
    padding-right: var(--space-lg);
  }

  &-prefix {
    color: var(--color-text-300);
    white-space: nowrap;
  }

  &-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: var(--space-sm);
    gap: var(--space-xxs);

    @include mixins.mq("md") {
      padding-left: var(--space-md);
    }
  }

  &-title {
    font-size: clamp(1.8rem, 4vw, 4.4rem);
    line-height: var(--line-height-title);
    font-weight: 900;
    letter-spacing: -0.055em;
    color: var(--color-text-400);

    @include mixins.mq("md") {
      font-size: var(--font-size-title-xs);
    }
  }

  &-arrow {
    width: var(--icon-size-md);
    color: var(--color-text-300);
    --icon-color: var(--color-text-400);
  }

  &-image {
    align-self: stretch;
    width: min(34%, 320px);
    min-width: 110px;
    overflow: hidden;
  }

  @include mixins.hover {
    &:hover {
      background-color: transparent;
      border-color: var(--color-accent-400);
    }
  }
}
</style>
    font-family: "ProFontWindows", monospace;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: var(--font-size-xs);
