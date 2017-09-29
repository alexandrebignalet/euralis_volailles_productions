import template  from './presentation.html';
import './presentation.scss';

export const PresentationComponent = {
    bindings: { productions: '<' },
    template,
    controller: class Controller {
        constructor(){}
        
        $onInit(){
            console.log(this.productions);
        }
    }
};