<template>
  <div v-masonry-tile class="max-w-sm rounded overflow-hidden shadow-lg relative photo-card mb-5">
    <img class="w-full object-cover h-full" :src="imageSrc" :alt="imageDesc">

    <div class="details w-full p-3 pb-6 text-white text-left">
      <h3 class="font-normal text-xl">{{ author }}</h3>
      <p class="text-base">{{ location }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PhotoCard extends Vue {
  @Prop() private imageSrc!: string;
  @Prop() private author!: string;
  @Prop() private location!: string;
  @Prop() private imageDesc!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.details {
  position: absolute;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4), rgba(0,0,0,0.01));
}
</style>
