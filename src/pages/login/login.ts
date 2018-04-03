import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import BasePage from '../../base';
import { RegisterPage } from '../register/register';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePage {

  email = '';
  password = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController

  ) {
    super(toastCtrl, loadingCtrl)
  }

  login() {
    this.showLoading("Logging in...")
    this.hideLoading();
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
      })
      .catch((error) => {
        this.showToast(error.message);
      })

  }

  navigateRegister() { //regis new user ,when click open regis page
    this.navCtrl.push(RegisterPage);

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
