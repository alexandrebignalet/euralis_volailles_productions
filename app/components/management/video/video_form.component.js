import template from './video_form.html';

export const VideoFormComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class VideoFormController {
        constructor(VideoDataService, $state, toastr, $timeout, $scope){
            'ngInject';

            this.dataService = VideoDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.toastr = toastr;
            this.$timeout = $timeout;

            $scope.fileNameChanged = (elem) => {
                let file = elem.files[0];
                
                this.video.file = file;
                this.video.size = file.size;
                this.playVideo(this.video);
            };
        }

        $onInit() {
            this.video = this.resolve.video;
            console.log(this.video);
            this.playVideo();
        }

        playVideo() {
            if(!this.video.file) return;
            this.$timeout(() => {
                let myVideo = document.getElementById('modal-viewer');
                myVideo.src = URL.createObjectURL(this.video.file);
                myVideo.load();
                myVideo.play();
            });
        }
        
        onSubmit() {
            this.isSaving = true;
            let file;

            switch(this.currentState.replace("video.", "")) {
                case 'edit':

                    this.dataService.update(this.video).then(() => {
                        this.toastr.success('a été mise à jour.', 'La vidéo ' + this.video.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'remove':
                    this.dataService.remove(this.video).then(() => {
                        this.toastr.warning('a été supprimée.', 'La vidéo ' + this.video.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'create':

                    this.dataService.create(this.video).then(() => {
                        this.toastr.info('a été créée.', 'La vidéo ' + this.video.name);
                        this.modalInstance.close()
                    });
                    break;
                default:
                    break;
            }
            this.isSaving = false;
        }

    },
    controllerAs: 'vm'
};