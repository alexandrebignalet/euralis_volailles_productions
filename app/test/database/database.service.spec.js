import {assert}  from 'chai';
import {FacilityCharges} from '../../renderer/components/management/facility_charges/facility_charges';
import {Production} from '../../renderer/components/management/production/production';
import {Facility} from '../../renderer/components/management/facility/facility';
import {Investment} from '../../renderer/components/management/investment/investment';
import {PouchDbService} from '../../renderer/database/pouchdb.service';


describe('PouchDbServiceTest', () => {
    let pouchDbService = new PouchDbService('test', { name: 'euralis_volailles_db-', remoteUrl: 'http://46.101.36.6:5984/' });

    after(function() {
        this.timeout  = 10000000000;
        return pouchDbService.destroy()
            .then(() => pouchDbService.remoteDb.destroy())
            .then(() => pouchDbService.init())
            .catch(() => pouchDbService.init());
    });

    describe('constructor and init tests', () => {
        it('should be a singleton', () => {
            assert.isNotNull(pouchDbService);
        });

        it('should create the db if not exists yet', () => {
            return pouchDbService.db.info()
                .then((data) => {
                    assert(data.db_name === pouchDbService.db.name)
                });
        });
    });
    
    describe('find function blocks test', () => {
        it('should return some data if there is', () => {
            return pouchDbService.find('facilityCharges').then(data => assert.isDefined(data));
        });

        it('should return an empty array if no data', () => {
            return pouchDbService.find('production').then(data => assert(data.length === 0));
        });

        it('should transform nested relation id by the right object(s) retrieved', () => {
            let data = {
                productions: [{
                    name: 'maProd',
                    facility: '1344234'
                }],
                facilities: [
                    {
                        id: '1344234',
                        name: 'goodfacilitytopick',
                        facilityCharges: '132ABC',
                        investments: ['invest1', 'invest2']
                    },
                    {
                        id: 'NONONO',
                        name: 'wrongfacilitytopick',
                        facilityCharges: '133ABC',
                        investments: ['invest3']
                    }
                ],
                facilitiesCharges: [
                    {
                        name: 'toto',
                        id: '132ABC'
                    },
                    {
                        name: 'tqtq',
                        id: '133ABC'
                    }
                ],
                investments: [
                    {
                        name: 'tutu',
                        id: 'invest1'
                    },
                    {
                        name: 'zuzu',
                        id: 'invest2'
                    },
                    {
                        name: 'zaza',
                        id: 'invest3'
                    }
                ]
            };

            return pouchDbService.transformRelationIdByObject('production', data.productions[0], data)
                .then((desiredObject) => {
                    assert(desiredObject.facility.facilityCharges.name === 'toto');
                    assert(desiredObject.facility.facilityCharges.id === '132ABC');
                    assert.deepEqual(desiredObject.facility.investments[0], data.investments[0]);
                    assert.deepEqual(desiredObject.facility.investments[1], data.investments[1]);
                });
        });

        it('should return the array of object well formatted with find and transform methods', () => {
            let facilityCharges = new FacilityCharges({id: 'uid9843', name:'toto', warming:1, chickPrice:1, vetPrice:1,
                contributions:1, disinfection:1, commodities:1,
                litter:1, catching:1, insurances:1});

            let investment = new Investment({id: 'invest1'});
            let investment2 = new Investment({id: 'invest2'});
            let facility = new Facility({id: '3', size: 3222, type: 'movable', facilityCharges: facilityCharges, investments: [investment, investment2]});
            let production = new Production({id: '3', department: 'toto', name:'toto', chickNb:1, avgWeight:1, age:1, breedingPerYear:1,
                consumptionIndex:1, mortalityPercent:1,
                vaccinesPrice:1, foodPrice:1, classedPrice:1, declassedPrice:1, breedingDeclassedPercent:1, restraintPercent:1,
                chickPurchaseReduction:1, facility: facility});

            let production2 = new Production({id: '1', department: 'toto', name:'toto', chickNb:1, avgWeight:1, age:1, breedingPerYear:1,
                consumptionIndex:1, mortalityPercent:1,
                vaccinesPrice:1, foodPrice:1, classedPrice:1, declassedPrice:1, breedingDeclassedPercent:1, restraintPercent:1,
                chickPurchaseReduction:1, facility: facility});

            let production3 = new Production({id: '2', department: 'toto', name:'toto', chickNb:1, avgWeight:1, age:1, breedingPerYear:1,
                consumptionIndex:1, mortalityPercent:1,
                vaccinesPrice:1, foodPrice:1, classedPrice:1, declassedPrice:1, breedingDeclassedPercent:1, restraintPercent:1,
                chickPurchaseReduction:1, facility: facility});

            let production4 = new Production({id: '4', department: 'tata', name:'toto', chickNb:1, avgWeight:1, age:1, breedingPerYear:1,
                consumptionIndex:1, mortalityPercent:1,
                vaccinesPrice:1, foodPrice:1, classedPrice:1, declassedPrice:1, breedingDeclassedPercent:1, restraintPercent:1,
                chickPurchaseReduction:1, facility: facility});


            return pouchDbService.save('facilityCharges', facilityCharges)
                .then((data) => pouchDbService.save('investment', investment2))
                .then(() => pouchDbService.save('investment', investment))
                .then(() => pouchDbService.save('facility', facility))
                .then(() => pouchDbService.save('production', production3))
                .then(() => pouchDbService.save('production', production2))
                .then(() => pouchDbService.save('production', production4))
                .then(() => pouchDbService.save('production', production))
                .then(() => pouchDbService.find('production'))
                .then((data) => {
                    assert.isDefined(data);
                    assert.strictEqual(data[0].facility.id, facility.id);
                    assert.strictEqual(data[0].facility.size, facility.size);
                    assert.strictEqual(data[0].facility.investments.length, facility.investments.length);
                    assert.strictEqual(data[0].facility.investments[0].id, facility.investments[0].id);
                });
        });
    });

    // *************  WRITE NEW TEST ABOVE TO THIS LINE **********************///
    // ***********  LAST TEST DESTROY THE DB *********************///

    describe('database empty', () => {
        it('should empty the database', () => {
            return pouchDbService.db.allDocs()
                .then((data) => {
                    assert(data.total_rows > 0)
                })
                .then(() => pouchDbService.destroy())
                .then((response) => assert(response.ok))
                .then(() => pouchDbService.db.info())
                .then(() => {
                    // database is destroyed
                    assert(false)
                })
                .catch(() => assert(true));
        });
    });
});