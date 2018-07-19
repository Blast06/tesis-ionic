import { CarritoProvider } from './../../providers/carrito.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ArticuloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-articulo',
  templateUrl: 'articulo.html',
})
export class ArticuloPage {

  article: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public carritoService: CarritoProvider) {


    this.article = navParams.get("singleArticle");
    console.log(this.article);
  }






}
