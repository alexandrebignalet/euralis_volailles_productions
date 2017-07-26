import template from './sidebar.html';
import productionLogo from '../../images/production_logo.png';
import facilityChargesLogo from '../../images/facility_charges_logo.png';
import facilityLogo from '../../images/facility_logo.png';
import investmentLogo from '../../images/investment_logo.png';

export const SidebarComponent = {
    template,
    controller: class SidebarController {
        constructor($uibModal) {
            'ngInject';
            this.productionLogo = productionLogo;
            this.facilityChargesLogo = facilityChargesLogo;
            this.facilityLogo = facilityLogo;
            this.investmentLogo = investmentLogo;
            this.modal = $uibModal;
        }

        openSyncDialog() {
            this.modal.open({
                size: 'lg',
                animation: true,
                backdrop: 'static',
                component: 'syncDialog'
            });
        }
    },
    controllerAs: 'vm'
};