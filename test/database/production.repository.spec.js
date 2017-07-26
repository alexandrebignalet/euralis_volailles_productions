const assert = require('chai').assert;
const FacilityCharges = require('../../app/database/domain/facility_charges');
const Facility = require('../../app/database/domain/facility');
const Investment = require('../../app/database/domain/investment');
const Production = require('../../app/database/domain/production');
const ProductionRepository = require('../../app/database/repository/production.repository.js');

describe('ProductionRepositoryTest', () => {
    let repository;

    beforeEach(() => {
        repository = new ProductionRepository();
    });

    after(() => {
        repository.db.destroy();
    });

    describe('constructor test', () => {
        it('should be created with new', () => {
            assert.isNotNull(repository);
        });
    });

    describe('crud test', () => {
        it('should save a production object in pouch', () => {
            let facilityCharges = new FacilityCharges({id: 1, name:'toto', warming:1, chickPrice:1, vetPrice:1,
                contributions:1, disinfection:1, commodities:1,
                litter:1, catching:1, insurances:1});
            let investment = new Investment({id:1, name:"toto", designation:"tata", description:"zozo", papers:10,
                masonry:1, facilityMoutingDeliveryPrice:1,
                equipmentMountingDeliveryPrice:1, diverseOptions:1, subsidies:1, helpEuralis:1});

            let facility = new Facility({id:1, size:1000, type:`jean`, facilityCharges: 1, investments:[investment]});
            let production = new Production({id:1, department:`gironde`, name:`toto`, chickNb:1, avgWeight:1, age:1,
                breedingPerYear:1, consumptionIndex:1, mortalityPercent:1, vaccinesPrice:1, foodPrice:1, classedPrice:1,
                declassedPrice:1, breedingDeclassedPercent:1, restraintPercent:1,
                chickPurchaseReduction:1, facility:1});

            return repository.save('facilityCharges', facilityCharges)
                .then(() => repository.save('investment', investment))
                .then(() => repository.save('facility', facility))
                .then(() => repository.create(production))
                .then((data) => {
                    assert.instanceOf(data, Production);
                    assert.instanceOf(data.facility, Facility);
                    assert.instanceOf(data.facility.facilityCharges, FacilityCharges);
                    assert(data.department === `gironde`)
                })
        });

        it('should find a Production object in pouch', () => {

            return repository.get(1)
                .then((data) => {
                    assert.instanceOf(data, Production);
                })
        });

        it('should find all production objects in pouch', () => {

            return repository.getAll()
                .then((data) => {
                    data.forEach((item) => {
                        assert.instanceOf(item, Production);
                        assert.instanceOf(item.facility, Facility);
                        assert.instanceOf(item.facility.facilityCharges, FacilityCharges);
                        assert.instanceOf(item.facility.investments[0], Investment);
                    })
                })
        });

        it('should update a Production object in pouch', () => {

            return repository.get(1)
                .then((production) => {
                    production.department = `landes`;
                    production.chickNb = 200;
                    // cannot update sub entities
                    production.facility.size = 200;
                    production.facility.facilityCharges.warming = 10;
                    return production;
                })
                .then((production) => repository.update(production))
                .then((productionUpdated) => {
                    assert(productionUpdated.department === `landes`);
                    assert(productionUpdated.chickNb === 200);
                    assert(productionUpdated.facility.size === 1000);
                    assert(productionUpdated.facility.facilityCharges.warming === 1);
                })
        });

        it('should delete a facility object in pouch', () => {

            return repository.del(1)
                .then((data) => assert(data.deleted));
        });
    });
});