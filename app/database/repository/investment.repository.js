const DatabaseService = require('../database.service.js');
const Investment = require('../domain/investment');

class InvestmentRepository {
    constructor() {
        this.dbService = DatabaseService;
        this.entityName = 'investment';
    }

    get(id) {
        let investmentEntity;
        return this.dbService.find(this.entityName, id)
            .then(({investments}) => {
                let images = [];

                if (investments[0].attachments) {
                    let findAttachmentsPromises = [];

                    Object.keys(investments[0].attachments).forEach((key) => {
                        findAttachmentsPromises.push(this.dbService.db.rel.getAttachment(this.entityName, investments[0].id, key));
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
        return this.dbService.find(this.entityName)
            .then(({investments}) => investments.map( investment => new Investment(investment)));
    }

    /**
     * @type Investment
     * @param investment
     * @return Promise
     */
    create(investment) {

        let images = investment.images;

        investment.images = images.map((file) => {
            return { displayName: file.name };
        });

        return this.dbService.save(this.entityName, investment)
            .then((investmentSaved) => {

                    return this.dbService.addAttachments(this.entityName, {
                        id: investmentSaved.investments[0].id,
                        rev: investmentSaved.investments[0].rev
                    }, investment.images)

                }
            )
            .then((obj) => this.get(obj.id));
    }

    update(investment) {
        return this.dbService.find(this.entityName, investment.id)
            .then((investmentFound) => {
                investment.rev = investmentFound.investments[0].rev;
                return investment;
            })
            .then((investmentToUpdate) => this.create(investmentToUpdate))
    }

    del(id) {
        return this.dbService.find(this.entityName, id)
            .then(({investments}) => this.dbService.remove(this.entityName, {id: investments[0].id, rev: investments[0].rev}));
    }
}

module.exports = InvestmentRepository;