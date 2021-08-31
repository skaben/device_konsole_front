<template>
  <div class="application">
    <div class="screen">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import Blocked from './pages/Blocked.vue';
import PowerOff from './pages/PowerOff.vue';
import Console from "./pages/Console";

export default {
  name: 'terminal',

  components: {
    "blocked": Blocked,
    "off": PowerOff,
    "active": Console
  },

  computed: {
    currentComponent() {
      return this.$store.getters.checkState || "off"
    },
  },

  methods: {
    getConfig() {
      this.$store.dispatch('getConfig')
      this.$store.dispatch('getMenu')
    },
    toggleStore() {
      this.$store.dispatch('toggle')
    }
  },

  async mounted() {
    await this.$store.dispatch('getConfig')
    setInterval(() => this.getConfig(), 5000)
    setInterval(() => this.toggleStore(), 2000)
  }

}

</script>

<style lang="scss">
@import './styles/main';
</style>
