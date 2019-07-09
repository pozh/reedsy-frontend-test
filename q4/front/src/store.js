import Vue from 'vue';
import Vuex from 'vuex';
import { get } from './utils';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    books: [],
    book: {},
    requests: 0,
  },

  getters: {
    book: state => state.book,
    books: state => state.books,
    requests: state => state.requests,
  },

  mutations: {
    GET_BOOKS(state, records) {
      state.books = records;
    },
    GET_BOOK(state, record) {
      state.book = record;
    },
  },

  actions: {
    async fetchBooks({commit, dispatch}) {
      const data = await get('books');
      if (data.books === 'success') {
        commit("GET_BOOKS", data.books);
      }
    },

    async fetchBook({commit, dispatch}, slug) {
      const data = await get(`books/${slug}`);
      if (data.status === 'success') {
        commit("GET_BOOK", data.book);
      }
    },
  }

});

export default store;
