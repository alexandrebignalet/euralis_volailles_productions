class FacilityCharges {
    constructor(facilityCharges) {
        this.id = facilityCharges.id;
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
}

class Facility {
    constructor(facility) {
        this.id = facility.id;
        this.size = facility.size;
        this.type = facility.type;
        this.charges = new FacilityCharges(facility.facilityCharges);
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

export class Production {
    constructor(production) {
        this.facilitiesNb = 1;

        this.id = production.id;
        this.department = production.department;
        this.name = production.name;
        this.chickNb = production.chickNb;
        this.avgWeight = production.avgWeight;
        this.age = production.age;
        this.breedingPerYear = production.breedingPerYear;
        this.consumptionIndex = production.consumptionIndex;
        this.mortalityPercent = production.mortalityPercent;
        this.vaccinesPrice = production.vaccinesPrice;
        this.foodPrice = production.foodPrice;
        this.classedPrice = production.classedPrice;
        this.declassedPrice = production.declassedPrice;
        this.breedingDeclassedPercent = production.breedingDeclassedPercent;
        this.restraintPercent = production.restraintPercent;
        this.chickPurchaseReduction = production.chickPurchaseReduction;

        this.facility = new Facility(production.facility);
    }

    setFacilitiesNb(nb) {
        this.facilitiesNb = nb;
    }

    getChickNb() {
        return this.chickNb * this.facilitiesNb;
    }

    getChicksPaid() {
        return this.getChickNb() - this.getChickNb() * this.chickPurchaseReduction;
    }

    getDeliveredChicks() {
        return this.getChickNb() - this.getChickNb() * this.mortalityPercent;
    }

    getSoldChicks() {
        return this.getDeliveredChicks() - this.getDeliveredChicks() * this.restraintPercent;
    }

    getClassedChicksSold() {
        return this.getSoldChicks() - this.getDeclassedChicksSold();
    }

    getDeclassedChicksSold() {
        return this.getSoldChicks() * this.breedingDeclassedPercent;
    }

    getTotalClassedWages() {
        return this.getClassedChicksSold() * this.avgWeight * this.classedPrice;
    }

    getTotalDeclassedWages() {
        return this.getDeclassedChicksSold() * this.avgWeight * this.declassedPrice;
    }

    getTotalWages() {
        return this.getTotalClassedWages() + this.getTotalDeclassedWages();
    }

    getAvgWagesPerTon() {
        return (this.declassedPrice * this.breedingDeclassedPercent +
            this.classedPrice * (1 - this.breedingDeclassedPercent)) * 1000;
    }

    getTotalFoodCost() {
        return this.getChickNb() * this.consumptionIndex * this.avgWeight * this.foodPrice;
    }

    getTotalCosts() {
        return this.getChicksPaid() * this.facility.charges.chickPrice +
            this.facility.charges.getUnitPricesSum() * this.getChickNb() +
            this.getTotalFoodCost();
    }

    getBrutMargin(){
        return this.getTotalWages() - this.getTotalCosts();
    }

    getAnnualBrutMargin(){
        return this.getBrutMargin() * this.breedingPerYear;
    }

    getAnnualBrutMarginPerSquareMeter() {
        return this.getAnnualBrutMargin() / this.facility.size;
    }

    getAnnualNetMargin(){
        return this.getBrutMargin() * this.breedingPerYear - this.facility.getAnnuity().value;
    }
}