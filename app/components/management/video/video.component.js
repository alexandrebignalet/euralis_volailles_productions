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

        onSubmit() {
            let file = $('#load-file')[0].files[0];
            
            this.video.size = file.size;
            this.video.file = file;
            
            this.VideoDataService.create(this.video)
                .then((data) => {
                console.log(data);
                })
                .catch((data) => {
                console.log(data);
                })
        }
        
        loadVideo(id) {

            this.VideoDataService.get(id)
                .then((video) => {

                    let myVideo = document.getElementsByTagName('video')[0];
                    myVideo.src = URL.createObjectURL(video.file[0]);
                    myVideo.load();
                    myVideo.play();
                })
                .catch((data) => {
                    console.log('laodVideo ', data);
                })
        }

        deleteVideo(id) {
            this.VideoDataService.remove(id)
                .then((data) => {
                    console.log(data);
                })
                .catch((data) => {
                    console.log(data);
                })
        }

        
    },
    controllerAs: 'vm'
};