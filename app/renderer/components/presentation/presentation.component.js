import template  from './presentation.html';
import './presentation.scss';
import '../../images/poulet.jpg';

export const PresentationComponent = {
    bindings: { productionsByFacilityType: '<', production: '<' },
    template,
    controller: class PresentationComponent {
        $onInit() {
            this.facilityIndexActive = 0;
            this.active = this.production ? this.findProductionIndexByName(this.production.name, this.production.size) : 0;
        }

        findProductionIndexByName(name, size) {
            if(!name) return 0;
            const isFixed = indexOfByNameAndSize(this.productionsByFacilityType.fixed);
            const isMovable = indexOfByNameAndSize(this.productionsByFacilityType.movable);
            this.facilityIndexActive = isFixed !== -1 ? 0 : 1;
            return this.facilityIndexActive === 0 ? isFixed : isMovable;

            function indexOfByNameAndSize(productions) {
                if (!productions) return -1;
                return productions.map(concatProdNameAndFacilitySize()).indexOf(concatNameAndSize(name, size))
            }

            function concatProdNameAndFacilitySize() {
                return (prod) => concatNameAndSize(prod.name, prod.facility.size)
            }

            function concatNameAndSize(name, size) {
                return name + '' + size
            }

        }
    }
};