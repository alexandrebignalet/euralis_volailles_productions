const FacilityCharges = require('./facility_charges');

class Facility {
    /**
     * @type int
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
     */
    constructor({id, size, type, facilityCharges}) {
        this.id = id;
        this.size = size;
        this.type = type;
        this.facilityCharges = facilityCharges;
        this.images = [];
    }

    getAnnuity() {
        if (this.type === 'cabane') {
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
}

module.exports = Facility;