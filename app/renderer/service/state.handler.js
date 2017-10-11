export class StateHandler {
    constructor($rootScope, $state) {
        'ngInject';
        this.previousState = null;
console.log("coucou state handler");
        $rootScope.$on('$stateChangeSuccess', (ev, to, toParams, from) => {
            this.previousState = from;
            console.log("coucou stage change");
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