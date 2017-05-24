const DatabaseService = require('../database.service');
const Facility = require('../domain/facility');
const FacilityCharges = require('../domain/facility_charges');
const Production = require('../domain/production');

class ProductionRepository extends DatabaseService {
    constructor() {
        super();
        this.entityName = 'production';
    }

    get(id) {
        let productionEntity;
        return super.find(this.entityName, id)
            .then(({productions, facilities, facilitiesCharges}) => {
                productionEntity = new Production(productions[0]);
                productionEntity.facility = new Facility(facilities[0]);
                productionEntity.facility.facilityCharges = new FacilityCharges(facilitiesCharges[0]);
                return productionEntity;
            });
    }

    getAll() {
        let productionEntity;
        return super.find(this.entityName)
            .then(({productions, facilities, facilitiesCharges}) => productions.map((production) => {
                    productionEntity = new Production(production);
                    for (let i = 0; i < facilities.length; i++) {
                        if (production.facility === facilities[i].id) {
                            productionEntity.facility = new Facility(facilities[i]);
                            for (let y = 0; y < facilitiesCharges.length; y++) {
                                if (productionEntity.facility.facilityCharges === facilitiesCharges[y].id) {
                                    productionEntity.facility.facilityCharges = new FacilityCharges(facilitiesCharges[y]);
                                }
                            }
                        }
                    }
                    return productionEntity;
                })
            );
    }

    /**
     * @type Production
     * @param production
     * @return Promise
     */
    create(production) {
        return super.save(this.entityName, production).then((productionSaved) => this.get(productionSaved.id));
    }

    update(production) {
        return super.find(this.entityName, production.id)
            .then((productionFound) => {
                production.rev = productionFound.productions[0].rev;
                return production;
            })
            .then((productionToUpdate) => this.create(productionToUpdate))
    }

    del(id) {
        return super.find(this.entityName, id)
            .then(({productions}) => super.remove(this.entityName, {id: productions[0].id, rev: productions[0].rev}));
    }
}

module.exports = ProductionRepository;