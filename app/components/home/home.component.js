import template from './home.html';
import './home.scss';
import banner from '../../images/fd_good.jpg';
// import video1 from '../../images/videos/mp4/20170626145047.mp4';
// import video2 from '../../images/videos/mp4/201706261502110.mp4';
// import video3 from '../../images/videos/mp4/20170626150211.mp4';
// import video4 from '../../images/videos/mp4/20170626150502.mp4';
// import video5 from '../../images/videos/mp4/20170626150615.mp4';
// import video6 from '../../images/videos/mp4/20170626150825.mp4';
// import video7 from '../../images/videos/mp4/20170626150843.mp4';
// import video8 from '../../images/videos/mp4/20170626150904.mp4';
// import video9 from '../../images/videos/mp4/20170626151013.mp4';
// import video10 from '../../images/videos/mp4/20170626151132.mp4';
// import video11 from '../../images/videos/mp4/20170626151206.mp4';
// import video12 from '../../images/videos/mp4/20170626151318.mp4';
// import video13 from '../../images/videos/mp4/20170626151614.mp4';
// import video14 from '../../images/videos/mp4/20170626151636.mp4';
// import video15 from '../../images/videos/mp4/20170626151712.mp4';
// import video16 from '../../images/videos/mp4/20170626151830.mp4';
// import video17 from '../../images/videos/mp4/20170626151854.mp4';
// import video18 from '../../images/videos/mp4/20170626151937.mp4';
// import video19 from '../../images/videos/mp4/20170626152510.mp4';
// import video20 from '../../images/videos/mp4/20170626152639.mp4';
// import video21 from '../../images/videos/mp4/20170626152759.mp4';
// import video22 from '../../images/videos/mp4/20170626152943.mp4';
// import video23 from '../../images/videos/mp4/20170626153107.mp4';
// import video24 from '../../images/videos/mp4/20170626153139.mp4';
// import video25 from '../../images/videos/mp4/20170626153430.mp4';
// import video26 from '../../images/videos/mp4/20170626153724.mp4';

export const HomeComponent = {
    bindings: {},
    template,
    controller: class HomeController {
        constructor(DEPARTMENTS){
            'ngInject';
            this.banner = banner;
            this.departments = DEPARTMENTS;

            // this.videos = [
            //     video1,
            //     video2,
            //     video3,
            //     video4,
            //     video5,
            //     video6,
            //     video7,
            //     video8,
            //     video9,
            //     video10,
            //     video11,
            //     video12,
            //     video13,
            //     video14,
            //     video15,
            //     video16,
            //     video17,
            //     video18,
            //     video19,
            //     video20,
            //     video21,
            //     video22,
            //     video23,
            //     video24,
            //     video25,
            //     video26
            // ];
            // this.videoChoosen = this.videos[0];
        }

        // selectVideo(video) {
        //     let myVideo = document.getElementsByTagName('video')[0];
        //     myVideo.src = video;
        //     myVideo.load();
        //     myVideo.play();
        // }
    },
    controllerAs: 'vm'
};