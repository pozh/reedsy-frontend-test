<template>
  <div class="book">
    <div class="book__info">
      <h3 class="book__title" @click="handleBookClick(book.slug)">
        {{ index+1 }}. {{ book.title }}
        <span class="book__rating">({{ book.rating }}/10)</span>
      </h3>
      <p class="book__author">{{ book.author }}</p>
      <p class="book__synopsis" v-html="synopsisFormat(book.synopsis)"></p>
      <p class="book__actions">
        <span v-if="book.upvoted" class="btn btn-done">Upvoted</span>
        <button v-else type="button" class="btn">Upvote</button>
        <span> Upvoted {{ book.upvotes }} times</span>
      </p>
    </div>

    <div class="book__image">
      <img :src="book.cover" alt="" @click="handleBookClick(book.slug)">
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { linesToP } from './../../utils';

export default {
  name: "ListBook",
  props: {
    book: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
  },
  methods: {
    ...mapActions(['fetchBook']),

    synopsisFormat(str) {
      const limit = str.indexOf(' ', 200);
      const strTruncated = str.slice(0, limit) + (str.length > limit ? '...' : '');
      return linesToP(strTruncated);
    },

    handleBookClick(slug) {
      this.fetchBook(slug);
    }
  }

}
</script>

<style scoped lang="scss">
  @import "../../assets/scss/constants";
  @import "../../assets/scss/mixins";

  .book {
    padding: $content-padding;
    display: flex;

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
        cursor: pointer;
        transition: all .4s;

        &:hover {
          transform: scale(1.02, 1.02);
        }
      }
    }

    &__title {
      color: $yellow-dark;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        color: $yellow;
      }
    }

    &__rating {
      color: $black;
      font-size: .75em;
      font-weight: normal;
    }

    &__author {
      color: $dark;
      font-style: italic;
    }

    &__synopsis {
      font-size: 1.2em;
    }

    .btn {
      margin-right: .7rem;
    }
  }
</style>
