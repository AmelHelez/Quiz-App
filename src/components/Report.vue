<template>
  <div class='report'>
    <div class='container'>
      <h1>${{ getTotalCost }}</h1>
      <p class='report-result'>{{ getTotalPercentage() }}</p>
    </div>

    <div class='chart'>
      <div class='chart-props'>
        <p>Breakdown</p>
        <vue3-chart-js v-bind="{ ...getDataPercentages().doughnutChart }" />
      </div>

       <div class='chart-info'>
        <ul>
          <li v-for="(card, index) in getDataPercentages().percentages" :key="card">
            <span>{{ cardType[index] }}: {{ card }}%</span>
          </li>
        </ul>
      </div>
    </div>

    <div class='category-list'>
      <div class='cards' v-for='(i, index) in cards' :key='i.id'>
        <div class='info'>
          <div class='icon'>
            <img
              :src='require(`@/assets/svg/icons/icon-${imageType[index]}.svg`)'
              :alt="cardType[index] + ' icon'"
            />
          </div>
          <p>{{cardType[index]}}</p>
          <div class='edit-card'>
            <img
              src='../assets/svg/icons/icon-edit.svg'
              alt='Edit Button'
              @click='setCounter(index + 1)'
            />
          </div>
        </div>

        <div class='price'>
          <h3>${{ cardCosts[index] }}</h3>
          <img
            src='../assets/images/down-circle.png'
            alt='Info Circle'
            @click='checkValues(cardType[index])'
          />
        </div>

        <hr />
        <div
          class='card-details'
          v-if='checkType === index + 1'
        >
          <div v-if="index < 2">
            <ul class='list'>
              <li v-for='x in i.options.tooltip.data' :key='x'>
                <span class='card-name'>
                    {{ x.name.replace('%s', 'Weekly').replace('%s Payment', 'Loan Repayment') }}
                </span>
                <span class='card-value'>${{ x.value }}</span>
              </li>
            </ul>
          </div>

          <div v-if='index === 2'>
            <ul class='list'>
              <li v-for='x in i.data' :key='x'>
                <span class='card-name'>{{ x.name }}</span>
                <span class='card-value'>${{ x.price }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';
import store from '../store/index';
import '@/assets/stylesheets/report/_report.scss';

export default defineComponent({
  name: 'Report',
  components: {
    Vue3ChartJs,
  },

  setup() {
    const text = ref('');
    const cards = ref([]);
    const imageType = ['housing', 'car', 'clothing'];
    const cardType = ['rent', 'car', 'clothing'];
    const checkType = ref(0);
    const cardCosts = ref([]);
    const savedCards = store.getters.getSavedCards;
    let array = [3];

    savedCards.filter((card) => {
      if (card.category_id === 0) {
        array = [];
        array = card.options.tooltip.data
          .filter((data) => typeof data.value === 'number' && !data.name.includes('Payment'));
        if (array.length < 3) {
          array.unshift({
            name: 'Rent (Weekly)',
            value: card.options.price.weekly_value,
          });
        }
        if (array.length === 3) card.options.tooltip.data = array;
      }
    });

    // computed
    const getTotalCost = computed(() => store.getters.getTotalCost);
    const getTotal = computed(() => store.getters.getTotal);

    // method(s)
    function assignCards() {
      savedCards.forEach((card) => {
        if (card.category_id === 0) {
          cards.value[0] = card;
          cardCosts.value[0] = array.reduce((t, c) => t + c.value, 0);
        } else if (card.category_id === 1) {
          cards.value[1] = card;
          cardCosts.value[1] = card.options.price.weekly_value;
        } else {
          cards.value[2] = card;
          cardCosts.value[2] = card.data.reduce((x, y) => x + y.price, 0);
        }
      });

      return {
        cards,
        cardCosts,
      };
    }

    function checkValues(type = 'none') {
      if (type === 'rent') checkType.value = checkType.value !== 1 ? 1 : 0;
      else if (type === 'car') checkType.value = checkType.value !== 2 ? 2 : 0;
      else if (type === 'clothing') checkType.value = checkType.value !== 3 ? 3 : 0;

      return checkType;
    }

    function getDataPercentages() {
      const costs = { ...assignCards().cardCosts.value };
      const rentCost = +((costs[0] / getTotalCost.value) * 100).toFixed(2);
      const carCost = +((costs[1] / getTotalCost.value) * 100).toFixed(2);
      const fashionCost = +((costs[2] / getTotalCost.value) * 100).toFixed(2);
      const percentages = [rentCost, carCost, fashionCost];

      const doughnutChart = {
        type: 'doughnut',
        data: {
          datasets: [
            {
              backgroundColor: ['#206CD6', '#848E9C', '#FCD535'],
              data: percentages,
            },
          ],
        },
      };

      return {
        percentages,
        doughnutChart,
      };
    }

    function getTotalPercentage() {
      const data = document.documentElement;
      const price = (getTotalCost.value / getTotal.value) * 100;
      const percentage = +price.toFixed(2);

      if (percentage > 0 && percentage <= 40) {
        text.value = 'Compulsive Saver';
        data.style.setProperty('--spender-type-color', '#46D0D9');
      } else if (percentage > 40 && percentage <= 65) {
        text.value = 'In Betweener';
        data.style.setProperty('--spender-type-color', '#46D9B5');
      } else if (percentage > 65) {
        text.value = 'Compulsive Spender';
        data.style.setProperty('--spender-type-color', '#D946A7');
      }

      return text.value;
    }

    function setCounter(value) {
      store.dispatch('setCounter', value);
    }

    return {
      cards,
      cardCosts,
      imageType,
      cardType,
      checkType,
      getTotalCost,
      assignCards,
      checkValues,
      getDataPercentages,
      getTotalPercentage,
      setCounter,
    };
  },
});
</script>
