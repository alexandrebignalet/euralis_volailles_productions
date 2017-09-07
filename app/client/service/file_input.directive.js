export const FileInputDirective = ($parse) => {
    'ngInject';

    return {
        restrict: 'A',
        link: (scope, element, attributes) => {
            
            element.bind('change', (o) => {
                $parse(attributes.fileInput)
                    .assign(scope, element[0].files);
                scope.$apply();
            });
        }
    };
};