// load the backendito
import './renderer';
const FacilityCharges = require('./database/domain/facility_charges');
const Production = require('./database/domain/production');
const Facility = require('./database/domain/facility');
const DatabaseService = require('./database/database.service');

describe('RemoteDb test using the phantom browser', () => {

    afterAll((done) => {
        window.repositories.production.remoteDb.destroy()
            .then(() => done());
    });

    it('1. app should be loaded correctly', () => {
        expect(window.repositories).not.toBeNull();
    });

    it('should save a production object containing a facility Object which contains a facilityCharges object', (done) => {
        let facilityCharges = new FacilityCharges({id: 'uid9843', name:'toto', warming:1, chickPrice:1, vetPrice:1,
            contributions:1, disinfection:1, commodities:1,
            litter:1, catching:1, insurances:1});

        let facility = new Facility({id: 3, size: 3222, type: 'cabane', facilityCharges: 'uid9843'});
        let production = new Production({id: 3, department: 'toto', name:'toto', chickNb:1, avgWeight:1, age:1, breedingPerYear:1,
            consumptionIndex:1, mortalityPercent:1,
            vaccinesPrice:1, foodPrice:1, classedPrice:1, declassedPrice:1, breedingDeclassedPercent:1, restraintPercent:1,
            chickPurchaseReduction:1, facility:3});

        window.repositories.facilityCharges.create(facilityCharges)
            .then((data) => {
                expect(data.warming).toEqual(1);
                expect(data.chickPrice).toEqual(1);
                return window.repositories.facility.create(facility);
            })
            .then((data) => {
                expect(data.size).toEqual(3222);
                expect(data.id).toEqual(3);
            })
            .then(() => window.repositories.production.create(production))
            .then((data) => {
                expect(data.name).toEqual('toto');
                expect(data.id).toEqual(3);
                done();
            })
    });

    it('2. db should not be empty', (done) => {

        window.repositories.production.db
            .info()
            .then((response) => {
                expect(response.doc_count).toBeGreaterThan(0);
                done();
            })
            .catch((err) => {
                expect(false).toBeTruthy();
                done();
            })
    });

    it('3. remote db should be empty', (done) => {
        window.repositories.production.remoteDb
            .info()
            .then((response) => {
                expect(response.doc_count).toEqual(0);
                done();
            })
            .catch((err) => {
                expect(false).toBeTruthy();
                done();
            })
    });

    it('4. local db data should be synced', (done) => {
        window.repositories.production.db
            .info()
            .then((response) => expect(response.doc_count).toBeGreaterThan(0) )
            .then(() => window.repositories.production.sync())
            .then((data) => window.repositories.production.remoteDb.info() )
            .then((response) => {
                expect(response.doc_count).toBeGreaterThan(0);
                done();
            })
            .catch(() => {
                expect(false).toBeTruthy();
                done();
            })
    });

    it('5. delete the local db', (done) => {
        window.repositories.production.destroy()
            .then(() => done());
    });

    it('6. sync the local db with external data', (done) => {
        let newDataService = new DatabaseService();

        newDataService.sync()
            .then(() => newDataService.db.info())
            .then((response) => {
                expect(response.doc_count).toEqual(3);
                done();
            })
            .catch((err) => {
                expect(false).toBeTruthy();
                done();
            })
    });
});