const assert = require('chai').assert;
const Facility = require('.././domain/facility');
const Investment = require('.././domain/investment');
const FacilityCharges = require('.././domain/facility_charges');
const FacilityRepository = require('.././repository/facility.repository.js');

describe('FacilityRepositoryTest', () => {
    let repository;

    beforeEach(() => {
        repository = new FacilityRepository();
    });

    /**
     * return statement is really important here, because it will tell mocha to resolve the promise before going on.
     */
    after(() => {
        return repository.dbService.destroy()
            .then(() => repository.dbService.init())
            .catch(() => repository.dbService.init());
    });

    describe('constructor test', () => {
        it('should be created with new', () => {
            assert.isNotNull(repository);
        });
    });

    describe('crud test', () => {
        it('should save a facility object in pouch', () => {
            let investment = new Investment({id:1, masonry:1, facilityMoutingDeliveryPrice:1,
                equipmentMountingDeliveryPrice:1, subsidies:1, helpEuralis:1, diverseOptions:1});
            let investment2 = new Investment({id:2, masonry:2, facilityMoutingDeliveryPrice:2,
                equipmentMountingDeliveryPrice:2, subsidies:2, helpEuralis:2, diverseOptions:1});

            let facilityCharges = new FacilityCharges({id: 1, name:'toto', warming:1, chickPrice:1, vetPrice:1,
                contributions:1, disinfection:1, commodities:1,
                litter:1, catching:1, insurances:1});
            let facilityCharges1 = new FacilityCharges({id: 14, name:'toto', warming:2, chickPrice:1, vetPrice:1,
                contributions:1, disinfection:1, commodities:1,
                litter:1, catching:1, insurances:1});
            let facilityCharges2 = new FacilityCharges({id: 23, name:'toto', warming:3, chickPrice:1, vetPrice:1,
                contributions:1, disinfection:1, commodities:1,
                litter:1, catching:1, insurances:1});

            let facility = new Facility({id: 3, size: 3222, type: 'cabane', facilityCharges: facilityCharges.id, investments: [investment.id, investment2.id]});
            let facility1 = new Facility({id: 43, size: 3222, type: 'cabane', facilityCharges: facilityCharges1.id, investments: [investment2.id]});
            let facility2 = new Facility({id: 53, size: 3222, type: 'cabane', facilityCharges: facilityCharges2.id, investments: [investment2.id]});


             return repository.dbService.save('investment', investment)
                .then(() => repository.dbService.save('investment', investment2))
                .then(() => repository.dbService.save('facilityCharges', facilityCharges))
                .then(() => repository.dbService.save('facilityCharges', facilityCharges1))
                .then(() => repository.dbService.save('facilityCharges', facilityCharges2))
                .then(() => repository.create(facility))
                .then((data) => {
                    assert.instanceOf(data, Facility);
                    assert.instanceOf(data.investments[0], Investment);
                    assert(data.facilityCharges.warming === 1);
                })
                .then(() => repository.create(facility1))
                .then((data) => {
                    assert.instanceOf(data, Facility);
                    assert.instanceOf(data.investments[0], Investment);
                    assert(data.facilityCharges.warming === 2);
                })
                .then(() => repository.create(facility2))
                .then((data) => {
                    assert.instanceOf(data, Facility);
                    assert.instanceOf(data.investments[0], Investment);
                    assert(data.facilityCharges.warming === 3);
                });
        });

        it('should find a facility object in pouch', () => {

            return repository.get(3)
                .then((data) => {
                    assert.instanceOf(data, Facility);
                    assert.instanceOf(data.facilityCharges, FacilityCharges);
                    assert.instanceOf(data.investments[0], Investment);
                    assert(data.investments[0].masonry !== undefined);
                })
        });

        it('should find all facility objects in pouch', () => {

            return repository.getAll()
                .then((data) => {
                    assert(data.length > 0);
                    data.forEach((item) => {
                        assert.instanceOf(item, Facility);
                        assert.instanceOf(item.facilityCharges, FacilityCharges);
                        assert.instanceOf(item.investments[0], Investment);
                    });
                })
        });

        it('should update a facility object in pouch', () => {

            return repository.get(3)
                .then((facility) => {
                    facility.size = 2000;
                    facility.type = 'batiment';
                    return facility;
                })
                .then((facility) => repository.update(facility))
                .then((facilityUpdated) => {
                    assert(facilityUpdated.size === 2000);
                    assert(facilityUpdated.type === 'batiment');
                })
        });

        it('should delete a facility object in pouch', () => {

            return repository.del(3)
                .then((data) => assert(data.deleted));
        });
    });
});