import {Production} from "../management/production/production";

Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};

export class ProductionRotation extends Production {
    constructor(productionParams) {
        super(productionParams);
        this.brutMarginPerSoldChick = (super.getBrutMargin() / this.getSoldChicks()).toFixedDown(5);
        this.breedingPerYear = 1;
    }

    getAnnualBrutMargin() {
        return this.breedingPerYear * this.brutMarginPerSoldChick * this.getSoldChicks();
    }
}

export class PintadesDemareesRotation extends ProductionRotation {
    constructor() {
        super({
            name: 'Pintades 6 sem',
            facility: {
                size: 400,
                type: {key: 'fixed'},
                facilityCharges: {},
                investments: []
            },
            chickBySquare: 0,
            chickNb: 8000
        });

        this.breedingPerYear = 1;
        this.brutMarginPerSoldChick = 0.4;
    }

    getSoldChicks() {
        return 15200 * this.facilitiesNb / 2;
    }
}