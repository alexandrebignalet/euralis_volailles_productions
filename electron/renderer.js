const Repository = require('../database/repository/repository');
const Production = require('../database/domain/production');

window.repositories = {
    production: new Repository('productions', Production)
};