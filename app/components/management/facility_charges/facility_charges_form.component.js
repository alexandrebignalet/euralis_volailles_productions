import template from './facility_charges_form.html';

export const FacilityChargesFormComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class FacilityChargesFormController {
        constructor(FacilityChargesDataService, $state, toastr){
            'ngInject';

            this.dataService = FacilityChargesDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.toastr = toastr;
        }

        $onInit() {
            this.facilityCharges = this.resolve.facilityCharges;
        }

        onSubmit() {
            this.isSaving = true;
            switch(this.currentState.replace("facility_charges.", "")) {
                case 'edit':
                    this.dataService.update(this.facilityCharges).then(() => {
                        this.toastr.success('a été mise à jour.', this.facilityCharges.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'remove':
                    this.dataService.remove(this.facilityCharges).then(() => {
                        this.toastr.warning('a été supprimée.', this.facilityCharges.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'create':
                    this.dataService.create(this.facilityCharges).then(() => {
                        this.toastr.info('a été créée.', this.facilityCharges.name);
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