import template from './investment_form.html';

export const InvestmentFormComponent = {
    bindings: { resolve: '<', modalInstance: '<' },
    template,
    controller: class InvestmentFormController {
        constructor(InvestmentDataService, $state, toastr){
            'ngInject';

            this.dataService = InvestmentDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.toastr = toastr;
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
            switch(this.currentState.replace("investment.", "")) {
                case 'edit':
                    this.dataService.update(this.investment).then(() => {
                        this.toastr.success('a été mis à jour.', this.investment.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'remove':
                    this.dataService.remove(this.investment).then(() => {
                        this.toastr.warning('a été supprimé.', this.investment.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'create':
                    this.dataService.create(this.investment).then(() => {
                        this.toastr.info('a été créé.', this.investment.name);
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