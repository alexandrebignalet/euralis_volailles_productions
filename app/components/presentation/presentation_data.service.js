import angular from 'angular';
import {Production} from './production';

export class PresentationDataService {
    constructor(AppDataService) {
        'ngInject';
        this.dataService = AppDataService;
    }

    getProduction(department, facilityType) {

        const allProductions = this.dataService.getProductions();

        let productions = [];

        angular.forEach(allProductions, (production) => {

            if ( (production.department === department || production.department === 'Others') &&
                production.facility.type === facilityType)
            {
                productions.push(production);
            }
        });
        return productions.map( (production) => {
            return new Production(production);
        });
    }
}