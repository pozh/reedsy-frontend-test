<template>
  <div id="app">
    <list />
  </div>
</template>

<script>
import List from './views/List';

export default {
  name: 'app',
  components: {
    List,
  }
}
</script>

<style lang="scss">
  @import "assets/scss/app";
</style>
