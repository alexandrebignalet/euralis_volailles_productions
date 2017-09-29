export class Video {
    constructor(video) {
        this.id = video.id;
        this.rev = video.rev;

        let fileName = Object.keys(video.attachments)[0];
        let type = video.attachments[fileName].content_type;
        let size = video.attachments[fileName].length;
        let file = new Blob([video.attachments[fileName].data], {size, type});
        file.name = fileName;
console.log(video);
        this.attachments = [file];
    }

    getFile() {
        return this.attachments[0];
    }

    setFile(file) {
        this.attachments[0] = file;
    }

    getName() {
        return this.attachments[0].name;
    }

    getSize() {
        return this.attachments[0].size;
    }

    toString() {
        return `Vidéo ${this.getName() || 'NON-DEFINIE'}`
    }
}