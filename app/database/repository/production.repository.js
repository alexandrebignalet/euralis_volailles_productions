const DatabaseService = require('../database.service.js');
const Facility = require('../domain/facility');
const FacilityCharges = require('../domain/facility_charges');
const Investment = require('../domain/investment');
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
                let images = [];

                if (productions[0].attachments) {
                    let findAttachmentsPromises = [];

                    Object.keys(productions[0].attachments).forEach((key) => {
                        findAttachmentsPromises.push(this.db.rel.getAttachment(this.entityName, productions[0].id, key));
                    });

                    return Promise
                        .all(findAttachmentsPromises)
                        .then((images) => {
                            images.forEach((img, index) => {
                                img.name = Object.keys(productions[0].attachments)[index];
                            });
                            return {productions, facilities, facilitiesCharges, images};
                        });
                }

                return {productions, facilities, facilitiesCharges, images}
            })
            .then(({productions, facilities, facilitiesCharges, images}) => {
                productionEntity = new Production(productions[0]);
                productionEntity.facility = new Facility(facilities[0]);
                productionEntity.facility.facilityCharges = new FacilityCharges(facilitiesCharges[0]);
                productionEntity.images = images;
                
                return productionEntity;
            });
    }

    getAll() {
        let productionEntity;
        return super.find(this.entityName)
            .then(({productions, facilities, facilitiesCharges, investments}) => {

                return productions.map((production) => {
                        productionEntity = new Production(production);
                        for (let i = 0; i < facilities.length; i++) {
                            if (production.facility === facilities[i].id) {
                                productionEntity.facility = new Facility(facilities[i]);
                                for (let y = 0; y < facilitiesCharges.length; y++) {
                                    if (productionEntity.facility.facilityCharges === facilitiesCharges[y].id) {
                                        productionEntity.facility.facilityCharges = new FacilityCharges(facilitiesCharges[y]);
                                        break;
                                    }
                                }

                                productionEntity.facility.investments = [];
                                for (let j = 0; j < investments.length; j++) {
                                    let index = facilities[i].investments.indexOf(investments[j].id);
                                    if (index !== -1) {
                                        productionEntity.facility.investments.push(new Investment(investments[j]));
                                    }
                                }
                                break;
                            }
                        }
                        return productionEntity;
                    }
                );

            });
    }

    /**
     * @type Production
     * @param production
     * @return Promise
     */
    create(production) {
        return super.save(this.entityName, production)
            .then((productionSaved) => {

                    return super.addAttachments(this.entityName, {
                        id: productionSaved.productions[0].id,
                        rev: productionSaved.productions[0].rev
                    }, production.images)
                }
            )
            .then((obj) => this.get(obj.id));
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