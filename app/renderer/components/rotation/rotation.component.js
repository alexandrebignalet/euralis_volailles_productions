import template from './rotation.html';
import {PintadesDemareesRotation, ProductionRotation} from "./production.rotation";

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

            this.investmentChosen = 'none';
            this.showDialog = false;
            this.investment = {
                annuityDuration: 15,
                interest: 2.5
            };

            this.PDFGenerator = PDFGenerator;

            this.investmentsAvailable = [];
            $scope.$watchCollection('vm.productionsChosen', (productions) => {
                this.investmentsAvailable = this.retrieveInvestmentsAvailable(productions);
            })
        }

        $onInit() {
            this.productions = this.productions.map((prod) => new ProductionRotation(prod));
            this.productions.push(new PintadesDemareesRotation());
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

        retrieveInvestmentsAvailable(productions) {
            return productions
              .reduce((acc, prod) => {
                  const ids = acc.map(({ id }) => id);
                  const notIn = prod.facility.investments.filter(({ id }) => ids.indexOf(id) === -1);
                  return acc.concat(notIn)
              }, []);
        }
    },
    controllerAs: 'vm'
};
