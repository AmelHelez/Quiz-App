import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { screens } from '../data/data.json';
import { imageData, footerData } from '../data/appProps.json';

export default createStore({
  state: {
    counter: 0,
    savedCards: [],
    fashionData: [],
    total: 0,
    totalCost: 0,
    isClicked: false,
    genderChosen: false,
    cardId: 0,
    isReturned: false,
    imageProps: imageData,
    buttonText: footerData.buttonData,
  },

  plugins: [createPersistedState({
    key: 'appkey',
    storage: window.localStorage,
  })],

  mutations: {
    setCounter(state, value) {
      state.isReturned === false ? state.counter += 1 : state.counter = 4;
      if (value !== 0) state.counter = value;
    },

    setCardId(state) {
      const card = state.savedCards.find((x) => x.category_id === state.counter - 1);
      state.cardId = card.id;
    },

    setIsReturned(state) {
      state.isReturned = true;
    },

    setGenderChosenOption(state) {
      state.genderChosen = !state.genderChosen;
    },

    setTotalCost(state) {
      state.totalCost = 0;
      let cardValues = [];

      state.savedCards.forEach((card) => {
        if (card.category_id === 0) {
          if (card.options.tooltip.data.length !== 3) {
            cardValues = card.options.tooltip.data
              .filter((c) => typeof c.value === 'number' && !c.name.includes('Payment'));
            state.totalCost += card.options.price.weekly_value + cardValues.reduce((t, c) => t + c.value, 0);
          } else {
            cardValues = card.options.tooltip.data;
            state.totalCost += cardValues.reduce((t, c) => t + c.value, 0);
          }
        } else if (card.category_id === 1) state.totalCost += card.options.price.weekly_value;
        else {
          card.data.forEach((c) => {
            state.totalCost += c.price;
          });
        }
      });
    },

    storeFashionData(state, data) {
      state.fashionData = Object.assign([], data);
    },

    setCard(state, id) {
      state.cardId = id;
    },

    setIsClicked(state) {
      state.isClicked = true;
    },

    addCard(state, screen) {
      const data = state.savedCards.filter((item) => item.id === screen.id);

      if (data.length === 0) {
        if (state.savedCards.length === state.counter && state.isReturned === false) {
          state.savedCards = state.savedCards
            .filter((x) => x.id !== state.savedCards[state.counter - 1].id);
        } else if (state.isReturned === true && state.savedCards.length === 3) {
          state.savedCards = state.savedCards
            .filter((x) => x.category_id !== screen.category_id);
        }
        state.savedCards.push(screen);
      }
    },

    addTotal(state) {
      const realEstate = screens.realEstate.data;
      const carsForSale = screens.carsForSale.data;

      state.total = Math.max(...realEstate.map((estate) => estate.options.price.weekly_value))
      + Math.max(...carsForSale.map((estate) => estate.options.price.weekly_value));

      state.fashionData.forEach((fashion) => {
        fashion.data.forEach((data) => {
          state.total += data.price;
        });
      });
    },
  },

  actions: {
    setCounter({ commit, state }, value = 0) {
      commit('setCounter', value);

      if (value !== 0) {
        if (value === 3) commit('setGenderChosenOption');
        commit('setCardId');
        commit('setIsReturned');
        if (state.savedCards.length === 3) commit('setTotalCost');
      }
    },

    setFashionOption({ commit }, option) {
      commit('setGenderChosenOption');
      option === 1
        ? commit('storeFashionData', screens.fashion.male)
        : commit('storeFashionData', screens.fashion.female);
    },

    addCard({ commit, state }, card) {
      commit('setCard', card.id);
      commit('setIsClicked');
      commit('addCard', card);

      if (state.savedCards.length === 3) {
        commit('setTotalCost');
        commit('addTotal');
      }
    },
  },

  getters: {
    getCounter(state) {
      return state.counter;
    },

    getButtonText(state) {
      return state.buttonText;
    },

    getFashionData(state) {
      return state.fashionData;
    },

    getTotal(state) {
      return state.total;
    },

    getSavedCards(state) {
      return state.savedCards;
    },

    getTotalCost(state) {
      return state.totalCost;
    },

    getIsClicked(state) {
      return state.isClicked;
    },

    getCardId(state) {
      return state.cardId;
    },

    getIsReturned(state) {
      return state.isReturned;
    },

    getGenderOption(state) {
      return state.genderChosen;
    },

    getImageProperties(state) {
      return state.imageProps;
    },
  },
});
