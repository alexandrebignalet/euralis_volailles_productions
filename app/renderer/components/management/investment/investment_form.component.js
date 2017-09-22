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

        removeAttachment(file) {
            let index = this.investment.attachments.indexOf(file);
            this.investment.attachments.splice(index, 1);
        }

        onSubmit() {
            this.isSaving = true;
            const formState = this.currentState.replace("investment.", "");

            let attachments = {};
            for(let i = 0; i < this.investment.attachments.length; i++) {
                    attachments[this.investment.attachments[i].name] = this.investment.attachments[i];
            }
            this.investment.attachments = attachments;

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