import template from './home.html';
import './home.scss';
import banner from '../../images/fd_good.jpg';
import accompagne from '../../images/accompagne.jpg';

export const HomeComponent = {
    bindings: {
        videos: '<'
    },
    template,
    controller: class HomeController {
        constructor(DEPARTMENTS, VideoDataService) {
            'ngInject';
            //imgs
            this.banner = banner;
            this.accompagne = accompagne;

            this.departments = DEPARTMENTS;
            this.VideoDataService = VideoDataService;
            this.videoPlayed = null;
        }

        $onInit() {
            this.selectVideo(this.videos[0]);
        }

        selectVideo(video) {
            if (video.id === this.videoPlayed) return;

            this.VideoDataService
                .get(video.id)
                .then((data) => {
                    let myVideo = document.getElementsByTagName('video')[0];
                    this.videoPlayed = video.id;
                    myVideo.src = URL.createObjectURL(data.file[0]);
                    myVideo.load();
                    myVideo.play();
                });
        }
    },
    controllerAs: 'vm'
};