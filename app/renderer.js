process.env.NODE_ENV = 'production';

const FacilityChargesRepository = require('./database/repository/facility_charges.repository');
const FacilityRepository = require('./database/repository/facility.repository');
const ProductionRepository = require('./database/repository/production.repository');
const InvestmentRepository = require('./database/repository/investment.repository');

const FacilityCharges = require('./database/domain/facility_charges');
const Facility = require('./database/domain/facility');
const Production = require('./database/domain/production');
const Investment = require('./database/domain/investment');

window.repositories = {
    production: new ProductionRepository(),
    facility: new FacilityRepository(),
    facilityCharges: new FacilityChargesRepository(),
    investment: new InvestmentRepository()
};

const service = window.repositories.production;

if (service.db.info) {
    service.db.info()
        .then((response) => {
            if (response.doc_count === 0) {
                return service.remoteDb.info()
                    .then(() => {
                        return service.sync();
                    })
                    .catch((err) => alert('You are not connected to the internet.'))
            }
        })
}