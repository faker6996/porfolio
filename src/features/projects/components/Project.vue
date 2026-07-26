<script setup lang="ts">
import { projectId, projectVisible, recentProjectId } from "../../../composables/useRouteObserver";
import { isTransitioning } from "../../../composables/useProjectTransition";
import { ref, watch } from "vue";
import { projectModules } from "../../../content/projects";
import ProjectContent from "./ProjectContent.vue";
import Footer from "../../../components/Footer.vue";
import Link from "../../../components/Link.vue";
import Button from "../../../components/Button.vue";
import { locale } from "../../../i18n/store";
import { lenis } from "../../../composables/useScroll";

import type { Locale } from "../../../i18n/types";
import type { ProjectContent as ProjectContentData } from "../../../content/types";

const loading = ref(true);
const content = ref<ProjectContentData | null>(null);
const error = ref<Error | null>(null);

const fetchProject = async (project: string | undefined) => {
  loading.value = true;
  content.value = null;
  error.value = null;

  try {
    const projectModule = projectModules[locale.value as Locale][project as string];

    if (!projectModule) {
      throw new Error("Unknown project");
    }

    content.value = projectModule.default;
  } catch (err) {
    error.value = new Error(`Failed to fetch project ${project}`);
  } finally {
    loading.value = false;
  }
};

watch(
  [recentProjectId, locale],
  () => {
    if (recentProjectId.value) {
      fetchProject(recentProjectId.value);
    }
  },
  { immediate: true },
);

watch(
  [projectId, isTransitioning, locale],
  () => {
    if (!projectId.value || isTransitioning.value) return;
    lenis.value?.scrollTo(0, { immediate: true });
  },
  { immediate: true },
);
</script>

<template>
  <div
    ref="projectRef"
    :class="[
      'project',
      recentProjectId !== null && `project-${recentProjectId}`,
      isTransitioning && `project-transitioning`,
      projectVisible && `project-visible`,
    ]"
  >
    <div :class="['project-content-wrapper', projectVisible && `project-content-wrapper-visible`]">
      <ProjectContent
        v-if="content && recentProjectId && projectVisible"
        :content="content"
        :projectId="recentProjectId"
      />
      <main v-else-if="error && projectVisible && !loading" class="project-error">
        <div class="project-error-rail system-label">
          <span>404 / UNKNOWN SYSTEM</span>
          <span>BACH.SYSTEM</span>
        </div>
        <div class="project-error-content">
          <p class="system-label">ROUTE RESOLUTION FAILED</p>
          <h1>Signal<br />not found.</h1>
          <p>The requested project is not part of the current repository index.</p>
          <Link to="/" aria-label="Return to home">
            <Button renderAs="div" variant="accent">Return to system</Button>
          </Link>
        </div>
        <div class="project-error-code system-label" aria-hidden="true">
          <span>ERR_ROUTE_404</span>
          <span>///</span>
          <span>NO_DATA</span>
        </div>
      </main>
      <Footer :class="['project-footer', `project-${recentProjectId}`]"></Footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project {
  min-height: calc(var(--lvh) * 100);
  background-color: var(--color-background-300);
  max-width: calc(var(--lvw) * 100);
  overflow: hidden;

  &-content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    opacity: 0;
    transition: opacity 0.4s ease-out;

    &-visible {
      opacity: 1;
    }
  }

  &-footer {
    position: relative;
    margin-top: auto;
    color: var(--color-text-400);
  }

  &-error {
    min-height: calc(var(--lvh) * 100);
    padding: calc(var(--height-header) + var(--space-lg)) var(--space-outer) var(--space-xl);
    display: grid;
    align-content: center;
    position: relative;
    background:
      linear-gradient(rgba(240, 234, 223, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(240, 234, 223, 0.035) 1px, transparent 1px),
      radial-gradient(circle at 75% 45%, rgba(173, 63, 49, 0.22), transparent 28%);
    background-size: 48px 48px, 48px 48px, auto;

    &-rail {
      position: absolute;
      top: calc(var(--height-header) + var(--space-md));
      left: var(--space-outer);
      right: var(--space-outer);
      display: flex;
      justify-content: space-between;
      color: var(--color-text-300);
    }

    &-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-md);

      > .system-label {
        color: var(--color-accent-400);
      }

      h1 {
        max-width: 8ch;
        font-size: clamp(4.6rem, 12vw, 11rem);
        font-weight: 900;
        line-height: 0.8;
        letter-spacing: -0.075em;
        text-transform: uppercase;
      }

      p:not(.system-label) {
        max-width: 44ch;
        color: var(--color-text-300);
        line-height: 1.5;
      }
    }

    &-code {
      display: none;

      @include mixins.mq("md") {
        position: absolute;
        right: var(--space-outer);
        bottom: var(--space-xl);
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        color: var(--color-text-300);
      }
    }
  }

  ::selection {
    background: var(--color-accent-400);
    color: var(--color-accent-text-400);
    text-shadow: none;
  }

  ::-moz-selection {
    background: var(--color-accent-400);
    color: var(--color-accent-text-400);
    text-shadow: none;
  }
}
</style>
