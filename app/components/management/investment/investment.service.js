export class InvestmentDataService {
    constructor($window) {
        'ngInject';
        if ($window.repositories) {
            this.repositories = $window.repositories;
        }
    }

    get(id) { return this.repositories.investment.get(id).then((data) => data); }

    all() { return this.repositories.investment.getAll().then((data) => data); }

    update(investment) { return this.repositories.investment.update(investment).then((data) => data); }

    remove(investment) { return this.repositories.investment.del(investment.id).then((data) => data ); }

    create(investment) { return this.repositories.investment.create(investment).then((data) => data); }
}