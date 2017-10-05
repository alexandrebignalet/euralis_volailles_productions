import template from './navbar.html';
import './navbar.scss';
import logo from '../../images/logo_euralis.gif';

export const NavbarComponent = {
    bindings: {},
    template,
    restrict: 'E',
    controller: class NavbarController {
        constructor(StateHandler, SidebarService){
            'ngInject';
            this.stateHandler = StateHandler;
            this.logo = logo;
            this.sidebar = SidebarService;
        }

        openSidebar() {
            this.sidebar.toggle();
        }

    },
    controllerAs: 'vm'
};