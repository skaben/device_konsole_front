<template>
  <Base class="content">
    <template #header>
      <loading-mech additional-class="loading__svg-small loading__svg-left"></loading-mech>
      <aquila class="aquila-small" color="white" :opacity="0.1"></aquila>
      <div class="console-header">
        <vue-typer :text="headerMessage" :repeat="0"></vue-typer>
      </div>
      <loading-mech additional-class="loading__svg-small loading__svg-right"></loading-mech>
    </template>
    <template #footer>
      <div class="access-log" ref="history">
        <Stdout v-for="(log, index) in accessLog" :message="log"></Stdout>
      </div>
    </template>
    <template #background>
      <background
          :hue=350
          :opacity=75
          :brightness=120
      ></background>
    </template>
  </Base>
</template>

<script>
import Base from "../components/Base";
import Background from "../components/Background";
import LoadingMech from "../components/LoadingMech";
import Stdout from "../components/konsole/Stdout";
import Aquila from "../components/Aquila";

export default {
  components: {
    Aquila,
    Base,
    Background,
    LoadingMech,
    Stdout
  },

  data: () => ({
    accessLog: []
  }),

  computed: {
    headerMessage() {
      return `+++ SUMMA CONCESSIO ANNALIS +++ `
    },
  },

  methods: {
    getEventLog() {
      this.$store.dispatch("getAccessEvents")
    },
    scroll() {
      this.$refs.history.scrollTop = this.$refs.history.scrollHeight
    },
  },

  created() {
    this.$store.watch(
        () => {return this.$store.state.accessList},
        (newVal) => {
          console.log(this.accessLog)
          this.accessLog = newVal
          this.scroll()
        },
        {
          deep: true
        })
  },

  mounted() {
    this.getEventLog()
    setInterval(() => this.getEventLog(), 5000)
  }

}
</script>

<style lang="scss">
@import '../styles/typer';
@import '../styles/main';

.aquila {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -105;
}

.loading__svg-small {
  display: block;
  width: 150px;
  height: 150px;
  position: absolute;
  top: .25rem;
}

.loading__svg-left {
  left: 1.25rem;
}

.loading__svg-right {
  right: 1.25rem;
}

.console-header {
  width: 75vw;
  margin: auto;
  text-align: center;
}

.access-log {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 71vh;
  display: flex;
  flex-direction: column;
  padding-left: .75rem;
  padding-bottom: 1.15rem;
}

.aquila-small {
  position: absolute;
  top: 28%;
  left: 22.3%;
}

</style>