import template from './facility_charges_form.html';
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

export const FacilityChargesFormComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class FacilityChargesFormController {
        constructor(FacilityChargesDataService, $state){
            'ngInject';

            this.dataService = FacilityChargesDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
        }

        $onInit() {
            this.facilityCharges = this.resolve.facilityCharges;
        }

        onSubmit() {
            this.isSaving = true;
            switch(this.currentState.replace("management.", "")) {
                case 'editFacilityCharges':
                    this.dataService.update(this.facilityCharges).then(() => {
                        toastr.success('a été mise à jour.', this.facilityCharges.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'removeFacilityCharges':
                    this.dataService.remove(this.facilityCharges).then(() => {
                        toastr.warning('a été supprimée.', this.facilityCharges.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'createFacilityCharges':
                    this.dataService.create(this.facilityCharges).then(() => {
                        toastr.info('a été créée.', this.facilityCharges.name);
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