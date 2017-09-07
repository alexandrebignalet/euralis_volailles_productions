export class StateHandler {
    constructor($rootScope) {
        'ngInject';
        this.previousState = null;

        $rootScope.$on('$stateChangeSuccess', (ev, to, toParams, from) => {
            this.previousState = from;
        });
    }

    getPrevious() {
        return this.previousState;
    }
}