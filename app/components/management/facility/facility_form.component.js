import template from './facility_form.html';

export const FacilityFormComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class FacilityFormController {
        constructor(FacilityDataService, $state, FACILITIES_TYPES, toastr){
            'ngInject';
            this.dataService = FacilityDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.batimentTypes = FACILITIES_TYPES;
            this.toastr = toastr;
            this.facility = null;
            this.facilitiesCharges = null;
            this.investments = null;
        }

        $onInit() {

            this.facility = this.resolve.facility;
            this.facilitiesCharges = this.resolve.facilitiesCharges;
            this.investments = this.resolve.investments;
        }
        
        // openImage(img) {
        //     let imgUrl = URL.createObjectURL(img);
        //     window.open(imgUrl);
        // }

        onSubmit() {
            this.isSaving = true;
            console.log(this.currentState);
            switch(this.currentState.replace("facility.", "")) {
                case 'edit':
                    this.dataService.update(this.facility).then(() => {
                        this.toastr.success('a été mis à jour.', `${this.facility.type.toUpperCase()} ${this.facility.size}m²`);
                        this.modalInstance.close()
                    });
                    break;
                case 'remove':
                    this.dataService.remove(this.facility).then(() => {
                        this.toastr.warning('a été supprimé.', `${this.facility.type.toUpperCase()} ${this.facility.size}m²`);
                        this.modalInstance.close()
                    });
                    break;
                case 'create':
                    this.dataService.create(this.facility).then(() => {
                        this.toastr.info('a été créé.', `${this.facility.type.toUpperCase()} ${this.facility.size}m²`);
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