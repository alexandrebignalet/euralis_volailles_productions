import template from './navbar.html';
import './navbar.scss';
import logo from '../../images/logo_euralis.gif';

export const NavbarComponent = {
    bindings: {},
    template,
    restrict: 'E',
    controller: class NavbarController {
        constructor(SidebarService, $scope){
            'ngInject';
            this.logo = logo;
            this.sidebar = SidebarService;
            this.isOpen = false;

            $scope.$watch('vm.sidebar.isOpen', (n, o) => {
                this.isOpen = n;
            })
        }

        openSidebar() {
            this.sidebar.toggle();
        }

    },
    controllerAs: 'vm'
};