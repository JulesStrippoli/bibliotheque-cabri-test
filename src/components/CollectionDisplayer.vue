<template>
    <div id="containerOfRessources"
        class="w-full h-full">
        <div class="w-11/12 m-auto">
            <div class="flex items-center justify-between p-5">
                <p class="text-xl sm:text-base md:text-lg lg:text-xl p-3 select-none ">Choisissez une ressource</p>
                <div class="flex items-center">
                    <div class="flex h-fit w-[360px] sm:w-[225px] md:w-[270px] lg:w-[360px]">
                        <input type="text"
                               v-model="search"
                               class="w-full p-2 rounded-l-3xl border-2 border-blue-cabri-light object-scale-down text-sm sm:text-xs md:text-sm lg:text-base"
                               placeholder="Recherchez une ressource..." />
                        <button class="p-2 rounded-r-3xl bg-blue-cabri-light flex justify-center items-center">
                            <svg class="w-5 -translate-x-0.5 min-w-[15px]"
                                 fill="#ffffff"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap justify-evenly gap-4 sm:gap-3 md:gap-4 lg:gap-5">
                <RessourceCard
                    :key="index"
                    v-for="(ressource, index) in collectionData"
                    :ressource="ressource"
                    :settings="settings"
                    class=""
                ></RessourceCard>
            </div>
        </div>
    </div>
</template>

<script>
    import RessourceCard from "./RessourceCard.vue";
    import Fuse from "fuse.js";

    const options = {
        // isCaseSensitive: false,
        includeScore: true,
        shouldSort: true,
        includeMatches: true,
        findAllMatches: false,
        minMatchCharLength: 2,
        // location: 0,
        threshold: 0.4,
        distance: 1000,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        useExtendedSearch: false,
        keys: [
            "titre",
            "cycle",
            "classe",
            "typologie",
            "description",
            {
                name: "theme",
                weight: 0.5
            },
/*            {
                name: "description",
                weight: 0.5
            },*/
        ]
    };

    export default {
        name: "CollectionDisplayer",
        components: {
            RessourceCard,
        },
        props: [
            "collection",
            "settings"
        ],
        data: function() {
            return {
                search: "",
                collectionData: this.collection,
                searchEngine: new Fuse(this.collection, options),
            }
        },
        mounted (){
        },
        watch: {
            search: function(newSearch){
                if(newSearch === "")
                    this.collectionData = this.searchEngine.getIndex().docs;
                else
                    this.collectionData = this.searchEngine.search(newSearch).map(res => res.item);
            },

        }
    };
</script>

<style scoped>

</style>