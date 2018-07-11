import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CrearSitiosPage } from "../index.paginas";
/**
 * Generated class for the MisSitiosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-sitios',
  templateUrl: 'mis-sitios.html',
})
export class MisSitiosPage {

  Page = CrearSitiosPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MisSitiosPage');
  }

  irCrear(){
    this.navCtrl.push(this.Page);
  }
  

}
