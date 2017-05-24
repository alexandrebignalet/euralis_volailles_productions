import template from './facility_form.html';
import toastr from 'toastr';
import 'toastr/toastr.scss';

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

export const FacilityFormComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class FacilityFormController {
        constructor(FacilityDataService, $state){
            'ngInject';

            this.dataService = FacilityDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.batimentTypes = ['batiment', 'cabane'];
        }

        $onInit() {
            this.facility = this.resolve.facility;
            this.facilitiesCharges = this.resolve.facilitiesCharges;
        }

        onSubmit() {
            this.isSaving = true;
            switch(this.currentState.replace("management.", "")) {
                case 'editFacility':
                    this.dataService.update(this.facility).then(() => {
                        toastr.success('a été mise à jour.', this.facility.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'removeFacility':
                    this.dataService.remove(this.facility).then(() => {
                        toastr.warning('a été supprimée.', this.facility.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'createFacility':
                    this.dataService.create(this.facility).then(() => {
                        toastr.info('a été créée.', this.facility.name);
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