import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import BasePage from '../../base';



@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage extends BasePage {

  name: string = '';
  email: string = '';
  photoURL: string = '';
  age: number;
  tel: string = '';
  height: number;
  weight: number;
  gender: string;

  uid: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth, //everthing about user
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public LoadingCtrl: LoadingController
  ) {
    super(toastCtrl, LoadingCtrl)
  }

  ionViewDidLoad() {
    this.email = this.firebaseAuth.auth.currentUser.email;
    this.name = this.firebaseAuth.auth.currentUser.displayName;
    this.photoURL = this.firebaseAuth.auth.currentUser.photoURL;


    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .valueChanges() //ติดตามข้อมูลเวลาข้อมูลเปลี่ยนแปลง
      .subscribe((data: any) => { //ติดตามข้อมูล
        this.age = data.age;
        this.tel = data.tel;
        this.name = data.name;
        this.height = data.height;
        this.weight = data.weight;
        this.gender = data.gender;
        console.log(data)
      })
  }

  save() {
    this.showLoading("Updating...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .update({
        name: this.name,
        age: this.age,
        tel: this.tel,
        height: this.height,
        weight: this.weight,
        gender: this.gender
      })
      .then(() => {
        this.showToast("Updated successfully");
        this.hideLoading();

        this.navCtrl.pop();
      })
      .catch(error => {
        this.showToast(error);
        this.hideLoading();
      })

  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }
}
