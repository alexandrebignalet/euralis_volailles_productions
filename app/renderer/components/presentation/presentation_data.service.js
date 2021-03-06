const ANY_DEPARTMENT = 'Others';

export class PresentationDataService {
    constructor(PouchDbService) {
        'ngInject';
        this.PouchDbService = PouchDbService;
    }

    getProdByDeptAndFacilityType(department) {

        return this.PouchDbService.getProductionsByDepartment(department)
            .then((productions) => {
                const filterByDepartment = productions.filter((prod) => prod.department === department || prod.department === ANY_DEPARTMENT);
                const fixedProductions = filterByDepartment.filter((prod) => prod.facility.type.key === 'fixed');
                const movableProductions = filterByDepartment.filter((prod) => prod.facility.type.key === 'movable');
                return {
                    fixed: fixedProductions,
                    movable: movableProductions
                }
            });
    }
}