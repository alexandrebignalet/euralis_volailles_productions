// Needed for sync between pouch and couch
if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer(str).toString('base64');
    };
}

import path from 'path';

import {Production} from '../components/management/production/production'
import {Facility} from '../components/management/facility/facility'
import {FacilityCharges} from '../components/management/facility_charges/facility_charges'
import {Investment} from '../components/management/investment/investment'
import {Video} from '../components/management/video/video'

import PouchDB from 'pouchdb-browser';

PouchDB.plugin(require('pouchdb-adapter-node-websql'));
PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(require('relational-pouch'));


const databaseSchema = [
    {
        singular: 'video',
        plural: 'videos'
    },
    {
        singular: 'production',
        plural: 'productions',
        relations: {
            'facility': { belongsTo: 'facility' }
        }
    },
    {
        singular: 'facility',
        plural: 'facilities',
        relations: {
            'facilityCharges': { belongsTo: 'facilityCharges'},
            'investments': { hasMany: 'investment' }
        }
    },
    {
        singular: 'facilityCharges',
        plural: 'facilitiesCharges'
    },
    {
        singular: 'investment',
        plural: 'investments'
    }
];

function getConstructorFromEntityName(entityName) {
    const nameToConstructor = {
        video: Video,
        facilityCharges: FacilityCharges,
        investment: Investment,
        production: Production,
        facility: Facility
    };

    return nameToConstructor[entityName];
}
/**
 * This class is used to create the local database if it does not exist yet.
 * And the schema of THIS app.
 * Also provide an API in order to manipulate data.
 */
export class PouchDbService {
    constructor(ENV, DB_INFO) {
        'ngInject';

        this.env = ENV;
        this.DB_INFO = DB_INFO;

        if(this.env === undefined) this.env = 'prod';
        // if(this.env === 'dev') PouchDB.debug.enable('*');

        this.dbOpts = { auto_compaction: true };
        this.remoteDbOpts = {
            ajax: { timeout: 10000 },
            auth: {
                username: 'admin',
                password: 'c907f253966a6676d7c54232e'
            }
        };

        this.dbName = this.DB_INFO.name + this.env;
        this.db = new PouchDB(this.dbName, this.dbOpts);
        this.remoteDb = new PouchDB(DB_INFO.remoteUrl + this.dbName, this.remoteDbOpts);

        this.db.createIndex({
            index: {fields: ['data.department']}
        });

        this.db.setSchema(databaseSchema);
    }

    init() {
        this.db = new PouchDB(path.join(__dirname, this.dbName), this.dbOpts);
        this.remoteDb = new PouchDB(this.DB_INFO.remoteUrl + this.dbName, this.remoteDbOpts);

        this.db.setSchema(databaseSchema);

        return this.db.createIndex({
            index: {fields: ['data.department']}
        })
    }

    /**
     *
     * @param entityName
     * @param object
     * @return Promise
     */
    save(entityName, object) {
        return this.toAttachmentFormat(entityName, object.attachments || {})
            .then((attachments) => {
                delete object.attachments;

                return this.db.rel.save(entityName, object)
                    .then((objects) => {

                        let entity = objects[Object.keys(objects)[0]][0];

                        if(attachments) {

                            return attachments.reduce((p, attachment) => {
                                attachment.obj = entity;
                                return p.then(() => this.putAttachment(attachment));
                            }, Promise.resolve());
                        }
                        return objects;
                    })
            })
    }

    find(entityName, id) {

        return this.db.rel.find(entityName, id)
            .then((data) => {
                let fullObjectsPromises = [];
                let objects = data[Object.keys(data)[0]];

                for(let i = 0 ; i < objects.length ; i++) {
                    fullObjectsPromises.push(this.transformRelationIdByObject(Object.keys(data)[0], objects[i], data));
                }

                return Promise.all(fullObjectsPromises);
            })
            .then((objects) => {
        
                const constructor = getConstructorFromEntityName(entityName);

                if(id && objects.length === 1)
                    return Reflect.construct(constructor, [objects[0]]);

                return objects.map((obj) => Reflect.construct(constructor, [obj]));
            })
            .catch(err => console.log(`Find Central PouchDbService: ${err}`));
    }

