const assert = require('chai').assert;
const StorageService = require('../electron/database/storage.service');
const FacilityCharges = require('../electron/database/domain/facility_charges');

describe('StorageService', () => {
    this.ss = null;

    beforeEach(() => {
        this.ss = new StorageService('facilities');
    });

    describe('constructorTest', () => {
        it('should have attributes setted: path and some data (with a valid filename)', () => {
            assert.notEqual(this.ss.path.indexOf('facilities'), -1);
            assert.isArray(this.ss.data);
            assert.operator(this.ss.data.length, '>', 0);
        });
    });

    describe('getTest', () => {
        it('should retrieve the corresponding id in the dataset', () => {
            const facility = this.ss.get(1).data;
            assert.isObject(facility);
            assert.equal(facility.id, 1);
        });
    });

    describe('getAllTest', () => {
        it('should retrieve the collection in the dataset', () => {
            const facilities = this.ss.getAll();
            assert.isArray(facilities);
            assert.operator(facilities.length, '>', 0);
        });
    });

    describe('createTest', () => {
        it('should create a new object in the dataset', () => {
            const otherStorageService = new StorageService('facility_charges');
            const facilityCharges = otherStorageService.getAll();
            const initial_length = facilityCharges.length;

            assert.isArray(facilityCharges);
            assert.operator(facilityCharges.length, '>', 0);

            let data = Object.assign({}, otherStorageService.get(1).data);
            data.warming = 0.097;
            const newFacilityCharges = new FacilityCharges(data);
            otherStorageService.create(newFacilityCharges);

            assert.operator(initial_length, '<', otherStorageService.getAll().length)
        });
    });

    describe('updateTest', () => {
        it('should update an object in the dataset', () => {
            const otherStorageService = new StorageService('facility_charges');

            const facilityCharges = otherStorageService.get(otherStorageService.lastId).data;
            const initialWarming = facilityCharges.warming;

            facilityCharges.warming = 1000;

            otherStorageService.update(facilityCharges);

            const facilityChargesUpdated = otherStorageService.get(otherStorageService.lastId).data;

            assert.notEqual(initialWarming, facilityChargesUpdated.warming);
            assert.equal(facilityCharges.warming, facilityChargesUpdated.warming);
        });
    });

    describe('removeTest', () => {
        it('should remove a given object in the dataset', () => {
            const otherStorageService = new StorageService('facility_charges');
            const facilityCharges = otherStorageService.getAll();
            const initial_length = facilityCharges.length;

            assert.isArray(facilityCharges);
            assert.operator(facilityCharges.length, '>', 0);

            otherStorageService.remove(otherStorageService.lastId);

            assert.operator(initial_length, '>', otherStorageService.getAll().length)
        });
    });
});