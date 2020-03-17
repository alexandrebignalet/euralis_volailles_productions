import template  from './investments_presentation.html';

export const InvestmentsPresentationComponent = {
    bindings: { investments: '<', investmentChosen: '<' },
    template,
    controller: class InvestmentPresentationController {

        active() {
            const index = this.investments.indexOf(this.investmentChosen);
            return index !== -1 ? index : 0;
        }

        $onChange(currentValue) {
            this.investmentChosen = currentValue;
        }

        selectInvestment(investment) {
            this.investmentChosen = investment;
        }
    }
};