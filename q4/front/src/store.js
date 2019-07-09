import Vue from 'vue';
import Vuex from 'vuex';
import { get } from './utils';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    books: [],
    book: {},
  },

  mutations: {
    GET_BOOKS(state, records) {
      state.books = records;
    },
    GET_BOOK(state, record) {
      state.book = record;
    },
    RESET_BOOK(state, record) {
      state.book = {};
    },
  },

  actions: {
    async fetchBooks({commit, dispatch}) {
      const data = await get('books');
      if (data.books && data.books.length) {
        commit("GET_BOOKS", data.books);
      }
    },

    async fetchBook({commit, dispatch}, slug) {
      const data = await get(`books/${slug}`);
      if (data.status!=='error') {
        commit("GET_BOOK", data);
      } else {
        log(data.message);
      }
    },

    resetBook({commit, dispatch}) {
      commit("RESET_BOOK");
    }
  }
});

export default store;
