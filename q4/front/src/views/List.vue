<template>
  <div class="container">
    <h1 class="title">Top books of all time</h1>
    <div class="books">
      <p v-if="isLoading" class="text-center">Loading...</p>
      <div v-else>
        <ul>
          <li v-for="(book, index) in pageBooks" class="book" :key="book.slug">
            <list-book :book="book" :index="index+(page-1)*booksPerPage" />
          </li>
        </ul>
        <pagination
          v-if="booksPerPage < books.length"
          :page="page"
          :pages="Math.ceil(books.length / booksPerPage)"
          @gotopage="(n)=>gotoPage(n)"
        />
      </div>
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
    }
  },
  computed: {
    ...mapState(['books']),
    pageBooks: function() {
      const start = (this.page-1)*this.booksPerPage;
      return this.books.slice(start, start+this.booksPerPage);
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
</style>
