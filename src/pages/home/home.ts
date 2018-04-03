import { CalendarsPage } from './../calendars/calendars';
import { GraphPage } from './../graph/graph';
import { ProfilePage } from './../profile/profile';
import { InsulinPage } from './../insulin/insulin';
import { EmergencyPage } from './../emergency/emergency';
import { GlucosePage } from './../glucose/glucose';
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
    this.navCtrl.push(GlucosePage);
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
    this.navCtrl.push(GraphPage);
  }
  gotocalendas() {
    this.navCtrl.push(CalendarsPage);
  }
}
