import template from './annuity-line.directive.html';
import {processInvestmentAnnuity} from "../functions";

export const AnnuityLineDirective = {
  restrict: 'A',
  scope: {
    colspan: '<',
    investments: '<investments',
    investmentChosen: '=investmentChosen',
    duration: '=duration',
    interest: '=interest'
  },
  controllerAs: 'vm',
  bindToController: true,
  template,
  controller: function() {
    const vm = this;

    vm.currentInvestmentAnnuity = function() {
      return processInvestmentAnnuity(
        vm.investmentChosen, { duration: vm.duration, interest: vm.interest }
      )
    }
  }
};
