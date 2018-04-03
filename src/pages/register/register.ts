import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import BasePage from '../../base';
import { Loading } from 'ionic-angular/components/loading/loading';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BasePage {

  email: string = '';
  password: string = '';
  name: string = '';
  age: number;
  tel: string = '';
  height: number;
  weight: number;
  gender: string = '';


  loader: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseFirestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    super(toastCtrl, loadingCtrl)
  }

  register() {
    this.showLoading("Registering...")
    this.hideLoading();
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword

      (this.email, this.password)
      .then(user => {
        user.updateProfile({
          displayName: this.name,
          photoURL: 'https://cdn.thinglink.me/api/image/796766103450681347/1240/10/scaletowidth'
        })

        this.firebaseFirestore
          .collection('users')
          .doc(user.uid)
          .set({
            name: this.name,
            email: this.email,
            tel: this.tel,
            age: this.age,
            height: this.height,
            weight: this.weight,
            gender: this.gender
          })

        this.firebaseFirestore
          .collection('users')


        this.hideLoading();
      })
      .catch(error => {
        this.hideLoading();
        this.showToast(error.message);
      })
  }

  ionViewDidLoad() {
    console.log('data');
  }

}
