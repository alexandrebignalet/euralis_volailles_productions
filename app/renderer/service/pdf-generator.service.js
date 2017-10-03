import pdfMake from 'pdfmake/build/pdfmake.min';
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import euralis_logo from 'base64!../images/logo_printed.gif';

export class PDFGenerator {
    constructor(){}

    generate() {
        let docDefinition = {};
        docDefinition.content = PDFGenerator.getHeader('\n\nPrévisionnel production avec batiment');
        pdfMake.createPdf(docDefinition).download();
    }

    static getHeader(title) {
        let logo = PDFGenerator.getLogoAsBase64();
        return [{
            alignment: 'left',
            columns: [logo, {text: title, style: 'header'}]
        }];
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