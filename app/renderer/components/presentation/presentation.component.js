import template  from './presentation.html';
import './presentation.scss';
import '../../images/poulet.jpg';

export const PresentationComponent = {
    bindings: { productionsByFacilityType: '<', production: '<' },
    template,
    controller: class PresentationComponent {
        $onInit() {
            this.facilityIndexActive = 0;
            this.active = this.findProductionIndexByName(this.production.name, this.production.size);
        }

        findProductionIndexByName(name, size) {
            if(!name) return 0;
            const isFixed = this.productionsByFacilityType[0].map((prod) => prod.name +''+ prod.facility.size).indexOf(name+''+size);
            const isMovable = this.productionsByFacilityType[1].map((prod) => prod.name +''+ prod.facility.size).indexOf(name+''+size);
            this.facilityIndexActive = isFixed !== -1 ? 0 : 1;
            return this.facilityIndexActive === 0 ? isFixed : isMovable;
        }
    }
};