    remove(entityName, object) {
        return this.db.rel.del(entityName, object)
            .then(() => this.compact())
            .catch(err => console.log(`Remove Central PouchDbService: ${err}`));
    }

    putAttachment({entityName, obj, name, blob, contentType}) {
        return this.db.rel.putAttachment(entityName, obj, name, blob, contentType)
            .then(data => data)
            .catch(err => console.log(`Find Central PouchDbService: ${err}`));
    }


    // it will empty the db, because we are using WebSql adapter
    destroy() {
        return this.db.info()
            .then((data) => this.db.destroy())
            .catch(() => { return {ok: true}; });
    }

    sync() {
        return this.db.sync(this.remoteDb, {
            live:true,
            retry: true
        })
            .on('complete', () => {
                console.log("complete ");
            })
            .on('denied', function (err) {
                console.log('document denied ', err);
            })
            .on('change', (change) => {
                console.log("change ", change);
            })
            .on('paused', (info) => {

                console.log("paused ", info);
            })
            .on('active', (info) => {
                console.log("active ", info);
            })
            .on('error', (err) => {
                console.log(err, err.result);
            });
    }

    replicate(who) {

        let from = this.db;
        let to = this.remoteDb;

        if(who === 'server') {
            let aux = from;
            from = to;
            to = aux;
        }

        console.log(`replication from ${from.name} to ${to.name}`);

        return PouchDB.replicate(from, to, {
            live:true,
            retry: true
        })
            .on('complete', () => {
                // console.log("complete ");
            })
            .on('change', (change) => {
                // console.log("change ", change);
            })
            .on('paused', (info) => {
                // console.log("paused ", info);
            })
            .on('active', (info) => {
                // console.log("active ", info);
            })
            .on('error', (err) => {
                console.log(err, err.result);
            });
    }

    assignAttachmentsToObject(entityName, object) {

        if (object.attachments) {
            let attachmentsPromises = [];

            Object.keys(object.attachments).forEach((key) => {
                attachmentsPromises.push(
                    this.db.rel.getAttachment(entityName, object.id, key)
                        .then((attachment) => {
                            object.attachments[key].data = attachment;
                        })
                );
            });

            return Promise.all(attachmentsPromises).then( () => object);
        } else {
            return Promise.resolve(object);
        }
    }

    getProductionsByDepartment(department) {
        const findOpts  = { selector: {'$or': [{'data.department': {'$eq': department}}, {'data.department': {'$eq': 'Others'}}]}};

        return this.db.find(findOpts)
            .then((data) => this.db.rel.parseRelDocs('production', data.docs))
            .then((data) => {
                let fullObjectsPromises = [];
                let objects = data[Object.keys(data)[0]];

                for(let i = 0 ; i < objects.length ; i++) {
                    fullObjectsPromises.push(this.transformRelationIdByObject(Object.keys(data)[0], objects[i], data));
                }

                return Promise.all(fullObjectsPromises);
            })
            .then((productions) => {
                if(productions.length === 1)
                    return new Production(productions[0]);

                return productions.map((production) => new Production(production));
            })
            .catch((err) => console.log(err));
    }

    toAttachmentFormat(entityName, attachments) {
console.log(attachments);
        return Promise.all(
            Object.keys(attachments).map(key => {
                let name = key;
                let attachmentFormat = {
                    entityName,
                    name,
                    contentType: attachments[name].type,
                    blob: attachments[name]
                };

                return Promise.resolve(attachmentFormat);

                return new Promise((resolve, reject) => {
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(attachments[name]);

                    reader.onload = () => {
                        attachmentFormat.base64 = new Buffer(reader.result);
                        resolve(attachmentFormat);
                    };

                    reader.onerror = (error) => {
                        reject(error);
                    };
                })
            })
        );
    }

