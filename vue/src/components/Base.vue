<template>
  <div>
    <div class="content" v-bind:class="{'distort': isGlitched}">

      <header class="content__header">
        <slot v-if="$slots.header" name="header"></slot>
      </header>
      <main class="content__main">
        <slot v-if="$slots.main" name="main"></slot>
      </main>
      <footer class="content__footer">
        <slot v-if="$slots.footer" name="footer"></slot>
      </footer>

      <audio v-if="bootSound" ref="bootSound" preload hidden>
        <source :src=getBootSound type="audio/ogg">
      </audio>

    </div>
    <div>
      <slot v-if="$slots.background" name="background"></slot>
    </div>
  </div>

</template>

<script>

export default {
  name: 'Base',

  data: () => ({
    isGlitched: false
  }),

  props: {
    muted: {
      type: Boolean,
      default: false
    },
    distorted: {
      type: Boolean,
      default: true,
    },
    bootSound: {
      type: String,
      default: 'turnon'
    }
  },

  methods: {
    distort() {
      const delay = Math.floor(Math.random() + 1 * 20 * 1000);
      setTimeout(() => this.setGlitched(), delay);
      setTimeout(() => this.distort(), delay);
    },
    setGlitched() {
      this.isGlitched = true;
      setTimeout(() => this.isGlitched = false, 1500);
    },
    getAudio(name) {
      return require(`../assets/sound/${name}.ogg`);
    },
  },

  computed: {
    getBootSound() {
      return this.getAudio(this.bootSound);
    },
  },

  mounted() {
    if (this.distorted) { this.distort() }
    if (!this.muted) { this.$refs.bootSound.play() }
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