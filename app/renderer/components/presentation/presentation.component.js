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
            const isFixed = indexOfByNameAndSize(this.productionsByFacilityType[0]);
            const isMovable = indexOfByNameAndSize(this.productionsByFacilityType[1]);
            this.facilityIndexActive = isFixed !== -1 ? 0 : 1;
            return this.facilityIndexActive === 0 ? isFixed : isMovable;

            function indexOfByNameAndSize(productions) {
                if (!productions) return -1;
                productions.map(concatProdNameAndFacilitySize()).indexOf(concatNameAndSize())
            }

            function concatProdNameAndFacilitySize() {
                return (prod) => concatNameAndSize(prod.name, prod.facility.size)
            }

            function concatNameAndSize() {
                return name + '' + size
            }

        }
    }
};