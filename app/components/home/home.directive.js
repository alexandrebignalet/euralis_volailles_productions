import angular from 'angular';
import map from '../../images/map-with-image.svg';


export const department = ($compile) => {
    'ngInject';

    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element) {
            scope.elementId = element.attr('id');
            scope.departmentClick = function () {
                scope.$emit('department', scope.elementId);
            };
            element.attr('ng-click', 'departmentClick()');
            element.attr('ng-attr-fill', 'transparent');
            element.removeAttr('department');
            $compile(element)(scope);
        }
    };
};

export const aquitaineMap = ($compile) => {
    'ngInject';

    return {
        restrict: 'A',
        templateUrl: map,
        link: function (scope, element) {
            let departments = element[0].querySelectorAll('.st0');
            angular.forEach(departments, function (path) {
                let departmentElement = angular.element(path);
                departmentElement.attr('department', '');
                $compile(departmentElement)(scope);
            });
        }
    };
};


