const fs = require('fs');
const assert = require('chai').assert;
const ImageStore = require('../../app/server/image-store.service');
const Image = require('../../app/server/image');
const imageFile = fs.readFileSync('/home/alexandre/WebstormProjects/EuralisVolaillesProductions/app/images/avigers.png');
const Store = require('.././store');

describe('ImageStoreServiceTest', () => {
    let store;
    let imageStore;

    beforeEach(() => {
        store = new Store({
            dataFileName: 'test_data.json',
            directoryName: 'test',
        });

        imageStore = new ImageStore();
    });

    describe('constructors test', () => {
        it('should be created with new', () => {
            assert.isNotNull(store);
            assert.isNotNull(imageStore);
        });
    });

    describe('store data test', () => {
        it('dataFile must be empty on startup', () => {
            assert.isUndefined(store.get('toto'))
        });

        it('dataFile can be filled with some data', () => {
            store.set('toto', {name: 'tata'});
            assert.isNotNull(store.get('toto'));
            assert.equal(store.get('toto').name, 'tata');
        });
    });

    describe('store image json data and file test', () => {
        it('should save an image', () => {
            const dataLengthBeforeAddition = Object.keys(imageStore.data);

            let image = new Image('mon test').setFile(imageFile, 'montest.png');
            
            imageStore.set(image);
            
            assert.isAbove(Object.keys(imageStore.data), Object.keys(dataLengthBeforeAddition));
        });

        it('should retrieve an image', () => {

            let buffer = imageStore.get('montest.png');

            assert(buffer instanceof Buffer);
        });

        it('should delete an image already stored', () => {
            const dataLengthBeforeDeletion = Object.keys(imageStore.data);

            let image = new Image('mon test').setFile(null, 'montest.png');

            imageStore.delete(image);

            assert.isBelow(Object.keys(imageStore.data), Object.keys(dataLengthBeforeDeletion));
        });
    });
});