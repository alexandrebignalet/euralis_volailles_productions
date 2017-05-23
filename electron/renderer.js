const FacilityChargesRepository = require('./database/repository/facility_charges.repository');
const FacilityRepository = require('./database/repository/facility.repository');
const ProductionRepository = require('./database/repository/production.repository');

window.repositories = {
    production: new ProductionRepository(),
    facility: new FacilityRepository(),
    facilityCharges: new FacilityChargesRepository()
};