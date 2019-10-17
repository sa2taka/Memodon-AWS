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
        >
          Memodon
        </h1>
        <div
          :class="[
            'index-title__content__base',
            'index-title__content__text',
            `background--${theme}`,
          ]"
        >
          マストドンがメモ帳に
        </div>
        <div class="index-title__content__base index-title__content__icon">
          <v-icon class="index-title__content__icon__content">fa-pen</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import theme from '@/store/modules/theme';

@Component
export default class MainTitle extends Vue {
  get theme(): string {
    return theme.theme;
  }
}
</script>

<style lang="scss" scoped>
.main-title {
  width: 100%;
  height: 300px;
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
  width: 50vw;
  height: 280px;
  line-height: 200px;
  overflow: hidden;
  margin: 0;
  transition: all 0.4s ease-out;
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
  bottom: 0;
  right: -50vw;
  width: 50vw;
  height: 3px;
  animation: topLine 0.4s ease 0.8s forwards;
  animation-fill-mode: both;
}
.index-title__y:after {
  top: 0;
  left: -50vw;
  width: 50vw;
  height: 3px;
  animation: bottomLine 0.4s ease 0s forwards;
  animation-fill-mode: both;
}
.index-title__x:before {
  top: -280px;
  right: 0;
  width: 3px;
  height: 280px;
  animation: rightLine 0.4s ease 0.4s forwards;
  animation-fill-mode: both;
}
.index-title__x:after {
  bottom: -280px;
  left: 0;
  width: 3px;
  height: 280px;
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
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.index-title__content__label {
  font-size: 42px;
  font-weight: 600;
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
  top: 72px;
  left: 20%;
  opacity: 0;
  transform: translateX(-50%);
  animation: penAnimation 1.6s linear 1.92s forwards;
  animation-fill-mode: both;
}
.index-title__content__icon__content {
  font-size: 42px;
  color: var(--v-primary-base);
}
.index-title__content__text {
  font-size: 24px;
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
    top: 72px;
  }
  40% {
    top: 140px;
    left: 18%;
  }
  50% {
    top: 140px;
    left: 18%;
  }
  80% {
    top: 140px;
    left: 82%;
  }
  90% {
    top: 200px;
    left: 48%;
  }
  100% {
    top: 200px;
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
