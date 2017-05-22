const assert = require('chai').assert;
const FacilityCharges = require('../electron/database/domain/facility_charges');
const Production = require('../electron/database/domain/production');
const Facility = require('../electron/database/domain/facility');
const Repository = require('../electron/database/repository/repository');

describe('RepositoryTest', () => {

    describe('getTest', () => {
        it('should return an object typed according to constructor parameter', () => {
            let repositories = [];
            repositories.push(new Repository('facilities', Facility));
            repositories.push(new Repository('facility_charges', FacilityCharges));
            repositories.push(new Repository('productions', Production));

            repositories.forEach((repository) => {
                const obj = repository.get(1);
                assert.instanceOf(obj, repository.clazz);
            });
        });
    });

    describe('getAllTest', () => {
        it('should return a collection of objects typed according to constructor parameter', () => {
            let repositories = [];
            repositories.push(new Repository('facilities', Facility));
            repositories.push(new Repository('facility_charges', FacilityCharges));
            repositories.push(new Repository('productions', Production));

            repositories.forEach((repository) => {
                const collection = repository.getAll();
                collection.forEach((obj) => {
                    assert.instanceOf(obj, repository.clazz);
                })
            });
        });
    });

});