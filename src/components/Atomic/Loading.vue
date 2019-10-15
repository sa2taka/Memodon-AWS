<template>
  <div :class="[isComplete? 'complete' : 'spinner']">
  	<svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
  		<rect v-if="isComplete" width="66" height="66" fill="none"/>
  		<polyline v-if="isComplete" points="7 43 26 58 60 18" fill="none" stroke="#fff" stroke-linecap="square" stroke-miterlimit="10" stroke-width="6"/>
  		<circle v-else class="length" fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28"></circle>
  	</svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import theme from '@/store/modules/theme';

@Component
export default class Loading extends Vue {
  @Prop()
  public isComplete: boolean = false;

  public get circle(): string {
    return this.drawCircle(26, 33, 33).join(' ');
  }

  private drawCircle(r: number, centerX: number, centerY: number) {
    return [
      `M${centerX - r},${centerY}`,
      `A${r},${r},0,1,0,${centerX + r},${centerY}`,
      `A${r},${r},0,1,0,${centerX - r},${centerY}`,
    ];
  }
}
</script>

<style lang="scss" scoped>
*, *:before, *:after {
	box-sizing: border-box;
	position: relative;
}

svg {
	display: block;
	
	margin: 0; 
	padding: 0;
}

.spinner, .complete {
	width: 66px; height: 66px;
}

.spinner {
	animation: contanim 2.5s linear infinite;
}

$color: #84EBBD;
$d: 175.6449737548828;

svg {
	width: 100%; 
	height: 100%;
	
	left: 0; 
	top: 0;
	position: absolute;
	
	/*transform: rotate(-90deg);*/

	 circle {
		stroke: $color;
		stroke-dasharray: 1, 300;
		stroke-dashoffset: 0;
			
		animation: strokeanim 2.0s 0.2s ease infinite;
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
		transform: rotate(360deg)
	}
}
</style>
