import template from './sidebar.html';
import productionLogo from '../../images/production_logo.png';
import facilityChargesLogo from '../../images/facility_charges_logo.png';
import facilityLogo from '../../images/facility_logo.png';
import investmentLogo from '../../images/investment_logo.png';

export const SidebarComponent = {
    template,
    controller: class SidebarController {
        constructor($uibModal, UserService, $state, SidebarService) {
            'ngInject';
            this.productionLogo = productionLogo;
            this.facilityChargesLogo = facilityChargesLogo;
            this.facilityLogo = facilityLogo;
            this.investmentLogo = investmentLogo;
            this.modal = $uibModal;
            this.state = $state;
            this.SidebarService = SidebarService;


            this.userService = UserService;
        }

        closeSidebar() {
            this.SidebarService.toggle();
        }

        openSyncDialog() {
            this.modal.open({
                size: 'lg',
                animation: true,
                backdrop: 'static',
                component: 'syncDialog'
            })
            .result
            .then( () => {
                    this.state.go('home')
                }, () => {
                    this.state.go('home')
                }
            );
        }

    },
    controllerAs: 'vm'
};