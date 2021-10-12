<template>
  <header>
    <img
      :src="require(`@/assets/svg/logos/${imageValues[getCounter].src}`)"
      :alt="imageValues[getCounter].alt"
    />
  </header>
</template>

<script>
import { computed } from 'vue';
import store from '../store/index';

export default {
  name: 'Header',

  setup() {
    const imageValues = store.getters.getImageProperties;
    const getCounter = computed(() => store.getters.getCounter);

    return {
      imageValues,
      getCounter,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  padding-top: 45px;

  @media screen and (min-width: 1000px) {
    text-align: left;
    padding: 45px 120px 30px;
  }
}
</style>
