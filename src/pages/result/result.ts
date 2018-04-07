import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  data = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('data');
    console.log(this.data);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

}
