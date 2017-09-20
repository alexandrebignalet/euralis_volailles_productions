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
        constructor(DEPARTMENTS, VideoDataService, $scope, $window) {
            'ngInject';
            //imgs
            this.banner = banner;
            this.accompagne = accompagne;
            this.imagesFiliere = filiere;

            this.scope = $scope;
            this.departments = DEPARTMENTS;
            this.VideoDataService = VideoDataService;
            this.videoPlayed = null;

            this.repositories = $window.repositories;
            this.inProgress = false;
        }

        $onInit() {
            this.selectVideo(this.videos[0]);
        }

        load() {
            this.repositories.facility.dbService.replicate();
        }

        selectVideo(video) {
            if (!video || video.id === this.videoPlayed) return;

            this.VideoDataService
                .get(video.id)
                .then((data) => {
                    let myVideo = document.getElementsByTagName('video')[0];
                    this.videoPlayed = video.id;
                    myVideo.src = URL.createObjectURL(data.file);
                    myVideo.load();
                    myVideo.play();
                });
        }
    },
    controllerAs: 'vm'
};