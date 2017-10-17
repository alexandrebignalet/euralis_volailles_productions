import {FacilityCharges} from '../../renderer/components/management/facility_charges/facility_charges';

const ATTACHMENT_SIZE = 5000;

function randomBrowserBlob(size) {
    let buff = new ArrayBuffer(size);
    let arr = new Uint8Array(buff);
    for (let i = 0; i < size; i++) {
        arr[i] = Math.floor(65535 * Math.random());
    }
    return new Blob([buff], {type: 'application/octet-stream'});
}

function randomBuffer(size) {
    let buff = new Buffer(size);
    for (let i = 0; i < size; i++) {
        buff.write(
            String.fromCharCode(Math.floor(65535 * Math.random())),
            i, 1, 'binary');
    }
    return buff;
}


function randomBlob(size) {
    return randomBrowserBlob(size);
}

function createDocWithAttachment(pouchDbService, id) {
    let facilityCharges = new FacilityCharges({id: id+'', name:'toto', warming:1, chickPrice:1, vetPrice:1,
        contributions:1, disinfection:1, commodities:1,
        litter:1, catching:1, insurances:1});

    let attachment = {
        entityName: 'facilityCharges',
        name:'foo.png',
        blob: randomBlob(ATTACHMENT_SIZE),
        contentType:'image/png'
    };

    if (id%3 ===0) {

        if (id%6 === 0) {

            return pouchDbService.db.rel.save('facilityCharges', facilityCharges)
                .then(data => {
                    attachment.obj = data.facilitiesCharges[0];
                    return pouchDbService.putAttachment(attachment);
                })
                .then(data => {
                    attachment.obj = data.facilitiesCharges[0];
                    attachment.name = 'foo2.png';
                    return pouchDbService.putAttachment(attachment);
                });
        }

        return pouchDbService.db.rel.save('facilityCharges', facilityCharges)
            .then(data => {
                attachment.obj = data.facilitiesCharges[0];
                return pouchDbService.putAttachment(attachment);
            });
    }

    return pouchDbService.db.rel.save('facilityCharges', facilityCharges);
}

function addXDocInDb(docNumber, from, pouchDbService) {
    let calls = [];

    const to = from + docNumber;

    for(let j = from ; j < to; j++) {
        calls.push(createDocWithAttachment(pouchDbService, j));
    }

    return Promise.all(calls)
        .then((data) => {
            console.log("asked creation of : ", docNumber, " docs; actually created: ", data.length);
        });
}

export {randomBlob, addXDocInDb};