import angular from 'angular';
import template from './previsionnel_batiment.html';
import {Prospect} from "../../../model/prospect";
import {DEFAULT_INVESTMENT_CHOOSEN, processInvestmentAnnuity} from "./functions";

export const PrevisionnelBatimentComponent = {
    bindings: { productions: '<', active: '<' },
    template,
    controller: class PrevisionnelBatimentController {

        constructor($scope, $timeout, PDFGenerator, ModalService){
            'ngInject';
            this.scope = $scope;
            this.ModalService = ModalService;
            this.PDFGenerator = PDFGenerator;
        }

        $onInit() {
            this.facilityNb = 2;

            this.investmentChosen = DEFAULT_INVESTMENT_CHOOSEN;
            this.annuityDuration = 15;
            this.interest = 2.5;
            this.insuranceCostPercent = 0;

            this.sliderOptions = {
                floor: 1,
                ceil: 20
            };
            this.pickerIsOpen = false;
            this.format = 'dd/MM/yyyy';
            this.scope.date = new Date();
            this.dateOptions = {
                showWeeks: true
            };
            if (this.productions[0].facility.type.key === 'movable') { this.facilityNb = 8; }
            this.scope.$watch('vm.facilityNb', () => {
                this.update();
            });
        }

        onNewTabSelected() {
            this.investmentChosen = DEFAULT_INVESTMENT_CHOOSEN;
        }

        hasUser() {
            return !!this.PDFGenerator.UserService.getUser();
        }

        openPicker() {
            this.pickerIsOpen = true;
        }

        startPrint(production) {
            this.ModalService.open('prospectForm', { prospect: new Prospect({}) })
                .then((prospect) => {
                    this.generatePDF(production, prospect)
                });
        }

        generatePDF(production, prospect) {
            const annuity = { duration: this.annuityDuration, interest: this.interest };
            this.PDFGenerator.generatePrevisionnel(
              production,
              this.insuranceCostPercent,
              this.investmentChosen,
              this.scope.date,
              annuity,
              prospect);
        }

        update() {
            angular.forEach(this.productions, (production) => {
                production.setFacilitiesNb(this.facilityNb);
            });
        }

        currentInvestmentAnnuity() {
            return processInvestmentAnnuity(
              this.investmentChosen, { duration: this.annuityDuration, interest: this.interest }
            )
        }
    },
    controllerAs: 'vm'
};
