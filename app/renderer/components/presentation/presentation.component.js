import template  from './presentation.html';
import './presentation.scss';
import '../../images/poulet.jpg';

export const PresentationComponent = {
    bindings: { productionsByFacilityType: '<' },
    template
};