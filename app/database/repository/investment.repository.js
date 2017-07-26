const DatabaseService = require('../database.service.js');
const Investment = require('../domain/investment');

class InvestmentRepository extends DatabaseService {
    constructor() {
        super();
        this.entityName = 'investment';
    }

    get(id) {
        let investmentEntity;
        return super.find(this.entityName, id)
            .then(({investments}) => {
                let images = [];

                if (investments[0].attachments) {
                    let findAttachmentsPromises = [];

                    Object.keys(investments[0].attachments).forEach((key) => {
                        findAttachmentsPromises.push(this.db.rel.getAttachment(this.entityName, investments[0].id, key));
                    });

                    return Promise.all(findAttachmentsPromises)
                        .then((images) => {
                            images.forEach((img, index) => {
                                img.name = Object.keys(investments[0].attachments)[index];
                            });
                            return {investments, images};
                        });
                }

                return {investments, images}
            })
            .then(({investments, images}) => {
                investmentEntity = new Investment(investments[0]);
                investmentEntity.images = images;
                return investmentEntity;
            });
    }

    getAll() {
        return super.find(this.entityName)
            .then(({investments}) => investments.map( investment => new Investment(investment)));
    }

    /**
     * @type Investment
     * @param investment
     * @return Promise
     */
    create(investment) {
        return super.save(this.entityName, investment)
            .then((investmentSaved) => {

                    return super.addAttachments(this.entityName, {
                        id: investmentSaved.investments[0].id,
                        rev: investmentSaved.investments[0].rev
                    }, investment.images)
                }
            )
            .then((obj) => this.get(obj.id));
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
        return super.find(this.entityName, id)
            .then(({investments}) => super.remove(this.entityName, {id: investments[0].id, rev: investments[0].rev}));
    }
}

module.exports = InvestmentRepository;