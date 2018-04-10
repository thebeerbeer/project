import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-select-date',
  templateUrl: 'select-date.html',
})
export class SelectDatePage {
  title = '';

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

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    this.title = `${monthNames[ev.selectedTime.getMonth() - 1]} ${ev.selectedTime.getFullYear()} `;
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
