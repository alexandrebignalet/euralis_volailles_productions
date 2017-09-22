class Video {
    constructor({id, rev, attachments}) {
        this.id = id;
        this.rev = rev;
        this.name = Object.keys(attachments)[0];
        this.contentType = attachments[this.name].content_type;
        this.size = attachments[this.name].length;
        this.file = new Blob([attachments[this.name].data], {type:'application/octet-stream'});
    }
}


module.exports = Video;