const Facility = require('./facility');

class Production {
    constructor({id, department, name, chickNb, avgWeight, age, breedingPerYear, consumptionIndex, mortalityPercent,
                vaccinesPrice, foodPrice, classedPrice, declassedPrice, breedingDeclassedPercent, restraintPercent,
                chickPurchaseReduction, facility}) {
        this.facilitiesNb = 1;

        this.id = id;
        this.department = department;
        this.name = name;
        this.chickNb = chickNb;
        this.avgWeight = avgWeight;
        this.age = age;
        this.breedingPerYear = breedingPerYear;
        this.consumptionIndex = consumptionIndex;
        this.mortalityPercent = mortalityPercent;
        this.vaccinesPrice = vaccinesPrice;
        this.foodPrice = foodPrice;
        this.classedPrice = classedPrice;
        this.declassedPrice = declassedPrice;
        this.breedingDeclassedPercent = breedingDeclassedPercent;
        this.restraintPercent = restraintPercent;
        this.chickPurchaseReduction = chickPurchaseReduction;
        this.facility = facility;
        this.images = [];
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

module.exports = Production;