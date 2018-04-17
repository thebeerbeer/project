import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DocumentProvider } from '../../providers/document/document';
import { FileOpener } from '@ionic-native/file-opener';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  data = {};

  nativeURL = ''

  constructor(public navCtrl: NavController, public navParams: NavParams, public document: DocumentProvider, public fileOpenner: FileOpener, public socialSharing: SocialSharing) {
    this.data = this.navParams.get('data');
    console.log(this.data);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

  async createPdf() {
    try {
      const blob = await this.document.create({
        ...this.data
      });

      let saveResult = await this.document.save(blob)
      this.nativeURL = saveResult.nativeURL;

    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  async openPdf() {
    try {
      if (this.nativeURL == '') {
        await this.createPdf()
        this.fileOpenner.open(this.nativeURL, 'application/pdf').catch(error => alert(JSON.stringify(error)))
      } else {
        this.fileOpenner.open(this.nativeURL, 'application/pdf').catch(error => alert(JSON.stringify(error)))
      }
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  async share() {
    try {
      if (this.nativeURL == '') {
        await this.createPdf()
        this.socialSharing.share(
          "Body",
          "Subject",
          // ["natthaponsricort@gmail.com"],
          // undefined,
          // undefined,
          this.nativeURL
        )
          .catch(e => alert(JSON.stringify(e)));
      } else {
        this.socialSharing.share(
          "Body",
          "Subject",
          // ["natthaponsricort@gmail.com"],
          // undefined,
          // undefined,
          this.nativeURL
        )
          .catch(e => alert(JSON.stringify(e)));
      }
    } catch (error) {
      alert(JSON.stringify(error))
    }

  }

}
