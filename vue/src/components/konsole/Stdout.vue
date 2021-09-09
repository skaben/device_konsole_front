<template>
  <div class="konsole-stdout">
    <span class="timestamp">{{ message.time }}</span>
    <span class="prompt">{{ prompt }}</span>
    <span :class="{ response: this.message.response }">{{ content }}</span>
  </div>
</template>

<script>
export default {
  name: "Stdout",
  props: {
    message: {
      type: Object,
      default: {
        content: '',
        response: false,
      }
    },
  },

  computed: {
    prompt() {
      return this.message.response ? "<<" : ">>";
    },
    content() {
      return this.message.content || '';
    }
  }

}
</script>
<style lang="scss">
@import '../../styles/variables';

  .konsole-stdout {
    display: flex;
  }

  .timestamp {
    margin-right: .25rem
  }

  .prompt {
    font-weight: bold;
    margin-right: .75rem;
  }
  .response {
    color: darken($main-green, 10%)
  }

</style>