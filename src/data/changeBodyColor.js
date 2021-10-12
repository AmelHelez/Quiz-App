import { computed, onUpdated } from 'vue';
import store from '@/store/index';
import { bodyColors, footerData } from './appProps.json';

const bodyBackgroundColor = () => {
  const getCounter = computed(() => store.getters.getCounter);
  const getGenderOption = computed(() => store.getters.getGenderOption);
  const getFashionData = computed(() => store.getters.getFashionData);

  const body = document.getElementById('app');
  body.style.backgroundColor = bodyColors[getCounter.value];
  const checkmark = document.documentElement;
  if (getCounter.value > 0) {
    checkmark.style.setProperty('--bg', footerData.buttonBackground[getCounter.value]);
  }

  if (getGenderOption.value === true && getCounter.value === 3) {
    body.style.backgroundColor = getFashionData.value.find((data) => data.id.includes('fe'))
      ? '#F4EFFB'
      : 'rgba(106, 192, 240, 0.39)';
    checkmark.style.setProperty('--bg', getFashionData.value.find((data) => data.id.includes('fe'))
      ? '#F4EFFB'
      : '#C5E6F9');
  }

  onUpdated(() => {
    body.style.backgroundColor = bodyColors[getCounter.value];
    if (getCounter.value > 0) {
      checkmark.style.setProperty('--bg', footerData.buttonBackground[getCounter.value]);
    }
    if (getGenderOption.value === true && getCounter.value === 3) {
      body.style.backgroundColor = getFashionData.value.find((data) => data.id.includes('fe'))
        ? '#F4EFFB'
        : 'rgba(106, 192, 240, 0.39)';
      checkmark.style.setProperty('--bg', getFashionData.value.find((data) => data.id.includes('fe'))
        ? '#F4EFFB'
        : '#C5E6F9');
    }
  });
};

export default bodyBackgroundColor;
