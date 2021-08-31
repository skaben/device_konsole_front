<template>
  <Base class="content">
    <template #header><text-bar :message="headerMessage"></text-bar></template>
    <template #main>
      <loading-mech :speed="30" color="rgb(250, 34, 23)"></loading-mech>
    </template>
    <template #footer>
      <text-bar :message="footerMessage"></text-bar>
    </template>
    <template #background>
      <background
          :hue=190
          :opacity=85
          :brightness=120
      ></background>
    </template>
  </Base>
</template>

<script>
import Background from "../components/Background.vue";
import LoadingMech from '../components/LoadingMech.vue';
import TextBar from '../components/TextBar.vue';
import Base from '../components/Base.vue';

export default {
  name: 'pageBlocked',

  components: {
    Base,
    TextBar,
    LoadingMech,
    Background
  },

  props: {
    header: String,
    footer: String
  },

  computed: {
    headerMessage() {
      return this.header || this.$store.state.config.header;
    },
    footerMessage() {
      return this.footer || this.$store.state.config.footer;
    },
  },
}

</script>

<style lang="scss" scoped>
@import '../styles/distort';

.textbar {
  display: flex;
}

.textbar div:nth-child(1) {
  flex-grow: 1;
}

</style>