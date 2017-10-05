// Needed for sync between pouch and couch
if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer(str).toString('base64');
    };
}

const path = require('path');
const config = require('./electron.config.js');
const MemoryStream = require('memorystream');
const replicationStream = require('pouchdb-replication-stream');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(require('relational-pouch'));
PouchDB.plugin(replicationStream.plugin);
PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);


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

/**
 * This class is used to create the local database if it does not exist yet.
 * And the schema of THIS app.
 * Also provide an API in order to manipulate data.
 */
class DatabaseService {
    constructor(env) {
        this.env = env;
        if(this.env === undefined) this.env = 'prod';

        this.dbOpts = { auto_compaction: true};
        this.remoteDbOpts = {
            ajax: { timeout: 10000 },
            auth: {
                username: 'admin',
                password: 'c907f253966a6676d7c54232e'
            }
        };

        this.dbName = config.db.name + this.env;
        this.db = new PouchDB(this.dbName, this.dbOpts);
        this.remoteDb = new PouchDB(config.db.remoteUrl + this.dbName, this.remoteDbOpts);
        this.db.createIndex({
            index: {fields: ['data.department']}
        });
        this.db.setSchema(databaseSchema);
    }

    init() {
        this.dbName = config.db.name + this.env;
        this.db = new PouchDB(this.dbName, this.dbOpts);
        this.remoteDb = new PouchDB(config.db.remoteUrl + this.dbName, this.remoteDbOpts);
        this.db.createIndex({
            index: {fields: ['data.department']}
        });
        this.db.setSchema(databaseSchema);
    }

    /**
     *
     * @param entityName
     * @param object
     * @return Promise
     */
    save(entityName, object) {
        return this.db.rel.save(entityName, object);
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
            .catch(err => console.log(`Find Central DatabaseService: ${err}`));
    }

    remove(entityName, object) {
        return this.db.rel.del(entityName, object)
            .then(() => this.compact())
            .catch(err => console.log(`Remove Central DatabaseService: ${err}`));
    }

    putAttachment({entityName, obj, name, base64, contentType}) {
        return this.db.rel.putAttachment(entityName, obj, name, base64, contentType)
            .then(data => data)
            .catch(err => console.log(`Find Central DatabaseService: ${err}`));
    }
    
    addAttachments(entityName, obj, files) {

        if (files.length === 0 || !files.reduce((acc, item) =>  typeof item.name == 'string', true) ) return obj;

        return files.reduce((p, file) => {
            return p.then(() => this.db.rel.putAttachment(entityName, obj, file.name, file, file.type));
        }, Promise.resolve());
    }

    // it will empty the db, because we are using WebSql adapter
    destroy() {
        return this.db.info()
            .then((data) => this.db.destroy())
            .catch(() => { return {ok: true}; });
    }

    compact() {
        return this.db.compact()
            .then((info) => {
                return info;
            }).catch((err) => {
                return err;
            });
    }

    sync() {
        return this.db.sync(this.remoteDb)
            .then((data) => {
                console.log(`Synchronisation SUCCESS: ${data}`);
                return data;
            })
            .catch((err) => {
                console.log(`Synchronisation ERROR: ${err}`);
                return err;
            })
    }

    replicate(who) {
        let stream = new MemoryStream();

        let from = this.db;
        let to = this.remoteDb;

        if(who === 'server') {
            let aux = from;
            from = to;
            to = aux;
        }

        console.log(`replication from ${from.name} to ${to.name}`);

        return Promise.all([
            from.dump(stream),
            to.load(stream)
        ])
            .then(() => {
                console.log(`Replication from ${who} SUCCESS !`);
            })
            .catch((err) => {
                console.log(`Replication from ${who} FAIL !`, err);
            })
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
            .catch((err) => console.log(err));
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
console.log(process.env.NODE_ENV);
module.exports = new DatabaseService(process.env.NODE_ENV);