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
    }

    getTotal() {
        return this.getTotalBeforeSubsidies() - this.subsidies - this.helpEuralis + this.diverseOptions;
    }

    getTotalBeforeSubsidies() {
        return this.masonry + this.facilityMoutingDeliveryPrice + this.equipmentMountingDeliveryPrice + this.papers;
    }
}

module.exports = Investment;