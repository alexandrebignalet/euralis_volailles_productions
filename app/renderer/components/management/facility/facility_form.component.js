import template from './facility_form.html';
import {Facility} from '../../../../main/database/domain/facility';

export const FacilityFormComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class FacilityFormController {
        constructor(PouchDataService, $state, FACILITIES_TYPES, ToastrService){
            'ngInject';
            this.PouchDataService = PouchDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.facilityTypes = FACILITIES_TYPES;
            this.ToastrService = ToastrService;
            this.entityName = 'facility';
        }

        $onInit() {
            this.facility = this.resolve.facility;
            this.facilitiesCharges = this.resolve.facilitiesCharges;
            this.investments = this.resolve.investments;
            console.log(this.facility, this.facilitiesCharges, this.investments);
        }

        removeAttachment(attachment) {
            let index = this.facility.attachments.indexOf(attachment);
            this.facility.attachments.splice(index, 1);
        }

        onSubmit() {
            this.isSaving = true;
            const formState = this.currentState.replace("facility.", "");
            switch(formState) {
                case 'edit':
                case 'create':
                    let attachments = {};
                    for(let i = 0; i < this.facility.attachments.length; i++) {
                        attachments[this.facility.attachments[i].name] = this.facility.attachments[i];
                    }
                    this.facility.attachments = attachments;

                    this.PouchDataService.save(this.entityName, this.facility)
                        .then(() => {
                            this.ToastrService[formState](new Facility(this.facility));
                            this.modalInstance.close()
                        });
                    break;
                case 'remove':
                    this.PouchDataService.remove(this.entityName, this.facility)
                        .then(() => {
                            this.ToastrService.remove(this.facility);
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