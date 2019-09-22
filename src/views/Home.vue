<template>
  <MainTitle></MainTitle>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import MainTitle from '@/components/Home/MainTitle.vue';

@Component({
  components: {
    MainTitle,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
</style>
