<template>
  <span v-show="visible"
        class="energy-widget">+++ ВСЕГО: {{ slotsTotal }} ++ НЕ РАСПРЕДЕЛЕНО: {{ slotsLeft }} {{ contourInfo }} +++</span>
</template>

<script>
export default {
  name: "EnergyWidget",

  computed: {
    slotsTotal() {
      return this.$store.state.energyState.slots
    },
    slotsLeft() {
      return this.slotsTotal - this.energyLoad.length
    },
    energyLoad() {
      const load = this.$store.state.energyState.load
      return load ? Object.keys(load) : []
    },
    visible() {
      const alert = parseInt(this.$store.state.config.alert, 10);
      return alert > 1 && alert < 6
    },
    contourInfo() {
      return this.slotsLeft !== this.slotsTotal ? "++ КОНТУРЫ: " + this.energyLoad.join(', ') : '';
    }
  }

}
</script>

<style scoped>
.energy-widget {
  text-transform: uppercase;
}
</style>