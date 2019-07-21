<template>
  <div id="home">

    <div id="header" class="bg-gray-500 p-8 sm:p-12 md:p-16 lg:p-24">
      <div class="search-input-field shadow-lg bg-white rounded p-3 pl-5 flex flex-row justify-left">
        <img src="../assets/search.svg" alt="search icon">
        <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
        <input class="h-full w-full ml-5" type="text" name="search" id="search" placeholder="Search for photo" @keyup.enter="getPhotos($event.target.value)">
      </div>
    </div>
    
    <div v-show="hasLoaded">
      <div class="grid-area images px-10 md:px-15 lg:px-24 my-5">
        <PhotoCard v-for="photo of photos" :key="photo.id"
          :imageSrc="photo.urls.regular"
          :author="photo.user.name"
          :location="photo.user.location"
          :imageDesc="photo.description"
        />
      </div>
    </div>

    <div v-show="isLoading">
      <div class="grid-area">
        <facebook-loader v-for="i of [0,1,2,3,4,5]" :key="i" class="max-w-sm rounded overflow-hidden shadow-lg relative"></facebook-loader>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FacebookLoader } from 'vue-content-loader';
import PhotoCard from '../components/PhotoCard.vue';
import { IPhoto } from '../interfaces/IPhoto';
import axios from 'axios';
import { UNSPLASH_API_KEY } from '../constants';
@Component({
  components: {
    PhotoCard,
    FacebookLoader,
  },
})
export default class Home extends Vue {
  public hasLoaded: boolean = false;
  public isLoading: boolean = false;
  public photos: IPhoto[] = [];
  constructor() {
    super();
    this.getPhotos('african');
  }
  public getPhotos = async (query: string) => {
    this.isLoading = true;
    const API_URL: string = 'https://api.unsplash.com';
    try {
      const res = await axios.get(
        `${API_URL}/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}`,
      );
      this.photos.length = 0;
      this.photos.push(...res.data.results);
      this.hasLoaded = true;
      this.isLoading = false;
    } catch (error) {
      throw Error('An error occurred: \r' + error);
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

  #header {
    img {
      height: 100%;
      max-width: 1em;
    }
    input {
      &:focus {
        outline: none;
      }
    }
  }

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
}
</style>
