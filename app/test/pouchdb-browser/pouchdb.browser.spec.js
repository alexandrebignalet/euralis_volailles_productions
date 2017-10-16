import {assert}  from 'chai';
import {Investment} from '../../renderer/components/management/investment/investment';
import {Facility} from '../../renderer/components/management/facility/facility';
import {FacilityCharges} from '../../renderer/components/management/facility_charges/facility_charges';
import {Production} from '../../renderer/components/management/production/production';
import {PouchDbService} from '../../renderer/database/pouchdb.service';
import {randomBlob} from '../database/utils';

const DB_INFO = { name: 'euralis_volailles_db-', remoteUrl: 'http://46.101.36.6:5984/' };
const ATTACHMENT_SIZE = 5000;
const SYNC_TIMEOUT = 1000000000000;

describe('PouchDb Overwritten Tests - CRUD OPERATIONS', () => {

    let pouchDbService = new PouchDbService('test', DB_INFO);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = SYNC_TIMEOUT;
    
    afterAll(function(done) {
        pouchDbService.destroy()
            .then(() => pouchDbService.remoteDb.destroy())
            .then(() => pouchDbService.init())
            .catch(() => pouchDbService.init())
            .then(() => {
                done();
            });
    });

    it('should save a facilityCharges Object', function() {

        let investment = new Investment({id: 'uid9999', masonry: 132, papers: 12});

        return pouchDbService.save('investment', investment)
            .then((data) => {
                assert(data.masonry === 132);
                assert(data.papers === 12);
            })
            .catch((err) => {
                console.log(err);
                assert(false);
            });
    });

    it('should bind each attachments foreach objects', () => {

        let investment = new Investment({id: 'uid99', masonry: 132, papers: 12});
        investment.attachments = {['foo.png']: randomBlob(ATTACHMENT_SIZE)};

        return pouchDbService.save('investment', investment)
            .then((data) => pouchDbService.find('investment', investment.id))
            .then((data) => {
                assert.isDefined(data.attachments);
                assert(Object.keys(data.attachments).length > 0);
                assert.isDefined(data.attachments[Object.keys(data.attachments)[0]]);
            })
            .catch((err) => {
                console.log(err);
                assert(false);
            });
    });

    it('should save a production object containing a facility Object which contains a facilityCharges object', () => {
        let facilityCharges = new FacilityCharges({id: 'uid9843', name:'toto', warming:1, chickPrice:1, vetPrice:1,
            contributions:1, disinfection:1, commodities:1,
            litter:1, catching:1, insurances:1});
        let investment = new Investment({id: 'uid98321243', masonry: 132, papers: 1465});
        investment.attachments = {['foo.png']: randomBlob(ATTACHMENT_SIZE)};

        let facility = new Facility({id: '32ze1rz23er1', size: 3222, type: 'cabane', facilityCharges: facilityCharges,investments: [investment]});
        let production = new Production({id: '3rze213rze', department: 'tata', name:'toto', chickNb:1, avgWeight:1, age:1, breedingPerYear:1,
            consumptionIndex:1, mortalityPercent:1,
            vaccinesPrice:1, foodPrice:1, classedPrice:1, declassedPrice:1, breedingDeclassedPercent:1, restraintPercent:1,
            chickPurchaseReduction:1, facility: facility});

        return pouchDbService.save('facilityCharges', facilityCharges)
            .then(() => pouchDbService.save('investment', investment))
            .then((data) => pouchDbService.find('investment', investment.id))
            .then((findData) => {
                assert.strictEqual(findData.masonry, investment.masonry);
                assert.strictEqual(findData.papers, investment.papers);
                assert(findData.attachments.length > 0);
                return findData;
            })
            .then(() => pouchDbService.save('facility', facility))
            .then(() => pouchDbService.find('facility', facility.id))
            .then((data) => {

                assert(data.size === facility.size);
                assert(data.id === facility.id);
                return data;
            })
            .then(() => pouchDbService.save('production', production))
            .then(() => pouchDbService.find('production', production.id))
            .then((data) => {
                assert(data.name === production.name);
                assert(data.id === production.id);
                return data;
            })
            .then((data) => pouchDbService.find('facility', facility.id))
            .then((data) => {
                assert(data.id === facility.id)
            })
            .catch((err) => {
                console.log(err);
                assert(false);
            });
    });

    it('should find productions by department', () => {
        const DEPARTMENT_PARAM = 'toto';
        return pouchDbService.getProductionsByDepartment(DEPARTMENT_PARAM)
            .then((data) => {
                data.forEach((obj) => {
                    assert.strictEqual(obj.department, DEPARTMENT_PARAM)
                })
            })
    });

    it('should update an investment object in the db', () => {

        return pouchDbService.find('investment', 'uid98321243')
            .then((data) => {
                data.papers = 1000;
                return pouchDbService.save('investment', data)
            })
            .then(() => pouchDbService.find('investment', 'uid98321243'))
            .then((data) => {
                assert(data.papers === 1000);
                assert(data.id === 'uid98321243');
            });
    });

    it('should update an object in the db', () => {

        return pouchDbService.find('facility', '32ze1rz23er1')
            .then((data) => {
                data.size = 20000;
                return pouchDbService.save('facility', data)
            })
            .then(() => pouchDbService.find('facility', '32ze1rz23er1'))
            .then((data) => {
                assert(data.size === 20000);
                assert(data.id === '32ze1rz23er1');
            });
    });

    it('should delete a facilityCharges object in the db', () => {

        return pouchDbService.find('facilityCharges', 'uid98321243')
            .then((facilityCharges) => pouchDbService.remove('facilityCharges', facilityCharges.id))
            .then((data) => assert(data.deleted));

    });

    it('should delete production object', () => {

        return pouchDbService.find('production', '3rze213rze')
            .then((production) => pouchDbService.remove('production', production.id))
            .then((data) => assert(data.deleted));
    });

    it('should delete facility object', () => {

        return pouchDbService.find('facility', '32ze1rz23er1')
            .then((facility) => pouchDbService.remove('facility', facility.id))
            .then((data) => assert(data.deleted));
    });
});