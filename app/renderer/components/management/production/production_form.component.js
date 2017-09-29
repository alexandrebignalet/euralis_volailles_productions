import template from './production_form.html';
import {Production} from './production';

export const ProductionFormComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class ProductionFormController {
        constructor(PouchDataService, $state, DEPARTMENTS, ToastrService){
            'ngInject';

            this.PouchDataService = PouchDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.departments = DEPARTMENTS;
            this.ToastrService = ToastrService;

            this.pickerIsOpen = false;
            this.format = 'dd/MM/yyyy';
            this.dateOptions = {
                showWeeks: true
            };

            this.entityName = 'production';
        }

        $onInit() {
            this.production = this.convertToShow(this.resolve.production);
            this.facilities = this.resolve.facilities;
        }

        openPicker() {
            this.pickerIsOpen = true;
        }

        convertToShow(production) {
            production.vaccinesPrice *= 1000;
            production.foodPrice *= 1000;
            production.classedPrice *= 1000;
            production.declassedPrice *= 1000;
            production.breedingDeclassedPercent *= 100;
            production.mortalityPercent *= 100;
            production.restraintPercent *= 100;
            production.updateDate = new Date(production.updateDate);
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

        removeAttachment(attachment) {
            let index = this.production.attachments.indexOf(attachment);
            this.production.attachments.splice(index, 1);
        }

        onSubmit() {
            this.isSaving = true;

            const prod = this.convertToSave(this.production);
            const formState = this.currentState.replace("production.", "");

            switch(formState) {
                case 'edit':
                case 'create':
                    let attachments = {};
                    for(let i = 0; i < prod.attachments.length; i++) {
                        attachments[prod.attachments[i].name] = prod.attachments[i];
                    }
                    prod.attachments = attachments;

                    this.PouchDataService.save(this.entityName, prod).then(() => {
                        this.ToastrService[formState](new Production(prod));
                        this.modalInstance.close()
                    });
                    break;
                case 'remove':
                    this.PouchDataService.remove(this.entityName, prod).then(() => {
                        this.ToastrService.remove(this.production);
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