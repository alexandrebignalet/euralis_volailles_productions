import toastr from 'toastr';

export class ToastrService {
    constructor() {}

    speak(info, title) {
        toastr.info(info, title)
    }

    edit(object) {
        toastr.success('a été mis à jour.', object.toString()); 
    }

    create(object) {
        toastr.info('a été créé.', object.toString());
    }

    remove(object) {
        toastr.info('a été supprimé.', object.toString());
    }
}