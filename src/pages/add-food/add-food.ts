import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddFoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-food',
  templateUrl: 'add-food.html',
})
export class AddFoodPage {

  selectedFood = [];

  foods = [
    {
      name: 'ข้าว',
      carb: 16,
      selected: false,
    },
    {
      name: 'ขนม',
      carb: 16,
      selected: false,
    }, {
      name: 'ชมพู่',
      carb: 16,
      selected: false,
    },
    {
      name: 'ฝรั่ง',
      carb: 16,
      selected: false,
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFoodPage');
  }

  dismiss() {
    this.viewCtrl.dismiss({
      foods: this.foods.filter(food => food.selected)
    })
  }

}
