import { UsuarioProvider } from './../../providers/usuario.service';
import { PedidosDetallePage } from './../pedidos-detalle/pedidos-detalle';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/index.services';

/**
 * Generated class for the PedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  orders: any[] = [];
  order: any[] = [];
  show:boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public carritoService: CarritoProvider,
    public usuarioService: UsuarioProvider,
  ) {

    



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosPage');

  }

  

  ngOnInit() {
    if (this.usuarioService.token) {
      this.carritoService.getOrders().subscribe((data) => {
        console.log(data);
        this.orders = data;
        console.log(this.orders);
        console.log(this.orders.length);
        this.show = false;

      });

    }


  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter PedidosPage');
    if (this.usuarioService.token) {
      this.carritoService.getOrders().subscribe((data) => {
        console.log(data);
        this.orders = data;
        console.log(this.orders);
        console.log(this.orders);

      });

    }




  }

  verDetalles(order) {
    let ordenes = JSON.stringify(order);
    console.log(order);
    console.log(this.orders);
    this.navCtrl.push(PedidosDetallePage, { order: ordenes });

  }

}
