export const HighlighterDirective = ($timeout) => {
    'ngInject';
    return {
        restrict: 'A',
        scope: {
            model: '=highlighter'
        },
        link: function(scope, element) {
            scope.$watch('model', function (nv, ov) {
                if (nv !== ov) {
                    // apply class
                    element.removeClass('highlighted');
                    element.addClass('highlight');

                    // auto remove after some delay
                    $timeout(function () {
                        element.removeClass('highlight');
                        element.addClass('highlighted');
                    }, 250);
                }
            });
        }
    };
};