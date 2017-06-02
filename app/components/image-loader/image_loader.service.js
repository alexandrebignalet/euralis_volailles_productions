export class ImageLoaderService {
    constructor($window){
        'ngInject';
        this.repository = $window.repositories.production;
    }

    getAttachments(entityName, model) {
        return this.repository.getAttachments(entityName, model.id)
            .then((data) =>  {
                return data;
            });
    }
}