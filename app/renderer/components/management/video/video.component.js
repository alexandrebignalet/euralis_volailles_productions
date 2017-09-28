import template from './videos.html';

export const VideoComponent = {
    bindings: { videos: '<' },
    template,
    controller: class VideoController {
        constructor(PouchDataService){
            'ngInject';
            this.PouchDataService = PouchDataService;
        }

        $onInit() {
            console.log(this.videos);
            if(this.videos.length > 0) {
                this.PouchDataService.load(this.videos[0].getFile());
            }
        }

        load(video) {
            this.PouchDataService.load(video.getFile());
        }
    },
    controllerAs: 'vm'
};