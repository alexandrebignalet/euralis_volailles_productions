/**
 * Created by alexandre on 5/19/17.
 */
export class ModalService {
    constructor($uibModal, $state){
        'ngInject';
        this.modal = $uibModal;
        this.state = $state;
    }

    open(component, resolveInModal) {
        return this.modal.open({
                size: 'lg',
                animation: true,
                component: component,
                resolve: resolveInModal,
            }).result;
    }
}