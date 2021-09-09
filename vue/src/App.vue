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
import AccessLog from "./pages/AccessLog";

export default {
  name: 'terminal',

  components: {
    "blocked": Blocked,
    "off": PowerOff,
    "dungeon": PowerOff,
    "console": Console,
    "log": AccessLog,
  },

  computed: {
    currentComponent() {
      return this.$store.getters.checkState || "off"
    },
  },

  methods: {
    getConfig() {
      this.$store.dispatch('getConfig')
    },
  },

  async mounted() {
    await this.$store.dispatch('getConfig')
    setInterval(() => this.getConfig(), 5000)
  }

}

</script>

<style lang="scss">
@import './styles/main';
</style>
