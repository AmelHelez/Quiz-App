<template>
  <div class='components'>
    <div v-for="index in RENT_CAR_SCREENS" :key="index">
      <div v-if="getCounter === index" class='flex-component'>
        <div v-for="data in cards[index - 1].data" :key="data.id" class="card-width">
           <Card
            :cardId='data.id'
            :options='data.options'
            :name='data.name'
            :description='data.description'
            :thumbnail='data.thumbnail'
        />
        </div>
      </div>
    </div>

    <div v-if='getCounter === FASHION_SCREEN'>
      <div v-if="!isGenderClicked">
        <h2>Please choose your gender to proceed:</h2>

        <div class='gender-icons'>
          <div class='male' @click='chooseGender(1)'>
            <img
              src='../assets/svg/gender_male.svg'
              alt='Male Icon'
            />
            <p>Male</p>
          </div>

          <div class='female' @click='chooseGender(2)'>
            <img
              src='../assets/svg/gender_female.svg'
              alt='Female Icon'
            />
            <p>Female</p>
          </div>
        </div>
      </div>

      <div v-if='isGenderClicked' class='fashion-cards'>
        <div
          v-for='fashion in getFashionData'
          :key='fashion.id'
          @click='addCard(fashion)'
          class='cards'
          :class='{ active: isClicked && fashion.id === getCardId }'
        >
          <div v-for='card in fashion.data' :key='card.id' class='card-data'>
            <Card
              :cardId='card.id'
              :name='card.name'
              :description='card.description'
              :price='card.price'
              :thumbnail='card.thumbnail'
            />
          </div>

          <div v-if='checkAndCompare(fashion.id)' class='checkmark'>
            <img
              src='../assets/svg/icons/icon-checkmark.svg'
              alt='Checkmark Icon'
            />
          </div>
          <hr />

          <div class='total-cost'>
            <p>Total Cost</p>
            <h3>${{ total(fashion.id) }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { screens } from '../data/data.json';
import store from '../store/index';
import Card from './Card.vue';
import '@/assets/stylesheets/fashion/_fashion.scss';

export default {
  name: 'QuestionScreen',
  components: {
    Card,
  },
  setup() {
    const cards = [
      screens.realEstate,
      screens.carsForSale,
    ];
    const RENT_CAR_SCREENS = 2;
    const FASHION_SCREEN = 3;

    const getCounter = computed(() => store.getters.getCounter);
    const getFashionData = computed(() => store.getters.getFashionData);
    const getCardId = computed(() => store.getters.getCardId);
    const isGenderClicked = computed(() => store.getters.getGenderOption);
    const isClicked = computed(() => store.getters.getIsClicked);

    function chooseGender(option) {
      store.dispatch('setFashionOption', option);
    }

    function total(id) {
      const data = store.getters.getFashionData.filter((item) => item.id === id);
      const sum = data[0].data.reduce((t, c) => t + c.price, 0);
      return sum;
    }

    function addCard(screen) {
      store.dispatch('addCard', JSON.parse(JSON.stringify(screen)));
    }

    function checkAndCompare(id) {
      return isClicked.value === true && id === store.getters.getCardId;
    }

    return {
      cards,
      isClicked,
      RENT_CAR_SCREENS,
      FASHION_SCREEN,
      getCounter,
      getFashionData,
      getCardId,
      isGenderClicked,
      total,
      chooseGender,
      addCard,
      checkAndCompare,
    };
  },
};
</script>

<style lang='scss' scoped>
.components {
  height: 100%;
  min-height: 100vh;
  padding-bottom: 80px;

  @media screen and (min-width: 1000px) {
    padding: 0 100px 100px;
  }
}

.flex-component {
  display: flex;
  flex-wrap: wrap;

  @media screen and (min-width: 1000px) {
    display: grid;
    grid-template-columns: repeat(3, auto);
  }

  .card-width {
    width: 100%;

    @media screen and (min-width: 1000px) {
      width: unset;
    }
  }
}

h2 {
  padding: 10% 0;
  width: 90%;
  margin: auto;
  font-size: 22px;

  @media screen and (min-width: 1000px) {
    padding: 0 0 20px 0;
    margin-bottom: 30px;
    font-size: 30px;
  }
}
</style>
