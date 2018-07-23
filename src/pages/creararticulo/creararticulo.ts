import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CreararticuloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creararticulo',
  templateUrl: 'creararticulo.html',
})
export class CreararticuloPage {

  public currentNumber = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  private increment () {
    this.currentNumber++;
  }
  
  private decrement () {
    this.currentNumber--;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreararticuloPage');
  }

}
