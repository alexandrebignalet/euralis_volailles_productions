import angular from 'angular';
import 'bootstrap-multiselect/dist/js/bootstrap-multiselect';
import 'bootstrap-multiselect/dist/css/bootstrap-multiselect.css';

export const MultiselectDirective = ($timeout) => {
    'ngInject';

    return {
        restrict: 'A',
        link: (scope, element) => {
            $timeout(() => {
                element.multiselect();
            });
        }
    }
};