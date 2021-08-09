<template>
  <div class="application">
    <loading-view></loading-view>
  </div>
</template>

<script>
import LoadingView from './components/LoadingView.vue';

export default {
  name: 'terminal',

  components: {
    LoadingView,
  },

  computed: {
  },

  async mounted() {
    await this.$store.dispatch('getConfig')
    await this.$store.dispatch('getGame')
    await this.$store.dispatch('getMenu')
  }

}

</script>

<style lang="scss">
@import './styles/main';
</style>
