<template>
  <div id="home">

    <AppHeader :withSearch="true" />
    
      <div class="mx-auto my-5 images" v-masonry gutter="20" transition-duration="0.3s" item-selector=".photo-card">
        <PhotoCard v-for="photo of photos" :key="photo.id"
          :imageSrc="photo.urls.regular"
          :author="photo.user.name"
          :location="photo.user.location"
          :imageDesc="photo.description"
        />
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PhotoCard from '../components/PhotoCard.vue';
import AppHeader from '../components/AppHeader.vue';
import LoadingCard from '../components/LoadingCard.vue';
import { IPhoto } from '../interfaces/IPhoto';
import axios from 'axios';
import { UNSPLASH_API_KEY } from '../constants';
import search from '../search';
@Component({
  components: {
    PhotoCard,
    AppHeader,
  },
})
export default class Home extends Vue {
  public photos: IPhoto[] = [];
  constructor() {
    super();
    this.getPhotos('african');
  }
  getPhotos = async (query: string) => {
    try {
      const data = await search(query);
      this.photos.length = 0;
      this.photos.push(...data);
    } catch (error) {
      throw new Error('An error occurred\r' + error);
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
#home {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .images {
    margin-top: -40px;
    max-width: 1200px;
  }
  @media screen and (max-width: 767px) {
    .images {
      margin-top: -20px;
      padding-left: 20px;
    }
  }
  @media screen and (max-width: 360px) {
    .images {
      margin-top: -1.25rem;
      padding-left: 1.25rem;
      .photo-card {
        max-width: 300px;
      }
    }
  }

}
</style>
