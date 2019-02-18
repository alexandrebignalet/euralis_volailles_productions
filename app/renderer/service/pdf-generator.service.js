import pdfMake from 'pdfmake/build/pdfmake.min';
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class PDFGenerator {
  constructor(UserService) {
    'ngInject';
    this.UserService = UserService;
  }

  static getLogoAsBase64() {
    let mycanvas = document.createElement("canvas");
    let ctx = mycanvas.getContext("2d");
    let img = document.getElementById("logo_euralis");
    ctx.width = img.width;
    ctx.height = img.height;
    ctx.drawImage(img, 0, 0);

    return {
      image: mycanvas.toDataURL(),
      width: ctx.width,
      height: ctx.height
    };
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

  generatePrevisionnel(production, investment, date, annuity, prospect) {
    const nameWithOutSpaces = (someWithName) => someWithName.name.replace(/\s+/g, '');
    const invesmentName = investment.name ? nameWithOutSpaces(investment) : '';
    const pdfName = `previsionnel_${nameWithOutSpaces(prospect)}_${production.facilitiesNb}_${production.facility.size}_${invesmentName}_${nameWithOutSpaces(production)}`;

    let docDefinition = {
      content: this.putHeader(`
                PREVISIONNEL ${production.facilitiesNb} * ${production.facility.size} m²
                
                ${production.name}`),
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
      {
        columns: [
          {
            text: `
                        
                                Parcours: ${production.chickBySquare} m²/poulet soit ${production.chickBySquare * production.getChickNb() / 10000}ha
                                Mis à jour le ${updateDate.toLocaleDateString("fr-FR")}`,
            alignement: 'right',
            bold: true
          },
          {
            text: `${prospect.company || ''}
                                ${prospect.name}
                                ${prospect.email || ''} ${prospect.email && prospect.phone ? '-' : ''} ${prospect.phone || ''}
                                ${prospect.address || ''}`,
            alignment: 'left',
            bold: true,
          }
        ]
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 75],
          headerRows: 1,
          body: [
            [{
              text: `EURALIS Volailles      ${production.facilitiesNb * production.facility.size} m²`,
              style: 'tableHeader',
              colSpan: 2,
              alignment: 'center'
            }, ''],
            [`Poussins mis en places        facturés: ${Math.round(production.getChicksPaid())}`, production.getChickNb()],
            ['Mortalité', `${production.mortalityPercent * 100} %`],
            ['Age', `${production.age} j.`],
            ['Nombre de bandes par année', `${production.breedingPerYear}`],
            ['Indice de consommation', `${production.consumptionIndex}`],
            ['Poids moyen', `${production.avgWeight} kg`],
            ['Prix poussins vaccinés (€/1000)', `${production.getVaccinesPrice()} €`],
            ['Prix aliment producteur (€/t) indexé', `${production.getFoodPrice()} €`],
            ['Prix reprise classé (€/t) indexé', `${production.getClassedPrice()} €`],
            ['Prix reprise déclassé (€/t) indexé', `${production.getDeclassedPrice()} €`],
            ['Taux de déclassé', `${production.breedingDeclassedPercent * 100} %`],
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
            [{text: `CRITERES ECONOMIQUES en € HT`, style: 'tableHeader', alignment: 'left'},
              {text: `€/tête`, style: 'tableHeader', alignment: 'center'},
              {text: `Total (€ HT)`, style: 'tableHeader', alignment: 'center'}],
            [`Poussins`, production.facility.facilityCharges.chickPrice, Math.round(production.getChicksPaid() * production.facility.facilityCharges.chickPrice)],
            ['Aliment (€/t)', production.foodPrice, Math.round(production.getTotalFoodCost())],
            ['Cotisations', production.facility.facilityCharges.contributions, Math.round(production.facility.facilityCharges.contributions * production.getChickNb())],
            [{
              text: `Marge PAC / poulet MEP`,
              italic: true
            }, {text: Math.round(production.getMargePACByChickPIP() * 100) / 100, colSpan: 2, alignement: 'left'}, ''],
            ['Chauffage (conso + loc cuves) indexé', production.facility.facilityCharges.warming, Math.round(production.facility.facilityCharges.warming * production.getChickNb())],
            ['Frais vétérinaires', production.facility.facilityCharges.vetPrice, Math.round(production.facility.facilityCharges.vetPrice * production.getChickNb())],
            ['Désinfection', production.facility.facilityCharges.disinfection, Math.round(production.facility.facilityCharges.disinfection * production.getChickNb())],
            ['Eau - Electricité - Divers', production.facility.facilityCharges.commodities, Math.round(production.facility.facilityCharges.commodities * production.getChickNb())],
            ['Litière', production.facility.facilityCharges.litter, Math.round(production.facility.facilityCharges.litter * production.getChickNb())],
            ['Attrapage', production.facility.facilityCharges.catching, Math.round(production.facility.facilityCharges.catching * production.getChickNb())],
            ['Assurances (incendie, tempête, dégâts des eaux, étouffements, etc...)', production.facility.facilityCharges.insurances, Math.round(production.facility.facilityCharges.insurances * production.getChickNb())],
            [{text: `Charges / tête`, italic: true}, {
              text: production.facility.facilityCharges.getChargesByChick(),
              colSpan: 2,
              alignement: 'left'
            }, ''],
            [`Marge Brute / poulet MEP`, {
              text: Math.round(production.getBrutMarginPerChickPIP() * 100) / 100,
              colSpan: 2,
              alignement: 'left'
            }, ''],
            [{text: `TOTAL CHARGES PAR BANDE`}, {
              text: `${Math.round(production.getTotalCosts())}`,
              colSpan: 2,
              alignement: 'center'
            }, ''],
          ]
        }
      },
    ];

    contentToConcat.push({text: '', pageBreak: 'before'});
    contentToConcat.push(this.putHeader(''));

    contentToConcat.push({
      style: 'tableExample',
      table: {
        widths: ['*', 130],
        headerRows: 1,
        body: [
          [`PRODUIT TOTAL PAR BANDE (Ventes)`, Math.round(production.getTotalWages()) + ' €'],
          [`MARGE BRUTE PAR BANDE`, Math.round(production.getBrutMargin()) + ' €'],
          [`MARGE BRUTE ANNUELLE avec ${production.breedingPerYear} bandes par année`, Math.round(production.getAnnualBrutMargin()) + ' €'],
          [{
            text: `Marge par m²`,
            fontSize: 10
          }, {
            text: Math.round(production.getAnnualBrutMargin() / (production.facilitiesNb * production.facility.size)) + ' €',
            fontSize: 10
          }],
        ]
      }
    });

    if (investment !== 'none') {
      contentToConcat.push({
        columns: [
          {
            width: 50,
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
            width: 50,
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
            widths: ['*', 130],
            headerRows: 1,
            body: [
              [`MARGE NETTE ANNUELLE avant MSA`, Math.round(production.getAnnualNetMargin(investment.getAnnuity(annuity.duration, annuity.interest))) + '€']
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
              [`MARGE NETTE ANNUELLE avant MSA`, Math.round(production.getAnnualNetMargin(0)) + '€']
            ]
          }
        }
      );
    }

    contentToConcat.push('Temps de travail ' + production.facility.workHours * production.facilitiesNb + 'h / j en moyenne');

    if (investment !== 'none') {
      contentToConcat.push(...generateInvestmentTable(investment));
    }

    function generateInvestmentTable(invesment) {
      const createTableInvestment = (body) => ({
        style: 'tableExample',
        table: {
          widths: ['*', 130],
          headerRows: 1,
          body
        }
      });

      const baseBody = [
        [`INVESTISSEMENT`, `€ HT`],
        ['Désignation', investment.designation],
        [`Description`, investment.description],
        [`Permis`, investment.papers],
        [`Coût architecte`, investment.architectCost],
        [`Gros oeuvre`, investment.getMasonry()],
        ['Livraison et montage bâtiment', investment.getFacilityMountingDeliveryPrice()],
        ['Livraison et montage du matériel', Math.round(investment.getEquipmentMountingDeliveryPrice())],
        ['Diverses options', investment.getTotalOptionsSelected()],
        [`Investissement total`, Math.round(investment.getTotalBeforeSubsidies())],
        [`Subventions AREA PCAE`, investment.subsidies],
        [`Aides EURALIS Volailles`, investment.helpEuralis],
        [`Apport personnel`, investment.personalContribution],
        [`Emprunt bancaire (aides et apport déduits)`, Math.round(investment.getTotal())],
      ];

      const diversesOptionsBody = (invesment) => [['Diverses options', '€ HT'], ...invesment.options.map(({name, amount}) => [name, amount])];

      const totalBody = [
        [`Investissement total`, Math.round(investment.getTotalBeforeSubsidies())],
        [`Subventions AREA PCAE`, investment.subsidies],
        [`Aides EURALIS Volailles`, investment.helpEuralis],
        [`Apport personnel`, investment.personalContribution],
        [`Emprunt bancaire (aides et apport déduits)`, Math.round(investment.getTotal())],
      ];

      const hasOptions = invesment.options.length > 0;
      const endTable = hasOptions ? [diversesOptionsBody(invesment), totalBody] : totalBody;
      const tableBodies = [baseBody].concat(endTable);

      return tableBodies.map(createTableInvestment);
    }


    contentToConcat.push('Document non contractuel');

    docDefinition.content = docDefinition.content.concat(contentToConcat);

    pdfMake.createPdf(docDefinition).download(`${pdfName}.pdf`);
  }

  generateRotations(nbFacilities, productions, investment, annuity) {
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
            'Densité (m²/poulet)', 'Nombre de bandes / an', 'Nombre / bandes', 'Nbre vendus / an', 'Marge brute / sujet vendu (€ HT)', 'Marge brute / an (€ HT)']
        ]
      }
    };

    for (let i = 0; i < productions.length; i++) {
      table.table.body.push([
        productions[i].name,
        productions[i].facility.size * nbFacilities,
        productions[i].chickBySquare * productions[i].getChickNb() / 10000,
        Math.round(productions[i].chickNb / productions[i].facility.size * 100) / 100,
        productions[i].breedingPerYear,
        productions[i].chickNb * nbFacilities,
        Math.round(productions[i].getSoldChicks()),
        Math.round(productions[i].brutMarginPerSoldChick * 100) / 100,
        Math.round(productions[i].getAnnualBrutMargin())
      ])
    }

    let total = productions.reduce((acc, production) => {
      return acc + production.getAnnualBrutMargin();
    }, 0);

    table.table.body.push(['', '', '', '', '', '', '', '', {text: Math.round(total) + '€', fontSize: 13}]);

    docDefinition.content = docDefinition.content.concat(table);

    if (investment !== 'none') {
      docDefinition.content.push({
        columns: [
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
            text: Math.round(investment.getTotal()) + '€',
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
            width: 60,
            text: annuity.interest + '%)'
          },
          {
            width: 100,
            text: ''
          },
          {
            width: 100,
            text: Math.round(investment.getAnnuity(annuity.duration, annuity.interest)) + '€',
            bold: true,
            fontSize: 13
          }
        ]
      });
      docDefinition.content.push({
        columns: [
          {
            width: 330,
            text: 'Avec ' + investment.name + ' ' + investment.designation + '\n(AREA et aides EURALIS déduites)',
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
            text: ''
          },
          {
            width: 160,
            text: 'Marge nette avant MSA',
            bold: true
          },
          {
            width: 100,
            text: Math.round(total - investment.getAnnuity(annuity.duration, annuity.interest)) + '€',
            bold: true,
            fontSize: 13
          }
        ]
      });
      docDefinition.content.push('\n');
    } else {
      docDefinition.content.push({
        columns: [
          {
            width: 300,
            text: ''
          },
          {
            width: 160,
            text: 'Marge nette avant MSA',
            bold: true
          },
          {
            width: 100,
            text: Math.round(total) + '€',
            bold: true,
            fontSize: 13
          }
        ]
      });
      docDefinition.content.push('\n');
    }
    docDefinition.content.push({
      text: '\n\nMarge brute = Ventes - poussins, aliment, cotis, prophylaxie, gaz, eau, edf, paille, attrapage, chaponnage, assurances',
      bold: true,
      fontSize: 9
    });
    docDefinition.content.push({text: '\n\n\n(document non contractuel)', fontSize: 9});

    pdfMake.createPdf(docDefinition).download('rotations.pdf');
  }
}
