import template  from './investments_presentation.html';

export const InvestmentsPresentationComponent = {
    bindings: { investments: '<' },
    template,
    controller: class InvestmentPresentationController {

        $onInit() {
            this.selectedInvestment = this.investments[0];
        }

        selectInvestment(investment) {
            this.selectedInvestment = investment;
        }
    }
};