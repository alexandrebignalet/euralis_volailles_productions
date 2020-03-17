import template from './investment_form.html';
import {DiverseOption, Investment} from '../../../model/investment';

export const InvestmentFormComponent = {
    bindings: { resolve: '<', modalInstance: '<' },
    template,
    controller: class InvestmentFormController {
        constructor(PouchDbService, $state, ToastrService){
            'ngInject';
            this.state = $state;
            this.PouchDbService = PouchDbService;
            this.isSaving = false;
            this.currentState = this.state.current.name;
            this.ToastrService = ToastrService;
            this.entityName = 'investment';
        }

        $onInit() {
            this.investment = this.resolve.investment;
            if (!this.investment.options || this.investment.options.length === 0) {
                this.investment.options = [DiverseOption('', 0)];
            }
        }

        addNewOption() {
            this.investment.options.push(DiverseOption(null, null));
        }

        removeOption(index) {
            console.log(index);
            this.investment.options.splice(index, 1);
        }

        removeAttachment(file) {
            let index = this.investment.attachments.indexOf(file);
            this.investment.attachments.splice(index, 1);
        }

        onSubmit() {
            this.isSaving = true;
            const formState = this.currentState.replace("investment.", "");

            switch(formState) {
                case 'edit':
                case 'create':
                    let attachments = {};
                    for(let i = 0; i < this.investment.attachments.length; i++) {
                        attachments[this.investment.attachments[i].name] = this.investment.attachments[i];
                    }
                    this.investment.attachments = attachments;

                    this.PouchDbService.save(this.entityName, this.investment).then(() => {
                        this.ToastrService[formState](new Investment(this.investment));
                        this.modalInstance.close()
                    });
                    break;
                case 'remove':
                    this.PouchDbService.remove(this.entityName, this.investment).then(() => {
                        this.ToastrService.remove(this.investment);
                        this.modalInstance.close()
                    });
                    break;
                default:
                    break;
            }
            this.isSaving = false;
        }

        cancel() {
            this.modalInstance.close()
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
