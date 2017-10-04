import pdfMake from 'pdfmake/build/pdfmake.min';
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class PDFGenerator {
    constructor(UserService){
        'ngInject';
        this.UserService = UserService;
    }

    generate() {
        let docDefinition = {};
        docDefinition.content = putHeader('\n\nPrévisionnel production avec batiment');
        pdfMake.createPdf(docDefinition).download();
    }

    putHeader(title) {
        let logo = PDFGenerator.getLogoAsBase64();
        return [{
            alignment: 'left',
            columns: [logo, {text: title, style: 'header'}]
        }];
    }

    generatePrevisionnel(production, investment, date, annuity) {

        let docDefinition = {
            content: this.putHeader(`\nPREVISIONNEL ${production.facilitiesNb} * ${production.facility.size} m² ${production.name}`),
            styles: {
                header: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                tableExample: {
                    margin: [0, 5, 0, 15],
                    bold: true,
                    alignement: 'center'
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }
        };

        let displayedDate = new Date(date);
        let updateDate = new Date(production.updateDate);

        let contentToConcat = [
            {
                columns: [
                    {
                        text: this.UserService.getUser(),
                        bold: true,
                        alignment: 'left'
                    },
                    {
                        text: 'le ' + displayedDate.toLocaleDateString("fr-FR"),
                        bold: true,
                        alignement: 'right'
                    }
                ]
            },
            '\n',
            `Parcours: ${Math.round(production.fieldSpace / production.chickNb)} poulets/m²`,
            `Mis à jour le ` + updateDate.toLocaleDateString("fr-FR"),
            {
                style: 'tableExample',
                table: {
                    widths: ['*', 75],
                    headerRows: 1,
                    body: [
                        [{text: `EURALIS Volailles      ${production.facilitiesNb * production.facility.size} m²`, style: 'tableHeader', colSpan: 2, alignment: 'center'}, ''],
                        [`Poussins mis en places        facturés: ${Math.round(production.getChicksPaid())}`, production.getChickNb()],
                        ['Mortalité', `${production.mortalityPercent * 100} %`],
                        ['Age', `${production.age} j.`],
                        ['Nombre de bandes par année', `${production.breedingPerYear}`],
                        ['Indice de consommation', `${production.consumptionIndex}`],
                        ['Poids moyen', `${production.avgWeight} kg`],
                        ['Prix poussins vaccinés', `${production.getVaccinesPrice()} €`],
                        ['Prix aliment producteur (farine, < 12.5t) en euros/t', `${production.getFoodPrice()} €`],
                        ['Prix reprise classé en euros/t (bonif 54 €/t incluse)', `${production.getClassedPrice()} €`],
                        ['Prix reprise déclassé en €', `${production.getDeclassedPrice()} €`],
                        ['Taux de déclassé (0% sur les 3 premières bandes)', `${production.breedingDeclassedPercent * 100} %`],
                        ['Taux de saisie', `${production.restraintPercent * 100} %`]
                    ]
                }
            },
            {
                style: 'tableExample',
                table: {
                    widths: ['*', 75, 75],
                    headerRows: 1,
                    body: [
                        [{text: `CRITERES ECONOMIQUES`, style: 'tableHeader', alignment: 'left'},
                            {text: `€/1000`, style: 'tableHeader', alignment: 'center'},
                            {text: `Total (€)`, style: 'tableHeader', alignment: 'center'}],
                        [`Poussins`, production.facility.facilityCharges.chickPrice * 1000, Math.round(production.getChicksPaid() * production.facility.facilityCharges.chickPrice)],
                        ['Aliment (€/t)', production.foodPrice * 1000, Math.round(production.foodPrice * production.getDeliveredChicks())],
                        ['Cotisations', production.facility.facilityCharges.contributions * 1000, Math.round(production.facility.facilityCharges.contributions * production.getDeliveredChicks())],
                        ['Chauffage', production.facility.facilityCharges.warming * 1000, Math.round(production.facility.facilityCharges.warming * production.getDeliveredChicks())],
                        ['Frais vétérinaires', production.facility.facilityCharges.vetPrice * 1000, Math.round(production.facility.facilityCharges.vetPrice * production.getDeliveredChicks())],
                        ['Désinfection', production.facility.facilityCharges.disinfection * 1000, Math.round(production.facility.facilityCharges.disinfection * production.getDeliveredChicks())],
                        ['Eau - Electricité - Divers', production.facility.facilityCharges.commodities * 1000, Math.round(production.facility.facilityCharges.commodities * production.getDeliveredChicks())],
                        ['Litière', production.facility.facilityCharges.litter * 1000, Math.round(production.facility.facilityCharges.litter * production.getDeliveredChicks())],
                        ['Attrapage', production.facility.facilityCharges.catching * 1000, Math.round(production.facility.facilityCharges.catching * production.getDeliveredChicks())],
                        ['Assurances', production.facility.facilityCharges.insurances * 1000, Math.round(production.facility.facilityCharges.insurances * production.getDeliveredChicks())],
                        [{text: `Charges / tête`, italic: true}, {text:'0.37 €', colSpan: 2, alignement: 'left'}, ''],
                        [{text: `TOTAL PAR BANDE`}, {text:`${Math.round(production.getTotalCosts())}`, colSpan: 2, alignement: 'left'}, ''],
                    ]
                }
            },
        ];

        if(investment) {
            contentToConcat.push({text: '', pageBreak: 'before'});
            contentToConcat.push({
                    style: 'tableExample',
                    table: {
                        widths: ['*', 75],
                        headerRows: 1,
                        body: [
                            [`INVESTISSEMENT`, `€`],
                            ['Désignation', investment.designation],
                            [`Description`, investment.description],
                            [`Documents`, investment.papers],
                            [`Gros oeuvre`, investment.getMasonry()],
                            ['Livraison et montage bâtiment', investment.getFacilityMountingDeliveryPrice()],
                            ['Livraison et montage du matériel', investment.getEquipmentMountingDeliveryPrice()],
                            [`Investissement total`, investment.getTotalBeforeSubsidies()],
                            [`Subventions AREA PCAE`, investment.subsidies],
                            [`Aides EURALIS Vollailes`, investment.helpEuralis],
                            [`Emprunt bancaire`, investment.getTotal()],
                        ]
                    }
                })
        }

        contentToConcat.push({
                style: 'tableExample',
                table: {
                    widths: ['*', 75],
                    headerRows: 1,
                    body: [
                        [`PRODUIT PAR BANDE`, '€'],
                        [`Nombre de poulets livrés`, Math.round(production.getDeliveredChicks())],
                        [`Nombre de poulets vendus`, Math.round(production.getSoldChicks())],
                        [`Prix de vente moyen /t`, Math.round(production.getAvgWagesPerTon())],
                        [`PRODUIT TOTAL PAR BANDE`, Math.round(production.getTotalWages())],
                        [`MARGE BRUTE PAR BANDE`, Math.round(production.getBrutMargin())],
                        [`par poulet MEP`, Math.round(production.getBrutMargin() / production.getChickNb())],
                        [`MARGE BRUTE ANNUELLE avec ${production.breedingPerYear} bandes par année`, Math.round(production.getBrutMargin() / production.getChickNb())],
                        [`Marge par m²`,  Math.round(production.getAnnualBrutMargin() / ( production.facilitiesNb * production.facility.size ))],
                    ]
                }
        });

        if(investment) {
            contentToConcat.push(	{
                columns: [
                    {
                        width: 100,
                        text: 'Annuité ',
                        bold: true
                    },
                    {
                        width: 150,
                        text: ' pour un investissement de '
                    },
                    {
                        width: 50,
                        text: investment.getTotal() + '€',
                        bold: true
                    },
                    {
                        width: 20,
                        text: ' sur '
                    },
                    {
                        width: 50,
                        text: annuity.duration + ' ans ',
                        bold: true
                    },
                    {
                        width: 10,
                        text: ' à'
                    },
                    {
                        width: 75,
                        text: annuity.interest + '%'
                    },
                    {
                        width: 'auto',
                        text: Math.round(investment.getAnnuity(annuity.duration, annuity.interest)) + '€',
                        bold: true
                    }
                ]
            });
            contentToConcat.push(
                {
                    style: 'tableExample',
                    table: {
                        widths: ['*', 75],
                        headerRows: 1,
                        body: [
                            [`MARGE NETTE ANNUELLE avant MSA`, Math.round(production.getAnnualNetMargin(investment.getAnnuity(annuity.duration, annuity.interest)))]
                        ]
                    }
                }
            );
        } else {
            contentToConcat.push(
                {
                    style: 'tableExample',
                    table: {
                        widths: ['*', 75],
                        headerRows: 1,
                        body: [
                            [`MARGE NETTE ANNUELLE avant MSA`, Math.round(production.getAnnualNetMargin(0))]
                        ]
                    }
                }
            );
        }

        contentToConcat.push('Temps de travail ' + production.facility.workHours * production.facilitiesNb + 'h / j en moyenne');
        contentToConcat.push('Document non contractuel');

        docDefinition.content = docDefinition.content.concat(contentToConcat);
        
        console.log(docDefinition, contentToConcat);

        pdfMake.createPdf(docDefinition).download('previsionnel.pdf');
    }

    generateRotations(nbFacilities, productions, investment, annuity) {
        console.log(nbFacilities, productions, investment, annuity);
        let docDefinition = {
            content: this.putHeader('\n ROTATIONS REALISABLES \n  POUR UNE SURFACE DE ' + productions[0].facility.size * nbFacilities + 'm²'),
            styles: {
                header: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                tableExample: {
                    margin: [0, 5, 0, 15],
                    bold: true,
                    alignement: 'center',
                    fontSize: 11
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }
        };

        let displayedDate = new Date();

        docDefinition.content.push({
                columns: [
                    {
                        text: this.UserService.getUser(),
                        bold: true,
                        alignment: 'left'
                    },
                    {
                        text: 'le ' + displayedDate.toLocaleDateString("fr-FR"),
                        bold: true,
                        alignement: 'right'
                    }
                ]
            },
            '\n'
        );

        let table = {
            style: 'tableExample',
            table: {
                width: 'auto',
                headerRows: 1,
                body: [
                    ['Type de production', 'Surface bâtiment (m²)', 'Surface parcours minimum (ha)',
                        'Densité (m²)', 'Nombre / bandes', 'Nbre bandes/an', 'Nbre vendus / an', 'Marge brute / sujet vendu (€)', 'Marge brute / an (€)']
                ]
            }
        };

        for(let i = 0 ; i < productions.length ; i++) {
            table.table.body.push([
                productions[i].name,
                productions[i].facility.size * nbFacilities,
                productions[i].fieldSpace,
                Math.round(productions[i].facility.size / productions[i].chickNb * 100) / 100,
                productions[i].chickNb * nbFacilities,
                1,
                Math.round(productions[i].getSoldChicks() * 100) / 100,
                Math.round(productions[i].getBrutMargin() / productions[i].getSoldChicks() * 100 ) / 100,
                Math.round(productions[i].getBrutMargin()*100)/100
            ])
        }

        table.table.body.push(['', '', '', '', '', '', '', '',
            Math.round(productions.reduce((acc, production) => {
                return  acc + production.getBrutMargin();
            }, 0) * 100) /100
        ]);

        docDefinition.content = docDefinition.content.concat(table);

        docDefinition.content.push({
            columns: [
                {
                    width: 100,
                    text: ''
                },
                {
                    width: 50,
                    text: 'Annuité ',
                    bold: true
                },
                {
                    width: 110,
                    text: ' (Investissement de '
                },
                {
                    width: 60,
                    text: investment.getTotal() + '€',
                    bold: true
                },
                {
                    width: 30,
                    text: ' sur '
                },
                {
                    width: 40,
                    text: annuity.duration + ' ans ',
                    bold: true
                },
                {
                    width: 10,
                    text: ' à'
                },
                {
                    width: 75,
                    text: annuity.interest + '%)'
                },
                {
                    width: 'auto',
                    text: Math.round(investment.getAnnuity(annuity.duration, annuity.interest)) + '€',
                    bold: true
                }
            ]
        });

        docDefinition.content.push({
            columns: [
                {
                    width: 100,
                    text:''
                },
                {
                    width: 330,
                    text: 'Avec ' + investment.name + ' ' + investment.designation + '(AREA et aides EURALIS déduites)',
                },
                {
                    width: 100,
                    text: ''
                }
            ]
        });
        docDefinition.content.push('\n');
        docDefinition.content.push({
            columns: [
                {
                    width: 300,
                    text:''
                },
                {
                    width: 150,
                    text: 'Marge nette avant MSA',
                    bold:true
                },
                {
                    width: 'auto',
                    text: Math.round(productions.reduce((acc, production) => {
                        return  acc + production.getBrutMargin();
                    }, 0) - investment.getAnnuity(annuity.duration, annuity.interest) * 100) / 100 + '€',
                    bold: true
                }
            ]
        });
        docDefinition.content.push('\n');
        docDefinition.content.push({text: '\n\nMarge brute = Ventes - poussins, aliment, cotis, prophylaxie, gaz, eau, edf, paille, attrapage, chaponnage, assurances', bold:true, fontSize: 9});
        docDefinition.content.push({text: '\n\n\n(document non contractuel)', fontSize: 9});

        console.log(docDefinition);

        pdfMake.createPdf(docDefinition).download('rotations.pdf');
    }

    static getLogoAsBase64() {
        let mycanvas = document.createElement("canvas");
        let ctx = mycanvas.getContext("2d");
        let img = document.getElementById("logo_euralis");
        ctx.width = img.width;
        ctx.height = img.height;
        ctx.drawImage(img,0,0);

        return {
            image: mycanvas.toDataURL(),
            width: ctx.width,
            height: ctx.height
        };
    }
}