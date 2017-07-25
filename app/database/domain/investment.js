class Investment {

    constructor({id, name, designation, description, masonry, papers, facilityMoutingDeliveryPrice,
                    equipmentMountingDeliveryPrice, diverseOptions, subsidies, helpEuralis}) {
        this.id = id;
        this.name = name;
        this.designation = designation;
        this.description = description;
        this.papers = papers;
        this.masonry = masonry;
        this.facilityMoutingDeliveryPrice = facilityMoutingDeliveryPrice;
        this.equipmentMountingDeliveryPrice = equipmentMountingDeliveryPrice;
        this.diverseOptions = diverseOptions;
        this.subsidies = subsidies;
        this.helpEuralis = helpEuralis;
        this.images = [];
        this._facilityNb = 1;
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
        return this.getTotalBeforeSubsidies() - this.subsidies - this.helpEuralis + this.diverseOptions;
    }

    getTotalBeforeSubsidies() {
        return this.getMasonry() + this.getFacilityMountingDeliveryPrice() + this.getEquipmentMountingDeliveryPrice() + this.papers;
    }
}

module.exports = Investment;