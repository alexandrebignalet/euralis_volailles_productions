import template from './home.html';
import './home.scss';
import './arrow.scss';
import banner from '../../images/fd_good.jpg';
import accompagne from '../../images/accompagne.jpg';
import sanders from '../../images/sanders.jpg';
import eurvol from '../../images/logo.png';
import vol from '../../images/eurvol.jpg';
import elev from '../../images/elev.png';
import avigers from '../../images/avigers.png';
import qualisud from '../../images/qualisud.png';
import electron from 'electron';
const ipc = electron.ipcRenderer;
const filiere = [];
filiere['sanders'] = sanders;
filiere['eurvol'] = eurvol;
filiere['vol'] = vol;
filiere['elev'] = elev;
filiere['avigers'] = avigers;
filiere['qualisud'] = qualisud;

export const HomeComponent = {
    bindings: {
        videos: '<'
    },
    template,
    controller: class HomeController {
        constructor(DEPARTMENTS, PouchDataService) {
            'ngInject';
            //imgs
            this.banner = banner;
            this.accompagne = accompagne;
            this.imagesFiliere = filiere;

            this.departments = DEPARTMENTS;
            this.PouchDataService = PouchDataService;
            this.videoPlayed = null;
            
            this.inProgress = false;
        }

        $onInit() {
            if(this.videos.length > 0)
                this.PouchDataService.load(this.videos[0].getFile());
        }

        load() {
            this.inProgress = true;
            ipc.send('sync');
            
            return new Promise((resolve) => {
                ipc.on('sync', (e,d) => {
                    this.inProgress = false;
                    resolve();
                })
            })
        }

        selectVideo(video) {
            if (!video || video.id === this.videoPlayed) return;
            this.videoPlayed = video.id;
            this.PouchDataService.load(video.getFile());
        }
    },
    controllerAs: 'vm'
};