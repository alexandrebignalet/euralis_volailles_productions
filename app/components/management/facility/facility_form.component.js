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
        constructor(FacilityDataService, $state, FACILITIES_TYPES){
            'ngInject';

            this.dataService = FacilityDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.batimentTypes = FACILITIES_TYPES;
        }

        $onInit() {
            this.facility = this.resolve.facility;
            this.facilitiesCharges = this.resolve.facilitiesCharges;
        }

        onSubmit() {
            this.isSaving = true;
            console.log(this.currentState);
            switch(this.currentState.replace("facility.", "")) {
                case 'edit':
                    this.dataService.update(this.facility).then(() => {
                        toastr.success('a été mis à jour.', `${this.facility.type.toUpperCase()} ${this.facility.size}m²`);
                        this.modalInstance.close()
                    });
                    break;
                case 'remove':
                    this.dataService.remove(this.facility).then(() => {
                        toastr.warning('a été supprimé.', `${this.facility.type.toUpperCase()} ${this.facility.size}m²`);
                        this.modalInstance.close()
                    });
                    break;
                case 'create':
                    this.dataService.create(this.facility).then(() => {
                        toastr.info('a été créé.', `${this.facility.type.toUpperCase()} ${this.facility.size}m²`);
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