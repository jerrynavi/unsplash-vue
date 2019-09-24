<template>
    <div id="header" class="bg-gray-500 p-8 sm:p-12 md:p-16 lg:p-24">
      <div v-if="withSearch" class="search-input-field shadow-lg bg-white rounded p-3 pl-5 flex flex-row justify-left">
        <img src="../assets/search.svg" alt="search icon">
        <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
        <input class="h-full w-full ml-5" type="text" name="search" id="search" placeholder="Search for photo" @keyup.enter="goToSearch($event.target.value)">
      </div>

      <div v-else-if="!withSearch" class="search-information">
          <h1 class="text-gray-700 text-xl">Searching for <span class="text-black">"{{ searchQuery }}"</span></h1>
      </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import router from '@/router';
@Component
export default class AppHeader extends Vue {
    @Prop() private withSearch!: boolean;
    @Prop() private searchQuery!: string;
    @Prop() private msg!: string;

    public goToSearch(query: string) {
        router.push({name: 'search', params: { query }});
    }
}
</script>

<style lang="scss" scoped>
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
</style>
