import template from './video_form.html';
import {Video} from './video';

export const VideoFormComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class VideoFormController {
        constructor(PouchDataService, $state, ToastrService, $scope){
            'ngInject';

            this.PouchDataService = PouchDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.ToastrService = ToastrService;
            this.entityName = 'video';
            this.formData = {
                file: null
            };



            $scope.fileNameChanged = (elem) => {
                this.formData.file = elem.files[0];
                this.PouchDataService.load(elem.files[0]);
            };
        }

        $onInit() {
            this.video = this.resolve.video;
            if(this.video.id) {
                this.PouchDataService.load(this.video.getFile());
                this.formData.file = this.video.getFile();
                this.video.name = this.video.getName();
            }
        }

        onSubmit() {
            this.isSaving = true;

            const formState = this.currentState.replace("video.", "");

            switch(formState) {
                case 'edit':
                case 'create':
                    this.video.attachments = {
                        [this.video.name]: this.formData.file
                    };

                    this.PouchDataService.save(this.entityName, this.video).then(() => {
                        this.ToastrService[formState](`Vidéo ${this.video.name}`);
                        this.modalInstance.close()
                    });
                    break;
                case 'remove':
                    this.PouchDataService.remove(this.entityName, this.video).then(() => {
                        this.ToastrService.remove(this.video);
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