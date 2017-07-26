import template from './production_form.html';

export const ProductionFormComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class ProductionFormController {
        constructor(ProductionDataService, $state, DEPARTMENTS, toastr){
            'ngInject';

            this.dataService = ProductionDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.departments = DEPARTMENTS;
            this.toastr = toastr;
        }

        $onInit() {
            this.production = this.resolve.production;
            this.facilities = this.resolve.facilities;
        }

        onSubmit() {
            this.isSaving = true;
            switch(this.currentState.replace("production.", "")) {
                case 'edit':
                    this.dataService.update(this.production).then(() => {
                        this.toastr.success('a été mise à jour.', this.production.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'remove':
                    this.dataService.remove(this.production).then(() => {
                        this.toastr.warning('a été supprimée.', this.production.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'create':
                    this.dataService.create(this.production).then(() => {
                        this.toastr.info('a été créée.', this.production.name);
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