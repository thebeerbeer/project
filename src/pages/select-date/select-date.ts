import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-select-date',
  templateUrl: 'select-date.html',
})
export class SelectDatePage {
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectDatePage');
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime.toDateString();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  select() {
    this.viewCtrl.dismiss({
      date: this.selectedDay
    });
  }

}
