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