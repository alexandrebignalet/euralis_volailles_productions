import template from './rotation.html';
import {PintadesDemareesRotation, ProductionRotation} from "./production.rotation";
import {DEFAULT_INVESTMENT_CHOOSEN} from "../presentation/previsionnel/functions";

export const RotationComponent = {
    bindings: { productions: '<' },
    template,
    controller: class RotationController {
        constructor(FACILITIES_TYPES, facilityFilter, $scope, $timeout, PDFGenerator){
            'ngInject';

            this.facilityTypes = FACILITIES_TYPES;
            this.facilityType = FACILITIES_TYPES[0];
            this.facilityNb = 2;
            this.productionsChosen = [];
            this.filter = facilityFilter;

            this.insuranceCostPercent = 0;
            this.investmentChosen = 'none';
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

        anyProductionChosen() {
            return this.productionsChosen.length > 0;
        }

        canGeneratePDF() {
            return this.anyProductionChosen()
            && this.investment.interest
            && this.investment.annuityDuration
            && this.hasUser();
        }

        breedingPerYear() {
            return this.productionsChosen.reduce((sum, rot) => sum + rot.breedingPerYear, 0)
        }

        getTotalProductionsChosen() {
            return this.productionsChosen.reduce((acc, production) => {
                return  acc + production.getAnnualBrutMargin();
            }, 0);
        }

        generatePDF() {
            this.PDFGenerator.generateRotations(
              this.facilityNb,
              this.productionsChosen,
              this.investmentChosen,
              {
                interest: this.investment.interest,
                duration: this.investment.annuityDuration
              },
              this.insuranceCostPercent
            );
        }

        getNetMarginForChosenProductionsBeforeInsurance() {
            const annuity = this.investmentChosen !== DEFAULT_INVESTMENT_CHOOSEN
              ? this.investmentChosen.getAnnuity(this.investment.annuityDuration, this.investment.interest)
              : 0;
            return this.getTotalProductionsChosen() - annuity;
        }

        getNetMarginForChosenProductions() {
            const beforeInsurance = this.getNetMarginForChosenProductionsBeforeInsurance();
            const insuranceCost = beforeInsurance * this.insuranceCostPercent / 100;
            return beforeInsurance - insuranceCost;
        }

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
