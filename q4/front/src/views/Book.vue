<template>
  <div class="container">
    <div class="book">
      <div class="head">
        <div class="head__title">
          <h2 class="title">{{ book.title }}</h2>
          <p class="author">{{ book.author }}</p>
        </div>
        <div class="head__actions">
          <span>Upvoted {{ book.upvotes }} times</span>
          <span v-if="book.upvoted" class="btn btn-done">Upvoted</span>
          <button v-else type="button" class="btn">Upvote</button>
        </div>
      </div>
      <div class="cover">
        <img :src="book.cover" alt="">
      </div>
      <div class="synopsis">
        <h3>Synopsis</h3>
        <div v-html="synopsisFormatted"></div>
      </div>
      <p class="text-center">
        <button type="button" class="btn" @click="handleListClick">&larr; Back to list</button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { linesToP } from './../utils';

export default {
  name: "Book",
  data () {
    return {
      isLoading: false,
    }
  },
  computed: {
    ...mapState(['books', 'book']),
    synopsisFormatted () {
      if (this.book && this.book.synopsis) {
        return linesToP(this.book.synopsis);
      } else {
        return '';
      }
    }
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
    ...mapActions(['resetBook']),

    handleListClick() {
      this.resetBook();
    }
  },
}
</script>

<style scoped lang="scss">
  @import "../assets/scss/constants";
  @import "../assets/scss/mixins";

  .container {
    background: $white;
  }

  .book {
    padding: $content-padding;
  }

  .head {
    display: flex;
    width: 100%;

    &__actions {
      margin-left: auto;
      flex: 0;
      white-space: nowrap;
      padding-top: .65rem;

      .btn {
        margin-left: 1rem;
      }
    }
  }

  .title {
    flex: 1;
    font-weight: 700;
    color: $yellow-dark;
  }

  .author {
    font-style: italic;
  }

  .cover {
    width: 40%;
    margin: 1rem auto 0 auto;

    img {
      width: 100%;
      border-radius: $radius;
      box-shadow: 0 5px 10px rgba(0,0,0,.25);
    }
  }

  .synopsis {
    margin-top: 2rem;

    h3 {
      font-weight: 700;
    }
  }
</style>
