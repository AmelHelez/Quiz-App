import { computed, onUpdated } from 'vue';
import store from '@/store/index';
import { footerData } from './appProps.json';

const footerColor = () => {
  const getCounter = computed(() => store.getters.getCounter);
  const getGenderOption = computed(() => store.getters.getGenderOption);
  const getFashionData = computed(() => store.getters.getFashionData);

  const changeColors = () => {
    const footer = document.querySelector('footer');
    const button = document.querySelector('button');

    footer.style.backgroundColor = footerData.footerBackground[getCounter.value];
    button.style.backgroundColor = footerData.buttonBackground[getCounter.value];
    button.style.color = footerData.buttonColor[getCounter.value];

    if (getGenderOption.value === true && getCounter.value === 3) {
      button.style.backgroundColor = getFashionData.value
        .find((data) => data.id.includes('fe'))
        ? '#F4EFFB'
        : '#C5E6F9';
    }
  };

  window.onload = () => changeColors();

  onUpdated(() => changeColors());
};

export default footerColor;
