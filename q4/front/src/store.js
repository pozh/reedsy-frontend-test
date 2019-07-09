import Vue from 'vue';
import Vuex from 'vuex';
import { get } from './utils';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    books: [],
    book: {},
  },

  getters: {
    book: state => state.book,
    books: state => state.books,
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
      if (data.books && data.books.length) {
        commit("GET_BOOKS", data.books);
      }
    },

    async fetchBook({commit, dispatch}, slug) {
      const data = await get(`books/${slug}`);
      if (data.book) {
        commit("GET_BOOK", data.book);
      }
    },
  }
});

export default store;
