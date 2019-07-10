<template>
  <div class="container">
    <h1 class="title">Top books of all time</h1>

    <div class="search">
      <input type="text" v-model="search" placeholder="Type to search for a book">
    </div>

    <p v-if="isLoading" class="text-center">Loading...</p>
    <div v-else>
      <ul>
        <li v-for="(book, index) in pageBooks" class="book" :key="book.slug">
          <list-book :book="book" :index="index+(page-1)*booksPerPage" />
        </li>
      </ul>
      <h2 v-if="!filteredBooks.length" class="text-center">No book found</h2>
      <pagination
        v-if="booksPerPage < filteredBooks.length"
        :page="page"
        :pages="Math.ceil(books.length / booksPerPage)"
        @gotopage="(n)=>gotoPage(n)"
      />
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ListBook from "./components/ListBook";
import Pagination from "./components/Pagination";

export default {
  name: "List",
  components: {
    Pagination,
    ListBook,
  },
  data () {
    return {
      isLoading: false,
      page: 1,
      booksPerPage: 3,
      search: '',
    }
  },
  computed: {
    ...mapState(['books']),
    pageBooks: function() {
      const start = (this.page-1)*this.booksPerPage;
      return this.filteredBooks.slice(start, start+this.booksPerPage);
    },
    filteredBooks: function() {
      if (!this.search) return this.books;
      else {
        const _search = this.search.toLowerCase();
        return this.books.filter(b=>(
          b.title.toLowerCase().indexOf(_search)>=0
            || b.synopsis.toLowerCase().indexOf(_search)>=0
        ));
      }
    },
  },
  created () {
    if (!this.books || !this.books.length) {
      this.isLoading = true;
      const _this = this;
      this.fetchBooks().then(()=>{
        _this.isLoading = false;
      });
    }
  },
  methods: {
    ...mapActions(['fetchBooks']),
    nextPage() {
      this.page++;
    },
    prevPage() {
      this.page--;
    },
    gotoPage(pageNumber) {
      this.page=pageNumber;
    },
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/scss/constants";
  @import "../assets/scss/mixins";

  .title {
    text-align: center;
    font-weight: 700;
    color: $yellow;
    padding: 2rem 0;
  }

  .book {
    &:nth-of-type(odd) {
      background: $white;
    }
  }

  .search {
    text-align: center;
    padding: 0 0 2rem 0;

    input {
      padding: .5rem 1rem;
      font-size: 1.1rem;
      border: 2px solid $yellow;
      width: 30rem;
      outline: none;
      border-radius: $radius;
    }
  }
</style>
