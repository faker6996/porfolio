<script setup lang="ts">
import Link from "../../../components/Link.vue";
import ArrowRight from "../../../components/icons/ArrowRight.vue";
import Plus from "../../../components/icons/Plus.vue";
import { t } from "../../../i18n/utils/translate";
import { social } from "../../../content/social";
import SystemVisual from "./SystemVisual.vue";

import type { ProjectPreview } from "../../../content/types";

const props = defineProps<{
  preview?: ProjectPreview;
}>();
</script>

<template>
  <Link
    v-if="props.preview"
    class="preview-card-compact children-unclickable"
    :to="`/project/${props.preview.slug}`"
    :aria-label="t('switch-to-project', { project: props.preview.title })"
    data-cursor="arrow"
    data-sound="click"
    data-hoversound="hover"
  >
    <div class="preview-card-compact-visual">
      <SystemVisual :project="props.preview.slug" compact />
    </div>
    <div class="preview-card-compact-content">
      <h4 class="preview-card-compact-title">{{ props.preview.title }}</h4>
      <p class="preview-card-compact-description">{{ props.preview.description }}</p>
    </div>
    <ArrowRight class="preview-card-compact-arrow" />
  </Link>

  <Link
    v-else
    class="preview-card-compact children-unclickable"
    data-cursor="arrow-external"
    data-hoversound="hover"
    external
    :href="social[0].url"
  >
    <div class="preview-card-compact-visual preview-card-compact-visual-empty">
      <Plus class="preview-card-compact-empty-icon" />
    </div>
    <div class="preview-card-compact-content">
      <h4 class="preview-card-compact-title">{{ t("start-a-new-project") }}</h4>
      <p class="preview-card-compact-description">Ideas, tools, and experiments continue in public.</p>
    </div>
    <ArrowRight class="preview-card-compact-arrow" />
  </Link>
</template>

<style scoped lang="scss">
.preview-card-compact {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-sm) 0;
  border-top: 1px solid rgba(240, 234, 223, 0.18);
  transition: border-color 240ms ease;

  &-visual {
    flex-shrink: 0;
    width: 88px;
    height: 88px;
    overflow: hidden;

    @include mixins.mq("md") {
      width: 110px;
      height: 110px;
    }

    &-empty {
      display: grid;
      place-items: center;
      border: 1px dashed rgba(240, 234, 223, 0.22);
      background:
        radial-gradient(circle, rgba(173, 63, 49, 0.14), transparent 45%),
        rgba(240, 234, 223, 0.02);
    }
  }

  &-empty-icon {
    width: 26px;
    color: var(--color-accent-400);
    --icon-color: var(--color-accent-400);
  }

  &-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
  }

  &-title {
    font-size: var(--font-size-title-xs);
    font-weight: 900;
    letter-spacing: -0.03em;
    color: var(--color-text-400);
  }

  &-description {
    color: var(--color-text-300);
    font-size: var(--font-size-sm);
    max-width: 32ch;
  }

  &-arrow {
    flex-shrink: 0;
    width: var(--icon-size-md);
    color: var(--color-text-300);
    --icon-color: var(--color-text-400);
    transition: transform 340ms var(--ease-smooth);
  }

  @include mixins.hover {
    &:hover {
      border-color: var(--color-accent-400);
    }

    &:hover &-arrow {
      transform: translateX(6px);
    }
  }
}
</style>
