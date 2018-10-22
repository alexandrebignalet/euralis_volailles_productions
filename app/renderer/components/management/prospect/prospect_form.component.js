import template from './prospect_form.html';

export const ProspectFormComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class ProspectFormController {
        constructor(PouchDbService, ToastrService){
            'ngInject';

            this.PouchDbService = PouchDbService;
            this.isSaving = false;
            this.ToastrService = ToastrService;
            this.entityName = 'prospect';
        }

        $onInit() {
            this.prospect = this.resolve.prospect;
        }

        onSubmit() {
            this.isSaving = true;
            this.PouchDbService.save(this.entityName, this.prospect).then(() => {
                this.ToastrService.speak(`Prévionnel pour ${this.prospect.name}`, 'Impression');
                this.isSaving = false;
                this.modalInstance.close(this.prospect)
            });
        }

    },
    controllerAs: 'vm'
};