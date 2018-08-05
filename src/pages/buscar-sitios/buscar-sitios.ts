import { Component, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgAisModule } from 'angular-instantsearch';

/**
 * Generated class for the BuscarSitiosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscar-sitios',
  templateUrl: 'buscar-sitios.html',
  
})
export class BuscarSitiosPage {

  algoliaConfig = {
    apiKey: '0751b52d360e98c2d482aefc3afcf3fb',
    appId: 'E5A908GO9E',
    indexName: 'websites',
    routing: true
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarSitiosPage');
  }

}
