export class StateHandler {
    constructor($rootScope, $state) {
        'ngInject';
        this.previousState = null;

        $rootScope.$on('$stateChangeSuccess', (ev, to, toParams, from) => {
            this.previousState = from;
        });

        // if ESC go home
        $(document).keyup((e) => {
            if(e.keyCode === 27)
                $state.go('home')
        });
    }

    getPrevious() {
        return this.previousState;
    }
}