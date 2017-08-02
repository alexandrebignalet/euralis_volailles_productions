const DatabaseService = require('../database.service.js');
const Video = require('../domain/video');

class VideoRepository extends DatabaseService {
    constructor() {
        super();
        this.entityName = 'video';
    }

    get(id) {
        let videoEntity;
        return super.find(this.entityName, id)
            .then(({videos}) => {
                let images = [];

                if (videos[0].attachments) {
                    let findAttachmentsPromises = [];

                    Object.keys(videos[0].attachments).forEach((key) => {
                        findAttachmentsPromises.push(this.db.rel.getAttachment(this.entityName, videos[0].id, key));
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

                videoEntity.file = images;

                return videoEntity;
            });
    }

    getAll() {
        return super.find(this.entityName).then(({videos}) => videos.map((video) => new Video(video)));
    }

    /**
     * @type Video
     * @param video
     * @return Promise
     */
    create(video) {
        return super.save(this.entityName, video)
            .then((videoSaved) => {

                    return super.addAttachments(this.entityName, {
                            id: videoSaved.videos[0].id,
                            rev: videoSaved.videos[0].rev
                        }, [video.file])
                }
            )
            .then((obj) => this.get(obj.id));
    }

    update(video) {
        return super.find(this.entityName, video.id)
            .then((videoFound) => {
                video.rev = videoFound.videos[0].rev;
                return video;
            })
            .then((videoToUpdate) => this.create(videoToUpdate))
    }

    del(id) {
        return super.find(this.entityName, id)
            .then(({videos}) => super.remove(this.entityName, {id: videos[0].id, rev: videos[0].rev}));
    }
}

module.exports = VideoRepository;