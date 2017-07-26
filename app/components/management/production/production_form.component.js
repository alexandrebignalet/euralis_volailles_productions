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
            this.production = this.convertToShow(this.resolve.production);
            this.facilities = this.resolve.facilities;
        }

        convertToShow(production) {
            production.vaccinesPrice *= 1000;
            production.foodPrice *= 1000;
            production.classedPrice *= 1000;
            production.declassedPrice *= 1000;
            production.breedingDeclassedPercent *= 100;
            production.mortalityPercent *= 100;
            production.restraintPercent *= 100;
            return production;
        }

        convertToSave(production) {
            production.vaccinesPrice /= 1000;
            production.foodPrice /= 1000;
            production.classedPrice /= 1000;
            production.declassedPrice /= 1000;
            production.breedingDeclassedPercent /= 100;
            production.mortalityPercent /= 100;
            production.restraintPercent /= 100;
            return production;
        }

        onSubmit() {
            this.isSaving = true;

            const prod = this.convertToSave(this.production);

            switch(this.currentState.replace("production.", "")) {
                case 'edit':
                    this.dataService.update(prod).then(() => {
                        this.toastr.success('a été mise à jour.', this.production.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'remove':
                    this.dataService.remove(prod).then(() => {
                        this.toastr.warning('a été supprimée.', this.production.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'create':
                    this.dataService.create(prod).then(() => {
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