export class Facility {

    /**
     * @type string
     * @param id
     *
     * @type int
     * @param size
     *
     * @type string
     * @param type
     *
     * @type FacilityCharges
     * @param facilityCharges
     *
     * @type integer
     * @param workHours
     *
     * @type Array[Investments]
     * @param investments
     */
    constructor(facility) {
        this.id = facility.id;
        this.rev = facility.rev;
        this.size = facility.size;
        this.type = facility.type;
        this.facilityCharges = facility.facilityCharges;
        this.workHours = facility.workHours;
        this.investments = facility.investments;
        this.images = [];
    }

    getAnnuity() {
        if (this.type === 'movable') {
            return {
                totalCost: 63856,
                duration: 12,
                interest: 2.5,
                value: 6225
            };
        } else {
            return {
                totalCost: 114401,
                duration: 15,
                interest: 2.5,
                value: 9239
            };
        }
    }

    toString() {
        return `Bâtiment ${this.type.value || "NON-DEFINI"} de ${this.size || "pas de taille"} m2`
    }
}