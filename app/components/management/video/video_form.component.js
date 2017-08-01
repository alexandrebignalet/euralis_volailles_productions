import template from './video_form.html';

export const VideoFormComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class VideoFormController {
        constructor(VideoDataService, $state, toastr, $timeout){
            'ngInject';

            this.dataService = VideoDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.toastr = toastr;
            this.$timeout = $timeout;
        }

        $onInit() {
            this.video = this.resolve.video;

            if(this.currentState.replace("video.", "") === 'edit') {
                this.$timeout(() => {
                    let myVideo = document.getElementById('modal-viewer');
                    myVideo.src = URL.createObjectURL(this.video.file[0]);
                    myVideo.load();
                    myVideo.play();
                });
            }
        }

        onSubmit() {
            this.isSaving = true;
            let file;

            switch(this.currentState.replace("video.", "")) {
                case 'edit':
                    file = $('#load-file')[0].files[0];

                    this.video.size = file.size;
                    this.video.file = file;

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
                    file = $('#load-file')[0].files[0];

                    this.video.size = file.size;
                    this.video.file = file;

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