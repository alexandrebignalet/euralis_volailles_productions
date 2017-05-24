import template from './facilities.html';

export const FacilityComponent = {
    bindings: { facilities: '<' },
    template,
    controller: class Controller {
        constructor(){}
        $onInit() {
            console.log(this.facilities);
        }
    }
    
};
