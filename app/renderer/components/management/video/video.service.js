export class VideoService {
    constructor($timeout){ "ngInject"; this.timeout = $timeout; }

    load(file) {

        this.timeout(() => {
            let myVideo = document.getElementsByTagName('video')[0];
            myVideo.src = URL.createObjectURL(file);
            myVideo.load();
        });
    }
}
