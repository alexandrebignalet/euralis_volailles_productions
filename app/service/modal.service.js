/**
 * Created by alexandre on 5/19/17.
 */
export class ModalService {
    constructor($uibModal, $state){
        'ngInject';
        this.modal = $uibModal;
        this.state = $state;
    }

    open(component, resolve) {
        return this.modal.open({
            size: 'lg',
            animation: true,
            component: component,
            resolve,
        }).result.then(
            () => this.state.go('^', null, {reload: true}),
            () => this.state.go('^')
        );
    }
}