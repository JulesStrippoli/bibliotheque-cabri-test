import axios from "axios";

/* global params */

const Lti1p3 = {
    deeplink(ltik, data) {
        return new Promise(async (resolve, reject) => {
            const form = await axios.post('/deeplink', {
                name: 'activity',
                value: data,
            }, {headers: {Authorization: 'Bearer ' + ltik}});

            document.getElementById('lti1p3').insertAdjacentHTML('beforeend', form.data);
            setTimeout(() => {
                // TODO the line below must be automatically executed
                document.getElementById("ltijs_submit").submit()
                //alert('La question a été envoyé a la plateforme, veuillez sauvegarder et valider ')
                resolve();
            }, 500);
        });
    },
    getLaunchInfo(ltik) {
        return new Promise(async (resolve, reject) => {
            let launchInfo;
            // for dev purposes
            if(location.host === 'localhost:8080')
                launchInfo = {data: {'resource_id': '', 'activityType': 'STANDARD', 'roles': 'http://purl.imsglobal.org/vocab/lis/v2/institution/person#Instructor'}}
            else if(location.host === 'localhost:7080')
                launchInfo = await axios.get('http://localhost:3000/info', {headers: {Authorization: 'Bearer ' + ltik}})
            else if(location.host === 'steamlms:7080')
                launchInfo = await axios.get('https://baptiste-cabri.cabricloud.com/info', {headers: {Authorization: 'Bearer ' + ltik}})
            // in production
            else
                launchInfo = await axios.get('/info', {headers: {Authorization: 'Bearer ' + ltik}})
            resolve(launchInfo);

        });
    },
    buildLtiSettings(settings) {
        let params = new URLSearchParams(window.location.search);
        const ltik = params.get('ltik');
        settings.ltik = ltik;

        // div to send form for create activity
        let div = document.createElement("div");
        div.id = "lti1p3";
        document.body.append(div);

        if(ltik) {
            settings.player = params.get('player');
            settings.clmc = params.get('clmc');
            settings.isModePlayer = settings.clmc && settings.player;

            this.getLaunchInfo(ltik).then((launchInfo) => {
                let isMode = launchInfo.data.roles.includes('http://purl.imsglobal.org/vocab/lis/v2/institution/person#Instructor');
                let fileToLoad = null;

                if(launchInfo.data.resource_id) {
                    fileToLoad = launchInfo.data.resource_id
                }

                settings.isModeTeacher = isMode;
                settings.isModeStudent = !isMode;
                settings.documentCabri = fileToLoad;
                settings.activityType = launchInfo.data.activityType ? launchInfo.data.activityType.toLowerCase() : null;
                settings.redirectionUrl = launchInfo.data.redirectionUrl;
                settings.showLMSDeeplinkButton = launchInfo.data.showLMSDeeplinkButton;
                settings.redirectionUrl = launchInfo.data.redirectionUrl;

                if(settings.isModeStudent) {
                    window.addEventListener("message", (event) => {
                        if(event.data?.name === "loaded") {
                            settings.loaded = true;

                            const resourceDetails = {
                                type: "resourceLoaded",
                                resourceUrl: settings.clmc, // Assurez-vous que cela pointe vers l'URL correcte de la ressource
                            };
                            window.parent.postMessage(resourceDetails, "*"); // Remplacez "*" par l'origine exacte de Moodle pour plus de sécurité
                        }
                        else if(event.data?.name === "receiveDocument") {
                            settings.editedClmc = event.data.doc;
                        }
                        else if(event.data?.name === "receiveScore") {
                            settings.scoreMax = event.data.scoreMax;
                            settings.score = event.data.score;
                        }
                    }, false);
                }
            });
        }

    },
    sendStudentResult(ltik, data) {
        return new Promise(async (resolve, reject)=>{
            try {
                await axios.post('/grade', data, {headers: {Authorization: 'Bearer ' + ltik}});
                resolve();
            } catch(err) {
                reject(err);
            }
        });
    }
};

export default Lti1p3;