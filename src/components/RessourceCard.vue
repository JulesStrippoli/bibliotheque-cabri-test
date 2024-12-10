<template>
    <div class="box-border h-fit w-fit">
            <div @click="displayAndSend"
                 class="flex flex-col justify-center items-center h-fit w-fit">
                <div class="relative w-[250px] sm:w-[200px] md:w-[250px] lg:w-[300px]">
                    <img :src="ressource.vignette" alt="" class="drop-shadow-md hover:outline-gray-700 hover:outline outline-1 outline-transparent transition-all ease-in duration-300 box-border rounded-3xl cursor-pointer"/>
                    <div class="bg-gray-600 w-full absolute bottom-0 left-0 rounded-b-3xl flex cursor-pointer">
                        <p class="text-white ml-5 text-sm sm:text-xs md:text-sm lg:text-base align-middle select-none">
                            {{ressource.classe}}&nbsp;&nbsp;&nbsp;{{ressource.duree}}</p>
                    </div>
                    <div class="absolute top-2 right-5 flex flex-col justify-center items-center translate-x-1/2 z-10">
                        <svg @mouseover="onHoveringInfo(true)"
                             @mouseout="onHoveringInfo(false)"
                             ref="iconHelp"
                             class="w-4 sm:w-4 md:w-5 lg:w-6 cursor-pointer"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                            <path fill="#4b5563" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/>
                        </svg>
                        <transition v-show="displayInformations">
                            <div class="relative tooltip bluebag">
                                <div ref="infoBubble"
                                     class="w-[360px] sm:w-[225px] md:w-[270px] lg:w-[360px] p-3 bg-gray-100 rounded-lg
                         flex flex-col justify-center items-center z-40 absolute drop-shadow-2xl
                         -translate-x-1/2">
                                    <div class="mb-1 pb-1 border-b-2 border-gray-300">
                                        <h4 class="text-xl sm:text-base md:text-lg lg:text-xl select-none">{{ressource.titre}}</h4>
                                        <p class="text-base sm:text-xs md:text-sm lg:text-base select-none">{{ressource.description}}</p>
                                    </div>
                                    <div class="w-full flex flex-wrap justify-items-start gap-1 mt-1 text-white text-base sm:text-xs md:text-sm lg:text-base">
                                        <div class="bg-red-cabri pl-2 pr-2 rounded-xl min-w-fit select-none">{{ressource.classe}}</div>
                                        <div class="bg-blue-cabri pl-2 pr-2 rounded-xl min-w-fit select-none">{{ressource.theme}}</div>
                                        <div class="bg-white-blue-cabri pl-2 pr-2 rounded-xl min-w-fit select-none">{{ressource.typologie}}</div>
                                    </div>
                                </div>
                            </div>
                        </transition>

                    </div>
                </div>
                <h3 class="mt-2 font-bold select-none cursor-pointer">
                    {{ ressource.titre }}
                </h3>
            </div>

        <!-- print player which load a ressource when clicking on card -->    
        <PlayerDisplayerManager v-if="displayPlayer"
                                :title="ressource.titre"
                                :player-url="playerUrl"
                                :clmc-url="ressource.url"
                                :settings="settings"
                                @close="displayPlayer = false">
        </PlayerDisplayerManager>
    </div>
</template>

<script>
    import Players from "../collections-data/players.json"
    import PlayerDisplayerManager from "./PlayerDisplayerManager.vue";

    export default {
        name: "RessourceCard",
        components: {PlayerDisplayerManager},
        props: [
            "ressource",
            "settings"
        ],
        data: () => {
            return {
                displayPlayer: false,
                playerUrl: undefined,
                displayInformations: false,
            }
        },
        mounted (){
            this.playerUrl = Players[this.ressource.player];
            if(window.location.hostname.includes("localhost")) {
                this.playerUrl = "http://localhost:8080";
            }

            this.keepInfoBubbleInParent();
        },
        updated (){
            this.keepInfoBubbleInParent();
        },
        watch: {
        },
        computed: {
        },
        methods: {
            keepInfoBubbleInParent() {
                let menuBubble = this.$refs.infoBubble;
                let menuBubbleRect = menuBubble.getBoundingClientRect();
                let containerOfRessourcesRect = document.getElementById("containerOfRessources").getBoundingClientRect();

                if(menuBubbleRect.right > containerOfRessourcesRect.width)
                    menuBubble.style.left = menuBubble.offsetLeft - (menuBubbleRect.right - containerOfRessourcesRect.width) - 10 + "px";

                let iconHelp = this.$refs.iconHelp;
                menuBubble.parentElement.style.transform = `translateY(+${iconHelp.getBoundingClientRect().height / 2}px)`;
            },
            onHoveringInfo(isHover) {
                if(isHover && !this.displayInformations)
                    this.displayInformations = true;
                else if(!isHover && this.displayInformations)
                    this.displayInformations = false;
            },
            sendLinkToMoodle() {
        console.log("Envoi du lien de la ressource à Moodle :", this.ressource.url);
        const message = {
            type: "resourceSelected",
            link: this.ressource.url
        };
        window.parent.postMessage(message, "https://moodledev.cabri.com/");
    },

    displayAndSend() {
        this.displayPlayer = true; 
        this.sendLinkToMoodle(); 
    }
        }
    };
</script>

<style>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .tooltip::before {
        content: "";
        width: 20px;
        height: 20px;
        background: #f3f4f6;
        border-radius: 3px;
        position: fixed;
        left: 50%;
        margin-left: -10px;
        transform: translateY(-50%) rotate(45deg);
        z-index: 0;
    }
</style>