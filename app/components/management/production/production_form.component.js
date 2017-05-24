import template from './production_form.html';
import toastr from 'toastr';
import 'toastr/toastr.scss';

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

export const ProductionFormComponent = {
    bindings: {
        resolve: '<',
        modalInstance: '<'
    },
    template,
    controller: class ProductionFormController {
        constructor(ProductionDataService, $state){
            'ngInject';

            this.dataService = ProductionDataService;
            this.isSaving = false;
            this.currentState = $state.current.name;
            this.departments = ['Landes', 'Pyrenees', 'HautePyrenees', 'Gers', 'HauteGaronne', 'Tarn', 'LotGaronne', 'Gironde'];
            this.batimentTypes = ['batiment', 'cabane'];
        }

        $onInit() {
            this.production = this.resolve.production;
            this.facilities = this.resolve.facilities;
        }

        onSubmit() {
            this.isSaving = true;
            switch(this.currentState.replace("management.", "")) {
                case 'edit':
                    this.dataService.update(this.production).then(() => {
                        toastr.success('a été mise à jour.', this.production.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'remove':
                    this.dataService.remove(this.production).then(() => {
                        toastr.warning('a été supprimée.', this.production.name);
                        this.modalInstance.close()
                    });
                    break;
                case 'create':
                    this.dataService.create(this.production).then(() => {
                        toastr.info('a été créée.', this.production.name);
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