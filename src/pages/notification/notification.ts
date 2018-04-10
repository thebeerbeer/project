import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AddNotificationPage } from '../add-notification/add-notification';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';
import { not } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  notifications = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public notification: LocalNotifications,
    public modalController: ModalController,
    public firebaseFirestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth
  ) {
  }

  ionViewDidEnter() {
    this.firebaseFirestore.collection('users')
      .doc(this.firebaseAuth.auth.currentUser.uid)
      .collection('notification')
      .snapshotChanges()
      .subscribe(data => {
        let items = [];
        data.map(action => {
          items.push({
            dataid: action.payload.doc.id,
            ...action.payload.doc.data()
          })
        });

        this.notifications = items
        console.log(this.notifications);

      });
  }

  showAddNotification() {
    this.modalController.create(AddNotificationPage).present()
  }

  format(data) {
    return moment(data).format("HH:mm");
  }

  async delete(notificationId, dataId) {
    alert(notificationId);

    try { //ดักจับerrorให้วิ่งไปที่catch
      await this.notification.cancel(notificationId);
      await this.notification.clear(notificationId);
      const notis = await this.notification.getAll()

      await this.firebaseFirestore.collection('users')
        .doc(this.firebaseAuth.auth.currentUser.uid)
        .collection('notification')
        .doc(dataId)
        .delete()
    } catch (error) {
    }
  }

  async clearAll() {
    try {
      await this.notification.cancelAll();
      await this.notification.clearAll();

      const notis = await this.notification.getAll()
      alert(JSON.stringify(notis))
    } catch (error) {
      alert(error);
    }
  }
}
