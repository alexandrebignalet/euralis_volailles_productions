import {FacilityCharges} from '../../app/renderer/components/management/facility_charges/facility_charges';

const ATTACHMENT_SIZE = 5000;

function randomBuffer(size) {
    let buff = new Buffer(size);
    for (let i = 0; i < size; i++) {
        buff.write(
            String.fromCharCode(Math.floor(65535 * Math.random())),
            i, 1, 'binary');
    }
    return buff.toString('base64');
}

function createDocWithAttachment(databaseService, id) {
    let facilityCharges = new FacilityCharges({id: id+'', name:'toto', warming:1, chickPrice:1, vetPrice:1,
        contributions:1, disinfection:1, commodities:1,
        litter:1, catching:1, insurances:1});

    const attachment = {
        entityName: 'facilityCharges',
        name:'foo.png',
        base64: randomBuffer(ATTACHMENT_SIZE),
        contentType:'image/png'
    };

    if (id%3 ===0) {

        if (id%6 === 0) {
            return databaseService.save('facilityCharges', facilityCharges)
                .then(data => {
                    attachment.obj = data.facilitiesCharges[0];
                    return databaseService.putAttachment(attachment);
                })
                .then(data => {
                    attachment.obj = data.facilitiesCharges[0];
                    attachment.name = 'foo2.png';
                    return databaseService.putAttachment(attachment);
                });
        }

        return databaseService.save('facilityCharges', facilityCharges)
            .then(data => {
                attachment.obj = data.facilitiesCharges[0];
                return databaseService.putAttachment(attachment);
            });
    }

    return databaseService.save('facilityCharges', facilityCharges);
}

function addXDocInDb(docNumber, from, databaseService) {
    let calls = [];

    const to = from + docNumber;

    for(let j = from ; j < to; j++) {
        calls.push(createDocWithAttachment(databaseService, j));
    }

    return Promise.all(calls)
        .then((data) => {
            console.log("asked creation of : ", docNumber, " docs; actually created: ", data.length);
        });
}

export {randomBuffer, addXDocInDb};