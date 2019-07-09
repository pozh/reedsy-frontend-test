<template>
  <div>
    <h1 class="text-center">Top Books of all time</h1>
    <h2 v-if="isLoading">Loading</h2>
    <ul v-else>
      <li v-for="book in books">
        <h3>{{ book.title }}</h3>
        <p><strong>{{ book.author }}</strong></p>
        <p>{{ book.synopsis }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "List",
  data () {
    return {
      isLoading: true,
      page: 0,
    }
  },
  computed: {
    ...mapState(['books']),
  },
  created () {
    this.isLoading = true;
    const _this = this;
    this.fetchBooks()
    .then(()=>{_this.isLoading=false;});
  },
  methods: {
    ...mapActions(['fetchBooks']),
  }
}
</script>

<style scoped lang="scss">
</style>
-
