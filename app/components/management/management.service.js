/**
 * Created by alexandre on 5/19/17.
 */
export class ManagementService {
    constructor($uibModal, $state){
        'ngInject';
        this.modal = $uibModal;
        this.state = $state;
    }

    open(component, production) {
        return this.modal.open({
            size: 'lg',
            animation: true,
            component: component,
            resolve: {
                production: production
            }
        }).result.then(
            () => this.state.go('^', null, {reload: true}),
            () => this.state.go('^')
        );
    }
}