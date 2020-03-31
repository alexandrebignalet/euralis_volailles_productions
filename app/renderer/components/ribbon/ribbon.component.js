import './ribbon.scss';

export const RibbonComponent = {
    bindings: {},
    template: `<div class="ribbon" ng-if="vm.ribbonEnv != 'production'"><a href>{{vm.ribbonEnv}}</div>`,
    controller: class RibbonController {
        constructor(PouchDbService) {
            'ngInject';
            this.ribbonEnv = PouchDbService.env;
        }
    },
    controllerAs: 'vm'
};
