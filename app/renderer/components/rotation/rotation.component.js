import template from './rotation.html';
import {ProductionRotation} from "./production.rotation";

export const RotationComponent = {
    bindings: { productions: '<' },
    template,
    controller: class RotationController {
        constructor(FACILITIES_TYPES, facilityFilter, $scope, $timeout, PDFGenerator){
            'ngInject';

            this.facilityTypes = FACILITIES_TYPES;
            this.facilityType = null;
            this.facilityNb = 2;
            this.productionsChosen = [];
            this.filter = facilityFilter;
            this.timeout = $timeout;
            this.investmentChosen = 'none';
            this.showDialog = false;
            this.investment = {
                annuityDuration: 15,
                interest: 2.5
            };

            this.PDFGenerator = PDFGenerator;

            $scope.$watch('vm.facilityType', () => {
                this.timeout(() => {
                    $('#production_selector').multiselect('rebuild');
                });
            });
        }

        $onInit() {
            this.productions = this.productions.map((prod) => new ProductionRotation(prod));

            this.timeout(() => {
                $('#production_selector').multiselect({
                    onChange: () => {
                        var selectedOptions = $('#production_selector option:selected');

                        if (selectedOptions.length >= 3) {
                            // Disable all other checkboxes.
                            var nonSelectedOptions = $('#production_selector option').filter(function() {
                                return !$(this).is(':selected');
                            });

                            nonSelectedOptions.each(function() {
                                var input = $('input[value="' + $(this).val() + '"]');
                                input.prop('disabled', true);
                                input.parent('li').addClass('disabled');
                            });
                        }
                        else {
                            // Enable all checkboxes.
                            $('#production_selector option').each(function() {
                                var input = $('input[value="' + $(this).val() + '"]');
                                input.prop('disabled', false);
                                input.parent('li').addClass('disabled');
                            });
                        }
                    }
                });
            });
        }

        hasUser() {
            return !!this.PDFGenerator.UserService.getUser();
        }

        getTotalProductionsChosen() {
            return this.productionsChosen.reduce((acc, production) => {
                return  acc + production.getAnnualBrutMargin();
            }, 0);
        }

        generatePDF(nbFacilities, productions, investment, annuity) {
            this.PDFGenerator.generateRotations(nbFacilities, productions, investment, annuity);
        }

        getNetMarginForChosenProductions(annuity) { return this.getTotalProductionsChosen() - annuity; }

        addProduction(production) {
            this.productionsChosen.push(production);
        }

        removeProduction(production) {
            for(let i = 0; i < this.productionsChosen.length ; i++) {
                if(this.productionsChosen[i].id === production.id) {
                    this.productionsChosen.splice(i,1);
                    break;
                }
            }
        }

        getInvestmentsAvailable() {
            let out = [];
            let tmp = [];

            this.productionsChosen.forEach((production) => {
                production.facility.investments.forEach((investment) => {
                    if(tmp.indexOf(investment.id) === -1) {
                        tmp.push(investment.id);
                        out.push(investment);
                    }
                })
            });

            tmp = null;
            return out;
        }
    },
    controllerAs: 'vm'
};