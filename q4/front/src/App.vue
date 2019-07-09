<template>
  <component :is="activeView"></component>
</template>

<script>
import { mapState } from 'vuex';
import List from './views/List';
import Book from './views/Book';

export default {
  name: 'app',

  components: {
    List,
    Book,
  },

  computed: {
    ...mapState(['book']),

    activeView () {
      // No router yet, so let's simply make views switchable, depending on the store state:
      // if store.book is not empty, show the Book View
      return Object.keys(this.book).length ? Book : List;
    },
  },
}
</script>

<style lang="scss">
  @import "assets/scss/app";
</style>
