<template>
    <div class="w-screen h-screen fixed top-0 left-0 z-50 flex flex-col bg-white">

        <!-- Player -->
        <iframe ref="cabriplayer"
                :src="urlToDisplay"
                class="w-full h-full flex-grow"
                width="100%"
                height="100%"></iframe>

        <!-- Banner -->        
        <div class="w-full h-fit relative">
            <FooterOfCollection></FooterOfCollection>
            <button v-if="settings.showLMSDeeplinkButton" class="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2
             bg-blue-cabri hover:bg-blue-cabri-dark text-white h-fit p-1 pr-2 pl-2  text-center no-underline rounded-3xl shadow-2xl z-20 select-none" @click="createActivity">Importer dans vos activités</button>
            <button v-if="settings.isModeStudent && settings.loaded" class="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2
             bg-blue-cabri hover:bg-blue-cabri-dark text-white h-fit p-1 pr-2 pl-2  text-center no-underline rounded-3xl shadow-2xl z-20 select-none" @click="sendActivityToTeacher">Envoyer</button>
        </div>

        <div v-if="settings.showLMSDeeplinkButton"
             class="fixed top-5 right-5 z-20 w-10 cursor-pointer"
             @click="$emit('close')">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 122.878 122.88"
                 fill="#AEAEB0FF"
                 enable-background="new 0 0 122.878 122.88"
                 xml:space="preserve">
            <g>
                <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z">
                </path>
            </g>
        </svg>
        </div>
    </div>
</template>

<script>
    import Lti1p3 from "../scripts/lti1p3";
    import FooterOfCollection from "./FooterOfCollection.vue";

    export default {
        name: "PlayerDisplayerManager",
        components: {
            FooterOfCollection,
        },
        props: [
            "settings",
            "title",
            "playerUrl",
            "clmcUrl"
        ],
        data: () => {
            return {
                urlToDisplay: undefined,
                player: undefined,
                clmc: undefined
            }
        },
        mounted (){
            if (this.playerUrl && this.clmcUrl) {
                this.player = this.playerUrl;
                this.clmc = this.clmcUrl;
            }
            else {
                this.player = this.settings.player;
                this.clmc = this.settings.clmc;
            }

            this.urlToDisplay = `${this.player}?clmc=${this.clmc}`;
        },
        watch: {
          'settings.score'() {
            this.sendActivityToTeacherRequest();
          }
        },
        computed: {
        },
        methods: {
            createActivity() {
                console.log('send', postMessage);
                let data = {
                    title: this.title,
                    type: "collections",
                    player: this.player,
                    clmc: this.clmc
                };
                Lti1p3.deeplink(this.settings.ltik, data).then((res) => {
                    console.log("Response : ", res);
                }).catch((err) => {
                    console.log(err);
                });
                const message = {
                type: "resourceSelected",
                link: this.urlToDisplay,
            };
            window.parent.postMessage(message, "https://moodledev.cabri.com/");
            console.log('send', postMessage);
            },
            sendActivityToTeacher() {
                // player will send a postmessage to push the notebook
                this.$refs.cabriplayer.contentWindow.postMessage({name: "wantDocument"}, "*");
                // player will send a postmessage to push the score
                this.$refs.cabriplayer.contentWindow.postMessage({name: "wantScore"}, "*");
                // send ressources to moodledev.cabri.com
                const message = {
                type: "resourceSelected",
                link: this.urlToDisplay,
            };
            window.parent.postMessage(message, "https://moodledev.cabri.com/");
            console.log('send', postMessage);
            },
            sendActivityToTeacherRequest() {
              const data = {cabriDocument: this.settings.editedClmc, player: this.player, grade: this.settings.score, gradeMax: this.settings.scoreMax};
              Lti1p3.sendStudentResult(this.settings.ltik, data).then((res) => {
                  console.log("Response : ", res);
                  if(this.settings.redirectionUrl) window.location.replace(this.settings.redirectionUrl);
              }).catch((err) => {
                  console.log(err);
              });
            }
        },
    };
</script>

<style scoped>
 body {
     color: #aeaeb0;
 }
</style>