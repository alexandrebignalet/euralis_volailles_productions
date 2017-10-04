import template from './rotation.html';

export const RotationComponent = {
    bindings: { productions: '<' },
    template,
    controller: class RotationController {
        constructor(FACILITIES_TYPES, facilityFilter, $scope, $timeout, PDFGenerator){
            'ngInject';

            this.facilityTypes = FACILITIES_TYPES;
            this.facilityType = null;
            this.facilityNb = 2;
            this.productionsChoosen = [];
            this.filter = facilityFilter;
            this.timeout = $timeout;
            this.investmentChoosen = null;
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

        $onInit() { this.timeout(() => {
                $('#production_selector').multiselect({
                    onChange: (option, checked) => {
                        // Get selected options.
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
            }); }

        getTotalProductionsChoosen() {
            return this.productionsChoosen.reduce((acc, production) => {
                return  acc + production.getBrutMargin();
            }, 0);
        }

        generatePDF(nbFacilities, productions, investment, annuity) {
            this.PDFGenerator.generateRotations(nbFacilities, productions, investment, annuity);
        }

        getNetMarginForChoosenProductions(annuity) { return this.getTotalProductionsChoosen() - annuity; }

        addProduction(production) {
            if(this.productionsChoosen.length >= 3) return;
            this.productionsChoosen.push(production);
        }

        removeProduction(production) {
            for(let i = 0; i < this.productionsChoosen.length ; i++) {
                if(this.productionsChoosen[i].id === production.id) {
                    this.productionsChoosen.splice(i,1);
                    break;
                }
            }
        }

        getInvestmentsAvailable() {
            let out = [];
            let tmp = [];

            this.productionsChoosen.forEach((production) => {
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