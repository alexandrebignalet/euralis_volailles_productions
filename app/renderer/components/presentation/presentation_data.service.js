export class PresentationDataService {
    constructor(PouchDataService, FACILITIES_TYPES) {
        'ngInject';
        this.PouchDataService = PouchDataService;
        this.FACILITIES_TYPES = FACILITIES_TYPES
    }

    getProdByDeptAndFacilityType(department) {

        return this.PouchDataService.getProdByDept(department)
            .then((productions) => {
                        let result = {};
                        for(let i = 0; i < productions.length ; i++) {
                            this.FACILITIES_TYPES.forEach((type) => {
                                if(!result.hasOwnProperty(type.key)) result[type.key] = [];
                                if(productions[i].facility.type.key === type.key) {
                                    result[type.key].push(productions[i]);
                                }
                            });
                        }

                        return Object.keys(result).map((key) => result[key]);
                });
    }
}