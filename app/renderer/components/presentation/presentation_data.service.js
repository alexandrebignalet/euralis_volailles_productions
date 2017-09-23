export class PresentationDataService {
    constructor(PouchDataService) {
        'ngInject';
        this.PouchDataService = PouchDataService;
        this.entityName = 'production'
    }

    getProduction(department, facilityType) {

        return this.PouchDataService.get(this.entityName)
            .then((productions) => {
            console.log(productions);
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