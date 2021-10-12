<template>
  <div
    class="card"
    :class="{ 'card-margin': checkOptionsProp }"
    @click="addCard(cardId)"
  >
    <div class="card-location" v-if="checkOptionsProp && options.info.exists === true">
      <img
        :src="
          require(`@/assets/svg/${options.info.icon.dir}/${options.info.icon.filename}`)
        "
        alt="Card Location Logo"
      />
      <p>{{ options.info.text }}</p>
    </div>

    <div class="card-image" :class="{ active: checkAndCompare() }">
      <img
        v-if="checkOptionsProp"
        :src="require(`@/assets/images/${thumbnail.dir}/${thumbnail.filename}`)"
        :alt="cardId"
        class="main-img"
      />
      <div v-if="checkOptionsProp && checkAndCompare() && elements === false" class="checkmark">
        <img src="../assets/svg/icons/icon-checkmark.svg" alt="Checkmark Icon"/>
      </div>
      <img
        v-if="!checkOptionsProp"
        :src="require(`@/assets/images/fashion/${thumbnail.dir}/${thumbnail.filename}`)"
        :alt="cardId"
        class="fashion-image"
      />
    </div>

    <div class="card-info">
      <div class="left">
        <h4
          v-if="checkOptionsProp"
          class="card-name">
            {{ name }}
        </h4>
        <h4 v-else class="fashion-name">{{ name }}</h4>
        <div class="agent" v-if="checkOptionsProp && options.agent.exists === true">
          <img
            :src="
              require(`@/assets/images/${options.agent.avatar.dir}/${options.agent.avatar.filename}`)
            "
            alt="Agent Icon"
          />
          <p>{{ options.agent.name }}</p>
        </div>

        <div class="description" v-if="description !== null">
          <p v-if="checkOptionsProp" class="car-description">{{ description }}</p>
          <p v-else class="clothing-description">{{ description }}</p>
        </div>

        <div v-if="checkOptionsProp && options.rating.exists === true">
          <div class="stars" v-for="star in options.rating.value" :key="star">
            <img src="../assets/svg/icons/icon-star-filled.svg" alt="Filled Star Icon"/>
          </div>

          <div class="stars" v-for="star in 5 - options.rating.value" :key="star">
            <img src="../assets/svg/icons/icon-star-empty.svg" alt="Empty Star Icon" />
          </div>

          <div class="stars">
            <p class="reviews">{{ options.rating.review_amount }} reviews</p>
          </div>
        </div>
      </div>

      <div class="right">
        <div v-if="checkOptionsProp">
          <h3 v-if="options.rating.exists === true" class="rent-weekly-value">
            ${{ options.price.weekly_value }}<span> per week</span>
          </h3>
          <h3 v-else class="car-total-value">${{ options.price.value }}</h3>
        </div>
        <h3 v-if="!checkOptionsProp" class="clothing-price">${{ price }}</h3>
      </div>

      <div class="car-info" v-if="checkOptionsProp && options.meta.exists === true">
        <ul class="menu">
          <li v-for="item in options.meta.items" :key="item">{{ item }}</li>
        </ul>

        <img
          src="../assets/svg/icons/icon-tooltip.svg"
          alt="Tooltip Icon"
          @click="showElements()"
          class="tooltip"
        />

        <div class="car-additional-info" v-if="elements === true">
          <hr>
          <div v-for="i in options.tooltip.data" :key="i" class="elements">
            <p>{{i.name.replace('%s', 'Weekly')}}</p>
            <p>${{i.value}}</p>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { computed, ref } from 'vue';
import store from '../store/index';
import { screens } from '../data/data.json';
import '@/assets/stylesheets/card/_card-info.scss';

export default {
  name: 'Card',
  props: ['cardId', 'screenId', 'options', 'name', 'description', 'price', 'thumbnail'],

  setup(props) {
    const elements = ref(false);
    const RENT_SCREEN = 1;
    const CARS_SCREEN = 2;
    const cards = [
      screens.realEstate,
      screens.carsForSale,
    ];

    const getCardId = computed(() => props.cardId);
    const getCounter = computed(() => store.getters.getCounter);
    const checkOptionsProp = computed(() => typeof props.options !== 'undefined');

    function showElements() {
      elements.value = !elements.value;
      return elements.value;
    }

    function addCard(cardId) {
      let screen = '';
      cards.forEach((card) => {
        if (card.data.find((c) => c.id === cardId)) screen = card.data.find((c) => c.id === cardId);
      });

      if (getCounter.value === RENT_SCREEN) {
        store.dispatch('addCard', JSON.parse(JSON.stringify(screen)));
      } else if (getCounter.value === CARS_SCREEN) {
        if (elements.value === false) {
          store.dispatch('addCard', JSON.parse(JSON.stringify(screen)));
        }
      }
    }

    function checkAndCompare() {
      return store.getters.getIsClicked === true && getCardId.value === store.getters.getCardId;
    }

    return {
      elements,
      showElements,
      addCard,
      checkAndCompare,
      checkOptionsProp,
    };
  },
};
</script>

<style lang="scss">
.card {
  width: 90%;
  margin: 15px auto;
  border-radius: 20px;
  overflow: hidden;
  color: #143656;
  position: relative;
  padding-bottom: 40px;
  cursor: pointer;

  &.card-margin {
    @media screen and (min-width: 1000px) {
      width: 95%;
      padding-bottom: 50px;
    }
  }

  .card-location {
    position: absolute;
    z-index: 1;
    padding: 0 18px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.66);
    backdrop-filter: blur(20px);
    top: 6%;
    left: 6%;
    display: flex;
    flex-direction: row;

    p {
      display: inline-block;
      margin-left: 4px;
      font-size: 11px;
      font-family: var(--rubik);
      font-weight: 300;
    }
  }

  .card-image {
    position: relative;
    padding-bottom: 20px;
    margin-bottom: 20px;

    img {
      &.main-img {
        width: 100%;
        object-fit: contain;
      }

      &.fashion-image {
        width: 100%;
        position: relative;
        z-index: 1;

        @media screen and (min-width: 700px) and (max-width: 1920px) {
          padding-bottom: 20px;
        }
      }
    }
  }
}
</style>
