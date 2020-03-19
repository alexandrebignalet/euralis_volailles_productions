export class Investment {

    constructor(investment) {

        this.id = investment.id;
        this.rev = investment.rev;
        this.name = investment.name;
        this.designation = investment.designation;
        this.description = investment.description;
        this.papers = investment.papers;
        this.architectCost = investment.architectCost || 0;
        this.masonry = investment.masonry;
        this.customMasonry = null; // user custom definition of masonry price
        this.facilityMoutingDeliveryPrice = investment.facilityMoutingDeliveryPrice;
        this.equipmentMountingDeliveryPrice = investment.equipmentMountingDeliveryPrice;
        this.personalContribution = investment.personalContribution || 0;
        this.subsidies = investment.subsidies;
        this.helpEuralis = investment.helpEuralis;
        this.details = new InvestmentDescription(investment.details);
        if (investment.options && investment.options.length > 0) {
            this.options = investment.options.map(({name, amount}) => new AdditionalInvestment(name, amount));
        } else {
            this.options = []
        }

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
        // reset custom masonry in order to not fool user
        this.customMasonry = null;
    }

    getAnnuity(duration, interest) {
        return this.getTotal() * (interest/100) / (1 - Math.pow(1 + (interest/100), -duration));
    }


    getMasonry() {
        return this.customMasonry || this._facilityNb * this.masonry;
    }

    getFacilityMountingDeliveryPrice() {
        return this._facilityNb * this.facilityMoutingDeliveryPrice;
    }

    getEquipmentMountingDeliveryPrice() {
        return this._facilityNb * this.equipmentMountingDeliveryPrice;
    }

    addAdditionalInvestment({ name, amount}) {
        const additionalInvestment = new AdditionalInvestment(name, amount);
        additionalInvestment.count = 1;
        this.options.push(additionalInvestment);
    }

    selectOneAdditionalInvestment(addedOption) {
        const option = this.options.find(o => o.name === addedOption.name);
        if (!option) return;

        option.count = addedOption.isSelected ? addedOption.count + 1 : 1;
    }

    getTotalAdditionalInvestmentsSelected() {
        return this.additionalInvestmentsSelected
            .reduce((sum, opt) => {
                sum += opt.amount * opt.count;
                return sum;
            }, 0);
    }

    get additionalInvestmentsSelected() {
        return this.options
          .filter((opt) => opt.isSelected);
    }

    getTotal() {
        return this.getTotalBeforeSubsidies() - this.subsidies - this.helpEuralis - this.personalContribution;
    }

    getTotalBeforeSubsidies() {
        return this.getTotalAdditionalInvestmentsSelected() + this.getMasonry() + this.getFacilityMountingDeliveryPrice() + this.getEquipmentMountingDeliveryPrice() + this.papers + this.architectCost;
    }
}

class InvestmentDescription {
    constructor(details) {
        if(!details) return;
        this.name = details.name;
        this.designation = details.designation;
        this.description = details.description;
        this.papers = details.papers;
        this.architectCost = details.architectCost;
        this.masonry = details.masonry;
        this.facilityMoutingDeliveryPrice = details.facilityMoutingDeliveryPrice;
        this.equipmentMountingDeliveryPrice = details.equipmentMountingDeliveryPrice;
        this.personalContribution = details.personalContribution;
        this.subsidies = details.subsidies;
        this.helpEuralis = details.helpEuralis;
    }
}

export class AdditionalInvestment {
    static DEFAULT_COUNT() { return 0; }

    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
        this.count = AdditionalInvestment.DEFAULT_COUNT();
    }

    get isSelected() {
        return this.count > AdditionalInvestment.DEFAULT_COUNT();
    }
}
