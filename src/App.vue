<template>
  <Header v-if="getCounter !== REPORT_SCREEN" />

  <Welcome v-if="getCounter === WELCOME_SCREEN" />

  <QuestionScreen
    v-if="getCounter > WELCOME_SCREEN
    && getCounter < REPORT_SCREEN"
  />

  <Report v-if="getCounter === REPORT_SCREEN" />

  <Footer
      v-show='showFooter'
      :text='getButtonText[getCounter]'
    />
</template>

<script>
import { defineComponent, defineAsyncComponent, computed } from 'vue';
import store from './store/index';
import bodyBackgroundColor from './data/changeBodyColor';

const Welcome = defineAsyncComponent(() => import('./components/Welcome.vue'));
const Report = defineAsyncComponent(() => import('./components/Report.vue'));
const Header = defineAsyncComponent(() => import('./components/Header.vue'));
const QuestionScreen = defineAsyncComponent(() => import('./components/QuestionScreens.vue'));
const Footer = defineAsyncComponent(() => import('./components/Footer.vue'));

export default defineComponent({
  name: 'App',
  components: {
    Welcome,
    Report,
    Header,
    QuestionScreen,
    Footer,
  },

  setup() {
    const WELCOME_SCREEN = 0;
    const FASHION_SCREEN = 3;
    const REPORT_SCREEN = 4;

    const getCounter = computed(() => store.getters.getCounter);
    const getButtonText = computed(() => store.getters.getButtonText);
    const showFooter = computed(() => getCounter.value < REPORT_SCREEN
      && (store.getters.getGenderOption === true || getCounter.value !== FASHION_SCREEN));

    // change background color of each component
    bodyBackgroundColor();

    return {
      WELCOME_SCREEN,
      FASHION_SCREEN,
      REPORT_SCREEN,
      getCounter,
      getButtonText,
      showFooter,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;

  @media screen and (min-width: 1000px) {
    position: relative;
  }
}
</style>
