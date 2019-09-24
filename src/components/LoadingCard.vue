<template>
    <facebook-loader class="max-w-sm rounded overflow-hidden shadow-lg relative"></facebook-loader>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FacebookLoader } from 'vue-content-loader';

@Component({
  components: {
    FacebookLoader,
  },
})
export default class LoadingCard extends Vue {}
</script>


<style lang="scss">
  .grid-area {
    display: grid;
    grid-template-rows: repeat(3, minmax(auto, 1fr));
    grid-template-columns: repeat(3, minmax(auto, 1fr));
    justify-items: center;
    gap: 1em;
    &.images {
      margin-top: -40px;
    }
  }
  @media screen and (max-width: 767px) {
    .grid-area {
      display: grid;
      grid-template-rows: repeat(2, minmax(auto, 1fr));
      grid-template-columns: repeat(2, minmax(auto, 1fr));
      &.images {
        margin-top: -20px;
      }
    }
  }
  @media screen and (max-width: 360px) {
    .grid-area {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: auto;
      &.images {
        margin-top: 1.25rem;
      }
    }
  }
</style>