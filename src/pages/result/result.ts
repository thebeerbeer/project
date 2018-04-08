import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DocumentProvider } from '../../providers/document/document';
import { FileOpener } from '@ionic-native/file-opener';


@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  data = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public document: DocumentProvider, public fileOpenner: FileOpener) {
    this.data = this.navParams.get('data');
    console.log(this.data);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

  async openPdf() {
    try {
      const blob = await this.document.create({
        ...this.data
      });

      let saveResult = await this.document.save(blob)
      this.fileOpenner.open(saveResult.nativeURL, 'application/pdf').catch(error => alert(JSON.stringify(error)))


    } catch (error) {
      alert(JSON.stringify(error))

    }
  }

}
