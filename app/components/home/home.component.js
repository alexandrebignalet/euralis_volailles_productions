import template from './home.html';
import './home.scss';
import banner from '../../images/fd_good.jpg';

export const HomeComponent = {
    bindings: {},
    template,
    controller: class HomeController {
        constructor(DEPARTMENTS){
            'ngInject';
            this.banner = banner;
            this.departments = DEPARTMENTS;
        }

    },
    controllerAs: 'vm'
};