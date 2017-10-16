import template  from './presentation.html';
import './presentation.scss';
import poulet_svg from '../../images/poulet.svg';

export const PresentationComponent = {
    bindings: { productions: '<' },
    template,
    controller: class PresentationController {
        constructor() {
            this.pouletSvg = poulet_svg;
        }
    }
};