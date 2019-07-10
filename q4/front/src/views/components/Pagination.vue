<template>
  <p class="text-center pagination">
    <button v-if="page>1" type="button" class="btn" @click="prevPage">&larr;</button>
    <button
      v-for="(n, index) in pages" :key="index"
      type="button"
      :class="page===n ? 'btn active' : 'btn'"
      @click="gotoPage(n)">
      {{ n }}
    </button>
    <button v-if="page<pages" type="button" class="btn" @click="nextPage">&rarr;</button>
  </p>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pages: {
      type: Number,
      required: true
    }
  },
  data: ()=>{
    return {
      page: 1,
    }
  },
  methods: {
    gotoPage(pageNumber) {
      this.$emit('gotopage', pageNumber);
      this.page = pageNumber;
    },
    nextPage() {
      this.gotoPage(this.page+1);
    },
    prevPage() {
      this.gotoPage(this.page-1);
    },
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/scss/constants";

  .pagination {
    padding: 2rem 0;

    .btn {
      padding: .3rem 1rem;

      &.active {
        background: $white;
        border-color: $yellow;
        color: $yellow;
        cursor: default;
      }

      & + .btn {
        margin-left: .3rem;
      }
    }
  }
</style>
