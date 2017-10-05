import {assert}  from 'chai';
import {FacilityCharges} from '../../app/renderer/components/management/facility_charges/facility_charges';
import {Production} from '../../app/renderer/components/management/production/production';
import {Facility} from '../../app/renderer/components/management/facility/facility';
import {Investment} from '../../app/renderer/components/management/investment/investment';
import DatabaseService from '../../app/main/database/database.service.js';

global.navigator = {
    userAgent: 'node.js'
};

const ATTACHMENT_SIZE = 5000;

describe('DatabaseServiceTest', () => {
    let databaseService = DatabaseService;

    after(() => {
        return databaseService.destroy()
            .then(() => databaseService.remoteDb.destroy())
            .then(() => databaseService.init())
            .catch(() => databaseService.init());
    });

    describe('constructor and init tests', () => {
        it('should be a singleton', () => {
            assert.isNotNull(databaseService);
        });

        it('should create the db if not exists yet', () => {
            return databaseService.db.info()
                .then((data) => {
                    assert(data.db_name === 'euralis_volailles_db-test')
                });
        });
    });
    
    describe('find function blocks test', () => {
        it('should return some data if there is', () => {
            return databaseService.find('facilityCharges').then(data => assert.isDefined(data));
        });

        it('should return an empty array if no data', () => {
            return databaseService.find('production').then(data => assert(data.length === 0));
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

            return databaseService.transformRelationIdByObject('production', data.productions[0], data)
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


            return databaseService.save('facilityCharges', facilityCharges)
                .then((data) => databaseService.save('investment', investment2))
                .then(() => databaseService.save('investment', investment))
                .then(() => databaseService.save('facility', facility))
                .then(() => databaseService.save('production', production3))
                .then(() => databaseService.save('production', production2))
                .then(() => databaseService.save('production', production4))
                .then(() => databaseService.save('production', production))
                .then(() => databaseService.find('production'))
                .then((data) => {
                    assert.isDefined(data);
                    assert.strictEqual(data[0].facility.id, facility.id);
                    assert.strictEqual(data[0].facility.size, facility.size);
                    assert.strictEqual(data[0].facility.investments.length, facility.investments.length);
                    assert.strictEqual(data[0].facility.investments[0].id, facility.investments[0].id);
                });
        });
    });

    describe('crud operations test', () => {
        it('should save a facilityCharges Object', () => {

            let facilityCharges = new FacilityCharges({id: 'uid9999', name:'toto', warming:1, chickPrice:1, vetPrice:1,
                contributions:1, disinfection:1, commodities:1,
                litter:1, catching:1, insurances:1});

            return databaseService.save('facilityCharges', facilityCharges)
                .then((data) => {
                    assert(data.facilitiesCharges[0].warming === 1);
                    assert(data.facilitiesCharges[0].chickPrice === 1);
                })
                .catch((err) => {
                    console.log(err);
                    assert(false);
                });
        });
        
        it('should bind each attachments foreach objects', () => {

            let facilityCharges = new FacilityCharges({id: 'uid999546549', name:'tato', warming:1, chickPrice:1, vetPrice:1,
                contributions:1, disinfection:1, commodities:1,
                litter:1, catching:1, insurances:1});

            const attachment = {
                entityName: 'facilityCharges',
                name:'foo.png',
                base64: randomBuffer(ATTACHMENT_SIZE),
                contentType:'image/png'
            };

            return databaseService.save('facilityCharges', facilityCharges)
                .then(data => {
                    attachment.obj = data.facilitiesCharges[0];
                    return databaseService.putAttachment(attachment);
                })
                .then((data) => databaseService.find('facilityCharges', facilityCharges.id))
                .then((data) => {
                    assert(Object.keys(data[0].attachments).length > 0);
                    assert.isDefined(data[0].attachments[Object.keys(data[0].attachments)[0]].data);
                })
                .catch((err) => {
                    console.log(err);
                    assert(false);
                });
        });

        it('should save a production object containing a facility Object which contains a facilityCharges object', () => {
            let facilityCharges = new FacilityCharges({id: 'uid98321243', name:'toto', warming:1, chickPrice:1, vetPrice:1,
                contributions:1, disinfection:1, commodities:1,
                litter:1, catching:1, insurances:1});

            const attachment = {
                entityName: 'facilityCharges',
                name:'foo.png',
                base64: randomBuffer(ATTACHMENT_SIZE),
                contentType:'image/png'
            };

            let facility = new Facility({id: '32ze1rz23er1', size: 3222, type: 'cabane', facilityCharges: facilityCharges});
            let production = new Production({id: '3rze213rze', department: 'tata', name:'toto', chickNb:1, avgWeight:1, age:1, breedingPerYear:1,
                consumptionIndex:1, mortalityPercent:1,
                vaccinesPrice:1, foodPrice:1, classedPrice:1, declassedPrice:1, breedingDeclassedPercent:1, restraintPercent:1,
                chickPurchaseReduction:1, facility: facility});

            return databaseService.save('facilityCharges', facilityCharges)
                .then(data => {
                    attachment.obj = data.facilitiesCharges[0];
                    return databaseService.putAttachment(attachment);
                })
                .then((data) => databaseService.find('facilityCharges', facilityCharges.id))
                .then((findData) => {
                    assert.strictEqual(findData[0].warming, 1);
                    assert.strictEqual(findData[0].chickPrice, 1);
                    assert(Object.keys(findData[0].attachments).length >  0);
                    return findData;
                })
                .then(() => databaseService.save('facility', facility))
                .then(() => databaseService.find('facilities', facility.id))
                .then((data) => {
                    assert(data[0].size === facility.size);
                    assert(data[0].id === facility.id);
                    return data;
                })
                .then(() => databaseService.save('production', production))
                .then(() => databaseService.find('production', production.id))
                .then((data) => {
                    assert(data[0].name === production.name);
                    assert(data[0].id === production.id);
                    return data;
                })
                .then(() => databaseService.find('production', production.id))
                .then((data) => {
                    assert(data[0].id === production.id);
                    assert(data[0].facility.id === facility.id);
                    return data;
                })
                .then((data) => databaseService.find('facility', facility.id))
                .then((data) => {
                    assert(data[0].facilityCharges.id === facilityCharges.id);
                })
                .catch((err) => {
                    console.log(err);
                    assert(false);
                });
        });
        
        it('should find productions by department', () => {
            const DEPARTMENT_PARAM = 'toto';
            return databaseService.getProductionsByDepartment(DEPARTMENT_PARAM)
                .then((data) => {
                    data.forEach((obj) => {
                        assert.strictEqual(obj.department, DEPARTMENT_PARAM)
                    })
                })
        });

        it('should update a facilityCharges object in the db', () => {

            return databaseService.find('facilityCharges', 'uid98321243')
                .then((data) => {
                    data[0].warming = 0.097;
                    return databaseService.save('facilityCharges', data[0])
                })
                .then(() => databaseService.find('facilityCharges', 'uid98321243'))
                .then((data) => {
                    assert(data[0].warming === 0.097);
                    assert(data[0].id === 'uid98321243');
                });
        });

        it('should update an object in the db', () => {

            return databaseService.find('facility', '32ze1rz23er1')
                .then((data) => {
                    data[0].size = 20000;
                    return databaseService.save('facility', data[0])
                })
                .then(() => databaseService.find('facility', '32ze1rz23er1'))
                .then((data) => {
                    assert(data[0].size === 20000);
                    assert(data[0].id === '32ze1rz23er1');
                });
        });

        it('should delete a facilityCharges object in the db', () => {

            return databaseService.find('facilityCharges', 'uid98321243')
                .then((facilityCharges) => databaseService.remove('facilityCharges', facilityCharges.id))
                .then((data) => {
                    assert(data.ok);
                });

        });

        it('should delete production object', () => {

            return databaseService.find('production', '3rze213rze')
                .then((production) => databaseService.remove('production', production.id))
                .then((data) => {
                    assert(data.ok);
                });
        });

        it('should delete facility object', () => {

            return databaseService.find('facility', '32ze1rz23er1')
                .then((facility) => databaseService.remove('facility', facility.id))
                .then((data) => {
                    assert(data.ok);
                });
        });

    });

    // *************  WRITE NEW TEST ABOVE TO THIS LINE **********************///
    // ***********  LAST TEST DESTROY THE DB *********************///

    describe('database empty', () => {
        it('should empty the database', () => {
            return databaseService.db.allDocs()
                .then((data) => {
                    assert(data.total_rows > 0)
                })
                .then(() => databaseService.destroy())
                .then((response) => assert(response.ok))
                .then(() => databaseService.db.info())
                .then(() => {
                    // database is destroyed
                    assert(false)
                })
                .catch(() => assert(true));
        });
    });
});