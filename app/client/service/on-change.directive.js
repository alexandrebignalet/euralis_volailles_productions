export const CustomOnChangeDirective = () => {
    const directive = {
        restrict: 'A',
        link: (scope, element, attrs) => {
            let onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler.bind(scope));
        }
    };

    return directive;
};