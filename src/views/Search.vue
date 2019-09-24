<template>
  <div id="search">
    <AppHeader :withSearch="false" :searchQuery="query" />
    <template>
      <div class="grid-area" ref="loadingCards">
        <LoadingCard v-for="i of [0,1,2,3,4,5]" :key="i" class="max-w-sm rounded overflow-hidden shadow-lg relative"></LoadingCard>
      </div>
    </template>

    <template>
      <div ref="photoCards" class="mx-auto my-5 images" v-masonry gutter="20" transition-duration="0.3s" item-selector=".photo-card">
        <PhotoCard v-for="photo of photos" :key="photo.id"
          :imageSrc="photo.urls.regular"
          :author="photo.user.name"
          :location="photo.user.location"
          :imageDesc="photo.description"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import router from '@/router';
import AppHeader from '@/components/AppHeader.vue';
import LoadingCard from '@/components/LoadingCard.vue';
import PhotoCard from "@/components/PhotoCard.vue";
import search from "../search";
import { IPhoto } from '../interfaces/IPhoto';

@Component({
  components: {
    AppHeader,
    LoadingCard,
    PhotoCard
  }
})
export default class Search extends Vue {
  public query: string = router.currentRoute.params.query;
  public photos: IPhoto[] = [];
  constructor() {
    super();
    this.loadPhotos();
  }
  public loadPhotos = async () => {
    if (!this.query) {
      return;
    }

    const data: IPhoto[] = await search(this.query);
    this.$refs.loadingCards.classList.add("hide");
    this.photos.push(...data);
  }
}
</script>

<style lang="scss" scoped>
.hide {
  display: none !important;
}
</style>

