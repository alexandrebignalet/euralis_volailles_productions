export class Investment {

    constructor(investment) {

        this.id = investment.id;
        this.rev = investment.rev;
        this.name = investment.name;
        this.designation = investment.designation;
        this.description = investment.description;
        this.papers = investment.papers;
        this.masonry = investment.masonry;
        this.facilityMoutingDeliveryPrice = investment.facilityMoutingDeliveryPrice;
        this.equipmentMountingDeliveryPrice = investment.equipmentMountingDeliveryPrice;
        this.diverseOptions = investment.diverseOptions;
        this.subsidies = investment.subsidies;
        this.helpEuralis = investment.helpEuralis;
        this.details = new InvestmentDescription(investment.details);

        if(investment.attachments) {
            this.attachments = Object.keys(investment.attachments).map(key => {
                let fileName = key;
                let type = investment.attachments[fileName].content_type;
                let size = investment.attachments[fileName].length;
                let file = new Blob([investment.attachments[fileName].data], {size, type});
                file.name = fileName;
                return file;
            });
        } else {
            this.attachments = [];
        }

        this._facilityNb = 1;
    }

    toString() {
        return `Investissement ${this.name || 'NON-DEFINIE'}, ${this.designation || 'NON-DEFINIE'}`
    }

    set facilityNb(nb) {
        this._facilityNb = nb;
    }

    getAnnuity(duration, interest) {
        return this.getTotal() * (interest/100) / (1 - Math.pow(1 + (interest/100), -duration));
    }


    getMasonry() {
        return this._facilityNb * this.masonry;
    }

    getFacilityMountingDeliveryPrice() {
        return this._facilityNb * this.facilityMoutingDeliveryPrice;
    }

    getEquipmentMountingDeliveryPrice() {
        return this._facilityNb * this.equipmentMountingDeliveryPrice;
    }

    getTotal() {
        return this.getTotalBeforeSubsidies() - this.subsidies - this.helpEuralis;
    }

    getTotalBeforeSubsidies() {
        return this.getMasonry() + this.getFacilityMountingDeliveryPrice() + this.getEquipmentMountingDeliveryPrice() + this.papers + this.diverseOptions;
    }
}

class InvestmentDescription {
    constructor(details) {
        if(!details) return;
        this.name = details.name;
        this.designation = details.designation;
        this.description = details.description;
        this.papers = details.papers;
        this.masonry = details.masonry;
        this.facilityMoutingDeliveryPrice = details.facilityMoutingDeliveryPrice;
        this.equipmentMountingDeliveryPrice = details.equipmentMountingDeliveryPrice;
        this.diverseOptions = details.diverseOptions;
        this.subsidies = details.subsidies;
        this.helpEuralis = details.helpEuralis;
    }
}