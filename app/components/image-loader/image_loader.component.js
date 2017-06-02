import template from './image_loader.html';

export const ImageLoaderComponent = {
    bindings: {
        model: '<',
        entityName: '@',
    },
    template,
    controller: class ImageLoaderController {
        constructor(ImageLoaderService, $scope) {
            'ngInject';
            this.dataService = ImageLoaderService;
            this.slides = [];
            this.currentIndex = 0;

            this.scope = $scope;
            this.myInterval = 5000;
            this.noWrapSlides = false;
            this.active = 0;
        }

        $onInit() {
            this.dataService.getAttachments(this.entityName, this.model.id)
                .then((images) => {
                        images.forEach((img) => {
                            this.slides.push({id: ++this.currentIndex, image: URL.createObjectURL(img), text: img.name});
                            this.scope.$apply();
                        });
                    }
                )
                .catch((err) => console.log(err));
        }
    },
    controllerAs: 'vm'
};