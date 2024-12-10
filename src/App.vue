<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import CollectionDisplayer from './components/CollectionDisplayer.vue'
import PlayerDisplayerManager from './components/PlayerDisplayerManager.vue'
import HeaderOfCollection from "./components/HeaderOfCollection.vue";
import Collection from "./collections-data/123Cabri.json"
import Lti1p3 from "./scripts/lti1p3";
import { reactive } from 'vue'


const collection = Collection;
const settings = reactive({});

Lti1p3.buildLtiSettings(settings);

</script>

<template>
  <div class="text-gray-700 text-base sm:text-sm md:text-base lg:text-lg font-sans-serif">
    <!-- Content -->
    <div v-if="settings.isModePlayer">
      <PlayerDisplayerManager :settings="settings"></PlayerDisplayerManager>
    </div>
    <div v-else>
        <!-- Header -->
        <HeaderOfCollection></HeaderOfCollection>
        <CollectionDisplayer :collection="collection" :settings="settings"/>
    </div>
  </div>
</template>

<style scoped>
@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 100;
    src: local(''),
    url('assets/fonts/montserrat-v18-latin-100.woff2') format('woff2'),
    url('assets/fonts/montserrat-v18-latin-100.woff') format('woff');
}

@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 200;
    src: local(''),
    url('assets/fonts/montserrat-v18-latin-200.woff2') format('woff2'),
    url('assets/fonts/montserrat-v18-latin-200.woff') format('woff');
}

@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 300;
    src: local(''),
    url('assets/fonts/montserrat-v18-latin-300.woff2') format('woff2'),
    url('assets/fonts/montserrat-v18-latin-300.woff') format('woff');
}

@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: local(''),
    url('assets/fonts/montserrat-v18-latin-regular.woff2') format('woff2'),
    url('assets/fonts/montserrat-v18-latin-regular.woff') format('woff');
}

@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    src: local(''),
    url('assets/fonts/montserrat-v18-latin-500.woff2') format('woff2'),
    url('assets/fonts/montserrat-v18-latin-500.woff') format('woff');
}

@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    src: local(''),
    url('assets/fonts/montserrat-v18-latin-600.woff2') format('woff2'),
    url('assets/fonts/montserrat-v18-latin-600.woff') format('woff');
}

@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    src: local(''),
    url('assets/fonts/montserrat-v18-latin-700.woff2') format('woff2'),
    url('assets/fonts/montserrat-v18-latin-700.woff') format('woff');
}

@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    src: local(''),
    url('assets/fonts/montserrat-v18-latin-800.woff2') format('woff2'),
    url('assets/fonts/montserrat-v18-latin-800.woff') format('woff');
}

@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 900;
    src: local(''),
    url('assets/fonts/montserrat-v18-latin-900.woff2') format('woff2'),
    url('assets/fonts/montserrat-v18-latin-900.woff') format('woff');
}
</style>
