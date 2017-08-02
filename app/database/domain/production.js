const Facility = require('./facility');

class Production {
    constructor({id, updateDate, fieldSpace, department, name, chickNb, avgWeight, age, breedingPerYear, consumptionIndex, mortalityPercent,
                vaccinesPrice, foodPrice, classedPrice, declassedPrice, breedingDeclassedPercent, restraintPercent, facility}) {
        this.facilitiesNb = 1;

        this.id = id;
        this.fieldSpace = fieldSpace;
        this.updateDate = updateDate;
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
        this.chickPurchaseReduction = 0.02;
        this.facility = facility;
        this.images = [];
    }

    setFacilitiesNb(nb) {
        this.facilitiesNb = nb;
        this.facility.investments.forEach((entity) => {
            entity.valuesForFacilityNb = nb;
        })
    }

    getVaccinesPrice() {
        return this.vaccinesPrice * 1000;
    }

    getFoodPrice() {
        return this.foodPrice * 1000;
    }

    getClassedPrice() {
        return this.classedPrice * 1000;
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
        return this.getChicksPaid() * this.facility.facilityCharges.chickPrice +
            this.facility.facilityCharges.getUnitPricesSum() * this.getChickNb() +
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

    getAnnualNetMargin(annuity){
        return this.getBrutMargin() * this.breedingPerYear - annuity;
    }
}

module.exports = Production;