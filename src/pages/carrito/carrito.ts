import { HomePage } from './../home/home';
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

  totalPrice: number = 0;
  total: number = 0;

  homepage = HomePage;

  show: boolean = false;
  iva: number = 0;
  pasnomber: number;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public carritoService: CarritoProvider,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController, ) {

    carritoService.getCart().subscribe((data: any) => {
      console.log("DATOS EN EL CONSTRUCTOR");
      console.log(data);

      this.cart_articles = data.data.cart_article;
      console.log(this.cart_articles);
      console.log(this.cart_articles.length);
      carritoService.carritoBadgeCounter = this.cart_articles.length;

      if (this.cart_articles) {
        this.totalPrice = this.cart_articles.reduce((totalPrice, article) => totalPrice += parseFloat(article.price), 0);
        this.total = this.totalPrice + (this.totalPrice * 0.18);
        this.iva = this.totalPrice * 0.18;
      }


    });




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
    this.carritoService.carritoBadgeCounter--;
  }



  removeFromArticlesArray(idx: number) {
    this.cart_articles.splice(idx, 1);

  }

  addToCart(id, cantidad) {
    this.carritoService.addToCart(id, cantidad).subscribe((data: any) => {
      console.log(data);
    });

  }

  makeOrder() {
    this.carritoService.makeOrder(this.cart_articles).subscribe((data) => {
      console.log(data);
    });
    let alert = this.alertCtrl.create({
      title: 'Orden realizada',
      subTitle: 'Has realizado tu orden',
      buttons: ['OK']
    });
    alert.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Articulo eliminado',
      subTitle: 'Has eliminado este articulo del carrito',
      buttons: ['OK']
    });
    alert.present();
  }


}
