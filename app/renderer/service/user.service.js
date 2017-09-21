export class UserService {
    constructor($localStorage) {
        'ngInject';
        this.localStorage = $localStorage;
    }

    isAuthenticated() {
        return this.localStorage.username !== undefined;
    }

    getUser() {
        return this.localStorage.username;
    }

    storeCurrentUser(username) {
        this.localStorage.username = username;
    }
}