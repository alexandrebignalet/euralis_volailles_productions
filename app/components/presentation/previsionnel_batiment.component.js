import angular from 'angular';
import template from './previsionnel_batiment.html';

export const PrevisionnelBatimentComponent = {
    bindings: { productions: '<' },
    template,
    controller: class PrevisionnelBatimentController {
        constructor($scope){
            'ngInject';
            this.scope = $scope;
            this.facilityNb = 2;
            this.investmentChoosen = null;
            this.annuityDuration = 15;
            this.interest = 2.5;
            this.sliderOptions = {
                floor: 1,
                ceil: 20
            };
        }

        $onInit() {
            if (this.productions[0].facility.type.key === 'movable') { this.facilityNb = 8; }
            this.scope.$watch('vm.facilityNb', () => {
                this.update();
            });
        }

        update() {
            angular.forEach(this.productions, (production) => {

                production.setFacilitiesNb(this.facilityNb);

                this.investmentChoosen = production.facility.investments[0];

                angular.forEach(production.facility.investments, (investment) => {
                    investment.facilityNb = this.facilityNb;
                })
            });
        }
    },
    controllerAs: 'vm'
};