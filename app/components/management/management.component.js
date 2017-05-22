import template from './management.html';

export const ManagementComponent = {
    bindings: {
        productions: '<'
    },
    template,
    controller: class ManagementController {
        constructor(){};
    },
    controllerAs: 'vm'
};