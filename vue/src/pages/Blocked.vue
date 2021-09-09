<template>
  <Base class="content">
    <template #header>
      <text-bar :message="headerMessage"></text-bar>
      <div class="hint">
        <vue-typer
            :text="hintMessage"
            :shuffle="true"
            :type-delay="25"
            :pre-erase-delay="5000"
            erase-style="clear"
        ></vue-typer>
      </div>
    </template>
    <template #main>
      <loading-mech :speed="30" color="rgb(250, 34, 23)"></loading-mech>
    </template>
    <template #footer>
      <text-bar :message="footerMessage"></text-bar>
      <text-bar message="+++ TU REMOVERE CONATUS ET POTENTIAM ET POTESTATEM SAEPE REPONERE +++"></text-bar>
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
    hintMessage() {
      return '11010000 10111000 11010001 10000001 11010000 10111111 11010000 10111110 11010000 10111011 11010001 ' +
          '10001100 11010000 10110111 11010001 10000011 11010000 10111001 11010001 10000010 11010000 10110101 ' +
          '00100000 11010000 10111000 11010000 10111101 11010001 10000100 11010000 10111110 11010001 10000000 ' +
          '11010000 10111100 11010000 10110000 11010001 10000110 11010000 10111000 11010001 10001110 00100000 ' +
          '11010000 10111000 11010000 10110111 00100000 11010000 10111100 11010000 10110000 11010000 10111101 ' +
          '11010001 10000011 11010000 10110000 11010000 10111011 11010000 10110000 00100000 11010000 10111110 ' +
          '00100000 11010001 10000000 11010000 10110101 11010000 10110110 11010000 10111000 11010000 10111100 ' +
          '11010000 10110000 11010001 10000101 00100000 11010001 10000000 11010000 10110000 11010000 10110001 ' +
          '11010000 10111110 11010001 10000010 11010001 10001011 00100000 11010001 10000001 11010000 10111000 ' +
          '11010001 10000001 11010001 10000010 11010000 10110101 11010000 10111100 11010001 10001011 '
    }
  },
}

</script>

<style lang="scss" scoped>
@import '../styles/distort';

.textbar {
  display: flex;
  letter-spacing: 1px;
  font-size: 1.25rem;
}

.textbar div:nth-child(1) {
  flex-grow: 1;
}

.hint {
  max-width: 27.5rem;
  margin-top: 7rem;
  .textbar {
    font-size: .875rem;
  }
}

</style>