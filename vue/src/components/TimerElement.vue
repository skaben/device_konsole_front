<template>
  <div class="timer">
    <div class="timer__main">{{time}}</div>
  </div>
</template>

<script>
export default {

  data: () => ({
    time: ''
  }),

  props: {
    timer: {
      type: Number,
      default: 0
    },
  },

  methods: {
    start() {
      this.$emit('started');
      this.counter = setInterval(() => {
        if (this.timer > 0) {
          this.time = `${--this.timer}`;
        } else {
          this.stop();
        }
      }, 1000);
    },

    stop() {
      this.time = '';
      clearInterval(this.counter);
      this.$emit('stopped');
    }
  }

}
</script>
