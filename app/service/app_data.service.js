
export class AppDataService {
    constructor($window, $q) {
        'ngInject';
        if ($window.repositories) {
            this.repositories = $window.repositories;
        }
        this.q = $q;
    }

    get(id) {
        if (!this.repositories) {
            return dataOutOfElectron()[3];
        }

        return this.repositories.production.get(+id);
    }

    getProductions() {
        if (!this.repositories) {
            return dataOutOfElectron();
        }
        return this.repositories.production.getAll();
    }

    update(production) {
        return this.repositories
            .production
            .update(production)
            .then(() => true);
    }

    remove(production) {
        return this.repositories
            .production
            .remove(production.id)
            .then(() => true);
    }

    create(production) {
        return this.repositories
            .production
            .create(production)
            .then(() => true);
    }
}

function dataOutOfElectron() {
    return [{'facility':{'size':400,'type':'batiment','facilityCharges':{'warming':0.097,'chickPrice':0.328,
        'vetPrice':0.098,'contributions':0.135,'disinfection':0.018,'commodities':0.018,'litter':0.033,
        'catching':0.07, 'insurances':0.034,'id':2},'id':4},'department':'Gers','name':'SAB','chickNb':4400,
        'avgWeight':2.31,'age':86,'breedingPerYear':3.3,'consumptionIndex':2.94,'mortalityPercent':0.02,
        'vaccinesPrice':0.328,'foodPrice':0.274,'classedPrice':1.68,'declassedPrice':1.1,
        'breedingDeclassedPercent':0.04,'restraintPercent':0.01,'chickPurchaseReduction':0.02,'id':1},
        {'facility':{'size':400,'type':'batiment','facilityCharges':{'warming':0.097,'chickPrice':0.328,
            'vetPrice':0.098,'contributions':0.12,'disinfection':0.018,'commodities':0.018,'litter':0.033,
            'catching':0.07,'insurances':0.034,'id':1},'id':1},'department':'Gers','name':'Label Gers',
            'chickNb':4400,'avgWeight':2.31,'age':86,'breedingPerYear':3.3,'consumptionIndex':2.94,
            'mortalityPercent':0.02,'vaccinesPrice':0.328,'foodPrice':0.265,'classedPrice':1.523,
            'declassedPrice':1.1,'breedingDeclassedPercent':0.04,'restraintPercent':0.01,
            'chickPurchaseReduction':0.02,'id':2},{'facility':{'size':150,'type':'batiment',
        'facilityCharges':{'warming':0.097,'chickPrice':0.328,'vetPrice':0.098,
            'contributions':0.12,'disinfection':0.018,'commodities':0.018,'litter':0.033,
            'catching':0.07,'insurances':0.034,'id':1},'id':3},'department':'Landes',
        'name':'Label Landes Liberté','chickNb':1650,'avgWeight':2.31,'age':86,'breedingPerYear':3.3,
        'consumptionIndex':3.0,'mortalityPercent':0.02,'vaccinesPrice':0.328,'foodPrice':0.265,
        'classedPrice':1.683,'declassedPrice':1.1,'breedingDeclassedPercent':0.09,
        'restraintPercent':0.01,'chickPurchaseReduction':0.02,'id':3},{'facility':
        {'size':60,'type':'cabane','facilityCharges':{'warming':0.097,'chickPrice':0.328,
            'vetPrice':0.098,'contributions':0.12,'disinfection':0.018,'commodities':0.018,
            'litter':0.033,'catching':0.07,'insurances':0.034,'id':1},'id':2},
        'department':'Landes','name':'Label Landes Liberté','chickNb':1050,'avgWeight':2.31,
        'age':86,'breedingPerYear':3.3,'consumptionIndex':3.0,'mortalityPercent':0.02,
        'vaccinesPrice':0.328,'foodPrice':0.265,'classedPrice':1.683,'declassedPrice':1.1,
        'breedingDeclassedPercent':0.09,'restraintPercent':0.01,'chickPurchaseReduction':0.02,'id':4},
        {'facility':{'size':400,'type':'batiment','facilityCharges':{'warming':0.097,'chickPrice':0.328,
            'vetPrice':0.098,'contributions':0.12,'disinfection':0.018,'commodities':0.018,'litter':0.033,
            'catching':0.07,'insurances':0.034,'id':1},'id':1},'department':'Others','name':'Label Liberté',
            'chickNb':4400,'avgWeight':2.31,'age':86,'breedingPerYear':3.3,'consumptionIndex':2.93,
            'mortalityPercent':0.02,'vaccinesPrice':0.328,'foodPrice':0.265,'classedPrice':1.626,
            'declassedPrice':1.1,'breedingDeclassedPercent':0.04,'restraintPercent':0.01,
            'chickPurchaseReduction':0.02,'id':5},{'facility':{'size':60,'type':'cabane',
        'facilityCharges':{'warming':0.097,'chickPrice':0.328,'vetPrice':0.098,'contributions':0.12,
            'disinfection':0.018,'commodities':0.018,'litter':0.033,'catching':0.07,'insurances':0.034,
            'id':1},'id':2},'department':'Others','name':'Label Sud Ouest','chickNb':1050,'avgWeight':2.31,
        'age':86,'breedingPerYear':3.3,'consumptionIndex':2.95,'mortalityPercent':0.02,'vaccinesPrice':0.328,
        'foodPrice':0.265,'classedPrice':1.581,'declassedPrice':1.1,'breedingDeclassedPercent':0.09,
        'restraintPercent':0.01,'chickPurchaseReduction':0.02,'id':7},{'facility':{'size':400,
        'type':'batiment','facilityCharges':{'warming':0.097,'chickPrice':0.328,'vetPrice':0.098,
            'contributions':0.12,'disinfection':0.018,'commodities':0.018,'litter':0.033,
            'catching':0.07,'insurances':0.034,'id':1},'id':1},'department':'Others',
        'name':'Label Sud Ouest','chickNb':4400,'avgWeight':2.31,'age':86,'breedingPerYear':3.3,
        'consumptionIndex':2.94,'mortalityPercent':0.02,'vaccinesPrice':0.328,'foodPrice':0.265,
        'classedPrice':1.581,'declassedPrice':1.1,'breedingDeclassedPercent':0.09,'restraintPercent':0.01,
        'chickPurchaseReduction':0.02,'id':6}];
}