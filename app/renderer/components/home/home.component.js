import template from './home.html';
import './home.scss';
import './arrow.scss';
import banner from '../../images/fd_good.jpg';
import accompagne from '../../images/accompagne.jpg';
import sanders from '../../images/sanders.jpg';
import eurvol from '../../images/logo.png';
import vol from '../../images/eurvol.jpg';
import elev from '../../images/elev.png';
import avigers from '../../images/avigers.png';
import qualisud from '../../images/qualisud.png';
import bio from '../../images/logo_bio.png';
import sequoia from '../../images/logo_sequoia.jpg';
import tag_gers from '../../images/gers_tag.png';
import tag_landes from '../../images/landes_tag.png';
import tag_sudouest from '../../images/sudouest_tag.png';

const filiere = [];
filiere['sanders'] = sanders;
filiere['eurvol'] = eurvol;
filiere['vol'] = vol;
filiere['elev'] = elev;
filiere['avigers'] = avigers;
filiere['qualisud'] = qualisud;
filiere['sequoia'] = sequoia;
filiere['bio'] = bio;
filiere['tags'] = [];
filiere['tags']['gers'] = tag_gers;
filiere['tags']['sudouest'] = tag_sudouest;
filiere['tags']['landes'] = tag_landes;

export const HomeComponent = {
    bindings: {
        videos: '<'
    },
    template,
    controller: class HomeController {
        constructor(DEPARTMENTS, PouchDataService) {
            'ngInject';

            this.banner = banner;
            this.accompagne = accompagne;
            this.imagesFiliere = filiere;

            this.departments = DEPARTMENTS;
            this.videoPlayed = null;

            this.PouchDataService = PouchDataService;
        }

        $onInit() {
            if(this.videos.length > 0)
                this.PouchDataService.load(this.videos[0].getFile());
        }

        selectVideo(video) {
            if (!video || video.id === this.videoPlayed) return;
            this.videoPlayed = video.id;
            this.PouchDataService.load(video.getFile());
        }
    },
    controllerAs: 'vm'
};