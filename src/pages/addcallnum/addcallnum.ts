import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddcallnumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcallnum',
  templateUrl: 'addcallnum.html',
})
export class AddcallnumPage {

  name: string;
  tel: string;
  description: string;
  image: string;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore
  ) {
  }

  create() {
    this.firebaseFirestore
    .collection('users')
    .doc(this.firebaseAuth.auth.currentUser.uid)
    .collection('emergency')
    .add({
      name: this.name,
      description: this.description,
      tel: this.tel,
      img: this.image
    })
    .then(() => {
      this.navCtrl.pop();
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcallnumPage');
  }

}
