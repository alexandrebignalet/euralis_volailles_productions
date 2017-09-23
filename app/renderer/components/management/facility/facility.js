import {Investment} from '../investment/investment';
import {FacilityCharges} from '../facility_charges/facility_charges';

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
     * @param facilitys
     */
    constructor(facility) {
        this.id = facility.id;
        this.rev = facility.rev;
        this.size = facility.size;
        this.type = facility.type;
        this.workHours = facility.workHours;

        this.facilityCharges = new FacilityCharges(facility.facilityCharges);
        this.investments = [];
        for(let i = 0; i < facility.investments.length; i++) {
            this.investments.push(new Investment(facility.investments[i]))
        }

        if(facility.attachments) {
            this.attachments = Object.keys(facility.attachments).map(key => {
                let fileName = key;
                let type = facility.attachments[fileName].content_type;
                let size = facility.attachments[fileName].length;
                let file = new Blob([facility.attachments[fileName].data], {size, type});
                file.name = fileName;
                return file;
            });
        } else {
            this.attachments = [];
        }
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