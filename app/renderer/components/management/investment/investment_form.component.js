import template from './investment_form.html';
import {Investment} from '../../../../main/database/domain/investment';

export const InvestmentFormComponent = {
    bindings: { resolve: '<', modalInstance: '<' },
    template,
    controller: class InvestmentFormController {
        constructor(PouchDataService, $state, ToastrService){
            'ngInject';

            this.PouchDataService = PouchDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.ToastrService = ToastrService;
            this.entityName = 'investment';
        }

        $onInit() {
            this.investment = this.resolve.investment;
        }

        removeImage(img) {
            let index = this.investment.images.indexOf(img);
            this.investment.images.splice(index, 1);
        }

        onSubmit() {
            this.isSaving = true;
            const formState = this.currentState.replace("investment.", "");

            switch(formState) {
                case 'edit':
                case 'create':
                    this.PouchDataService.save(this.entityName, this.investment).then(() => {
                        this.ToastrService[formState](new Investment(this.investment));
                        this.modalInstance.close()
                    });
                    break;
                case 'remove':
                    this.PouchDataService.remove(this.entityName, this.investment).then(() => {
                        this.ToastrService.remove(this.investment);
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

Array.prototype.objectIndexOf = function(prop, val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i][prop] === val) return true;
    }
    return false;
};