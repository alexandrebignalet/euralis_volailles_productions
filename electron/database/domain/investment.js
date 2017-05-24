class Investment {

    constructor({id, masonry, facilityMoutingDeliveryPrice, equipmentMountingDeliveryPrice, diverseOptions, subsidies, helpEuralis}) {
        this.id = id;
        this.masonry = masonry;
        this.facilityMoutingDeliveryPrice = facilityMoutingDeliveryPrice;
        this.equipmentMountingDeliveryPrice = equipmentMountingDeliveryPrice;
        this.diverseOptions = diverseOptions;
        this.subsidies = subsidies;
        this.helpEuralis = helpEuralis;
        this.images = [];
    }

    getTotal() {
        return this.masonry + this.facilityMoutingDeliveryPrice + this.equipmentMountingDeliveryPrice -
                this.subsidies - this.helpEuralis + this.diverseOptions;
    }
}

module.exports = Investment;