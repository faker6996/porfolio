<script setup lang="ts">
import { computed } from "vue";

export interface Props {
  title?: string;
  text?: string;
}

const props = defineProps<Props>();

const classes = computed(() => {
  return {
    text: true,
    "text-with-title": !!props.title,
  };
});
</script>

<template>
  <div :class="classes" v-if="props.title">
    <h3 class="text-title">{{ props.title }}</h3>
    <p class="text-content" v-html="props.text"></p>
  </div>
  <p v-else class="text" v-html="props.text"></p>
</template>

<style scoped lang="scss">
.text {
  line-height: var(--line-height-copy);
  grid-column: 1 / 13;
  max-width: 62ch;
  font-size: clamp(1.05rem, 1.45vw, 1.3rem);

  @include mixins.mq("md") {
    grid-column: 2 / 11;
  }

  @include mixins.mq("lg") {
    grid-column: 3 / 10;
  }

  &-with-title {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-lg);
    max-width: none;

    @include mixins.mq("md") {
      grid-template-columns: minmax(220px, 0.7fr) minmax(0, 1.3fr);
      align-items: start;
    }
  }

  &-title {
    max-width: 9ch;
    color: var(--color-text-400);
    font-size: clamp(2.2rem, 4.8vw, 5rem);
    line-height: 0.92;
    letter-spacing: -0.055em;
    text-wrap: balance;
  }

  &-content {
    max-width: 52ch;
    padding-top: 0.2em;
    color: var(--color-text-300);
  }
}
</style>
