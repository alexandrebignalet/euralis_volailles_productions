const DatabaseService = require('../database.service.js');
const Video = require('../domain/video');

class VideoRepository {
    constructor() {
        this.dbService = DatabaseService;
        this.entityName = 'video';
    }

    get(id) {
        let videoEntity;
        return this.dbService.find(this.entityName, id)
            .then(({videos}) => {
                let images = [];

                if (videos[0].attachments) {
                    let findAttachmentsPromises = [];

                    Object.keys(videos[0].attachments).forEach((key) => {
                        findAttachmentsPromises.push(this.dbService.db.rel.getAttachment(this.entityName, videos[0].id, key));
                    });

                    return Promise.all(findAttachmentsPromises)
                        .then((images) => {
                            images.forEach((img, index) => {
                                img.name = Object.keys(videos[0].attachments)[index];
                            });
                            return {videos, images};
                        });
                }

                return {videos, images}
            })
            .then(({videos, images}) => {

                videoEntity = new Video(videos[0]);

                videoEntity.file = images[0];

                return videoEntity;
            });
    }

    getAll() {
        return this.dbService.find(this.entityName).then(({videos}) => videos.map((video) => new Video(video)));
    }

    /**
     * @type Video
     * @param video
     * @return Promise
     */
    create(video) {
        return this.dbService.save(this.entityName, video)
            .then((videoSaved) => {

                    return this.dbService.addAttachments(this.entityName, {
                            id: videoSaved.videos[0].id,
                            rev: videoSaved.videos[0].rev
                        }, [video.file])
                }
            )
            .then((obj) => this.get(obj.id));
    }

    update(video) {
        return this.dbService.find(this.entityName, video.id)
            .then((videoFound) => {
                video.rev = videoFound.videos[0].rev;
                return video;
            })
            .then((videoToUpdate) => this.create(videoToUpdate))
    }

    del(id) {
        return this.dbService.find(this.entityName, id)
            .then(({videos}) => this.dbService.remove(this.entityName, {id: videos[0].id, rev: videos[0].rev}));
    }
}

module.exports = VideoRepository;