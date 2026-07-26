<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../../animations";
import { t } from "../../../i18n/utils/translate";
import Social from "../../../components/Social.vue";
import Link from "../../../components/Link.vue";
import ArrowRightLong from "../../../components/icons/ArrowRightLong.vue";

const contactElement = ref<HTMLElement | null>(null);

onMounted(() => {
  if (contactElement.value) {
    transitions.contact.setup(contactElement.value);
  }
});

onUnmounted(() => {
  transitions.contact.destroy();
});
</script>

<template>
  <div class="contact grid" ref="contactElement">
    <div class="contact-rail system-label">
      <span>03 / OPEN CHANNEL</span>
      <span>VIETNAM / UTC+7</span>
    </div>
    <div class="contact-content">
      <p class="contact-kicker system-label">BACH.SYSTEM IS READY</p>
      <h2 class="contact-title" v-html="t('lets-work-together')"></h2>
      <p class="contact-copy">
        I build products where interface, infrastructure, and motion need to work as one system.
      </p>
      <Link
        href="https://github.com/faker6996"
        external
        class="contact-link"
        data-cursor="arrow-external"
        data-sound="click"
      >
        <span>Continue on GitHub</span>
        <ArrowRightLong class="contact-link-icon" />
      </Link>
      <Social variant="background" class="contact-social" />
    </div>
    <div class="contact-terminal system-label" aria-hidden="true">
      <span>&gt; session.open("faker6996")</span>
      <span>&gt; status: waiting_for_signal</span>
      <span class="contact-terminal-cursor">&gt; _</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  max-width: calc(var(--svw) * 100);
  overflow: hidden;
  min-height: calc(var(--lvh) * 100);
  padding: var(--space-outer);
  padding-top: calc(var(--height-header) + var(--space-lg));
  align-content: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: var(--space-outer);
    border: 1px solid rgba(240, 234, 223, 0.13);
    pointer-events: none;
  }

  @include mixins.mq("md") {
    padding-top: var(--space-xxl);
  }

  &-content {
    position: relative;
    padding-top: var(--space-md);
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);

    @include mixins.mq("sm") {
      grid-column: 1 / 8;
    }

    @include mixins.mq("md") {
      gap: var(--space-xl);
      grid-column: 2 / 7;
      padding-top: var(--space-lg);
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 7;
    }
  }

  &-kicker {
    color: var(--color-accent-400);
  }

  &-title {
    font-weight: 900;
    letter-spacing: -0.065em;
    line-height: 0.88;
    font-size: clamp(3.5rem, 8vw, 8.5rem);
    text-transform: uppercase;
    text-wrap: balance;
  }

  &-copy {
    max-width: 42ch;
    color: var(--color-text-300);
    font-size: var(--font-size-lg);
    line-height: 1.5;
  }

  &-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: min(100%, 380px);
    padding: var(--space-md) 0;
    border-top: 1px solid rgba(240, 234, 223, 0.2);
    border-bottom: 1px solid rgba(240, 234, 223, 0.2);
    font-weight: 700;

    &-icon {
      width: 28px;
    }
  }

  &-social {
    margin-top: var(--space-sm);
  }

  &-rail {
    position: absolute;
    top: calc(var(--height-header) + var(--space-lg));
    left: calc(var(--space-outer) * 2);
    right: calc(var(--space-outer) * 2);
    display: flex;
    justify-content: space-between;
    color: var(--color-text-300);
  }

  &-terminal {
    display: none;

    @include mixins.mq("md") {
      grid-column: 8 / 12;
      align-self: end;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      padding: var(--space-lg);
      border-left: 1px solid var(--color-accent-400);
      color: var(--color-text-300);
      background: rgba(9, 11, 9, 0.56);
    }

    &-cursor {
      color: var(--color-accent-400);
      animation: terminal-blink 1s steps(1) infinite;
    }
  }
}

@keyframes terminal-blink {
  50% {
    opacity: 0;
  }
}
</style>
