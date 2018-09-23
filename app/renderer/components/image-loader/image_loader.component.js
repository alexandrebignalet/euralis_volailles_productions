import template from './image_loader.html';

export const ImageLoaderComponent = {
    bindings: {
        model: '<',
        height: '<'
    },
    template,
    controller: class ImageLoaderController {
        constructor() {
            this.slides = [];
            this.currentIndex = 0;
            this.active = 0;
            this.myInterval = 5000;
            this.noWrapSlides = false;
        }

        $onInit() {
            this.model.attachments.forEach((attachment) =>
                this.slides.push({id: ++this.currentIndex, image: URL.createObjectURL(attachment), text: attachment.name}))
        }
    },
    controllerAs: 'vm'
};