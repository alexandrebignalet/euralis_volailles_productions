export class FacilityCharges  {
    constructor(facilityCharges) {

        this.id = facilityCharges.id;
        this.rev = facilityCharges.rev;
        this.name = facilityCharges.name;
        this.warming = facilityCharges.warming;
        this.chickPrice = facilityCharges.chickPrice;
        this.vetPrice = facilityCharges.vetPrice;
        this.contributions = facilityCharges.contributions;
        this.disinfection = facilityCharges.disinfection;
        this.commodities = facilityCharges.commodities;
        this.litter = facilityCharges.litter;
        this.catching = facilityCharges.catching;
        this.insurances = facilityCharges.insurances;
    }

    getUnitPricesSum() {
        return this.warming + this.contributions + this.vetPrice + this.disinfection +
        this.commodities + this.litter + this.catching + this.insurances;
    }

    toString() {
        return `Grille de critères ${this.name || 'NON-DEFINIE'}`
    }
}