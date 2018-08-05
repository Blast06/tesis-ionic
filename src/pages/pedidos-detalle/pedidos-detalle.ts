import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PedidosDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos-detalle',
  templateUrl: 'pedidos-detalle.html',
})
export class PedidosDetallePage {

  order:any[]=[];
  price:number = 0;
  iva:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.order = JSON.parse(navParams.get('order'));
    console.log(this.order);

    this.iva = (parseFloat(this.order.price) * 0.18);
    this.price = parseFloat(this.order.price)  + this.iva;

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosDetallePage');
  }



}
