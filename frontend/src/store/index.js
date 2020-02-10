import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: {
      _id: [],
      name: [],
      author: [],
      price: [],
      amount: 0,
      imgUrl: [],
    },
  },
  getters: {
    cart(state) {
      return state.cart;
    }
  },
  mutations: {
    ADD_CART(state, payload) {
      state.cart._id.push(payload._id);
      state.cart.name.push(payload.name);
      state.cart.author.push(payload.author);
      state.cart.price.push(payload.price);
      state.cart.imgUrl.push(payload.imgUrl);
      state.cart.amount += payload.price;
    }
  },
  actions: {
    addToCart({commit}, payload) {
      commit('ADD_CART', payload);
    }
  },
  modules: {
  }
})
