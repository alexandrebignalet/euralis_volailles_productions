const DatabaseService = require('../database.service');
const Investment = require('../domain/investment');

class InvestmentRepository extends DatabaseService {
    constructor() {
        super();
        this.entityName = 'investment';
    }

    get(id) {
        return this.db.rel.find(this.entityName, id).then(({investments}) => new Investment(investments[0]));
    }

    getAll() {
        return this.db.rel.find(this.entityName)
            .then(({investments}) => investments.map( investment => new Investment(investment)));
    }

    /**
     * @type Investment
     * @param investment
     * @return Promise
     */
    create(investment) {
        return this.db.rel.save(this.entityName, investment).then((investmentSaved) => this.get(investmentSaved.id));
    }

    update(investment) {
        return this.db.rel.find(this.entityName, investment.id)
            .then((investmentFound) => {
                investment.rev = investmentFound.investments[0].rev;
                return investment;
            })
            .then((investmentToUpdate) => this.create(investmentToUpdate))
    }

    del(id) {
        return this.db.rel.find(this.entityName, id)
            .then(({investments}) => super.remove(this.entityName, {id: investments[0].id, rev: investments[0].rev}));
    }
}

module.exports = InvestmentRepository;