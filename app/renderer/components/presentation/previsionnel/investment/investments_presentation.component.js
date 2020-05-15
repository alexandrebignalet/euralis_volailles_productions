import template  from './investments_presentation.html';
import {Facility} from "../../../../model/facility";

export const InvestmentsPresentationComponent = {
    bindings: {
        investments: '<',
        investmentChosen: '<',
        facilityType: '<'
    },
    template,
    controller: class InvestmentPresentationController {
        constructor($scope) {
            'ngInject';
            this.scope = $scope;
        }

        $onInit() {
            this.addedAdditionalInvestment = null; // tmp var use to watch on change

            this.scope.$watch('$ctrl.addedAdditionalInvestment', (newValue) => {
                if (this.investmentChosen === 'none') return;
                this.investmentChosen.selectOneAdditionalInvestment(newValue)
            })
        }

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

        isFacilityMovable() {
            return Facility.isMovable(this.facilityType);
        }
    }
};
