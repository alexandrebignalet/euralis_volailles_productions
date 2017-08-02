process.env.NODE_ENV = 'production';

const FacilityChargesRepository = require('./database/repository/facility_charges.repository');
const FacilityRepository = require('./database/repository/facility.repository');
const ProductionRepository = require('./database/repository/production.repository');
const InvestmentRepository = require('./database/repository/investment.repository');
const VideoRepository = require('./database/repository/video.repository');

window.repositories = {
    video: new VideoRepository(),
    production: new ProductionRepository(),
    facility: new FacilityRepository(),
    facilityCharges: new FacilityChargesRepository(),
    investment: new InvestmentRepository()
};