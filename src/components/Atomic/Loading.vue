<template>
  <div
    :class="[isComplete? 'complete' : 'spinner']"
    :style="{ width: side + 'px', height: side + 'px' }"
  >
    <svg :viewBox="`0 0 ${side} ${side}`" xmlns="http://www.w3.org/2000/svg">
      <rect v-if="isComplete" :width="side" :height="side" fill="none" />
      <polyline
        v-if="isComplete"
        :points="checkmarkPath"
        fill="none"
        :stroke="color"
        stroke-linecap="square"
        stroke-miterlimit="10"
        stroke-width="6"
      />
      <circle
        v-else
        class="length"
        fill="none"
        :stroke="color"
        stroke-width="8"
        stroke-linecap="round"
        :cx="side / 2"
        :cy="side / 2"
        :r="side / 2 - 4"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import theme from '@/store/modules/theme';

@Component
export default class Loading extends Vue {
  @Prop({ default: 66 })
  public side: number = 66;
  @Prop({ default: false })
  public isComplete: boolean = false;
  @Prop({ default: false })
  public isError: boolean = false;
  @Prop({ default: '#009688' })
  public color: string = '#009688';

  private get checkmarkPath() {
    const p1x = 4;
    const p1y = Math.round((5 / 8) * this.side);
    const p2x = Math.round((3 / 8) * this.side);
    const p2y = Math.round((7 / 8) * this.side);
    const p3y = Math.round((1 / 4) * this.side);
    const p3x = this.side - 4;

    return `${p1x} ${p1y} ${p2x} ${p2y} ${p3x} ${p3y}`;
  }
}
</script>

<style lang="scss" scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
  position: relative;
}

svg {
  display: block;

  margin: 0;
  padding: 0;
}

.spinner {
  animation: contanim 2.5s linear infinite;
}

$d: 175.6449737548828;

svg {
  width: 100%;
  height: 100%;

  left: 0;
  top: 0;
  position: absolute;

  /*transform: rotate(-90deg);*/

  circle {
    stroke-dasharray: 1, 300;
    stroke-dashoffset: 0;

    animation: strokeanim 2s 0.2s ease infinite;
    transform-origin: center center;
  }
}

@keyframes strokeanim {
  0% {
    stroke-dasharray: 1, 300;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 120, 300;
    stroke-dashoffset: -$d / 3;
  }
  100% {
    stroke-dasharray: 120, 300;
    stroke-dashoffset: -$d;
  }
}

@keyframes contanim {
  100% {
    transform: rotate(360deg);
  }
}
</style>
