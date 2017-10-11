import angular from 'angular';
import template from './previsionnel_batiment.html';

export const PrevisionnelBatimentComponent = {
    bindings: { productions: '<' },
    template,
    controller: class PrevisionnelBatimentController {
        constructor($scope, $timeout, PDFGenerator){
            'ngInject';
            this.scope = $scope;
            this.timeout = $timeout;
            this.facilityNb = 2;
            this.investmentChoosen = "none";
            this.annuityDuration = 15;
            this.interest = 2.5;
            this.sliderOptions = {
                floor: 1,
                ceil: 20
            };

            this.PDFGenerator = PDFGenerator;

            this.pickerIsOpen = false;
            this.format = 'dd/MM/yyyy';
            $scope.date = new Date();
            this.dateOptions = {
                showWeeks: true
            };
        }

        $onInit() {
            if (this.productions[0].facility.type.key === 'movable') { this.facilityNb = 8; }
            this.scope.$watch('vm.facilityNb', () => {
                this.update();
            });
        }

        openPicker() {
            this.pickerIsOpen = true;
        }

        generatePDF(production, investment, date, duration, interest) {
            const annuity = { duration, interest };
            this.PDFGenerator.generatePrevisionnel(production, investment, date, annuity);
        }

        update() {
            angular.forEach(this.productions, (production) => {
                production.setFacilitiesNb(this.facilityNb);

                angular.forEach(production.facility.investments, (investment) => {
                    investment.facilityNb = this.facilityNb;
                })
            });
        }
    },
    controllerAs: 'vm'
};