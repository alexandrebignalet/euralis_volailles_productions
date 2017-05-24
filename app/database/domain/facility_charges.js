class FacilityCharges  {
    constructor({id, name, warming, chickPrice, vetPrice, contributions, disinfection, commodities,
                litter, catching, insurances}) {
        this.id = id;
        this.name = name;
        this.warming = warming;
        this.chickPrice = chickPrice;
        this.vetPrice = vetPrice;
        this.contributions = contributions;
        this.disinfection = disinfection;
        this.commodities = commodities;
        this.litter = litter;
        this.catching = catching;
        this.insurances = insurances;
    }

    getUnitPricesSum() {
        return this.warming + this.contributions + this.vetPrice + this.disinfection +
        this.commodities + this.litter + this.catching + this.insurances;
    }
}

module.exports = FacilityCharges;