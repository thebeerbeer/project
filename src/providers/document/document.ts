import { Injectable } from "@angular/core";
import { File } from "@ionic-native/file";
//import { FirebaseUserProvider } from "../firebase-user/firebase-user";
import { style, THSarabunNew, defaultStyle } from "./constant";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as moment from "moment";
import * as jsPDF from "jspdf";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";


/*
  Generated class for the DocumentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DocumentProvider {

  constructor(
    private file: File,
    private firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
  ) {
    pdfMake.fonts = THSarabunNew;
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  async create(data) {
    return new Promise(async (resolve, reject) => {

      this.firebaseFirestore
        .collection('users')
        .doc(this.firebaseAuth.auth.currentUser.uid)
        .valueChanges() //ติดตามข้อมูลเวลาข้อมูลเปลี่ยนแปลง
        .subscribe((user: any) => { //ติดตามข้อมูล

          const foodRow = data.foods.map(food => {
            return [
              { text: food.name, italics: true, color: 'gray' },
              { text: food.carb, italics: true, color: 'gray' }
            ]
          });

          let pdfContent = {
            content: [
              {
                text: `${user.name} : ${data.date}\n\n`,
                style: "subheader"
              },
              {
                text: `อินสูลิน:  ${data.bolusDose} ยูนิต`,
                style: "subheader"
              },
              {
                text: 'ระดับน้ำตาล',
                style: 'subheader'
              },
              {
                style: 'tableExample',
                table: {
                  widths: ['*', '*', '*'],
                  body: [
                    ['เป้าหมาย', 'ที่วัดได้', 'ส่วนต่าง'],
                    [
                      { text: data.targetBg, italics: true, color: 'gray' },
                      { text: data.bg, italics: true, color: 'gray' },
                      { text: data.targetBg - data.bg, italics: true, color: 'gray' }
                    ]
                  ]
                }
              },
              {
                text: 'อาหาร',
                style: 'subheader'
              },
              {
                style: 'tableExample',
                table: {
                  widths: ['*', '*',],
                  body: [
                    ['ที่วัดได้', 'ส่วนต่าง'],
                    ...foodRow
                  ]
                }
              },
            ],
            defaultStyle: defaultStyle,
            styles: style
          };

          try {
            pdfMake.createPdf(pdfContent).download();
            pdfMake.createPdf(pdfContent).getBlob(blob => {
              resolve(blob);
            });
          } catch (e) {
            reject(e);
          }
        })
    })
  }

  save(blob) {
    const directory = this.file.dataDirectory;
    const name = `${moment()}.pdf`;

    return this.file.writeFile(directory, name, blob)
  }

}
