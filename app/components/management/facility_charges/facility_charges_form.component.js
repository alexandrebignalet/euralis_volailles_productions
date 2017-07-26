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
            this.facilityCharges = this.convertToShow(this.resolve.facilityCharges);
        }

        convertToShow(facilityCharges) {
            facilityCharges.chickPrice *= 1000;
            facilityCharges.warming *= 1000;
            facilityCharges.vetPrice *= 1000;
            facilityCharges.contributions *= 1000;
            facilityCharges.disinfection *= 1000;
            facilityCharges.litter *= 1000;
            facilityCharges.commodities *= 1000;
            facilityCharges.catching *= 1000;
            facilityCharges.insurances *= 1000;
            return facilityCharges;
        }

        convertToSave(facilityCharges) {
            facilityCharges.chickPrice /= 1000;
            facilityCharges.warming /= 1000;
            facilityCharges.vetPrice /= 1000;
            facilityCharges.contributions /= 1000;
            facilityCharges.disinfection /= 1000;
            facilityCharges.litter /= 1000;
            facilityCharges.commodities /= 1000;
            facilityCharges.catching /= 1000;
            facilityCharges.insurances /= 1000;
            return facilityCharges;
        }

        onSubmit() {
            this.isSaving = true;
            let facilityCharges = this.convertToSave(this.facilityCharges);

            switch(this.currentState.replace("facility_charges.", "")) {
                case 'edit':
                    this.dataService.update(facilityCharges).then(() => {
                        this.toastr.success('a été mise à jour.', this.facilityCharges.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'remove':
                    this.dataService.remove(facilityCharges).then(() => {
                        this.toastr.warning('a été supprimée.', this.facilityCharges.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'create':
                    this.dataService.create(facilityCharges).then(() => {
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