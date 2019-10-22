<template>
  <div id="main-title">
    <div id="title" class="index-title">
      <div class="index-title__x">
        <div class="index-title__y"></div>
      </div>
      <div class="index-title__content">
        <h1
          :class="[
            'index-title__content__base',
            'index-title__content__label',
            `background--${theme}`,
          ]"
        >Memodon</h1>
        <div
          :class="[
            'index-title__content__base',
            'index-title__content__text',
            `background--${theme}`,
          ]"
        >マストドンがメモ帳に</div>
        <div class="index-title__content__base index-title__content__icon">
          <v-icon class="index-title__content__icon__content">fa-pen</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import themeState from '@/store/modules/theme';

@Component
export default class MainTitle extends Vue {
  private theme: 'dark' | 'light' = 'light';

  public created() {
    this.theme = themeState.theme;

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'theme/setTheme') {
        this.theme = mutation.payload;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
#main-title {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  top: 60px;
}

.index-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  line-height: 200px;
  overflow: hidden;
  margin: 0;
  transition: all 0.4s ease-out;
}

.index-title__content__icon__content {
  color: var(--v-primary-base);
}

.index-title__x:before,
.index-title__x:after,
.index-title__y:before,
.index-title__y:after {
  content: '';
  position: absolute;
  background: var(--v-primary-base);
  transition: all 0.4s ease-out;
}
.index-title__y:before {
  animation: topLine 0.4s ease 0.8s forwards;
  animation-fill-mode: both;
}
.index-title__y:after {
  animation: bottomLine 0.4s ease 0s forwards;
  animation-fill-mode: both;
}
.index-title__x:before {
  animation: rightLine 0.4s ease 0.4s forwards;
  animation-fill-mode: both;
}
.index-title__x:after {
  animation: leftLine 0.4s ease 1.2s forwards;
  animation-fill-mode: both;
}

.index-title__content {
  color: var(--v-primary-base);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}

.index-title__content__base {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

@media (min-width: 601px) {
  $height: 280px;
  $width: 60%;

  #main-title {
    height: $height + 20px;
  }

  .index-title {
    width: $width;
    height: $height;
  }

  .index-title__content__label {
    font-size: 42px;
    font-weight: 600;
  }

  .index-title__content__text {
    font-size: 24px;
    font-weight: 600;
  }

  .index-title__content__icon__content {
    font-size: 42px;
  }

  .index-title__y:before {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 3px;
  }
  .index-title__y:after {
    top: 0;
    left: -100%;
    width: 100%;
    height: 3px;
  }
  .index-title__x:before {
    top: -100%;
    right: 0;
    width: 3px;
    height: 100%;
  }
  .index-title__x:after {
    bottom: -100%;
    left: 0;
    width: 3px;
    height: 100%;
  }

  .index-title__content__base {
    height: $height / 4;
  }
}

@media (max-width: 600px) {
  $height: 175px;
  $width: 80%;

  #main-title {
    height: $height + 20px;
  }

  .index-title {
    width: 77%;
    height: 180px;
  }

  .index-title__content__label {
    font-size: 32px;
    font-weight: 600;
  }

  .index-title__content__text {
    font-size: 18px;
    font-weight: 600;
  }

  .index-title__content__icon__content {
    font-size: 28px;
  }

  .index-title__y:before {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 3px;
  }
  .index-title__y:after {
    top: 0;
    left: -100%;
    width: 100%;
    height: 3px;
  }
  .index-title__x:before {
    top: -100%;
    right: 0;
    width: 3px;
    height: 100%;
  }
  .index-title__x:after {
    bottom: -100%;
    left: 0;
    width: 3px;
    height: 100%;
  }

  .index-title__content__base {
    height: $height / 4;
  }
}

.index-title__content__label:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0%;
  animation: fadeFromLeft 0.4s linear 2s forwards;
  animation-fill-mode: both;
}
.index-title__content__icon {
  position: absolute;
  top: 24%;
  left: 20%;
  opacity: 0;
  transform: translateX(-50%);
  animation: penAnimation 1.6s linear 1.92s forwards;
  animation-fill-mode: both;
}

.index-title__content__text:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0%;
  animation: fadeFromLeft 0.4s linear 2.8s forwards;
  animation-fill-mode: both;
}

.background--light:before {
  background: map-get($material-light, background);
}

.background--dark:before {
  background: map-get($material-dark, background);
}

@keyframes topLine {
  100% {
    right: 0;
  }
}

@keyframes bottomLine {
  100% {
    left: 0;
  }
}

@keyframes rightLine {
  100% {
    top: 0;
  }
}

@keyframes leftLine {
  100% {
    bottom: 0;
  }
}
@keyframes fadeFromLeft {
  100% {
    width: 0;
  }
}

@keyframes penAnimation {
  10% {
    opacity: 1;
  }
  30% {
    left: 80%;
    top: 24%;
  }
  40% {
    top: 47%;
    left: 18%;
  }
  50% {
    top: 47%;
    left: 18%;
  }
  80% {
    top: 47%;
    left: 82%;
  }
  90% {
    top: 66%;
    left: 48%;
  }
  100% {
    top: 66%;
    left: 50%;
    opacity: 1;
  }
}

@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}
</style>
