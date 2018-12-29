<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters({
      userName: 'handleUserAccount',
    }),
  },
  watch: {
    '$route'(to, from) {
      if (to.name !== 'login') {
        this.getEnum();
        this.getConstant();
      }
    },
  },
  created() {
    this.$nextTick(() => {
    });
  },
};
</script>

<style lang="scss">
  html,body{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  #app {
    height: 100%;
    background: #f7f7f7;
    overflow: hidden;
  }
</style>
