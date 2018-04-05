import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import BasePage from '../../base';

/**
 * Generated class for the InsulinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insulin',
  templateUrl: 'insulin.html',
})
export class InsulinPage extends BasePage {

  glucose: number;
  // datenow: DateTime;

  items = [];
  results = [];

  uid: string = '';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public ToastCtrl: ToastController,
    public LoadingCtrl: LoadingController
  ) {
    super(ToastCtrl, LoadingCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsulinPage');
  }

  addglucose() {
    this.firebaseFirestore
      .collection('users')
      .doc(this.firebaseAuth.auth.currentUser.uid)
      .collection('glucose')
      .add({
        glucose: this.glucose,
        datenow: new Date()
      })
      .then(() => {
        // this.navCtrl.pop();
        this.showToast("Add Glucose Succeccfully")
        // this.navCtrl.
        console.log('success')
        console.log(this.glucose)
      })
  }
}
