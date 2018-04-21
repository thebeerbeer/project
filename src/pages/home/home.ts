import { NotificationPage } from './../notification/notification';
import { CalendarsPage } from './../calendars/calendars';
import { ProfilePage } from './../profile/profile';
import { InsulinPage } from './../insulin/insulin';
import { EmergencyPage } from './../emergency/emergency';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore
  ) {

  }


  logout() {
    this.firebaseAuth.auth.signOut();
  }
  gotoglucose() {
  }
  gotoemer() {
    this.navCtrl.push(EmergencyPage);
  }
  gotoinsulin() {
    this.navCtrl.push(InsulinPage);
  }
  gotoprofile() {
    this.navCtrl.push(ProfilePage);
  }
  gotograph() {
  }
  gotocalendas() {
    this.navCtrl.push(CalendarsPage);
  }
  gotonotification() {
    this.navCtrl.push(NotificationPage);
  }
}
