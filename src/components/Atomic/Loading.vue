<template>
  <div
    :class="[isComplete ? 'complete' : isError ? 'error-icon' : 'spinner']"
    :style="{ width: side + 'px', height: side + 'px' }"
  >
    <transition name="checkmark">
      <svg
        :viewBox="`0 0 ${side} ${side}`"
        xmlns="http://www.w3.org/2000/svg"
        v-if="isComplete"
        class="icon"
      >
        <rect :width="side" :height="side" fill="none" />
        <polyline
          :points="checkmarkPath"
          fill="none"
          :stroke="color"
          stroke-linecap="square"
          stroke-miterlimit="10"
          :stroke-width="side / 9"
        />
      </svg>
    </transition>

    <transition name="error">
      <svg
        :viewBox="`0 0 ${side} ${side}`"
        xmlns="http://www.w3.org/2000/svg"
        v-if="isError && !isComplete"
        class="icon"
      >
        <g
          :transform="`scale(${side / 12800.0}, ${side / 12800.0})`"
          fill="#f44336"
          stroke="none"
        >
          <path
            d="M1545 12784 c-85 -19 -167 -51 -243 -95 -69 -41 -1089 -1049 -1157
                -1144 -101 -141 -140 -263 -140 -440 0 -169 36 -293 125 -427 29 -43 705 -726
                2149 -2170 l2106 -2108 -2111 -2112 c-1356 -1358 -2124 -2133 -2147 -2169 -88
                -137 -121 -249 -121 -419 -1 -181 37 -302 139 -445 68 -95 1088 -1103 1157
                -1144 273 -159 604 -143 853 42 22 17 986 976 2143 2131 l2102 2101 2103
                -2101 c1156 -1155 2120 -2114 2142 -2131 69 -51 130 -82 224 -113 208 -70 431
                -44 629 71 69 41 1089 1049 1157 1144 101 141 140 263 140 440 0 166 -36 290
                -121 422 -25 39 -746 767 -2148 2171 l-2111 2112 2107 2108 c2207 2208 2162
                2161 2219 2303 75 187 77 392 4 572 -53 132 -74 157 -615 700 -289 291 -552
                548 -585 572 -141 101 -263 140 -440 140 -166 0 -289 -35 -420 -120 -41 -26
                -724 -702 -2172 -2149 l-2113 -2111 -2112 2111 c-1454 1452 -2132 2123 -2173
                2150 -64 41 -149 78 -230 101 -79 22 -258 26 -340 7z"
          />
        </g>
      </svg>
    </transition>

    <transition name="loading">
      <svg
        :viewBox="`0 0 66 66`"
        xmlns="http://www.w3.org/2000/svg"
        v-if="!isError && !isComplete"
        class="icon"
      >
        <circle
          class="length"
          fill="none"
          :stroke="color"
          stroke-width="8"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="28"
        />
      </svg>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import theme from '@/store/modules/theme';

@Component
export default class Loading extends Vue {
  @Prop({ default: 66 })
  public side!: number;
  @Prop({ default: false })
  public isComplete!: boolean;
  @Prop({ default: false })
  public isError!: boolean;
  @Prop({ default: '#009688' })
  public color!: string;

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

$d: 165.6449737548828;

svg {
  width: 100%;
  height: 100%;

  left: 0;
  top: 0;
  position: absolute;

  /*transform: rotate(-90deg);*/

  circle {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;

    animation: strokeanim 2.5s 0.2s ease infinite;
  }
}

.icon {
  transform-origin: center center;
}

@keyframes strokeanim {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -$d / 3;
  }
  100% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -$d;
  }
}

@keyframes contanim {
  100% {
    transform: rotate(360deg);
  }
}

.error-enter-active {
  transition: all 0.5s cubic-bezier(0.03, 1.04, 0.89, 1.31);
}

.loading-leave-active,
.checkmark-enter-active {
  transition: all 0.5s 0.5s cubic-bezier(0.03, 1.04, 0.89, 1.31);
}

.loading-leave-to,
.checkmark-enter,
.error-enter {
  transform: scale(0);
}

.loading-leave-to {
  opacity: 0;
}
</style>
