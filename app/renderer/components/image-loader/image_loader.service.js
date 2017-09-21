export class ImageLoaderService {
    constructor($window){
        'ngInject';
        this.repository = $window.repositories.production;
    }

    getAttachments(entityName, id) {
        return this.repository.dbService.getAttachments(entityName, id)
            .then((data) =>  {
                return data;
            });
    }
}