<script setup lang="ts">
export interface Props {
  title?: string;
  nodes: {
    label: string;
    detail?: string;
  }[];
}

defineProps<Props>();
</script>

<template>
  <section class="architecture">
    <div class="architecture-heading">
      <p class="architecture-kicker system-label">SYSTEM ARCHITECTURE</p>
      <h3 v-if="title" class="architecture-title">{{ title }}</h3>
    </div>
    <div class="architecture-flow">
      <template v-for="(node, index) in nodes" :key="`${node.label}-${index}`">
        <article class="architecture-node">
          <span class="architecture-node-index system-label">{{ String(index + 1).padStart(2, "0") }}</span>
          <strong>{{ node.label }}</strong>
          <p v-if="node.detail">{{ node.detail }}</p>
        </article>
        <span v-if="index < nodes.length - 1" class="architecture-link" aria-hidden="true">
          <i></i>
        </span>
      </template>
    </div>
  </section>
</template>

<style scoped lang="scss">
.architecture {
  grid-column: 1 / 13;
  display: grid;
  gap: var(--space-xl);
  padding: clamp(28px, 5vw, 72px);
  border: 1px solid rgba(240, 234, 223, 0.16);
  background:
    linear-gradient(rgba(240, 234, 223, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(240, 234, 223, 0.045) 1px, transparent 1px),
    rgba(9, 11, 9, 0.52);
  background-size: 36px 36px;

  @include mixins.mq("md") {
    grid-column: 2 / 12;
  }

  &-heading {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  &-kicker {
    color: var(--color-accent-400);
  }

  &-title {
    max-width: 13ch;
    font-size: clamp(2rem, 4vw, 4rem);
    line-height: 0.95;
    letter-spacing: -0.05em;
  }

  &-flow {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    @include mixins.mq("md") {
      flex-direction: row;
      align-items: center;
    }
  }

  &-node {
    position: relative;
    flex: 1;
    min-width: 0;
    min-height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: var(--space-xs);
    padding: var(--space-md);
    border: 1px solid rgba(240, 234, 223, 0.2);
    background: rgba(17, 21, 18, 0.86);

    &::after {
      content: "";
      position: absolute;
      top: -1px;
      right: -1px;
      width: 18px;
      height: 18px;
      border-top: 2px solid var(--color-accent-400);
      border-right: 2px solid var(--color-accent-400);
    }

    &-index {
      position: absolute;
      top: var(--space-sm);
      left: var(--space-md);
      color: var(--color-accent-400);
    }

    strong {
      font-size: var(--font-size-lg);
    }

    p {
      color: var(--color-text-300);
      font-size: var(--font-size-sm);
      line-height: 1.35;
    }
  }

  &-link {
    position: relative;
    width: 1px;
    height: 36px;
    align-self: center;
    background: rgba(216, 93, 73, 0.55);

    @include mixins.mq("md") {
      width: clamp(26px, 4vw, 62px);
      height: 1px;
    }

    i {
      position: absolute;
      right: -1px;
      bottom: -1px;
      width: 6px;
      height: 6px;
      border-right: 1px solid var(--color-accent-400);
      border-bottom: 1px solid var(--color-accent-400);
      transform: rotate(45deg);

      @include mixins.mq("md") {
        top: -3px;
        bottom: auto;
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
