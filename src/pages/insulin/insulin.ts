import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import BasePage from '../../base';
import { AddFoodPage } from '../add-food/add-food';
import * as moment from 'moment';
import { ResultPage } from '../result/result';


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

  data = {
    date: new Date(),
    time: moment().format('hh:mm'),
    targetBg: 0,
    bg: 0,
    tdd: 0,
    isf: 0,
    icr: 0,
    carb: 0,
  }

  foods = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public ToastCtrl: ToastController,
    public LoadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
  ) {
    super(ToastCtrl, LoadingCtrl)
  }

  ionViewDidLoad() {
    this.firebaseFirestore
      .collection('users')
      .doc(this.firebaseAuth.auth.currentUser.uid)
      .valueChanges() //ติดตามข้อมูลเวลาข้อมูลเปลี่ยนแปลง
      .subscribe((data: any) => { //ติดตามข้อมูล

        this.data.tdd = data.tdd;
        this.data.isf = data.isf;
        this.data.icr = data.icr;
        this.data.targetBg = data.targetBg;

        console.log(data)
      })

    console.log(this.data);

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

  calculate() {
    const bgDiff = this.data.bg - this.data.targetBg;
    const collection = bgDiff / this.data.isf;

    const carbBolus = this.data.carb / this.data.icr;
    const bolusDose = (collection + carbBolus < 0) ? 0 : collection + carbBolus;

    if (this.data.bg <= 70) {
      let alert = this.alertCtrl.create({
        title: 'คุณมีน้ำตาลในเลือดต่ำ ',
        message: 'ยังต้องการฉีดอินซูลินหรือไม่?',
        buttons: [
          {
            text: 'ไม่',
            handler: () => {
              return;
            }
          },
          {
            text: 'ใช่',
            handler: () => {
              this.firebaseFirestore
                .collection('users')
                .doc(this.firebaseAuth.auth.currentUser.uid)
                .collection('glucose')
                .doc(new Date(this.data.date).toDateString())
                .set({});

              this.firebaseFirestore
                .collection('users')
                .doc(this.firebaseAuth.auth.currentUser.uid)
                .collection('glucose')
                .doc(new Date(this.data.date).toDateString())
                .collection("datas")
                .add({
                  bolusDose: Math.ceil(bolusDose),
                  ...this.data,
                  foods: this.foods,
                });


              this.navCtrl.push(ResultPage, {
                data: {
                  ...this.data,
                  foods: this.foods,
                  bolusDose: Math.ceil(bolusDose),
                },
              });

            }
          }
        ]
      });

      alert.present();
    } else {
      this.firebaseFirestore
        .collection('users')
        .doc(this.firebaseAuth.auth.currentUser.uid)
        .collection('glucose')
        .doc(new Date(this.data.date).toDateString())
        .set({});

      this.firebaseFirestore
        .collection('users')
        .doc(this.firebaseAuth.auth.currentUser.uid)
        .collection('glucose')
        .doc(new Date(this.data.date).toDateString())
        .collection("datas")
        .add({
          bolusDose: Math.ceil(bolusDose),
          ...this.data,
          foods: this.foods,
        });


      this.navCtrl.push(ResultPage, {
        data: {
          ...this.data,
          foods: this.foods,
          bolusDose: Math.ceil(bolusDose),
        },
      });

    }

  }

  selectFood() {
    let addFoodModal = this.modalCtrl.create(AddFoodPage);
    addFoodModal.onDidDismiss(data => {
      this.foods = data.foods;
      this.data.carb = this.foods.reduce((total, current) => total += current.carb, 0)
    })
    addFoodModal.present();
  }

  remove(index) {
    this.foods.splice(index, 1);
  }
}
