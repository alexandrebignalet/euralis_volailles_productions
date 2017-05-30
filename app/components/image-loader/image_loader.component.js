import angular from 'angular';
import template from './image_loader.html';

export const ImageLoaderComponent = {
    bindings: {
        model: '<',
        entityName: '@',
    },
    template,
    controller: class ImageLoaderController {
        constructor(ImageLoaderService, $window, $element, $scope) {
            'ngInject';
            this.dataService = ImageLoaderService;
            this.slides = [];
            this.currentIndex = 0;
            this.isLoading = false;
            this.element = $element;
            this.window = $window;

            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;
            $scope.active = 0;
        }

        $onInit() {
            angular.element(this.window).bind("scroll", () => this.loadImagesOnCarouselWhenVisible());
        }

        loadImagesOnCarouselWhenVisible() {
            const isElementInView = Utils.isElementInView(this.element, false);

            if (!this.isLoading && isElementInView) {
                this.isLoading = true;

                this.dataService.getAttachments(this.entityName, this.model.id)
                    .then((data) => data.forEach((img) => {
                            let reader = new FileReader();

                            reader.readAsDataURL(img);
                            reader.onload = (event) => {
                                this.slides.push({id: ++this.currentIndex, image: event.target.result, text: img.name});
                            };
                        })
                    )
                    .catch((err) => console.log(err))
            }
        }


    },
    controllerAs: 'vm'
};

class Utils {
    constructor() {}

    static isElementInView(element, fullyInView) {
        let pageTop = $(window).scrollTop();
        let pageBottom = pageTop + $(window).height();
        let elementTop = $(element).offset().top;
        let elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
}