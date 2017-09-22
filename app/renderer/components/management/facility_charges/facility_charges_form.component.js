import template from './facility_charges_form.html';
import {FacilityCharges} from '../../../../main/database/domain/facility_charges';

export const FacilityChargesFormComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class FacilityChargesFormController {
        constructor(PouchDataService, $state, ToastrService){
            'ngInject';

            this.PouchDataService = PouchDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.ToastrService = ToastrService;
            this.entityName = 'facilityCharges';
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
            const formState = this.currentState.replace("facility_charges.", "");
            
            switch(formState) {
                case 'edit':
                case 'create':
                    this.PouchDataService.save(this.entityName, facilityCharges).then(() => {
                        this.ToastrService[formState](new FacilityCharges(facilityCharges));
                        this.modalInstance.close();
                    });
                    break;
                case 'remove':
                    this.PouchDataService.remove(this.entityName, facilityCharges).then(() => {
                        this.ToastrService[formState](facilityCharges);
                        this.modalInstance.close();
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