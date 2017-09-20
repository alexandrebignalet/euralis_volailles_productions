const fs = require('fs');
const Store = require('./store');
const path = require('path');
const Image = require('./image');

class ImageStore extends Store {
    constructor() {
        const options = {
            dataFileName: 'images_data.json',
            directoryName: 'images'
        };

        super(options);
    }

    get(fileName) {
        let data = super.get(fileName);
        if(!data) return data;
        let image = new Image(data.displayName).setFile(null, data.fileName);

        return fs.readFileSync(image.getFullPath());
    }

    set(image) {
        if(this.data[image.getFileName()]) {
            return new Error('Image cannot be saved. (already existing or miscreated)');
        }

        super.set(image.getFileName(), image.transformToPouchFormat());
        fs.writeFileSync(image.getFullPath(), new Buffer(image.file));
    }

    delete(image) {
        if(this.data[image.getFileName()]) {
            delete this.data[image.getFileName()];
            fs.unlink(image.getFullPath(), (err) => { if(err !== null) console.log(err); });
        }
    }
}


module.exports = ImageStore;