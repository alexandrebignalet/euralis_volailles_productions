const ipc = require('electron').ipcRenderer;

const printPdfButton = document.getElementById('print-pdf');

printPdfButton.addEventListener('click', (event) => {
    ipc.send('print-to-pdf');
});

ipc.on('wrote-pdf', (event, path) => {
    const message = `Wrote PDF to: ${path}`;
    document.getElementById('pdf-path').innerHTML = message;
});

export const init = (env) => {

    process.env.NODE_ENV = env;

    const FacilityChargesRepository = require('./client/database/repository/facility_charges.repository');
    const FacilityRepository = require('./client/database/repository/facility.repository');
    const ProductionRepository = require('./client/database/repository/production.repository');
    const InvestmentRepository = require('./client/database/repository/investment.repository');
    const VideoRepository = require('./client/database/repository/video.repository');

    window.repositories = {
        video: new VideoRepository(),
        production: new ProductionRepository(),
        facility: new FacilityRepository(),
        facilityCharges: new FacilityChargesRepository(),
        investment: new InvestmentRepository()
    };
};