process.env.NODE_ENV = 'production';

const FacilityChargesRepository = require('./database/repository/facility_charges.repository');
const FacilityRepository = require('./database/repository/facility.repository');
const ProductionRepository = require('./database/repository/production.repository');
const InvestmentRepository = require('./database/repository/investment.repository');

const FacilityCharges = require('./database/domain/facility_charges');
const Facility = require('./database/domain/facility');
const Production = require('./database/domain/production');
const Investment = require('./database/domain/investment');

window.repositories = {
    production: new ProductionRepository(),
    facility: new FacilityRepository(),
    facilityCharges: new FacilityChargesRepository(),
    investment: new InvestmentRepository()
};

const db = window.repositories.production.db;

if (db.info) {
    db.info()
        .then((response) => {
            if (response.doc_count === 0) {
                const facilityCharges1 = new FacilityCharges({'warming':0.097,'chickPrice':0.328,
                    'vetPrice':0.098,'contributions':0.12,'disinfection':0.018,'commodities':0.018,'litter':0.033,
                    'catching':0.07,'insurances':0.034,'id':'facilityCharges1'});
                const facilityCharges2 = new FacilityCharges({'warming':0.097,'chickPrice':0.328,
                    'vetPrice':0.098,'contributions':0.135,'disinfection':0.018,'commodities':0.018,'litter':0.033,
                    'catching':0.07, 'insurances':0.034,'id':'facilityCharges2'});

                const investmentBat = new Investment({id:'investBat1', name:"new tech distri label", designation:"Volets ou Lousiane",
                    description:"ventilation transversale", papers: 980,
                    masonry:10000, facilityMoutingDeliveryPrice:43791,
                    equipmentMountingDeliveryPrice:29218, diverseOptions:0, subsidies:30000, helpEuralis:11300});

                const investmentBat2 = new Investment({id:'investBat2', name:"new tech distri label", designation:"Lanterneau",
                    description:"ventilation par volets et lanterneau", papers: 980,
                    masonry:10000, facilityMoutingDeliveryPrice:45501,
                    equipmentMountingDeliveryPrice:29218, diverseOptions:0, subsidies:30000, helpEuralis:11300});

                const investmentCab = new Investment({id:'investCab1', name:"Bâtiment déplaçable cabi 60 m² label",
                    designation:"Bâtiments tout en panneaux sandwichs acier laque",
                    description:"", papers: 980,
                    masonry:0, facilityMoutingDeliveryPrice:7580,
                    equipmentMountingDeliveryPrice:2312, diverseOptions:16740, subsidies:30000, helpEuralis:1000});

                const facility1 = new Facility({"size":400,"type":"batiment","facilityCharges":'facilityCharges1',"id":'facility1', investments: [investmentBat, investmentBat2]});
                const facility2 = new Facility({"size":60,"type":"cabane","facilityCharges":'facilityCharges1',"id":'facility2', investments: [investmentCab]});
                const facility3 = new Facility({"size":150,"type":"batiment","facilityCharges":'facilityCharges1',"id":'facility3', investments: [investmentBat, investmentBat2]});
                const facility4 = new Facility({"size":400,"type":"batiment","facilityCharges":'facilityCharges2',"id":'facility4', investments: [investmentBat, investmentBat2]});

                const production1 = new Production({"id":'production1',"department":"Gers","name":"SAB","chickNb":4400,
                    "avgWeight":2.31,"age":86,"breedingPerYear":3.3,"consumptionIndex":2.94,"mortalityPercent":0.02,
                    "vaccinesPrice":0.328,"foodPrice":0.274,"classedPrice":1.68,"declassedPrice":1.1,
                    "breedingDeclassedPercent":0.04,"restraintPercent":0.01,
                    "chickPurchaseReduction":0.02,"facility":'facility4'});
                const production2 = new Production({"id":'production2',"department":"Gers","name":"Label Gers","chickNb":4420,
                    "avgWeight":2.31,"age":86,"breedingPerYear":3.3,"consumptionIndex":2.94,"mortalityPercent":0.02,
                    "vaccinesPrice":0.328,"foodPrice":0.265,"classedPrice":1.523,"declassedPrice":1.1,
                    "breedingDeclassedPercent":0.04,"restraintPercent":0.01,
                    "chickPurchaseReduction":0.02,"facility":'facility1'});
                const production3 = new Production({"facility":'facility4',"department":"Landes","name":"Label Landes Liberté",
                    "chickNb":1650,"avgWeight":2.31,"age":86,"breedingPerYear":3.3,"consumptionIndex":3,
                    "mortalityPercent":0.02,"vaccinesPrice":0.328,"foodPrice":0.265,"classedPrice":1.683,
                    "declassedPrice":1.1,"breedingDeclassedPercent":0.09,"restraintPercent":0.01,
                    "chickPurchaseReduction":0.02,"id":'production3'});
                const production4 = new Production({"facility":'facility2',"department":"Landes","name":"Label Landes Liberté",
                    "chickNb":1050,"avgWeight":2.31,"age":86,"breedingPerYear":3.3,"consumptionIndex":3,
                    "mortalityPercent":0.02,"vaccinesPrice":0.328,"foodPrice":0.265,"classedPrice":1.683,
                    "declassedPrice":1.1,"breedingDeclassedPercent":0.09,"restraintPercent":0.01,
                    "chickPurchaseReduction":0.02,"id":'production4'});
                const production5 = new Production({"facility":'facility1',"department":"Others","name":"Label Liberté",
                    "chickNb":4400,"avgWeight":2.31,"age":86,"breedingPerYear":3.3,"consumptionIndex":2.93,
                    "mortalityPercent":0.02,"vaccinesPrice":0.328,"foodPrice":0.265,"classedPrice":1.626,
                    "declassedPrice":1.1,"breedingDeclassedPercent":0.04,"restraintPercent":0.01,
                    "chickPurchaseReduction":0.02,"id":'production5'});
                const production6 = new Production({"facility":'facility1',"department":"Others","name":"Label Sud Ouest",
                    "chickNb":4400,"avgWeight":2.31,"age":86,"breedingPerYear":3.3,"consumptionIndex":2.94,
                    "mortalityPercent":0.02,"vaccinesPrice":0.328,"foodPrice":0.265,"classedPrice":1.581,
                    "declassedPrice":1.1,"breedingDeclassedPercent":0.09,"restraintPercent":0.01,
                    "chickPurchaseReduction":0.02,"id":'production6'});
                const production7 = new Production({"facility":'facility2',"department":"Others","name":"Label Sud Ouest",
                    "chickNb":1050,"avgWeight":2.31,"age":86,"breedingPerYear":3.3,"consumptionIndex":2.95,
                    "mortalityPercent":0.02,"vaccinesPrice":0.328,"foodPrice":0.265,"classedPrice":1.581,
                    "declassedPrice":1.1,"breedingDeclassedPercent":0.09,"restraintPercent":0.01,
                    "chickPurchaseReduction":0.02,"id":'production7'});

                return window.repositories.facilityCharges.create(facilityCharges1)
                    .then(() => window.repositories.facilityCharges.create(facilityCharges2))
                    .then(() => window.repositories.investment.create(investmentBat))
                    .then(() => window.repositories.investment.create(investmentBat2))
                    .then(() => window.repositories.investment.create(investmentCab))
                    .then(() => window.repositories.facility.create(facility1))
                    .then(() => window.repositories.facility.create(facility2))
                    .then(() => window.repositories.facility.create(facility3))
                    .then(() => window.repositories.facility.create(facility4))
                    .then(() => window.repositories.production.create(production1))
                    .then(() => window.repositories.production.create(production2))
                    .then(() => window.repositories.production.create(production3))
                    .then(() => window.repositories.production.create(production4))
                    .then(() => window.repositories.production.create(production5))
                    .then(() => window.repositories.production.create(production6))
                    .then(() => window.repositories.production.create(production7));

            }
        })
        .catch((err) => console.log(err));
}