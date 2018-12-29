<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'app',
  methods: {
    getEnum() {
      this.$store.dispatch('getEnum')
    },
    getConstant() {
      this.$store.dispatch('getConstant')
    },
  },
  created() {
    this.$nextTick(() => {
      this.getEnum();
      this.getConstant();
    });
  },
};
</script>

<style lang="scss">
  #app {
    height: 100%;
    background: #f7f7f7;
    overflow: hidden;
  }
</style>
