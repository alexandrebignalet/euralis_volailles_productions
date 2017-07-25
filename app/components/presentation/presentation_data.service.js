export class PresentationDataService {
    constructor(ProductionDataService) {
        'ngInject';
        this.dataService = ProductionDataService;
    }

    getProduction(department, facilityType) {

        return this.dataService.all()
            .then((productions) => {
                    let productionsChoosen = [];

                    productions.forEach((production) => {
                        if ( (production.department === department || production.department === 'Others') &&
                            production.facility.type.key === facilityType.key)
                        {
                            productionsChoosen.push(production);
                        }
                    });
                    
                    return productionsChoosen;
                }
            );
    }
}