    transformRelationIdByObject(entityName, desiredObject, data) {
        let findRequest = Object.keys(data);
        findRequest.splice(0,1);

        let name = getSingularEntityName(entityName);
        if(name) entityName = name;

        // console.log("findrequest without desired  object: ", findRequest);
        let pluralNameRelationObjectFound = [];
        let singularNameRelationObjectFound;

        for(let i = 0; i < findRequest.length; i++) {
            const pluralEntityName = findRequest[i];
            const singularEntityName = getSingularEntityName(pluralEntityName);

            if(desiredObject.hasOwnProperty(singularEntityName)) {
                // console.log(`has singularEntityName property: ${singularEntityName}`);
                let relationId = desiredObject[singularEntityName];
                let relationObjectFromId;
                if(typeof relationId === 'string') {
                    relationObjectFromId = arrayObjectIndexOf(data[pluralEntityName], relationId, 'id');
                    // console.log(`Object ${data[pluralEntityName][relationObjectFromId].id} will replace id ${relationId} in data property: id`);
                } else {
                    relationObjectFromId = data[pluralEntityName].indexOf(relationId);
                    // console.log(`Object ${data[pluralEntityName][relationObjectFromId].id} will replace id ${relationId.id} in data property: id`);
                }

                desiredObject[singularEntityName] = data[pluralEntityName][relationObjectFromId];
                singularNameRelationObjectFound = { value: desiredObject[singularEntityName], key: singularEntityName };
            }
            else if (desiredObject.hasOwnProperty(pluralEntityName)) {
                // console.log(`has pluralEntityName property: ${pluralEntityName}`);
                let relationArrayIds = desiredObject[pluralEntityName];
                let relationObjects = [];
                let relationObjectFromId;
                for(let j = 0; j < relationArrayIds.length ; j++) {
                    if(typeof relationArrayIds[j] === 'string') {
                        relationObjectFromId = arrayObjectIndexOf(data[pluralEntityName], relationArrayIds[j], 'id');
                        // console.log(`Object  ${data[pluralEntityName][relationObjectFromId].id} will replace id ${relationArrayIds[j]} in data property: id`);
                    } else {
                        relationObjectFromId = data[pluralEntityName].indexOf(relationArrayIds[j]);
                        // console.log(`Object  ${data[pluralEntityName][relationObjectFromId].id} will replace id ${relationArrayIds[j].id} in data property: id`);
                    }

                    relationObjects.push(data[pluralEntityName][relationObjectFromId]);
                    pluralNameRelationObjectFound.push({value: data[pluralEntityName][relationObjectFromId], key: singularEntityName});
                }

                desiredObject[pluralEntityName] = relationObjects;
            }
        }

        let promiseRelationsFound = [];

        if(singularNameRelationObjectFound) {
            promiseRelationsFound.push(this.transformRelationIdByObject(singularNameRelationObjectFound.key, singularNameRelationObjectFound.value, data));
        }
        for(let l = 0; l < pluralNameRelationObjectFound.length; l++) {
            promiseRelationsFound.push(this.transformRelationIdByObject(pluralNameRelationObjectFound[l].key, pluralNameRelationObjectFound[l].value, data));
        }

        promiseRelationsFound.push(this.assignAttachmentsToObject(entityName, desiredObject));
        return Promise.all(promiseRelationsFound)
            .then(() => desiredObject)
            .catch((err) => console.log("Transform method error: ", err));



        function getSingularEntityName(entityPluralName) {
            for(let i = 0; i < databaseSchema.length; i++) {
                if(databaseSchema[i].plural === entityPluralName) {
                    return databaseSchema[i].singular;
                }
            }
        }

        function arrayObjectIndexOf(array, searchTerm, property) {
            for(let i = 0, len = array.length; i < len; i++) {
                if (array[i][property] === searchTerm) return i;
            }
            return -1;
        }
    }
}