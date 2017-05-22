import template from './navbar.html';
import './navbar.scss';
import logo from '../../images/logo.png';

export const NavbarComponent = {
    bindings: {},
    template,
    restrict: 'E',
    controller: class NavbarController {
        constructor(StateHandler){
            'ngInject';
            this.stateHandler = StateHandler;
            this.logo = logo;
        }
    },
    controllerAs: 'vm'
};