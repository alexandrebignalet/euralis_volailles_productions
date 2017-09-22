import template from './videos.html';

export const VideoComponent = {
    bindings: { videos: '<' },
    template,
    controller: class VideoController {
        constructor(VideoDataService){
            'ngInject';
            this.VideoDataService = VideoDataService;
        }

        $onInit() {
            console.log(this.videos);
            if(this.videos.length > 0) {
                this.VideoDataService.load(this.videos[0].getFile());
            }
        }

        load(video) {
            this.VideoDataService.load(video.getFile());
        }
    },
    controllerAs: 'vm'
};