<template>
  <footer>
    <div class="button-align">
      <button
      @click="increment()"
      :disabled="!disableButton()">
        {{text}}
    </button>
    </div>

     <p
      v-if="screen !== WELCOME_SCREEN"
      class="page-info">
        {{screen}}<span> of </span>{{three}}
     </p>
  </footer>
</template>

<script>
import { ref, computed } from 'vue';
import store from '../store/index';
import footerColor from '../data/changeFooterColors';

export default {
  name: 'Footer',
  props: ['text'],

  setup() {
    const terms = ref(false);
    const three = 3;
    const WELCOME_SCREEN = 0;

    const screen = computed(() => store.getters.getCounter);
    const isReturned = computed(() => store.getters.getIsReturned);
    const savedCardsLength = computed(() => store.getters.getSavedCards.length);

    footerColor();

    function increment() {
      window.scrollTo(0, 0);
      store.dispatch('setCounter');
    }

    function disableButton() {
      if (screen.value > WELCOME_SCREEN) {
        if (isReturned.value === false) {
          if (savedCardsLength.value >= screen.value) terms.value = true;
          else if (savedCardsLength.value < screen.value) terms.value = false;
        } else if (isReturned.value === true) {
          if (savedCardsLength.value === 2) terms.value = false;
          else terms.value = true;
        }
      } else terms.value = true;

      return terms.value;
    }

    return {
      three,
      WELCOME_SCREEN,
      screen,
      increment,
      disableButton,
    };
  },
};
</script>
