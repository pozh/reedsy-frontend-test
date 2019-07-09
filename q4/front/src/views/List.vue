<template>
  <div class="container">
    <h1 class="title">Top books of all time</h1>
    <div class="books">
      <p v-if="isLoading" class="text-center">Loading...</p>
      <ul v-else>
        <li v-for="(book, index) in books" class="book" :key="book.slug">
          <div class="book__info">
            <h3 class="book__title">
              {{ index+1 }}. {{ book.title }}
              <span class="book__rating">({{ book.rating }}/10)</span>
            </h3>
            <p class="book__author">{{ book.author }}</p>
            <p class="book__synopsis">{{ book.synopsis }}</p>
            <p class="book__actions">
              <button type="button" class="btn" :disabled="book.upvoted">Upvote</button>
              <span> Upvoted {{ book.upvotes }} times</span>
            </p>
          </div>
          <div class="book__image">
            <img :src="book.cover" alt="">
          </div>
        </li>
      </ul>
    </div>
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
  @import "../assets/scss/constants";
  @import "../assets/scss/mixins";

  .title {
    text-align: center;
    font-weight: 700;
    color: $yellow;
    padding: 2rem 0;
  }

  .book {
    padding: $content-padding;
    display: flex;

    &:nth-of-type(odd) {
      background: $white;
    }

    &__info {
      flex: 1;
    }

    &__image {
      min-width: 20%;
      margin-left: $content-padding;
      flex: 0;

      img {
        @include light-shadow;
        border-radius: $radius;
      }
    }

    &__title {
      color: $yellow-dark;
      font-weight: 700;
    }

    &__rating {
      color: $black;
      font-size: .6em;
    }

    &__author {
      color: $dark;
      font-style: italic;
    }

    &__synopsis {
      font-size: 1.2em;
    }
  }
</style>
