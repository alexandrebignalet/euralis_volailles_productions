import template from './video_form.html';

export const VideoFormComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class VideoFormController {
        constructor(VideoDataService, $state, toastr, $scope){
            'ngInject';

            this.VideoDataService = VideoDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.toastr = toastr;

            $scope.fileNameChanged = (elem) => {
                this.video.file = elem.files[0];
                this.VideoDataService.load(this.video);
            };
        }

        $onInit() {
            this.video = this.resolve.video;
            console.log(this.video);
            this.VideoDataService.load(this.video);
        }
        
        onSubmit() {
            this.isSaving = true;

            switch(this.currentState.replace("video.", "")) {
                case 'edit':

                    this.VideoDataService.save(this.video).then(() => {
                        this.toastr.success('a été mise à jour.', 'La vidéo ' + this.video.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'remove':
                    this.VideoDataService.remove(this.video).then(() => {
                        this.toastr.warning('a été supprimée.', 'La vidéo ' + this.video.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'create':

                    this.VideoDataService.save(this.video).then(() => {
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