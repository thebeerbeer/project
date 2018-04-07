import { Injectable } from "@angular/core";
import { File } from "@ionic-native/file";
//import { FirebaseUserProvider } from "../firebase-user/firebase-user";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as moment from "moment";
import * as jsPDF from "jspdf";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class PdfProvider {
  constructor(
    private file: File,
    private firebaseAuth: AngularFireAuth
  ) {

  }

 
}
