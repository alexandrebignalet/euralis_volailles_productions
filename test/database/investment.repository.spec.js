const assert = require('chai').assert;
const Investment = require('../../app/database/domain/investment');
const InvestmentRepository = require('../../app/database/repository/investment.repository.js');

describe('InvestmentRepositoryTest', () => {
    let repository;

    beforeEach(() => {
        repository = new InvestmentRepository();
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
        it('should save a investment object in pouch', () => {
            let investment = new Investment({id:1, name:"toto", designation:"tata", description:"zozo", papers:10,
                masonry:1, facilityMoutingDeliveryPrice:1,
                equipmentMountingDeliveryPrice:1, diverseOptions:1, subsidies:1, helpEuralis:1});

            return repository.create(investment)
                .then((data) => {
                    assert.instanceOf(data, Investment);
                    assert(data.masonry === 1)
                })
        });

        it('should find an investment object in pouch', () => {

            return repository.get(1)
                .then((data) => {
                    assert.instanceOf(data, Investment);
                })
        });

        it('should find all investment objects in pouch', () => {

            return repository.getAll()
                .then((data) => {
                    data.forEach((item) => {
                        assert.instanceOf(item, Investment);
                    })
                })
        });

        it('should update a investment object in pouch', () => {

            return repository.get(1)
                .then((investment) => {
                    investment.masonry = 1;
                    investment.diverseOptions = 1;
                    return investment;
                })
                .then((investment) => repository.update(investment))
                .then((investmentUpdated) => {
                    assert(investmentUpdated.masonry === 1);
                    assert(investmentUpdated.diverseOptions === 1);
                })
        });

        it('should delete a investment object in pouch', () => {

            return repository.del(1)
                .then((data) => assert(data.deleted));
        });
    });
});