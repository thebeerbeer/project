import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

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

  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public afFirestore: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.afFirestore
      .collection('foods')
      .valueChanges()
      .subscribe(foods => this.foods = foods);


  }

  dismiss() {
    this.viewCtrl.dismiss({
      foods: this.foods.filter(food => food.selected)
    })
  }

}
