<template>
  <Base :muted="true" :distorted="false" class="content">
    <template #header></template>
    <template #main><loading-mech color="#333" :speed="0"></loading-mech></template>
    <template #footer>
      <text-bar message=":: ИСТОЧНИК ЭНЕРГИИ ОТКЛЮЧЕН, РЕЖИМ КОНСЕРВАЦИИ"
                text-class="hdr-text-powered-off"
      ></text-bar>
    </template>
  </Base>
</template>

<script>
import TextBar from '../components/TextBar.vue';
import Base from '../components/Base.vue';
import LoadingMech from "../components/LoadingMech";

export default {
  name: 'powerOff',

  components: {
    LoadingMech,
    Base,
    TextBar,
  },

}

</script>
<style lang="scss">
  .hdr-text-powered-off {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.25rem;
    font-weight: bold;
    color: #444444;
  }
</style>