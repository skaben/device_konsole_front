<template>
  <div class="textbar">
    <div class="textbar__main"><span :class="textClass">{{message}}</span></div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    textClass: {
      type: String,
      default: "hdr-text"
    }
  }
}
</script>
