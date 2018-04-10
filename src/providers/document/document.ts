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
                text: [
                  {
                    text: 'รายงานระดับน้ำตาลในเลือด',
                    style: 'code',
                  },
                  {
                    text: ` ${data.date} `,
                    style: 'detail',
                    color: 'grey',
                    alignment: 'right',
                  },
                ]
              },
              {
                text: [
                  { text: `ชื่อ: `, style: 'detail', },
                  { text: ` ${user.name} `, style: 'detail', color: 'grey' },
                  { text: `อายุ: `, style: 'detail', },
                  { text: ` ${user.age} `, style: 'detail', color: 'grey' },
                  { text: `ส่วนสูง:  `, style: 'detail', },
                  { text: ` ${user.height} `, style: 'detail', color: 'grey' },
                  { text: `น้ำหนัก: `, style: 'detail', },
                  { text: ` ${user.weight} `, style: 'detail', color: 'grey' },
                ],
              },
              {
                text: [
                  { text: `อินสูลินที่ฉีด: `, style: 'detail', },
                  { text: ` ${data.bolusDose} ยูนิต\n`, style: 'detail', color: 'grey' },
                ],
                margin: [0, 10],
              },
              {
                text: 'ระดับน้ำตาล',
                style: 'detail'
              },
              {
                style: 'tableExample',
                table: {
                  widths: ['*', '*', '*'],
                  body: [
                    ['เป้าหมาย', 'ที่วัดได้', 'ส่วนต่าง'],
                    [
                      { text: data.targetBg, color: 'gray' },
                      { text: data.bg, color: 'gray' },
                      { text: data.targetBg - data.bg, color: 'gray' }
                    ]
                  ]
                }
              },
              {
                text: 'ค่าคงที่ที่แพทย์กำหนด',
                style: 'detail'
              },
              {
                style: 'tableExample',
                table: {
                  widths: ['*', '*', '*',],
                  body: [
                    ['ความต้องการอินสูลินต่อวัน', 'ขนาดอินสุลินสําหรับการแก้ไขภาวะน้ําตาลในเลือดสูง', 'ISF'],
                    [
                      { text: user.tdd, color: 'gray' },
                      { text: user.icr, color: 'gray' },
                      { text: user.isf, color: 'gray' }
                    ]
                  ]
                }
              },
              {
                text: 'อาหาร',
                style: 'detail'
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
