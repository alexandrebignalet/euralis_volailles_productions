import angular from 'angular';

export const ThumbImagesDirective = ($window) => {
    'ngInject';

    const helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && typeof item.name == typeof 'string';
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            let params = scope.$eval(attributes.thumbImages);

            if (!helper.isFile(params.file)) return;

            let canvas = element.find('canvas');
            let reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                let img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                let width = params.width || this.width / this.height * params.height;
                let height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
};