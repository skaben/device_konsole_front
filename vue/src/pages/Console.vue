<template>
  <Base class="content">
    <template #header>:: INPUT INTERFACE KONSOLE</template>
    <template #footer>

    </template>
    <template #background>
      <background
          :hue=315
          :opacity=75
          :brightness=200
      ></background>
    </template>
  </Base>
</template>

<script>
import Base from "../components/Base";
import Background from "../components/Background";

export default {
  components: {
    Base,
    Background,
  },

  computed: {
    toggled () {
      return this.$store.getters.toggler
    }
  },

  watch: {
    toggled(newVal) {
      this.push(`toggled to ${newVal}`)
    }
  }

}
</script>

<style lang="scss">
@import '../styles/main';
  ::-webkit-scrollbar {
    width: 12px;               /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.5);        /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(243, 255, 236, 0.3);    /* color of the scroll thumb */
    border: 1px solid $main-green;  /* creates padding around scroll thumb */
  }
</style>