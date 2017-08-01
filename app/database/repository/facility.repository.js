const DatabaseService = require('../database.service.js');
const Facility = require('../domain/facility');
const Investment = require('../domain/investment');
const FacilityCharges = require('../domain/facility_charges');

class FacilityRepository extends DatabaseService {
    constructor() {
        super();
        this.entityName = 'facility';
    }

    get(id) {
        let facilityEntity;
        return super.find(this.entityName, id)
            .then(({facilities, facilitiesCharges, investments}) => {
                let images = [];

                if (facilities[0].attachments) {
                    let findAttachmentsPromises = [];

                    Object.keys(facilities[0].attachments).forEach((key) => {
                        findAttachmentsPromises.push(this.db.rel.getAttachment(this.entityName, facilities[0].id, key));
                    });

                    return Promise.all(findAttachmentsPromises)
                        .then((images) => {
                            images.forEach((img, index) => {
                                img.name = Object.keys(facilities[0].attachments)[index];
                            });
                            return {facilities, facilitiesCharges, investments, images};
                        });
                }

                return {facilities, facilitiesCharges, investments, images}
            })
            .then(({facilities, facilitiesCharges, investments, images}) => {
console.log(facilities[0]);
                facilityEntity = new Facility(facilities[0]);
console.log(facilityEntity);
                facilityEntity.images = images;

                facilityEntity.facilityCharges = new FacilityCharges(facilitiesCharges[0]);

                facilityEntity.investments = [];

                if (!investments) return facilityEntity;

                investments.forEach((investment) => {
                    facilityEntity.investments.push(new Investment(investment))
                });

                return facilityEntity;
            });
    }

    getAll() {
        let facilityEntity;
        return super.find(this.entityName)
            .then(({facilities, facilitiesCharges, investments}) => facilities.map((facility) => {
                facilityEntity = new Facility(facility);

                for( let i = 0; i  < facilitiesCharges.length ; i++) {
                    if (facilitiesCharges[i].id === facility.facilityCharges) {
                        facilityEntity.facilityCharges = new FacilityCharges(facilitiesCharges[i]);
                        break;
                    }
                }

                facilityEntity.investments = [];

                if (!investments) return facilityEntity;

                for( let y = 0; y < investments.length ; y++) {
                        if (facility.investments.indexOf(investments[y].id) !== -1) {
                            facilityEntity.investments.push(new Investment(investments[y]));
                        }
                    }


                    return facilityEntity;
                })
            );
    }

    /**
     * @type Facility
     * @param facility
     * @return Promise
     */
    create(facility) {
        return super.save(this.entityName, facility)
            .then((facilitySaved) => {

                    return super.addAttachments(this.entityName, {
                            id: facilitySaved.facilities[0].id,
                            rev: facilitySaved.facilities[0].rev
                        }, facility.images)
                }
            )
            .then((obj) => this.get(obj.id));
    }

    update(facility) {
        return super.find(this.entityName, facility.id)
            .then((facilityFound) => {
                facility.rev = facilityFound.facilities[0].rev;
                return facility;
            })
            .then((facilityToUpdate) => this.create(facilityToUpdate))
    }

    del(id) {
        return super.find(this.entityName, id)
            .then(({facilities}) => super.remove(this.entityName, {id: facilities[0].id, rev: facilities[0].rev}));
    }
}

module.exports = FacilityRepository;