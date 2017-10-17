import {Facility} from '../facility/facility';

export class Production {
    constructor(production) {
        this.facilitiesNb = 1;

        this.id = production.id;
        this.rev = production.rev;
        this.fieldSpace = production.fieldSpace;
        this.updateDate = production.updateDate;
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
        this.chickPurchaseReduction = 0.02;
        if( !(typeof production.facility === 'string' || typeof production.facility === 'number')) {
            this.facility = new Facility(production.facility);
        }

        if(production.attachments) {
            this.attachments = Object.keys(production.attachments).map(key => {
                let fileName = key;
                let type = production.attachments[fileName].content_type;
                let size = production.attachments[fileName].length;
                let file = new Blob([production.attachments[fileName].data], {size, type});
                file.name = fileName;
                return file;
            });
        } else {
            this.attachments = [];
        }
    }

    getMargePACByChickPIP() {
        let charges = this.getTotalFoodCost() + (this.facility.facilityCharges.chickPrice + this.facility.facilityCharges.contributions) * this.getChickNb();
        return (this.getTotalWages() - charges) / this.getChickNb();
    }

    setFacilitiesNb(nb) {
        this.facilitiesNb = nb;
        this.facility.investments.forEach((entity) => {
            entity.facilityNb = nb;
        })
    }

    getVaccinesPrice() {
        return this.vaccinesPrice * 1000;
    }

    getFoodPrice() {
        return this.foodPrice * 1000;
    }

    getClassedPercent() {
        return (100 - this.breedingDeclassedPercent )/ 100;
    }

    getClassedPrice() {
        return this.classedPrice * 1000;
    }

    getDeclassedPrice() {
        return this.declassedPrice * 1000;
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
        return this.getFoodEaten() * this.foodPrice;
    }

    getTotalCosts() {
        return this.getChicksPaid() * this.facility.facilityCharges.chickPrice +
            this.facility.facilityCharges.getUnitPricesSum() * this.getChickNb() +
            this.getTotalFoodCost();
    }

    getBrutMargin(){
        return this.getTotalWages() - this.getTotalCosts();
    }

    getFoodEaten(){
        return this.getChickNb() * this.consumptionIndex * this.avgWeight;
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

    toString() {
        return `Production ${this.name || 'NON-DEFINIE'}`
    }
}