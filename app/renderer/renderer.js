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

    // const FacilityChargesRepository = require('./server/database/repository/facility_charges.repository');
    // const FacilityRepository = require('./server/database/repository/facility.repository');
    // const ProductionRepository = require('./server/database/repository/production.repository');
    // const InvestmentRepository = require('./server/database/repository/investment.repository');
    // const VideoRepository = require('./server/database/repository/video.repository');

    const mock = {
        get: () => { return {} },
        all: () => { return [] },
        update: () => { return {} },
        remove: () => { return {} },
        create: () => { return {} }
    };

    window.repositories = {
        video: mock, //new VideoRepository(),
        production: mock, //new ProductionRepository(),
        facility: mock, //new FacilityRepository(), g
        facilityCharges: mock, //new FacilityChargesRepository(),
        investment: mock, //new InvestmentRepository()
    };

};