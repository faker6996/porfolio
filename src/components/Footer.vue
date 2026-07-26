<script setup lang="ts">
import Social from "./Social.vue";
import Link from "./Link.vue";
import Clickable from "./Clickable.vue";
import NotchSection from "./NotchSection.vue";
import { t } from "../i18n/utils/translate";
import ButtonRound from "./ButtonRound.vue";
import { lenis } from "../composables/useScroll";
import ArrowRightLong from "./icons/ArrowRightLong.vue";

interface Props {
  withSocial?: boolean;
}

const handleBackToTop = () => {
  if (!lenis.value) return;
  lenis.value.scrollTo(0);
};

const { withSocial = true } = defineProps<Props>();
const showAttribution = import.meta.env.VITE_SHOW_ATTRIBUTION !== "false";
</script>

<template>
  <footer class="footer">
    <NotchSection class="footer-notch" />
    <div class="footer-content">
      <div class="footer-rail system-label">
        <span>BACH.SYSTEM / END OF TRANSMISSION</span>
        <span>VIETNAM / UTC+7</span>
      </div>
      <div
        class="footer-back-to-top"
        tabindex="0"
        @click="handleBackToTop"
        @keydown.enter="handleBackToTop"
        data-cursor="circle-white"
        data-sound="click"
      >
        <ButtonRound renderAs="div" variant="border" class="children-unclickable" data-hoversound="hover">
          <ArrowRightLong class="footer-back-to-top-icon" />
        </ButtonRound>
      </div>
      <div class="footer-top">
        <Social v-if="withSocial" />
        <div class="footer-top-links">
          <div class="footer-top-links-legal">
            <Clickable renderAs="div">
              <Link
                href="/privacy"
                class="footer-link"
                :external="true"
                data-cursor="circle-white"
                data-sound="click"
                data-hoversound="hover"
                >{{ t("privacy") }}</Link
              >
            </Clickable>
            <Clickable renderAs="div">
              <Link
                href="/legal"
                class="footer-link children-unclickable"
                :external="true"
                data-cursor="circle-white"
                data-sound="click"
                data-hoversound="hover"
                >{{ t("legal") }}</Link
              >
            </Clickable>
          </div>
        </div>
      </div>
      <div class="footer-credits">
        <div v-if="showAttribution" class="footer-credits-built">
          <p>
            {{ t("original-concept-by") }}
          </p>
          <Clickable renderAs="div">
            <Link
              href="https://david-hckh.com"
              class="footer-link children-unclickable"
              external
              data-cursor="circle-white"
              data-hoversound="hover"
              >David Heckhoff</Link
            >
          </Clickable>
        </div>
        <div class="footer-credits-music">
          <p>
            {{ t("music-produced-by") }}
          </p>
          <Clickable renderAs="div">
            <Link
              href="https://soundcloud.com/hmsurf"
              class="footer-link children-unclickable"
              external
              data-cursor="circle-white"
              data-hoversound="hover"
              >HM Surf</Link
            >
          </Clickable>
        </div>
        <p>© {{ new Date().getFullYear() }} Tran Van Bach</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--color-background-300, var(--color-beige-400));
  border-top: 1px solid rgba(240, 234, 223, 0.16);
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  &-content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-xl);
    width: 100%;
    max-width: calc(var(--breakpoint-xxxl));
    padding: var(--space-lg) var(--space-outer) var(--space-xl);
    position: relative;
  }

  &-rail {
    display: flex;
    justify-content: space-between;
    gap: var(--space-md);
    padding-bottom: var(--space-md);
    border-bottom: 1px solid rgba(240, 234, 223, 0.12);
    color: var(--color-text-300);
  }

  &-back-to-top {
    cursor: pointer;
    align-self: center;

    @include mixins.mq("md") {
      position: absolute;
      top: var(--space-xl);
      left: 50%;
      transform: translateX(-50%);
    }

    &-icon {
      transform: rotate(-90deg);
    }
  }

  &-top {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-xl);

    @include mixins.mq("md") {
      gap: var(--space-md);
      flex-direction: row;
    }

    &-links {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      gap: var(--space-md);

      &-legal {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
      }

      @include mixins.mq("md") {
        gap: var(--space-lg);
        flex-direction: row;
        position: relative;
        margin-left: auto;
      }
    }
  }

  &-link {
    font-weight: 700;
    font-family: "ProFontWindows", monospace;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-size: var(--font-size-xs);
  }

  &-credits {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    width: 100%;
    font-size: var(--font-size-sm);
    text-align: center;
    color: var(--color-text-300);
    font-family: "ProFontWindows", monospace;
    letter-spacing: 0.04em;
    text-transform: uppercase;

    &-built,
    &-music {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--space-xxs);
    }

    @include mixins.mq("md") {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;

      > p {
        margin-left: auto;
      }
    }
  }

  &-notch {
    display: none;
  }
}
</style>
