<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { previews } from "../../../content/projects/previews";
import { locale } from "../../../i18n/store";
import PreviewCard from "../../projects/components/PreviewCard.vue";
import PreviewCardCompact from "../../projects/components/PreviewCardCompact.vue";
import { t } from "../../../i18n/utils/translate";
import { isFeatureEnabled } from "../../../utils/features";

import type { ProjectPreview } from "../../../content/types";

const FEATURED_COUNT = 4;

const loadedPreviews = ref<ProjectPreview[] | null>(null);
const featuredPreviews = computed(() => loadedPreviews.value?.slice(0, FEATURED_COUNT) ?? []);
const moreProjects = computed(() => loadedPreviews.value?.slice(FEATURED_COUNT) ?? []);

const emit = defineEmits<{
  (e: "loaded", previews: ProjectPreview[]): void;
}>();

const loadPreviews = async () => {
  if (!locale.value) return;
  const func = previews[locale.value as keyof typeof previews];
  if (!func) return;
  const module = await func();
  loadedPreviews.value = module.default;
  emit("loaded", module.default);
};

watch(locale, loadPreviews);

onMounted(loadPreviews);
</script>

<template>
  <section class="projects">
    <div class="grid projects-heading">
      <div class="projects-title">
        <p class="projects-title-index system-label">02 / {{ t("selected") }}</p>
        <h2 class="projects-title-copy">Selected<br />systems</h2>
      </div>
      <p class="projects-intro">
        Eight systems across enterprise platforms, interface systems, developer tools, native software, real-time
        communication, and computer vision.
      </p>
      <div class="projects-coordinate system-label">
        <span>PROJECT INDEX</span>
        <span>SELECTED WORK / 2022–2026</span>
      </div>
    </div>
    <div class="grid projects-list">
      <div class="projects-cards">
        <PreviewCard
          v-for="(preview, index) in featuredPreviews"
          :key="preview.title"
          :preview="preview"
          :index="index"
        />
      </div>
    </div>
    <div class="grid projects-more" v-if="moreProjects.length || isFeatureEnabled('startProject')">
      <div class="projects-more-heading">
        <p class="projects-more-heading-label system-label">MORE / OPEN SOURCE</p>
        <h3 class="projects-more-heading-copy">Open source &amp; tools</h3>
      </div>
      <div class="projects-more-grid">
        <PreviewCardCompact v-for="preview in moreProjects" :key="preview.title" :preview="preview" />
        <PreviewCardCompact v-if="isFeatureEnabled('startProject')" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  gap: clamp(72px, 10vw, 160px);
  padding-left: var(--space-outer);
  padding-right: var(--space-outer);
  background:
    linear-gradient(rgba(240, 234, 223, 0.035) 1px, transparent 1px),
    var(--color-background-400);
  background-size: 100% 96px;
  padding-top: clamp(100px, 14vw, 220px);
  padding-bottom: clamp(120px, 16vw, 260px);

  &-heading {
    align-items: end;
  }

  &-title {
    position: relative;
    grid-column: 1 / 13;

    @include mixins.mq("md") {
      grid-column: 1 / 8;
    }

    @include mixins.mq("lg") {
      grid-column: 1 / 7;
    }

    &-index {
      margin-bottom: var(--space-md);
      color: var(--color-accent-400);
    }

    &-copy {
      font-weight: 900;
      letter-spacing: -0.065em;
      line-height: 0.83;
      font-size: clamp(4rem, 10vw, 9rem);
      text-transform: uppercase;
    }
  }

  &-intro {
    grid-column: 1 / 13;
    max-width: 40ch;
    color: var(--color-text-300);
    font-size: clamp(1.05rem, 1.5vw, 1.35rem);
    line-height: 1.5;

    @include mixins.mq("md") {
      grid-column: 8 / 13;
    }
  }

  &-coordinate {
    grid-column: 1 / 13;
    display: flex;
    justify-content: space-between;
    padding-top: var(--space-md);
    margin-top: var(--space-xxl);
    border-top: 1px solid rgba(240, 234, 223, 0.18);
    color: var(--color-text-300);
  }

  &-list {
    overflow: visible;
  }

  &-cards {
    max-width: 100%;
    flex: 1;
    grid-column: 1 / span 12;
    display: flex;
    flex-direction: column;
    gap: clamp(64px, 11vw, 180px);
  }

  &-more {
    row-gap: var(--space-lg);
  }

  &-more-heading {
    grid-column: 1 / 13;
  }

  &-more-heading-label {
    margin-bottom: var(--space-xs);
    color: var(--color-accent-400);
  }

  &-more-heading-copy {
    font-weight: 900;
    letter-spacing: -0.04em;
    font-size: clamp(1.75rem, 3.5vw, 2.75rem);
    text-transform: uppercase;
  }

  &-more-grid {
    grid-column: 1 / 13;
    display: grid;
    grid-template-columns: 1fr;
    column-gap: var(--space-xl);

    @include mixins.mq("md") {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
