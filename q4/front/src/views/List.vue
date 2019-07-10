<template>
  <div class="container">
    <h1 class="title">Top books of all time</h1>
    <div class="books">
      <p v-if="isLoading" class="text-center">Loading...</p>
      <ul v-else>
        <li v-for="(book, index) in books" class="book" :key="book.slug">
          <list-book :book="book" :index="index" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ListBook from "./components/ListBook";

export default {
  name: "List",
  components: {
    ListBook,
  },
  data () {
    return {
      isLoading: false,
      page: 0,
    }
  },
  computed: {
    ...mapState(['books']),
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
