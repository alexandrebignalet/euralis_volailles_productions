import template from './videos.html';

export const VideoComponent = {
    bindings: { videos: '<' },
    template,
    controller: class VideoController {
        constructor(VideoService){
            'ngInject';
            this.VideoService = VideoService;
        }

        $onInit() {
            if(this.videos.length > 0) {
                this.VideoService.load(this.videos[0].getFile());
            }
        }

        load(video) {
            this.VideoService.load(video.getFile());
        }
    },
    controllerAs: 'vm'
};