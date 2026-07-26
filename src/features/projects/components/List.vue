<script setup lang="ts">
import { computed } from "vue";

export interface Props {
  title?: string;
  items: string[];
  size?: "sm" | "md" | "lg";
}

const props = defineProps<Props>();

const classes = computed(() => {
  return ["list", `list-size-${props.size ?? "md"}`];
});
</script>

<template>
  <div :class="classes">
    <h3 v-if="props.title" class="list-title">{{ props.title }}</h3>
    <ul class="list-items">
      <li v-for="item in props.items" :key="item" class="list-item" v-html="item"></li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  max-width: 100%;
  grid-column: 1 / 13;

  &-size {
    &-sm {
      @include mixins.mq("md") {
        grid-column: 2 / 12;
      }

      @include mixins.mq("lg") {
        grid-column: 3 / 11;
      }
    }

    &-md {
      @include mixins.mq("md") {
        grid-column: 2 / 12;
      }

      @include mixins.mq("lg") {
        grid-column: 3 / 11;
      }
    }

    &-lg {
      @include mixins.mq("md") {
        grid-column: 3 / 11;
      }
    }
  }

  &-title {
    max-width: 10ch;
    font-size: clamp(2.2rem, 4.8vw, 5rem);
    line-height: 0.92;
    letter-spacing: -0.055em;
  }

  &-items {
    border-top: 1px solid rgba(240, 234, 223, 0.18);
  }

  &-item {
    position: relative;
    padding: var(--space-md) var(--space-md) var(--space-md) 46px;
    border-bottom: 1px solid rgba(240, 234, 223, 0.18);
    color: var(--color-text-300);
    font-size: var(--font-size-lg);

    &::before {
      content: counter(list-item, decimal-leading-zero);
      position: absolute;
      left: 0;
      top: var(--space-md);
      color: var(--color-accent-400);
      font-family: "ProFontWindows", monospace;
      font-size: var(--font-size-xs);
      letter-spacing: 0.08em;
    }
  }
}
</style>
