import template  from './presentation.html';
import './presentation.scss';

export const PresentationComponent = {
    bindings: {},
    template,
    restrict: 'E',
    controller: class PresentationController {
        constructor($stateParams){
            'ngInject';
            this.department = $stateParams.department;
        }
    },
    controllerAs: 'vm'
};