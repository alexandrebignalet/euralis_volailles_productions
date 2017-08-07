import template from './videos.html';

export const VideoComponent = {
    bindings: { videos: '<' },
    template,
    controller: class VideoController {
        constructor(VideoDataService, $scope){
            'ngInject';
            this.scope = $scope;
            this.VideoDataService = VideoDataService;
            this.video = {};
            this.videoToSee = null;
        }
        
        loadVideo(id) {

            this.VideoDataService.get(id)
                .then((video) => {

                    let myVideo = document.getElementsByTagName('video')[0];
                    myVideo.src = URL.createObjectURL(video.file);
                    myVideo.load();
                    myVideo.play();
                });
        }
    },
    controllerAs: 'vm'
};