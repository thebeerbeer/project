import { Loading } from 'ionic-angular/components/loading/loading';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { AddcallnumPage } from '../addcallnum/addcallnum';
import BasePage from '../../base';
import { Action } from 'rxjs/scheduler/Action';


@IonicPage()
@Component({
  selector: 'page-emergency',
  templateUrl: 'emergency.html',
})
export class EmergencyPage extends BasePage {

  items = [];
  results = [];

  uid: string = '';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private callNumber: CallNumber,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public ToastCtrl: ToastController,
    public LoadingCtrl: LoadingController
  ) {

    super(ToastCtrl, LoadingCtrl)
  }

  call() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .collection('emergency')
    this.callNumber.callNumber("0882533948", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  navigateAddcall() {
    this.navCtrl.push(AddcallnumPage);
  }


  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;
    console.log('ionViewDidLoad EmergencyPage');


    this.showLoading("Fetching data...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('emergency')
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

          this.hideLoading();
          console.log(this.items);
        },
        (error => {
          this.hideLoading();
          this.showToast(error);
        })
      )

  }

  delete(emergencyId) {
    this.showLoading("Deleting...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('emergency')
      .doc(emergencyId)
      .delete()
      .then(() => {
        this.hideLoading();
        this.showToast("Delete successfully")
      })
      .catch(error => {
        this.hideLoading();
        this.showToast(error)
        console.log(emergencyId);
      });

  }

  // edit(movieId) {
  //   this.navCtrl.push(EditmoviePage, {
  //     id: movieId
  //   });

  // }






}


