<template>
  <div class="application">
    <loading-view></loading-view>
  </div>
</template>

<script>
import LoadingView from './components/LoadingView.vue';
import { mapActions, mapState } from 'vuex'

export default {
  name: 'terminal',

  components: {
    LoadingView,
  },

  computed: {
  },

  mounted() {
    this.$store.dispatch('getConfig')
    console.log(this.$store.state);
  }

}

</script>

<style lang="scss">
@import './styles/main';
</style>
