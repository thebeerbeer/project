import { Action } from 'rxjs/scheduler/Action';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import BasePage from '../../base';


@IonicPage()
@Component({
  selector: 'page-glucose',
  templateUrl: 'glucose.html'
})
export class GlucosePage extends BasePage {

  glucose: number;
  datenow: DateTime;

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
    this.uid = this.firebaseAuth.auth.currentUser.uid;
    console.log('ionViewDidLoad GlucosePage');

    this.showLoading("Fetching data...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('glucose')
      .snapshotChanges()
      .subscribe(
        data => {
          this.items = [];
          data.map(action => {
            this.items.push({
              id: action.payload.doc.id,
              data: action.payload.doc.data()
            })
          });

          this.results = this.items;
          // this.glucose = '';

          this.hideLoading();
          console.log(this.items);
        },
        (error => {
          this.hideLoading();
          this.showToast(error);
        })
      )
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
      })
  }
}


