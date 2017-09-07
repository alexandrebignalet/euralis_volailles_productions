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
};