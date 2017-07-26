const FacilityCharges = require('./facility_charges');

class Facility {
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
     * @type Array[Investments]
     * @param investments
     */
    constructor({id, size, type, facilityCharges, investments}) {
        this.id = id;
        this.size = size;
        this.type = type;
        this.facilityCharges = facilityCharges;
        this.investments = investments;
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

    // get facilityCharges() {
    //     return this._facilityCharges;
    // }
    //
    //
    // set facilityCharges(facilityCharges) {
    //     this._facilityCharges = facilityCharges;
    // }
}

module.exports = Facility;