import template from './sidebar.html';
import productionLogo from '../../images/production_logo.png';
import facilityChargesLogo from '../../images/facility_charges_logo.png';
import facilityLogo from '../../images/facility_logo.png';
import investmentLogo from '../../images/investment_logo.png';

export const SidebarComponent = {
    bindings: {},
    template,
    controller: class SidebarController {
        constructor(){
            this.productionLogo = productionLogo;
            this.facilityChargesLogo = facilityChargesLogo;
            this.facilityLogo = facilityLogo;
            this.investmentLogo = investmentLogo;
        }
    },
    controllerAs: 'vm'
};