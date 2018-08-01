import { CarritoProvider } from "../../providers/index.services";
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  cart_articles: any[] = [];

  totalPrice: number;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public carritoService: CarritoProvider,
    public viewCtrl: ViewController, 
    public alertCtrl:AlertController,) {

    carritoService.getCart().subscribe((data: any) => {
      console.log("DATOS EN EL CONSTRUCTOR");
      console.log(data);

      this.cart_articles = data.data.cart_article;
      console.log(this.cart_articles);
      console.log(this.cart_articles.length);





    });

    this.actualizar_total();
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad CarritoPage');
  }
  remove(id, idx) {
    this.carritoService.removeFromCart(id).subscribe((data: any) => {
      console.log(data);
    });
    this.removeFromArticlesArray(idx);
    this.presentAlert();


  }

  removeFromArticlesArray(idx: number) {
    this.cart_articles.splice(idx, 1);

  }

  addToCart(id, cantidad) {
    this.carritoService.addToCart(id, cantidad).subscribe((data: any) => {
      console.log(data);
    });

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Articulo eliminado',
      subTitle: 'Has eliminado este articulo del carrito',
      buttons: ['OK']
    });
    alert.present();
  }

  actualizar_total() {
    this.totalPrice = 0;
    for (let item of this.cart_articles) {
      console.log(item.price);
    }
  }
}
